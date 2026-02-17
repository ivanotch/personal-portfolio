'use client'

import Image from "next/image";
import Nav from "@/app/sections/Nav";
import MagneticButton from "@/components/MagneticButton";
import { useState, useEffect, useRef } from "react";
import PageTransition from "@/components/PagePreloader";
import { AnimatePresence } from "framer-motion";


type ProjectProps = {
    id: string;
    title: string;
    src: string;
    color: string;
    task: string;
    year: string;
    featurePic: string;
    advertisementPic: string;
    type: string;
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
                    el: document.querySelector("#contact-page"),
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


    return (
        <AnimatePresence mode="wait">
            {showLoader && <PageTransition key="preloader" title={project.title} />}

            {!showLoader && (
                <main id="projects-page">
                    <Nav />
                    <div className="w-[70%] mx-[auto] mb-[7rem]">
                        <p className="text-[4rem] font-[450] font-[poppins] mt-[9rem]">{project.title}</p>

                        <div className="flex justify-between mt-[8rem]">
                            <div className="flex flex-col gap-6 w-[30%]">
                                <div className="text-gray-400 font-semibold tracking-wide">Roles</div>
                                <div className="border-t border-gray-400"></div>
                                <div className="text-[1.1rem] font-[500]">{project.task}</div>
                            </div>
                            <div className="flex flex-col gap-6 w-[30%]">
                                <div className="text-gray-400 font-semibold tracking-wide">Type</div>
                                <div className="border-t border-gray-400"></div>
                                <div className="text-[1.1rem] font-[500]">{project.type}</div>
                            </div>
                            <div className="flex flex-col gap-6 w-[30%]">
                                <div className="text-gray-400 font-semibold tracking-wide">year</div>
                                <div className="border-t border-gray-400"></div>
                                <div className="text-[1.1rem] font-[500]">{project.year}</div>
                            </div>
                        </div>
                    </div>

                    <div className="h-[85vh] flex items-center justify-center relative">
                        <div className="w-[80%] h-[96%] relative">
                            <Image
                                src="/gighub.png"
                                alt="profile pic"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="absolute top-[-20%] right-[10%]">
                            <MagneticButton text={"Project Link"} />
                        </div>
                    </div>

                    <div className="h-[100vh]">

                    </div>
                </main>
            )
            }
        </AnimatePresence >

    )
}