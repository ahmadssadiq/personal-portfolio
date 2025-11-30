import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
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
              <h1 className="text-xl font-medium text-foreground mb-6">Projects</h1>
              
              <div className="space-y-8">
                {/* CBS-TA Performance Analysis */}
                <div className="border-b border-border pb-6">
                    <h3 className="text-base font-medium text-foreground mb-2">CBS-TA Performance Analysis</h3>
                  <p className="text-sm text-foreground mb-4">
                    Co-authored a research study profiling Conflict-Based Search with Task Assignment (CBS-TA) on grid benchmarks. Measured runtime, memory, cache behaviour for up to 100 agents, identified quadratic conflict growth, and proposed heuristics, memory-layout and parallelization optimisations.
                  </p>
                  <Link 
                    href="/projects/cbs-ta" 
                    className="text-sm font-medium text-foreground underline hover:text-link-hover"
                  >
                    Learn More
                  </Link>
                </div>

                {/* DeveloperTok */}
                {/* <div className="border-b border-border pb-6">
                    <h3 className="text-base font-medium text-foreground mb-2">DeveloperTok</h3>
                  <p className="text-sm text-foreground mb-4">
                    A cutting-edge microlearning platform designed to revolutionize the way coding is taught and learned. Inspired by TikTok, DeveloperTok delivers bite-sized, one-minute coding lessons across various topics in a fun, interactive, and highly accessible format. Built with React, Node.js, and MongoDB.
                  </p>
                  <Link 
                    href="/projects/developertok" 
                    className="text-sm font-medium text-foreground underline hover:text-link-hover"
                  >
                    Learn More
                  </Link>
                </div> */}

                {/* QuizIt */}
                <div className="border-b border-border pb-6">
                    <h3 className="text-base font-medium text-foreground mb-2">QuizIt - Interactive Quiz Application</h3>
                  <p className="text-sm text-foreground mb-4">
                    Developed a Django-based web application enabling users to create, edit, and take quizzes dynamically. Implemented user authentication for secure access, a real-time quiz-taking experience, and automatic scoring. Built with Django, HTML, CSS, and JavaScript, the platform supports customizable quizzes with multiple-choice questions and performance tracking.
                  </p>
                  <Link 
                    href="/projects/quizit" 
                    className="text-sm font-medium text-foreground underline hover:text-link-hover"
                  >
                    Learn More
                  </Link>
                </div>

                {/* Boston Police Overtime Data Analysis */}
                <div className="border-b border-border pb-6">
                    <h3 className="text-base font-medium text-foreground mb-2">Boston Police Overtime Data Analysis</h3>
                  <p className="text-sm text-foreground mb-4">
                    Worked with American Civil Liberties Union (ACLU) and analyzed 8+ years of BPD overtime data using Python and pandas, uncovering a 260,000-hour annual discrepancy between worked and paid overtime hours. Visualized data with matplotlib/seaborn, showing a 75% overlap between overtime and misconduct.
                  </p>
                  <Link 
                    href="/projects/boston-police" 
                    className="text-sm font-medium text-foreground underline hover:text-link-hover"
                  >
                    Learn More
                  </Link>
                </div>

                {/* Note Taking Application */}
                <div className="border-b border-border pb-6">
                    <h3 className="text-base font-medium text-foreground mb-2">Note Taking Application</h3>
                  <p className="text-sm text-foreground mb-4">
                    Developed a React-based checklist application that enables users to dynamically create, track, and manage their tasks. The app uses the useState hook for real-time state management, features an animated progress bar to reflect task completion, and provides an intuitive interface for adding and editing checklist descriptions.
                  </p>
                  <Link 
                    href="/projects/note-taking" 
                    className="text-sm font-medium text-foreground underline hover:text-link-hover"
                  >
                    Learn More
                  </Link>
                </div>

                {/* Health And Weather Analyzer */}
                <div>
                    <h3 className="text-base font-medium text-foreground mb-2">Health And Weather Analyzer</h3>
                  <p className="text-sm text-foreground mb-4">
                    Developed a React and Node.js-based application that integrates real-time weather data with health conditions to provide personalized health recommendations. Utilizes Google authentication for secure user login. Features a responsive Tailwind CSS UI for seamless user experience.
                  </p>
                  <Link 
                    href="/projects/health-weather" 
                    className="text-sm font-medium text-foreground underline hover:text-link-hover"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Project Images */}
          <div className="w-full md:w-[300px] md:flex-shrink-0 pt-6 md:pt-12">
            <div className="space-y-6 w-full max-w-[300px] mx-auto md:max-w-none md:mx-0">
            <Image
                src="/images/suited.jpeg"
                alt="Ahmad Sadiq - Professional"
                width={300}
                height={400}
                className="object-cover rounded-lg w-full"
              />
              {/* <Image
                src="/images/CBS-TA.png"
                alt="CBS-TA Performance Analysis"
                width={300}
                height={200}
                className="object-cover rounded-lg w-full"
              />
              <Image
                src="/images/QuizIt.png"
                alt="QuizIt Interactive Quiz Platform"
                width={300}
                height={200}
                className="object-cover rounded-lg w-full"
              />
              <Image
                src="/images/developertok.png"
                alt="DeveloperTok Microlearning Platform"
                width={300}
                height={200}
                className="object-cover rounded-lg w-full"
              /> */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer spans full width */}
      <Footer />
    </div>
  );
}
