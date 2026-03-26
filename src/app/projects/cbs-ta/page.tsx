import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import Image from 'next/image';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

export default function CBS_TAPage() {
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
                  href="/projects" 
                  className="text-sm text-muted hover:text-link-hover mb-4 inline-block"
                >
                  ← Back to Projects
                </Link>
                <h1 className="text-xl font-medium text-foreground mb-2">Conflict-Based Search (CBS-TA) Performance Analysis 🤖</h1>
              </div>

              <div className="space-y-6 text-sm text-foreground leading-relaxed">
                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Overview</h2>
                  <p>
                    A research study profiling Conflict-Based Search with Task Assignment (CBS-TA) — an optimal multi-agent path-finding algorithm that simultaneously allocates tasks and plans collision-free routes. We benchmarked CBS-TA on 32×32 and 8×8 grids (up to 100 agents), measured runtime, memory, cache behaviour, and pinpointed scalability bottlenecks.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Key Contributions</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Empirically showed runtime grows exponentially & conflicts quadratically beyond 80 agents.</li>
                    <li>Captured processor-level stats with perf and Cachegrind – billions of instructions, L1 miss hotspots.</li>
                    <li>Proposed heuristics, memory-layout tweaks, and parallel low-level search to cut runtime & RAM.</li>
                    <li>Authored the full IEEE-style paper (10 pp) and automated data-collection scripts.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">In Depth</h2>
                  <p>
                    The analysis revealed a dramatic spike in search-tree size once agent count passes 50, with memory soaring from 50 MB to over 300 MB at 100 agents. Profiling on an 8×8 grid isolated cache-usage inefficiencies driving these costs. The paper outlines heuristic conflict prioritisation, bounded-suboptimal search, and parallelised low-level A* replanning as practical paths forward.
                  </p>
                  
                  <div className="mt-4">
                    <a 
                      href="/images/CBS-TA_Paper.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-foreground underline hover:text-link-hover"
                    >
                      Read Research Paper
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted">
                    The analysis revealed a dramatic spike in search-tree size once agent count passes 50, with memory soaring from 50 MB to over 300 MB at 100 agents. Profiling on an 8×8 grid isolated cache-usage inefficiencies driving these costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - CBS-TA Images */}
          <div className="w-full md:w-[300px] md:flex-shrink-0 pt-6 md:pt-12">
            <div className="space-y-6 w-full max-w-[300px] mx-auto md:max-w-none md:mx-0">
              <Image
                src="/images/CBSTA_Overview.png"
                alt="CBS-TA Algorithm Overview"
                width={300}
                height={200}
                className="object-cover rounded-lg w-full"
              />
              <Image
                src="/images/CBSTA_Runtime.png"
                alt="Runtime vs Agents Performance Chart"
                width={300}
                height={200}
                className="object-cover rounded-lg w-full"
              />
              <Image
                src="/images/CBSTA_Conflict.png"
                alt="Conflicts vs Agents Analysis"
                width={300}
                height={200}
                className="object-cover rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Progressive blur — fixed to viewport bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-24 z-10 pointer-events-none">
        <ProgressiveBlur height="100%" position="bottom" />
      </div>
      {/* Footer spans full width */}
      <Footer />
    </div>
  );
}
