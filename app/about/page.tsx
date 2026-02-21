import Link from "next/link"

export default function About() {
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
            <Link href="/about" className="text-red-500 font-semibold">
              About
            </Link>
            <Link href="/projects" className="text-red-400 hover:text-red-300 transition-colors">
              Projects
            </Link>
            <Link href="/contact" className="text-red-400 hover:text-red-300 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* About Section */}
        <section className="mb-16">
          <h1 className="text-5xl font-bold mb-8">
            About <span className="text-red-500">Me</span>
          </h1>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed">
                I'm a passionate backend developer with over 3 years of experience building scalable, secure, and
                efficient server-side applications. My journey in software development started with a curiosity about
                how systems work behind the scenes.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                I specialize in creating robust APIs, designing optimal database architectures, and implementing secure
                authentication systems. I believe in writing clean, maintainable code that stands the test of time.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or
                sharing knowledge with the developer community.
              </p>
            </div>
            <div className="bg-red-900/20 p-8 rounded-lg border border-red-600">
              <h3 className="text-2xl font-bold text-red-400 mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Experience:</span>
                  <span className="text-red-400 font-semibold">3+ Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Projects:</span>
                  <span className="text-red-400 font-semibold">2+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Focus:</span>
                  <span className="text-red-400 font-semibold">Backend</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h2 className="text-4xl font-bold mb-12 text-center">
            Technical <span className="text-red-500">Skills</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-red-900/20 p-6 rounded-lg border border-red-600">
              <h3 className="text-xl font-bold text-red-400 mb-4">Languages</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">JavaScript</span>
                  <div className="w-16 h-2 bg-gray-700 rounded">
                    <div className="w-2/3 h-full bg-red-500 rounded"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Python</span>
                  <div className="w-16 h-2 bg-gray-700 rounded">
                    <div className="w-5/6 h-full bg-red-500 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-600">
              <h3 className="text-xl font-bold text-red-400 mb-4">Frameworks</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Node.js</span>
                  <div className="w-16 h-2 bg-gray-700 rounded">
                    <div className="w-full h-full bg-red-500 rounded"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Express.js</span>
                  <div className="w-16 h-2 bg-gray-700 rounded">
                    <div className="w-5/6 h-full bg-red-500 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-600">
              <h3 className="text-xl font-bold text-red-400 mb-4">Databases</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">MySQL</span>
                  <div className="w-16 h-2 bg-gray-700 rounded">
                    <div className="w-1/4 h-full bg-red-500 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* Navigation to next page */}
        <div className="text-center mt-16">
          <Link
            href="/projects"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            View My Projects →
          </Link>
        </div>
      </div>
    </div>
  )
}
