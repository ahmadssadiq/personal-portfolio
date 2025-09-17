import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import Image from 'next/image';

export default function BostonPolicePage() {
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
                  href="/projects" 
                  className="text-sm text-muted hover:text-link-hover mb-4 inline-block"
                >
                  ← Back to Projects
                </Link>
                <h1 className="text-xl font-medium text-foreground mb-2">Boston Police Overtime Data Analysis 📊</h1>
              </div>

              <div className="space-y-6 text-sm text-foreground leading-relaxed">
                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Overview</h2>
                  <p>
                    This project analyzes the Boston Police Department's budget and overtime usage over the past decade to identify inefficiencies and trends. By conducting this analysis, we sought to determine if police spending aligns with community safety needs. We Worked with American Civil Liberties Union (ACLU) to conduct this research which they used and presented in their lawsuit.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Key Findings</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>The number of field reports often exceeded actual reported crimes, indicating that police presence did not impact crime rates.</li>
                    <li>There was no significant correlation between crime rates and police overtime hours or the BPD's operating budget.</li>
                    <li>BPD funding has increased consistently since 2014, primarily allocated to personnel services, including overtime pay.</li>
                    <li>Officers with frequent overtime usage were often among the highest-paid and those with internal complaints or misconduct records.</li>
                    <li>Discrepancies were found in overtime hours worked versus paid, with instances where officers were compensated for significantly more hours than recorded work.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">In Depth</h2>
                  <p>
                    The project utilized multiple datasets, including earnings, crime incidents, field activity, and budget records from the City of Boston. Using Python utilizing libraries including Pandas, Matplotlib, and Sklearn, we processed and analyzed these datasets to uncover spending inefficiencies. Regression models indicated that crime rates were not a predictor of overtime hours or police budget allocations. Further analysis of specific officers revealed that some of the most frequent overtime users were also officers with past complaints and high salaries.
                  </p>
                </div>

                <div className="flex gap-4 mt-4">
                  <a 
                    href="#" 
                    className="text-sm font-medium text-foreground underline hover:text-link-hover"
                  >
                    View on GitHub
                  </a>
                  <a 
                    href="/images/Police Overtime F - Final Report-2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-foreground underline hover:text-link-hover"
                  >
                    Read Full Report
                  </a>
                </div>

                <div>
                  <p className="text-sm text-muted">
                    The project utilized multiple datasets, including earnings, crime incidents, field activity, and budget records from the City of Boston. Using Python utilizing libraries including Pandas, Matplotlib, and Sklearn, we processed and analyzed these datasets to uncover spending inefficiencies.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Boston Police Images */}
          <div className="w-full md:w-[300px] md:flex-shrink-0 pt-6 md:pt-12">
            <div className="space-y-6 w-full max-w-[300px] mx-auto md:max-w-none md:mx-0">
              <Image
                src="/images/BostonPoliceOvertime1.png"
                alt="Boston Police Overtime Data Visualization"
                width={300}
                height={200}
                className="object-cover rounded-lg w-full"
              />
              <Image
                src="/images/BostonPoliceOvertime2.png"
                alt="Alternate view of overtime data analysis"
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
