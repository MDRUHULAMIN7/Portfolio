"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [resumeUrl, setResumeUrl] = useState("#");

  useEffect(() => {
    // Dynamically fetch the resume link on the client side to prevent blocking LCP or server-side hydration.
    const fetchResume = async () => {
      try {
        const res = await fetch("/api/resume");
        if (res.ok) {
          const data = await res.json();
          if (data?.resume) {
            setResumeUrl(data.resume);
          }
        }
      } catch (err) {
        console.error("Failed to fetch resume link: ", err);
      }
    };
    fetchResume();
  }, []);

  const handleVerifyProjects = (e) => {
    e.preventDefault();
    const target = document.getElementById("projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 lg:py-24 px-6 md:px-12 lg:px-24 bg-[#070A13]"
    >
      {/* Ambient background glows for immense depth */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#00F2FE]/10 blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[160px] pointer-events-none z-0" />

      {/* Main container Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Text & Intent */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 md:space-y-8">
          
          {/* Status Pill */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-pulse-slow">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
            </span>
            <span className="text-xs md:text-sm font-semibold text-cyan-200 tracking-wide">
              Available for Jr. Software Engineering Roles & AI Projects
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-sans">
            ENGINEERING HIGH-PERFORMANCE,{" "}
            <span className="relative inline-block text-[#00F2FE] drop-shadow-[0_0_18px_rgba(0,242,254,0.7)]">
              AI-INTEGRATED
            </span>{" "}
            FULL-STACK SYSTEMS
          </h1>

          {/* Paragraph Description */}
          <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
            MERN/Next.js Architect with extensive SparkTech Agency experience.
            Solo ERP architecture design and implementation, and advanced LLM
            automation workflow integration. Focused on scalable systems and
            future-proof solutions.
          </p>

          {/* Call to Actions (CTAs) */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              onClick={handleVerifyProjects}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg text-sm font-bold text-[#070A13] bg-[#00F2FE] shadow-[0_0_20px_rgba(0,242,254,0.45)] hover:shadow-[0_0_30px_rgba(0,242,254,0.7)] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-center"
            >
              Verify Production Projects
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-transparent border border-[#00F2FE]/70 shadow-[0_0_15px_rgba(0,242,254,0.15)] hover:bg-[#00F2FE]/10 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-center"
            >
              Download Technical CV
            </a>
          </div>
        </div>

        {/* Right Column: Engineering Radar Graphic */}
        <div className="lg:col-span-5 flex justify-center items-center relative w-full aspect-square max-w-[500px] mx-auto lg:max-w-none">
          
          {/* Blueprint Radar Background */}
          <div className="absolute inset-0 bg-[#070A13] border border-cyan-500/10 rounded-xl overflow-hidden shadow-[inset_0_0_30px_rgba(6,182,212,0.05)]">
            
            {/* Radar Grid SVG */}
            <svg
              className="w-full h-full"
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid Background Pattern */}
              <defs>
                <pattern
                  id="radar-grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(0, 242, 254, 0.05)"
                    strokeWidth="1"
                  />
                </pattern>
                
                {/* Radar Sweep Gradient */}
                <linearGradient id="sweep-gradient" x1="250" y1="250" x2="440" y2="100" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00F2FE" stopOpacity="0" />
                  <stop offset="30%" stopColor="#00F2FE" stopOpacity="0.03" />
                  <stop offset="70%" stopColor="#00F2FE" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#00F2FE" stopOpacity="0.35" />
                </linearGradient>

                {/* Arrowheads for Axis lines */}
                <marker
                  id="arrow-axis"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#00F2FE" fillOpacity="0.7" />
                </marker>
              </defs>

              {/* Apply grid pattern */}
              <rect width="100%" height="100%" fill="url(#radar-grid)" />

              {/* Intersecting Axis Lines */}
              {/* X Axis */}
              <line
                x1="20"
                y1="250"
                x2="480"
                y2="250"
                stroke="rgba(0, 242, 254, 0.3)"
                strokeWidth="1"
                markerEnd="url(#arrow-axis)"
                markerStart="url(#arrow-axis)"
              />
              {/* Y Axis */}
              <line
                x1="250"
                y1="480"
                x2="250"
                y2="20"
                stroke="rgba(0, 242, 254, 0.3)"
                strokeWidth="1"
                markerEnd="url(#arrow-axis)"
                markerStart="url(#arrow-axis)"
              />

              {/* Concentric Vector Circles */}
              <circle cx="250" cy="250" r="50" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="1" />
              <circle cx="250" cy="250" r="100" stroke="rgba(0, 242, 254, 0.2)" strokeWidth="1.2" />
              <circle cx="250" cy="250" r="150" stroke="rgba(0, 242, 254, 0.25)" strokeWidth="1.2" />
              <circle cx="250" cy="250" r="200" stroke="rgba(0, 242, 254, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="250" cy="250" r="235" stroke="rgba(0, 242, 254, 0.1)" strokeWidth="1" />

              {/* Radar Sweep Rotator Hand */}
              <g className="animate-radar-sweep">
                <line
                  x1="250"
                  y1="250"
                  x2="416"
                  y2="84"
                  stroke="#00F2FE"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_8px_rgba(0,242,254,0.8)]"
                />
                {/* Sweep sector gradient trail */}
                <path
                  d="M 250 250 L 416 84 A 235 235 0 0 0 250 15 Z"
                  fill="url(#sweep-gradient)"
                />
              </g>

              {/* Radar Contact Glow Targets */}
              {/* Contact 1 */}
              <g className="opacity-80">
                <circle cx="180" cy="180" r="4" fill="#10B981" />
                <circle cx="180" cy="180" r="12" stroke="#10B981" strokeWidth="1" className="animate-ping" style={{ transformOrigin: '180px 180px' }} />
                <line x1="170" y1="180" x2="190" y2="180" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" />
                <line x1="180" y1="170" x2="180" y2="190" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" />
              </g>

              {/* Contact 2 */}
              <g className="opacity-80">
                <circle cx="340" cy="345" r="4" fill="#10B981" />
                <circle cx="340" cy="345" r="10" stroke="#10B981" strokeWidth="1" className="animate-ping" style={{ transformOrigin: '340px 345px' }} />
                <line x1="330" y1="345" x2="350" y2="345" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" />
                <line x1="340" y1="335" x2="340" y2="355" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" />
              </g>

              {/* Contact 3 (Cyan) */}
              <g className="opacity-90">
                <circle cx="370" cy="200" r="4" fill="#00F2FE" />
                <circle cx="370" cy="200" r="14" stroke="#00F2FE" strokeWidth="1" className="animate-ping" style={{ transformOrigin: '370px 200px' }} />
                <line x1="360" y1="200" x2="380" y2="200" stroke="rgba(0, 242, 254, 0.4)" strokeWidth="1" />
                <line x1="370" y1="190" x2="370" y2="210" stroke="rgba(0, 242, 254, 0.4)" strokeWidth="1" />
              </g>

              {/* Contact 4 */}
              <g className="opacity-80">
                <circle cx="150" cy="320" r="3" fill="#ffffff" />
                <line x1="145" y1="320" x2="155" y2="320" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
                <line x1="150" y1="315" x2="150" y2="325" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
              </g>
            </svg>
          </div>

          {/* Interactive Floating Monospace Code Blocks */}
          
          {/* Block 1 (Top Left) */}
          <div className="absolute top-[12%] left-[-4%] md:left-[-8%] bg-slate-950/75 border border-slate-800 rounded-lg p-2.5 font-mono text-[10px] md:text-xs text-slate-300 shadow-xl backdrop-blur-md max-w-[190px] select-none hover:border-cyan-500/40 transition-colors duration-300 z-20">
            <div className="flex items-center gap-1.5 border-b border-slate-800 pb-1.5 mb-1.5 text-slate-500">
              <span className="w-2 h-2 rounded-full bg-red-500/70" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
              <span className="w-2 h-2 rounded-full bg-green-500/70" />
              <span className="text-[9px] uppercase tracking-wider ml-1">RBAC Gate</span>
            </div>
            <div className="leading-relaxed">
              <span className="text-pink-400">socket</span>.<span className="text-cyan-400">on</span>(<span className="text-emerald-400">"connection"</span>,
              <div className="pl-4 text-cyan-300 font-semibold">setupRBAC</div>
              )
              <div>{"})"}</div>
            </div>
          </div>

          {/* Block 2 (Right Mid) */}
          <div className="absolute top-[30%] right-[-6%] md:right-[-12%] bg-slate-950/75 border border-slate-800 rounded-lg p-2.5 font-mono text-[10px] md:text-xs text-slate-300 shadow-xl backdrop-blur-md max-w-[210px] select-none hover:border-[#00F2FE]/40 transition-colors duration-300 z-20">
            <div className="flex items-center gap-1.5 border-b border-slate-800 pb-1.5 mb-1.5 text-slate-500">
              <span className="w-2 h-2 rounded-full bg-cyan-500/40 animate-pulse" />
              <span className="text-[9px] uppercase tracking-wider">AI Workflow</span>
            </div>
            <div className="leading-relaxed">
              <span className="text-[#00F2FE] font-semibold">geminiAPI</span>.<span className="text-cyan-400">integrate</span>{"({" }
              <div className="pl-4">
                <span className="text-slate-400">workflow:</span> <span className="text-emerald-400">"automation"</span>
              </div>
              {"})"}
            </div>
          </div>

          {/* Block 3 (Bottom Left) */}
          <div className="absolute bottom-[16%] left-[-2%] md:left-[-6%] bg-slate-950/75 border border-slate-800 rounded-lg p-2.5 font-mono text-[10px] md:text-xs text-slate-300 shadow-xl backdrop-blur-md max-w-[200px] select-none hover:border-emerald-500/40 transition-colors duration-300 z-20">
            <div className="flex items-center gap-1.5 border-b border-slate-800 pb-1.5 mb-1.5 text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
              <span className="text-[9px] uppercase tracking-wider">Scale Engine</span>
            </div>
            <div className="leading-relaxed">
              <span className="text-pink-400">system_design</span>.<span className="text-cyan-400">scale</span>{"({" }
              <div className="pl-4">
                <span className="text-slate-400">microservices:</span> <span className="text-purple-400">true</span>,
              </div>
              <div className="pl-4">
                <span className="text-slate-400">target:</span> <span className="text-emerald-400">"2026"</span>
              </div>
              {"})"}
            </div>
          </div>

          {/* Floating High-Tech Metric Badges */}
          
          {/* LCP Badge */}
          <div className="absolute top-[8%] right-[2%] bg-slate-950/80 border border-cyan-500/20 px-2.5 py-1 rounded text-[10px] md:text-xs font-mono text-cyan-400 shadow-lg tracking-wide select-none hover:border-[#00F2FE]/50 transition-colors duration-300 z-20">
            [LCP: <span className="text-white font-bold">0.8s</span>]
          </div>

          {/* Hackathon Badge */}
          <div className="absolute bottom-[8%] right-[-2%] md:right-[-6%] bg-slate-950/80 border border-emerald-500/20 px-2.5 py-1 rounded text-[10px] md:text-xs font-mono text-emerald-400 shadow-lg tracking-wide select-none hover:border-emerald-400/50 transition-colors duration-300 z-20 flex flex-col gap-0.5">
            <div>[Endgame Hackathon: <span className="text-white font-bold">2nd/45</span>]</div>
            <div className="text-[9px] text-slate-500 border-t border-slate-800/60 mt-0.5 pt-0.5">[Solo ERP Architect]</div>
          </div>

        </div>

      </div>
    </section>
  );
}
