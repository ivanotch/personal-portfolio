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

    const projects = [
        {
            id: "rescue-link",
            title: "Rescue Link Mobile",
            src: "/gighub.png",
            color: "#000000",
            task: "Design & Development", //design or development or both
            year: "2025",
            featurePic: "",
            advertisementPic: "/gighub.png",
            featureText: "Seamlessly connect to rescuers",
            about: "A mobile app that connects people to nearby shelter and relief",
            type: "Individual"
        },
        {
            id: "Prowood",
            title: "Prowood",
            src: "/gighub.png",
            color: "#8C8C8C",
            task: "Design & Development", //design or development or both
            year: "2024",
            featurePic: "/gighub.png",
            advertisementPic: "/gighub.png",
            featureText: "Premium wood panels, delivered with precision.",
            about: "An E-commerce website for Wood Panels and Floorings",
            type: "Individual"
        },
        {
            id: "comsa",
            title: "Comsa-now",
            src: "/gighub.png",
            color: "#EFE8D3",
            task: "Development", //development
            year: "2025",
            featurePic: "/gighub.png",
            advertisementPic: "/gighub.png",
            featureText: "Strengthening the digital voice of Comsa.",
            about: "A social media for EARIST Computer Science Association",
            type: "team"
        },
        {
            id: "gighub",
            title: "Gighub",
            src: "/gighub.png",
            color: "#706D63",
            task: "Design & Development", //design or development or both
            year: "2025",
            featurePic: "/gighub.png",
            advertisementPic: "/gighub.png",
            featureText: "Connecting nearby gig workers with SMEs for a reliable task fulfillment.",
            about: "An App that connects nearby gig worker to SMEs looking for someone to to short fulfillment task",
            type: "Individual"
        },
    ]

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
                    return <Project key={index} index={index} id={project.id} title={project.title} task={project.task} year={project.year} setModal={setModal} />
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