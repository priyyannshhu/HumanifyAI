import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileTextIcon, ArrowRightIcon, CopyIcon, BarChart3Icon, ClockIcon, TargetIcon, ZapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { transformText } from '@/services/advancedTransformService';
import { useToast } from '@/components/ui/use-toast';

const SummarizeLanding: React.FC = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
  const [summaryLength, setSummaryLength] = useState(30);
  const [focus, setFocus] = useState('balanced');
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
        description: "Please enter some text to summarize.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsTransforming(true);
      const response = await transformText({ text: inputText, tool: 'summarize', maxWords: 1000 });
      setOutputText(response.transformedText);
      toast({ title: "Summary complete!", description: "Your text has been summarized." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to summarize text.", variant: "destructive" });
    } finally {
      setIsTransforming(false);
    }
  };

  const handleCopy = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied!",
        description: "Summary copied to clipboard.",
      });
    }
  };

  const handleExample = () => {
    const exampleText = "The rapid advancement of artificial intelligence has transformed numerous industries and continues to shape our future in unprecedented ways. Machine learning algorithms are becoming increasingly sophisticated and capable of performing complex tasks that were previously thought to be exclusive to human intelligence. From healthcare to finance, education to entertainment, AI is revolutionizing how we work, live, and interact with technology. The integration of AI into daily life has brought both opportunities and challenges, requiring us to adapt to new paradigms of human-machine collaboration while addressing ethical considerations and ensuring responsible development.";
    setInputText(exampleText);
  };

  const features = [
    {
      icon: <TargetIcon className="w-8 h-8" />,
      title: "Key Points",
      description: "Extract the most important information from any text"
    },
    {
      icon: <ClockIcon className="w-8 h-8" />,
      title: "Time Saving",
      description: "Get summaries in seconds instead of reading lengthy content"
    },
    {
      icon: <BarChart3Icon className="w-8 h-8" />,
      title: "Smart Analysis",
      description: "AI-powered analysis identifies crucial content"
    },
    {
      icon: <ZapIcon className="w-8 h-8" />,
      title: "Instant Results",
      description: "Generate summaries immediately with one click"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-950 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-20 left-16 w-32 h-32 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-2xl" />
        <div className="absolute top-1/3 right-24 w-24 h-24 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-2xl" />
        <div className="absolute bottom-32 left-1/3 w-36 h-36 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="fade-in mb-8" style={{ opacity: '0', transform: 'translateY(20px)', transition: 'all 0.6s ease-out' }}>
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-amber-500/30 mb-6">
                <FileTextIcon className="w-6 h-6 text-amber-400" />
                <span className="text-amber-300 font-medium">AI Summarizer</span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-bold mb-6">
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Summarize Any Text
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                  In Seconds
                </span>
              </h1>
            </div>
            
            <p className="fade-in text-xl lg:text-2xl text-amber-200/70 mb-8 max-w-3xl mx-auto" style={{ opacity: '0', transform: 'translateY(20px)', transition: 'all 0.6s ease-out 0.2s' }}>
              Extract key points and create concise summaries instantly. Perfect for research, articles, and long documents.
            </p>
            
            <div className="fade-in flex flex-col sm:flex-row gap-4 justify-center mb-12" style={{ opacity: '0', transform: 'translateY(20px)', transition: 'all 0.6s ease-out 0.4s' }}>
              <Button
                onClick={() => navigate('/')}
                size="lg"
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 group"
              >
                View All Tools
                <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={handleExample}
                variant="outline"
                size="lg"
                className="px-8 py-4 glass border border-amber-500/30 text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 font-semibold text-lg rounded-xl transition-all duration-300"
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
                <Card className="glass border border-amber-500/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <FileTextIcon className="w-6 h-6 text-amber-400" />
                    Original Text
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Textarea
                        className="min-h-[300px] resize-y glass border border-amber-500/30 bg-black/40 text-white placeholder:text-amber-300/50 focus:border-amber-400 focus:ring-amber-400 text-base leading-relaxed"
                        placeholder="Paste your text to summarize here..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                      />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-amber-300">
                          {inputText.length.toLocaleString()} characters
                        </span>
                        <Badge variant="secondary" className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                          Original
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-amber-200 mb-2 block">
                        Summary Length: {summaryLength}%
                      </label>
                      <Slider
                        value={[summaryLength]}
                        onValueChange={(value) => setSummaryLength(value[0])}
                        max={50}
                        min={10}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-amber-300 mt-1">
                        <span>Brief</span>
                        <span>Detailed</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleTransform}
                      disabled={!inputText.trim() || isTransforming}
                      className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all duration-300"
                    >
                      {isTransforming ? (
                        <>
                          <ZapIcon className="w-4 h-4 mr-2 animate-spin" />
                          Summarizing...
                        </>
                      ) : (
                        <>
                          <ZapIcon className="w-4 h-4 mr-2" />
                          Summarize Text
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Output Section */}
              <div className="space-y-6">
                <Card className="glass border border-orange-500/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <TargetIcon className="w-6 h-6 text-orange-400" />
                    Summary Output
                  </h2>
                  
                  {outputText ? (
                    <div className="space-y-4">
                      <div className="min-h-[300px] p-4 rounded-xl glass border border-orange-500/30 bg-black/40">
                        <p className="text-white leading-relaxed">
                          {outputText}
                        </p>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button
                          onClick={handleCopy}
                          className="flex-1 py-2 glass border border-orange-500/30 text-orange-300 hover:text-orange-200 hover:bg-orange-500/10 transition-all duration-300"
                        >
                          <CopyIcon className="w-4 h-4 mr-2" />
                          Copy Summary
                        </Button>
                        
                        <Button
                          onClick={() => setOutputText('')}
                          variant="outline"
                          className="py-2 glass border border-orange-500/30 text-orange-300 hover:text-orange-200 hover:bg-orange-500/10 transition-all duration-300"
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="min-h-[300px] flex items-center justify-center rounded-xl glass border border-orange-500/30 bg-black/40">
                      <div className="text-center">
                        <TargetIcon className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                        <p className="text-orange-300 text-lg">
                          Your summary will appear here
                        </p>
                        <p className="text-orange-400/60 text-sm mt-2">
                          Enter text and click summarize to see the magic
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
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Smart Summarization Technology
                </span>
              </h2>
              <p className="text-xl text-amber-200/70 max-w-2xl mx-auto">
                AI-powered analysis that captures the essence of your content
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="glass rounded-xl p-6 border border-amber-500/20 transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20">
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
        <footer className="py-12 px-6 border-t border-amber-500/20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-white/60 mb-4">
              Made with ❤️ by Priyanshu Vishwakarma
            </p>
            <p className="text-white/40 text-sm">
              © 2026 Humanify AI Suite. Advanced summarization for everyone.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SummarizeLanding;
