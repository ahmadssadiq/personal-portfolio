import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Image from 'next/image';
import Link from 'next/link';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

export default function SkansNetworkBlogPost() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-[60px] min-w-0">
          {/* Left Column - Navigation */}
          <div className="w-full md:w-[200px] md:flex-shrink-0 pt-6 md:pt-12">
            <Navigation />
          </div>
          
          {/* Middle Column - Main Content */}
          <div className="w-full md:w-[500px] pt-6 md:pt-12 min-w-0">
            <div className="space-y-8 break-words overflow-wrap-anywhere">
              
              {/* Header */}
              <div className="mb-6">
                <Link 
                  href="/news" 
                  className="text-sm text-muted hover:text-link-hover mb-4 inline-block"
                >
                  ← Back to Blogs
                </Link>
                <h1 className="text-xl font-medium text-foreground mb-2">From Final Round Ghosting to Transforming My Father's Network</h1>
                <p className="text-sm text-muted mb-4">How I turned rejection into opportunity by building an alumni network platform that connects people through events and shared experiences.</p>
                <div className="flex items-center gap-4 text-sm text-muted">
                  <Link 
                    href="https://skansnetwork.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-link-hover"
                  >
                    Skans Network
                  </Link>
                  <span>·</span>
                  <span>6 min read</span>
                </div>
              </div>

              <div className="space-y-6 text-sm text-foreground leading-relaxed">
                
                <div>
                  <p>
                    After being ghosted in the final round of multiple job applications, I found myself at a crossroads. 
                    Instead of dwelling on rejection, I channeled that energy into something meaningful—transforming my 
                    father's company network into a digital alumni platform.
                  </p>
                  <p>
                    What started as a personal project has evolved into <span className="bg-gradient-to-r from-[#606c38] to-[#fefae0] bg-clip-text text-transparent">Skans Network</span>—a platform 
                    that connects alumni from my father's company, allowing them to benefit from each other and organize 
                    both professional and social events.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">The Vision</h2>
                  <p>
                    The core idea was simple: create an alumni network where people from my father's company could stay 
                    connected, help each other professionally, and come together for events. The platform needed to be 
                    more than just a directory—it had to facilitate real connections and meaningful gatherings.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Building Community Through Events</h2>
                  <p>
                    One of the first major events we organized was a qawalli night that brought over 1,000 people together. 
                    It wasn't just about the music—it was about creating a space where alumni could reconnect, share stories, 
                    and strengthen the bonds that had formed during their time with the company.
                  </p>
                  <p>
                    The success of that event showed us the real potential of the platform. Alumni were forming stronger 
                    connections, and word of mouth started spreading organically. People were talking about the network, 
                    sharing their experiences, and bringing others into the community.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Organic Growth</h2>
                  <p>
                    The traction didn't come from marketing campaigns or aggressive growth strategies. It came from genuine 
                    connections and shared experiences. As alumni organized more events—both professional networking sessions 
                    and social gatherings—the network grew naturally. Each event strengthened the community and brought 
                    more people into the fold.
                  </p>
                  <p>
                    The platform became a place where people could find opportunities, share knowledge, and maintain the 
                    relationships that mattered to them. It was about preserving the culture and connections of the company 
                    while making them accessible in a modern, digital way.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Lessons Learned</h2>
                  <p>
                    This experience taught me that sometimes the best opportunities come from unexpected places. Instead 
                    of waiting for the perfect job, I created my own opportunity by solving a real problem for people I care 
                    about. Rejection can be a catalyst for innovation—when one door closes, sometimes you need to build 
                    your own door.
                  </p>
                  <p>
                    Building Skans Network showed me the power of community and authentic connections. It's not about 
                    fancy features or complex algorithms—it's about creating spaces where people can come together, support 
                    each other, and build something meaningful together.
                  </p>
                </div>

                <div>
                  <p>
                    Visit <Link href="https://skansnetwork.com" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-link-hover">Skans Network</Link> to learn more about the platform.
                  </p>
                </div>

              </div>

            </div>
          </div>
          
          {/* Right Column - Platform Screenshots */}
          <div className="w-full md:w-[400px] md:flex-shrink-0 pt-6 md:pt-12">
            <div className="space-y-6 w-full max-w-[400px] mx-auto md:max-w-none md:mx-0">
              
              <div className="space-y-3">
                <Image
                  src="/images/skansnetwork.png"
                  alt="Skans Network Platform Screenshot"
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              <div className="space-y-3">
                <Image
                  src="/images/skansnetwork_map.png"
                  alt="Skans Network Campus Map"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              <div className="space-y-3">
                <Image
                  src="/images/skansnetwerk_campus.png"
                  alt="Skans Network Campus Directory"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              <div className="space-y-3">
                <Image
                  src="/images/skansnetwork_stories.png"
                  alt="Skans Network Success Stories"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      {/* Progressive blur — fixed to viewport bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-24 z-10 pointer-events-none">
        <ProgressiveBlur height="100%" position="bottom" />
      </div>
    </div>
  );
}
