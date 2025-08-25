import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import TextTransformer from "@/components/TextTransformer";
import FeaturesSection from "@/components/FeaturesSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        
        <div className="relative z-10">
          {/* Wave shape divider with dark theme */}
          <div className="absolute -top-16 left-0 right-0 h-16 overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="w-full h-auto"
              preserveAspectRatio="none"
            >
              <path
                fill="rgba(20, 20, 30, 0.8)"
                fillOpacity="1"
                d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,101.3C960,107,1056,117,1152,117.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
          
          <section id="transformer-section" className="bg-gradient-to-b from-black/60 to-black/40 py-20 glass-purple">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  From AI to Human in Seconds
                  </span>
                </h2>
                <p className="text-white/80">
Paste your AI-generated content below and watch it transform into natural, engaging writing that sounds genuinely human.                </p>
              </div>
              
              <div className="flex justify-center">
                <TextTransformer />
              </div>
            </div>
          </section>
        </div>
        
        <FeaturesSection />
<section id="about" className="py-20 bg-gradient-to-b from-black/40 to-black/60 relative overflow-hidden">
          {/* Subtle animated background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto glass-pink rounded-2xl p-10 border border-white/20 glow-pink">
              <h2 className="text-4xl font-bold mb-8 text-center">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  The Human Touch Your AI Content Deserves
                </span>
              </h2>
              
              <div className="prose prose-lg max-w-none text-white/90 space-y-6">
                <div className="text-center mb-8">
                  <p className="text-xl leading-relaxed text-white/95">
                    <span className="text-primary font-semibold">Humanify</span> bridges the gap between AI efficiency and human authenticity, transforming robotic text into content that truly connects.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-accent mb-4">The Challenge We Solve</h3>
                    <p className="text-white/85 leading-relaxed">
                      AI generates content at lightning speed, but often lacks the warmth and authenticity that resonates with real people. Generic, robotic phrasing can make your audience disconnect before they even finish reading.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-4">Our Solution</h3>
                    <p className="text-white/85 leading-relaxed">
                      Our advanced AI technology detects mechanical patterns and transforms them into natural, engaging language—preserving every bit of your original meaning while adding that essential human touch.
                    </p>
                  </div>
                </div>

                <div className="bg-black/20 rounded-xl p-6 border border-white/10 mt-8">
                  <h3 className="text-lg font-semibold text-white mb-3 text-center">Perfect for Every Creator</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="text-white/80">
                      <div className="text-primary font-medium">Writers</div>
                      <div className="text-sm">Blog posts & articles</div>
                    </div>
                    <div className="text-white/80">
                      <div className="text-accent font-medium">Marketers</div>
                      <div className="text-sm">Campaign content</div>
                    </div>
                    <div className="text-white/80">
                      <div className="text-primary font-medium">Students</div>
                      <div className="text-sm">Academic papers</div>
                    </div>
                    <div className="text-white/80">
                      <div className="text-accent font-medium">Businesses</div>
                      <div className="text-sm">Professional docs</div>
                    </div>
                  </div>
                </div>

                <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-white/10 mt-8">
                  <p className="text-lg font-medium text-white mb-2">
                    🚀 <span className="text-accent">100% Free</span> • <span className="text-primary">0% AI Detection</span> • <span className="text-accent">Instant Results</span>
                  </p>
                  <p className="text-white/75 text-sm">
                    Join thousands who've discovered the perfect balance of AI speed and human authenticity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
};

export default Index;