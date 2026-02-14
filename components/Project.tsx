type ModalState = {
    active: boolean;
    index: number;
};

interface ProjectProps {
    index: number;
    title: string;
    task: string;
    year: string;
    setModal: React.Dispatch<React.SetStateAction<ModalState>>;
}

export default function Project({
    index,
    title,
    task,
    year,
    setModal,
}: ProjectProps) {
    return (
        <main className="group flex items-center justify-between py-[2rem] px-[4rem] border-t-[0.5px] hover:opacity-[0.4]" onMouseEnter={() => {
            setModal({active: true, index: index})
        }}
        onMouseLeave={() => {
            setModal({active: false, index: index})
        }}
        >
            <div className="text-[3.5rem] transition-transform duration-300 ease-out group-hover:-translate-x-3">
                {title}
            </div>

            <div className="text-[1.2rem] transition-transform duration-300 ease-out group-hover:translate-x-3">
                {task}
            </div>
        </main>
    )
}