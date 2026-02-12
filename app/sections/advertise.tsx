import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";


export default function Advertise() {

    const firstSentence = useRef<HTMLSpanElement>(null);
    const littleText = useRef<HTMLParagraphElement>(null);
    const magneticButton = useRef<HTMLDivElement>(null);

    const router = useRouter();

    //use effect animation for the texts
    useEffect(() => {
        gsap.registerPlugin(SplitText, ScrollTrigger);

        if (!firstSentence.current || !littleText.current || !magneticButton.current) return;

        const ctx = gsap.context(() => {

            const splitFirstSentence = new SplitText(firstSentence.current!, {
                type: "words",
            });

            const splitLittleText = new SplitText(littleText.current!, {
                type: "lines",
            });

            // FIRST SENTENCE
            gsap.fromTo(
                splitFirstSentence.words,
                { y: 100, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    stagger: 0.05,
                    duration: 0.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: firstSentence.current,
                        start: "top 100%",
                        toggleActions: "restart none none none",
                    },
                }
            );

            // LITTLE TEXT
            gsap.fromTo(
                splitLittleText.lines,
                { y: 100, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    stagger: 0.05,
                    duration: 0.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: littleText.current,
                        start: "top 100%",
                        toggleActions: "restart none none none",
                    },
                }
            );

            // BUTTON
            gsap.fromTo(
                magneticButton.current,
                { y: 100, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: magneticButton.current,
                        start: "top 100%",
                        toggleActions: "restart none none none",
                    },
                }
            );
        });

        return () => ctx.revert(); // 👈 clean, scoped cleanup
    }, []);


    //use effect animation for the button
    useEffect(() => {

        const el = magneticButton.current;
        if (!el) return;

        const bg = el.querySelector(".hover-bg");

        const onEnter = () => {
            gsap.to(bg, {
                scale: 1,
                duration: 0.5,
                ease: "power3.out"
            })
        }

        const onLeave = () => {
            gsap.to(bg, {
                scale: 0,
                duration: 0.5,
                ease: "power3.in"
            })
        }

        const strength = 0.4;

        const onMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const elCenterX = rect.left + rect.width / 2;
            const elCenterY = rect.top + rect.height / 2;

            const deltaX = e.clientX - elCenterX;
            const deltaY = e.clientY - elCenterY;

            gsap.to(el, {
                x: deltaX * strength,
                y: deltaY * strength,
                duration: 0.3,
                ease: "power3.out",
            });
        }

        const onMouseLeave = () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.4)"
            });
        };

        el.addEventListener("mousemove", onMouseMove);
        el.addEventListener("mouseleave", onMouseLeave);

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);

        return () => {
            el.removeEventListener("mousemove", onMouseMove);
            el.removeEventListener("mouseleave", onMouseLeave);

            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, [])

    return (
        <div
            className="h-[40vh]"
        >
            <div className="flex w-[65%] mx-[auto] mt-[11rem]">
                <h4 className="pr-[2rem]">
                    <span ref={firstSentence} className="fsentence text-[2rem]">I value clean code, feedback, and collaboration. I'm comfortable asking questions, learning from code reviews, and improving fast in team environments.</span>
                </h4>

                <div className="pl-[2rem] w-[100%] p-2">
                    <p ref={littleText} className="text-[1.2em]">
                        Driven by curiosity and purpose, I build solutions that connect technology and people.
                    </p>
                    <div onClick={() => router.push('/about')} ref={magneticButton} className="cursor-pointer p-5 h-30 w-30 mt-[1.6rem] bg-black rounded-full flex items-center justify-center">
                        <span className="hover-bg absolute inset-0 bg-blue-600 rounded-full scale-0" />
                        <span className="relative z-10 text-white">About Me</span>
                    </div>
                </div>
            </div>
        </div>
    )
}