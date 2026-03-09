import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  SparklesIcon, 
  ArrowRightIcon,
  ZapIcon,
  BrainIcon,
  CheckCircleIcon,
  UsersIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <SparklesIcon className="w-6 h-6" />,
      title: "AI Humanizer",
      description: "Transform robotic AI text into natural, human-like writing that bypasses AI detection.",
      color: "from-primary to-accent"
    },
    {
      icon: <ZapIcon className="w-6 h-6" />,
      title: "Paraphrasing",
      description: "Rewrite content using different wording while preserving the exact meaning.",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: <BrainIcon className="w-6 h-6" />,
      title: "Tone Control",
      description: "Adjust the tone of your text to match any desired style or audience.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <CheckCircleIcon className="w-6 h-6" />,
      title: "Grammar Fix",
      description: "Correct grammar and improve readability without changing the meaning.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { value: "10K+", label: "Active Users", icon: <UsersIcon className="w-5 h-5" /> },
    { value: "100K+", label: "Texts Transformed", icon: <SparklesIcon className="w-5 h-5" /> },
    { value: "0%", label: "AI Detection", icon: <CheckCircleIcon className="w-5 h-5" /> },
    { value: "24/7", label: "Availability", icon: <ZapIcon className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black/95 to-black">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-3/4 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-purple border border-white/20 mb-6">
                <SparklesIcon className="w-4 h-4 text-primary" />
                <span className="text-white/80 text-sm">Powered by Advanced AI</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Make AI Writing
                </span>
                <br />
                <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                  Sound Human
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform robotic AI-generated text into natural, engaging content that bypasses AI detection and resonates with real people.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  onClick={() => navigate('/dashboard')}
                  size="lg"
                  className="px-8 py-4 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold text-lg rounded-xl transition-all duration-300 group"
                >
                  Get Started Free
                  <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button
                  onClick={() => navigate('/humanize')}
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 glass-purple border border-white/20 text-white/80 hover:text-white hover:bg-white/10 font-semibold text-lg rounded-xl transition-all duration-300"
                >
                  Try Demo
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-pink rounded-xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
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
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AI Writing Suite
                </span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Everything you need to transform and improve your writing in one powerful platform.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group cursor-pointer"
                  onClick={() => navigate('/dashboard')}
                >
                  <Card className="glass h-full p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4 inline-block`}>
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-white/60 leading-relaxed">{feature.description}</p>
                    <div className={`mt-4 h-0.5 bg-gradient-to-r ${feature.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </Card>
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
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Writing?
                </h2>
                <p className="text-xl text-white/70 mb-8">
                  Join thousands of users who are already creating better content with Humanify AI.
                </p>
                <Button
                  onClick={() => navigate('/dashboard')}
                  size="lg"
                  className="px-8 py-4 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold text-lg rounded-xl transition-all duration-300"
                >
                  Start Writing Better
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-white/60 mb-4">
              Made with ❤️ by Priyanshu Vishwakarma
            </p>
            <p className="text-white/40 text-sm">
              2025 Humanify AI Suite. Transform your writing, transform your impact.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;