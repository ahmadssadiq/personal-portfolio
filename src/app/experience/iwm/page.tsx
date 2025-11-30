import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import Image from 'next/image';

export default function IWMPage() {
  return (
    <div className="min-h-screen bg-background">
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
                  href="/about" 
                  className="text-sm text-muted hover:text-link-hover mb-4 inline-block"
                >
                  ← Back to Experience
                </Link>
                <h1 className="text-xl font-medium text-foreground mb-2">IWM Waitlist: Building a Production-Ready Fintech Application</h1>
                <p className="text-sm text-muted">How I developed a full-stack mobile banking platform with sophisticated referral algorithms, seamless user experience, and production-ready infrastructure targeting millennial parents.</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-muted">
                  <span>Ahmad Sadiq</span>
                  <span>·</span>
                  <span>8 min read</span>
                  <span>·</span>
                  <span>Full-Stack Development</span>
                </div>
              </div>

              <div className="space-y-6 text-sm text-foreground leading-relaxed">
                

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">The Challenge</h2>
                  <p>
                    Building a fintech application from scratch presents unique challenges: creating trust with users, implementing secure financial systems, and designing an experience that converts skeptical parents into engaged early adopters. When I took on the IWM waitlist project, I wasn't just building an app—I was crafting the foundation for a new kind of kids' banking platform.
                  </p>
                  <p>
                    The vision was ambitious: create a seamless waitlist experience where users could join, refer friends, and track their position in real-time, all while building anticipation for a product that would revolutionize how millennial parents approach their children's financial education.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">📸 Onboarding Flow: From Sign-Up to Waitlist</h2>
                  <p className="text-sm text-muted mb-4">The streamlined 6-step onboarding process designed to reduce friction and maximize completion rates.</p>
                  
                  <p className="text-sm text-muted">
                    The streamlined 6-step onboarding process includes: Welcome Screen, Account Setup, Personal Information, Verification, Preferences, and Waitlist Confirmation. Each step is designed to reduce friction and maximize completion rates.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Architecture & Technology Decisions</h2>
                  <p>
                    Choosing the right technology stack was crucial for a fintech application. I opted for React Native with Expo to enable rapid development while maintaining native performance. The backend leverages Node.js/Express with PostgreSQL and Prisma ORM for robust data management.
                  </p>
                  
                  <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Key Technical Decisions</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>React Native + Expo: Cross-platform development with TypeScript for type safety</li>
                    <li>Firebase Authentication: Secure, scalable auth with upgrade paths</li>
                    <li>PostgreSQL + Prisma: Robust database with efficient ORM</li>
                    <li>AppsFlyer Integration: Professional attribution tracking</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">The Ranking Algorithm: Inspired by Monzo</h2>
                  <p>
                    One of the most challenging aspects was developing a fair yet engaging ranking system. Taking inspiration from Monzo's successful waitlist approach, I implemented a sophisticated algorithm that balances referral rewards with join-time fairness.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded mt-4">
                    <p className="text-sm text-muted mb-2">📊 Ranking Algorithm Visualization</p>
                    <p className="text-sm">How users move up the waitlist</p>
                  </div>
                  
                  <p className="mt-4">
                    The algorithm prevents runaway leaders while incentivizing sharing, using logarithmic scaling and tier-based movement. This approach ensures that early adopters maintain their advantage while new users have meaningful opportunities to improve their position through referrals.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">User Experience: From 17 Minutes to Under 5</h2>
                  <p>
                    Industry research shows that typical financial app onboarding takes 17 minutes on average. This was unacceptable for our target demographic of busy millennial parents. Through careful UX research and iterative design, I reduced our onboarding flow to under 5 minutes.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded mt-4">
                    <p className="text-sm text-muted mb-2">🎨 UI Design Screens</p>
                    <p className="text-sm">Dark theme interface</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded mt-2">
                    <p className="text-sm text-muted mb-2">📱 Social Sharing Features</p>
                    <p className="text-sm">WhatsApp, Instagram, TikTok integration</p>
                  </div>
                  
                  <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Frictionless Design Principles</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Progressive disclosure of information</li>
                    <li>Smart defaults and pre-filled forms</li>
                    <li>Visual progress indicators with smooth animations</li>
                    <li>Platform-specific social sharing optimizations</li>
                    <li>Intuitive navigation with clear next steps</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Building for Scale</h2>
                  <p>
                    From day one, I designed the application with scalability in mind. The database schema supports efficient rank calculations for thousands of users, while maintaining sub-2-second load times. Comprehensive error handling and input validation ensure reliability at scale.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded mt-4">
                    <p className="text-sm text-muted mb-2">🏗️ Technical Architecture Diagram</p>
                    <p className="text-sm">System overview and data flow</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Results & Impact</h2>
                  <p>
                    The application successfully achieves target KPIs including &gt;40% registration completion rates, matching Monzo's benchmark for fintech onboarding. The viral coefficient exceeds 1.2 users per referral, indicating strong organic growth potential.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center p-4 border border-border rounded">
                      <div className="text-2xl font-bold text-foreground">40%+</div>
                      <div className="text-sm text-muted">REGISTRATION COMPLETION RATE</div>
                    </div>
                    <div className="text-center p-4 border border-border rounded">
                      <div className="text-2xl font-bold text-foreground">1.2x</div>
                      <div className="text-sm text-muted">VIRAL COEFFICIENT</div>
                    </div>
                    <div className="text-center p-4 border border-border rounded">
                      <div className="text-2xl font-bold text-foreground">&lt;2s</div>
                      <div className="text-sm text-muted">AVERAGE LOAD TIME</div>
                    </div>
                    <div className="text-center p-4 border border-border rounded">
                      <div className="text-2xl font-bold text-foreground">5min</div>
                      <div className="text-sm text-muted">ONBOARDING TIME</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Technical Deep Dive</h2>
                  <p>
                    The application demonstrates modern mobile development practices with a focus on user experience, technical excellence, and business impact. Key technical achievements include:
                  </p>
                  
                  <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Frontend Excellence</h3>
                  <p className="text-sm">React Native with TypeScript, responsive design, smooth animations, and accessibility features</p>
                  
                  <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Backend Reliability</h3>
                  <p className="text-sm">Node.js/Express with PostgreSQL, comprehensive error handling, and security measures</p>
                  
                  <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Analytics & Attribution</h3>
                  <p className="text-sm">AppsFlyer integration for professional tracking, conversion analytics, and deep linking</p>
                  
                  <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Production Ready</h3>
                  <p className="text-sm">Scalable infrastructure, documentation, testing strategies, and deployment readiness</p>
                </div>

                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-muted mb-2">📱 Final App Showcase</p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Lessons Learned</h2>
                  <p>
                    This project challenged me to think holistically about user experience, technical scalability, and business metrics in the competitive fintech space. Working on a complete product from concept to production-ready code gave me invaluable experience in mobile development, backend architecture, and user psychology—particularly around referral incentives and onboarding optimization.
                  </p>
                  <p>
                    The intersection of technology and finance requires careful attention to security, user trust, and regulatory considerations. Building for millennial parents added another layer of complexity, as the user experience needed to be both sophisticated enough for tech-savvy users and simple enough for busy parents.
                  </p>
                  <p>
                    The IWM waitlist application represents more than just a technical achievement—it's a foundation for reimagining how families approach financial education and children's banking in the digital age.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - IWM Onboarding Images */}
          <div className="w-full md:w-[300px] md:flex-shrink-0 pt-6 md:pt-12">
            <div className="space-y-4 w-full max-w-[300px] mx-auto md:max-w-none md:mx-0">
              <video
                src="/images/FinalAppShowcase.mp4"
                controls
                className="w-full rounded-lg"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
              <h3 className="text-sm font-medium text-foreground mb-3">Onboarding Flow</h3>
              <div className="space-y-3">
                <Image
                  src="/images/onboarding1.PNG"
                  alt="Onboarding Step 1 - Welcome Screen"
                  width={300}
                  height={200}
                  className="object-cover rounded-lg w-full"
                />
                <Image
                  src="/images/onboarding2.PNG"
                  alt="Onboarding Step 2 - Account Setup"
                  width={300}
                  height={200}
                  className="object-cover rounded-lg w-full"
                />
                <Image
                  src="/images/onboarding3.PNG"
                  alt="Onboarding Step 3 - Personal Information"
                  width={300}
                  height={200}
                  className="object-cover rounded-lg w-full"
                />
                <Image
                  src="/images/onboarding4.PNG"
                  alt="Onboarding Step 4 - Verification"
                  width={300}
                  height={200}
                  className="object-cover rounded-lg w-full"
                />
                <Image
                  src="/images/onboarding5.PNG"
                  alt="Onboarding Step 5 - Preferences"
                  width={300}
                  height={200}
                  className="object-cover rounded-lg w-full"
                />
                <Image
                  src="/images/onboarding6.PNG"
                  alt="Onboarding Step 6 - Waitlist Confirmation"
                  width={300}
                  height={200}
                  className="object-cover rounded-lg w-full"
                />
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
