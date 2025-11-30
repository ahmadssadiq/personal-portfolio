import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import Image from 'next/image';

export default function NoteTakingPage() {
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
                <h1 className="text-xl font-medium text-foreground mb-2">Note Taking Application 📝</h1>
              </div>

              <div className="space-y-6 text-sm text-foreground leading-relaxed">
                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Overview</h2>
                  <p>
                    The Checklist Application is a React-based productivity tool that allows users to dynamically create, track, and manage their tasks. It features a progress bar, dynamic item addition, and the ability to add descriptions to checklist items, providing an intuitive task management experience.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Key Features</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Dynamic item creation using useState</li>
                    <li>Task completion tracking with an animated progress bar</li>
                    <li>Ability to add and edit descriptions for each checklist item</li>
                    <li>Styled-components for a Modern UI</li>
                    <li>Animation effects with react-transition-group for smoother user experience</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">In Depth</h2>
                  <p>
                    This project demonstrates best practices in React development, incorporating modular component design by breaking down the application into reusable parts such as the checklist creation form, progress bar, and individual checklist items. Efficient state management is achieved using the useState hook, allowing real-time updates when users add, remove, or mark checklist items as complete. The progress bar dynamically reflects completion percentage using React state, enhancing user experience. Additionally, react-transition-group is used to animate checklist items, providing smooth transitions when items are added or removed. Styled-components are leveraged to maintain a clean and modern UI, while conditional rendering allows users to toggle the description input field for each checklist item, improving organization. These principles together create a seamless and responsive user experience, showcasing effective UI interaction and state-driven updates in React.
                  </p>
                </div>

                <div className="mt-4">
                  <a 
                    href="#" 
                    className="text-sm font-medium text-foreground underline hover:text-link-hover"
                  >
                    View on GitHub
                  </a>
                </div>

                <div>
                  <p className="text-sm text-muted">
                    This project demonstrates best practices in React development, incorporating modular component design by breaking down the application into reusable parts such as the checklist creation form, progress bar, and individual checklist items. Efficient state management is achieved using the useState hook, allowing real-time updates when users add, remove, or mark checklist items as complete.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Note Taking App Images */}
          <div className="w-full md:w-[300px] md:flex-shrink-0 pt-6 md:pt-12">
            <div className="space-y-6 w-full max-w-[300px] mx-auto md:max-w-none md:mx-0">
              <Image
                src="/images/NoteTakingApplication1.png"
                alt="Note Taking Application - Dynamic Item Addition"
                width={300}
                height={200}
                className="object-cover rounded-lg w-full"
              />
              <Image
                src="/images/NoteTakingApplication2.png"
                alt="Note Taking Application - Description Management"
                width={300}
                height={200}
                className="object-cover rounded-lg w-full"
              />
              <Image
                src="/images/NoteTakingApplication3.png"
                alt="Note Taking Application - Progress Tracking"
                width={300}
                height={200}
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
