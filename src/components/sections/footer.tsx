import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full mt-24">
      <div className="container flex justify-between items-center">
        <p className="text-base font-normal text-muted">
          Azimov, inc.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/company/azimovai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-normal text-muted hover:text-link-hover"
          >
            LinkedIn
          </a>
          <a
            href="https://substack.com/@creaturesoflife"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-normal text-muted hover:text-link-hover"
          >
            Substack
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;