import Navigation from '@/components/sections/navigation';
import MainContent from '@/components/sections/main-content';
import CredentialsSection from '@/components/sections/credentials';
import Footer from '@/components/sections/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main container follows exact layout margins and width */}
      <div className="container py-12">
        <div className="flex gap-[100px]">
          {/* Left Column - Navigation */}
          <div className="w-[200px] flex-shrink-0 pt-12">
            <Navigation />
          </div>
          
          {/* Right Column - Main Content */}
          <div className="w-[500px] pt-12">
            <MainContent />
            <CredentialsSection />
          </div>
        </div>
      </div>
      
      {/* Footer spans full width */}
      <Footer />
    </div>
  );
}