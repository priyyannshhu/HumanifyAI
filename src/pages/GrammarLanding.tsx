import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { CheckCircleIcon, ArrowRightIcon, CopyIcon, SpellCheckIcon, BookOpenIcon, ZapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { transformText } from '@/services/advancedTransformService';
import { useToast } from '@/components/ui/use-toast';

const GrammarLanding: React.FC = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    gsap.from('.grammar-hero', { scale: 0.8, opacity: 0, duration: 1.2, ease: 'power3.out' });
  }, []);

  const handleTransform = async () => {
    if (!inputText.trim()) return;
    
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-950 to-black">
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20">
              <div className="text-white"><SpellCheckIcon className="w-8 h-8" /></div>
            </div>
          </div>
          <h1 className="grammar-hero text-6xl lg:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
              Fix Grammar Instantly
            </span>
          </h1>
          <p className="text-xl text-teal-200/70 mb-8">Perfect grammar and style with one click</p>
        </div>
      </section>
    </div>
  );
};

export default GrammarLanding;
