"use client";

import React, { useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from "next/image";
import gsap from 'gsap';

type ModalState = {
    active: boolean;
    index: number;
};

type ProjectItem = {
    title: string;
    src: string;
    color: string;
    task: string;
    year: string;
};

interface FloatingModalProps {
    modal: ModalState;
    projects: ProjectItem[];
}

const scaleAnimation: Variants = {
    initial: { scale: 0 },
    open: {
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.76, 0, 0.24, 1] as unknown as [number, number, number, number], // ✅ cast to satisfy TS
        },
    },
    closed: {
        scale: 0,
        transition: {
            duration: 0.4,
            ease: [0.32, 0, 0.67, 0] as unknown as [number, number, number, number], // ✅ cast
        },
    },
};
export default function FloatingModal({
    modal,
    projects,
}: FloatingModalProps) {

    const containerRef = useRef<HTMLElement>(null);
    const cursor = useRef<HTMLDivElement>(null);
    const cursorLabel = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const el = containerRef.current;
        const cursorEl = cursor.current;
        const labelEl = cursorLabel.current;
        if (!el || !cursorEl || !labelEl) return;

        //modal
        const moveContainerX = gsap.quickTo(el, "left", { duration: 0.8, ease: "power3" });
        const moveContainerY = gsap.quickTo(el, "top", { duration: 0.8, ease: "power3" });

        //cursor
        const moveCursorX = gsap.quickTo(cursorEl, "left", { duration: 0.5, ease: "power3" });
        const moveCursorY = gsap.quickTo(cursorEl, "top", { duration: 0.5, ease: "power3" });

        //label
        const moveLabelX = gsap.quickTo(labelEl, "left", { duration: 0.45, ease: "power3" });
        const moveLabelY = gsap.quickTo(labelEl, "top", { duration: 0.45, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            moveContainerX(clientX - 190);
            moveContainerY(clientY - 200);
            moveCursorX(clientX - 30);
            moveCursorY(clientY - 30);
            moveLabelX(clientX - 30);
            moveLabelY(clientY - 30);
        };

        window.addEventListener("mousemove", onMouseMove);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    const { active, index } = modal;

    return (
        <>
            <motion.main ref={containerRef} variants={scaleAnimation} initial={"initial"} animate={active ? "open" : "closed"} className="h-[300px] w-[350px] flex items-center justify-center fixed overflow-hidden pointer-events-none">
                <div style={{ top: index * -100 + "%" }} className="h-[100%] w-[100%] absolute transition-[top] duration-[500ms] ease-[cubic-bezier(0.76,0,0.24,1)]">
                    {
                        projects.map((project, index) => {
                            const { src, color } = project;
                            return <div style={{ backgroundColor: color }} key={`modal_${index}`} className="relative h-[100%] flex items-center justify-center">
                                <Image
                                    className="h-[auto]"
                                    alt="project_image"
                                    src={src}
                                    width={300}
                                    height={100}
                                />
                            </div>
                        })
                    }
                </div>
            </motion.main>
            <motion.div variants={scaleAnimation} initial={"initial"} animate={active ? "open" : "closed"} ref={cursor} className='h-[60px] w-[60px] bg-[#455CE9] fixed pointer-events-none rounded-full flex items-center justify-center'></motion.div>
            <motion.div variants={scaleAnimation} initial={"initial"} animate={active ? "open" : "closed"} ref={cursorLabel} className='h-[60px] w-[60px] bg-[#455CE9] fixed pointer-events-none rounded-full flex items-center justify-center text-white bg-transparent'>View</motion.div>
        </>
    )
}