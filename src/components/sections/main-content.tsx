'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  PreviewLinkCard,
  PreviewLinkCardTrigger,
  PreviewLinkCardContent,
  PreviewLinkCardImage,
} from '@/components/animate-ui/components/radix/preview-link-card';

interface MainContentProps {
  showTennis: boolean;
  setShowTennis: (show: boolean) => void;
  showPakistan: boolean;
  setShowPakistan: (show: boolean) => void;
  showQatar: boolean;
  setShowQatar: (show: boolean) => void;
}

// Each paragraph slides up and fades in; stagger is owned by the parent
const paragraphVariants = {
  hidden:  { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] as [number, number, number, number],
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.08,
    },
  },
};

const MainContent = ({
  showTennis,
  setShowTennis,
  showPakistan,
  setShowPakistan,
  showQatar,
  setShowQatar,
}: MainContentProps) => {
  const dimmed = showTennis || showPakistan || showQatar;
  const baseClass = `text-sm leading-relaxed transition-colors duration-300 ${
    dimmed ? 'text-muted opacity-60' : 'text-foreground'
  }`;

  return (
    <motion.div
      className="flex flex-col space-y-4 break-words overflow-wrap-anywhere"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Paragraph 1 */}
      <motion.p className={baseClass} variants={paragraphVariants}>
        <span className="text-sm bg-gradient-to-r from-[#3b82f6] to-[#1e40af] bg-clip-text text-transparent">
          {' '}[NOT AI GENERATED]{' '}
        </span>
        Hey, my name is{' '}
        <span className="text-sm text-foreground">Ahmad Sadiq</span>, in the
        generation where AI responds to AI through human conversations. Real
        connections and seeing peoples value has been fading. I was born in{' '}
        <button
          onClick={() => {
            setShowPakistan(!showPakistan);
            setShowQatar(false);
            setShowTennis(false);
          }}
          className={`text-sm transition-all duration-300 ${
            showPakistan
              ? 'text-green-500'
              : 'bg-gradient-to-r from-[#606c38] to-[#609f38] bg-clip-text text-transparent hover:opacity-80 cursor-pointer'
          }`}
          style={{ fontSize: 'inherit' }}
        >
          Pakistan
        </button>{' '}
        and lived my whole life in{' '}
        <button
          onClick={() => {
            setShowQatar(!showQatar);
            setShowPakistan(false);
            setShowTennis(false);
          }}
          className={`text-sm transition-all duration-300 ${
            showQatar
              ? 'text-green-500'
              : 'bg-gradient-to-r from-[#d1d5db] to-[#800020] bg-clip-text text-transparent hover:opacity-80 cursor-pointer'
          }`}
          style={{ fontSize: 'inherit' }}
        >
          Qatar
        </button>
        . Through these experiences, I&apos;ve learned the beauty of every
        culture and background for the purpose of cherishing genuine moments.
      </motion.p>

      {/* Paragraph 2 */}
      <motion.p className={baseClass} variants={paragraphVariants}>
        My journey took a quick u-turn when I chose not to pursue medical school
        in the UK and go to Boston University to study Computer Science. From
        there I explored different industries as a software engineer from
        ecommerce → startup → robotics → fintech. I&apos;ve vastly enjoyed
        exploring and realized my passion relies in creating meaningful systems
        that scale with quality. Over the past two years, I&apos;ve implemented
        numerous machine learning models, including RAG-based models and agentic
        AI models, to maximize the value of applications powered by AI.
      </motion.p>

      {/* Paragraph 3 */}
      <motion.p className={baseClass} variants={paragraphVariants}>
        I love football (in other words &apos;soccer&apos;),{' '}
        <button
          onClick={() => {
            setShowTennis(!showTennis);
            setShowPakistan(false);
            setShowQatar(false);
          }}
          className={`text-sm hover:underline cursor-pointer transition-colors duration-300 ${
            showTennis ? 'text-green-500' : 'text-foreground'
          }`}
        >
          tennis
        </button>
        , and padel.
      </motion.p>

      {/* Paragraph 4 — currently at */}
      <motion.p className={baseClass} variants={paragraphVariants}>
        Currently at{' '}
        <Link
          href="/experience/iwm"
          className="inline-flex items-end hover:opacity-80 transition-opacity duration-200"
        >
          <Image
            src="/images/iwm.jpeg"
            alt="IWM Logo"
            width={20}
            height={20}
            className="rounded-sm"
          />
        </Link>
        {', '}producing{' '}
        <PreviewLinkCard href="https://joinconnectra.com" followCursor="y">
          <PreviewLinkCardTrigger
            href="https://joinconnectra.com"
            target="_blank"
            className="inline-flex items-end hover:opacity-80 transition-opacity duration-200"
            style={{ transform: 'translateY(4px)' }}
          >
            <Image
              src="/images/connectra-logo.png"
              alt="Connectra Logo"
              width={24}
              height={24}
              className="rounded-sm"
            />
          </PreviewLinkCardTrigger>
          <PreviewLinkCardContent
            side="top"
            sideOffset={8}
            align="center"
            target="_blank"
          >
            <PreviewLinkCardImage alt="Connectra Website Preview" />
          </PreviewLinkCardContent>
        </PreviewLinkCard>
        {' '}and{' '}
        <PreviewLinkCard href="https://skansnetwork.com" followCursor="y">
          <PreviewLinkCardTrigger
            href="https://skansnetwork.com"
            target="_blank"
            className="inline-flex items-end hover:opacity-80 transition-opacity duration-200"
          >
            <Image
              src="/images/skans_logo_wite.png"
              alt="Skans Logo"
              width={20}
              height={20}
              className="rounded-sm"
            />
          </PreviewLinkCardTrigger>
          <PreviewLinkCardContent
            side="top"
            sideOffset={8}
            align="center"
            target="_blank"
          >
            <PreviewLinkCardImage alt="Skans Network Website Preview" />
          </PreviewLinkCardContent>
        </PreviewLinkCard>
      </motion.p>
    </motion.div>
  );
};

export default MainContent;
