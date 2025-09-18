'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MainContentProps {
  showTennis: boolean;
  setShowTennis: (show: boolean) => void;
}

const MainContent = ({ showTennis, setShowTennis }: MainContentProps) => {
  return (
    <div className="flex flex-col space-y-4 break-words overflow-wrap-anywhere">
      <p className={`text-sm leading-relaxed transition-colors duration-300 ${showTennis ? 'text-gray-400' : 'text-foreground text-muted'}`}>
      <span className="text-sm bg-gradient-to-r from-[#3b82f6] to-[#1e40af] bg-clip-text text-transparent"> [NOT AI GENERATED] </span> Hey, my name is <span className="text-sm text-foreground">Ahmad Sadiq</span>, in the generation where AI responds to AI through human conversations. Real connections and seeing peoples value has been fading. I was born in <span className="text-sm bg-gradient-to-r from-[#606c38] to-[#609f38] bg-clip-text text-transparent">Pakistan</span> and lived my whole life in <span className="text-sm bg-gradient-to-r from-[#d1d5db] to-[#800020] bg-clip-text text-transparent">Qatar</span>. Through these experiences, I've learned the beauty of every culture and background for the purpose of cherishing genuine moments. </p>
      <p className={`text-sm leading-relaxed transition-colors duration-300 ${showTennis ? 'text-gray-400' : 'text-foreground text-muted'}`}>
      My Journey took a quick u-turn when I chose not to pursue Medical school in the UK and go to Boston University to study Computer Science. From there I explored different industries as a software engineer from ecommerce → startup → robotics → fintech. I've vastly enjoyed exploring and realized my passion relies in creating meaningful systems that scale with quality. Over the past two years, I've implemented numerous machine learning models, including RAG-based models and agentic AI models, to maximize the value of applications powered by AI.
      </p>
      <p className={`text-sm leading-relaxed transition-colors duration-300 ${showTennis ? 'text-gray-400' : 'text-foreground text-muted'}`}>
        I love <span className="text-sm text-foreground">football </span> (in other words 'soccer'), <button onClick={() => setShowTennis(!showTennis)} className={`text-sm hover:underline cursor-pointer transition-colors duration-300 ${showTennis ? 'text-green-500' : 'text-foreground'}`}>tennis</button>, and <span className="text-sm text-foreground">padel</span>.
      </p>
      <p className={`text-sm leading-relaxed transition-colors duration-300 ${showTennis ? 'text-gray-400' : 'text-foreground text-muted'}`}>
        I believe that technology should not only be about efficiency and performance but also about enhancing our daily lives with an engaging experiences.
      </p>
      <p className={`text-sm leading-relaxed transition-colors duration-300 ${showTennis ? 'text-gray-400' : 'text-foreground text-muted'}`}>
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
          href="https://skansnetwork.com"
          target="_blank"
          rel="noopener noreferrer"
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