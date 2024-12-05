import React from "react";
import { motion } from "framer-motion";

type Props = {
    data: any;
};

export default function SliderCard({ data }: Props): JSX.Element {

    return (
        <>
            <motion.div
                className="relative h-36 min-w-[250px] rounded-2xl shadow-md md:h-52 md:min-w-[175px]"
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    transition: {
                        duration: 0.4
                    }
                }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 100
                }}
            >
                <motion.img
                layoutId={data.img}
                alt="Transition Image"
                src={data.img}
                className="absolute h-full rounded-2xl object-cover brightness-75"
                />
                <motion.div className="absolute z-10 flex h-full items-start p-4 flex-col justify-end">
                        <motion.span layout className="mb-2 h-[2px] w-3 rounded-full bg-ivory" />
                        <motion.h1 layoutId={data.title} className="text-xl leading-6 text-ivory">
                            {data.title}
                        </motion.h1>
                    </motion.div>
            </motion.div>
        </>
    );
}