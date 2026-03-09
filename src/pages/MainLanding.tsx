import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  SparklesIcon, 
  ArrowRightIcon,
  ZapIcon,
  BrainIcon,
  CheckCircleIcon,
  UsersIcon,
  RefreshCwIcon,
  PaletteIcon,
  BookOpenIcon,
  FileTextIcon,
  SpellCheckIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

gsap.registerPlugin(ScrollTrigger);

const MainLanding: React.FC = () => {
  const navigate = useNavigate();

  const tools = [
    {
      icon: <SparklesIcon className="w-8 h-8" />,
      title: "AI Humanizer",
      description: "Transform robotic AI text into natural, human-like writing",
      path: "/humanize",
      color: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-950 via-purple-900 to-black"
    },
    {
      icon: <RefreshCwIcon className="w-8 h-8" />,
      title: "Paraphraser",
      description: "Rewrite content using different wording while preserving meaning",
      path: "/paraphrase",
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-950 via-blue-900 to-black"
    },
    {
      icon: <PaletteIcon className="w-8 h-8" />,
      title: "Tone Changer",
      description: "Adjust the tone of your text to match any audience or style",
      path: "/tone",
      color: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-950 via-pink-900 to-black"
    },
    {
      icon: <BookOpenIcon className="w-8 h-8" />,
      title: "Simplifier",
      description: "Convert complex text into clear, easy-to-understand language",
      path: "/simplify",
      color: "from-green-500 to-emerald-500",
      bgGradient: "from-emerald-950 via-green-900 to-black"
    },
    {
      icon: <FileTextIcon className="w-8 h-8" />,
      title: "Summarizer",
      description: "Extract key points and create concise summaries instantly",
      path: "/summarize",
      color: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-950 via-orange-900 to-black"
    },
    {
      icon: <SpellCheckIcon className="w-8 h-8" />,
      title: "Grammar Fix",
      description: "Correct grammar, spelling, and improve writing quality",
      path: "/grammar",
      color: "from-teal-500 to-cyan-500",
      bgGradient: "from-teal-950 via-cyan-900 to-black"
    }
  ];

  useEffect(() => {
    // Clean up any existing animations first
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.killTweensOf("*");

    // GSAP timeline for hero section
    const tl = gsap.timeline();
    
    tl.from('.main-title', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out'
    })
    .from('.main-subtitle', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.3
    })
    .from('.hero-buttons', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.5
    });

    // Tool cards entrance animation - only run once
    const toolCardsAnimation = gsap.from('.tool-card', {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.tools-grid',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          // Ensure elements are visible when animation starts
          gsap.set('.tool-card', { opacity: 1 });
        }
      }
    });

    // Parallax effect for background elements
    const parallaxAnimation = gsap.to('.bg-element', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.main-container',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    return () => {
      // Proper cleanup
      toolCardsAnimation.kill();
      parallaxAnimation.scrollTrigger?.kill();
      parallaxAnimation.kill();
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden main-container">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="bg-element absolute top-20 left-16 w-48 h-48 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="bg-element absolute top-1/3 right-24 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl" />
        <div className="bg-element absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-2xl" />
        <div className="bg-element absolute top-1/2 left-1/2 w-36 h-36 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div 
              className="main-title mb-8"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-white/20 mb-6">
                <SparklesIcon className="w-6 h-6 text-white" />
                <span className="text-white font-medium">Advanced AI Tools</span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  Transform Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                  Writing Instantly
                </span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="main-subtitle text-xl lg:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Professional AI-powered writing tools that help you create, transform, and perfect your content. 
              All features are completely free - no limits, no subscriptions.
            </motion.p>
            
            <motion.div 
              className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-16"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={() => {
                  const firstTool = tools[0];
                  navigate(firstTool.path);
                }}
                size="lg"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 group"
              >
                Try AI Humanizer
                <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={() => {
                  const element = document.querySelector('.tools-grid');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="outline"
                size="lg"
                className="px-8 py-4 glass border border-white/20 text-white/80 hover:text-white hover:bg-white/10 font-semibold text-lg rounded-xl transition-all duration-300"
              >
                View All Tools
              </Button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: "6", label: "AI Tools", icon: <SparklesIcon className="w-5 h-5" /> },
                { value: "100%", label: "Free", icon: <CheckCircleIcon className="w-5 h-5" /> },
                { value: "∞", label: "No Limits", icon: <ZapIcon className="w-5 h-5" /> },
                { value: "24/7", label: "Available", icon: <UsersIcon className="w-5 h-5" /> }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-6 border border-white/20"
                >
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-20 px-6 tools-grid">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Professional AI Writing Suite
                </span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Every tool you need to create, transform, and perfect your writing
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  className="tool-card cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  onClick={() => navigate(tool.path)}
                >
                  <Card className={`h-full p-6 glass border border-white/20 hover:border-white/40 transition-all duration-300 bg-gradient-to-br ${tool.bgGradient}`}>
                    <div className="flex items-center justify-center mb-4">
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${tool.color}`}>
                        <div className="text-white">{tool.icon}</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{tool.title}</h3>
                    <p className="text-white/60 leading-relaxed mb-4">{tool.description}</p>
                    <div className="flex items-center justify-center">
                      <Button
                        variant="ghost"
                        className="text-white/80 hover:text-white hover:bg-white/10"
                      >
                        Try Now
                        <ArrowRightIcon className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
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
                <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Why Choose Our AI Tools?
                </span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Advanced technology with unlimited access for everyone
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <ZapIcon className="w-8 h-8" />,
                  title: "Lightning Fast",
                  description: "Get results in seconds with optimized AI processing"
                },
                {
                  icon: <BrainIcon className="w-8 h-8" />,
                  title: "Smart AI",
                  description: "Advanced algorithms understand context and nuance"
                },
                {
                  icon: <CheckCircleIcon className="w-8 h-8" />,
                  title: "High Quality",
                  description: "Professional-grade results every time"
                },
                {
                  icon: <UsersIcon className="w-8 h-8" />,
                  title: "User Friendly",
                  description: "Simple interface with powerful features"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="glass rounded-xl p-6 border border-white/20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-white/20 to-gray-200/20">
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

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-gradient rounded-3xl p-12 text-center border border-white/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Writing?
                </h2>
                <p className="text-xl text-white/70 mb-8">
                  All tools are completely free with no limits. Start creating better content today.
                </p>
                <Button
                  onClick={() => navigate('/humanize')}
                  size="lg"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg rounded-xl transition-all duration-300"
                >
                  Start Writing Better
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-white/60 mb-4">
              Made with ❤️ by Priyanshu Vishwakarma
            </p>
            <p className="text-white/40 text-sm">
              © 2025 Humanify AI. Advanced AI tools for everyone, completely free.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLanding;