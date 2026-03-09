import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { 
  SparklesIcon, 
  ArrowRightIcon,
  ZapIcon,
  CheckCircleIcon,
  CopyIcon,
  RefreshCwIcon,
  BarChart3Icon,
  UsersIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { transformText } from '@/services/advancedTransformService';
import { useToast } from '@/components/ui/use-toast';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const HumanizeLanding: React.FC = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
  const [creativity, setCreativity] = useState(0.7);
  const [formality, setFormality] = useState(0.5);
  const [characterCount, setCharacterCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Clean up any existing animations first
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.killTweensOf("*");

    // GSAP Animations for hero section
    const tl = gsap.timeline();
    
    tl.from('.hero-title', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    })
    .from('.hero-subtitle', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2
    })
    .from('.hero-buttons', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.4
    });

    // Floating animation for background elements
    const floatingAnimation = gsap.to('.floating-element', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5
    });

    // Scroll animations
    const scrollAnimation = ScrollTrigger.create({
      trigger: '.feature-card',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
      onEnter: () => {
        gsap.to('.feature-card', {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      },
      onLeave: () => {
        gsap.to('.feature-card', {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });

    return () => {
      floatingAnimation.kill();
      scrollAnimation.kill();
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleTransform = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter some text to transform.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsTransforming(true);
      
      const response = await transformText({
        text: inputText,
        tool: 'humanize',
        creativity,
        formality,
        maxWords: 2000
      });
      
      setOutputText(response.transformedText);
      
      // Success animation
      gsap.fromTo('.output-area', {
        scale: 0.95,
        opacity: 0.5
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
      
      toast({
        title: "Transformation complete!",
        description: "Your text has been successfully humanized.",
      });
    } catch (error) {
      console.error("Error transforming text:", error);
      toast({
        title: "Error",
        description: "There was an error transforming your text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTransforming(false);
    }
  };

  const handleCopy = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard.",
      });
      
      // Copy animation
      gsap.to('.copy-button', {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }
  };

  const handleExample = () => {
    const exampleText = "This is an example of AI-generated text that sounds robotic and unnatural. The text contains repetitive patterns and formal language that lacks human warmth and personality. AI writing often uses perfect grammar and predictable sentence structures that make it easily detectable by AI detection tools.";
    setInputText(exampleText);
    setCharacterCount(exampleText.length);
    
    // Text appearance animation
    gsap.fromTo('.input-textarea', {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  const features = [
    {
      icon: <SparklesIcon className="w-8 h-8" />,
      title: "Natural Language",
      description: "Convert robotic AI text into natural, human-like writing"
    },
    {
      icon: <CheckCircleIcon className="w-8 h-8" />,
      title: "Bypass Detection",
      description: "Advanced algorithms ensure 0% AI detection scores"
    },
    {
      icon: <ZapIcon className="w-8 h-8" />,
      title: "Instant Results",
      description: "Get humanized text in seconds with one click"
    },
    {
      icon: <BarChart3Icon className="w-8 h-8" />,
      title: "Smart Controls",
      description: "Adjust creativity and formality for perfect results"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl" />
        <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl" />
        <div className="floating-element absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1 
              className="hero-title text-6xl lg:text-8xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                Make AI Writing
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                Sound Human
              </span>
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle text-xl lg:text-2xl text-white/70 mb-8 max-w-3xl mx-auto"
            >
              Transform robotic AI-generated text into natural, human-like content that bypasses AI detection and resonates with real people.
            </motion.p>
            
            <motion.div 
              className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button
                onClick={() => navigate('/')}
                size="lg"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 group"
              >
                View All Tools
                <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={handleExample}
                variant="outline"
                size="lg"
                className="px-8 py-4 glass border border-purple-500/30 text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 font-semibold text-lg rounded-xl transition-all duration-300"
              >
                Load Example
              </Button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              {[
                { value: "10K+", label: "Active Users", icon: <UsersIcon className="w-5 h-5" /> },
                { value: "100K+", label: "Texts Humanized", icon: <SparklesIcon className="w-5 h-5" /> },
                { value: "0%", label: "AI Detection", icon: <CheckCircleIcon className="w-5 h-5" /> },
                { value: "24/7", label: "Available", icon: <ZapIcon className="w-5 h-5" /> }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-6 border border-purple-500/20"
                >
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Tool Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <Card className="glass border border-purple-500/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <SparklesIcon className="w-6 h-6 text-purple-400" />
                    Input Text
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Textarea
                        className="input-textarea min-h-[300px] resize-y glass border border-purple-500/30 bg-black/40 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400 text-base leading-relaxed"
                        placeholder="Paste your AI-generated text here..."
                        value={inputText}
                        onChange={(e) => {
                          setInputText(e.target.value);
                          setCharacterCount(e.target.value.length);
                        }}
                      />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-purple-300">
                          {characterCount.toLocaleString()} characters
                        </span>
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          AI Generated
                        </Badge>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-purple-200 mb-2 block">
                          Creativity Level: {creativity.toFixed(1)}
                        </label>
                        <Slider
                          value={[creativity]}
                          onValueChange={(value) => setCreativity(value[0])}
                          max={1}
                          min={0}
                          step={0.1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-purple-300 mt-1">
                          <span>Conservative</span>
                          <span>Creative</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-purple-200 mb-2 block">
                          Formality Level: {formality.toFixed(1)}
                        </label>
                        <Slider
                          value={[formality]}
                          onValueChange={(value) => setFormality(value[0])}
                          max={1}
                          min={0}
                          step={0.1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-purple-300 mt-1">
                          <span>Casual</span>
                          <span>Formal</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleTransform}
                      disabled={!inputText.trim() || isTransforming}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all duration-300"
                    >
                      {isTransforming ? (
                        <>
                          <RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" />
                          Transforming...
                        </>
                      ) : (
                        <>
                          <SparklesIcon className="w-4 h-4 mr-2" />
                          Humanize Text
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Output Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <Card className="output-area glass border border-pink-500/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-pink-400" />
                    Humanized Output
                  </h2>
                  
                  {outputText ? (
                    <div className="space-y-4">
                      <div className="min-h-[300px] p-4 rounded-xl glass border border-pink-500/30 bg-black/40">
                        <p className="text-white leading-relaxed">
                          {outputText}
                        </p>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button
                          onClick={handleCopy}
                          className="copy-button flex-1 py-2 glass border border-pink-500/30 text-pink-300 hover:text-pink-200 hover:bg-pink-500/10 transition-all duration-300"
                        >
                          <CopyIcon className="w-4 h-4 mr-2" />
                          Copy Text
                        </Button>
                        
                        <Button
                          onClick={() => setOutputText('')}
                          variant="outline"
                          className="py-2 glass border border-pink-500/30 text-pink-300 hover:text-pink-200 hover:bg-pink-500/10 transition-all duration-300"
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="min-h-[300px] flex items-center justify-center rounded-xl glass border border-pink-500/30 bg-black/40">
                      <div className="text-center">
                        <SparklesIcon className="w-12 h-12 mx-auto mb-4 text-pink-400" />
                        <p className="text-pink-300 text-lg">
                          Your humanized text will appear here
                        </p>
                        <p className="text-pink-400/60 text-sm mt-2">
                          Enter AI text and click transform to see the magic
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Why Choose Our AI Humanizer?
                </span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Advanced AI technology that understands the nuances of human writing
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="feature-card glass rounded-xl p-6 border border-purple-500/20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                      <div className="text-white">{feature.icon}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-purple-500/20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-white/60 mb-4">
              Made with ❤️ by Priyanshu Vishwakarma
            </p>
            <p className="text-white/40 text-sm">
              © 2025 Humanify AI. Advanced AI tools for everyone.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HumanizeLanding;
