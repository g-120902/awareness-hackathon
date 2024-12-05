"use client";

import LinkTester from "@/components/Phishing/LinkTester";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function PhishingBlog(): JSX.Element {
  const t = useTranslations('phishing')
  return (
    <div className="flex flex-col gap-6 px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold self-start">{t('title')}</h1>
      <section>
        <p className="text-lg leading-7 text-justify">
        {t('description')}
        </p>
     </section>
      <div className="md:flex w-full justify-start gap-12">
      
      <div>
        <p className="font-bold text-3xl">SCAN ME!</p>
        <Image
        src={"/images/Phishing/scan me!.png"}
        width={200}
        height={500}
        alt="image"
        className="w-[300px]"
      />
      
      </div>
      <Image
        src={"/images/Phishing/Phishing2.jpg"}
        width={200}
        height={500}
        alt="image"
        className="h-1/2 w-1/3 mt-12 md:block hidden"
      />
      </div>
     

      

    </div>
  );
}
