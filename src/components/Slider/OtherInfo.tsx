import React from "react";
import { motion } from "framer-motion";

type Props = {
    data: any;
};
const item = {
    hidden: {
        y: "100%",
        transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 }
    },
    visible: {
        y: 0,
        transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 }
    }
}

export default function OtherInfo({ data }: Props): JSX.Element {

    return (
        <>
            <motion.div initial="hidden" animate={"visible"} className="flex flex-col">
                <span
                    style={{
                        overflow: "hidden",
                        display: "inline-block"
                    }}
                >
                    <motion.h1 className="spacing overflow-hidden text-ivory font-extrabold text-3xl md:text-5xl"
                        variants={item} key={data?.title}>
                        {data?.title}
                    </motion.h1>
                </span>
                <span
                    style={{
                        overflow: "hidden",
                        display: "inline-block"
                    }}
                >
                    <motion.p className="spacing overflow-hidden text-ivory"
                        variants={item} key={data?.description}>
                        {data?.description}
                    </motion.p>
                </span>



            </motion.div>
        </>
    );
}