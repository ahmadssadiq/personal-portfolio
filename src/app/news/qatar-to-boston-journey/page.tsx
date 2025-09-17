import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import Image from 'next/image';

export default function QatarToBostonJourneyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main container follows exact layout margins and width */}
      <div className="container py-6 md:py-12">
        {/* Mobile: Stack vertically, Desktop: Horizontal layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-[60px]">
          {/* Left Column - Navigation */}
          <div className="w-full md:w-[200px] md:flex-shrink-0 pt-6 md:pt-12">
            <Navigation />
          </div>
          
          {/* Middle Column - Main Content */}
          <div className="w-full md:w-[500px] pt-6 md:pt-12">
            <div className="space-y-8">
              <div className="mb-6">
                <Link 
                  href="/news" 
                  className="text-sm text-muted hover:text-link-hover mb-4 inline-block"
                >
                  ← Back to Blog Posts
                </Link>
                <h1 className="text-xl font-medium text-foreground mb-2">From Qatar to Boston: A Software Engineer's Journey</h1>
                <p className="text-sm text-muted">December 28, 2024</p>
              </div>

              <div className="space-y-6 text-sm text-foreground leading-relaxed">
                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Cultural Foundations</h2>
                  <p>
                    Growing up in Qatar provided me with a unique perspective on technology and innovation. The country's rapid development and embrace of modern technology created an environment where innovation was not just encouraged but expected. This early exposure to cutting-edge infrastructure and digital transformation shaped my understanding of how technology can transform societies.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">The Transition to Boston</h2>
                  <p>
                    Moving to Boston for my computer science studies at Boston University was both exciting and challenging. The academic environment was rigorous, but it was the cultural diversity and collaborative spirit that truly enriched my learning experience. Working alongside students from different backgrounds taught me that the best solutions often emerge from diverse perspectives.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Bridging Cultures Through Code</h2>
                  <p>
                    My international background has given me a unique advantage in software development. Understanding different user needs, cultural contexts, and global market dynamics has helped me create more inclusive and accessible applications. Whether it's designing user interfaces that work across different languages or considering time zone implications in global applications, cultural awareness is crucial in modern software development.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Lessons from Two Worlds</h2>
                  <p>
                    Qatar taught me the importance of ambitious vision and rapid execution, while Boston's academic environment emphasized thorough research and methodical problem-solving. This combination has shaped my approach to software engineering: I believe in setting ambitious goals while maintaining rigorous technical standards and thorough testing.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">The Global Perspective</h2>
                  <p>
                    Having lived in both the Middle East and the United States, I've gained insights into how technology adoption varies across cultures and regions. This global perspective is increasingly valuable as software becomes more international and companies seek to serve diverse user bases. Understanding cultural nuances can be the difference between a successful product and one that fails to resonate with users.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Looking Forward</h2>
                  <p>
                    As I continue my journey in software engineering, I'm excited about the opportunities to bridge cultures through technology. Whether it's working on international projects, contributing to open-source communities, or building applications that serve global audiences, I believe that diverse experiences and perspectives are essential for creating meaningful technological solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Personal Images */}
          <div className="w-full md:w-[300px] md:flex-shrink-0 pt-6 md:pt-12">
            <div className="space-y-6 w-full max-w-[300px] mx-auto md:max-w-none md:mx-0">
              <Image
                src="/images/wedding.jpeg"
                alt="Cultural Celebration"
                width={300}
                height={200}
                className="object-cover rounded-lg w-full"
              />
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-sm font-medium text-foreground mb-2">About Me</h3>
                <p className="text-sm text-muted">
                  Learn more about my background and experiences in the About section of my portfolio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer spans full width */}
      <Footer />
    </div>
  );
}
