'use client'

import { useEffect, useState, useRef} from "react"
import Project from "@/components/Project";
import FloatingModal from "@/components/FloatingModal";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";

type ModalState = {
    active: boolean;
    index: number;
};


export default function Projects() {

    const projects = [
        {
            title: "Rescue Link Mobile",
            src: "/gighub.png",
            color: "#000000",
            task: "Design & Development", //design or development or both
            year: "2025"
        },
        {
            title: "Prowood",
            src: "/gighub.png",
            color: "#8C8C8C",
            task: "Design & Development", //design or development or both
            year: "2024"
        },
        {
            title: "Comsa-now",
            src: "/gighub.png",
            color: "#EFE8D3",
            task: "Development", //development
            year: "2025"
        },
        {
            title: "Gighub",
            src: "/gighub.png",
            color: "#706D63",
            task: "Design & Development", //design or development or both
            year: "2025"
        },
    ]

    const sectionRef = useRef<HTMLElement>(null);

    const [modal, setModal] = useState<ModalState>({
        active: false,
        index: 0,
    });

    // useEffect(() => {
    //     gsap.registerPlugin(ScrollTrigger);

    //     if (!sectionRef.current) return;

    //     const bgColor = sectionRef.current.dataset.bgColor;

    //     const ctx = gsap.context(() => {

    //         gsap.to("body", {
    //             backgroundColor: bgColor,
    //             scrollTrigger: {
    //                 trigger: sectionRef.current,
    //                 start: "bottom center",
    //                 scrub: true
    //             }
    //         })
    //     })
    //     return () => ctx.revert();
    // }, [])

    return (
        <main ref={sectionRef} data-bg-color="#1D1D1D" className="h-[100vh] mt-[2rem]">
            <div className="text-[1.3rem] mb-[2rem] ml-[10%] text-gray-400">Projects</div>
            <div className=" mx-[auto] w-[80%]">
                {projects.map((project, index) => {
                    return <Project key={index} index={index} title={project.title} task={project.task} year={project.year} setModal={setModal} />
                })}
            </div>
            <FloatingModal modal={modal} projects={projects}/>
        </main>
    )
}