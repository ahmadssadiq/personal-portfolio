'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TennisPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  const handleBackClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      router.back();
    }, 300); // Match animation duration
  };

  return (
    <div 
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackClick}
    >
      <div 
        className={`relative max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-2xl transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleBackClick}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          ×
        </button>

        <div className="flex flex-col space-y-4 break-words overflow-wrap-anywhere">
          {/* Wimbledon Image */}
          <div className="flex justify-center mb-6">
            <Image
              src="/images/wimbeldon.jpeg"
              alt="Ahmad at Wimbledon"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Dimmed content */}
          <p className="text-sm text-gray-300 leading-relaxed">
            <span className="text-sm bg-gradient-to-r from-[#3b82f6] to-[#1e40af] bg-clip-text text-transparent"> [NOT AI GENERATED] </span> Hey, my name is <span className="text-sm text-foreground">Ahmad Sadiq</span>, in the generation where AI responds to AI through human conversations. Real connections and seeing peoples value has been fading.
          </p>
          
          <p className="text-sm text-gray-300 leading-relaxed">
            I was born in <span className="text-sm bg-gradient-to-r from-[#606c38] to-[#609f38] bg-clip-text text-transparent">Pakistan</span> and lived my whole life in <span className="text-sm bg-gradient-to-r from-[#d1d5db] to-[#800020] bg-clip-text text-transparent">Qatar</span>. Through these experiences, I've learned the beauty of every culture and background for the purpose of cherishing genuine moments. 
            My Journey took me took a quick u-turn when I chose not to pursue Medical school in the UK and go to Boston University to study Computer Science. From there I've explored different industries as a software engineer from ecommerce {'->'} startup {'->'} robotics {'->'} fintech. I've vastly enjoyed exploring and realized my passion relies in creating meaningful systems that scale with quality. Over the past two years, I've implemented numerous machine learning models, including RAG-based models and agentic AI models, to maximize the value of applications powered by AI.
          </p>
          
          <p className="text-sm text-gray-300 leading-relaxed">
            I love <span className="text-sm text-foreground">football </span> (in other words 'soccer'), <span className="text-sm text-foreground">tennis</span>, and <span className="text-sm text-foreground">padel</span>.
          </p>
          
          <p className="text-sm text-gray-300 leading-relaxed">
            I believe that technology should not only be about efficiency and performance but also about enhancing our daily lives with an engaging experiences.
          </p>
          
          <p className="text-sm text-gray-300 leading-relaxed">
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

          {/* Credentials section */}
          <div className="mt-6 break-words overflow-wrap-anywhere">
            <p className="mb-1 text-sm font-normal text-gray-300">
              / <span className="text-sm bg-gradient-to-r from-[#dc2626] to-[#fca5a5] bg-clip-text text-transparent">Boston University</span> Computer Science
            </p>
            <p className="m-0 text-sm font-normal text-gray-300">
              / Available for opportunities 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TennisPage;
