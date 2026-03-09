import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCwIcon } from 'lucide-react';
import ToolLayout from '@/components/tools/ToolLayout';
import ToolInput from '@/components/tools/ToolInput';
import ToolOutput from '@/components/tools/ToolOutput';
import { transformText } from '@/services/enhancedTransformService';
import { useToast } from '@/components/ui/use-toast';

const ParaphrasePage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      setIsLoading(true);
      setOutputText('');
      
      const response = await transformText({
        text: inputText,
        tool: 'paraphrase',
        maxWords: 1000
      });
      
      setOutputText(response.transformedText);
      
      toast({
        title: "Paraphrasing complete",
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
    setInputText("The rapid advancement of artificial intelligence has transformed numerous industries and continues to shape our future in unprecedented ways. Machine learning algorithms are becoming increasingly sophisticated and capable of performing complex tasks that were previously thought to be exclusive to human intelligence.");
  };

  return (
    <ToolLayout
      title="AI Paraphraser"
      description="Rewrite your text using different wording while preserving the exact meaning and maintaining original context."
      icon={<RefreshCwIcon className="w-6 h-6 text-primary" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ToolInput
          value={inputText}
          onChange={setInputText}
          placeholder="Paste your text to paraphrase..."
          maxLength={1000}
          isLoading={isLoading}
          onTransform={handleTransform}
          onClear={handleClear}
          onExample={handleExample}
          exampleText="The rapid advancement of artificial intelligence has transformed numerous industries and continues to shape our future in unprecedented ways."
        />
        
        <ToolOutput
          value={outputText}
          isLoading={isLoading}
          onRetry={handleRetry}
          toolName="Paraphraser"
        />
      </div>
    </ToolLayout>
  );
};

export default ParaphrasePage;
