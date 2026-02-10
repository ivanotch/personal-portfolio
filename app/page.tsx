'use client'
import Advertise from "@/app/sections/advertise";
import Hero from "@/app/sections/Hero";
import {useEffect, useState} from 'react'
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Footer from "./sections/Footer";
import Preloader from "@/components/Preloader";

export default function Home() {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll();

        setTimeout(() => {
          setIsLoading(false);
          document.body.style.cursor = 'default';
        }, 2000)
      }
    )()
  }, [])

  return (
    <div id="page">
      {
        isLoading && <Preloader />
      }
      <Hero />
      <Advertise />
      <Projects />
      <Skills />
      <Footer />
    </div>
  );
}
