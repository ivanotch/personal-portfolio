
import Link from "next/link";

type ModalState = {
    active: boolean;
    index: number;
};

interface ProjectProps {
    id: string;
    index: number;
    title: string;
    task: string;
    year: string;
    setModal: React.Dispatch<React.SetStateAction<ModalState>>;
}

export default function Project({
    index,
    id,
    title,
    task,
    year,
    setModal,
}: ProjectProps) {
    return (
        <Link
            key={id}
            href={`/projects/${id}`}
        >
            <main className="group flex items-center justify-between py-[2rem] px-[4rem] border-t-[0.5px] hover:opacity-[0.4]" onMouseEnter={() => {
                setModal({ active: true, index: index })
            }}
                onMouseLeave={() => {
                    setModal({ active: false, index: index })
                }}
            >
                <div className="text-[3.5rem] transition-transform duration-300 ease-out group-hover:-translate-x-3">
                    {title}
                </div>

                <div className="text-[1.2rem] transition-transform duration-300 ease-out group-hover:translate-x-3">
                    {task}
                </div>
            </main>
        </Link>
    )
}