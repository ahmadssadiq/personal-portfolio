'use client';

import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { PixelHeading } from '@/components/ui/pixel-heading-character';

const listContainerVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.1, staggerChildren: 0.1 } }
};

const listItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } }
};

const rightColumnVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } }
};

// No posts for now — shown in the same "/ ..." style as the home credentials
const statusLines = [
  'posts published: 0',
  'drafts in his head: 404',
  'blame: Connectra, grad school and padel',
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container py-6 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-[60px] min-w-0">
          <div className="w-full md:w-[200px] md:flex-shrink-0 pt-6 md:pt-12">
            <Navigation />
          </div>

          <div className="w-full md:w-[500px] pt-6 md:pt-12 min-w-0">
            <motion.div
              className="break-words overflow-wrap-anywhere"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p variants={listItemVariants} className="text-sm mb-2">
                <span className="text-sm bg-gradient-to-r from-[#3b82f6] to-[#1e40af] bg-clip-text text-transparent">
                  [NOT WRITTEN YET]
                </span>
              </motion.p>

              <motion.div variants={listItemVariants} className="mb-6">
                <PixelHeading
                  as="h1"
                  mode="wave"
                  autoPlay={true}
                  showLabel={false}
                  cycleInterval={340}
                  staggerDelay={200}
                  defaultFontIndex={3}
                  className="text-[96px] md:text-[128px] tracking-tight text-foreground cursor-pointer select-none leading-none"
                >
                  404
                </PixelHeading>
              </motion.div>

              <motion.h2 variants={listItemVariants} className="text-xl font-medium text-foreground mb-2">
                No blogs here rn.
              </motion.h2>

              <motion.p variants={listItemVariants} className="text-sm text-foreground leading-relaxed mb-6">
                Ahmad is busy working. He&apos;s gonna write later, g.
              </motion.p>

              <motion.div variants={listItemVariants} className="mb-6">
                {statusLines.map((line) => (
                  <p key={line} className="mb-1 text-sm font-normal text-muted">
                    / {line}
                  </p>
                ))}
              </motion.div>

              <motion.div variants={listItemVariants} className="flex items-center gap-6">
                <Link
                  href="/"
                  className="text-sm font-medium text-foreground underline hover:text-link-hover transition-colors duration-200"
                >
                  Back home
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-medium text-foreground underline hover:text-link-hover transition-colors duration-200"
                >
                  See what he&apos;s busy with
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            variants={rightColumnVariants}
            initial="hidden"
            animate="visible"
            className="w-full md:w-[300px] md:flex-shrink-0 pt-6 md:pt-12"
          >
            <div className="space-y-6 w-full max-w-[300px] mx-auto md:max-w-none md:mx-0">
              <Image
                src="/images/wedding.jpeg"
                alt="Ahmad Sadiq - Wedding"
                width={300}
                height={300}
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
