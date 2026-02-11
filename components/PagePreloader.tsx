"use client";

import { motion } from "framer-motion";

type PageTransitionProps = {
    title: string;
};

const slideVertical = {
    initial: {
        y: "100vh",
    },
    enter: {
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1] as const,
        },
    },
    exit: {
        y: "-100vh",
        transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1] as const,
            delay: 0.2,
        },
    },
};

const textVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1] as const, // easeOut
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: [0.55, 0, 0.45, 1] as const, // easeIn
        },
    },
};


export default function PageTransition({ title }: PageTransitionProps) {
    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#141516] flex items-center justify-center text-white"
            variants={slideVertical}
            initial="initial"
            animate="enter"
            exit="exit"
        >
            <motion.h1
                className="text-[3rem] font-semibold tracking-widest uppercase"
                variants={textVariants}
                initial="initial"
                animate="enter"
                exit="exit"
            >
                {title}
            </motion.h1>
        </motion.div>
    );
}
