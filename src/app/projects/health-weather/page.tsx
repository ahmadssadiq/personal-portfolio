import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import Image from 'next/image';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

export default function HealthWeatherPage() {
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
                <h1 className="text-xl font-medium text-foreground mb-2">Health and Weather Analyzer 🌦️</h1>
              </div>

              <div className="space-y-6 text-sm text-foreground leading-relaxed">
                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Overview</h2>
                  <p>
                    The Health and Weather Analyzer is a React and Node.js-based application designed to correlate real-time weather data with health conditions. By integrating live weather APIs such as OpenWeatherMap and public health data sources, the application provides users with personalized health recommendations. It is particularly useful for individuals with conditions like asthma, cardiovascular diseases, and allergies, offering real-time alerts and precautions based on environmental factors.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Key Features</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Real-time Weather Analysis: Retrieves and displays live weather data, including temperature, humidity, and conditions.</li>
                    <li>Personalized Health Recommendations: Generates tailored advice based on the user's health profile and weather conditions.</li>
                    <li>Third-Party Authentication: Enables secure login using Google authentication to personalize user preferences.</li>
                    <li>Health Condition Lookup: Allows users to search for health conditions via public APIs and receive relevant insights.</li>
                    <li>Weather Alerts System: Fetches official alerts for hazardous weather conditions that may impact health.</li>
                    <li>Responsive UI: Developed with React and Tailwind CSS for a seamless experience across devices.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">In Depth</h2>
                  <p>
                    The Health and Weather Analyzer leverages React for a dynamic and interactive user interface, using hooks such as useState and useEffect to manage real-time updates. The frontend integrates React Router for smooth navigation between components, while the styling is handled using Tailwind CSS for a clean and responsive design.
                  </p>
                  <p>
                    On the backend, the application is powered by Node.js, efficiently handling API requests and user authentication. It employs Axios for fetching real-time weather data from OpenWeatherMap and retrieving health-related insights from public APIs. Additionally, Google Authentication ensures a secure and personalized experience by allowing users to save and access their health preferences.
                  </p>
                  <p>
                    By correlating health data with weather patterns, the system provides users with proactive recommendations, ensuring they can make informed decisions based on environmental conditions.
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

                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-muted mb-2">Project Demo</p>
                </div>

                <div>
                  <p className="text-sm text-muted">
                    The Health and Weather Analyzer leverages React for a dynamic and interactive user interface, using hooks such as useState and useEffect to manage real-time updates. The frontend integrates React Router for smooth navigation between components, while the styling is handled using Tailwind CSS for a clean and responsive design.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Health Weather Images and Video */}
          <div className="w-full md:w-[300px] md:flex-shrink-0 pt-6 md:pt-12">
            <div className="space-y-6 w-full max-w-[300px] mx-auto md:max-w-none md:mx-0">
              <video
                src="/images/final_submission_411.mp4"
                controls
                className="w-full rounded-lg"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
              <Image
                src="/images/healthandweather.png"
                alt="Health and Weather Analyzer Dashboard"
                width={300}
                height={200}
                className="object-cover rounded-lg w-full"
              />
              <Image
                src="/images/hw1.png"
                alt="Health and Weather App Interface"
                width={300}
                height={200}
                className="object-cover rounded-lg w-full"
              />
              <Image
                src="/images/hw2.png"
                alt="Health and Weather App Features"
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
