import React from "react";
import { motion } from "framer-motion";
import { CurrentSlideData } from "@/types/current-slide-data";
import { Data } from "@/types/background-image-data";

type BackgroundImageProps = {
  transitionData: Data;
  currentSlideData: CurrentSlideData;
};

function BackgroundImage({ transitionData, currentSlideData }: BackgroundImageProps): JSX.Element {
  return (
    <>
      {transitionData && (
        <img       
          className="absolute left-0 top-0 h-full w-full object-cover brightness-50"
          src={transitionData.img}
        />
      )}
      <motion.img
        alt="Current Image"
        key={`${currentSlideData.data.img}-current`}
        initial={{ x: "100%" }} // Start off-screen to the right
        animate={{ x: 0 }} // Slide in from right to center
        exit={{ x: "-100%" }} // Slide out to the left when exiting
        transition={{
          duration: 0.8, // Control the duration of the slide
          ease: "easeInOut", // Smooth in/out easing
        }}
        src={currentSlideData.data.img}
        className="absolute left-0 top-0 z-10 h-full w-full object-cover brightness-50"
      />
    </>
  );
}

export default BackgroundImage;
