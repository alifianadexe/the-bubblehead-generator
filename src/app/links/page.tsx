"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Star {
  x: number;
  y: number;
  radius: number;
  color: string;
  twinkle: number;
}

export default function LinksPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const stars: Star[] = [];
    const numStars = 300;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        color: Math.random() < 0.15 ? "#f1b847" : "#3ed09b",
        twinkle: Math.random() * 0.02 + 0.01,
      });
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.radius += (Math.random() - 0.5) * star.twinkle;
        star.radius = Math.max(0.2, Math.min(2.5, star.radius));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
      });
    };

    const animate = () => {
      drawStars();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "#0e0e10" }}
    >
      {/* Animated Starfield Background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <Image
              src="/logo.png"
              alt="The Bubbleheads Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wider"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            THE BUBBLEHEADS
          </h1>
          <p className="text-emerald-400 text-lg tracking-wide">
            🌌 Welcome to the Bubbleverse 🌌
          </p>
        </div>

        {/* Links Container - Simple List Style */}
        <div className="text-center">
          <Link
            href="/"
            className="block my-2 text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300 no-underline"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            🚀 Avatar Generator
          </Link>

          <a
            href="https://x.com/TheBubble_Heads"
            target="_blank"
            rel="noopener noreferrer"
            className="block my-2 text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300 no-underline"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            🐦 Follow on X (Twitter)
          </a>

          <a
            href="https://dyorhub.xyz/tokens/3G1yVFfKzZxsvTnAnJMQzZBtyTpfWUTY6G7685nRjups"
            target="_blank"
            rel="noopener noreferrer"
            className="block my-2 text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300 no-underline"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            📊 DYORhub Analytics
          </a>

          <a
            href="https://axiom.trade/t/3G1yVFfKzZxsvTnAnJMQzZBtyTpfWUTY6G7685nRjups/"
            target="_blank"
            rel="noopener noreferrer"
            className="block my-2 text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300 no-underline"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            ⚡ Trade on Axiom
          </a>

          <a
            href="https://gmgn.ai/sol/token/eKMpq0u9_3G1yVFfKzZxsvTnAnJMQzZBtyTpfWUTY6G7685nRjups"
            target="_blank"
            rel="noopener noreferrer"
            className="block my-2 text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300 no-underline"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            🎯 GMGN Analytics
          </a>

          <a
            href="https://dexscreener.com/solana/dufuudxe8eh663dfwx16n8lufcanyeseqwgvodoshzxc"
            target="_blank"
            rel="noopener noreferrer"
            className="block my-2 text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300 no-underline"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            📈 DexScreener Charts
          </a>

          <a
            href="#"
            className="block my-2 text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300 no-underline"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            💬 Join Discord
          </a>

          <a
            href="#"
            className="block my-2 text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300 no-underline"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            📱 Telegram Channel
          </a>

          <a
            href="#"
            className="block my-2 text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300 no-underline"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            👨‍🚀 Meet the Crew
          </a>

          <a
            href="#"
            className="block my-2 text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300 no-underline"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            🛰️ Space Station Updates
          </a>

          <a
            href="#"
            className="block my-2 text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300 no-underline"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            🪐 Explore the Bubbleverse
          </a>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm mb-2">
            🚀 Join the Bubbleheads cult today! 🚀
          </p>
          <p className="text-emerald-400 text-xs tracking-wide">
            ✨ To infinity and beyond ✨
          </p>
        </div>
      </div>
    </div>
  );
}
