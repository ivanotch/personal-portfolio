'use client'
import { FaStarHalf } from "react-icons/fa";
import { GiStarSwirl } from "react-icons/gi";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";


export default function Specialty() {

    const specialtyRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: specialtyRef,
        offset: ["start end", "end start"]
    })

    const height = useTransform(scrollYProgress, [0, 0.95], [50, 0]);

    return (
        <main ref={specialtyRef} className="relative h-[80vh] bg-[#e9eaeb] z-[100]">
            <div className=" flex flex-col w-full h-full justify-center mt-[2rem] bg-[#e9eaeb] z-[100]">
                <p className="text-[3rem] w-[80%] mx-[auto] z-[10]">I can help you with...</p>
                <div className=" grid grid-cols-3 w-[80%] bg-[#e9eaeb] mx-auto gap-10 mt-8 z-[10]">
                    <div>
                        <div className="mb-[1rem]">
                            <div className="text-[1em] text-gray-500">01</div>
                            <div className="w-full h-[1px] bg-gray-400 mt-2"></div>
                        </div>
                        <p className="flex items-center text-[2rem] font-[400] mb-[1rem]"><FaStarHalf /> Design</p>
                        <div>
                            As a student, I create clean and modern interfaces focused on clarity, balance, and user experience. I'm continuously refining my design eye through hands-on projects.                    </div>
                    </div>

                    <div >
                        <div className="mb-[1rem]">
                            <div className="text-[1em] text-gray-500">02</div>
                            <div className="w-full h-[1px] bg-gray-400 mt-2"></div>
                        </div>
                        <p className="flex items-center text-[2rem] font-[400] mb-[1rem]"><FaStarHalf /> Development</p>
                        <div>
                            I build responsive and scalable applications using Next.js, React, Tailwind, Node.js, Express, and databases like MongoDB. I focus on clean architecture, performance, and writing code that's production-ready.
                        </div>
                    </div>

                    <div>
                        <div className="mb-[1rem]">
                            <div className="text-[1em] text-gray-500">03</div>
                            <div className="w-full h-[1px] bg-gray-400 mt-2"></div>
                        </div>
                        <p className="flex gap-2 items-center text-[2rem] font-[400] mb-[1rem]"><GiStarSwirl className="animate-spin [animation-duration:10s]" /> Full Package</p>
                        <div>
                            I can take a project from concept to launch, combining design and development with strong attention to detail and a constant drive to improve.
                        </div>
                    </div>
                </div>
            </div>

            <motion.div style={{ height }} className="relative  ">
                <div className="shadow-[0px_60px_50px_rgba(0,0,0,0.248)] absolute h-[1550%] w-[110%] left-[-10%] bg-[#e9eaeb] rounded-[0%_0%_50%_50%] z-[10]">
                </div>
            </motion.div>
        </main>
    )
}