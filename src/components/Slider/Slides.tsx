import React from "react";
import { Data } from "@/types/background-image-data";
import SliderCard from "./SliderCard";

export type SlidesProps = {
    data: Data[];
};

export default function Slides({ data }: SlidesProps): JSX.Element {

  return (
    <div className="sm:flex w-full gap-6 hidden">
        {data.map((data) => {
            return <SliderCard key={data.img} data={data} />
        })}
    </div>
  );
}
