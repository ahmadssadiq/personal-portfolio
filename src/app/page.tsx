'use client';

import Navigation from "@/components/sections/navigation";
import MainContent from "@/components/sections/main-content";
import CredentialsSection from "@/components/sections/credentials";
import Footer from "@/components/sections/footer";
import { StampPhoto } from "@/components/ui/stamp-photo";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const columnVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }
  })
};

const captionVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } }
};

const captions: Record<string, string> = {
  '/images/wimbeldon.jpeg': 'this is me at Wimbeldon (Alcaraz vs Djocovic) 2023',
  '/images/pakistan.JPG': 'Friends wedding in Pakistan',
  '/images/qatar.png': 'Family time in Qatar',
  '/images/Boston_University.JPG': 'Boston University graduation with friends',
};

const stampLabels: Record<string, string> = {
  '/images/wimbeldon.jpeg':      'Wimbledon',
  '/images/pakistan.JPG':        'Pakistan',
  '/images/qatar.png':           'Qatar',
  '/images/Boston_University.JPG': 'Boston',
};

export default function HomePage() {
  const [showTennis, setShowTennis] = useState(false);
  const [showPakistan, setShowPakistan] = useState(false);
  const [showQatar, setShowQatar] = useState(false);
  const [showBoston, setShowBoston] = useState(false);

  const imageSrc =
    showTennis ? '/images/wimbeldon.jpeg' :
    showPakistan ? '/images/pakistan.JPG' :
    showQatar ? '/images/qatar.png' :
    showBoston ? '/images/Boston_University.JPG' :
    '/images/profile.jpg';

  const caption = captions[imageSrc];

  return (
    <div className="min-h-screen bg-background page-root flex flex-col">
      <div className="container pt-4 pb-4 md:pt-12 md:pb-0 flex-1">
        <div className="flex flex-col md:flex-row gap-4 md:gap-[60px] min-w-0">
          <motion.div
            className="w-full md:w-[200px] md:flex-shrink-0 pt-4 md:pt-12"
            variants={columnVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <Navigation />
          </motion.div>
          <motion.div
            className="w-full md:w-[500px] pt-4 md:pt-12 min-w-0"
            variants={columnVariants}
            initial="hidden"
            animate="visible"
            custom={0.05}
          >
            <MainContent
              showTennis={showTennis}
              setShowTennis={setShowTennis}
              showPakistan={showPakistan}
              setShowPakistan={setShowPakistan}
              showQatar={showQatar}
              setShowQatar={setShowQatar}
            />
            <CredentialsSection
              showTennis={showTennis}
              showBoston={showBoston}
              setShowBoston={setShowBoston}
              setShowTennis={setShowTennis}
              setShowPakistan={setShowPakistan}
              setShowQatar={setShowQatar}
            />
          </motion.div>
          <motion.div
            className="w-full md:w-[300px] md:flex-shrink-0 pt-4 md:pt-12"
            variants={columnVariants}
            initial="hidden"
            animate="visible"
            custom={0.15}
          >
            <div className="relative w-full max-w-[300px] mx-auto md:max-w-none md:mx-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={imageSrc}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                >
                  <StampPhoto
                    src={imageSrc}
                    alt="Ahmad Sadiq"
                    label={stampLabels[imageSrc]}
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                {caption && (
                  <motion.p
                    key={imageSrc + '-caption'}
                    variants={captionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-xs font-normal text-muted mt-2 text-center"
                  >
                    {caption}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
