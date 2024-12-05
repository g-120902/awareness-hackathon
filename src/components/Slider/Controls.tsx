import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { CurrentSlideData } from "@/types/current-slide-data";
import { Data } from "@/types/background-image-data";

type Props = {
    currentSlideData: CurrentSlideData;
    sliderData: Data[];
    data: Data[];
    transitionData: Data;
    handleData: React.Dispatch<React.SetStateAction<Data[]>>;
    handleTransitionData: React.Dispatch<React.SetStateAction<Data>>;
    handleCurrentSlideData: React.Dispatch<React.SetStateAction<CurrentSlideData>>;
    initData: Data;
};

function Controls({
    currentSlideData,
    sliderData,
    data,
    transitionData,
    handleData,
    handleTransitionData,
    handleCurrentSlideData,
    initData,
}: Props) {
    const handlePrev = () => {
        // If we are at the first image, go back to the last one (cyclic behavior)
        const prevIndex = currentSlideData.index === 0 ? sliderData.length - 1 : currentSlideData.index - 1;
        const newData = sliderData[prevIndex];

        // Update data for the transition
        handleData((prevData) => [
            transitionData ? transitionData : initData,
            ...prevData.slice(0, prevData.length - 1),
        ]);

        // Update current slide and transition data
        handleCurrentSlideData({
            data: newData,
            index: prevIndex,
        });
        handleTransitionData(data[data.length - 1]);
    };

    const handleNext = () => {
        // If we are at the last image, go back to the first one (cyclic behavior)
        const nextIndex = currentSlideData.index === sliderData.length - 1 ? 0 : currentSlideData.index + 1;
        const newData = sliderData[nextIndex];

        // Update data for the transition
        handleData((prev) => prev.slice(1));

        // Update current slide and transition data
        handleCurrentSlideData({
            data: newData,
            index: nextIndex,
        });
        handleTransitionData(data[0]);

        // Add the next item to the data after transition
        setTimeout(() => {
            handleData((newData) => [
                ...newData,
                transitionData ? transitionData : initData,
            ]);
        }, 300);
    };

    return (
        <div className="flex items-center gap-3 px-0 py-3 md:px-1 md:py-5">
            <SliderButton handleClick={handlePrev}>
                <ChevronLeftIcon />
            </SliderButton>
            <SliderButton handleClick={handleNext}>
                <ChevronRightIcon />
            </SliderButton>
        </div>
    );
}

export default Controls;

const SliderButton = ({
    children,
    handleClick,
}: {
    children: React.ReactNode;
    handleClick: () => void;
}) => {
    return (
        <button
            className="flex h-14 w-14 items-center justify-center rounded-full border-[1px] border-navy-blue transition duration-300 ease-in-out hover:bg-ivory hover:text-dark-gray"
            onClick={handleClick}
        >
            <div className="h-6 w-6">{children}</div>
        </button>
    );
};
