'use client';

import React from "react";
import { motion } from "framer-motion";
import OtherInfo from "./OtherInfo";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export type SliderInfoProps = {
  transitionData: { title: string; description: string } | null;
  currentSlideData: { data: { title: string; description: string }; index: number };
};

export default function SliderInfo({ transitionData, currentSlideData }: SliderInfoProps): JSX.Element {
  const t = useTranslations("slider.info");

  // Function to determine the href based on title
  const getHref = (title: string | null): string => {
    switch (title) {
      case "sniffing":
        return "/blogs/sniffing";
      case "phishing":
        return "/blogs/sniffing";
      case "ai detector":
        return "/ai-detector";
      case "quiz":
        return "/quiz";
      default:
        return "/"; 
    }
  };

  const currentTitle = transitionData ? transitionData.title : currentSlideData.data.title;

  return (
    <div className="flex flex-col gap-2">
      <motion.span layout className="mb-2 h-1 w-5 rounded-full bg-ivory" />
      <OtherInfo data={transitionData ? transitionData : currentSlideData.data} />
      <Link href={getHref(currentTitle)}>
        <button
          className="hover:bg-blue-hover hover:text-white flex w-[200px] h-[41px] items-center justify-center rounded-md bg-pale-blue text-lg font-semibold text-blue-hover shadow-lg"
        >
          {t("discover")}
        </button>
      </Link>
    </div>
  );
}
