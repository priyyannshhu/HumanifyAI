import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  PaletteIcon, 
  ArrowRightIcon,
  ZapIcon,
  CopyIcon,
  SmileIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  HeartIcon,
  MessageCircleIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { transformText } from '@/services/advancedTransformService';
import { useToast } from '@/components/ui/use-toast';

gsap.registerPlugin(ScrollTrigger);

const ToneLanding: React.FC = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
  const [selectedTone, setSelectedTone] = useState('professional');
  const [intensity, setIntensity] = useState(0.7);
  const [characterCount, setCharacterCount] = useState(0);
  const { toast } = useToast();

  const tones = [
    { 
      value: 'friendly', 
      label: 'Friendly', 
      icon: <SmileIcon className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500',
      description: 'Warm and approachable language'
    },
    { 
      value: 'professional', 
      label: 'Professional', 
      icon: <BriefcaseIcon className="w-5 h-5" />,
      color: 'from-blue-500 to-indigo-500',
      description: 'Formal business communication'
    },
    { 
      value: 'casual', 
      label: 'Casual', 
      icon: <MessageCircleIcon className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
      description: 'Relaxed and conversational'
    },
    { 
      value: 'academic', 
      label: 'Academic', 
      icon: <GraduationCapIcon className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500',
      description: 'Scholarly and formal writing'
    },
    { 
      value: 'creative', 
      label: 'Creative', 
      icon: <HeartIcon className="w-5 h-5" />,
      color: 'from-yellow-500 to-orange-500',
      description: 'Imaginative and engaging'
    },
    { 
      value: 'persuasive', 
      label: 'Persuasive', 
      icon: <ZapIcon className="w-5 h-5" />,
      color: 'from-red-500 to-pink-500',
      description: 'Convincing and influential'
    }
  ];

  useEffect(() => {
    // GSAP timeline for entrance animations
    const tl = gsap.timeline();
    
    tl.from('.tone-hero', {
      rotationY: 180,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out'
    })
    .from('.tone-selector', {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      stagger: 0.2
    }, '-=0.8')
    .from('.intensity-slider', {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.4');

    // Color morphing animation for tone selector
    gsap.to('.tone-card', {
      background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)',
      backgroundSize: '200% 200%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.tone-container',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
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
        description: "Please enter some text to change tone.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsTransforming(true);
      
      const response = await transformText({
        text: inputText,
        tool: 'tone',
        tone: selectedTone as any,
        creativity: intensity,
        maxWords: 2000
      });
      
      setOutputText(response.transformedText);
      
      // Tone transformation animation
      gsap.fromTo('.output-display', {
        filter: 'hue-rotate(0deg) saturate(0%)',
        scale: 0.9
      }, {
        filter: 'hue-rotate(360deg) saturate(100%)',
        scale: 1,
        duration: 1,
        ease: 'power2.out'
      });
      
      toast({
        title: "Tone changed successfully!",
        description: `Your text has been converted to ${selectedTone} tone.`,
      });
    } catch (error) {
      console.error("Error changing tone:", error);
      toast({
        title: "Error",
        description: "There was an error changing your text tone. Please try again.",
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
        description: "Tone-adjusted text copied to clipboard.",
      });
      
      // Copy success animation
      gsap.to('.copy-button', {
        scale: [1, 0.8, 1],
        duration: 0.3,
        ease: 'power2.inOut'
      });
    }
  };

  const handleExample = () => {
    const exampleText = "The meeting has been scheduled for next Tuesday at 3 PM. Please ensure all participants are present on time as we have important topics to discuss regarding project timeline and deliverables.";
    setInputText(exampleText);
    setCharacterCount(exampleText.length);
    
    // Text reveal animation
    gsap.from('.example-text', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    });
  };

  const getCurrentToneData = () => {
    return tones.find(t => t.value === selectedTone) || tones[0];
  };

  const currentTone = getCurrentToneData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-pink-950 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-20 left-16 w-36 h-36 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-24 w-28 h-28 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-44 h-44 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 tone-container">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div 
              className="tone-hero mb-8"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-purple-500/30 mb-6">
                <PaletteIcon className="w-6 h-6 text-purple-400" />
                <span className="text-purple-300 font-medium">AI Tone Changer</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                  Transform Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Writing Tone
                </span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-xl lg:text-2xl text-purple-200/70 mb-8 max-w-3xl mx-auto"
            >
              Adjust the tone and style of your text to match any audience or context.
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
          </div>
        </section>

        {/* Main Tool Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Input Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 space-y-6"
              >
                <Card className="glass border border-purple-500/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <PaletteIcon className="w-6 h-6 text-purple-400" />
                    Original Text
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Textarea
                        className="example-text min-h-[200px] resize-y glass border border-purple-500/30 bg-black/40 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400 text-base leading-relaxed"
                        placeholder="Paste your text to change tone..."
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
                          Original
                        </Badge>
                      </div>
                    </div>

                    {/* Tone Selector */}
                    <motion.div 
                      className="tone-selector space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div>
                        <label className="text-sm font-medium text-purple-200 mb-3 block">
                          Select Tone
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {tones.map((tone) => (
                            <motion.div
                              key={tone.value}
                              className={`tone-card cursor-pointer p-3 rounded-xl border-2 transition-all duration-300 ${
                                selectedTone === tone.value 
                                  ? `border-purple-400 bg-gradient-to-r ${tone.color}` 
                                  : 'border-purple-500/30 glass hover:border-purple-400/50'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedTone(tone.value)}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <div className={`p-2 rounded-lg ${
                                  selectedTone === tone.value ? 'bg-white/20' : 'bg-white/10'
                                }`}>
                                  <div className={selectedTone === tone.value ? 'text-white' : 'text-purple-300'}>
                                    {tone.icon}
                                  </div>
                                </div>
                                <span className={`text-sm font-medium ${
                                  selectedTone === tone.value ? 'text-white' : 'text-purple-200'
                                }`}>
                                  {tone.label}
                                </span>
                              </div>
                              <div className={`text-xs ${
                                selectedTone === tone.value ? 'text-white/80' : 'text-purple-300/60'
                              }`}>
                                {tone.description}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-purple-200 mb-2 block">
                          Intensity: {intensity.toFixed(1)}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={intensity}
                          onChange={(e) => setIntensity(parseFloat(e.target.value))}
                          className="intensity-slider w-full h-2 bg-purple-500/30 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-purple-300 mt-1">
                          <span>Subtle</span>
                          <span>Strong</span>
                        </div>
                      </div>
                    </motion.div>

                    <Button
                      onClick={handleTransform}
                      disabled={!inputText.trim() || isTransforming}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all duration-300"
                    >
                      {isTransforming ? (
                        <>
                          <PaletteIcon className="w-4 h-4 mr-2 animate-spin" />
                          Changing Tone...
                        </>
                      ) : (
                        <>
                          <PaletteIcon className="w-4 h-4 mr-2" />
                          Change to {currentTone.label}
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
                <Card className="output-display glass border border-pink-500/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${currentTone.color}`}>
                      <div className="text-white">{currentTone.icon}</div>
                    </div>
                    {currentTone.label} Output
                  </h2>
                  
                  {outputText ? (
                    <div className="space-y-4">
                      <div className="min-h-[200px] p-4 rounded-xl glass border border-pink-500/30 bg-black/40">
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
                    <div className="min-h-[200px] flex items-center justify-center rounded-xl glass border border-pink-500/30 bg-black/40">
                      <div className="text-center">
                        <PaletteIcon className="w-12 h-12 mx-auto mb-4 text-pink-400" />
                        <p className="text-pink-300 text-lg">
                          Your {currentTone.label.toLowerCase()} text will appear here
                        </p>
                        <p className="text-pink-400/60 text-sm mt-2">
                          Select a tone and click transform to see the magic
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
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
              © 2025 Humanify AI. Advanced tone adjustment for everyone.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ToneLanding;
