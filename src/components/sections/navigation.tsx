'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { PixelHeading } from '@/components/ui/pixel-heading-character';

// Shared stagger container used by the nav list
const navContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      // Start children after a short pause so the page content also has
      // a moment to begin its own entry animation
      delayChildren: 0.05,
      staggerChildren: 0.06,
    },
  },
};

const navItemVariants = {
  hidden:  { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] as [number, number, number, number],
    },
  },
};

const nameVariants = {
  hidden:  { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] as [number, number, number, number],
    },
  },
};

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const links: { href: string; label: string }[] = [
    { href: '/',        label: 'Home'        },
    { href: '/about',   label: 'Experiences' },
    { href: '/projects',label: 'Projects'    },
    { href: '/news',    label: 'Blogs'       },
  ];

  return (
    <div>
      <motion.div
        className="mb-4 md:mb-6 h-5 overflow-hidden"
        variants={nameVariants}
        initial="hidden"
        animate="visible"
      >
        <PixelHeading
          as="h2"
          mode="wave"
          autoPlay={true}
          showLabel={false}
          cycleInterval={340}
          staggerDelay={200}
          defaultFontIndex={3}
          className="text-sm tracking-tight text-foreground cursor-pointer select-none leading-none"
        >
          Ahmad Sadiq
        </PixelHeading>
      </motion.div>

      <motion.nav
        className="flex flex-row md:flex-col gap-3 md:gap-2 overflow-x-auto md:overflow-x-visible"
        variants={navContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {links.map(({ href, label }) => (
          <motion.div key={href} variants={navItemVariants}>
            <Link
              href={href}
              className={`text-xs md:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                isActive(href)
                  ? 'bg-gradient-to-r from-[#606c38] to-[#fefae0] bg-clip-text text-transparent'
                  : 'text-muted hover:text-link-hover'
              }`}
            >
              {label}
            </Link>
          </motion.div>
        ))}
      </motion.nav>
    </div>
  );
}
