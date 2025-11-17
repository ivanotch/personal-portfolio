import React from "react";
import { ArrowUpRight } from "@deemlol/next-icons";

export default function Nav() {
    return (
        <header className="flex p-[2rem] justify-between items-center">
            <div className="ml-[15px] text-[1.1rem] font-poppins font-[600]">
                IVANOTCH
            </div>

            <div className="bg-white/50 backdrop-blur-xl px-2 py-1 w-[15rem] rounded-xl flex justify-center">
                <ul className="flex gap-[1rem]">
                    <li>About Me</li>
                    <li>:</li>
                    <li>Projects</li>
                </ul>
            </div>

            <div className="flex bg-black rounded-xl flex justify-center px-2 py-1 gap-[2.5rem]">
                <p className="text-white">Get in Touch</p>
                <ArrowUpRight size={24} color="#FFFFFF" />
            </div>
        </header>
    );
}
