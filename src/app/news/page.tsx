'use client';

import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';

const headingVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } }
};

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

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-[60px] min-w-0">
          <div className="w-full md:w-[200px] md:flex-shrink-0 pt-6 md:pt-12">
            <Navigation />
          </div>

          <div className="w-full md:w-[500px] pt-6 md:pt-12 min-w-0">
            <div className="space-y-8 break-words overflow-wrap-anywhere">
              <motion.h1
                variants={headingVariants}
                initial="hidden"
                animate="visible"
                className="text-xl font-medium text-foreground mb-6"
              >
                Blog Posts
              </motion.h1>

              <motion.div
                className="space-y-6"
                variants={listContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={listItemVariants} className="pb-6">
                  <h2 className="text-base font-medium text-foreground mb-2">From Final Round Ghosting to Transforming My Father's Network</h2>
                  <p className="text-sm text-muted mb-3">August 2025 - September 2025</p>
                  <p className="text-sm text-foreground leading-relaxed mb-4">
                    After being ghosted in final rounds, I channeled that energy into transforming my father's traditional business network into Skans Network - a modern digital platform that bridges traditional networking with modern technology.
                  </p>
                  <Link
                    href="/news/transforming-skans-network"
                    className="text-sm font-medium text-foreground underline hover:text-link-hover transition-colors duration-200"
                  >
                    Read More
                  </Link>
                </motion.div>

                <motion.div variants={listItemVariants} className="pb-6">
                  <h2 className="text-base font-medium text-foreground mb-2">From Qatar to Boston: A Software Engineer's Journey</h2>
                  <p className="text-sm text-muted mb-3">December 28, 2024</p>
                  <p className="text-sm text-foreground leading-relaxed mb-4">
                    Reflecting on the cultural and professional journey from growing up in Qatar to pursuing computer science at Boston University. Exploring how diverse experiences shape technical perspectives.
                  </p>
                  <Link
                    href="/news/qatar-to-boston-journey"
                    className="text-sm font-medium text-foreground underline hover:text-link-hover transition-colors duration-200"
                  >
                    Read More
                  </Link>
                </motion.div>
              </motion.div>
            </div>
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
