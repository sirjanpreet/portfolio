'use client';

import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  onClose: () => void;
}

const CHARS = 'アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF<>/{}[]=+-*&|;:';

export default function MatrixRain({ onClose }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 16;
    const columns = Math.ceil(canvas.width / fontSize);
    const rows = canvas.height / fontSize;
    const drops = Array.from({ length: columns }, () => Math.random() * rows);

    let raf = 0;
    let last = 0;
    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (time - last < 50) return;
      last = time;

      ctx.fillStyle = 'rgba(5, 5, 5, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = '#e9d5ff';
        ctx.fillText(char, x, y);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.8)';
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - fontSize);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
    // The canvas animation must survive parent re-renders, so it takes no deps.
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] bg-black/90" onClick={onClose}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-sm text-purple-300/70">
        press ESC or click to exit the matrix
      </p>
    </div>
  );
}
