import React, { useEffect, useRef } from "react"
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { FaReact, FaHtml5, FaGit } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io5";
import { IoLogoCss3 } from "react-icons/io";
import { RiFirebaseFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaNodeJs } from "react-icons/fa6";
import { SiExpress } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { FaGitAlt } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import SkillCard from "@/components/SkillCard";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Skills() {

    const desktopGridPositions = [
        // Row 1 (5)
        "lg:col-start-1",
        "lg:col-start-2",
        "lg:col-start-3",
        "lg:col-start-4",
        "lg:col-start-5",

        // Row 2 (4)
        "lg:col-start-2",
        "lg:col-start-3",
        "lg:col-start-4",
        "lg:col-start-5",

        // Row 3 (3)
        "lg:col-start-3",
        "lg:col-start-4",
        "lg:col-start-5",

        // Row 4 (2)
        "lg:col-start-4",
        "lg:col-start-5",
    ];


    const skills = [
        {
            name: "React",
            logo: <FaReact />
        },
        {
            name: "Next.js",
            logo: <RiNextjsFill />
        },
        {
            name: "Javascript",
            logo: <IoLogoJavascript />
        },
        {
            name: "Tailwindcss",
            logo: <RiTailwindCssFill />
        },
        {
            name: "HTML",
            logo: <FaHtml5 />
        },
        {
            name: "CSS",
            logo: <IoLogoCss3 />
        },
        {
            name: "Firebase",
            logo: <RiFirebaseFill />
        },
        {
            name: "PostgreSQL",
            logo: <BiLogoPostgresql />
        },
        {
            name: "Nodejs",
            logo: <FaNodeJs />
        },
        {
            name: "Expressjs",
            logo: <SiExpress />
        },
        {
            name: "TypeScript",
            logo: <SiTypescript />
        },
        {
            name: "Java",
            logo: <FaJava />
        },
        {
            name: "Git",
            logo: <FaGitAlt />
        },
        {
            name: "MongoDB",
            logo: <SiMongodb />
        },
    ]



    const bodyRef = useRef<HTMLElement>(null);

    const {scrollYProgress} = useScroll({
        target: bodyRef,
        offset: ["start end", "end start"]
    })

    const height = useTransform(scrollYProgress, [0, 0.95], [50, 0]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!bodyRef.current) return;

        const bgColor = bodyRef.current.dataset.bgColor;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: bodyRef.current,
                start: "top center",
                onEnter: () => {
                    gsap.to("body", {
                        backgroundColor: bgColor,
                        duration: 0.6,
                        ease: "power2.out",
                    });
                },
                onLeaveBack: () => {
                    gsap.to("body", {
                        backgroundColor: "#ffffff", // or whatever your default is
                        duration: 0.9,
                        ease: "power2.out",
                    });
                },
            });
        });

        return () => ctx.revert();
    }, []);


    return (
        <main
            ref={bodyRef}
            className="relative"
            data-bg-color="#1D1D1D"
            
        >
            <div className="h-screen flex mb-[1rem] items-center justify-center">
                <h1 className=" text-white text-9xl tracking-tight font-semibold font-inter leading-none">What Do I Do?</h1>
            </div>

            <div className="relative mb-[1rem]">

                <div
                    className="
                        grid
                        grid-cols-2
                        sm:grid-cols-3
                        lg:grid-cols-5
                        gap-6
                        place-items-center
                        max-w-6xl
                        mx-auto
                        relative 
                        z-10
                    "
                >
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className={desktopGridPositions[index]}
                        >
                            <SkillCard skill={skill} index={index} />
                        </div>
                    ))}
                    <h2
                        className="
                            absolute
                            bottom-[-1rem]
                            left-[22rem]
                            -translate-x-1/2
                            text-[6rem]
                            sm:text-[8rem]
                            lg:text-[18rem]
                            font-semibold
                            tracking-wide
                            font-inter
                            text-white/5
                            select-none
                            leading-none
                            pointer-events-none
                            whitespace-nowrap
                        "
                    >
                        Skills
                    </h2>
                </div>
            </div>

            <motion.div style={{height}} className="relative  ">
                <div className="shadow-[0px_60px_50px_rgba(0,0,0,0.248)] absolute h-[1550%] w-[110%] left-[-10%] bg-[#1d1d1d] rounded-[0%_0%_50%_50%] z-1">
                </div>
            </motion.div>
        </main>
    )
}