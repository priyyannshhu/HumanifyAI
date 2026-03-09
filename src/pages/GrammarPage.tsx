import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from 'lucide-react';
import ToolLayout from '@/components/tools/ToolLayout';
import ToolInput from '@/components/tools/ToolInput';
import ToolOutput from '@/components/tools/ToolOutput';
import { transformText } from '@/services/enhancedTransformService';
import { useToast } from '@/components/ui/use-toast';

const GrammarPage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTransform = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter some text to check and fix.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setOutputText('');
      
      const response = await transformText({
        text: inputText,
        tool: 'grammar',
        maxWords: 1000
      });
      
      setOutputText(response.transformedText);
      
      toast({
        title: "Grammar check complete",
        description: "Your text has been corrected and improved.",
      });
    } catch (error) {
      console.error("Error fixing grammar:", error);
      toast({
        title: "Error",
        description: "There was an error checking your grammar. Please try again.",
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
    setInputText("Their going to the store to buy some groceries, but they forgot there wallet at home. The weather was nice so they decided to walk instead of drive. It's important to remember bring your wallet when you go shopping.");
  };

  return (
    <ToolLayout
      title="AI Grammar Fixer"
      description="Correct grammar, spelling, and punctuation errors while improving readability and flow."
      icon={<CheckCircleIcon className="w-6 h-6 text-primary" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ToolInput
          value={inputText}
          onChange={setInputText}
          placeholder="Paste your text with grammar errors..."
          maxLength={1000}
          isLoading={isLoading}
          onTransform={handleTransform}
          onClear={handleClear}
          onExample={handleExample}
          exampleText="Their going to the store to buy some groceries, but they forgot there wallet at home."
        />
        
        <ToolOutput
          value={outputText}
          isLoading={isLoading}
          onRetry={handleRetry}
          toolName="Grammar Fixer"
        />
      </div>
    </ToolLayout>
  );
};

export default GrammarPage;
