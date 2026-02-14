
import Image from "next/image";

interface ProjectProps {
    index: number;
    id: number;
    title: string;
    task: string;
    year: string;
    src: string;
    color: string
}

export default function ProjectBox({
    title,
    task,
    year,
    src,
    color
}: ProjectProps) {
    return (
        <main className="px-10 mb-[5rem] group">

            {/* Image Section */}
            <div className="flex items-center justify-center overflow-hidden">
                <div
                    style={{ background: color }}
                    className="w-[50rem] py-15 px-5 flex items-center justify-center
                     transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
                     group-hover:scale-105"
                >
                    <Image
                        alt={title}
                        src={src}
                        width={600}
                        height={800}
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col mt-[2rem]">
                <div className="text-[2.5rem] font-[inter]">{title}</div>
                <div className="my-[1.5rem] border border-gray-300"></div>
                <div className="flex justify-between items-center">
                    <p className="text-[1.2rem] font-[inter]">{task}</p>
                    <p className="text-[1.2rem] font-[inter]">{year}</p>
                </div>
            </div>

        </main>
    );
}
