'use client'
import Advertise from "@/app/sections/advertise";
import Hero from "@/app/sections/Hero";
import { useEffect, useState, useRef } from 'react'
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Footer from "./sections/Footer";
import Preloader from "@/components/Preloader";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const locoRef = useRef<any>(null);

  // prevent any scrolling while loading
  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : 'auto';
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.overflowX = 'hidden';
    };
  }, [isLoading]);

  // initialize LocomotiveScroll AFTER preloader
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;

      setTimeout(() => {
        setIsLoading(false);

        window.scrollTo(0, 0);

        locoRef.current = new (LocomotiveScroll as any)({
          el: document.querySelector('#page'),
          smooth: true,
        });

        locoRef.current.scrollTo(0, { duration: 0, disableLerp: true });

        document.body.style.cursor = 'default'
      }, 2000);
    })();

    return () => locoRef.current?.destroy();
  }, []);

  return (
    <div id="page">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      <Hero startAnimation={!isLoading} />
      <Advertise />
      <Projects />
      <Skills />
      <Footer />
    </div>
  );
}
