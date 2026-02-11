"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

type MagneticLinkProps = {
  href: string;
  children: React.ReactNode;
};

const underlineVariants = {
  initial: {
    scaleX: 0,
  },
  hover: {
    scaleX: 1,
    transition: {
      duration: 0.35,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  },
};

export default function MagneticLink({ href, children }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = `translate(0px, 0px)`;
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block cursor-pointer"
      initial="initial"
      whileHover="hover"
    >
      {/* Text */}
      <span className="relative z-10 text-black">{children}</span>

      {/* Underline */}
      <motion.span
        variants={underlineVariants}
        className="absolute left-0 -bottom-1 h-[2px] w-full bg-black pointer-events-none"
        style={{ originX: 0.5 }}
      />
    </motion.a>
  );
}
