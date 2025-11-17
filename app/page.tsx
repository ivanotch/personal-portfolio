'use client'
import Advertise from "@/components/sections/advertise";
import Hero from "@/components/sections/Hero";
import {useEffect} from 'react'

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
    </>
  );
}
