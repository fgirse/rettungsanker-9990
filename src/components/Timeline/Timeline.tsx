"use client";

/**
 * Timeline.tsx
 * -------------------------------------------------------------
 * Next.js / React port of the original pezflash jQuery Timeline.
 *
 *   - Pure React + Tailwind, no jQuery, no jQuery UI.
 *   - Uses the Pointer Events API for the drag interaction
 *     (works with mouse, touch, pen — no touch-punch needed).
 *   - Native <audio> element replaces audiojs.
 *   - yet-another-react-lightbox replaces prettyPhoto.
 *   - react-tooltip replaces tipsy.
 *
 * Dependencies (install with):
 *   npm i yet-another-react-lightbox react-tooltip
 *
 * Tailwind: requires the "Dosis" Google font available on the page
 * (e.g. via next/font in app/layout.tsx).
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import {
  DEFAULT_CONFIG,
  DEFAULT_IMAGES,
  DEFAULT_MARKS,
  DEFAULT_MILESTONES,
  type ColumnWidth,
  type Milestone,
  type MilestoneEntry,
  type ScrollMark,
  type TimelineConfig,
  type TimelineImage,
} from "./timelineData";
import styles from "./Timeline.module.css";

const COLUMN_WIDTH_PX: Record<ColumnWidth, number> = {
  c100: 100,
  c125: 125,
  c150: 150,
  c175: 175,
  c200: 200,
  c225: 225,
  c250: 250,
  c275: 275,
  c300: 300,
  c325: 325,
  c350: 350,
  c375: 375,
  c400: 400,
};

export interface TimelineProps {
  config?: Partial<TimelineConfig>;
  images?: TimelineImage[];
  marks?: ScrollMark[];
  milestones?: Milestone[];
  className?: string;
}

interface LightboxState {
  open: boolean;
  slides: { src: string; title?: string }[];
  index: number;
}

type ModalState =
  | { open: false }
  | { open: true; kind: "html"; html: string }
  | { open: true; kind: "video"; embedUrl: string; title?: string };

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

export default function Timeline({
  config: configOverride,
  images = DEFAULT_IMAGES,
  marks = DEFAULT_MARKS,
  milestones = DEFAULT_MILESTONES,
  className,
}: TimelineProps) {
  const config = useMemo<TimelineConfig>(
    () => ({ ...DEFAULT_CONFIG, ...configOverride }),
    [configOverride],
  );

  // ---- Refs -------------------------------------------------------------
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const draggerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // ---- State -----------------------------------------------------------
  const [imagesLeft, setImagesLeft] = useState(0); // negative number, 0..-(imagesWidth-width)
  const [ready, setReady] = useState(false);
  const [marksVisible, setMarksVisible] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [draggingActive, setDraggingActive] = useState(false);

  const [lightbox, setLightbox] = useState<LightboxState>({
    open: false,
    slides: [],
    index: 0,
  });
  const [modal, setModal] = useState<ModalState>({ open: false });

  // ---- Derived ratios --------------------------------------------------
  const imagesRange = config.imagesWidth - config.width; // total drag distance
  const contentRange = config.contentWidth - config.width;
  const draggerRange = config.width - config.draggerWidth;

  const ratioContent = imagesRange > 0 ? contentRange / imagesRange : 0;
  const ratioDragger = imagesRange > 0 ? draggerRange / imagesRange : 0;

  // ---- Drag handling ---------------------------------------------------
  const dragStart = useRef<{ pointerX: number; startLeft: number } | null>(
    null,
  );

  const updateLeft = useCallback(
    (next: number) => {
      const clamped = clamp(next, -imagesRange, 0);
      setImagesLeft(clamped);
    },
    [imagesRange],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // ignore drags initiated on links / buttons / images that are interactive
      const target = e.target as HTMLElement;
      if (target.closest("a, button")) return;

      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      dragStart.current = {
        pointerX: e.clientX,
        startLeft: imagesLeft,
      };
      setDraggingActive(true);
    },
    [imagesLeft],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragStart.current) return;
      const delta = e.clientX - dragStart.current.pointerX;
      updateLeft(dragStart.current.startLeft + delta);
    },
    [updateLeft],
  );

  const endDrag = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragStart.current) return;
      try {
        (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      dragStart.current = null;
      setDraggingActive(false);
    },
    [],
  );

  // ---- Wheel scrolling -------------------------------------------------
  useEffect(() => {
    if (!config.mouseWheel) return;
    const node = containerRef.current;
    if (!node) return;

    const onWheel = (e: WheelEvent) => {
      // Horizontal preference: shift+wheel or trackpad horizontal
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      e.preventDefault();
      setImagesLeft((current) =>
        clamp(current - delta, -imagesRange, 0),
      );
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [config.mouseWheel, imagesRange]);

  // ---- Click on dragger track ----------------------------------------
  const handleTrackPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const track = e.currentTarget;
      const rect = track.getBoundingClientRect();
      const target = e.target as HTMLElement;
      // If clicking the dragger itself, fall through to dragger drag
      if (target.closest(`.${styles.dragger}`)) return;
      const localX = e.clientX - rect.left - config.draggerWidth / 2;
      const draggerLeft = clamp(localX, 0, draggerRange);
      const newImagesLeft =
        ratioDragger > 0 ? -draggerLeft / ratioDragger : 0;
      updateLeft(newImagesLeft);
    },
    [config.draggerWidth, draggerRange, ratioDragger, updateLeft],
  );

  const draggerStart = useRef<{ pointerX: number; startLeft: number } | null>(
    null,
  );

  const handleDraggerPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.stopPropagation();
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      const draggerLeft = -imagesLeft * ratioDragger;
      draggerStart.current = {
        pointerX: e.clientX,
        startLeft: draggerLeft,
      };
    },
    [imagesLeft, ratioDragger],
  );

  const handleDraggerPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggerStart.current) return;
      const delta = e.clientX - draggerStart.current.pointerX;
      const draggerLeft = clamp(
        draggerStart.current.startLeft + delta,
        0,
        draggerRange,
      );
      const newImagesLeft =
        ratioDragger > 0 ? -draggerLeft / ratioDragger : 0;
      updateLeft(newImagesLeft);
    },
    [draggerRange, ratioDragger, updateLeft],
  );

  const handleDraggerPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      try {
        (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      draggerStart.current = null;
    },
    [],
  );

  // ---- Click on a milestone mark scrolls to it ----------------------
  const scrollToMark = useCallback(
    (mark: ScrollMark) => {
      // mark.xpos is the dragger's left position on the track.
      const newImagesLeft = ratioDragger > 0 ? -mark.xpos / ratioDragger : 0;
      updateLeft(newImagesLeft);
    },
    [ratioDragger, updateLeft],
  );

  // ---- Fade-in & marks reveal --------------------------------------
  useEffect(() => {
    const t1 = window.setTimeout(() => setReady(true), config.fadeInDelayMs);
    const t2 = window.setTimeout(
      () => setMarksVisible(true),
      config.fadeInDelayMs + 500,
    );
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [config.fadeInDelayMs]);

  // ---- Audio handling ----------------------------------------------
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.loop = true;
    if (config.autoPlayAudio) {
      a.play()
        .then(() => setAudioPlaying(true))
        .catch(() => setAudioPlaying(false));
    }
  }, [config.autoPlayAudio]);

  const toggleAudio = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play()
        .then(() => setAudioPlaying(true))
        .catch(() => setAudioPlaying(false));
    } else {
      a.pause();
      setAudioPlaying(false);
    }
  }, []);

  // pause music while a video modal is open (mirrors original behaviour)
  useEffect(() => {
    if (!audioRef.current) return;
    if (modal.open && modal.kind === "video") {
      audioRef.current.pause();
      setAudioPlaying(false);
    }
  }, [modal]);

  /** Convert a Vimeo / YouTube URL into an embeddable iframe URL. */
  const toEmbedUrl = (url: string): string => {
    const vimeo = url.match(/vimeo\.com\/(\d+)/);
    if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
    const youtube = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/);
    if (youtube) return `https://www.youtube.com/embed/${youtube[1]}?autoplay=1`;
    return url;
  };

  // ---- Open helpers -------------------------------------------------
  const openLightbox = (slides: LightboxState["slides"], index = 0) =>
    setLightbox({ open: true, slides, index });
  const closeLightbox = () =>
    setLightbox((s) => ({ ...s, open: false }));

  const openHtmlModal = (html: string) =>
    setModal({ open: true, kind: "html", html });
  const openVideoModal = (rawUrl: string, title?: string) =>
    setModal({
      open: true,
      kind: "video",
      embedUrl: toEmbedUrl(rawUrl),
      title,
    });
  const closeModal = () => setModal({ open: false });

  // ---- Style objects -----------------------------------------------
  const containerStyle: CSSProperties = {
    width: config.width,
    height: config.height,
    opacity: ready ? 1 : 0,
    transition: "opacity 1s ease-out",
  };

  const viewportStyle: CSSProperties = {
    height: config.imagesHeight,
  };

  const imagesStyle: CSSProperties = {
    width: config.imagesWidth,
    transform: `translate3d(${imagesLeft}px, 0, 0)`,
  };

  const milestonesStyle: CSSProperties = {
    height: config.contentHeight,
  };

  const contentStyle: CSSProperties = {
    width: config.contentWidth,
    transform: `translate3d(${imagesLeft * ratioContent}px, 0, 0)`,
  };

  const scrollbarStyle: CSSProperties = {
    top: config.imagesHeight - config.draggerHeight,
    height: config.draggerHeight,
    width: config.width,
  };

  const draggerStyle: CSSProperties = {
    width: config.draggerWidth,
    height: config.draggerHeight,
    left: -imagesLeft * ratioDragger,
  };

  // ---- Render -------------------------------------------------------
  return (
    <div className={`relative mx-auto ${className ?? ""}`}>
      <div
        ref={containerRef}
        id="timeline_container"
        className="relative bg-[#242424] border-4 border-white"
        style={containerStyle}
      >
        {/* TIMELINE */}
        <div id="timeline" className="relative">
          {/* VIEWPORT - draggable image strip */}
          <div
            className={`relative overflow-hidden ${styles.viewport} ${
              draggingActive ? styles.dragCursorActive : styles.dragCursor
            }`}
            style={viewportStyle}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div
              ref={imagesRef}
              className="absolute left-0 top-0 flex select-none"
              style={imagesStyle}
              draggable={false}
            >
              {images.map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt ?? ""}
                  width={img.width}
                  height={img.height}
                  draggable={false}
                  className="block shrink-0"
                />
              ))}
            </div>
          </div>

          {/* SCROLLBAR */}
          <div
            className={`${styles.scrollbar} absolute left-0`}
            style={scrollbarStyle}
            onPointerDown={handleTrackPointerDown}
          >
            <div className="relative h-full w-full">
              {/* MILESTONE MARKS */}
              {marks.map((mark, i) => (
                <button
                  key={mark.id}
                  type="button"
                  onClick={() => scrollToMark(mark)}
                  data-tooltip-id="tl-tooltip"
                  data-tooltip-content={mark.label}
                  data-tooltip-place="bottom"
                  className={`${styles.mark} ${
                    marksVisible ? styles.markVisible : ""
                  } border-0 p-0`}
                  style={{
                    left: marksVisible ? mark.xpos : 0,
                    transitionDelay: `${i * 100}ms`,
                  }}
                  aria-label={mark.label}
                />
              ))}

              {/* DRAGGER */}
              <div
                ref={draggerRef}
                className={`${styles.dragger} top-0 absolute`}
                style={draggerStyle}
                onPointerDown={handleDraggerPointerDown}
                onPointerMove={handleDraggerPointerMove}
                onPointerUp={handleDraggerPointerUp}
                onPointerCancel={handleDraggerPointerUp}
                role="slider"
                aria-valuemin={0}
                aria-valuemax={imagesRange}
                aria-valuenow={-imagesLeft}
              />
            </div>
          </div>

          {/* MILESTONES */}
          <div
            className={`relative overflow-hidden ${styles.viewportBorder}`}
            style={milestonesStyle}
          >
            <div
              ref={contentRef}
              className="absolute left-0 top-0 flex"
              style={contentStyle}
            >
              {milestones.map((m, i) => (
                <MilestoneColumn
                  key={i}
                  milestone={m}
                  onOpenHtmlModal={openHtmlModal}
                  onOpenVideoModal={openVideoModal}
                  onOpenLightbox={openLightbox}
                />
              ))}
            </div>
          </div>

          {/* AUDIO PLAYER */}
          {config.audioSrc && (
            <div className="absolute right-2 top-1 z-10">
              <button
                type="button"
                onClick={toggleAudio}
                className="rounded-md border border-white/20 bg-black/50 px-2 py-1 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-black/80"
                aria-label={audioPlaying ? "Pause music" : "Play music"}
              >
                {audioPlaying ? "♪ Pause" : "♪ Play"}
              </button>
              <audio ref={audioRef} src={config.audioSrc} preload="auto" />
            </div>
          )}
        </div>
      </div>

      {/* SHADOW underneath the container */}
      <div
        className={`${styles.shadow} absolute -left-1`}
        style={{ top: config.height + 4 }}
        aria-hidden
      />

      {/* TOOLTIP layer */}
      <Tooltip id="tl-tooltip" />

      {/* LIGHTBOX */}
      <Lightbox
        open={lightbox.open}
        close={closeLightbox}
        slides={lightbox.slides}
        index={lightbox.index}
      />

      {/* INLINE HTML / VIDEO MODAL */}
      {modal.open && (
        <div
          className="fixed inset-0 z-1000 flex items-center justify-center bg-black/70 p-6"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div
            className={`relative w-full overflow-hidden rounded-lg bg-[#242424] text-white shadow-2xl ${
              modal.kind === "video"
                ? "max-w-4xl"
                : "max-h-[80vh] max-w-2xl overflow-y-auto p-8"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-white hover:bg-white/20"
              aria-label="Close"
            >
              ×
            </button>
            {modal.kind === "html" ? (
              <div
                className="[&_a]:text-[#0096ff] [&_a:hover]:underline"
                dangerouslySetInnerHTML={{ __html: modal.html }}
              />
            ) : (
              <div className="aspect-video w-full">
                <iframe
                  src={modal.embedUrl}
                  title={modal.title ?? "Video"}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------

function MilestoneColumn({
  milestone,
  onOpenHtmlModal,
  onOpenVideoModal,
  onOpenLightbox,
}: {
  milestone: Milestone;
  onOpenHtmlModal: (html: string) => void;
  onOpenVideoModal: (url: string, title?: string) => void;
  onOpenLightbox: (
    slides: { src: string; title?: string }[],
    index?: number,
  ) => void;
}) {
  const baseClasses = milestone.isFirst
    ? "float-left mt-[14px] ml-[20px] pl-0"
    : "float-left mt-[14px] ml-[50px] h-[150px] border-l border-[#505050] pl-[10px]";

  const innerStyle: CSSProperties = {
    width: COLUMN_WIDTH_PX[milestone.width],
  };

  return (
    <div className={baseClasses}>
      <div style={innerStyle}>
        {milestone.entries.map((entry, i) => (
          <MilestoneEntryView
            key={i}
            entry={entry}
            onOpenHtmlModal={onOpenHtmlModal}
            onOpenVideoModal={onOpenVideoModal}
            onOpenLightbox={onOpenLightbox}
          />
        ))}
      </div>
    </div>
  );
}

function MilestoneEntryView({
  entry,
  onOpenHtmlModal,
  onOpenVideoModal,
  onOpenLightbox,
}: {
  entry: MilestoneEntry;
  onOpenHtmlModal: (html: string) => void;
  onOpenVideoModal: (url: string, title?: string) => void;
  onOpenLightbox: (
    slides: { src: string; title?: string }[],
    index?: number,
  ) => void;
}) {
  switch (entry.kind) {
    case "date":
      return (
        <span
          className="block text-[13px] font-bold leading-4 text-[#0096ff]"
          style={{ whiteSpace: "pre-line" }}
        >
          {entry.text}
        </span>
      );

    case "text":
      return (
        <span
          className="mt-2 block text-[12px] font-medium leading-3 text-white"
          dangerouslySetInnerHTML={{ __html: entry.html }}
        />
      );

    case "logo":
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={entry.src} alt={entry.alt ?? ""} className="my-2" />;

    case "readMore":
      return (
        <span className="mt-3 block">
          <button
            type="button"
            onClick={() => onOpenHtmlModal(entry.html)}
            className={styles.readMore}
            data-tooltip-id="tl-tooltip"
            data-tooltip-content="READ MORE"
            data-tooltip-place="left"
            aria-label="Read more"
          />
        </span>
      );

    case "video":
      return (
        <>
          <span className="mt-3 block">
            <button
              type="button"
              onClick={() => onOpenVideoModal(entry.videoUrl, entry.title)}
              className={`${styles.videoRollover} border-0 bg-transparent p-0`}
              aria-label={entry.title ?? "Play video"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={entry.thumb} alt={entry.title ?? ""} />
            </button>
          </span>
          {entry.description && (
            <span className="clear-left mt-1 block text-[12px] font-medium leading-3 text-[#6f6f6f]">
              {entry.description}
            </span>
          )}
        </>
      );

    case "image":
      return (
        <>
          <span className="mt-3 block">
            <button
              type="button"
              onClick={() => onOpenLightbox(entry.gallery, 0)}
              className={`${styles.imageRollover} border-0 bg-transparent p-0`}
              aria-label="Open image gallery"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={entry.thumb} alt="" />
            </button>
          </span>
          {entry.description && (
            <span className="clear-left mt-1 block text-[12px] font-medium leading-3 text-[#6f6f6f]">
              {entry.description}
            </span>
          )}
        </>
      );

    case "gallery":
      return (
        <span className="mt-2 inline-block bg-[#0b0b0b] px-1.25 py-px pb-0.5 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => onOpenLightbox(entry.gallery, 0)}
            className="text-[#0096ff] hover:text-white"
          >
            {entry.label}
          </button>
        </span>
      );

    case "links":
      return (
        <>
          {entry.label && (
            <span className="mt-2 block text-[12px] font-medium leading-3 text-white">
              {entry.label}
            </span>
          )}
          {entry.links.map((l, i) => (
            <span
              key={i}
              className="block text-[12px] font-bold"
            >
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="text-[#888] hover:text-[#0096ff] hover:underline"
              >
                {l.text}
              </a>
            </span>
          ))}
        </>
      );

    default:
      return null;
  }
}
