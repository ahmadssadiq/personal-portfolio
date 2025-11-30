import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Image from 'next/image';
import Link from 'next/link';

export default function GuessOnePrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-[60px] min-w-0">
          {/* Left Column - Navigation */}
          <div className="w-full md:w-[200px] md:flex-shrink-0 pt-6 md:pt-12">
            <Navigation />
          </div>
          
          {/* Middle Column - Main Content */}
          <div className="w-full md:w-[500px] pt-6 md:pt-12 min-w-0">
            <div className="space-y-8 break-words overflow-wrap-anywhere">
              
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/images/whos-that-logo.png"
                    alt="Guess One Logo"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <h1 className="text-xl font-medium text-foreground">Privacy Policy</h1>
                </div>
                <p className="text-sm text-muted">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>

              <div className="space-y-6 text-sm text-foreground leading-relaxed">
                
                <div>
                  <p>
                    At Guess One, we are committed to protecting your privacy and ensuring transparency about how we collect, use, and safeguard your information. This Privacy Policy explains our practices regarding data collection, usage, storage, and your rights as a user.
                  </p>
                </div>

                <div id="data-collection">
                  <h2 className="text-base font-medium text-foreground mb-3">1. Data Collection</h2>
                  <p className="mb-3">
                    We collect the following types of information to provide and improve our services:
                  </p>
                  <div className="space-y-2 ml-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p><strong>Email Address:</strong> Used for account authentication and communication</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p><strong>Display Name:</strong> Your chosen username visible to other users</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p><strong>Photos:</strong> Images you upload for gameplay purposes</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p><strong>Gameplay Data:</strong> Scores, game history, and interaction data</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p><strong>Push Tokens:</strong> Device identifiers for push notification delivery</p>
                    </div>
                  </div>
                </div>

                <div id="data-usage">
                  <h2 className="text-base font-medium text-foreground mb-3">2. How Data is Used</h2>
                  <p className="mb-3">
                    Your data is used for the following purposes:
                  </p>
                  <div className="space-y-2 ml-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p><strong>Authentication:</strong> To verify your identity and secure your account</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p><strong>Gameplay:</strong> To enable game features, track progress, and personalize your experience</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p><strong>Push Notifications:</strong> To send you game updates, challenges, and important announcements</p>
                    </div>
                  </div>
                </div>

                <div id="data-storage">
                  <h2 className="text-base font-medium text-foreground mb-3">3. Data Storage</h2>
                  <p className="mb-3">
                    Your data is securely stored using Firebase services:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <p><strong>Firestore:</strong> Database for storing user profiles, gameplay data, and app information</p>
                      <p><strong>Firebase Storage:</strong> Secure cloud storage for photos and media files</p>
                      <p><strong>Firebase Auth:</strong> Authentication service for secure login and account management</p>
                    </div>
                    <p className="mt-3 text-xs text-muted">
                      All data is encrypted in transit and at rest, following industry-standard security practices.
                    </p>
                  </div>
                </div>

                <div id="user-rights">
                  <h2 className="text-base font-medium text-foreground mb-3">4. User Rights</h2>
                  <p className="mb-3">
                    You have the following rights regarding your data:
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <p className="font-medium mb-1">Account Deletion</p>
                      <p className="text-muted text-xs">
                        You can request deletion of your account and all associated data at any time. To delete your account, please contact us at privacy@whosthat.app.
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <p className="font-medium mb-1">Data Export</p>
                      <p className="text-muted text-xs">
                        You can request a copy of all data we have collected about you. We will provide this in a machine-readable format within 30 days of your request.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-3">5. Third Parties</h2>
                  <p className="mb-3">
                    We use the following third-party service providers:
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="mb-2">
                      <strong>Firebase (Google):</strong> Our primary service provider for authentication, database, and storage services. Firebase operates under Google's privacy policy and security standards.
                    </p>
                    <p className="text-xs text-muted">
                      We do not sell your personal information to third parties. Data is only shared with service providers necessary for app functionality.
                    </p>
                  </div>
                </div>

                <div id="contact">
                  <h2 className="text-base font-medium text-foreground mb-3">6. Contact Us</h2>
                  <p className="mb-3">
                    If you have questions, concerns, or requests regarding this Privacy Policy or your data, please contact us:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium mb-1">Privacy Contact</p>
                    <Link 
                      href="mailto:privacy@whosthat.app" 
                      className="text-blue-600 hover:underline"
                    >
                      privacy@whosthat.app
                    </Link>
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-3">7. Policy Updates</h2>
                  <p className="mb-3">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make significant changes:
                  </p>
                  <div className="space-y-2 ml-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>We will notify you through in-app notifications or email</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>We will update the "Last updated" date at the top of this policy</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Continued use of the app after changes constitutes acceptance of the updated policy</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-8">
                  <h2 className="text-base font-medium text-foreground mb-3">Marketing & Partnerships</h2>
                  <p className="mb-4">
                    Interested in partnering with Guess One or exploring marketing opportunities? We're always looking to collaborate with brands and creators who align with our values.
                  </p>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                    <p className="font-medium mb-2">Get in Touch</p>
                    <p className="text-sm text-muted mb-4">
                      Whether you're interested in sponsored content, partnerships, or other marketing opportunities, we'd love to hear from you.
                    </p>
                    <Link 
                      href="mailto:privacy@whosthat.app?subject=Marketing Inquiry" 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Contact Marketing Team
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>
          
          {/* Right Column - Additional Info */}
          <div className="w-full md:w-[300px] md:flex-shrink-0 pt-6 md:pt-12">
            <div className="space-y-6 w-full max-w-[300px] mx-auto md:max-w-none md:mx-0">
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-sm font-medium text-foreground mb-3">Quick Links</h3>
                <div className="space-y-2 text-sm">
                  <Link href="#data-collection" className="block text-muted hover:text-foreground">
                    Data Collection
                  </Link>
                  <Link href="#data-usage" className="block text-muted hover:text-foreground">
                    How Data is Used
                  </Link>
                  <Link href="#data-storage" className="block text-muted hover:text-foreground">
                    Data Storage
                  </Link>
                  <Link href="#user-rights" className="block text-muted hover:text-foreground">
                    Your Rights
                  </Link>
                  <Link href="#contact" className="block text-muted hover:text-foreground">
                    Contact Us
                  </Link>
                </div>
              </div>

              <div className="border border-gray-200 p-6 rounded-lg">
                <h3 className="text-sm font-medium text-foreground mb-3">Your Privacy Matters</h3>
                <p className="text-xs text-muted leading-relaxed">
                  We are committed to transparency and giving you control over your data. If you have any questions or concerns, don't hesitate to reach out.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-sm font-medium text-foreground mb-2">Need Help?</h3>
                <p className="text-xs text-muted mb-3">
                  Have questions about your privacy or data? We're here to help.
                </p>
                <Link 
                  href="mailto:privacy@whosthat.app" 
                  className="text-xs text-blue-600 hover:underline"
                >
                  privacy@whosthat.app
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

