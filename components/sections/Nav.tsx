import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Slack } from "@deemlol/next-icons";
import { gsap } from "gsap";

export default function Nav() {
    const slackRef = useRef<SVGSVGElement>(null);
    let spinTween: gsap.core.Tween;
    const parentRef = useRef<HTMLDivElement>(null);
    const ivanotchRef = useRef<HTMLDivElement>(null);
    const realnameRef = useRef<HTMLDivElement>(null);
    const timeline = useRef<gsap.core.Timeline>(null);

    useEffect(() => {
        if (slackRef.current) {
            // Continuous spin
            spinTween = gsap.to(slackRef.current, {
                rotation: 360,
                duration: 3,
                repeat: -1,
                ease: "linear",
                transformOrigin: "50% 50%",
            });
        }

        return () => {
            // cleanup
            spinTween?.kill();
        };
    }, []);

    useEffect(() => {
        gsap.set(realnameRef.current, { x: 50, opacity: 0 });

        timeline.current = gsap.timeline({ paused: true })
        timeline.current
            .to(ivanotchRef.current, { x: -50, opacity: 0, duration: 0.5, ease: 'power3.inOut' })
            .to(realnameRef.current, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.inOut' }, '<')
    }, [])



    const handleMouseEnter = () => {
        timeline.current?.play();
        spinTween.pause();

        if (slackRef.current) {
            // Rotate backward while scaling
            gsap.to(slackRef.current, {
                rotation: "-=360", // rotate -360 degrees from current position
                scale: 1.3,
                duration: 0.3,
                ease: "power1.inOut",
            });
        }
    };

    const handleMouseLeave = () => {
        timeline.current?.reverse();
        if (slackRef.current) {
            // Reset scale and resume continuous spin
            gsap.to(slackRef.current, {
                scale: 1,
                duration: 0.2,
                ease: "power1.out",
                onComplete: () => {
                    spinTween.play();
                },
            });
        }
    };


    return (
        <header className="flex p-[2rem] justify-between items-center">
            <div
                ref={parentRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="ml-[30px] text-[1.1rem] flex gap-2 items-center font-poppins font-[600]"
            >
                <Slack size={24} ref={slackRef} color="#008000" />
                <div className="relative overflow-hidden h-[1.2em] w-[8rem]">
                    <div ref={ivanotchRef} className="absolute top-0 left-0 w-full">
                        IVANOTCH
                    </div>
                    <div ref={realnameRef} className="absolute top-0 left-0 w-full">
                        Ivan Babida
                    </div>
                </div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl px-2 py-1 w-[15rem] rounded-xl flex justify-center">
                <ul className="flex gap-[1rem]">
                    <li>About Me</li>
                    <li>:</li>
                    <li>Projects</li>
                </ul>
            </div>

            <div className="flex bg-black rounded-xl flex justify-center mr-[30px] px-2 py-1 gap-[2.5rem]">
                <p className="text-white">Get in Touch</p>
                <ArrowUpRight size={24} color="#FFFFFF" />
            </div>
        </header>
    );
}
