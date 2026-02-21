import Link from "next/link"

export default function Projects() {
  const projects = [
    {
      title: "Telegram bot",
      description:
        "It's a Versatile Telegram Bot and you can personalize this bot for what ever you want.",
      tech: ["python", "telebot-library"],
      features: ["File uploading capability for various formats.", "Interactive buttons that connect to links or text callbacks."],
      github: "https://github.com/Tomm8y/Telegram-Bot",
      
    },
        {
      title: "Personal-Website",
      description:
        "A modern, responsive personal portfolio built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI — designed to showcase your resume, projects, and business information in an elegant and professional way..",
      tech: ["JavaScript", "TypeScript", "CSS"],
      features: ["Clean and modern UI built with Tailwind CSS", "Fast performance using Next.js & TypeScript", "Modular component design (Shadcn UI)", "Fully responsive across all devices", "Dark mode support", "Pages for About, Projects, Contact, and more"],
      github: "https://github.com/Tomm8y/Personal-website",
      
    },        {
      title: "Terminal-Chat",
      description:
        "A ",
      tech: ["JavaScript"],
      features: [""],
      github: "https://github.com/Tomm8y/Terminal-chat",
      
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="p-6 border-b border-red-600">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-red-500">
            {"<Tommy/>"}
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="text-red-400 hover:text-red-300 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-red-400 hover:text-red-300 transition-colors">
              About
            </Link>
            <Link href="/projects" className="text-red-500 font-semibold">
              Projects
            </Link>
            <Link href="/contact" className="text-red-400 hover:text-red-300 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold mb-4 text-center">
          My <span className="text-red-500">Projects</span>
        </h1>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          A showcase of backend systems and APIs I've built, each solving real-world problems with modern technologies.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-red-900/10 border-2 border-red-600 rounded-lg p-8 hover:bg-red-900/20 transition-colors"
            >
              <h3 className="text-2xl font-bold text-red-400 mb-4">{project.title}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-red-400 mb-3">Key Features:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {project.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-red-400 mb-3">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <a
                  href={project.github}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors"
                >
                  View Code
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation to next page */}
        <div className="text-center mt-16">
          <Link
            href="/contact"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Get In Touch →
          </Link>
        </div>
      </div>
    </div>
  )
}
