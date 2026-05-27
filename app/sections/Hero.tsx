"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Nav from "./Nav";
import { Github, Instagram, Slack, Linkedin } from "@deemlol/next-icons";
import { motion, useAnimation } from 'framer-motion';
import MagneticLink from "@/components/MagneticLink";
import Image from "next/image";
import { useScroll, useTransform } from 'framer-motion';


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
        <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={controls}
    className="min-h-[100vh] relative rounded-lg bg-[#C1DDDF] overflow-hidden"
>
    <Nav />

    {/* Social Icons */}
    <div className="absolute left-1/2 -translate-x-1/2 bottom-[5%] md:top-[40%] md:left-[5%] md:bottom-auto md:translate-x-0">
        <div className="flex md:flex-col gap-5 cursor-pointer">
            <a
                href="https://github.com/ivanotch"
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <Github size={40} className="md:w-[50px] md:h-[50px]" color="#1e1d1dff" />
            </a>

            <a
                href="https://www.instagram.com/ivanoskiee/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <Instagram size={40} className="md:w-[50px] md:h-[50px]" color="#1e1d1dff" />
            </a>

            <a
                href="https://www.linkedin.com/in/charlz-ivan-john-babida-364b26257/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <Linkedin size={40} className="md:w-[50px] md:h-[50px]" color="#1e1d1dff" />
            </a>
        </div>
    </div>

    {/* Email */}
    <div
        className="hidden md:block absolute top-[62%] right-[5%]"
        data-scroll
        data-scroll-speed="0.2"
    >
        <div className="rotate-90 origin-top-right">
            <p className="tracking-widest font-[500]">
                Babida.cij.bscs@gmail.com
            </p>
        </div>
    </div>

    {/* Hero Image - Hidden on Mobile */}
    <div
        className="hidden md:block absolute left-[14%] top-[20%] w-[60%] h-[70%] rounded-lg"
        data-scroll
        data-scroll-speed="0.2"
        style={{
            transform: "translateY(-10px) scale(1.02)",
        }}
    >
        {/* Shadow wrapper */}
        <div
            className="w-full h-full rounded-lg"
            style={{
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
            }}
        >
            <Image
                alt="hero pic"
                src="/hero-picv2.png"
                fill
                className="object-cover rounded-lg"
                style={{
                    clipPath:
                        "polygon(0 0, 100% 0, 100% 20%, 60% 20%, 60% 60%, 100% 60%, 100% 100%, 0 100%)",
                }}
            />
        </div>
    </div>

    {/* Hero Text */}
    <div
        data-scroll
        data-scroll-speed="0.2"
        className="
            absolute
            top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            md:left-[65%] md:top-[40%]
            md:-translate-x-1/2 md:-translate-y-0
            w-full px-6 md:w-auto
        "
    >
        <div className="flex gap-0 flex-col items-center text-center">
            <div className="overflow-hidden">
                <div
                    ref={nameRef}
                    className="
                        translate-y-10 opacity-0
                        text-[2.2rem] leading-tight
                        md:text-[3.5rem]
                        font-[300] md:-mb-[0.5rem]
                        font-play-fair
                    "
                >
                    IVAN BABIDA
                </div>
            </div>

            <div
                ref={lineRef}
                className="h-[2px] bg-black w-[80%] md:w-[100%]"
            />

            <div className="overflow-hidden">
                <div
                    ref={tagRef}
                    className="
                        -translate-y-13
                        text-[1.3rem]
                        md:text-[2.5rem]
                        text-gray-600
                        md:-mt-[0.5rem]
                        font-play-fair
                    "
                >
                    Your Vision, My Creation.
                </div>
            </div>
        </div>
    </div>
</motion.div>
    );
}
