'use client';

import React from 'react';
import {
  ThemeTogglerButton,
} from '@/components/animate-ui/components/buttons/theme-toggler';

const Footer = () => {
  return (
    <footer className="w-full mt-16 pb-24">
      <div className="container flex justify-between items-center">
        <p className="text-sm font-normal text-muted">
          Currently: NY
        </p>
        <div className="flex items-center gap-6">
          <ThemeTogglerButton
            variant="ghost"
            size="sm"
            modes={['light', 'dark']}
            direction="ltr"
          />
          <a
            href="/images/Ahmad_Sadiq_Resume_.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-normal text-muted hover:text-link-hover"
          >
            Resume
          </a>
          <a
            href="https://www.linkedin.com/in/ahmadssadiq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-normal text-muted hover:text-link-hover"
          >
            LinkedIn
          </a>
          <a
            href="https://www.github.com/ahmadssadiq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-normal text-muted hover:text-link-hover"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;