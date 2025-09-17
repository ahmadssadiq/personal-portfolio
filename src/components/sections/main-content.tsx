import React from 'react';

const MainContent = () => {
  return (
    <div className="flex flex-col space-y-4">
      <p className="text-sm text-foreground leading-relaxed">
        Hi, I'm Ahmad Sadiq – a passionate Software Engineer with a flair for turning complex challenges into innovative, user-centered solutions. I was born in <span className="text-sm bg-gradient-to-r from-[#606c38] to-[#d4af37] bg-clip-text text-transparent">Pakistan</span> and lived my whole life in <span className="text-sm bg-gradient-to-r from-[#d1d5db] to-[#800020] bg-clip-text text-transparent">Qatar</span>, where the vibrant culture and fast-paced environment taught me early on the value of creativity and resilience.
      </p>
      <p className="text-sm text-foreground leading-relaxed">
        My journey led me to Boston University, where I graduated with a Bachelor of Arts in Computer Science. At BU, I channel my technical skills into cutting-edge projects—whether it's designing multi-agent systems or crafting AI-driven applications—that drive innovation and solve real-world problems.
      </p>
      <p className="text-sm text-foreground leading-relaxed">
        When I'm not immersed in code, debugging, or architecting efficient algorithms, you'll find me on the sports field. I'm an avid soccer player, enjoy a good match of tennis, and love padel.
      </p>
      <p className="text-sm text-foreground leading-relaxed">
        I believe that technology should not only be about efficiency and performance but also about enhancing our daily lives with fun and engaging experiences. Welcome to my portfolio – where innovation meets passion, and every line of code tells a story.
      </p>
    </div>
  );
};

export default MainContent;