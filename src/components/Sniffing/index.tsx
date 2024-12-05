"use client";

import Image from "next/image";
import React from "react";
import MiniGame from "./MiniGame";
import { useTranslations } from "next-intl";

export default function Blog(): JSX.Element {
  const t = useTranslations('sniffing')
  return (
    <div className="mx-auto max-w-4xl p-6 flex-col flex items-center gap-4 py-10">
      {/* Blog Title */}
      <h1 className="self-start text-4xl font-extrabold text-gray-900 mb-6">
        {t('title')}
      </h1>

      {/* Main Definition */}
      <section>
          <p className="md:block hidden text-justify">
          {t('description')}

          </p>
      </section>
      <div className="flex md:flex-row flex-col-reverse justify-center items-center gap-2">
      <MiniGame />
      <Image
        src={"/images/Sniffing/Sniffing.png"}
        width={200}
        height={500}
        alt="image"
        className="h-1/2 md:w-1/2 w-full"
      />
      </div>
      
    </div>
  );
}
