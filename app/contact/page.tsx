'use client'

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "@/components/PagePreloader";
import Nav from "../sections/Nav";
import Image from "next/image";
import {
    Github,
    Instagram,
    Linkedin
} from "@deemlol/next-icons";

export default function Contact() {

    const [showLoader, setShowLoader] = useState(true);
    const locoRef = useRef<any>(null);
    const [isSending, setIsSending] = useState(false);

    // prevent scrolling while loading
    useEffect(() => {
        document.body.style.overflow =
            showLoader ? "hidden" : "auto";

        document.body.style.overflowX = "hidden";

        return () => {
            document.body.style.overflow = "auto";
            document.body.style.overflowX = "hidden";
        };
    }, [showLoader]);

    // Initialize LocomotiveScroll dynamically after loader
    useEffect(() => {
        (async () => {
            const LocomotiveScroll =
                (await import("locomotive-scroll")).default;

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

                locoRef.current.scrollTo(0, {
                    duration: 0,
                    disableLerp: true,
                });

                document.body.style.cursor = "default";
            }, 2000);
        })();

        return () => locoRef.current?.destroy();
    }, []);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        if (isSending) return;

        setIsSending(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const templateParams = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        };

        try {
            const emailjs =
                (await import("@emailjs/browser")).default;

            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE!,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE!,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            alert("Message sent!");
            form.reset();

        } catch (error) {

            console.error(error);
            alert("Failed to send message.");

        } finally {
            setIsSending(false);
        }
    };

    return (
        <AnimatePresence mode="wait">

            {showLoader && (
                <PageTransition
                    key="preloader"
                    title="Contact"
                />
            )}

            {!showLoader && (

                <main
                    id="contact-page"
                    className="
                        bg-[#1d1d1d]
                        min-h-screen
                        overflow-x-hidden
                    "
                >

                    <Nav />

                    <div
                        className="
                            flex flex-col lg:flex-row
                            w-full
                            items-center
                            px-6 sm:px-10 md:px-20 lg:px-40
                            py-10
                            gap-12
                        "
                    >

                        {/* LEFT SIDE */}
                        <div
                            className="
                                w-full lg:w-[40%]
                                text-center lg:text-left
                            "
                        >

                            <p
                                className="
                                    text-white
                                    text-[2rem]
                                    leading-tight
                                    sm:text-[3rem]
                                    md:text-[3.5rem]
                                    font-[inter]
                                    font-semibold
                                "
                            >
                                Make me a part of your team
                            </p>

                        </div>

                        {/* RIGHT SIDE */}
                        <div className="w-full">

                            {/* Contact Info */}
                            <div
                                className="
                                    flex flex-col sm:flex-row
                                    items-center sm:items-start
                                    justify-center lg:justify-start
                                    p-4 sm:p-10
                                    gap-8 sm:gap-10
                                "
                            >

                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        hidden: {
                                            opacity: 0,
                                            y: 50
                                        },
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
                                    className="
                                        text-center sm:text-left
                                    "
                                >

                                    <motion.div
                                        variants={{
                                            hidden: {
                                                opacity: 0,
                                                y: 50
                                            },
                                            visible: {
                                                opacity: 1,
                                                y: 0
                                            }
                                        }}
                                    >
                                        <p
                                            className="
                                                text-white
                                                tracking-wide
                                                md:tracking-widest
                                                font-semibold
                                                font-[poppins]
                                                text-[1rem]
                                                md:text-[1.3rem]
                                                break-all
                                            "
                                        >
                                            Babida.cij.bscs@gmail.com
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        variants={{
                                            hidden: {
                                                opacity: 0,
                                                y: 50
                                            },
                                            visible: {
                                                opacity: 1,
                                                y: 0
                                            }
                                        }}
                                    >
                                        <p
                                            className="
                                                text-white
                                                tracking-wide
                                                text-[1rem]
                                                md:text-[1.1rem]
                                                font-[poppins]
                                            "
                                        >
                                            63+ 09172839483
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        variants={{
                                            hidden: {
                                                opacity: 0,
                                                y: 50
                                            },
                                            visible: {
                                                opacity: 1,
                                                y: 0
                                            }
                                        }}
                                    >
                                        <div
                                            className="
                                                flex gap-5
                                                cursor-pointer
                                                justify-center sm:justify-start
                                                mt-4
                                            "
                                        >

                                            <a
                                                href="https://github.com/ivanotch"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Github
                                                    size={30}
                                                    color="white"
                                                />
                                            </a>

                                            <a
                                                href="https://www.instagram.com/ivanoskiee/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Instagram
                                                    size={30}
                                                    color="white"
                                                />
                                            </a>

                                            <a
                                                href="https://www.linkedin.com/in/charlz-ivan-john-babida-364b26257/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Linkedin
                                                    size={30}
                                                    color="white"
                                                />
                                            </a>

                                        </div>
                                    </motion.div>

                                </motion.div>

                                {/* Avatar */}
                                <div className="mr-0 sm:mr-[1rem]">
                                    <div
                                        className="
                                            relative
                                            w-[80px] h-[80px]
                                            md:w-[100px] md:h-[100px]
                                            rounded-full
                                            overflow-hidden
                                        "
                                    >
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

                            {/* FORM */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    x: 50
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: "easeOut"
                                }}
                                className="
                                    w-full
                                    max-w-xl
                                    mx-auto
                                    bg-white
                                    rounded-sm
                                    shadow-lg
                                    border border-gray-200
                                "
                            >

                                <h2
                                    className="
                                        font-semibold
                                        bg-gray-300
                                        p-2
                                        w-full
                                        text-black
                                    "
                                >
                                    Send Me an Email
                                </h2>

                                <form
                                    id="contact-form"
                                    onSubmit={handleSubmit}
                                    className="flex flex-col p-2"
                                >

                                    {/* Name */}
                                    <div
                                        className="
                                            pl-2
                                            flex flex-col sm:flex-row
                                            sm:items-center
                                            border-y border-gray-300
                                        "
                                    >
                                        <label
                                            htmlFor="name"
                                            className="
                                                text-gray-600
                                                font-medium
                                                py-2
                                            "
                                        >
                                            Name
                                        </label>

                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Enter Your name"
                                            className="
                                                px-2 py-2
                                                focus:outline-none
                                                w-full
                                            "
                                        />
                                    </div>

                                    {/* Email */}
                                    <div
                                        className="
                                            pl-2
                                            flex flex-col sm:flex-row
                                            sm:items-center
                                            border-y border-gray-300
                                        "
                                    >
                                        <label
                                            htmlFor="email"
                                            className="
                                                text-gray-600
                                                font-medium
                                                py-2
                                            "
                                        >
                                            From
                                        </label>

                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Enter Your Email"
                                            className="
                                                px-2 py-2
                                                focus:outline-none
                                                w-full
                                            "
                                        />
                                    </div>

                                    {/* Subject */}
                                    <div
                                        className="
                                            pl-2
                                            flex items-center
                                            border-y border-gray-300
                                        "
                                    >
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            placeholder="Subject"
                                            className="
                                                px-2 py-2
                                                w-full
                                                focus:outline-none
                                            "
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="flex flex-col mt-[1rem]">

                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            placeholder="Write your message here..."
                                            className="
                                                border-x
                                                border-gray-300
                                                px-4 py-2
                                                focus:outline-none
                                                focus:ring-2
                                                focus:ring-blue-400
                                                focus:border-transparent
                                                resize-none
                                            "
                                        />

                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isSending}
                                        className={`
                                            mt-2
                                            flex items-center justify-center
                                            gap-2
                                            rounded-lg
                                            px-4 py-3
                                            font-semibold
                                            text-white
                                            transition-all duration-200
                                            ${isSending
                                                ? "bg-blue-400 cursor-not-allowed"
                                                : "bg-blue-600 hover:bg-blue-700"
                                            }
                                        `}
                                    >

                                        {isSending ? (
                                            <>
                                                <span
                                                    className="
                                                        w-4 h-4
                                                        border-2 border-white
                                                        border-t-transparent
                                                        rounded-full
                                                        animate-spin
                                                    "
                                                />

                                                Sending...
                                            </>
                                        ) : (
                                            "Send Message"
                                        )}

                                    </button>

                                </form>

                            </motion.div>

                        </div>

                    </div>

                </main>
            )}

        </AnimatePresence>
    );
}