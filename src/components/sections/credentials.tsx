'use client';

import React from 'react';
import { motion } from 'motion/react';

interface CredentialsSectionProps {
  showTennis: boolean;
  showBoston: boolean;
  setShowBoston: (show: boolean) => void;
  setShowTennis: (show: boolean) => void;
  setShowPakistan: (show: boolean) => void;
  setShowQatar: (show: boolean) => void;
}

const credentialVariants = {
  hidden:  { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] as [number, number, number, number],
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      // Offset from main content's stagger so credentials arrive last
      delayChildren: 0.42,
      staggerChildren: 0.07,
    },
  },
};

const CredentialsSection = ({
  showTennis,
  showBoston,
  setShowBoston,
  setShowTennis,
  setShowPakistan,
  setShowQatar,
}: CredentialsSectionProps) => {
  const dimmed = showTennis || showBoston;

  return (
    <motion.div
      className="mt-6 break-words overflow-wrap-anywhere"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        className={`mb-1 text-sm font-normal transition-colors duration-300 ${
          dimmed ? 'text-muted opacity-70' : 'text-muted'
        }`}
        variants={credentialVariants}
      >
        /{' '}
        <button
          onClick={() => {
            setShowBoston(!showBoston);
            setShowTennis(false);
            setShowPakistan(false);
            setShowQatar(false);
          }}
          className={`text-sm transition-all duration-300 ${
            showBoston
              ? 'text-green-500'
              : 'bg-gradient-to-r from-[#dc2626] to-[#fca5a5] bg-clip-text text-transparent hover:opacity-80 cursor-pointer'
          }`}
          style={{ fontSize: 'inherit' }}
        >
          Boston University
        </button>{' '}
        Computer Science (May 2025)
      </motion.p>

      <motion.p
        className={`m-0 text-sm font-normal transition-colors duration-300 ${
          dimmed ? 'text-muted opacity-70' : 'text-muted'
        }`}
        variants={credentialVariants}
      >
        / Click the bold words
      </motion.p>
    </motion.div>
  );
};

export default CredentialsSection;
