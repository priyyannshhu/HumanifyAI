import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ZapIcon, 
  ArrowRightIcon,
  BookOpenIcon,
  CopyIcon,
  GraduationCapIcon,
  LightbulbIcon,
  CheckCircleIcon,
  BrainIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { transformText } from '@/services/advancedTransformService';
import { useToast } from '@/components/ui/use-toast';

gsap.registerPlugin(ScrollTrigger);

const SimplifyLanding: React.FC = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
  const [targetLevel, setTargetLevel] = useState('10th');
  const [simplificationDepth, setSimplificationDepth] = useState(0.7);
  const [characterCount, setCharacterCount] = useState(0);
  const { toast } = useToast();

  const readingLevels = [
    { 
      value: '6th', 
      label: '6th Grade', 
      description: 'Very simple language',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      value: '8th', 
      label: '8th Grade', 
      description: 'Simple vocabulary',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      value: '10th', 
      label: '10th Grade', 
      description: 'Standard simplification',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      value: '12th', 
      label: '12th Grade', 
      description: 'Moderately complex',
      color: 'from-orange-500 to-red-500'
    }
  ];

  useEffect(() => {
    // GSAP entrance animations
    const tl = gsap.timeline();
    
    tl.from('.simplify-hero', {
      y: 150,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    })
    .from('.level-selector', {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      stagger: 0.1
    }, '-=0.6')
    .from('.depth-slider', {
      x: -80,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.3');

    // Floating animation for background elements
    gsap.to('.float-element', {
      y: 'random(-30, -10)',
      x: 'random(-20, 20)',
      duration: 'random(3, 6)',
      repeat: -1,
      ease: 'sine.inOut'
    });

    // Scroll-based animations
    ScrollTrigger.create({
      trigger: '.simplify-container',
      start: 'top center',
      end: 'bottom center',
      onUpdate: (self) => {
        gsap.to('.complexity-meter', {
          width: `${self.progress * 100}%`,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  const handleTransform = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter some text to simplify.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsTransforming(true);
      
      const response = await transformText({
        text: inputText,
        tool: 'simplify',
        creativity: 0.3, // Lower creativity for simplification
        maxWords: 2000
      });
      
      setOutputText(response.transformedText);
      
      // Simplification success animation
      gsap.fromTo('.output-content', {
        filter: 'blur(10px)',
        opacity: 0.5
      }, {
        filter: 'blur(0px)',
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      });
      
      toast({
        title: "Simplification complete!",
        description: "Your text has been successfully simplified.",
      });
    } catch (error) {
      console.error("Error simplifying text:", error);
      toast({
        title: "Error",
        description: "There was an error simplifying your text. Please try again.",
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
        description: "Simplified text copied to clipboard.",
      });
      
      // Copy success animation
      gsap.to('.copy-btn', {
        y: -10,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }
  };

  const handleExample = () => {
    const exampleText = "The implementation of sophisticated machine learning algorithms necessitates comprehensive data preprocessing methodologies to ensure optimal performance metrics and mitigate the potential for algorithmic bias in predictive modeling scenarios. The utilization of advanced statistical techniques and feature engineering approaches is essential for achieving robust model generalization across diverse datasets.";
    setInputText(exampleText);
    setCharacterCount(exampleText.length);
    
    // Text loading animation
    gsap.from('.complex-text', {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  const getCurrentLevel = () => {
    return readingLevels.find(level => level.value === targetLevel) || readingLevels[2];
  };

  const currentLevel = getCurrentLevel();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-green-950 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="float-element absolute top-24 left-16 w-32 h-32 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-2xl" />
        <div className="float-element absolute top-1/3 right-28 w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full blur-2xl" />
        <div className="float-element absolute bottom-36 left-1/4 w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 simplify-container">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div 
              className="simplify-hero mb-8"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-green-500/30 mb-6">
                <ZapIcon className="w-6 h-6 text-green-400" />
                <span className="text-green-300 font-medium">AI Simplifier</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 bg-clip-text text-transparent">
                  Make Complex
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 bg-clip-text text-transparent">
                  Simple to Understand
                </span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-xl lg:text-2xl text-green-200/70 mb-8 max-w-3xl mx-auto"
            >
              Convert complex text into clear, easy-to-understand language for any audience.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={() => navigate('/')}
                size="lg"
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 group"
              >
                View All Tools
                <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={handleExample}
                variant="outline"
                size="lg"
                className="px-8 py-4 glass border border-green-500/30 text-green-300 hover:text-green-200 hover:bg-green-500/10 font-semibold text-lg rounded-xl transition-all duration-300"
              >
                Load Example
              </Button>
            </motion.div>
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
                <Card className="glass border border-green-500/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <BookOpenIcon className="w-6 h-6 text-green-400" />
                    Complex Text
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Textarea
                        className="complex-text min-h-[250px] resize-y glass border border-green-500/30 bg-black/40 text-white placeholder:text-green-300/50 focus:border-green-400 focus:ring-green-400 text-base leading-relaxed"
                        placeholder="Paste your complex text here..."
                        value={inputText}
                        onChange={(e) => {
                          setInputText(e.target.value);
                          setCharacterCount(e.target.value.length);
                        }}
                      />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-green-300">
                          {characterCount.toLocaleString()} characters
                        </span>
                        <Badge variant="secondary" className="bg-red-500/20 text-red-300 border-red-500/30">
                          Complex
                        </Badge>
                      </div>
                    </div>

                    {/* Reading Level Selector */}
                    <motion.div 
                      className="level-selector space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div>
                        <label className="text-sm font-medium text-green-200 mb-3 block">
                          Target Reading Level
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {readingLevels.map((level) => (
                            <motion.div
                              key={level.value}
                              className={`cursor-pointer p-3 rounded-xl border-2 transition-all duration-300 ${
                                targetLevel === level.value 
                                  ? `border-green-400 bg-gradient-to-r ${level.color}` 
                                  : 'border-green-500/30 glass hover:border-green-400/50'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setTargetLevel(level.value)}
                            >
                              <div className="text-center">
                                <div className={`text-sm font-bold mb-1 ${
                                  targetLevel === level.value ? 'text-white' : 'text-green-200'
                                }`}>
                                  {level.label}
                                </div>
                                <div className={`text-xs ${
                                  targetLevel === level.value ? 'text-white/80' : 'text-green-300/60'
                                }`}>
                                  {level.description}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-green-200 mb-2 block">
                          Simplification Depth: {simplificationDepth.toFixed(1)}
                        </label>
                        <div className="complexity-meter w-full h-2 bg-green-500/30 rounded-lg overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                            style={{ width: `${simplificationDepth * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-green-300 mt-1">
                          <span>Light</span>
                          <span>Deep</span>
                        </div>
                      </div>
                    </motion.div>

                    <Button
                      onClick={handleTransform}
                      disabled={!inputText.trim() || isTransforming}
                      className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all duration-300"
                    >
                      {isTransforming ? (
                        <>
                          <ZapIcon className="w-4 h-4 mr-2 animate-spin" />
                          Simplifying...
                        </>
                      ) : (
                        <>
                          <ZapIcon className="w-4 h-4 mr-2" />
                          Simplify to {currentLevel.label}
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
                <Card className="glass border border-emerald-500/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <LightbulbIcon className="w-6 h-6 text-emerald-400" />
                    Simplified Output
                  </h2>
                  
                  {outputText ? (
                    <div className="space-y-4">
                      <div className="output-content min-h-[250px] p-4 rounded-xl glass border border-emerald-500/30 bg-black/40">
                        <p className="text-white leading-relaxed">
                          {outputText}
                        </p>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button
                          onClick={handleCopy}
                          className="copy-btn flex-1 py-2 glass border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/10 transition-all duration-300"
                        >
                          <CopyIcon className="w-4 h-4 mr-2" />
                          Copy Text
                        </Button>
                        
                        <Button
                          onClick={() => setOutputText('')}
                          variant="outline"
                          className="py-2 glass border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/10 transition-all duration-300"
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="min-h-[250px] flex items-center justify-center rounded-xl glass border border-emerald-500/30 bg-black/40">
                      <div className="text-center">
                        <LightbulbIcon className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
                        <p className="text-emerald-300 text-lg">
                          Your simplified text will appear here
                        </p>
                        <p className="text-emerald-400/60 text-sm mt-2">
                          Enter complex text and click simplify to see the magic
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
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  Smart Simplification Technology
                </span>
              </h2>
              <p className="text-xl text-green-200/70 max-w-2xl mx-auto">
                AI-powered simplification that preserves meaning while improving clarity
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <BrainIcon className="w-8 h-8" />,
                  title: "Context Aware",
                  description: "Maintains original meaning and context"
                },
                {
                  icon: <GraduationCapIcon className="w-8 h-8" />,
                  title: "Grade Levels",
                  description: "Choose from 6th to 12th grade reading levels"
                },
                {
                  icon: <ZapIcon className="w-8 h-8" />,
                  title: "Instant Results",
                  description: "Get simplified text in seconds"
                },
                {
                  icon: <LightbulbIcon className="w-8 h-8" />,
                  title: "Smart Vocabulary",
                  description: "Uses appropriate simple language"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="glass rounded-xl p-6 border border-green-500/20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20">
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
        <footer className="py-12 px-6 border-t border-green-500/20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-white/60 mb-4">
              Made with ❤️ by Priyanshu Vishwakarma
            </p>
            <p className="text-white/40 text-sm">
              © 2025 Humanify AI. Smart simplification for everyone.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SimplifyLanding;
