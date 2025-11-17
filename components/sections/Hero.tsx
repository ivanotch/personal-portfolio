"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Nav from "./Nav";
import { Github, Instagram, Slack, Linkedin } from "@deemlol/next-icons";

export default function Hero() {
    const nameRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (nameRef.current) {
            gsap.to(nameRef.current, {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: "power1.inOut"
            });
        }

        if (tagRef.current) {
            gsap.to(tagRef.current, {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: "power1.inOut"
            });
        }

        if (lineRef.current) {
            gsap.fromTo(
                lineRef.current,
                { scaleX: 0, transformOrigin: "center" },
                { scaleX: 1, duration: 1.5, ease: "power2.out" }
            );
        }
    }, []);

    const handleIconHover = () => {
        if (iconRef.current) {
            gsap.fromTo(iconRef.current, {x: 0}, {x: 10, duration: 0.2, yoyoEase: true, repeat: 5, ease: 'power3.inOut'});
        }
    }

    return (
        <div className="h-[100vh] bg-[#C1DDDF]">
            <Nav />

            <div className="absolute top-[40%] left-[5%]">
                <div className="flex flex-col gap-5" data-scroll data-scroll-speed="0.2" >
                    <a
                        ref={iconRef}
                        onMouseEnter={handleIconHover}
                        href="https://github.com/ivanotch"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 cursor-pointer transition-transform"
                    >
                        <Github size={50} color="#1e1d1dff" />
                    </a>
                    <a
                        href="https://instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform"
                    >
                        <Instagram size={50} color="#1e1d1dff" />
                    </a>
                    <a
                        href="https://linkedin.com/in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform"
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
        </div>
    );
}
