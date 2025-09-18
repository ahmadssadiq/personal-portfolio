import React from 'react';

interface CredentialsSectionProps {
  showTennis: boolean;
  showBoston: boolean;
  setShowBoston: (show: boolean) => void;
  setShowTennis: (show: boolean) => void;
  setShowPakistan: (show: boolean) => void;
  setShowQatar: (show: boolean) => void;
}

const CredentialsSection = ({ showTennis, showBoston, setShowBoston, setShowTennis, setShowPakistan, setShowQatar }: CredentialsSectionProps) => {
  return (
    <div className="mt-6 break-words overflow-wrap-anywhere">
      <p className={`mb-1 text-sm font-normal transition-colors duration-300 ${(showTennis || showBoston) ? 'text-gray-300' : 'text-muted'}`}>
        / <button onClick={() => { setShowBoston(!showBoston); setShowTennis(false); setShowPakistan(false); setShowQatar(false); }} className={`text-sm transition-all duration-300 ${showBoston ? 'text-green-500' : 'bg-gradient-to-r from-[#dc2626] to-[#fca5a5] bg-clip-text text-transparent hover:opacity-80 cursor-pointer'}`} style={{fontSize: 'inherit'}}>Boston University</button> Computer Science (May 2025)
      </p>
      <p className={`m-0 text-sm font-normal transition-colors duration-300 ${(showTennis || showBoston) ? 'text-gray-300' : 'text-muted'}`}>
        / Available for opportunities 
      </p>
    </div>
  );
};

export default CredentialsSection;