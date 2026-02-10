import React, { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import gsap from "gsap";
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';

export default function Footer() {

    const container = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    })
    const x = useTransform(scrollYProgress, [0, 1], [0, 50])
    const y = useTransform(scrollYProgress, [0, 1], [-500, 0])

    const rotate = useTransform(scrollYProgress, [0, 1], [300, 90])


    return (
        <motion.footer ref={container} style={{y}} className="bg-white flex flex-col z-[-100] items-center justify-center relative">

            {/* motion.Footer Content */}
            <div className="pt-[150px] w-[100%] bg-white">
                <div className="w-[60%] mx-[auto]">
                    <div className="flex flex-col mb-[100px] relative">
                        <div className="flex items-center gap-4">
                            <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden">
                                <Image
                                    src="/gighub.png"
                                    alt="profile pic"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <h2 className="text-[9vh] font-semibold">Let's Work</h2>
                        </div>
                        <span className="text-[9vh] leading-none font-semibold">Together</span>

                        <div className="relative mt-8">
                            <div className="absolute top-1/2 left-0 w-full h-[2px] flex -translate-y-1/2">
                                {/* Left line */}
                                <div className="flex-grow bg-black/20"></div>

                                {/* Right line */}
                                <div className="flex-grow bg-black/20"></div>
                            </div>

                            <motion.div style={{x}} className="flex justify-end mr-16">
                                <button className="
                                    w-[160px] h-[160px]
                                    rounded-full
                                    bg-blue-600
                                    text-white
                                    text-lg
                                    font-medium
                                    flex items-center justify-center
                                    transition-all duration-300
                                    hover:scale-105 hover:bg-blue-700
                                    active:scale-95
                                    relative z-10
                                    ">
                                    Get in Touch
                                </button>
                            </motion.div>
                        </div>



                        <motion.svg className="absolute text-black top-[35%] left-[98%]" style={{ rotate, scale: 2 }} width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="black" />
                        </motion.svg>

                        <div className="flex flex-wrap gap-4">
                            <button
                                className="
                                px-8 py-4
                                border border-black
                                rounded-full
                                bg-transparent
                                text-sm font-medium
                                transition-all duration-300
                                hover:bg-black hover:text-white
                                "
                            >
                                info@gmail.com
                            </button>

                            <button
                                className="
                                px-8 py-4
                                border border-black
                                rounded-full
                                bg-transparent
                                text-sm font-medium
                                transition-all duration-300
                                hover:bg-black hover:text-white
                                "
                            >
                                +63 9892738495
                            </button>
                        </div>

                    </div>
                </div>

                <div className="flex justify-between m-[3rem]">
                    <div className="flex gap-5">
                        <span>
                            <h3>Version</h3>
                            <p>2022 © Edition</p>
                        </span>
                        <span>
                            <h3>Version</h3>
                            <p>11:49 PM GMT+2</p>
                        </span>
                    </div>
                    <div>
                        <h3>socials</h3>
                        <div className="flex gap-5">
                            <div>
                                <p>Facebook</p>
                            </div>
                            <div>
                                <p>Instagram</p>
                            </div>
                            <div>
                                <p>Github</p>
                            </div>
                            <div>
                                <p>Linkedin</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}