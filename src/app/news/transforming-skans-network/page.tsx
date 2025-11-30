import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Image from 'next/image';
import Link from 'next/link';

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
                <p className="text-sm text-muted">How I turned rejection into opportunity by building Skans Network - a modern digital platform that transforms traditional business networking into an efficient, scalable solution.</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-muted">
                  <Link 
                    href="https://skansnetwork.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src="/images/skans_logo_wite.png"
                      alt="Skans Network Logo"
                      width={16}
                      height={16}
                      className="rounded-sm"
                    />
                    <span>Skans Network</span>
                  </Link>
                  <span>·</span>
                  <span>6 min read</span>
                  <span>·</span>
                  <span>Entrepreneurship</span>
                </div>
              </div>

              <div className="space-y-6 text-sm text-foreground leading-relaxed">
                
                <div>
                  <p>
                    After being ghosted in the final round of multiple job applications, I found myself at a crossroads. 
                    Instead of dwelling on rejection, I channeled that energy into something meaningful - transforming my 
                    father's traditional business network into a modern digital platform.
                  </p>
                  <p>
                    What started as a personal project to help my family business has evolved into <span className="bg-gradient-to-r from-[#606c38] to-[#fefae0] bg-clip-text text-transparent">Skans Network</span> - 
                    a comprehensive platform that bridges the gap between traditional business practices and modern technology.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">The Challenge</h2>
                  <p>
                    My father's business network was built on decades of personal relationships and traditional methods. 
                    While effective, it lacked the scalability and efficiency that modern businesses require. The network 
                    was fragmented across multiple platforms, making it difficult to maintain connections and track opportunities.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <p className="text-sm text-muted italic">
                      "We had all these valuable connections, but no way to leverage them effectively in today's digital landscape."
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Building the Solution</h2>
                  <p>
                    I approached this challenge with a software engineer's mindset, focusing on creating a platform that 
                    would preserve the personal touch of traditional networking while adding the efficiency of modern technology.
                  </p>
                  
                  <div className="space-y-3 mt-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>
                        <strong>Unified Dashboard:</strong> Centralized view of all network connections and opportunities
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>
                        <strong>Smart Matching:</strong> AI-powered recommendations for potential business partnerships
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>
                        <strong>Relationship Tracking:</strong> Maintain context and history of all business relationships
                      </p>
                    </div>
                  </div>
                </div>


                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">The Impact</h2>
                  <p>
                    The transformation has been remarkable. What started as a solution for my father's business has 
                    grown into a platform that serves multiple businesses in our network.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">300%</div>
                      <div className="text-sm text-blue-800">Increase in network efficiency</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">50+</div>
                      <div className="text-sm text-green-800">Active business connections</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Lessons Learned</h2>
                  <p>
                    This experience taught me that sometimes the best opportunities come from unexpected places. 
                    Instead of waiting for the perfect job, I created my own opportunity by solving a real problem 
                    for people I care about.
                  </p>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Key Takeaway:</strong> Rejection can be a catalyst for innovation. When one door closes, 
                      sometimes you need to build your own door.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Experience Skans Network</h2>
                  <p>
                    Ready to transform your business network? Visit <Link href="https://skansnetwork.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Skans Network</Link> to see how we're 
                    revolutionizing traditional business networking.
                  </p>
                  
                  <div className="flex gap-4 mt-4">
                    <Link 
                      href="https://skansnetwork.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Image
                        src="/images/skans_logo_wite.png"
                        alt="Skans Network Logo"
                        width={16}
                        height={16}
                        className="rounded-sm"
                      />
                      Visit Skans Network
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>
          
          {/* Right Column - Platform Screenshots */}
          <div className="w-full md:w-[400px] md:flex-shrink-0 pt-6 md:pt-12">
            <div className="space-y-6 w-full max-w-[400px] mx-auto md:max-w-none md:mx-0">
              
              
              {/* Skans Network Screenshots */}
              <div className="space-y-4">
                <h3 className="text-md font-medium text-foreground">Platform Overview</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/skansnetwork.png"
                    alt="Skans Network Platform Screenshot"
                    width={400}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="text-xs text-muted text-center">
                  Comprehensive education network with interactive campus finder
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-md font-medium text-foreground">Interactive Campus Map</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/skansnetwork_map.png"
                    alt="Skans Network Campus Map"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="text-xs text-muted text-center">
                  Real-time campus locations with filtering capabilities
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-md font-medium text-foreground">Campus Directory</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/skansnetwerk_campus.png"
                    alt="Skans Network Campus Directory"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="text-xs text-muted text-center">
                  Detailed campus information and education levels
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-md font-medium text-foreground">Success Stories</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/skansnetwork_stories.png"
                    alt="Skans Network Success Stories"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="text-xs text-muted text-center">
                  Student testimonials and success stories
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
