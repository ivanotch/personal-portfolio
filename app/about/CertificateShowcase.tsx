"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSpring } from "framer-motion";
import Specialty from "./Specialty";

export default function CertificateShowcase() {

    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const yFast = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const smoothFast = useSpring(yFast, {
        stiffness: 200,
        damping: 80
    });

    const certs = [
        {
            name: "Git and Github",
            src: "/certificate/git.jpg",
            bg: "bg-[#d6d7dc]"
        },
        {
            name: "Introduction to Cloud Computing",
            src: "/certificate/intro-cloud.jpg",
            bg: "bg-[#e3e3e3]"
        },
        {
            name: "Front-End With React",
            src: "/certificate/react.png",
            bg: "bg-[#d4e3e6]"
        },
        {
            name: "Web Development with HTML, CSS, Javascript",
            src: "/certificate/web.jpg",
            bg: "bg-[#21242b]"
        },
        {
            name: "2022 Web Development Bootcamp",
            src: "/certificate/udemy.jpg",
            bg: "bg-[#d7d4cf]"
        },
    ];

    return (
        <main
            ref={containerRef}
            className="relative"
        >

            {/* Heading */}
            <div
                className="
                    relative
                    px-6 md:px-0
                    pt-[4rem] md:pt-0
                    md:absolute md:left-[9%] md:top-[4%]
                    z-[5]
                "
            >
                <p
                    className="
                        text-[3rem]
                        leading-none
                        sm:text-[4rem]
                        md:text-[12em]
                        tracking-wide md:tracking-widest
                        font-semibold
                        text-gray-300
                        font-inter
                    "
                >
                    Certificates
                </p>
            </div>

            {/* Main Content */}
            <div
                className="
                    min-h-[100vh]
                    pt-[3rem] md:pt-[14rem]
                    relative
                    flex flex-col md:block
                    gap-16 md:gap-40
                    px-6 md:px-0
                "
            >

                {/* Description */}
                <div
                    className="
                        w-full md:w-[20%]
                        md:left-[12%]
                        md:absolute
                        md:mt-[2rem]
                        flex flex-col gap-5
                        text-center md:text-left
                        mb-[2rem] md:mb-[5rem]
                    "
                >
                    <p
                        className="
                            text-[1rem]
                            leading-[1.8rem]
                            md:text-[1.3em]
                            md:mt-[6rem]
                            font-semibold
                        "
                    >
                        Beyond my academic background, I've earned
                        certifications from specialized development
                        courses to refine my practical skills in
                        modern web and mobile technologies.
                    </p>

                    <p className="text-gray-500 font-semibold">
                        Striving for Knowledge..
                    </p>
                </div>

                {/* Certificate Cards */}
                <div
                    className="
                        w-full md:w-[50%]
                        md:absolute md:right-[10%]
                        flex flex-col gap-5
                    "
                >

                    {/* Top Row */}
                    <div
                        className="
                            grid grid-cols-1
                            sm:grid-cols-2
                            md:flex
                            justify-center
                            gap-5
                        "
                    >
                        {certs.slice(0, 3).map((cert, index) => (
                            <motion.div
                                style={{ y: smoothFast }}
                                key={index}
                                className={`
                                    flex flex-col items-center
                                    p-4
                                    ${cert.bg}
                                    shadow-xl
                                    rounded-xl
                                    w-full md:w-70
                                `}
                            >
                                <img
                                    src={cert.src}
                                    alt={cert.name}
                                    className="
                                        w-full
                                        h-52 md:h-40
                                        object-cover
                                        rounded-xl
                                        mb-4
                                    "
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom Row */}
                    <div
                        className="
                            grid grid-cols-1
                            sm:grid-cols-2
                            md:flex
                            justify-center
                            gap-5
                        "
                    >
                        {certs.slice(3, 5).map((cert, index) => (
                            <motion.div
                                style={{ y: smoothFast }}
                                key={index}
                                className={`
                                    flex flex-col items-center
                                    p-4
                                    ${cert.bg}
                                    shadow-xl
                                    rounded-xl
                                    w-full md:w-70
                                `}
                            >
                                <img
                                    src={cert.src}
                                    alt={cert.name}
                                    className="
                                        w-full
                                        h-52 md:h-40
                                        object-cover
                                        rounded-xl
                                        mb-4
                                    "
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <Specialty />
        </main>
    );
}