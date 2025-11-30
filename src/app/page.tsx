'use client';

import Navigation from "@/components/sections/navigation";
import MainContent from "@/components/sections/main-content";
import CredentialsSection from "@/components/sections/credentials";
import Footer from "@/components/sections/footer";
import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
  const [showTennis, setShowTennis] = useState(false);
  const [showPakistan, setShowPakistan] = useState(false);
  const [showQatar, setShowQatar] = useState(false);
  const [showBoston, setShowBoston] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-4 md:py-12">
        <div className="flex flex-col md:flex-row gap-4 md:gap-[60px] min-w-0">
          <div className="w-full md:w-[200px] md:flex-shrink-0 pt-4 md:pt-12">
            <Navigation />
          </div>
          <div className="w-full md:w-[500px] pt-4 md:pt-12 min-w-0">
            <MainContent 
              showTennis={showTennis} 
              setShowTennis={setShowTennis}
              showPakistan={showPakistan}
              setShowPakistan={setShowPakistan}
              showQatar={showQatar}
              setShowQatar={setShowQatar}
            />
                   <CredentialsSection 
                     showTennis={showTennis} 
                     showBoston={showBoston}
                     setShowBoston={setShowBoston}
                     setShowTennis={setShowTennis}
                     setShowPakistan={setShowPakistan}
                     setShowQatar={setShowQatar}
                   />
          </div>
          <div className="w-full md:w-[300px] md:flex-shrink-0 pt-4 md:pt-12">
            <div className="relative w-full max-w-[300px] mx-auto md:max-w-none md:mx-0">
              <Image
                src={
                  showTennis ? "/images/wimbeldon.jpeg" :
                  showPakistan ? "/images/pakistan.JPG" :
                  showQatar ? "/images/qatar.png" :
                  showBoston ? "/images/Boston_University.JPG" :
                  "/images/profile.jpg"
                }
                alt="Ahmad Sadiq"
                width={300}
                height={400}
                className="object-cover rounded-lg w-full transition-all duration-300"
                priority
              />
              {showTennis && (
                <p className="text-xs font-normal text-muted mt-2 text-center">
                  this is me at Wimbeldon (Alcaraz vs Djocovic) 2023
                </p>
              )}
              {showPakistan && (
                <p className="text-xs font-normal text-muted mt-2 text-center">
                  Friends wedding in Pakistan
                </p>
              )}
              {showQatar && (
                <p className="text-xs font-normal text-muted mt-2 text-center">
                  Family time in Qatar
                </p>
              )}
              {showBoston && (
                <p className="text-xs font-normal text-muted mt-2 text-center">
                  Boston University graduation with friends
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
