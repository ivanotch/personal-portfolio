
import { delay, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {

    const slideUp = {
        initial: {
            y: 0,
        },
        exit: {
            y: "-100vh",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.2 }
        }
    }

    const opacity = {
        initial: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
            transition: { duration: 0.8, delay: 0.2 }
        }
    }

    const [loader, setLoader] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    const words = ["Hello", "Ciao", "Bonjour", "こんにちは", "Xin chào", "Kumusta", "Olá", "สวัสดี"];

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    }, [])

    useEffect(() => {
        if (loader === words.length - 1) return;

        setTimeout(() => {
            setLoader(loader + 1)
        }, loader === 0 ? 1000 : 150)

    }, [loader])

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`

    const curve = {
        initial: {
            d: initialPath
        },
        exit: {
            targetPath,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2}
        }
    }

    return (
        <motion.main variants={slideUp} initial="initial" exit="exit" className="h-screen w-full bg-[#141516] fixed top-0 left-0 z-[99] text-white flex items-center justify-center">
            {
                dimension.height > 0 && <>
                    <motion.p variants={opacity} initial="initial" animate="enter" className='text-[2rem] z-[10]'>{words[loader]}</motion.p>
                    <svg className='absolute top-0 left-0 w-[100%] h-[120%] z-0'>
                        <motion.path variants={curve} d={initialPath} fill='#141516'>
                        </motion.path>
                    </svg>
                </>
            }
        </motion.main>
    )
}