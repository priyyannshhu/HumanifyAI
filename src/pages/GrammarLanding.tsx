import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, ArrowRightIcon, CopyIcon, SpellCheckIcon, BookOpenIcon, ZapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { transformText } from '@/services/advancedTransformService';
import { useToast } from '@/components/ui/use-toast';

const GrammarLanding: React.FC = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simple fade-in animation
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }, []);

  const handleTransform = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter some text to fix grammar.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsTransforming(true);
      const response = await transformText({ text: inputText, tool: 'grammar', maxWords: 2000 });
      setOutputText(response.transformedText);
      toast({ title: "Grammar fixed!", description: "Your text has been corrected." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to fix grammar.", variant: "destructive" });
    } finally {
      setIsTransforming(false);
    }
  };

  const handleCopy = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied!",
        description: "Corrected text copied to clipboard.",
      });
    }
  };

  const handleExample = () => {
    const exampleText = "Their going to the store to buy some grocieries, but they forgot there wallet at home. The weather was nice so they decided to walk instead of drive. It's a good decision because the traffic is always bad on weekends.";
    setInputText(exampleText);
  };

  const features = [
    {
      icon: <SpellCheckIcon className="w-8 h-8" />,
      title: "Grammar Correction",
      description: "Fix all grammar errors and sentence structure issues"
    },
    {
      icon: <BookOpenIcon className="w-8 h-8" />,
      title: "Spelling Fix",
      description: "Correct spelling mistakes and typos automatically"
    },
    {
      icon: <ZapIcon className="w-8 h-8" />,
      title: "Style Improvement",
      description: "Enhance writing style and readability"
    },
    {
      icon: <CheckCircleIcon className="w-8 h-8" />,
      title: "Professional Quality",
      description: "Get publication-ready text instantly"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-950 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-20 left-16 w-32 h-32 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full blur-2xl" />
        <div className="absolute top-1/3 right-24 w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full blur-2xl" />
        <div className="absolute bottom-32 left-1/3 w-36 h-36 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="fade-in mb-8" style={{ opacity: '0', transform: 'translateY(20px)', transition: 'all 0.6s ease-out' }}>
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-teal-500/30 mb-6">
                <SpellCheckIcon className="w-6 h-6 text-teal-400" />
                <span className="text-teal-300 font-medium">AI Grammar Fix</span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-bold mb-6">
                <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                  Fix Grammar
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-500 to-teal-400 bg-clip-text text-transparent">
                  Instantly
                </span>
              </h1>
            </div>
            
            <p className="fade-in text-xl lg:text-2xl text-teal-200/70 mb-8 max-w-3xl mx-auto" style={{ opacity: '0', transform: 'translateY(20px)', transition: 'all 0.6s ease-out 0.2s' }}>
              Perfect grammar and style with one click. Eliminate errors and improve your writing quality instantly.
            </p>
            
            <div className="fade-in flex flex-col sm:flex-row gap-4 justify-center mb-12" style={{ opacity: '0', transform: 'translateY(20px)', transition: 'all 0.6s ease-out 0.4s' }}>
              <Button
                onClick={() => navigate('/')}
                size="lg"
                className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 group"
              >
                View All Tools
                <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={handleExample}
                variant="outline"
                size="lg"
                className="px-8 py-4 glass border border-teal-500/30 text-teal-300 hover:text-teal-200 hover:bg-teal-500/10 font-semibold text-lg rounded-xl transition-all duration-300"
              >
                Load Example
              </Button>
            </div>
          </div>
        </section>

        {/* Main Tool Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                <Card className="glass border border-teal-500/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <SpellCheckIcon className="w-6 h-6 text-teal-400" />
                    Original Text
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Textarea
                        className="min-h-[300px] resize-y glass border border-teal-500/30 bg-black/40 text-white placeholder:text-teal-300/50 focus:border-teal-400 focus:ring-teal-400 text-base leading-relaxed"
                        placeholder="Paste your text with grammar errors here..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                      />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-teal-300">
                          {inputText.length.toLocaleString()} characters
                        </span>
                        <Badge variant="secondary" className="bg-red-500/20 text-red-300 border-red-500/30">
                          Needs Fixing
                        </Badge>
                      </div>
                    </div>

                    <Button
                      onClick={handleTransform}
                      disabled={!inputText.trim() || isTransforming}
                      className="w-full py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all duration-300"
                    >
                      {isTransforming ? (
                        <>
                          <ZapIcon className="w-4 h-4 mr-2 animate-spin" />
                          Fixing Grammar...
                        </>
                      ) : (
                        <>
                          <SpellCheckIcon className="w-4 h-4 mr-2" />
                          Fix Grammar
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Output Section */}
              <div className="space-y-6">
                <Card className="glass border border-cyan-500/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-cyan-400" />
                    Corrected Output
                  </h2>
                  
                  {outputText ? (
                    <div className="space-y-4">
                      <div className="min-h-[300px] p-4 rounded-xl glass border border-cyan-500/30 bg-black/40">
                        <p className="text-white leading-relaxed">
                          {outputText}
                        </p>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button
                          onClick={handleCopy}
                          className="flex-1 py-2 glass border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 transition-all duration-300"
                        >
                          <CopyIcon className="w-4 h-4 mr-2" />
                          Copy Text
                        </Button>
                        
                        <Button
                          onClick={() => setOutputText('')}
                          variant="outline"
                          className="py-2 glass border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 transition-all duration-300"
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="min-h-[300px] flex items-center justify-center rounded-xl glass border border-cyan-500/30 bg-black/40">
                      <div className="text-center">
                        <CheckCircleIcon className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                        <p className="text-cyan-300 text-lg">
                          Your corrected text will appear here
                        </p>
                        <p className="text-cyan-400/60 text-sm mt-2">
                          Enter text with errors and click fix to see the magic
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                  Advanced Grammar Technology
                </span>
              </h2>
              <p className="text-xl text-teal-200/70 max-w-2xl mx-auto">
                AI-powered correction that perfects your writing instantly
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="glass rounded-xl p-6 border border-teal-500/20 transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20">
                      <div className="text-white">{feature.icon}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-teal-500/20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-white/60 mb-4">
              Made with ❤️ by Priyanshu Vishwakarma
            </p>
            <p className="text-white/40 text-sm">
              © 2026 Humanify AI Suite. Advanced grammar correction for everyone.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GrammarLanding;
