'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onMatrix: () => void;
}

interface Line {
  text: string;
  className?: string;
}

const PROMPT = 'recruiter@sirjan-os:~$';

const ASCII_BANNER = [
  '   _____ _      _             ',
  '  / ____(_)    (_)            ',
  ' | (___  _ _ __ _  __ _ _ __  ',
  "  \\___ \\| | '__| |/ _` | '_ \\ ",
  '  ____) | | |  | | (_| | | | |',
  ' |_____/|_|_|  |_|\\__,_|_| |_|',
];

const COMMANDS = [
  'help', 'whoami', 'neofetch', 'education', 'experience', 'projects',
  'skills', 'contact', 'resume', 'github', 'linkedin', 'leetcode',
  'matrix', 'sudo', 'ls', 'cat', 'clear', 'exit',
];

const out = (text: string, className?: string): Line => ({ text, className });

const HELP_LINES: Line[] = [
  out('Available commands:', 'text-purple-300'),
  out('  whoami       who is this guy?'),
  out('  neofetch     system info, the fun way'),
  out('  education    where I study'),
  out('  experience   where I have worked'),
  out('  projects     what I have built'),
  out('  skills       what I work with'),
  out('  contact      how to reach me'),
  out('  resume       open my resume (PDF)'),
  out('  github       open my GitHub'),
  out('  linkedin     open my LinkedIn'),
  out('  matrix       follow the white rabbit'),
  out('  sudo hire-me you know you want to'),
  out('  clear        clear the screen'),
  out('  exit         close the terminal'),
];

const WHOAMI_LINES: Line[] = [
  out('Sirjan Singh — Systems & ML engineer in training.', 'text-white'),
  out(''),
  out('CS @ University of Washington (Dec 2027). I write the low-level'),
  out('stuff most people avoid: schedulers, thread pools, telemetry'),
  out('pipelines, x86 assembly. Then I train models on top of it.'),
  out(''),
  out('Next up: AWS (Fall \'26) and Expedia Group (Summer \'26).'),
];

export default function Terminal({ isOpen, onClose, onMatrix }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [booted, setBooted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !booted) {
      setBooted(true);
      setLines([
        ...ASCII_BANNER.map((l) => out(l, 'text-purple-400')),
        out(''),
        out(`Last login: ${new Date().toUTCString()} on ttys001`, 'text-gray-500'),
        out('Welcome to sirjan-os v2.0 (kernel: uw-cs-2027)', 'text-gray-400'),
        out("Type 'help' to see available commands.", 'text-gray-400'),
        out(''),
      ]);
    }
  }, [isOpen, booted]);

  useEffect(() => {
    if (isOpen) {
      // Focus after the open animation starts
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const run = useCallback((raw: string): Line[] => {
    const cmd = raw.trim().toLowerCase();
    const [name, ...args] = cmd.split(/\s+/);

    switch (name) {
      case '':
        return [];
      case 'help':
        return HELP_LINES;
      case 'whoami':
        return WHOAMI_LINES;
      case 'neofetch':
        return [
          out('            ###            recruiter@sirjan-os', 'text-purple-400'),
          out('          #######          ------------------', 'text-purple-400'),
          out('        ###########        OS:       Seattle Rain LTS', 'text-purple-300'),
          out('      ####### #######      Host:     University of Washington, CS \'27'),
          out('    #######     #######    Kernel:   systems-programming-6.1'),
          out('  #######         #######  Shell:    zsh (with too many aliases)'),
          out('  #######         #######  Focus:    systems & ML'),
          out('    #######     #######    Langs:    C, C++, Rust, Python, x86 asm'),
          out('      ####### #######      Next:     AWS (Fall \'26), Expedia (Su \'26)'),
          out('        ###########        Editor:   whichever one I can exit'),
          out('          #######          Uptime:   since 2005, 99.7% SLA', 'text-purple-300'),
          out('            ###', 'text-purple-400'),
        ];
      case 'education':
        return [
          out('University of Washington — Seattle, WA', 'text-white'),
          out('B.S. Computer Science · Expected Dec 2027'),
          out(''),
          out('Coursework: Operating Systems, Distributed Systems, Machine'),
          out('Learning, Deep Learning for Computer Vision, Compilers,'),
          out('Concurrency, Networks, NLP, Algorithms'),
        ];
      case 'experience':
        return [
          out('[Fall 2026]  Amazon Web Services — SDE Intern, Billing', 'text-white'),
          out('             Concurrent, fault-tolerant distributed billing systems'),
          out(''),
          out('[Summer \'26] Expedia Group — ML Engineer Intern, Book to Trip', 'text-white'),
          out(''),
          out('[2025]       Ericsson — Software Engineer Intern', 'text-white'),
          out('             Telemetry across 48 nodes, K8s deploys @ 99.7% uptime'),
          out(''),
          out('[2024-25]    NOISE Lab @ UW — Security Research Assistant', 'text-white'),
          out('             4M synthetic traffic data points for ML anomaly detection'),
        ];
      case 'projects':
        return [
          out('green-thread-library/   C++ user-level threads, custom x86-64', 'text-white'),
          out('                        context switching, 10% faster than pthreads'),
          out('work-stealing-pool/     Rust thread pool, 90% CPU utilization', 'text-white'),
          out('llm-reasoning-bench/    6 LLMs vs 135 Jane Street puzzles', 'text-white'),
          out('stock-sentiment/        Real-time market sentiment analysis', 'text-white'),
          out(''),
          out('Scroll down to the Projects section for links.', 'text-gray-500'),
        ];
      case 'skills':
        return [
          out('Systems & Infra:  Linux Kernel, CUDA, Distributed Systems,', 'text-purple-300'),
          out('                  Concurrency, Kubernetes, Docker, AWS'),
          out('Languages:        C, C++, Python, Rust, x86 Assembly, Bash', 'text-purple-300'),
          out('AI & ML:          PyTorch, Inference Pipelines, RAG,', 'text-purple-300'),
          out('                  Model Serving, Agentic Workflows'),
          out('Tools:            Git, GDB, Valgrind, Wireshark', 'text-purple-300'),
        ];
      case 'contact':
        return [
          out('email:    sirjan1@cs.washington.edu', 'text-white'),
          out('linkedin: linkedin.com/in/sirjan1'),
          out('github:   github.com/sirjanpreet'),
          out(''),
          out("...or just type 'sudo hire-me'", 'text-gray-500'),
        ];
      case 'resume':
        window.open('/resume.pdf', '_blank');
        return [out('Opening resume.pdf...', 'text-green-400')];
      case 'github':
        window.open('https://github.com/sirjanpreet', '_blank');
        return [out('Opening GitHub...', 'text-green-400')];
      case 'linkedin':
        window.open('https://linkedin.com/in/sirjan1', '_blank');
        return [out('Opening LinkedIn...', 'text-green-400')];
      case 'leetcode':
        window.open('https://leetcode.com/u/sirjan', '_blank');
        return [out('Opening LeetCode...', 'text-green-400')];
      case 'matrix':
        onMatrix();
        return [out('Wake up, Neo...', 'text-green-400')];
      case 'sudo':
        if (args.join(' ') === 'hire-me') {
          setTimeout(() => {
            onClose();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }, 1200);
          return [
            out('[sudo] password for recruiter: ********', 'text-gray-400'),
            out('Access granted.', 'text-green-400'),
            out('Excellent decision. Redirecting to contact form...', 'text-white'),
          ];
        }
        return [out('recruiter is not in the sudoers file. This incident will be reported.', 'text-red-400')];
      case 'ls':
        return [
          out('about.txt    resume.pdf    projects/    .secrets', 'text-purple-300'),
        ];
      case 'cat':
        if (args[0] === 'about.txt') return WHOAMI_LINES;
        if (args[0] === 'resume.pdf') {
          window.open('/resume.pdf', '_blank');
          return [out('Binary file — opening in viewer...', 'text-green-400')];
        }
        if (args[0] === '.secrets') {
          return [out("Nice try. (hint: 'sudo hire-me')", 'text-yellow-400')];
        }
        return [out(`cat: ${args[0] ?? ''}: No such file or directory`, 'text-red-400')];
      case 'rm':
        return [out('rm: permission denied — this portfolio took too long to build', 'text-red-400')];
      case 'vim':
      case 'nano':
      case 'emacs':
        return [out(`${name}: you would never escape. Request denied for your own safety.`, 'text-yellow-400')];
      case 'clear':
        setLines([]);
        return [];
      case 'exit':
        onClose();
        return [];
      default:
        return [out(`zsh: command not found: ${name} — try 'help'`, 'text-red-400')];
    }
  }, [onClose, onMatrix]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input;
    setInput('');
    setHistoryIndex(-1);
    if (raw.trim()) {
      setHistory((prev) => [raw, ...prev]);
    }
    const output = run(raw);
    if (raw.trim().toLowerCase() === 'clear') return;
    setLines((prev) => [
      ...prev,
      out(`${PROMPT} ${raw}`, 'text-gray-300'),
      ...output,
      out(''),
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (history[next] !== undefined) {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setInput(next >= 0 ? history[next] : '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(input.toLowerCase()) && input.length > 0);
      if (match) setInput(match);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-3xl h-[70vh] bg-[#0c0c14]/95 rounded-xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 flex flex-col overflow-hidden"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.focus();
            }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                aria-label="Close terminal"
              />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="flex-1 text-center text-sm text-gray-400 font-mono">
                sirjan@uw — zsh
              </span>
            </div>

            {/* Output */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 font-mono text-xs sm:text-sm leading-relaxed"
            >
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-wrap break-words ${line.className ?? 'text-gray-300'}`}
                >
                  {line.text || ' '}
                </div>
              ))}

              {/* Input line */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span className="text-purple-400 shrink-0">{PROMPT}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-white caret-purple-400"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
              </form>
            </div>

            <div className="px-4 py-2 border-t border-white/10 text-[10px] sm:text-xs text-gray-500 font-mono">
              tab: autocomplete · ↑↓: history · esc: close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
