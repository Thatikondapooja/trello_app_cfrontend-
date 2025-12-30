import { Mail, MapPin, Phone, Linkedin, Github } from "lucide-react"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"

export default function ResumeView() {
    const resumeRef = useRef()

    const handleDownloadPDF = useReactToPrint({
        content: () => resumeRef.current,
        documentTitle: "Pooja_Thatikonda_Resume",
    })

    return (
        <>
            {/* Download Button */}
            <div className="flex justify-center my-6">
                <button
                    onClick={handleDownloadPDF}
                    className="px-6 py-2 bg-slate-900 text-white rounded hover:bg-slate-800 transition"
                >
                    Download Resume (PDF)
                </button>
            </div>

            {/* Resume */}
            <div
                ref={resumeRef}
                className="max-w-[800px] mx-auto p-8 bg-white text-slate-900 font-sans leading-relaxed"
            >
                {/* Header */}
                <header className="text-center border-b-2 border-slate-900 pb-6 mb-6">
                    <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">
                        Pooja Thatikonda
                    </h1>

                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                            <MapPin size={14} /> Siddipet, India
                        </span>
                        <span className="flex items-center gap-1">
                            <Phone size={14} /> +91 8688868275
                        </span>
                        <span className="flex items-center gap-1">
                            <Mail size={14} /> thatikondapooja888@gmail.com
                        </span>
                    </div>

                    <div className="flex justify-center gap-6 mt-3 text-sm font-medium">
                        <span className="flex items-center gap-1">
                            <Linkedin size={14} /> linkedin.com/in/thatikonda-pooja-76b213
                        </span>
                        <span className="flex items-center gap-1">
                            <Github size={14} /> github.com/Thatikondapooja
                        </span>
                    </div>
                </header>

                {/* Professional Summary */}
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b mb-3">
                        Professional Summary
                    </h2>
                    <p className="text-[15px] leading-6">
                        Highly motivated Web Developer with a strong foundation in front-end
                        and back-end technologies. Experienced in building responsive,
                        accessible, and performance-focused web applications. Passionate
                        about clean architecture, problem-solving, and continuous learning.
                    </p>
                </section>

                {/* Technical Skills */}
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b mb-3">
                        Technical Skills
                    </h2>
                    <div className="grid grid-cols-2 gap-y-2 text-[14px]">
                        <p><strong>Languages:</strong> JavaScript, TypeScript, SQL</p>
                        <p><strong>Frontend:</strong> React, Redux, Tailwind CSS</p>
                        <p><strong>Backend:</strong> Node.js, NestJS, REST APIs</p>
                        <p><strong>Database:</strong> PostgreSQL</p>
                        <p><strong>Tools:</strong> Git, GitHub, VS Code</p>
                        <p><strong>Concepts:</strong> DSA, UI/UX, Networking</p>
                    </div>
                </section>

                {/* Project */}
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b mb-3">
                        Key Project
                    </h2>

                    <h3 className="font-bold text-[16px]">
                        Car Social Network – MCA Final Project
                    </h3>

                    <ul className="list-disc ml-5 mt-2 text-[14px] space-y-1">
                        <li>Built a full-stack social platform for car enthusiasts.</li>
                        <li>Developed responsive UI using React and Tailwind CSS.</li>
                        <li>Implemented authentication and APIs using NestJS.</li>
                        <li>Used PostgreSQL for efficient data management.</li>
                    </ul>
                </section>

                {/* Education */}
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b mb-3">
                        Education
                    </h2>

                    <p><strong>MCA</strong> – Aurora’s PG College (2025)</p>
                    <p><strong>B.Sc (MPCS)</strong> – Prathibha Degree College (2022)</p>
                    <p><strong>Intermediate</strong> – Sadhana Junior College (2019)</p>
                </section>

                {/* Languages & Interests */}
                <section>
                    <h2 className="text-lg font-bold uppercase border-b mb-3">
                        Languages & Interests
                    </h2>

                    <p><strong>Languages:</strong> English (B2), Telugu</p>
                    <p><strong>Interests:</strong> Design, Sketching, Tech Blogs, Reading</p>
                </section>
            </div>
        </>
    )
}
