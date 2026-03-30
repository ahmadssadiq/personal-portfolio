import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import Image from 'next/image';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

export default function QuizItPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
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
                <h1 className="text-xl font-medium text-foreground mb-2">QuizIt - Interactive Quiz Platform 🧠</h1>
              </div>

              <div className="space-y-6 text-sm text-foreground leading-relaxed">
                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Overview</h2>
                  <p>
                    QuizIt is a dynamic quiz creation and participation platform that allows users to create, edit, and take quizzes on various topics. This web application enables seamless user authentication, real-time quiz interactions, and score tracking. The goal is to provide an engaging learning experience, whether for casual users or educators who want to create structured quizzes.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Key Features</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>User authentication system allowing sign-up and login.</li>
                    <li>Ability to create custom quizzes with multiple-choice questions.</li>
                    <li>Dynamic quiz-taking experience with real-time answer validation.</li>
                    <li>Scoring and performance tracking for completed quizzes.</li>
                    <li>Quiz management features including editing and deleting quizzes.</li>
                    <li>Filter quizzes by difficulty and category.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">In Depth</h2>
                  <p>
                    Users can build quizzes by defining questions and multiple answer choices. The app provides an intuitive form interface to dynamically add new questions and answers. Users can take quizzes interactively, selecting answers and receiving feedback. Scores are recorded, and users can review their past performance. The backend is built with Django and Python handling user authentication, database management, and quiz logic, while the frontend uses HTML, CSS, and JavaScript for a responsive experience.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-muted mb-2">Project Demo</p>
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
                    Users can build quizzes by defining questions and multiple answer choices. The app provides an intuitive form interface to dynamically add new questions and answers. Users can take quizzes interactively, selecting answers and receiving feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - QuizIt Images */}
          <div className="w-full md:w-[300px] md:flex-shrink-0 pt-6 md:pt-12">
            <div className="space-y-6 w-full max-w-[300px] mx-auto md:max-w-none md:mx-0">
              <Image
                src="/images/QuizItSignUp.png"
                alt="QuizIt Sign-Up Page"
                width={300}
                height={200}
                className="object-cover rounded-lg w-full"
              />
              <Image
                src="/images/QuizItResult.png"
                alt="QuizIt Quiz Results Page"
                width={300}
                height={200}
                className="object-cover rounded-lg w-full"
              />
              <Image
                src="/images/QuizItCreate.png"
                alt="QuizIt Quiz Creation Page"
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
