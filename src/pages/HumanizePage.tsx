import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon } from 'lucide-react';
import ToolLayout from '@/components/tools/ToolLayout';
import ToolInput from '@/components/tools/ToolInput';
import ToolOutput from '@/components/tools/ToolOutput';
import { transformText } from '@/services/enhancedTransformService';
import { useToast } from '@/components/ui/use-toast';

const HumanizePage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      setIsLoading(true);
      setOutputText('');
      
      const response = await transformText({
        text: inputText,
        tool: 'humanize',
        maxWords: 1000
      });
      
      setOutputText(response.transformedText);
      
      toast({
        title: "Transformation complete",
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
    setInputText("This is an example of AI-generated text that sounds robotic and unnatural. The text contains repetitive patterns and formal language that lacks human warmth and personality. AI writing often uses perfect grammar and predictable sentence structures that make it easily detectable by AI detection tools.");
  };

  return (
    <ToolLayout
      title="Humanize AI Text"
      description="Transform robotic AI-generated text into natural, human-like writing that bypasses AI detection."
      icon={<SparklesIcon className="w-6 h-6 text-primary" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ToolInput
          value={inputText}
          onChange={setInputText}
          placeholder="Paste your AI-generated text here..."
          maxLength={1000}
          isLoading={isLoading}
          onTransform={handleTransform}
          onClear={handleClear}
          onExample={handleExample}
          exampleText="This is an example of AI-generated text that sounds robotic and unnatural. The text contains repetitive patterns and formal language that lacks human warmth and personality."
        />
        
        <ToolOutput
          value={outputText}
          isLoading={isLoading}
          onRetry={handleRetry}
          toolName="Humanizer"
        />
      </div>
    </ToolLayout>
  );
};

export default HumanizePage;
