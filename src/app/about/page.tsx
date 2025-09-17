import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main container follows exact layout margins and width */}
      <div className="container py-6 md:py-12">
        {/* Mobile: Stack vertically, Desktop: Horizontal layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-[60px] min-w-0">
          {/* Left Column - Navigation */}
          <div className="w-full md:w-[200px] md:flex-shrink-0 pt-6 md:pt-12">
            <Navigation />
          </div>
          
          {/* Middle Column - Main Content */}
          <div className="w-full md:w-[500px] pt-6 md:pt-12 min-w-0">
            <div className="space-y-8 break-words overflow-wrap-anywhere">

              {/* Experience Section */}
              <div>
                <h2 className="text-xl font-medium text-foreground mb-6">Experience</h2>
                <div className="space-y-8">
                  {/* IWM */}
                  <div className="border-b border-border pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-foreground">IWM, NY USA</h3>
                      <span className="text-sm text-muted">Jun 2025 - Present</span>
                    </div>
                    <p className="text-sm text-muted mb-3">Founding Engineer</p>
                    <div className="space-y-1">
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Built a complete React Native application with TypeScript, Node.js/Express backend and PostgreSQL database.</div>
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Developed sophisticated waitlist ranking system inspired by Monzo's approach with logarithmic scaling.</div>
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Created streamlined 5-step onboarding flow reducing registration time to under 5 minutes.</div>
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Integrated AppsFlyer SDK for professional attribution tracking and deep linking capabilities.</div>
                    </div>
                    <a 
                      href="/experience/iwm" 
                      className="inline-block mt-3 text-sm font-medium text-foreground underline hover:text-link-hover"
                    >
                      Learn More
                    </a>
                  </div>

                  {/* ACTEX Learning */}
                  <div className="border-b border-border pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-foreground">ACTEX Learning, MA USA</h3>
                      <span className="text-sm text-muted">May 2025 – Jun 2025</span>
                    </div>
                    <p className="text-sm text-muted mb-3">Quality Assurance Engineer</p>
                    <div className="space-y-1">
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Ran cross-platform smoke & regression tests on macOS, iOS, and web builds of the Eureka! e-reader.</div>
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Logged defects with repro steps, screenshots, and severity tags in Asana; collaborated with devs to triage issues.</div>
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Drafted a "Getting Started" README and reusable test-case templates to onboard future testers.</div>
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Expanded the suite with edge-case scenarios (offline mode, update-over-install, accessibility compliance).</div>
                    </div>
                  </div>

                  {/* DuneAI */}
                  <div className="border-b border-border pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-foreground">DuneAI</h3>
                      <span className="text-sm text-muted">Jun 2024 - Aug 2024</span>
                    </div>
                    <p className="text-sm text-muted mb-3">Robotics Software Engineer</p>
                    <div className="space-y-1">
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Designed and implemented multi-agent pathfinding algorithms leveraging C++ and OpenGL.</div>
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Optimized robot sorting operations on a simulated grid.</div>
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Constructed a Python barcode scanner to automate task assignment.</div>
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Developed unit tests with Google Test for code reliability.</div>
                    </div>
                    <a 
                      href="/experience/duneai" 
                      className="inline-block mt-3 text-sm font-medium text-foreground underline hover:text-link-hover"
                    >
                      Learn More
                    </a>
                  </div>

                  {/* AheadCare */}
                  <div className="border-b border-border pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-foreground">AheadCare</h3>
                      <span className="text-sm text-muted">Jun 2023 - Mar 2024</span>
                    </div>
                    <p className="text-sm text-muted mb-3">CEO</p>
                    <div className="space-y-1">
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Developed an ML Predictive FAQ system using LangChain.</div>
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Streamlined customer database updates with adaptive learning algorithms.</div>
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Improved real-time response accuracy by 30%.</div>
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Collaborated with investors to secure $25,000 in funding.</div>
                    </div>
                  </div>

                  {/* Starlink */}
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-foreground">Starlink</h3>
                      <span className="text-sm text-muted">Jun 2022 - Aug 2022</span>
                    </div>
                    <p className="text-sm text-muted mb-3">Full Stack Developer</p>
                    <div className="space-y-1">
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Executed a responsive e-commerce platform using React and Python/Django.</div>
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Increased user engagement and sales by 20%.</div>
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Optimized database queries and achieved real-time data synchronization.</div>
                      <div className="text-foreground" style={{fontSize: '14px', lineHeight: '1.4'}}>• Reduced load times by 30%.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Personal Images */}
          <div className="w-full md:w-[300px] md:flex-shrink-0 pt-6 md:pt-12">
            <div className="space-y-6 w-full max-w-[300px] mx-auto md:max-w-none md:mx-0">
              <Image
                src="/images/family.jpeg"
                alt="Ahmad Sadiq - Family"
                width={300}
                height={300}
                className="object-cover rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer spans full width */}
      <Footer />
    </div>
  );
}
