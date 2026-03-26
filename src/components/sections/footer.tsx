'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ThemeTogglerButton,
} from '@/components/animate-ui/components/buttons/theme-toggler';
import { MorphSurface } from '@/components/ui/morph-surface';

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

function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const message = formData.get('message') as string;
    const name    = formData.get('name')    as string;
    const email   = formData.get('email')   as string;
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, name, email }),
    });
    if (!res.ok) throw new Error('Failed to send message');
  };

  return (
    <>
      <motion.button
        variants={linkVariants}
        onClick={() => setIsOpen(true)}
        className="text-sm font-normal text-muted hover:text-link-hover transition-colors duration-200 cursor-pointer"
      >
        Contact
      </motion.button>

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
              expandedHeight={360}
              collapsedHeight={44}
              isOpen={isOpen}
              onOpenChange={setIsOpen}
              onSubmit={handleSubmit}
              onSuccess={() => setIsOpen(false)}
              renderContent={() => (
                <>
                  {/* Header row */}
                  <div className="flex justify-between py-1">
                    <p className="flex items-center text-sm text-muted-foreground select-none z-[2] ml-[25px]">
                      Contact Ahmad
                    </p>
                    <button
                      type="submit"
                      className="mt-1 flex items-center gap-1 text-sm -translate-y-[3px] text-muted-foreground bg-transparent select-none rounded-xl cursor-pointer pr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <kbd className="w-6 h-6 bg-background text-foreground rounded flex items-center justify-center font-sans px-[6px] text-xs border border-border shadow-sm">⌘</kbd>
                      <kbd className="h-6 bg-background text-foreground rounded flex items-center justify-center font-sans px-2 text-xs border border-border shadow-sm">Enter</kbd>
                    </button>
                  </div>

                  {/* Name */}
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name (optional)"
                    className={inputCls}
                    autoComplete="name"
                  />

                  {/* Email */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email (optional)"
                    className={inputCls}
                    autoComplete="email"
                  />

                  {/* Message */}
                  <textarea
                    name="message"
                    placeholder="Send me a message..."
                    required
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

const Footer = () => {
  return (
    <motion.footer
      className="w-full mt-16 pb-24"
      variants={footerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container flex justify-between items-center">
        <p className="text-sm font-normal text-muted">
          Currently: NY
        </p>
        <motion.div
          className="flex items-center gap-6"
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
          <ContactForm />
          <motion.a
            variants={linkVariants}
            href="/images/ahmad_sadiq.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-normal text-muted hover:text-link-hover transition-colors duration-200"
          >
            Resume
          </motion.a>
          <motion.a
            variants={linkVariants}
            href="https://www.linkedin.com/in/ahmadssadiq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-normal text-muted hover:text-link-hover transition-colors duration-200"
          >
            LinkedIn
          </motion.a>
          <motion.a
            variants={linkVariants}
            href="https://www.github.com/ahmadssadiq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-normal text-muted hover:text-link-hover transition-colors duration-200"
          >
            GitHub
          </motion.a>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
