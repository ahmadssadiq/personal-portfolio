'use client';

import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'motion/react';

// ─── Stagger variants ─────────────────────────────────────────────────────────
const listContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.09,
    },
  },
};

const listItemVariants = {
  hidden:  { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] as [number, number, number, number],
    },
  },
};

const headingVariants = {
  hidden:  { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] as [number, number, number, number],
      delay: 0.08,
    },
  },
};

const rightColumnVariants = {
  hidden:  { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] as [number, number, number, number],
      delay: 0.2,
    },
  },
};

// ─── Skills data ──────────────────────────────────────────────────────────────
const skills = [
  {
    label: 'AI & Automation',
    items: 'LangChain, LangGraph, OpenAI APIs, LLM orchestration, structured outputs, REST APIs, webhooks',
  },
  {
    label: 'Languages',
    items: 'Python, TypeScript, JavaScript, SQL, C/C++, React, HTML, CSS',
  },
  {
    label: 'Platforms & Tools',
    items: 'PostgreSQL, Node.js, Firebase, Grafana, Git',
  },
  {
    label: 'Methods',
    items: 'Agentic pipeline design, observability & audit logging, event sourcing & replay, distributed systems design',
  },
];

export default function AboutPage() {
  const [gameState, setGameState] = useState({
    isPlaying: true,
    currentGuess: null as number | null,
    correctAnswers: [1],
    guessedFaces: [] as number[],
    gameComplete: false,
  });

  const facePositions = [
    { id: 0, name: 'Person 1',                         x: 30, y: 35 },
    { id: 1, name: 'Ahmad (smallest with glasses)',    x: 48, y: 50 },
    { id: 2, name: 'Person 3',                         x: 50, y: 20 },
    { id: 3, name: 'Person 4',                         x: 70, y: 35 },
  ];

  const makeGuess = (faceId: number) => {
    if (!gameState.isPlaying || gameState.guessedFaces.includes(faceId)) return;
    const isCorrect       = gameState.correctAnswers.includes(faceId);
    const newGuessedFaces = [...gameState.guessedFaces, faceId];
    setGameState(prev => ({
      ...prev,
      currentGuess:  faceId,
      guessedFaces:  newGuessedFaces,
      gameComplete:  newGuessedFaces.length === 4,
    }));
  };

  return (
    <div className="min-h-screen bg-background page-root flex flex-col">
      <div className="container py-6 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-[60px] min-w-0">

          {/* Left — Navigation */}
          <div className="w-full md:w-[200px] md:flex-shrink-0 pt-6 md:pt-12">
            <Navigation />
          </div>

          {/* Centre — Experience list + skills */}
          <div className="w-full md:w-[500px] pt-6 md:pt-12 min-w-0">
            <div className="space-y-8 break-words overflow-wrap-anywhere">

              <motion.h2
                className="text-xl font-medium text-foreground mb-6"
                variants={headingVariants}
                initial="hidden"
                animate="visible"
              >
                Experience
              </motion.h2>

              <motion.div
                className="space-y-8"
                variants={listContainerVariants}
                initial="hidden"
                animate="visible"
              >

                {/* Connectra */}
                <motion.div className="border-b border-border pb-6" variants={listItemVariants}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <a
                        href="https://joinconnectra.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
                      >
                        <Image src="/images/connectra-mark.png" alt="Connectra Logo" width={20} height={20} className="rounded-sm" />
                        <h3 className="text-lg font-medium text-foreground">Connectra, New York, NY</h3>
                      </a>
                    </div>
                    <span className="text-sm text-muted">Sep 2025 – Present</span>
                  </div>
                  <p className="text-sm text-muted mb-3">Cofounder &amp; CTO</p>
                  <div className="space-y-1">
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Architecting a full-stack agentic platform from zero, designing multi-step LLM orchestration pipelines with tool-calling and structured JSON outputs to make agent decisions consistent, machine-readable, and auditable end-to-end.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Building an observability layer to trace agent decisions, actions, and outputs across distributed workflows, enabling complete attribution of actions to specific agents.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Designing agent identity and credentialing systems to support reliable, auditable agent attribution across distributed workflows.</div>
                  </div>
                  <a href="/experience/connectra" className="inline-block mt-3 text-sm font-medium text-foreground underline hover:text-link-hover transition-colors duration-200">
                    Learn More
                  </a>
                </motion.div>

                {/* Ooredoo Money */}
                <motion.div className="border-b border-border pb-6" variants={listItemVariants}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Image src="/images/ooredoo-money.png" alt="Ooredoo Money Logo" width={20} height={20} className="rounded-sm" />
                      <h3 className="text-lg font-medium text-foreground">Ooredoo Money, Doha, Qatar</h3>
                    </div>
                    <span className="text-sm text-muted">Jan 2026 – Aug 2026</span>
                  </div>
                  <p className="text-sm text-muted mb-3">Data Engineer</p>
                  <div className="space-y-1">
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Built SQL/Hive pipelines processing 1M+ daily financial transactions, designing audit-ready data models for traceability across a QAR 30M+ monthly remittance platform.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Developed observability tooling and KPI dashboards surfacing QAR 2M+ in revenue signals, with alerting on anomalous transaction patterns across 8 financial corridors.</div>
                  </div>
                </motion.div>

                {/* IWM */}
                <motion.div className="border-b border-border pb-6" variants={listItemVariants}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <a
                        href="https://www.iwmprivate.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
                      >
                        <Image src="/images/iwm.jpeg" alt="IWM Logo" width={20} height={20} className="rounded-sm" />
                        <h3 className="text-lg font-medium text-foreground">IWM, New York, NY</h3>
                      </a>
                    </div>
                    <span className="text-sm text-muted">Jun 2025 – Jan 2026</span>
                  </div>
                  <p className="text-sm text-muted mb-3">Founding Engineer</p>
                  <div className="space-y-1">
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Engineered a TypeScript ranking system with full event logging, enabling complete traceability of user actions and referral flows at scale.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Built Node.js/Express and PostgreSQL APIs with full audit logging and event sourcing, handling 10K+ daily transactional events with complete replay capability.</div>
                  </div>
                  <a href="/experience/iwm" className="inline-block mt-3 text-sm font-medium text-foreground underline hover:text-link-hover transition-colors duration-200">
                    Learn More
                  </a>
                </motion.div>

                {/* DuneAI */}
                <motion.div variants={listItemVariants}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
                      >
                        <Image src="/images/dune_ai_logo.jpeg" alt="DuneAI Logo" width={20} height={20} className="rounded-sm" />
                        <h3 className="text-lg font-medium text-foreground">DuneAI, Dubai, UAE</h3>
                      </a>
                    </div>
                    <span className="text-sm text-muted">Jun 2024 – Aug 2024</span>
                  </div>
                  <p className="text-sm text-muted mb-3">Robotics Software Engineer</p>
                  <div className="space-y-1">
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Designed multi-agent coordination systems with task allocation and real-time state visibility, optimizing distributed robot operations across a simulated environment.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Built automated task assignment pipelines with event-driven triggers, improving distribution reliability across agent nodes.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Wrote unit tests and observability hooks across a multi-module C++ system to increase reliability of distributed agent components.</div>
                  </div>
                  <a href="/experience/duneai" className="inline-block mt-3 text-sm font-medium text-foreground underline hover:text-link-hover transition-colors duration-200">
                    Learn More
                  </a>
                </motion.div>

              </motion.div>

              <motion.h2
                className="text-xl font-medium text-foreground mb-6"
                variants={headingVariants}
                initial="hidden"
                animate="visible"
              >
                Skills
              </motion.h2>

              <motion.div
                className="space-y-4"
                variants={listContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {skills.map(({ label, items }) => (
                  <motion.div key={label} variants={listItemVariants}>
                    <p className="text-sm text-muted mb-1">{label}</p>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>{items}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right — Personal image */}
          <motion.div
            className="w-full md:w-[300px] md:flex-shrink-0 pt-6 md:pt-12"
            variants={rightColumnVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-6 w-full max-w-[300px] mx-auto md:max-w-none md:mx-0">
              <div className="relative">
                <Image
                  src="/images/family.jpeg"
                  alt="Ahmad Sadiq - Family"
                  width={300}
                  height={300}
                  className="object-cover rounded-lg w-full"
                />

                {/* Interactive face circles */}
                {gameState.isPlaying &&
                  !gameState.guessedFaces.includes(1) &&
                  facePositions.map((face) => {
                    const isGuessed      = gameState.guessedFaces.includes(face.id);
                    const isCorrect      = gameState.correctAnswers.includes(face.id);
                    let circleColor      = 'border-white border-dashed';
                    if (isGuessed) {
                      circleColor = isCorrect
                        ? 'border-green-500 bg-green-500 bg-opacity-20'
                        : 'border-red-500 bg-red-500 bg-opacity-20';
                    }
                    return (
                      <div
                        key={face.id}
                        className={`absolute w-12 h-12 rounded-full border-2 ${circleColor} cursor-pointer transition-all duration-300 hover:scale-110`}
                        style={{ left: `${face.x}%`, top: `${face.y}%`, transform: 'translate(-50%, -50%)' }}
                        onClick={() => makeGuess(face.id)}
                        title={
                          isGuessed
                            ? isCorrect ? `Correct! This is ${face.name}` : `Wrong! This is ${face.name}`
                            : `Click to guess: ${face.name}`
                        }
                      >
                        {isGuessed && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-white">
                              {isCorrect ? '✓' : '✗'}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>

              <div className="text-center">
                <p className="text-sm text-muted">
                  {gameState.guessedFaces.includes(1)
                    ? 'you like my glasses :)'
                    : 'Click on the dotted circles to guess who I am.'}
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
