import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileTextIcon } from 'lucide-react';
import ToolLayout from '@/components/tools/ToolLayout';
import ToolInput from '@/components/tools/ToolInput';
import ToolOutput from '@/components/tools/ToolOutput';
import { transformText } from '@/services/enhancedTransformService';
import { useToast } from '@/components/ui/use-toast';

const SummarizePage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTransform = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter some text to summarize.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setOutputText('');
      
      const response = await transformText({
        text: inputText,
        tool: 'summarize',
        maxWords: 300
      });
      
      setOutputText(response.transformedText);
      
      toast({
        title: "Summarization complete",
        description: "Your text has been successfully summarized.",
      });
    } catch (error) {
      console.error("Error summarizing text:", error);
      toast({
        title: "Error",
        description: "There was an error summarizing your text. Please try again.",
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
    setInputText("Climate change represents one of the most significant challenges facing humanity in the 21st century. The scientific consensus is clear: human activities, particularly the burning of fossil fuels and deforestation, have led to unprecedented increases in greenhouse gas concentrations. These gases trap heat in the atmosphere, causing global temperatures to rise. The consequences are far-reaching and include rising sea levels, more frequent and severe weather events, disruptions to agriculture, threats to biodiversity, and increased health risks. Addressing this crisis requires urgent and coordinated action at the global, national, and individual levels. Solutions include transitioning to renewable energy sources, improving energy efficiency, adopting sustainable agricultural practices, protecting forests, and investing in climate adaptation measures. The cost of inaction far outweighs the investments needed to mitigate climate change's worst impacts.");
  };

  return (
    <ToolLayout
      title="AI Summarizer"
      description="Extract key points and create concise summaries that capture the essence of your text."
      icon={<FileTextIcon className="w-6 h-6 text-primary" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ToolInput
          value={inputText}
          onChange={setInputText}
          placeholder="Paste your long text to summarize..."
          maxLength={2000}
          isLoading={isLoading}
          onTransform={handleTransform}
          onClear={handleClear}
          onExample={handleExample}
          exampleText="Climate change represents one of the most significant challenges facing humanity in the 21st century..."
        />
        
        <ToolOutput
          value={outputText}
          isLoading={isLoading}
          onRetry={handleRetry}
          toolName="Summarizer"
        />
      </div>
    </ToolLayout>
  );
};

export default SummarizePage;
