import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  RefreshCwIcon, 
  ArrowRightIcon,
  ZapIcon,
  CopyIcon,
  BarChart3Icon,
  LanguagesIcon,
  CheckCircleIcon
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

const ParaphraseLanding: React.FC = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
  const [creativity, setCreativity] = useState(0.8);
  const [complexity, setComplexity] = useState('medium');
  const [characterCount, setCharacterCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // GSAP entrance animations
    const tl = gsap.timeline();
    
    tl.from('.paraphrase-hero', {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)'
    })
    .from('.paraphrase-subtitle', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8')
    .from('.control-panel', {
      x: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4');

    // Parallax effect for background elements
    gsap.to('.bg-element', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.paraphrase-container',
        start: 'top bottom',
        end: 'bottom top',
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
        description: "Please enter some text to paraphrase.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsTransforming(true);
      
      const response = await transformText({
        text: inputText,
        tool: 'paraphrase',
        creativity,
        maxWords: 2000
      });
      
      setOutputText(response.transformedText);
      
      // Success animation with morph effect
      gsap.fromTo('.output-container', {
        borderRadius: '20px',
        scale: 0.95
      }, {
        borderRadius: '12px',
        scale: 1,
        duration: 0.6,
        ease: 'power2.out'
      });
      
      toast({
        title: "Paraphrasing complete!",
        description: "Your text has been successfully paraphrased.",
      });
    } catch (error) {
      console.error("Error paraphrasing text:", error);
      toast({
        title: "Error",
        description: "There was an error paraphrasing your text. Please try again.",
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
        description: "Paraphrased text copied to clipboard.",
      });
      
      // Copy feedback animation
      gsap.to('.copy-btn', {
        rotation: 360,
        duration: 0.5,
        ease: 'power2.inOut'
      });
    }
  };

  const handleExample = () => {
    const exampleText = "The rapid advancement of artificial intelligence has transformed numerous industries and continues to shape our future in unprecedented ways. Machine learning algorithms are becoming increasingly sophisticated and capable of performing complex tasks that were previously thought to be exclusive to human intelligence.";
    setInputText(exampleText);
    setCharacterCount(exampleText.length);
    
    // Typing effect animation
    const textarea = document.querySelector('.input-area') as HTMLTextAreaElement;
    if (textarea) {
      gsap.fromTo(textarea, 
        { value: '' },
        { value: exampleText, duration: 2, ease: 'power2.out' }
      );
    }
  };

  const complexityLevels = [
    { value: 'simple', label: 'Simple', description: 'Basic vocabulary and structure' },
    { value: 'medium', label: 'Medium', description: 'Balanced complexity' },
    { value: 'advanced', label: 'Advanced', description: 'Sophisticated vocabulary' }
  ];

  const features = [
    {
      icon: <RefreshCwIcon className="w-8 h-8" />,
      title: "Smart Rewording",
      description: "Intelligent vocabulary replacement while preserving meaning"
    },
    {
      icon: <LanguagesIcon className="w-8 h-8" />,
      title: "Multiple Styles",
      description: "Choose from simple, medium, or advanced complexity"
    },
    {
      icon: <ZapIcon className="w-8 h-8" />,
      title: "Instant Results",
      description: "Get paraphrased content in seconds"
    },
    {
      icon: <BarChart3Icon className="w-8 h-8" />,
      title: "Context Aware",
      description: "Maintains original context and nuance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-indigo-950 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="bg-element absolute top-32 left-20 w-48 h-48 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl" />
        <div className="bg-element absolute top-1/2 right-32 w-32 h-32 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-full blur-2xl" />
        <div className="bg-element absolute bottom-40 left-1/3 w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 paraphrase-container">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div 
              className="paraphrase-hero mb-8"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-blue-500/30 mb-6">
                <RefreshCwIcon className="w-6 h-6 text-blue-400" />
                <span className="text-blue-300 font-medium">AI Paraphraser</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 bg-clip-text text-transparent">
                  Rewrite Your Text
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
                  Keep Your Meaning
                </span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="paraphrase-subtitle text-xl lg:text-2xl text-blue-200/70 mb-8 max-w-3xl mx-auto"
            >
              Transform your content using different wording while preserving the exact meaning and context.
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
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 group"
              >
                View All Tools
                <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={handleExample}
                variant="outline"
                size="lg"
                className="px-8 py-4 glass border border-blue-500/30 text-blue-300 hover:text-blue-200 hover:bg-blue-500/10 font-semibold text-lg rounded-xl transition-all duration-300"
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
                <Card className="glass border border-blue-500/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <RefreshCwIcon className="w-6 h-6 text-blue-400" />
                    Original Text
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Textarea
                        className="input-area min-h-[250px] resize-y glass border border-blue-500/30 bg-black/40 text-white placeholder:text-blue-300/50 focus:border-blue-400 focus:ring-blue-400 text-base leading-relaxed"
                        placeholder="Paste your text to paraphrase..."
                        value={inputText}
                        onChange={(e) => {
                          setInputText(e.target.value);
                          setCharacterCount(e.target.value.length);
                        }}
                      />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-blue-300">
                          {characterCount.toLocaleString()} characters
                        </span>
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          Original
                        </Badge>
                      </div>
                    </div>

                    {/* Control Panel */}
                    <motion.div 
                      className="control-panel space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div>
                        <label className="text-sm font-medium text-blue-200 mb-2 block">
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
                        <div className="flex justify-between text-xs text-blue-300 mt-1">
                          <span>Conservative</span>
                          <span>Creative</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-blue-200 mb-2 block">
                          Complexity Level
                        </label>
                        <Select value={complexity} onValueChange={setComplexity}>
                          <SelectTrigger className="glass border border-blue-500/30 bg-black/40 text-blue-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="glass border border-blue-500/30 bg-black/90">
                            {complexityLevels.map((level) => (
                              <SelectItem key={level.value} value={level.value} className="text-blue-200 hover:bg-blue-500/10">
                                <div>
                                  <div className="font-medium">{level.label}</div>
                                  <div className="text-xs text-blue-300/60">{level.description}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>

                    <Button
                      onClick={handleTransform}
                      disabled={!inputText.trim() || isTransforming}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all duration-300"
                    >
                      {isTransforming ? (
                        <>
                          <RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" />
                          Paraphrasing...
                        </>
                      ) : (
                        <>
                          <RefreshCwIcon className="w-4 h-4 mr-2" />
                          Paraphrase Text
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
                <Card className="output-container glass border border-cyan-500/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-cyan-400" />
                    Paraphrased Output
                  </h2>
                  
                  {outputText ? (
                    <div className="space-y-4">
                      <div className="min-h-[250px] p-4 rounded-xl glass border border-cyan-500/30 bg-black/40">
                        <p className="text-white leading-relaxed">
                          {outputText}
                        </p>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button
                          onClick={handleCopy}
                          className="copy-btn flex-1 py-2 glass border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 transition-all duration-300"
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
                    <div className="min-h-[250px] flex items-center justify-center rounded-xl glass border border-cyan-500/30 bg-black/40">
                      <div className="text-center">
                        <RefreshCwIcon className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                        <p className="text-cyan-300 text-lg">
                          Your paraphrased text will appear here
                        </p>
                        <p className="text-cyan-400/60 text-sm mt-2">
                          Enter text and click paraphrase to see the transformation
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
                <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                  Advanced Paraphrasing Technology
                </span>
              </h2>
              <p className="text-xl text-blue-200/70 max-w-2xl mx-auto">
                Intelligent rewording that maintains your original meaning
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="glass rounded-xl p-6 border border-blue-500/20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
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
        <footer className="py-12 px-6 border-t border-blue-500/20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-white/60 mb-4">
              Made with ❤️ by Priyanshu Vishwakarma
            </p>
            <p className="text-white/40 text-sm">
              © 2025 Humanify AI. Professional paraphrasing for everyone.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ParaphraseLanding;
