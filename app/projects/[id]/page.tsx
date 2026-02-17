
import { projects } from "@/data/projects"
import { notFound } from "next/navigation";
import ProjectInfo from "./ProjectInfo";

type Props = {
    params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: Props) {


    const { id } = await params;

    const project = projects.find((p) => p.id === id);

    if (!project) return notFound();

    

    return (
        <ProjectInfo project={project} />
    )
}