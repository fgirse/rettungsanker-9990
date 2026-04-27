/**
 * Timeline Data
 * -------------------------------------------------------------
 * Strongly-typed model derived from the original
 * pezflash jQuery Timeline (index.html).
 * All copy / dimensions are preserved 1:1 so the look matches
 * the legacy version.
 */

export type ColumnWidth =
  | "c100"
  | "c125"
  | "c150"
  | "c175"
  | "c200"
  | "c225"
  | "c250"
  | "c275"
  | "c300"
  | "c325"
  | "c350"
  | "c375"
  | "c400";

/** A single line of content inside a milestone column. */
export type MilestoneEntry =
  | { kind: "date"; text: string }
  | { kind: "text"; html: string }
  | { kind: "logo"; src: string; alt?: string }
  | {
      kind: "readMore";
      /** Inline HTML shown inside the lightbox modal. */
      html: string;
    }
  | {
      kind: "video";
      thumb: string;
      videoUrl: string;
      title?: string;
      description?: string;
    }
  | {
      kind: "image";
      thumb: string;
      gallery: { src: string; title?: string }[];
      description?: string;
    }
  | {
      kind: "gallery";
      label: string;
      gallery: { src: string; title?: string }[];
    }
  | {
      kind: "links";
      label?: string;
      links: { href: string; text: string }[];
    };

export interface Milestone {
  /** Width class (matches the original .c125, .c200, ...). */
  width: ColumnWidth;
  /** First column has no left border / different margin. */
  isFirst?: boolean;
  entries: MilestoneEntry[];
}

export interface ScrollMark {
  id: string;
  /** Left position in px on the scroll-bar track. */
  xpos: number;
  label: string;
}

export interface TimelineImage {
  src: string;
  alt?: string;
  width: number;
  height: number;
}

export interface TimelineConfig {
  width: number;
  height: number;
  imagesWidth: number;
  imagesHeight: number;
  contentWidth: number;
  contentHeight: number;
  draggerWidth: number;
  draggerHeight: number;
  fadeInDelayMs: number;
  /** Enable mouse-wheel horizontal scrolling. */
  mouseWheel: boolean;
  audioSrc?: string;
  autoPlayAudio?: boolean;
}

export const DEFAULT_CONFIG: TimelineConfig = {
  width: 952,
  height: 450,
  imagesWidth: 3400,
  imagesHeight: 265,
  contentWidth: 1670,
  contentHeight: 174,
  draggerWidth: 59,
  draggerHeight: 21,
  fadeInDelayMs: 600,
  mouseWheel: true,
  audioSrc: "/timeline/mp3/music.mp3",
  autoPlayAudio: false,
};

const ASSET = "/timeline/images";

export const DEFAULT_IMAGES: TimelineImage[] = [
  { src: `${ASSET}/2017.svg`, width: 700, height: 200 },
  { src: `${ASSET}/Hero.png`, width: 1368, height: 100 },
  { src: `${ASSET}/astraballon.png`, width: 480, height: 26 },
  { src: `${ASSET}/content_img_4.png`, width: 568, height: 265 },
  { src: `${ASSET}/content_img_5.png`, width: 568, height: 265 },
  { src: `${ASSET}/rastergrafik.svg`, width: 568, height: 265 },
];

export const DEFAULT_MARKS: ScrollMark[] = [
  { id: "m0", xpos: 460, label: "DEZEMBER 2019" },
  { id: "m1", xpos: 620, label: "2021" },
  { id: "m2", xpos: 800, label: "2026 - PARTNERS" },
  { id: "m3", xpos: 910, label: "2027" },
];

export const DEFAULT_MILESTONES: Milestone[] = [
  // 1 - First
  {
    width: "c200",
    isFirst: true,
    entries: [
      { kind: "date", text: "SEPTEMBER 2017 - STARTUP" },
      {
        kind: "text",
        html:
          "<strong>Volker Schneider</strong> und <strong>Michael Schreck</strong> eröffnen im September 2017 den Rettungsanker-Freiburg in Hommage auf eine Kiezkneipe in St. Pauli. " +
          "<br/><br/>" +
          "Grosse Eröffnngsparty mit Live-Musik, Freibier und vielen Gästen. " 
      },
    ],
  },
  // 2
  {
    width: "c125",
    entries: [
      { kind: "date", text: "SEPTEMBER 2018" },
      {
        kind: "text",
        html:
          "Der Rettungsanker feiert seinen 1. Geburtstag.<br/><br/>" +
          "Treffpunkt für ein Publikum jedes Alters.",
      },
      {
        kind: "readMore",
        html:
          "<p><strong>Sample of extended content opened with lightbox</strong><br/><br/>" +
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor " +
          'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ' +
          'exercitation ullamco laboris nisi ut aliquip ' +
          '<a href="http://www.themeforest.net" target="_blank" rel="noreferrer">sample of external link</a>. ' +
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
          "nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui " +
          "officia deserunt mollit anim id est laborum.</p>",
      },
    ],
  },
  // 3
  {
    width: "c125",
    entries: [
      { kind: "date", text: "DEZEMBER 2019" },
      {
        kind: "text",
        html: "Ende Dezember verlässt <strong>Volker Schneider</strong> den Rettungsanker.",
      },
      { kind: "date", text: "JANUAR 2019" },
      {
        kind: "text",
        html: "<strong>Michael Schreck</strong> übernimmt die alleinige Geschäftsführung und startet mit einem neuen Team in das Jahr 2020.",
      },
    ],
  },
  // 4
  {
    width: "c125",
    entries: [
      { kind: "date", text: "2002 - 20 YEARS\nANNIVERSARY VIDEO" },
      {
        kind: "video",
        thumb: `${ASSET}/video_sample_thumb.png`,
        videoUrl: "https://vimeo.com/24492485",
        title: "20 Years Anniversary Video",
        description: "Short video description",
      },
    ],
  },
  // 5
  {
    width: "c150",
    entries: [
      { kind: "date", text: "2005" },
      {
        kind: "text",
        html: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      },
      {
        kind: "gallery",
        label: "> IMAGE GALLERY",
        gallery: [
          { src: `${ASSET}/gallery_sample_02.jpg`, title: "Gallery sample 01" },
          { src: `${ASSET}/gallery_sample_01.jpg`, title: "Gallery sample 02" },
          { src: `${ASSET}/gallery_sample_03.jpg`, title: "Gallery sample 03" },
        ],
      },
    ],
  },
  // 6
  {
    width: "c125",
    entries: [
      { kind: "date", text: "2006 - WPA PARTNERS" },
      { kind: "text", html: "Sample of external links:" },
      {
        kind: "links",
        links: [
          { href: "http://themeforest.net/user/pezflash", text: "www.envato.com" },
          { href: "http://themeforest.net/user/pezflash", text: "www.themeforest.net" },
          { href: "http://themeforest.net/user/pezflash", text: "www.codecanyon.net" },
        ],
      },
    ],
  },
  // 7
  {
    width: "c225",
    entries: [
      { kind: "date", text: "2010 - WIDE COLUMN SAMPLE" },
      { kind: "logo", src: `${ASSET}/logos.png` },
      {
        kind: "text",
        html:
          "Ut enim ad minim veniam, quis nostrud exercit ullamco. Duis aute irure dolor in " +
          "voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        kind: "readMore",
        html:
          "<p><strong>Sample of extended content opened with lightbox</strong><br/><br/>" +
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor " +
          'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ' +
          'exercitation ullamco laboris nisi ut aliquip ' +
          '<a href="http://www.themeforest.net" target="_blank" rel="noreferrer">sample of external link</a>. ' +
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
          "nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui " +
          "officia deserunt mollit anim id est laborum.</p>",
      },
    ],
  },
  // 8
  {
    width: "c125",
    entries: [
      { kind: "date", text: "2012 - PRESENT" },
      {
        kind: "image",
        thumb: `${ASSET}/image_sample_thumb.png`,
        description: "Image description",
        gallery: [
          { src: `${ASSET}/gallery_sample_01.jpg`, title: "10 Years Anniversary Video" },
          { src: `${ASSET}/gallery_sample_02.jpg`, title: "Gallery sample 02" },
          { src: `${ASSET}/gallery_sample_03.jpg`, title: "Gallery sample 03" },
        ],
      },
    ],
  },
];
