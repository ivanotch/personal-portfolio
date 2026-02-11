export default function CertificateShowcase() {

    const certs = [
        {
            name: "Git and Github",
            src: "/certificate/git.jpg",
            bg: "bg-[#d6d7dc]"
        },
        {
            name: "Introduction to Cloud Computing",
            src: "/certificate/intro-cloud.jpg",
            bg: "bg-[#e3e3e3]" 
        },
        {
            name: "Front-End With React",
            src: "/certificate/react.png",
            bg: "bg-[#d4e3e6]" 
        },
        {
            name: "Web Development with HTML, CSS, Javascript",
            src: "/certificate/web.jpg",
            bg: "bg-[#21242b]"
        },
        {
            name: "2022 Web Development Bootcamp",
            src: "/certificate/udemy.jpg",
            bg: "bg-[#d7d4cf]" 
        },
    ]

    return (
        <main className="relative">
            <div className="absolute left-[9%] top-[4%]">
                <p className="text-[12em] tracking-widest font-semibold text-gray-300 font-inter">Certificates</p>
            </div>
            {/* Description */}
            <div className="min-h-[100vh] pt-[14rem] relative gap-40">
                <div className="w-[20%] left-[12%] mt-[2rem] absolute flex flex-col gap-5 mb-[5rem]">
                    <p className=" text-[1.3em]  mt-[6rem] font-semibold">
                        Beyond my academic background, I've earned certifications from specialized development courses to refine my practical skills in modern web and mobile technologies.
                    </p>
                    <p className="text-gray-500 font-semibold">
                        Striving for Knowledge..
                    </p>
                </div>

                {/* Cards */}
                <div className="absolute right-[10%] flex flex-col gap-5 w-[50%]">
                    {/* Top row: 3 cards */}
                    <div className="flex justify-center gap-5">
                        {certs.slice(0, 3).map((cert, index) => (
                            <div key={index} className={`flex flex-col items-center p-4 ${cert.bg} shadow-lg w-70`}>
                                <img src={cert.src} alt={cert.name} className="w-full h-40 object-cover rounded-xl mb-4" />
                            </div>
                        ))}
                    </div>

                    {/* Bottom row: 2 cards */}
                    <div className="flex justify-center gap-5">
                        {certs.slice(3, 5).map((cert, index) => (
                            <div key={index} className={`flex flex-col items-center p-4 ${cert.bg} shadow-lg w-70`}>
                                <img src={cert.src} alt={cert.name} className="w-full h-40 object-cover rounded-xl mb-4" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
