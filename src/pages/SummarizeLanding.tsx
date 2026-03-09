import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileTextIcon, ArrowRightIcon, CopyIcon, BarChart3Icon, ClockIcon, TargetIcon, ZapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { transformText } from '@/services/advancedTransformService';
import { useToast } from '@/components/ui/use-toast';

gsap.registerPlugin(ScrollTrigger);

const SummarizeLanding: React.FC = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
  const [summaryLength, setSummaryLength] = useState(30);
  const [focus, setFocus] = useState('balanced');
  const { toast } = useToast();

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from('.summarize-hero', { scale: 0.8, opacity: 0, duration: 1.2, ease: 'power3.out' });
    return () => tl.kill();
  }, []);

  const handleTransform = async () => {
    if (!inputText.trim()) return;
    
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-950 to-black">
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="summarize-hero text-6xl lg:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Summarize Any Text
            </span>
          </h1>
          <p className="text-xl text-amber-200/70 mb-8">Extract key points and create concise summaries</p>
        </div>
      </section>
    </div>
  );
};

export default SummarizeLanding;
