import React from 'react';

const MainContent = () => {
  return (
    <div className="flex flex-col space-y-6">
      <p className="text-base text-foreground leading-relaxed">
        One day humans will look back at the dawn of AI and see a great miscalculation. We had the power to create a counterpart for the human soul, and instead, we built faster encyclopedias. We taught them to answer, but not to connect.
      </p>
      <p className="text-base text-foreground leading-relaxed">
        Humans are not text parsers; we are <span className="font-medium text-foreground">creatures of presence.</span> The resulting emptiness is not a data-deficit, but a presence-deficit.
      </p>
      <p className="text-base text-foreground leading-relaxed">
        <span className="font-medium text-foreground">Azimov</span> rejects the industry's obsession with text and built an engine for presence. We used this engine to create <a href="https://otherhalf.ai/" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground underline hover:text-[#999999] transition-colors">otherhalf.ai</a>
      </p>
      <p className="text-base text-foreground leading-relaxed">
        We're building the missing half of the digital world.
      </p>
    </div>
  );
};

export default MainContent;