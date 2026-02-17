import React, { useEffect, useRef, useState } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import gsap from "gsap";
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';
import { useRouter } from "next/navigation";
import { CiLocationArrow1 } from "react-icons/ci";

export default function Footer() {

    const container = useRef<HTMLElement>(null);

    const router = useRouter();

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    })
    const y = useTransform(scrollYProgress, [0, 1], [-200, 0])

    const linesRef = useRef<HTMLDivElement[]>([]);
    const linksRef = useRef<HTMLAnchorElement[]>([]);

    const addLineRef = (el: HTMLDivElement) => {
        if (el && !linesRef.current.includes(el)) linesRef.current.push(el);
    };

    const addLinkRef = (el: HTMLAnchorElement) => {
        if (el && !linksRef.current.includes(el)) linksRef.current.push(el);
    };


    const handleHover = (index: number) => {
        // underline animation
        gsap.to(linesRef.current[index], {
            scaleX: 1,
            transformOrigin: "left",
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleHoverOut = (index: number) => {
        gsap.to(linesRef.current[index], {
            scaleX: 0,
            transformOrigin: "left",
            duration: 0.3,
            ease: "power2.out",
        });

        // reset magnetic position
        gsap.to(linksRef.current[index], {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleMouseMove = (index: number, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const link = linksRef.current[index];
        const rect = link.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        gsap.to(link, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: "power2.out",
        });
    };


    const socials = [
        { name: "Facebook", link: "https://dennissnellenberg.com/contact" },
        { name: "Instagram", link: "https://instagram.com" },
        { name: "Github", link: "https://github.com" },
        { name: "Linkedin", link: "https://linkedin.com" },
    ];

    const [localTime, setLocalTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setLocalTime(new Date());
        }, 1000); // update every second

        return () => clearInterval(interval);
    }, []);

    // Format time as "hh:mm AM/PM GMT+offset"
    const formattedTime = localTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    const timezoneOffset = -localTime.getTimezoneOffset() / 60;

    const buttonRef = useRef<HTMLDivElement>(null)
    const bgRef = useRef<HTMLSpanElement>(null)
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        const bg = bgRef.current;
        const text = textRef.current;

        if (!button || !bg || !text) return;

        // Hover IN (bottom → top)
        const enter = () => {
            gsap.set(bg, { transformOrigin: "bottom" })
            gsap.to(bg, {
                scaleY: 1,
                duration: 0.4,
                ease: "power3.out",
            })
        }

        // Hover OUT (top → bottom)
        const leave = () => {
            gsap.set(bg, { transformOrigin: "top" })
            gsap.to(bg, {
                scaleY: 0,
                duration: 0.4,
                ease: "power3.inOut",
            })

            gsap.to(text, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "power3.out",
            });
        }

        const move = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();

            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(text, {
                x: x * 0.2,   // strength (lower = smoother)
                y: y * 0.2,
                duration: 0.4,
                ease: "power3.out",
            });
        };

        button.addEventListener("mouseenter", enter);
        button.addEventListener("mouseleave", leave);
        button.addEventListener("mousemove", move);

        return () => {
            button.removeEventListener("mouseenter", enter);
            button.removeEventListener("mouseleave", leave);
            button.removeEventListener("mousemove", move);
        }
    }, [])

    return (
        <motion.footer ref={container} style={{ y }} className="bg-white flex flex-col z-[1] items-center justify-center relative">

            {/* motion.Footer Content */}
            <div className="pt-[150px] w-[100%] bg-white">

                <div onClick={() => router.push("/projects")} className="w-[60%] h-[30vh] mx-auto flex items-center justify-center">
                    <div
                        ref={buttonRef}
                        className="relative overflow-hidden rounded-full bg-[#1d1d1d] text-white px-10 py-4 flex items-center gap-3 cursor-pointer"
                    >
                        {/* Animated Blue Layer */}
                        <span
                            ref={bgRef}
                            className="absolute inset-0 bg-blue-600 rounded-full"
                            style={{ transform: "scaleY(0)" }}
                        />

                        {/* Content */}
                        <span ref={textRef} className="relative z-10 flex items-center gap-3">
                            View More
                            <span className="text-[1.5rem]">
                                <CiLocationArrow1 />
                            </span>
                        </span>
                    </div>
                </div>

                <div className="flex justify-between m-[3rem]">
                    <div className="flex gap-5">
                        <span>
                            <h3 className="text-gray-500 font-semibold">Version</h3>
                            <p>2026 © Edition</p>
                        </span>
                        <span>
                            <h3 className="text-gray-500 font-semibold">Local Time</h3>
                            <p>
                                {formattedTime} GMT{timezoneOffset >= 0 ? `+${timezoneOffset}` : timezoneOffset}
                            </p>
                        </span>
                    </div>
                    <div>
                        <h3 className="text-gray-500 font-semibold">socials</h3>
                        <div className="flex gap-5 mt-2">
                            {socials.map((social, index) => (
                                <div key={social.name} className="relative">
                                    <a
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        ref={addLinkRef}
                                        className="relative cursor-pointer inline-block px-1"
                                        onMouseEnter={() => handleHover(index)}
                                        onMouseLeave={() => handleHoverOut(index)}
                                        onMouseMove={(e) => handleMouseMove(index, e)}
                                    >
                                        {social.name}
                                        {/* line under text */}
                                        <div
                                            ref={addLineRef}
                                            className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-0"
                                        />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}