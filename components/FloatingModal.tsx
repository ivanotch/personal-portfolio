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
    initial: { scale: 0, x: "-50%", y: "-50%" },
    open: {
        scale: 1,
        x: "-50%",
        y: "-50%",
        transition: {
            duration: 0.4,
            ease: [0.76, 0, 0.24, 1] as unknown as [number, number, number, number], // ✅ cast to satisfy TS
        },
    },
    closed: {
        scale: 0,
        x: "-50%",
        y: "-50%",
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

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const moveContainerX = gsap.quickTo(el, "left", { duration: 0.8, ease: "power3" });
        const moveContainerY = gsap.quickTo(el, "top", { duration: 0.8, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            moveContainerX(clientX);
            moveContainerY(clientY);
        };

        window.addEventListener("mousemove", onMouseMove);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    const { active, index } = modal;

    return (
        <motion.main ref={containerRef} variants={scaleAnimation} initial={"initial"} animate={active ? "open" : "closed"} className="h-[350px] w-[400px] flex items-center justify-center absolute overflow-hidden">
            <div style={{ top: index * -100 + "%" }} className="h-[100%] w-[100%] absolute transition-[top] duration-[500ms] ease-[cubic-bezier(0.76,0,0.24,1)]">
                {
                    projects.map((project, index) => {
                        const { src, color } = project;
                        console.log(src)
                        return <div style={{ backgroundColor: color }} key={`modal_${index}`} className="relative h-[100%] flex items-center justify-center">
                            <Image
                                className="h-[auto]"
                                alt="project_image"
                                src="/gighub.png"
                                width={300}
                                height={100}
                            />
                        </div>
                    })
                }
            </div>
        </motion.main>
    )
}