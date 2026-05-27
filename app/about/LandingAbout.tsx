'use client'
import Nav from "../sections/Nav";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";


export default function LandingAbout() {
    const heroContainer = useRef<HTMLDivElement>(null);
    const firstText = useRef<HTMLParagraphElement>(null);
    const secondText = useRef<HTMLParagraphElement>(null);
    const slider = useRef<HTMLDivElement>(null)

    let xPercent = 0;
    let direction = -1;


    const { scrollYProgress } = useScroll({
        target: heroContainer,
        offset: ["end start", "start start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [150, 0])

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        requestAnimationFrame(animation)

        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                scrub: true,
                onUpdate: e => direction = e.direction * -1
            },
            x: "-=300px",
        })
    }, [])

    const animation = () => {
        if (xPercent <= -100) {
            xPercent = 0;
        }
        if (xPercent > 0) {
            xPercent = -100;
        }
        gsap.set(firstText.current, {
            xPercent: xPercent
        })
        gsap.set(secondText.current, {
            xPercent: xPercent
        })
        xPercent += 0.04 * direction;
        requestAnimationFrame(animation)
    }

    return (
        <motion.main
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Locomotive Scroll container */}
            <div id="about-page" className="overflow-hidden">
                <div className="relative min-h-[100vh] bg-[#e9eaeb] pb-[8rem] md:pb-0">
                    <Nav />

                    <div
                        className="
                    w-[90%] md:w-[80%]
                    mx-auto
                    mt-[10%] md:mt-[5%]
                    overflow-hidden
                    flex flex-col md:flex-row
                    justify-between
                    gap-10
                    z-[10]
                    items-center md:items-start
                "
                    >

                        {/* Sticky Image */}
                        <motion.div
                            ref={heroContainer}
                            style={{ y }}
                            className="
                        relative
                        h-[22rem] w-[18rem]
                        md:h-[35rem] md:w-[29rem]
                        z-[1]
                        shrink-0
                    "
                            data-scroll
                            data-scroll-sticky
                            data-scroll-speed="0.9"
                        >
                            <Image
                                src="/small-avatar.png"
                                alt="profile pic"
                                fill
                                className="object-cover rounded-lg"
                            />
                        </motion.div>

                        {/* Parallax Text */}
                        <div
                            data-scroll
                            data-scroll-speed="2"
                            className="
                        w-full md:w-[33rem]
                        flex flex-col gap-5
                        pt-0 md:pt-[4rem]
                        text-center md:text-left
                    "
                        >
                            <p
                                className="
                            text-[1.1rem]
                            leading-[1.9rem]
                            md:text-2xl
                            md:leading-normal
                        "
                            >
                                I’m a computer science student and aspiring
                                full-stack developer. I build web applications
                                with Next.js and React, handle backend logic,
                                and work with databases like Firebase, MongoDB,
                                and PostgreSQL. I’m also familiar with mobile
                                development using React Native and Expo.
                            </p>

                            <div className="text-[1rem] md:text-base">
                                Ready to learn..
                            </div>
                        </div>

                    </div>

                    {/* Scrolling Text */}
                    <div
                        className="
                            absolute
                            top-[calc(110vh)]
                            md:top-[calc(100vh-300px)]
                            z-[1000]
                        "
                    >
                        <div
                            ref={slider}
                            className="relative whitespace-nowrap flex"
                        >
                            <p
                                ref={firstText}
                                className="
                                    m-[0px]
                                    text-[80px]
                                    md:text-[240px]
                                    text-black
                                    font-500
                                "
                            >
                                Ivan Babida - Ivan Babida -
                            </p>

                            <p
                                ref={secondText}
                                className="
                            m-[0px]
                            text-[80px]
                            md:text-[240px]
                            text-black
                            font-500
                            absolute left-[100%]
                        "
                            >
                                Ivan Babida - Ivan Babida -
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.main>
    );
}
