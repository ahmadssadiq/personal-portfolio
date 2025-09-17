import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import Image from 'next/image';

export default function NewsPage() {
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
              <h1 className="text-xl font-medium text-foreground mb-6">Blog Posts</h1>
              
              <div className="space-y-6">
                {/* Blog Post */}
                <div className="pb-6">
                  <h2 className="text-base font-medium text-foreground mb-2">From Qatar to Boston: A Software Engineer's Journey</h2>
                  <p className="text-sm text-muted mb-3">December 28, 2024</p>
                  <p className="text-sm text-foreground leading-relaxed mb-4">
                    Reflecting on the cultural and professional journey from growing up in Qatar to pursuing computer science at Boston University. Exploring how diverse experiences shape technical perspectives.
                  </p>
                  <Link 
                    href="/news/qatar-to-boston-journey" 
                    className="text-sm font-medium text-foreground underline hover:text-link-hover"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Personal Images */}
          <div className="w-full md:w-[300px] md:flex-shrink-0 pt-6 md:pt-12">
            <div className="space-y-6 w-full max-w-[300px] mx-auto md:max-w-none md:mx-0">
              <Image
                src="/images/wedding.jpeg"
                alt="Ahmad Sadiq - Wedding"
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