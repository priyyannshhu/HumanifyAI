import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ZapIcon } from 'lucide-react';
import ToolLayout from '@/components/tools/ToolLayout';
import ToolInput from '@/components/tools/ToolInput';
import ToolOutput from '@/components/tools/ToolOutput';
import { transformText } from '@/services/enhancedTransformService';
import { useToast } from '@/components/ui/use-toast';

const SimplifyPage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      setIsLoading(true);
      setOutputText('');
      
      const response = await transformText({
        text: inputText,
        tool: 'simplify',
        maxWords: 1000
      });
      
      setOutputText(response.transformedText);
      
      toast({
        title: "Simplification complete",
        description: "Your text has been simplified for better understanding.",
      });
    } catch (error) {
      console.error("Error simplifying text:", error);
      toast({
        title: "Error",
        description: "There was an error simplifying your text. Please try again.",
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
    setInputText("The implementation of sophisticated machine learning algorithms necessitates comprehensive data preprocessing methodologies to ensure optimal performance metrics and mitigate the potential for algorithmic bias in predictive modeling scenarios.");
  };

  return (
    <ToolLayout
      title="AI Simplifier"
      description="Convert complex text into simple, easy-to-understand language that anyone can comprehend."
      icon={<ZapIcon className="w-6 h-6 text-primary" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ToolInput
          value={inputText}
          onChange={setInputText}
          placeholder="Paste your complex text here..."
          maxLength={1000}
          isLoading={isLoading}
          onTransform={handleTransform}
          onClear={handleClear}
          onExample={handleExample}
          exampleText="The implementation of sophisticated machine learning algorithms necessitates comprehensive data preprocessing methodologies."
        />
        
        <ToolOutput
          value={outputText}
          isLoading={isLoading}
          onRetry={handleRetry}
          toolName="Simplifier"
        />
      </div>
    </ToolLayout>
  );
};

export default SimplifyPage;
