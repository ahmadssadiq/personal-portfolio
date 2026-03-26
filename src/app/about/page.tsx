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
    <div className="min-h-screen bg-background page-root">
      <div className="container py-6 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-[60px] min-w-0">

          {/* Left — Navigation */}
          <div className="w-full md:w-[200px] md:flex-shrink-0 pt-6 md:pt-12">
            <Navigation />
          </div>

          {/* Centre — Experience list */}
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
                        <h3 className="text-lg font-medium text-foreground">IWM, NY USA</h3>
                      </a>
                    </div>
                    <span className="text-sm text-muted">Jun 2025 - Present</span>
                  </div>
                  <p className="text-sm text-muted mb-3">Founding Engineer</p>
                  <div className="space-y-1">
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Built a complete React Native application with TypeScript, Node.js/Express backend and PostgreSQL database.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Developed sophisticated waitlist ranking system inspired by Monzo&apos;s approach with logarithmic scaling.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Created streamlined 5-step onboarding flow reducing registration time to under 5 minutes.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Integrated AppsFlyer SDK for professional attribution tracking and deep linking capabilities.</div>
                  </div>
                  <a href="/experience/iwm" className="inline-block mt-3 text-sm font-medium text-foreground underline hover:text-link-hover transition-colors duration-200">
                    Learn More
                  </a>
                </motion.div>

                {/* ACTEX */}
                <motion.div className="border-b border-border pb-6" variants={listItemVariants}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <a
                        href="https://www.actexlearning.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
                      >
                        <Image src="/images/actex.jpeg" alt="ACTEX Learning Logo" width={20} height={20} className="rounded-sm" />
                        <h3 className="text-lg font-medium text-foreground">ACTEX Learning, MA USA</h3>
                      </a>
                    </div>
                    <span className="text-sm text-muted">May 2025 – Jun 2025</span>
                  </div>
                  <p className="text-sm text-muted mb-3">Quality Assurance Engineer</p>
                  <div className="space-y-1">
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Ran cross-platform smoke &amp; regression tests on macOS, iOS, and web builds of the Eureka! e-reader.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Logged defects with repro steps, screenshots, and severity tags in Asana; collaborated with devs to triage issues.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Drafted a &ldquo;Getting Started&rdquo; README and reusable test-case templates to onboard future testers.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Expanded the suite with edge-case scenarios (offline mode, update-over-install, accessibility compliance).</div>
                  </div>
                </motion.div>

                {/* DuneAI */}
                <motion.div className="border-b border-border pb-6" variants={listItemVariants}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
                      >
                        <Image src="/images/dune_ai_logo.jpeg" alt="DuneAI Logo" width={20} height={20} className="rounded-sm" />
                        <h3 className="text-lg font-medium text-foreground">DuneAI</h3>
                      </a>
                    </div>
                    <span className="text-sm text-muted">Jun 2024 - Aug 2024</span>
                  </div>
                  <p className="text-sm text-muted mb-3">Robotics Software Engineer</p>
                  <div className="space-y-1">
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Designed and implemented multi-agent pathfinding algorithms leveraging C++ and OpenGL.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Optimized robot sorting operations on a simulated grid.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Constructed a Python barcode scanner to automate task assignment.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Developed unit tests with Google Test for code reliability.</div>
                  </div>
                  <a href="/experience/duneai" className="inline-block mt-3 text-sm font-medium text-foreground underline hover:text-link-hover transition-colors duration-200">
                    Learn More
                  </a>
                </motion.div>

                {/* AheadCare */}
                <motion.div className="border-b border-border pb-6" variants={listItemVariants}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-foreground">AheadCare</h3>
                    <span className="text-sm text-muted">Jun 2023 - Mar 2024</span>
                  </div>
                  <p className="text-sm text-muted mb-3">CEO</p>
                  <div className="space-y-1">
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Developed an ML Predictive FAQ system using LangChain.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Streamlined customer database updates with adaptive learning algorithms.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Improved real-time response accuracy by 30%.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Collaborated with investors to secure $25,000 in funding.</div>
                  </div>
                </motion.div>

                {/* Starlink */}
                <motion.div variants={listItemVariants}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <a
                        href="https://www.starlink.qa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
                      >
                        <Image src="/images/starlink.jpg" alt="Starlink Logo" width={20} height={20} className="rounded-sm" />
                        <h3 className="text-lg font-medium text-foreground">Starlink</h3>
                      </a>
                    </div>
                    <span className="text-sm text-muted">Jun 2022 - Aug 2022</span>
                  </div>
                  <p className="text-sm text-muted mb-3">Full Stack Developer</p>
                  <div className="space-y-1">
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Executed a responsive e-commerce platform using React and Python/Django.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Increased user engagement and sales by 20%.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Optimized database queries and achieved real-time data synchronization.</div>
                    <div className="text-foreground" style={{ fontSize: '14px', lineHeight: '1.4' }}>• Reduced load times by 30%.</div>
                  </div>
                </motion.div>

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
