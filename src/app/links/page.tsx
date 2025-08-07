"use client";

import { useEffect, useRef } from "react";
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
      <div className="relative z-10 min-h-screen p-8 md:p-16 flex items-center justify-center">
        {/* Centered content matching the image */}
        <div className="text-center max-w-4xl">
          {/* Logo Section */}
          <div className="mb-8">
            <img
              src="/logo.png"
              alt="Bubbleheads Logo"
              className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 object-contain"
            />
            <h1
              className="text-2xl md:text-3xl font-bold text-white mb-2"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              BUBBLEHEADS
            </h1>
            <h2
              className="text-sm md:text-base text-white mb-8"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              The Bubbleheads Station
            </h2>
          </div>

          {/* Website Section */}
          <div className="mb-8">
            <h3
              className="text-2xl md:text-3xl font-bold text-yellow-300 mb-3"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Website
            </h3>
            <Link
              href="https://bubbleverse.online/"
              className="text-lg md:text-xl text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300 block"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              🚀 Avatar Generator
            </Link>
          </div>

          {/* Socials Section */}
          <div className="mb-8">
            <h3
              className="text-2xl md:text-3xl font-bold text-yellow-300 mb-3"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Socials
            </h3>
            <a
              href="https://x.com/TheBubble_Heads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg md:text-xl text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300 block"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              🐦 X (Twitter)
            </a>
          </div>

          {/* PFP Generator Section */}
          <div className="mb-8">
            <h3
              className="text-2xl md:text-3xl font-bold text-yellow-300 mb-3"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              PFP Generator
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://bubbleheads.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base md:text-lg text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                [ 1 ] Bubbleheads Generator
              </a>
              <a
                href="https://thebubbleheads.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base md:text-lg text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                [ 2 ] The Bubbleheads Generator
              </a>
            </div>
          </div>

          {/* Tools Section */}
          <div className="mb-8">
            <h3
              className="text-2xl md:text-3xl font-bold text-yellow-300 mb-3"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Tools
            </h3>
            <div className="space-y-2">
              <a
                href="https://dyorhub.xyz/tokens/3G1yVFfKzZxsvTnAnJMQzZBtyTpfWUTY6G7685nRjups"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm md:text-base text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                📊 DYORhub Analytics - Token Research & Analysis
              </a>
              <a
                href="https://axiom.trade/t/3G1yVFfKzZxsvTnAnJMQzZBtyTpfWUTY6G7685nRjups/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm md:text-base text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                ⚡ Trade on Axiom - DEX Trading Platform
              </a>
              <a
                href="https://gmgn.ai/sol/token/eKMpq0u9_3G1yVFfKzZxsvTnAnJMQzZBtyTpfWUTY6G7685nRjups"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm md:text-base text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                💚 GMGN Analytics - Advanced Token Metrics
              </a>
              <a
                href="https://dexscreener.com/solana/dufuudxe8eh663dfwx16n8lufcanyeseqwgvodoshzxc"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm md:text-base text-emerald-400 font-bold hover:text-amber-400 transition-colors duration-300"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                📈 DexScreener Charts - Real-time Price Data
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
