import React from 'react';

interface CredentialsSectionProps {
  showTennis: boolean;
}

const CredentialsSection = ({ showTennis }: CredentialsSectionProps) => {
  return (
    <div className="mt-6 break-words overflow-wrap-anywhere">
      <p className={`mb-1 text-sm font-normal transition-colors duration-300 ${showTennis ? 'text-gray-300' : 'text-muted'}`}>
        / <span className="text-sm bg-gradient-to-r from-[#dc2626] to-[#fca5a5] bg-clip-text text-transparent">Boston University</span> Computer Science (May 2025)
      </p>
      <p className={`m-0 text-sm font-normal transition-colors duration-300 ${showTennis ? 'text-gray-300' : 'text-muted'}`}>
        / Available for opportunities 
      </p>
    </div>
  );
};

export default CredentialsSection;