import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRightIcon, ClipboardCopyIcon, SparklesIcon, RefreshCwIcon } from "lucide-react";
import { transformText } from "@/services/transformService";

const MAX_CHAR_COUNT = 1000;

const TextTransformer = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [charactersLeft, setCharactersLeft] = useState(MAX_CHAR_COUNT);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MAX_CHAR_COUNT) {
      setInputText(text);
      setCharactersLeft(MAX_CHAR_COUNT - text.length);
    }
  };

  const handleCopyToClipboard = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied to clipboard",
        description: "The transformed text has been copied to your clipboard.",
      });
    }
  };

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
      
      // Call the real API service
      const response = await transformText({
        text: inputText,
        maxWords: 1000
      });
      
      setOutputText(response.transformedText);
      
      toast({
        title: "Transformation complete",
        description: "Your text has been successfully transformed.",
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

  return (
    <Card className="w-full max-w-4xl p-6 shadow-2xl glass border border-white/20 rounded-2xl animate-fadein glow-purple">
      <Tabs defaultValue="transform" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 glass-purple border border-white/10">
          <TabsTrigger 
            value="transform" 
            className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white"
          >
            Humanize Text
          </TabsTrigger>
          <TabsTrigger 
            value="about"
            className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white"
          >
            About Humanify AI Humanizer
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="transform" className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="input-text" className="text-sm font-medium text-white/90">
                Input Text (AI-generated)
              </label>
              <span className={`text-xs ${charactersLeft < 100 ? 'text-destructive' : 'text-white/60'}`}>
                {charactersLeft} characters left
              </span>
            </div>
            <Textarea
              id="input-text"
              placeholder="Paste your AI-generated text here..."
              className="min-h-[150px] resize-y glass-pink border border-white/20 bg-black/20 text-white placeholder:text-white/50 focus:border-primary focus:ring-primary"
              value={inputText}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleTransform}
              disabled={isLoading || !inputText.trim()}
              className="relative overflow-hidden group transition-all bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 glow-pink hover:glow-purple"
            >
              {isLoading ? (
                <>
                  <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                  Transforming...
                </>
              ) : (
                <>
                  <span className="relative z-10 flex items-center">
                    Transform 
                    <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <SparklesIcon className="ml-2 h-4 w-4 opacity-70" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </>
              )}
            </Button>
          </div>

          {outputText && (
            <div className="space-y-2 animate-fadein">
              <div className="flex justify-between items-center">
                <label htmlFor="output-text" className="text-sm font-medium text-white/90">
                  Transformed Text (Human-like)
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyToClipboard}
                  className="flex items-center gap-1 text-xs glass-purple border border-white/20 text-white/90 hover:bg-primary/20 hover:border-primary hover:text-white"
                >
                  <ClipboardCopyIcon className="h-3 w-3" />
                  Copy
                </Button>
              </div>
              <Textarea
                id="output-text"
                className="min-h-[150px] resize-y glass-purple border border-white/20 bg-black/30 text-white"
                value={outputText}
                readOnly
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="about">
          <div className="prose prose-sm max-w-none">
            <h3 className="text-lg font-semibold mb-2 text-white">What It Does</h3>
            <p className="text-white/80 mb-4">
Turn your AI-generated text into content that resonates. Our Humanify AI Humanizer Free tool uses advanced AI to transform robotic, generic content into a natural, engaging human voice. It keeps your original meaning and intent while making the text warm, conversational, and fully authentic with 0% AI detection.
            </p>
            
            <h3 className="text-lg font-semibold mb-2 text-white">Features</h3>
            <ul className="list-disc list-inside space-y-1 text-white/80 mb-4">
              <li>Retains meaning while making text sound natural and human</li>
              <li>Structural formatting fully maintained</li>
              <li>Enhances flow with conversational, engaging language</li>
              <li>Humanize 1000 characters instantly, at no cost</li>

              <li className="text-primary">Produces content with 0% AI detection score on leading detectors</li>
              <li>Get instant results powered by cutting-edge AI technology</li>
            </ul>
            
            <h3 className="text-lg font-semibold mb-2 text-white">How to Use It Best</h3>
            <p className="text-white/80">
For the most natural output, paste complete sentences or structured paragraphs. Clear grammar and intent help the AI produce the best results.            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default TextTransformer;