'use client'

import { useEffect, useState, useRef } from "react"
import Project from "@/components/Project";
import FloatingModal from "@/components/FloatingModal";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { projects } from '@/data/projects'

type ModalState = {
    active: boolean;
    index: number;
};


export default function Projects() {

    const sectionRef = useRef<HTMLElement>(null);

    const [modal, setModal] = useState<ModalState>({
        active: false,
        index: 0,
    });

    const buttonRef = useRef<HTMLButtonElement>(null);
    const bgRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    const router = useRouter();

    useEffect(() => {
        const button = buttonRef.current;
        const bg = bgRef.current;
        const text = textRef.current;

        if (!button || !bg || !text) return;

        // Initial state of blue background
        gsap.set(bg, {
            y: "100%",
            borderTopLeftRadius: "100%",
            borderTopRightRadius: "100%",
        });

        // Hover animation
        const enter = () => {
            gsap.to(bg, {
                y: "0%",
                borderTopLeftRadius: "0%",
                borderTopRightRadius: "0%",
                duration: 0.6,
                ease: "power3.out",
            });

            gsap.to(text, {
                color: "#ffffff",
                duration: 0.4,
                ease: "power2.out",
            });
        };

        const leave = () => {
            gsap.to(bg, {
                y: "100%",
                borderTopLeftRadius: "100%",
                borderTopRightRadius: "100%",
                duration: 0.6,
                ease: "power3.inOut",
            });

            gsap.to(text, {
                color: "#000000",
                duration: 0.4,
                ease: "power2.out",
            });
        };

        // Magnetic effect
        const move = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(button, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.4,
                ease: "power3.out",
            });
        };

        const resetMagnetic = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.4)",
            });
        };

        button.addEventListener("mouseenter", enter);
        button.addEventListener("mouseleave", leave);
        button.addEventListener("mousemove", move);
        button.addEventListener("mouseleave", resetMagnetic);

        return () => {
            button.removeEventListener("mouseenter", enter);
            button.removeEventListener("mouseleave", leave);
            button.removeEventListener("mousemove", move);
            button.removeEventListener("mouseleave", resetMagnetic);
        };
    }, []);


    return (
        <main ref={sectionRef} data-bg-color="#1D1D1D" className="h-[100vh] mt-[2rem]">
            <div className="text-[1.3rem] mb-[2rem] ml-[10%] text-gray-400">Projects</div>
            <div className=" mx-[auto] w-[80%]">
                {projects.map((project, index) => {
                    return <Project key={index} index={index} id={project.id} src={project.src} advertisementPic={project.advertisementPic} featurePic={project.advertisementPic} title={project.title} task={project.task} year={project.year} setModal={setModal} />
                })}
            </div>
            <FloatingModal modal={modal} projects={projects} />
            <div className="flex items-center justify-center mt-[1rem] mb-[2rem]">
                <button
                    onClick={() => router.push('/projects')}
                    ref={buttonRef}
                    className="relative overflow-hidden py-5 px-7 border rounded-full text-black"
                >
                    {/* Blue animated background */}
                    <span
                        ref={bgRef}
                        className="absolute inset-0 bg-blue-600 z-0"
                    />

                    {/* Text */}
                    <span ref={textRef} className="relative z-10">More Projects</span>
                </button>
            </div>
        </main>
    )
}