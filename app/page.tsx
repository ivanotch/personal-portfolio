'use client'
import Advertise from "@/app/sections/advertise";
import Hero from "@/app/sections/Hero";
import {useEffect} from 'react'
import Projects from "./sections/Projects";

export default function Home() {

  useEffect(() => {
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  })

  return (
    <>
      <Hero />
      <Advertise />
      <Projects />
    </>
  );
}
