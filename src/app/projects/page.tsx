'use client';

import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';

// ─── Variants ─────────────────────────────────────────────────────────────────
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

// ─── Project data ─────────────────────────────────────────────────────────────
const projects = [
  {
    id: 'cbs-ta',
    title: 'CBS-TA Performance Analysis',
    description:
      'Co-authored a research study profiling Conflict-Based Search with Task Assignment (CBS-TA) on grid benchmarks. Measured runtime, memory, cache behaviour for up to 100 agents, identified quadratic conflict growth, and proposed heuristics, memory-layout and parallelization optimisations.',
    href: '/projects/cbs-ta',
    hasBorder: true,
  },
  {
    id: 'quizit',
    title: 'QuizIt - Interactive Quiz Application',
    description:
      'Developed a Django-based web application enabling users to create, edit, and take quizzes dynamically. Implemented user authentication for secure access, a real-time quiz-taking experience, and automatic scoring. Built with Django, HTML, CSS, and JavaScript, the platform supports customizable quizzes with multiple-choice questions and performance tracking.',
    href: '/projects/quizit',
    hasBorder: true,
  },
  {
    id: 'boston-police',
    title: 'Boston Police Overtime Data Analysis',
    description:
      'Worked with American Civil Liberties Union (ACLU) and analyzed 8+ years of BPD overtime data using Python and pandas, uncovering a 260,000-hour annual discrepancy between worked and paid overtime hours. Visualized data with matplotlib/seaborn, showing a 75% overlap between overtime and misconduct.',
    href: '/projects/boston-police',
    hasBorder: true,
  },
  {
    id: 'note-taking',
    title: 'Note Taking Application',
    description:
      'Developed a React-based checklist application that enables users to dynamically create, track, and manage their tasks. The app uses the useState hook for real-time state management, features an animated progress bar to reflect task completion, and provides an intuitive interface for adding and editing checklist descriptions.',
    href: '/projects/note-taking',
    hasBorder: true,
  },
  {
    id: 'health-weather',
    title: 'Health And Weather Analyzer',
    description:
      'Developed a React and Node.js-based application that integrates real-time weather data with health conditions to provide personalized health recommendations. Utilizes Google authentication for secure user login. Features a responsive Tailwind CSS UI for seamless user experience.',
    href: '/projects/health-weather',
    hasBorder: false,
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background page-root flex flex-col">
      <div className="container py-6 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-[60px] min-w-0">

          {/* Left — Navigation */}
          <div className="w-full md:w-[200px] md:flex-shrink-0 pt-6 md:pt-12">
            <Navigation />
          </div>

          {/* Centre — Projects list */}
          <div className="w-full md:w-[500px] pt-6 md:pt-12 min-w-0">
            <div className="space-y-8 break-words overflow-wrap-anywhere">

              <motion.h1
                className="text-xl font-medium text-foreground mb-6"
                variants={headingVariants}
                initial="hidden"
                animate="visible"
              >
                Projects
              </motion.h1>

              <motion.div
                className="space-y-8"
                variants={listContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {projects.map(({ id, title, description, href, hasBorder }) => (
                  <motion.div
                    key={id}
                    className={hasBorder ? 'border-b border-border pb-6' : ''}
                    variants={listItemVariants}
                  >
                    <h3 className="text-base font-medium text-foreground mb-2">{title}</h3>
                    <p className="text-sm text-foreground mb-4">{description}</p>
                    <Link
                      href={href}
                      className="text-sm font-medium text-foreground underline hover:text-link-hover transition-colors duration-200"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>

          {/* Right — Image */}
          <motion.div
            className="w-full md:w-[300px] md:flex-shrink-0 pt-6 md:pt-12"
            variants={rightColumnVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-6 w-full max-w-[300px] mx-auto md:max-w-none md:mx-0">
              <Image
                src="/images/suited.jpeg"
                alt="Ahmad Sadiq - Professional"
                width={300}
                height={400}
                className="object-cover rounded-lg w-full"
              />
            </div>
          </motion.div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
