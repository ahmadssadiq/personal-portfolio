import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import Image from 'next/image';

export default function DuneAIPage() {
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
                  href="/about" 
                  className="text-sm text-muted hover:text-link-hover mb-4 inline-block"
                >
                  ← Back to Experience
                </Link>
                <h1 className="text-xl font-medium text-foreground mb-2">DuneAI - Robotics Software Engineer 🤖</h1>
              </div>

              <div className="space-y-6 text-sm text-foreground leading-relaxed">
                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Overview</h2>
                  <p>
                    During my internship at DuneAI—a fast-paced startup—I played a key role in developing and implementing multi-agent pathfinding algorithms. The project involved creating sophisticated task allocation and conflict-based search algorithms to optimize robot operations on a simulated grid.
                  </p>
                  <p>
                    The vision for the product was to integrate multiple agents on a grid where they are assigned to collect packages after being scanned by a barcode. Once scanned, the robots queue to pick up the incoming package and then proceed to their designated drop-off point on the grid. Depending on the grid size, our algorithm efficiently managed operations for up to 100 robots, with a minimum of 20 robots active in the environment.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Key Contributions</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Designed and implemented multi-agent pathfinding algorithms using C++ and OpenGL.</li>
                    <li>Developed sophisticated task allocation and conflict-based search methods to prevent robot collisions and optimize delivery routes.</li>
                    <li>Integrated a Python-based barcode scanner that automated task assignments, streamlining the overall workflow.</li>
                    <li>Enabled robots to autonomously detect low charging levels and navigate to charging stations, and wait in queue when no task was assigned.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Impact</h2>
                  <p>
                    Working in a startup environment, I embraced multiple roles and took initiative in leadership and technical problem solving. This project challenged me technically and honed my collaborative skills, marking it as one of the most rewarding experiences of my career.
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted">
                    The simulation environment where multi-agent pathfinding algorithms were implemented. Robots were designed to efficiently collect and deliver packages, avoiding collisions and optimizing routes.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - DuneAI Images and Video */}
          <div className="w-full md:w-[300px] md:flex-shrink-0 pt-6 md:pt-12">
            <div className="space-y-6 w-full max-w-[300px] mx-auto md:max-w-none md:mx-0">
              <video
                src="/images/MAPF.mp4"
                controls
                className="w-full h-[200px] object-cover rounded-lg"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
              <Image
                src="/images/duneai_robot.png"
                alt="DuneAI Multi-Agent Pathfinding Simulation"
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
