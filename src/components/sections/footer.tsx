'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ThemeTogglerButton,
} from '@/components/animate-ui/components/buttons/theme-toggler';
import { MorphSurface } from '@/components/ui/morph-surface';
import { FooterCrowd } from '@/components/ui/crowd-canvas';
import SquigglyArrow from '@/components/ui/squiggle-arrow';

const footerVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } }
};

const linksContainerVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.55, staggerChildren: 0.07 }
  }
};

const linkVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } }
};

const inputCls =
  'w-full text-sm outline-none px-3 py-2 bg-background border border-border rounded-sm ' +
  'placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring/30 caret-primary';

/* ── Contact form (hidden — button commented out) ─────────────────── */
function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [sendError, setSendError] = useState(false);
  const submitRef = React.useRef<HTMLButtonElement>(null);

  const handleSubmit = async (formData: FormData) => {
    setSendError(false);
    const message = formData.get('message') as string;
    const name    = formData.get('name')    as string;
    const email   = formData.get('email')   as string;
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, name, email }),
    });
    if (!res.ok) {
      setSendError(true);
      throw new Error('Failed to send message');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSendError(false);
  };

  return (
    <>
      {/* Contact button — commented out per request */}
      {/* <motion.button
        variants={linkVariants}
        onClick={() => setIsOpen(true)}
        className="text-sm font-normal text-muted hover:text-link-hover transition-colors duration-200 cursor-pointer"
      >
        Contact
      </motion.button> */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-10 right-10 z-50"
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          >
            <MorphSurface
              triggerLabel="Contact Ahmad"
              expandedWidth={360}
              expandedHeight={sendError ? 390 : 360}
              collapsedHeight={44}
              isOpen={isOpen}
              onOpenChange={handleClose}
              onSubmit={handleSubmit}
              onSuccess={handleClose}
              renderContent={() => (
                <>
                  <div className="flex justify-between py-1">
                    <p className="flex items-center text-sm text-muted-foreground select-none z-[2] ml-[25px]">
                      Contact Ahmad
                    </p>
                    <button
                      ref={submitRef}
                      type="submit"
                      className="mt-1 flex items-center gap-1 text-sm -translate-y-[3px] text-muted-foreground bg-transparent select-none rounded-xl cursor-pointer pr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <kbd className="w-6 h-6 bg-background text-foreground rounded flex items-center justify-center font-sans px-[6px] text-xs border border-border shadow-sm">⌘</kbd>
                      <kbd className="h-6 bg-background text-foreground rounded flex items-center justify-center font-sans px-2 text-xs border border-border shadow-sm">Enter</kbd>
                    </button>
                  </div>

                  {sendError && (
                    <p className="text-xs text-destructive px-3 pb-1">
                      Failed to send — please try again or email me directly.
                    </p>
                  )}

                  <input
                    type="text"
                    name="name"
                    placeholder="Your name (optional)"
                    className={inputCls}
                    autoComplete="name"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email (optional)"
                    className={inputCls}
                    autoComplete="email"
                  />
                  <textarea
                    name="message"
                    placeholder="Send me a message..."
                    required
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.metaKey) {
                        e.preventDefault();
                        submitRef.current?.click();
                      }
                    }}
                    className={
                      'resize-none w-full flex-1 scroll-py-2 text-base outline-none p-4 ' +
                      'bg-background border border-border rounded-b-lg rounded-t-xs ' +
                      'caret-primary placeholder:text-muted-foreground ' +
                      'focus-visible:ring-1 focus-visible:ring-ring/20'
                    }
                  />
                </>
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Footer ───────────────────────────────────────────────────────── */
const Footer = () => {
  const [locationHovered, setLocationHovered] = useState(false);

  return (
    <motion.footer
      className="relative w-full"
      variants={footerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Crowd canvas background — reveals on hover, sits behind links */}
      <AnimatePresence>
        {locationHovered && (
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <FooterCrowd />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Links row — normal flow, always visible */}
      <div className="relative z-10 container py-4 md:py-12 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <p
            className="text-sm font-normal text-muted cursor-default select-none leading-none m-0"
            onMouseEnter={() => setLocationHovered(true)}
            onMouseLeave={() => setLocationHovered(false)}
            onTouchStart={() => setLocationHovered(true)}
            onTouchEnd={() => setLocationHovered(false)}
          >
            Currently: NY
          </p>
          <AnimatePresence>
            {!locationHovered && (
              <motion.div
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.3, delay: 1.5 }}
                className="flex items-center pointer-events-none"
                style={{ color: '#a855f7' }}
              >
                <SquigglyArrow
                  variant="bouncy"
                  direction="left"
                  width={44}
                  height={22}
                  strokeWidth={1.8}
                />
                <span style={{ fontSize: 9, lineHeight: 1, marginLeft: 2, color: '#a855f7' }}>
                  <span className="hidden sm:inline">hover</span>
                  <span className="sm:hidden">tap</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.div
          className="flex items-center gap-6 leading-none"
          variants={linksContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={linkVariants}>
            <ThemeTogglerButton
              variant="ghost"
              size="sm"
              modes={['light', 'dark']}
              direction="ltr"
            />
          </motion.div>
          {/* ContactForm — button hidden, form logic preserved for future use */}
          <ContactForm />
          <motion.a
            variants={linkVariants}
            href="/images/ahmad_sadiq.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-normal text-muted hover:text-link-hover transition-colors duration-200 leading-none"
          >
            Resume
          </motion.a>
          <motion.a
            variants={linkVariants}
            href="https://www.linkedin.com/in/ahmadssadiq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-normal text-muted hover:text-link-hover transition-colors duration-200 leading-none"
          >
            LinkedIn
          </motion.a>
          <motion.a
            variants={linkVariants}
            href="https://www.github.com/ahmadssadiq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-normal text-muted hover:text-link-hover transition-colors duration-200 leading-none"
          >
            GitHub
          </motion.a>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
