'use client';

import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ParticleField from '@/components/ParticleField';
import Terminal from '@/components/Terminal';
import MatrixRain from '@/components/MatrixRain';
import { useContactForm } from '@/hooks/useContactForm';

interface Skill {
  name: string;
  icon: string;
  description: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  technologies: string[];
  upcoming?: boolean;
}

interface Project {
  title: string;
  description: string;
  highlight: string;
  githubUrl: string;
  technologies: string[];
}

const skills: Skill[] = [
  { name: 'C / C++', icon: '⚙️', description: 'Systems programming' },
  { name: 'Rust', icon: '🦀', description: 'Fearless concurrency' },
  { name: 'Python', icon: '🐍', description: 'ML & pipelines' },
  { name: 'x86 Assembly', icon: '🔩', description: 'Bare-metal control' },
  { name: 'CUDA', icon: '⚡', description: 'GPU computing' },
  { name: 'Linux Kernel', icon: '🐧', description: 'OS internals' },
  { name: 'PyTorch', icon: '🔥', description: 'Deep learning' },
  { name: 'Distributed Systems', icon: '🌐', description: 'Scale & fault tolerance' },
  { name: 'Kubernetes', icon: '☸️', description: 'Orchestration' },
  { name: 'Docker', icon: '🐳', description: 'Containerization' },
  { name: 'AWS', icon: '☁️', description: 'EC2 / S3 / cloud infra' },
  { name: 'RAG & Agents', icon: '🤖', description: 'LLM workflows' },
];

const roles: string[] = [
  'Systems Programmer',
  'ML Engineer',
  'Incoming SDE Intern @ AWS',
  'Incoming MLE Intern @ Expedia',
  'CS @ University of Washington',
];

const experiences: Experience[] = [
  {
    company: 'Amazon Web Services',
    role: 'Software Development Engineer Intern — Billing',
    period: 'Fall 2026',
    location: 'Seattle, WA',
    bullets: [
      'Engineering concurrent, fault-tolerant components for AWS Billing’s distributed architecture, processing high-throughput telemetry at scale.',
    ],
    technologies: ['Distributed Systems', 'Concurrency'],
    upcoming: true,
  },
  {
    company: 'Expedia Group',
    role: 'Machine Learning Engineer Intern — Book to Trip',
    period: 'Summer 2026',
    location: 'Seattle, WA',
    bullets: [
      'Building ML systems on the Book to Trip team.',
    ],
    technologies: ['Machine Learning', 'Python'],
    upcoming: true,
  },
  {
    company: 'Ericsson',
    role: 'Software Engineer Intern',
    period: 'Jun 2025 – Sep 2025',
    location: 'Bellevue, WA',
    bullets: [
      'Developed core telemetry processing modules in Python, optimizing high-throughput data streams across 48 distributed nodes and cutting end-to-end pipeline latency by 5%.',
      'Engineered an automated ETL pipeline for network packet-loss metrics, eliminating 10 hours/week of manual reporting and enabling real-time observability.',
      'Orchestrated fault-tolerant deployments across 4 Kubernetes nodes, maintaining 99.7% uptime.',
    ],
    technologies: ['Python', 'Linux', 'Kubernetes'],
  },
  {
    company: 'NOISE Lab @ UW',
    role: 'Research Assistant — Security & Privacy',
    period: 'Sep 2024 – Mar 2025',
    location: 'Seattle, WA',
    bullets: [
      'Built high-throughput C/C++ simulations generating 4 million synthetic network-traffic data points to train ML-based anomaly detection models.',
      'Implemented algorithmic defenses against real-time traffic analysis with sub-millisecond latency overhead.',
    ],
    technologies: ['C/C++', 'Machine Learning', 'Bash'],
  },
];

const projects: Project[] = [
  {
    title: 'Green Thread Library',
    description:
      'User-level threading library in C++ with a cooperative scheduler and custom x86-64 assembly context switching — bypassing kernel trap overhead entirely.',
    highlight: '10% faster than pthreads · 10,000 concurrent tasks, zero data races',
    githubUrl: 'https://github.com/sirjanpreet/user-space-scheduler',
    technologies: ['C++', 'x86 Assembly', 'POSIX'],
  },
  {
    title: 'Work-Stealing Thread Pool',
    description:
      'Scalable Rust thread pool with a work-stealing deque scheduler that dynamically rebalances tasks across cores under peak load.',
    highlight: '90% CPU utilization · 14% less idle time',
    githubUrl: 'https://github.com/sirjanpreet',
    technologies: ['Rust', 'Concurrency', 'Systems'],
  },
  {
    title: 'Jane Street LLM Reasoning Benchmark',
    description:
      'Automated benchmarking pipeline evaluating LLM reasoning models against Jane Street logic puzzles, with a scraped and structured ground-truth dataset.',
    highlight: '6 models · 135 puzzles · UW Deep Learning Research Seminar',
    githubUrl: 'https://github.com/sirjanpreet/js_benchmarking',
    technologies: ['Python', 'LLM Evaluation'],
  },
  {
    title: 'Stock Sentiment Analysis',
    description:
      'Real-time analysis of stock market sentiment using transformer models over live financial text streams.',
    highlight: 'Real-time NLP pipeline',
    githubUrl: 'https://github.com/sirjanpreet/stock-sentiment',
    technologies: ['Python', 'Transformers', 'Flask', 'MongoDB'],
  },
];

const stats = [
  { value: 33, decimals: 0, suffix: 'µs', label: 'shaved off context switches' },
  { value: 10, decimals: 0, suffix: 'K', label: 'concurrent threads, zero data races' },
  { value: 99.7, decimals: 1, suffix: '%', label: 'uptime maintained @ Ericsson' },
  { value: 4, decimals: 0, suffix: 'M', label: 'data points generated @ NOISE Lab' },
];

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let delay = deleting ? 35 : 75;
    if (!deleting && text === word) delay = 2200;
    if (deleting && text === '') delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return text;
}

function Stat({ value, decimals, suffix, label }: (typeof stats)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 font-mono">
        {display.toFixed(decimals)}
        {suffix}
      </div>
      <div className="text-sm text-gray-400 mt-2">{label}</div>
    </div>
  );
}

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [matrixOn, setMatrixOn] = useState(false);
  const typed = useTypewriter(roles);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const {
    formData,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit,
  } = useContactForm();

  // Open terminal with backtick from anywhere outside a text field
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
      if (e.key === '`' && !typing && !terminalOpen) {
        e.preventDefault();
        setTerminalOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [terminalOpen]);

  return (
    <>
      <Navigation onTerminalOpen={() => setTerminalOpen(true)} />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-[60] bg-gradient-to-r from-purple-500 to-pink-500"
        style={{ scaleX: progress }}
      />

      <Terminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onMatrix={() => {
          setTerminalOpen(false);
          setMatrixOn(true);
        }}
      />
      {matrixOn && <MatrixRain onClose={() => setMatrixOn(false)} />}

      <main className="min-h-screen relative overflow-hidden">
        {/* 3D Background */}
        <div className="fixed inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ParticleField />
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
                <motion.div
                  className="flex flex-wrap justify-center gap-3 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
                    Incoming SDE Intern @ AWS
                  </span>
                  <span className="inline-block px-4 py-2 bg-pink-500/20 border border-pink-500/30 rounded-full text-pink-300 text-sm font-medium">
                    Incoming MLE Intern @ Expedia
                  </span>
                </motion.div>
                <motion.h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Sirjan Singh
                </motion.h1>
                <div className="text-xl md:text-2xl text-gray-300 mb-8 h-8 font-mono">
                  <span className="text-purple-400">$ </span>
                  {typed}
                  <span className="cursor-blink text-purple-400">▊</span>
                </div>
              </motion.div>

              <motion.div
                className="max-w-2xl mx-auto mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-gray-300 text-lg leading-relaxed">
                  I build the low-level things most people avoid — thread schedulers,
                  telemetry pipelines, distributed systems — and the ML that runs on top of them.
                  CS @ University of Washington, class of 2027.
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
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Resume
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

              {/* Terminal hint */}
              <motion.button
                onClick={() => setTerminalOpen(true)}
                className="mt-10 font-mono text-sm text-gray-500 hover:text-purple-400 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                press <span className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20 text-gray-300">`</span> to open the terminal
              </motion.button>

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
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Stats strip */}
          <section className="py-16 px-4 border-y border-white/10 bg-black/40 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <Stat key={stat.label} {...stat} />
              ))}
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
              >
                About Me
              </motion.h2>
              <motion.div
                className="max-w-3xl mx-auto mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-gray-300 text-lg leading-relaxed text-center">
                  I&apos;m a Computer Science student at the University of Washington
                  (class of 2027) who lives at the intersection of systems and machine learning.
                  I&apos;ve done security &amp; privacy research at NOISE Lab, shipped
                  telemetry infrastructure at Ericsson, and next I&apos;m headed to Expedia
                  Group as an ML engineering intern and AWS as a software engineering intern
                  on the Billing team. When the abstraction leaks, I&apos;m the one who enjoys
                  reading the assembly.
                </p>
              </motion.div>

              {/* Skills grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-5 flex flex-col items-center text-center gap-2 hover:border-purple-500/50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 0 30px rgba(168, 85, 247, 0.25)',
                    }}
                  >
                    <span className="text-3xl">{skill.icon}</span>
                    <h3 className="font-semibold text-white">{skill.name}</h3>
                    <p className="text-xs text-gray-400">{skill.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="py-24 px-4 bg-grid">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
              >
                Experience
              </motion.h2>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/60 via-pink-500/40 to-transparent" />

                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.company}
                    className={`relative mb-12 pl-12 md:pl-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                    }`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute top-2 w-3 h-3 rounded-full ${
                        exp.upcoming
                          ? 'bg-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.8)]'
                          : 'bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8)]'
                      } left-[10.5px] md:left-auto ${
                        index % 2 === 0 ? 'md:-right-[6.5px]' : 'md:-left-[6.5px]'
                      }`}
                    />

                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6 hover:border-purple-500/40 transition-colors text-left">
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                        <h3 className="text-xl font-semibold text-white">{exp.company}</h3>
                        {exp.upcoming && (
                          <span className="px-2 py-0.5 text-xs font-mono bg-pink-500/20 text-pink-300 border border-pink-500/30 rounded-full">
                            incoming
                          </span>
                        )}
                      </div>
                      <p className="text-purple-300 text-sm mb-1">{exp.role}</p>
                      <p className="text-gray-500 text-sm font-mono mb-4">
                        {exp.period} · {exp.location}
                      </p>
                      <ul className="space-y-2 mb-4">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="text-gray-300 text-sm leading-relaxed">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-purple-500/20 rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
              >
                Featured Projects
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <motion.a
                    key={project.title}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 p-6 flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: (index % 2) * 0.15 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold group-hover:text-purple-300 transition-colors">
                        {project.title}
                      </h3>
                      <svg
                        className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <p className="text-gray-300 mb-3 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <p className="font-mono text-xs text-purple-300 mb-4">{project.highlight}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-24 px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
              >
                Get in Touch
              </motion.h2>
              <motion.p
                className="text-center text-gray-400 mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Recruiting, collaborating, or just want to talk systems? My inbox is open.
              </motion.p>
              <motion.form
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
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

          {/* Footer */}
          <footer className="py-12 px-4 border-t border-white/10">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
              <p className="text-gray-500 text-sm font-mono">
                © {new Date().getFullYear()} Sirjan Singh · built with Next.js, Three.js &amp; too much coffee
              </p>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
