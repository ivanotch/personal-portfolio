'use client';

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "@/components/PagePreloader";
import LandingAbout from "./LandingAbout";


export default function AboutMe() {
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
                    el: document.querySelector("#about-page"),
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
            {showLoader && <PageTransition key="preloader" title="About Me" />}

            {!showLoader && (
                <LandingAbout />
            )}
        </AnimatePresence>
    );
}
