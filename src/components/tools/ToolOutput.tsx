import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  CopyIcon, 
  CheckIcon, 
  DownloadIcon,
  Share2Icon,
  RefreshCwIcon 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ToolOutputProps {
  value: string;
  isLoading?: boolean;
  onRetry?: () => void;
  showRetry?: boolean;
  toolName?: string;
}

const ToolOutput: React.FC<ToolOutputProps> = ({
  value,
  isLoading = false,
  onRetry,
  showRetry = true,
  toolName = "AI"
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    if (!value) return;
    
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The transformed text has been copied to your clipboard.",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (!value) return;
    
    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${toolName.toLowerCase()}-transformed-text.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded",
      description: "Text has been downloaded as a file.",
    });
  };

  const handleShare = async () => {
    if (!value) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${toolName} Transformed Text`,
          text: value,
        });
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback to copying
      handleCopy();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Transformed Text</h3>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs">
            Human-like
          </span>
          {value && (
            <span className="text-sm text-white/60">
              {value.length} chars
            </span>
          )}
        </div>
      </div>

      {/* Output area */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[200px] glass-purple border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent mb-4"
            />
            <p className="text-white/60 animate-pulse">
              {toolName} is transforming your text...
            </p>
          </motion.div>
        ) : value ? (
          <motion.div
            key="output"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-purple border border-white/20 bg-black/30 overflow-hidden">
              <Textarea
                value={value}
                readOnly
                className="min-h-[200px] resize-none border-0 bg-transparent text-white placeholder:text-white/40 focus:ring-0 text-base leading-relaxed"
              />
              
              {/* Action bar */}
              <div className="flex items-center justify-between p-4 border-t border-white/10 bg-black/20">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <CheckIcon className="w-4 h-4 text-green-400" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <CopyIcon className="w-4 h-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="text-xs">
                      {copied ? 'Copied!' : 'Copy'}
                    </span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDownload}
                    className="text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    <span className="text-xs ml-1">Download</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Share2Icon className="w-4 h-4" />
                    <span className="text-xs ml-1">Share</span>
                  </Button>
                </div>

                {showRetry && onRetry && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onRetry}
                    className="glass-purple border border-white/20 text-white/80 hover:text-white hover:bg-white/10"
                  >
                    <RefreshCwIcon className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[200px] glass-purple border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <p className="text-white/60 mb-2">No transformed text yet</p>
            <p className="text-sm text-white/40">
              Enter your text above and click transform to see the magic happen
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ToolOutput;
