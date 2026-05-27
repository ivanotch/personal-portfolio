import React, { useEffect, useRef, useState } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import gsap from "gsap";
import {
    useScroll,
    motion,
    useTransform,
} from "framer-motion";
import { useRouter } from "next/navigation";

export default function Footer() {

    const container = useRef<HTMLElement>(null);
    const router = useRouter();

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);

    const rotate = useTransform(
        scrollYProgress,
        [0, 1],
        [300, 90]
    );

    const linesRef = useRef<HTMLDivElement[]>([]);
    const linksRef = useRef<HTMLAnchorElement[]>([]);

    const addLineRef = (el: HTMLDivElement) => {
        if (el && !linesRef.current.includes(el)) {
            linesRef.current.push(el);
        }
    };

    const addLinkRef = (el: HTMLAnchorElement) => {
        if (el && !linksRef.current.includes(el)) {
            linksRef.current.push(el);
        }
    };

    const handleHover = (index: number) => {
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

        gsap.to(linksRef.current[index], {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleMouseMove = (
        index: number,
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {

        // Disable magnetic effect on mobile
        if (window.innerWidth < 768) return;

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
        {
            name: "Facebook",
            link: "https://www.facebook.com/ivan.babida"
        },
        {
            name: "Instagram",
            link: "https://www.instagram.com/ivanoskiee/"
        },
        {
            name: "Github",
            link: "https://github.com/ivanotch"
        },
        {
            name: "Linkedin",
            link: "https://www.linkedin.com/in/charlz-ivan-john-babida-364b26257/"
        },
    ];

    const [localTime, setLocalTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setLocalTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedTime = localTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    const timezoneOffset =
        -localTime.getTimezoneOffset() / 60;

    return (
        <motion.footer
            ref={container}
            style={{ y }}
            className="
                bg-white
                flex flex-col
                z-[1]
                items-center
                justify-center
                relative
                overflow-hidden
                pt-[5rem]
                md:pt-[0rem]
            "
        >

            {/* Footer Content */}
            <div className="pt-[80px] md:pt-[150px] w-full bg-white">

                <div className="w-[90%] md:w-[60%] mx-auto">

                    <div className="flex flex-col mb-[80px] md:mb-[100px] relative">

                        {/* Heading */}
                        <div className="flex items-center gap-4">

                            <div
                                className="
                                    relative
                                    w-[70px] h-[70px]
                                    md:w-[100px] md:h-[100px]
                                    rounded-full
                                    overflow-hidden
                                    shrink-0
                                "
                            >
                                <Image
                                    src="/small-avatar.png"
                                    alt="profile pic"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            <h2
                                className="
                                    text-[2.5rem]
                                    leading-none
                                    sm:text-[4rem]
                                    md:text-[9vh]
                                    font-semibold
                                "
                            >
                                Let's Work
                            </h2>
                        </div>

                        <span
                            className="
                                text-[2.5rem]
                                sm:text-[4rem]
                                md:text-[9vh]
                                leading-none
                                font-semibold
                                ml-[0.2rem]
                            "
                        >
                            Together
                        </span>

                        {/* Divider + CTA */}
                        <div className="relative mt-8">

                            <div
                                className="
                                    absolute top-1/2 left-0
                                    w-full h-[2px]
                                    flex -translate-y-1/2
                                "
                            >
                                <div className="flex-grow bg-black/20"></div>
                                <div className="flex-grow bg-black/20"></div>
                            </div>

                            <motion.div
                                style={{ x }}
                                className="
                                    flex justify-center md:justify-end
                                    md:mr-16
                                "
                            >
                                <button
                                    className="
                                        w-[120px] h-[120px]
                                        md:w-[160px] md:h-[160px]
                                        rounded-full
                                        bg-blue-600
                                        text-white
                                        text-sm md:text-lg
                                        font-medium
                                        flex items-center justify-center
                                        transition-all duration-300
                                        hover:scale-105 hover:bg-blue-700
                                        active:scale-95
                                        relative z-10
                                        mt-8
                                    "
                                    onClick={() => router.push('/contact')}
                                >
                                    Get in Touch
                                </button>
                            </motion.div>
                        </div>

                        {/* Arrow */}
                        <motion.svg
                            className="
                                absolute
                                hidden md:block
                                text-black
                                top-[35%]
                                left-[98%]
                            "
                            style={{ rotate, scale: 2 }}
                            width="9"
                            height="9"
                            viewBox="0 0 9 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
                                fill="black"
                            />
                        </motion.svg>

                        {/* Contact Buttons */}
                        <div
                            className="
                                flex flex-col sm:flex-row
                                gap-4
                                mt-8
                            "
                        >

                            <a
                                href="mailto:info@gmail.com"
                                className="
                                    px-6 py-4 md:px-8
                                    border border-black
                                    rounded-full
                                    bg-transparent
                                    text-sm font-medium
                                    transition-all duration-300
                                    hover:bg-black hover:text-white
                                    inline-block
                                    text-center
                                    break-all
                                "
                            >
                                Babida.cij.bscs@gmail.com
                            </a>

                            <a
                                href="tel:+639892738495"
                                className="
                                    px-6 py-4 md:px-8
                                    border border-black
                                    rounded-full
                                    bg-transparent
                                    text-sm font-medium
                                    transition-all duration-300
                                    hover:bg-black hover:text-white
                                    inline-block
                                    text-center
                                "
                            >
                                +63 9892738495
                            </a>
                        </div>

                    </div>
                </div>

                {/* Bottom Footer */}
                <div
                    className="
                        flex flex-col md:flex-row
                        justify-between
                        gap-10
                        m-[1.5rem] md:m-[3rem]
                    "
                >

                    {/* Left Info */}
                    <div
                        className="
                            flex flex-col sm:flex-row
                            gap-6
                        "
                    >
                        <span>
                            <h3 className="text-gray-500 font-semibold">
                                Version
                            </h3>

                            <p>2026 © Edition</p>
                        </span>

                        <span>
                            <h3 className="text-gray-500 font-semibold">
                                Local Time
                            </h3>

                            <p>
                                {formattedTime} GMT
                                {timezoneOffset >= 0
                                    ? `+${timezoneOffset}`
                                    : timezoneOffset}
                            </p>
                        </span>
                    </div>

                    {/* Socials */}
                    <div>
                        <h3 className="text-gray-500 font-semibold">
                            socials
                        </h3>

                        <div
                            className="
                                flex flex-wrap
                                gap-5
                                mt-2
                            "
                        >
                            {socials.map((social, index) => (
                                <div
                                    key={social.name}
                                    className="relative"
                                >
                                    <a
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        ref={addLinkRef}
                                        className="
                                            relative
                                            cursor-pointer
                                            inline-block
                                            px-1
                                        "
                                        onMouseEnter={() => handleHover(index)}
                                        onMouseLeave={() => handleHoverOut(index)}
                                        onMouseMove={(e) =>
                                            handleMouseMove(index, e)
                                        }
                                    >
                                        {social.name}

                                        <div
                                            ref={addLineRef}
                                            className="
                                                absolute
                                                left-0
                                                -bottom-1
                                                w-full
                                                h-[2px]
                                                bg-black
                                                scale-x-0
                                            "
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