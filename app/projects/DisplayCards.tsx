"use client";

import { useState } from "react"
import { useRef } from "react";
import { gsap } from "gsap";
import { CiBoxList } from "react-icons/ci";
import { LuLayoutGrid } from "react-icons/lu";
import { projects } from '@/data/projects';
import Project from "@/components/Project";
import FloatingModal from "@/components/FloatingModal";


type ModalState = {
    active: boolean;
    index: number;
};

export default function DisplayCards() {

    const categories = ["All", "Design", "Development"];

    const [filter, setFilter] = useState("All");
    const [layout, setLayout] = useState("list");

    const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget;

        const { left, top, width, height } = el.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);

        gsap.to(el, {
            x: x * 0.25,
            y: y * 0.25,
            duration: 0.4,
            ease: "power3.out",
        });
    };

    const handleMagneticLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget;

        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
        });
    };

    const [modal, setModal] = useState<ModalState>({
            active: false,
            index: 0,
        });

    return (
        <main className="overflow-y-hidden">
            <div className="font-[inter] text-[4rem] mx-[auto] w-[60%] mt-[7rem] font-semibold">
                Building thoughtful digital experiences
            </div>

            <div className="flex items-center w-[80%] mx-[auto] justify-between mt-[2.8rem]">
                <div className="flex gap-4">
                    {categories.map((item, index) => (
                        <div
                            key={item}
                            onMouseMove={handleMagneticMove}
                            onClick={() => {
                                setFilter(item)
                                console.log(filter)
                            }}
                            onMouseLeave={handleMagneticLeave}
                            className="relative cursor-pointer overflow-hidden px-8 py-4 border border-black rounded-full text-black group"
                        >
                            {/* Blue Fill Background */}
                            <span className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />

                            {/* Text */}
                            <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                                {item}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex gap-5 py-2">
                    <div
                        onMouseMove={handleMagneticMove}
                        onMouseLeave={handleMagneticLeave} className="relative cursor-pointer overflow-hidden p-5 border border-black rounded-full text-black group">
                        <span className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />

                        <div className="text-[1.5em] relative z-10 transition-colors duration-500 group-hover:text-white">
                            <CiBoxList />
                        </div>
                    </div>

                    <div
                        onMouseMove={handleMagneticMove}
                        onMouseLeave={handleMagneticLeave} className="relative cursor-pointer overflow-hidden p-5 border border-black rounded-full text-black group">
                        <span className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />

                        <div className="text-[1.5em] relative z-10 transition-colors duration-500 group-hover:text-white">
                            <LuLayoutGrid />
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-[2rem]">
                <div className=" mx-[auto] w-[80%]">
                    {projects.map((project, index) => {
                        return <Project key={index} index={index} title={project.title} task={project.task} year={project.year} setModal={setModal} />
                    })}
                </div>
                <FloatingModal modal={modal} projects={projects} />
            </div>
        </main>
    )
}