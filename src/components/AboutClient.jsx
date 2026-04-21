"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "@/styles";
import { fadeIn, staggerContainer } from "../utils/motion";
import { TypingText } from "./CustomTexts";
import Lighthouse from "../../public/Assets/Img/lighthouse3.png";
import PortraitMick from "../../public/Assets/Img/portraitmick.png";
import { RichText } from '@payloadcms/richtext-lexical/react';

export default function AboutClient({ about }) {
  return (
    <section
      id="section-about"
      className={`${styles.paddings} relative z-10 mt-12`}
      name="hashid"
    >
      <div className="gradient-02 z-0"></div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
      >
        <TypingText
          title="| about us"
          textStyles="text-yellow-500 text-center mt-[7vh] lg:mt-[0vh]" />

        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          className="mt-2 font-normal sm:text-[32px] text-[20px] text-center text-gray-500"
        >
          <p className="font-sans text-[2.5rem] md:text-[3rem] lg:text-[7.0rem] font-extrabold text-yellow-500 text-center">
            {about.title_about}
          </p>
          <div className="w-36 h-36  md:w-[20vw] lg:w[20vh]  ">
            <Image
              src={Lighthouse}
              height="320"
              width="230"
              alt="Leuchtturm"
              className="shape-lighthouse h-54 w-60" />
          </div>

          <div className="w-[90vw] -mt-12 text-[1rem] md:text-[1.66rem] px-5 text-gray-300  lg:text-[3.0rem] lg:leading-12 font-sans">
            <RichText data={about.content_about} />
          </div>

          <div className="flex flex-row justify-center items-center gap-x-5">
            <Image
              src={PortraitMick}
              height="80"
              width="60"
              float="left"
              alt="Portrait"
              className=" mt-5 rounded-full portraitMick" />
            <p className=" font-sans text-gray-300 text-[1.0rem] md:text-[1.66rem] lg:text-[3.0rem] lg:leading-12">

              Michael Schreck <br />und<br /> das Team des Rettungsankers
            </p>
          </div>
        </motion.div>
        <p className="text-yellow-500 text-center">scrolling down</p>
        <motion.img
          variants={fadeIn("up", "tween", 0.3, 1)}
          src="/Assets/Img/arrow-down.svg"
          alt="arrow down"
          className="w-4.5 h-7 object-contain mt-7"
        />
      </motion.div>
    </section>
  );
}
