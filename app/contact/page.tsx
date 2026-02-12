'use client'

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "@/components/PagePreloader";
import Nav from "../sections/Nav";
import Image from "next/image";
import { Github, Instagram, Linkedin } from "@deemlol/next-icons";


export default function Contact() {

    const [showLoader, setShowLoader] = useState(true);
    const locoRef = useRef<any>(null);

    // prevent scrolling while loading
    useEffect(() => {
        document.body.style.overflow = showLoader ? "hidden" : "auto";
        document.body.style.overflowX = "hidden";
        return () => {
            document.body.style.overflow = "auto";
            document.body.style.overflowX = "hidden";
        };
    }, [showLoader]);

    // Initialize LocomotiveScroll dynamically after loader
    useEffect(() => {
        (async () => {
            const LocomotiveScroll = (await import("locomotive-scroll")).default;

            setTimeout(() => {
                setShowLoader(false);

                // scroll to top
                window.scrollTo(0, 0);

                // initialize Locomotive Scroll
                locoRef.current = new (LocomotiveScroll as any)({
                    el: document.querySelector("#contact-page"),
                    smooth: true,
                    multiplier: 1,
                    lerp: 0.1,
                });

                // make sure scroll starts at top
                locoRef.current.scrollTo(0, { duration: 0, disableLerp: true });

                document.body.style.cursor = "default";
            }, 2000);
        })();

        return () => locoRef.current?.destroy();
    }, []);

    return (

        <AnimatePresence mode="wait">
            {showLoader && <PageTransition key="preloader" title="Contact" />}

            {!showLoader && (
                <main id="contact-page" className="bg-[#1d1d1d] h-screen">
                    <Nav />


                    <div className="flex w-full items-center px-40">

                        <p className="text-white text-[3.5rem] font-[inter] font-semibold">Make me a part of your team</p>


                        <div className="w-full">
                            <div className="flex p-20 gap-10">
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        hidden: { opacity: 0, y: 50 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                staggerChildren: 0.3,
                                                duration: 0.9,
                                                ease: "easeIn",
                                            },
                                        },
                                    }}
                                >
                                    <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}>
                                        <p className="text-white tracking-widest font-semibold font-[poppins] text-[1.3rem]">
                                            Babida.cij.bscs@gmail.com
                                        </p>
                                    </motion.div>

                                    <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}>
                                        <p className="text-white tracking-wide text-[1.1rem] font-[poppins]">63+ 09172839483</p>
                                    </motion.div>

                                    <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}>
                                        <div className="flex gap-5 cursor-pointer">
                                            <a
                                                href="https://github.com/ivanotch"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Github size={30} color="white" />
                                            </a>
                                            <a
                                                href="https://www.instagram.com/ivanoskiee/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Instagram size={30} color="white" />
                                            </a>
                                            <a
                                                href="https://www.linkedin.com/in/charlz-ivan-john-babida-364b26257/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Linkedin size={30} color="white" />
                                            </a>
                                        </div>
                                    </motion.div>
                                </motion.div>

                                <div className="mr-[1rem] ">
                                    <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden">
                                        <Image
                                            src="/small-avatar.png"
                                            alt="profile pic"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="max-w-xl mx-auto bg-white rounded-sm shadow-lg border border-gray-200"
                            >
                                <h2 className="font-semibold bg-gray-300 p-2 w-full  text-black">Send Me an Email</h2>

                                <form className="flex flex-col p-2 ">
                                    {/* Email */}
                                    <div className="pl-2 flex items-center  border-y border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent">
                                        <label htmlFor="email" className="text-gray-600 font-medium">From</label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="Enter Your Email"
                                            className="px-2 py-2 focus:outline-none "
                                        />
                                    </div>

                                    {/* Subject */}
                                    <div className="pl-2 flex items-center  border-y border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent">
                                        <input
                                            type="text"
                                            id="subject"
                                            placeholder="Subject"
                                            className="px-2 py-2 w-full focus:outline-none"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="flex flex-col mt-[1rem]">
                                        <textarea
                                            id="message"
                                            rows={5}
                                            placeholder="Write your message here..."
                                            className="border-x  border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="mt-2 bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-700 transition-all duration-200"
                                    >
                                        Send Message
                                    </button>
                                </form>
                        </motion.div>

                    </div>

                </div>


                </main>
    )
}
        </AnimatePresence >
    )
}

