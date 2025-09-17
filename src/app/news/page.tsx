import Navigation from '@/components/sections/navigation';

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container py-12">
        <div className="flex gap-[100px]">
          {/* Left Column - Navigation */}
          <div className="w-[200px] flex-shrink-0 pt-12">
            <Navigation />
          </div>

          {/* Right Column - News Content */}
          <div className="w-[500px] pt-12">
            <div className="flex flex-col space-y-6">
              <p className="text-base text-foreground leading-relaxed font-medium">News</p>
              <p className="text-base text-muted leading-relaxed">No updates yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}