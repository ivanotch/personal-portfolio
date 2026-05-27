'use client'

import Image from "next/image";
import Nav from "@/app/sections/Nav";
import MagneticButton from "@/components/MagneticButton";
import { useState, useEffect, useRef } from "react";
import PageTransition from "@/components/PagePreloader";
import { AnimatePresence } from "framer-motion";
import ProjectFooter from './ProjectFooter'
import { useScroll, useTransform, motion } from "framer-motion";

type ProjectProps = {
    id: string;
    title: string;
    src: string;
    color: string;
    task: string;
    year: string;
    featurePic: string;
    advertisementPic: string;
    featureText: string;
    about: string;
    type: string;
    link: string;
}

type Prop = {
    project: ProjectProps
}

export default function ProjectInfo({ project }: Prop) {

    const [showLoader, setShowLoader] = useState(true);
    const locoRef = useRef<any>(null);

    // prevent scrolling while loading
    useEffect(() => {
        document.body.style.overflow = showLoader ? "hidden" : "auto";
        document.body.style.overflowX = "hidden";
        return () => {
            document.body.style.overflow = "auto";
            document.body.style.overflowX = "hidden";
        };
    }, [showLoader]);

    // Initialize LocomotiveScroll dynamically after loader
    useEffect(() => {
        (async () => {
            const LocomotiveScroll = (await import("locomotive-scroll")).default;

            setTimeout(() => {
                setShowLoader(false);

                // scroll to top
                window.scrollTo(0, 0);

                // initialize Locomotive Scroll
                locoRef.current = new (LocomotiveScroll as any)({
                    el: document.querySelector("#projects-page"),
                    smooth: true,
                    multiplier: 1,
                    lerp: 0.1,
                });

                // make sure scroll starts at top
                locoRef.current.scrollTo(0, { duration: 0, disableLerp: true });

                document.body.style.cursor = "default";
            }, 2000);
        })();

        return () => locoRef.current?.destroy();
    }, []);

    const projectRef = useRef<HTMLElement>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const { scrollYProgress } = useScroll({
        target: projectRef,
        offset: ["start end", "end start"]
    })

    const height = useTransform(scrollYProgress ?? 0, [0, 0.95], [50, 0])

    return (
        <AnimatePresence mode="wait">
            {showLoader && <PageTransition key="preloader" title={project.title} />}

            <main ref={projectRef} id="projects-page">
                {!showLoader && (
                    <main>
                        <Nav />
                        <div className="
                            w-[90%]
                            md:w-[70%]
                            mx-auto
                            mb-[4rem]
                            md:mb-[7rem]
                        ">
                            <p
                                className="
                                text-[2.4rem]
                                sm:text-[3rem]
                                md:text-[4rem]
                                leading-tight
                                font-[450]
                                font-[poppins]
                                mt-[6rem]
                                md:mt-[9rem]
                            "
                            >{project.title}</p>

                            <div
                                className="
                                flex
                                flex-col
                                md:flex-row
                                gap-10
                                md:gap-0
                                justify-between
                                mt-[4rem]
                                md:mt-[8rem]
                            "
                            >
                                <div className="flex flex-col gap-6 w-full md:w-[30%]">
                                    <div className="text-gray-400 font-semibold tracking-wide">Roles</div>
                                    <div className="border-t border-gray-400"></div>
                                    <div className="text-[1.1rem] font-[500]">{project.task}</div>
                                </div>
                                <div className="flex flex-col gap-6 w-full md:w-[30%]">
                                    <div className="text-gray-400 font-semibold tracking-wide">Type</div>
                                    <div className="border-t border-gray-400"></div>
                                    <div className="text-[1.1rem] font-[500]">{project.type}</div>
                                </div>
                                <div className="flex flex-col gap-6 w-full md:w-[30%]">
                                    <div className="text-gray-400 font-semibold tracking-wide">year</div>
                                    <div className="border-t border-gray-400"></div>
                                    <div className="text-[1.1rem] font-[500]">{project.year}</div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="
                            min-h-[60vh]
                            md:h-[85vh]
                            flex
                            items-center
                            justify-center
                            relative
                            py-10
                        "
                        >
                            <div
                                className="
                                    w-[92%]
                                    md:w-[80%]
                                    aspect-[16/10]
                                    md:h-[96%]
                                    relative
                                "
                            >
                                <Image
                                    src={project.src}
                                    alt="profile pic"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <div
                                className="
                                    absolute
                                    top-[-12%]
                                    md:top-[-20%]
                                    right-[4%]
                                    md:right-[10%]
                                    scale-[0.8]
                                    md:scale-100
                                "
                            >
                                <MagneticButton text={"Project Link"} link={project.link} />
                            </div>
                        </div>

                        <div
                            className="
                                min-h-screen
                                flex
                                items-center
                                justify-center
                                bg-[#e9eaeb]
                                py-16
                            "
                        >
                            <div
                                className="
                                    flex
                                    flex-col
                                    md:flex-row
                                    w-[90%]
                                    md:w-[80%]
                                    gap-10
                                    md:gap-20
                                    items-center
                                "
                            >
                                <p
                                    className="
                                        text-[1.4rem]
                                        sm:text-[1.8rem]
                                        md:text-[2.4rem]
                                        leading-relaxed
                                        font-[inter]
                                        font-[450]
                                        md:pr-[1rem]
                                    "
                                >
                                    {project.about}
                                </p>

                                <div
                                    className="
                                        bg-black
                                        p-3
                                        md:p-6
                                        rounded-xs
                                        w-full
                                    "
                                >
                                    <Image
                                        src={project.featurePic}
                                        alt="feature pic"
                                        width={900}
                                        height={800}
                                        className="object-cover rounded-xs"
                                    />
                                </div>

                            </div>
                        </div>

                        <div
                            className="
                                min-h-[50vh]
                                md:h-[60vh]
                                flex
                                items-center
                                justify-center
                                bg-[#1d1d1d]
                                relative
                                z-[100]
                                py-10
                            "
                        >
                            <div
                            className="
                                w-[92%]
                                md:w-[80%]
                                aspect-[16/9]
                                md:h-[90%]
                                relative
                            "
                        >
                                <Image
                                    src={project.advertisementPic}
                                    alt="ad pic"
                                    fill
                                    className="object-contain"
                                />
                                <p
                                    className="
                                    absolute 
                                    bottom-[4%] md:bottom-[10%] 
                                    right-[5%] 
                                    text-[0.9rem] sm:text-[1.2rem] md:text-[1.8rem]
                                    font-semibold 
                                    px-3 py-2 md:px-6 md:py-4
                                    bg-black/60
                                    text-white
                                    rounded-xl
                                    backdrop-blur-md
                                "
                                >
                                    {project.featureText}
                                </p>
                            </div>
                        </div>

                        <ProjectFooter />
                    </main>
                )
                }
            </main>

        </AnimatePresence >

    )
}