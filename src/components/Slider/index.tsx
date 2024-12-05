'use client';

import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import React from "react";
import BackgroundImage from "./BackgroundImage";
import SliderInfo from "./SliderInfo";
import { Data } from "@/types/background-image-data";
import Slides from "./Slides";
import { CurrentSlideData } from "@/types/current-slide-data";
import Controls from "./Controls";

export default function Slider(): JSX.Element {
    const t = useTranslations("slider");

    const SliderData: Data[] = [
        {
            img: "/images/Slider/1.jpg",
            description: t("description.sniffing"),
            title: t("title.sniffing"),
        },
        {
            img: "/images/Slider/2.jpg",
            description: t("description.phishing"),
            title: t("title.phishing"),
        },
        {
            img: "/images/Slider/3.jpg",
            description: t("description.ai-detector"),
            title: t("title.ai-detector"),
        },
        {
            img: "/images/Slider/4.jpg",
            description: t("description.deepfake"),
            title: t("title.deepfake"),
        },
        {
            img: "/images/Slider/5.jpg",
            description: t("description.quiz"),
            title: t("title.quiz"),
        },
    ];

    const initData = SliderData[0];
    const [data, setData] = React.useState<Data[]>(SliderData.slice(1));
    const [transitionData, setTransitionData] = React.useState<Data>(initData);
    const [currentSlideData, setCurrentSlideData] = React.useState<CurrentSlideData>({
        data: initData,
        index: 0,
    });

    return (
        <main className=" min-h-screen relative select-none overflow-hidden text-ivory antialiased">
            <AnimatePresence>
                <BackgroundImage
                    key={currentSlideData.index}
                    transitionData={transitionData}
                    currentSlideData={currentSlideData}
                />
                <div className="z-20 absolute h-full w-full p-10">
                    <div className="flex flex-col md:flex-row w-full h-full justify-center items-center py-32">
                        <div className="p-4 flex-1 flex flex-col h-full justify-start">
                            <SliderInfo
                                transitionData={transitionData}
                                currentSlideData={currentSlideData}
                            />
                        </div>

                        <div className="flex h-full flex-1 flex-col justify-end p-8">
                            <Slides data={data} />
                            <Controls
                                currentSlideData={currentSlideData}
                                data={data}
                                transitionData={transitionData}
                                initData={initData}
                                handleData={setData}
                                handleTransitionData={setTransitionData}
                                sliderData={SliderData}
                                handleCurrentSlideData={setCurrentSlideData}
                            />
                        </div>
                    </div>
                </div>
            </AnimatePresence>
        </main>
    );
}
