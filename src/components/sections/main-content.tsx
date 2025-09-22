'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MainContentProps {
  showTennis: boolean;
  setShowTennis: (show: boolean) => void;
  showPakistan: boolean;
  setShowPakistan: (show: boolean) => void;
  showQatar: boolean;
  setShowQatar: (show: boolean) => void;
}

const MainContent = ({ showTennis, setShowTennis, showPakistan, setShowPakistan, showQatar, setShowQatar }: MainContentProps) => {
  return (
    <div className="flex flex-col space-y-4 break-words overflow-wrap-anywhere">
      <p className={`text-sm leading-relaxed transition-colors duration-300 ${(showTennis || showPakistan || showQatar) ? 'text-gray-400' : 'text-foreground text-muted'}`}>
      <span className="text-sm bg-gradient-to-r from-[#3b82f6] to-[#1e40af] bg-clip-text text-transparent"> [NOT AI GENERATED] </span> Hey, my name is <span className="text-sm text-foreground">Ahmad Sadiq</span>, in the generation where AI responds to AI through human conversations. Real connections and seeing peoples value has been fading. I was born in <button onClick={() => { setShowPakistan(!showPakistan); setShowQatar(false); setShowTennis(false); }} className={`text-sm transition-all duration-300 ${showPakistan ? 'text-green-500' : 'bg-gradient-to-r from-[#606c38] to-[#609f38] bg-clip-text text-transparent hover:opacity-80 cursor-pointer'}`} style={{fontSize: 'inherit'}}>Pakistan</button> and lived my whole life in <button onClick={() => { setShowQatar(!showQatar); setShowPakistan(false); setShowTennis(false); }} className={`text-sm transition-all duration-300 ${showQatar ? 'text-green-500' : 'bg-gradient-to-r from-[#d1d5db] to-[#800020] bg-clip-text text-transparent hover:opacity-80 cursor-pointer'}`} style={{fontSize: 'inherit'}}>Qatar</button>. Through these experiences, I've learned the beauty of every culture and background for the purpose of cherishing genuine moments. </p>
      <p className={`text-sm leading-relaxed transition-colors duration-300 ${(showTennis || showPakistan || showQatar) ? 'text-gray-400' : 'text-foreground text-muted'}`}>
      My journey took a quick u-turn when I chose not to pursue medical school in the UK and go to Boston University to study Computer Science. From there I explored different industries as a software engineer from ecommerce → startup → robotics → fintech. I've vastly enjoyed exploring and realized my passion relies in creating meaningful systems that scale with quality. Over the past two years, I've implemented numerous machine learning models, including RAG-based models and agentic AI models, to maximize the value of applications powered by AI.
      </p>
      <p className={`text-sm leading-relaxed transition-colors duration-300 ${(showTennis || showPakistan || showQatar) ? 'text-gray-400' : 'text-foreground text-muted'}`}>
        I love football (in other words 'soccer'), <button onClick={() => { setShowTennis(!showTennis); setShowPakistan(false); setShowQatar(false); }} className={`text-sm hover:underline cursor-pointer transition-colors duration-300 ${showTennis ? 'text-green-500' : 'text-foreground'}`}>tennis</button>, and padel.
      </p>
      {/* <p className={`text-sm leading-relaxed transition-colors duration-300 ${showTennis ? 'text-gray-400' : 'text-foreground text-muted'}`}>
        I believe that technology should not only be about efficiency and performance but also about enhancing our daily lives with engaging experiences.
      </p> */}
      <p className={`text-sm leading-relaxed transition-colors duration-300 ${(showTennis || showPakistan || showQatar) ? 'text-gray-400' : 'text-foreground text-muted'}`}>
        Currently at{' '}
        <Link
          href="/experience/iwm"
          className="inline-flex items-end hover:opacity-80 transition-opacity"
        >
          <Image
            src="/images/iwm.jpeg"
            alt="IWM Logo"
            width={20}
            height={20}
            className="rounded-sm"
          />
        </Link>
        {' '}and producing {' '}
        <Link
          href="/news/transforming-skans-network"
          className="inline-flex items-end hover:opacity-80 transition-opacity"
        >
          <Image
            src="/images/skans_logo_wite.png"
            alt="Skans Logo"
            width={20}
            height={20}
            className="rounded-sm"
          />
        </Link>
      </p>
    </div>
  );
};

export default MainContent;