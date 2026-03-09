import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PaletteIcon } from 'lucide-react';
import ToolLayout from '@/components/tools/ToolLayout';
import ToolInput from '@/components/tools/ToolInput';
import ToolOutput from '@/components/tools/ToolOutput';
import { transformText } from '@/services/enhancedTransformService';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TonePage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedTone, setSelectedTone] = useState<'friendly' | 'professional' | 'casual' | 'academic'>('professional');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTransform = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter some text to change the tone.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setOutputText('');
      
      const response = await transformText({
        text: inputText,
        tool: 'tone',
        tone: selectedTone,
        maxWords: 1000
      });
      
      setOutputText(response.transformedText);
      
      toast({
        title: "Tone changed successfully",
        description: `Your text has been converted to ${selectedTone} tone.`,
      });
    } catch (error) {
      console.error("Error changing tone:", error);
      toast({
        title: "Error",
        description: "There was an error changing the tone. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    handleTransform();
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const handleExample = () => {
    setInputText("The meeting has been scheduled for next Tuesday at 3 PM. Please ensure all participants are present on time as we have important topics to discuss regarding the project timeline and deliverables.");
  };

  const tones = [
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
    { value: 'professional', label: 'Professional', description: 'Formal and business-like' },
    { value: 'casual', label: 'Casual', description: 'Relaxed and informal' },
    { value: 'academic', label: 'Academic', description: 'Scholarly and formal' },
  ];

  return (
    <ToolLayout
      title="AI Tone Changer"
      description="Transform your text to match any desired tone while preserving the original meaning and context."
      icon={<PaletteIcon className="w-6 h-6 text-primary" />}
    >
      {/* Tone Selector */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="glass-pink rounded-2xl p-6 border border-white/20">
          <label className="block text-sm font-medium text-white mb-3">Select Tone</label>
          <Select value={selectedTone} onValueChange={(value: any) => setSelectedTone(value)}>
            <SelectTrigger className="glass-purple border border-white/20 bg-black/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass border border-white/20 bg-black/90">
              {tones.map((tone) => (
                <SelectItem key={tone.value} value={tone.value} className="text-white hover:bg-white/10">
                  <div>
                    <div className="font-medium">{tone.label}</div>
                    <div className="text-xs text-white/60">{tone.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ToolInput
          value={inputText}
          onChange={setInputText}
          placeholder="Paste your text to change the tone..."
          maxLength={1000}
          isLoading={isLoading}
          onTransform={handleTransform}
          onClear={handleClear}
          onExample={handleExample}
          exampleText="The meeting has been scheduled for next Tuesday at 3 PM. Please ensure all participants are present on time."
        />
        
        <ToolOutput
          value={outputText}
          isLoading={isLoading}
          onRetry={handleRetry}
          toolName="Tone Changer"
        />
      </div>
    </ToolLayout>
  );
};

export default TonePage;
