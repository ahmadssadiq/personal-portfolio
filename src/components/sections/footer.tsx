import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full mt-16">
      <div className="container flex justify-between items-center">
        <p className="text-sm font-normal text-muted">
          hmm... thinking
        </p>
        <div className="flex items-center gap-6">
          <a
            href="/images/Ahmad_Sadiq_Resume_jan29.pdf"
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