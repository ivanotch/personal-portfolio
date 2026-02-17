"use client"
import { useRef, useEffect } from 'react';
import { gsap } from "gsap";
import Link from 'next/link';


export default function MagneticButton({text, link}: {text: string, link: string }) {

    const magneticButton = useRef<HTMLAnchorElement>(null);

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
        <Link href={link} ref={magneticButton} className="cursor-pointer p-5 h-30 w-30 mt-[1.6rem] bg-black rounded-full flex items-center justify-center">
            <span className="hover-bg absolute inset-0 bg-blue-600 rounded-full scale-0" />
            <span className="relative z-10 text-white text-center">{text}</span>
        </Link>
    )
}