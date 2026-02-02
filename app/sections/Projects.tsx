import { useState } from "react"
import Project from "@/components/Project";
import FloatingModal from "@/components/FloatingModal";

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

    const [modal, setModal] = useState<ModalState>({
        active: false,
        index: 0,
    });

    return (
        <main className="h-[100vh] mt-[2rem]">
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