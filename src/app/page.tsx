'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars, Float, Text3D } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { useContactForm } from '@/hooks/useContactForm';

interface TechStack {
  name: string;
  icon: string;
  color: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
  githubUrl: string;
  technologies: string[];
  imageUrl?: string;
}

const techStack: TechStack[] = [
  // Frontend
  { name: 'React', icon: '⚛️', color: 'from-blue-500/20 to-blue-600/20', description: 'Building interactive UIs' },
  { name: 'TypeScript', icon: '📘', color: 'from-blue-400/20 to-blue-500/20', description: 'Type-safe development' },
  
  // Backend
  { name: 'Node.js', icon: '🟢', color: 'from-green-500/20 to-green-600/20', description: 'Server-side JavaScript' },
  { name: 'Flask', icon: '🍵', color: 'from-green-400/20 to-green-500/20', description: 'Python web framework' },
  
  // Databases
  { name: 'MongoDB', icon: '🍃', color: 'from-green-400/20 to-green-500/20', description: 'NoSQL database' },
  { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-300/20 to-blue-400/20', description: 'SQL database' },
  
  // Cloud & DevOps
  { name: 'AWS', icon: '☁️', color: 'from-orange-500/20 to-orange-600/20', description: 'Cloud services' },
  { name: 'Azure', icon: '🌤️', color: 'from-blue-500/20 to-blue-600/20', description: 'Microsoft cloud' },
  { name: 'Docker', icon: '🐳', color: 'from-blue-600/20 to-blue-700/20', description: 'Containerization' },
  { name: 'Kubernetes', icon: '⚙️', color: 'from-blue-700/20 to-blue-800/20', description: 'Container orchestration' },
  
  // AI/ML
  { name: 'PyTorch', icon: '🔥', color: 'from-orange-400/20 to-orange-500/20', description: 'Deep learning framework' },
  { name: 'TensorFlow', icon: '🧠', color: 'from-orange-500/20 to-orange-600/20', description: 'Machine learning platform' },
];

const roles: string[] = [
  "Tech Enthusiast",
  "Problem Solver",
  "Lifelong Learner",
  "Programmer"
];

const projects: Project[] = [
 
  {
    title: "Stock Sentiment Analysis",
    description: "Real-Time analysis of stock market sentiment!",
    githubUrl: "https://github.com/sirjanpreet/stock-sentiment",
    technologies: ["Python", "Transformers", "Vader Sentiment", "MongoDB", "Flask"]
  },
  {
    title: "Multithreaded Web Server",
    description: "A multithreaded web server that handles multiple clients concurrently",
    githubUrl: "https://github.com/sirjanpreet/multithreaded-webserver",
    technologies: ["C", "C++", "POSIX Threads", "WebSockets"]
  },
  {
    title: "Court Connect",
    description: "A web application designed to connect sport-enthusiasts with local courts and players",
    githubUrl: "https://github.com/sirjanpreet/connect-court",
    technologies: ["React", "TypeScript", "Flask", "MongoDB"]
  }
];

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const {
    formData,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit,
  } = useContactForm();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen relative overflow-hidden">
        {/* 3D Background */}
        <div className="fixed inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Float
              speed={1.5}
              rotationIntensity={0.5}
              floatIntensity={0.5}
            >
              <Text3D
                font="/fonts/helvetiker_regular.typeface.json"
                size={0.5}
                height={0.2}
                curveSegments={12}
              >
                {roles[currentRoleIndex]}
                <meshStandardMaterial 
                  color="#a855f7"
                  transparent
                  opacity={0.5}
                  metalness={0.8}
                  roughness={0.2}
                />
              </Text3D>
            </Float>
          </Canvas>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section id="home" className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <motion.span
                  className="inline-block px-4 py-2 bg-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Welcome to my portfolio
                </motion.span>
                <motion.h1 
                  ref={titleRef}
                  className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  Sirjanpreet Singh
                </motion.h1>
                <div className="text-xl md:text-2xl text-gray-300 mb-8 h-8 relative">
                  <motion.span
                    key={currentRoleIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-1/2 transform -translate-x-1/2"
                  >
                    {roles[currentRoleIndex]}
                  </motion.span>
                </div>
              </motion.div>

              <motion.div
                className="max-w-2xl mx-auto mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-gray-300 text-lg leading-relaxed">
                Hey there! I&apos;m Sirjan Singh. Feel free to look around and get to know me.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <a 
                  href="#contact" 
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                >
                  Get in Touch
          </a>
          <a
                  href="#projects" 
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  View Projects
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex justify-center gap-6 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <a
                  href="https://github.com/sirjanpreet"
            target="_blank"
            rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
          >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
          </a>
        <a
                  href="https://linkedin.com/in/sirjan1"
          target="_blank"
          rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.06-1.601-1-1.601-1 0-1.16.781-1.16 1.601v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
        </a>
        <a
                  href="https://leetcode.com/u/sirjan"
          target="_blank"
          rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.27 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.201-4.177a3.027 3.027 0 0 1-.806-2.609 3.03 3.03 0 0 1 .208-.991 3.04 3.04 0 0 1 .505-1.032l3.834-4.108 2.979-2.462c.548-.452 1.277-.532 1.901-.317.619.216 1.105.773 1.105 1.408v2.585h2.189c1.226 0 2.221.995 2.221 2.22v4.249h1.174c.597 0 1.082.485 1.082 1.082v1.946c0 .597-.485 1.082-1.082 1.082h-1.174v1.174c0 .597-.485 1.082-1.082 1.082h-1.946c-.597 0-1.082-.485-1.082-1.082v-1.174h-1.174c-.597 0-1.082-.485-1.082-1.082v-1.946c0-.597.485-1.082 1.082-1.082h1.174v-4.249c0-.597-.485-1.082-1.082-1.082h-2.189V3.511c0-1.226-.995-2.221-2.221-2.221h-2.585z"/>
                  </svg>
                </a>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full p-2">
                  <motion.div
                    className="w-1.5 h-1.5 bg-white rounded-full mx-auto"
                    animate={{
                      y: [0, 8, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="min-h-screen py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                About Me
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    I&apos;m a Computer Science student at the University of Washington, 
                    passionate about coding and problem-solving. 
                    I&apos;ve worked on projects ranging from 
                    machine learning and cybersecurity to full-stack development.
                    I value continuous learning and enjoy exploring 
                    cutting-edge technologies that drive meaningful change. Outside of tech,
                    I&apos;m dedicated to giving back and applying my skills
                    to make a positive impact in the community.
                  </p>
                </motion.div>
                <motion.div
                  className="relative h-[400px] w-full"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-64 h-48">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={techStack[currentTechIndex].name}
                          className="absolute w-full h-full bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 shadow-lg cursor-pointer"
                          initial={{ 
                            opacity: 0,
                            scale: 0.8,
                            rotate: -10,
                            x: -100
                          }}
                          animate={{ 
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                            x: 0
                          }}
                          exit={{ 
                            opacity: 0,
                            scale: 0.8,
                            rotate: 10,
                            x: 100
                          }}
                          transition={{ duration: 0.3 }}
                          whileHover={{
                            scale: 1.05,
                            rotate: 0,
                            boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)"
                          }}
                        >
                          <div className={`h-full w-full rounded-lg bg-gradient-to-br ${techStack[currentTechIndex].color} p-6 
                            flex flex-col items-center justify-center gap-3`}
                          >
                            <span className="text-3xl">{techStack[currentTechIndex].icon}</span>
                            <h3 className="text-xl font-semibold text-white text-center">{techStack[currentTechIndex].name}</h3>
                            <p className="text-sm text-gray-300 text-center">{techStack[currentTechIndex].description}</p>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                  {/* Navigation Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-8">
                    <button
                      onClick={() => setCurrentTechIndex((prev: number) => (prev - 1 + techStack.length) % techStack.length)}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="flex gap-2">
                      {techStack.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTechIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentTechIndex 
                              ? 'bg-purple-500' 
                              : 'bg-white/30 hover:bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentTechIndex((prev: number) => (prev + 1) % techStack.length)}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="min-h-screen py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                Featured Projects
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.a
                    key={project.title}
                    href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
                    className="bg-white/5 rounded-lg overflow-hidden backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-gray-300 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="min-h-screen py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                Get in Touch
              </motion.h2>
              <motion.form
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                onSubmit={handleSubmit}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-400 text-center"
                  >
                    Message sent successfully!
                  </motion.p>
                )}
                {submitStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-center"
                  >
                    Something went wrong. Please try again.
                  </motion.p>
                )}
              </motion.form>
            </div>
          </section>
    </div>
      </main>
    </>
  );
}
