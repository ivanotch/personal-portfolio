"use client";

import { useState } from "react"
import { useRef } from "react";
import { gsap } from "gsap";
import { CiBoxList } from "react-icons/ci";
import { LuLayoutGrid } from "react-icons/lu";
import { projects } from '@/data/projects';
import ProjectBox from "@/components/ProjectBox";
import FloatingModal from "@/components/FloatingModal";
import Project from "@/components/Project";
import { useScroll, useTransform, motion } from "framer-motion";


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

    const filteredProjects = projects.filter((project) => {
        if (filter === "All") return true;

        if (filter === "Design") {
            return project.task.includes("Design");
        }

        if (filter === "Development") {
            return project.task.includes("Development");
        }

        return true;
    });

    const specialtyRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: specialtyRef,
        offset: ["start end", "end start"]
    })

    const height = useTransform(scrollYProgress, [0, 0.95], [50, 0]);

    return (
        <main ref={specialtyRef} className="relative bg-white  z-[100]">
            <div className="font-[inter] text-[4rem] mx-[auto] w-[60%] mt-[6rem] font-semibold">
                Building thoughtful digital experiences
            </div>

            <div className=" flex items-center w-[80%] mx-[auto] justify-between mt-[3rem]">
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
                            className={`relative cursor-pointer overflow-hidden px-8 py-4 border rounded-full group transition-all duration-300
                                 ${filter === item
                                    ? "bg-[#1d1d1d] text-white border-[#1d1d1d]"
                                    : "border-black text-black"
                                }
                            `}                        >
                            {/* Blue Fill Background */}
                            {filter !== item && (
                                <span className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                            )}
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
                        onClick={() => setLayout("list")}
                        onMouseLeave={handleMagneticLeave}
                        className={`relative cursor-pointer overflow-hidden p-5 border rounded-full group transition-all duration-300
                            ${layout === "list"
                                ? "bg-[#1d1d1d] text-white border-[#1d1d1d]"
                                : "border-black text-black"
                            }
                        `}
                    >

                        {layout !== "list" && (
                            <span className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                        )}

                        <div className="text-[1.5em] relative z-10 transition-colors duration-500 group-hover:text-white">
                            <CiBoxList />
                        </div>
                    </div>

                    <div
                        onMouseMove={handleMagneticMove}
                        onClick={() => setLayout("grid")}
                        onMouseLeave={handleMagneticLeave}
                        className={`relative cursor-pointer overflow-hidden p-5 border rounded-full group transition-all duration-300
                            ${layout === "grid"
                                ? "bg-[#1d1d1d] text-white border-[#1d1d1d]"
                                : "border-black text-black"
                            }
                        `}
                    >
                        {layout !== "grid" && (
                            <span className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                        )}

                        <div className="text-[1.5em] relative z-10 transition-colors duration-500 group-hover:text-white">
                            <LuLayoutGrid />
                        </div>
                    </div>
                </div>
            </div>

            {
                layout === "list" ? (
                    <div className="my-[2rem]">
                        <div className=" mx-[auto] w-[80%]">
                            {filteredProjects.map((project, index) => {
                                return <Project key={index} id={project.id} index={index} title={project.title} task={project.task} year={project.year} setModal={setModal} />
                            })}
                        </div>
                        <FloatingModal modal={modal} projects={projects} />
                    </div>
                ) : (
                    <div className="mx-auto mt-[3rem] mb-[4rem] w-[80%] grid grid-cols-1 md:grid-cols-2 gap-10">
                        {filteredProjects.map((project, index) => (
                            <ProjectBox
                                key={project.id}
                                index={index}
                                id={project.id}
                                title={project.title}
                                task={project.task}
                                year={project.year}
                                src={project.src}
                                color={project.color}
                            />
                        ))}
                    </div>
                )
            }

            <motion.div style={{ height }} className="relative  ">
                <div className="shadow-[0px_60px_50px_rgba(0,0,0,0.248)] absolute h-[1550%] w-[110%] left-[-10%] bg-white rounded-[0%_0%_50%_50%] z-[10]">
                </div>
            </motion.div>

        </main>
    )
}