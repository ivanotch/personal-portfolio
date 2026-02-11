"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Nav from "./Nav";
import { Github, Instagram, Slack, Linkedin } from "@deemlol/next-icons";
import { motion, useAnimation } from 'framer-motion';
import MagneticLink from "@/components/MagneticLink";

type HeroProps = {
    startAnimation: boolean;
};

export default function Hero({ startAnimation }: HeroProps) {
    const nameRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLAnchorElement>(null);

    const controls = useAnimation();

    useEffect(() => {
        if (startAnimation) {
            controls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 1 },
            });
        }
    }, [startAnimation]);

    useEffect(() => {
        if (!startAnimation) return;

        if (nameRef.current) {
            gsap.to(nameRef.current, {
                opacity: 1,
                y: 0,
                duration: 3.5,
                ease: "power1.inOut"
            });
        }

        if (tagRef.current) {
            gsap.to(tagRef.current, {
                opacity: 1,
                y: 0,
                duration: 3.5,
                ease: "power1.inOut"
            });
        }

        if (lineRef.current) {
            gsap.fromTo(
                lineRef.current,
                { scaleX: 0, transformOrigin: "center" },
                { scaleX: 1, duration: 3, ease: "power2.out" }
            );
        }
    }, [startAnimation]);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const iconX = rect.left + rect.width / 2;
        const iconY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - iconX) * 0.2; // intensity
        const deltaY = (e.clientY - iconY) * 0.2;

        gsap.to(el, { x: deltaX, y: deltaY, scale: 1.1, duration: 0.3, ease: "power3.out" });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const el = e.currentTarget;
        gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.5, ease: "power3.out" });
    };

    return (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={controls} className="h-[100vh] rounded-lg bg-[#C1DDDF]">
            <Nav />

            <div className="absolute top-[40%] left-[5%]">
                <div className="flex flex-col gap-5 cursor-pointer">
                    <a
                        href="https://github.com/ivanotch"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Github size={50} color="#1e1d1dff" />
                    </a>
                    <a
                        href="https://www.instagram.com/ivanoskiee/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Instagram size={50} color="#1e1d1dff" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/charlz-ivan-john-babida-364b26257/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Linkedin size={50} color="#1e1d1dff" />
                    </a>
                </div>
            </div>

            <div className="absolute top-[62%] right-[5%]" data-scroll data-scroll-speed="0.2">
                <div className="rotate-90 origin-top-right">
                    <p className="tracking-widest font-[500]">Babida.cij.bscs@gmail.com</p>
                </div>
            </div>

            <div data-scroll data-scroll-speed="0.2" className="absolute left-[65%] top-[40%] -translate-x-1/2">
                <div className="flex gap-0 flex-col items-center">
                    <div className="overflow-hidden">
                        <div
                            ref={nameRef}
                            className="translate-y-10 text-[3.5rem] opacity-0 font-[300] -mb-[0.5rem] font-play-fair"
                        >
                            IVAN BABIDA
                        </div>
                    </div>
                    <div ref={lineRef} className="h-[2px] bg-black w-[100%]" />
                    <div className="overflow-hidden">
                        <div ref={tagRef} className="-translate-y-13 text-[2.5rem] text-gray-600 -mt-[0.5rem] font-play-fair">
                            Your Vision, My Creation.
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
