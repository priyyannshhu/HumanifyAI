import React from 'react';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  SparklesIcon, 
  Trash2Icon, 
  LightbulbIcon,
  CopyIcon 
} from 'lucide-react';

interface ToolInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  maxLength?: number;
  isLoading?: boolean;
  onTransform?: () => void;
  onClear?: () => void;
  onExample?: () => void;
  showExample?: boolean;
  exampleText?: string;
}

const ToolInput: React.FC<ToolInputProps> = ({
  value,
  onChange,
  placeholder,
  maxLength = 1000,
  isLoading = false,
  onTransform,
  onClear,
  onExample,
  showExample = true,
  exampleText = "This is an example of AI-generated text that sounds robotic and unnatural. The text contains repetitive patterns and formal language that lacks human warmth and personality."
}) => {
  const charactersLeft = maxLength - value.length;
  const isNearLimit = charactersLeft < 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">Input Text</h3>
          {showExample && (
            <Badge variant="secondary" className="text-xs">
              AI-generated
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${isNearLimit ? 'text-destructive' : 'text-white/60'}`}>
            {charactersLeft} chars left
          </span>
          {value && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <Trash2Icon className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Textarea */}
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="min-h-[200px] resize-y glass-pink border border-white/20 bg-black/30 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary text-base leading-relaxed"
          disabled={isLoading}
        />
        
        {/* Character count indicator */}
        <div className="absolute bottom-3 right-3">
          <div className={`px-2 py-1 rounded-full text-xs ${
            isNearLimit 
              ? 'bg-destructive/20 text-destructive border border-destructive/30' 
              : 'bg-white/10 text-white/60 border border-white/20'
          }`}>
            {value.length} / {maxLength}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        {showExample && (
          <Button
            variant="outline"
            size="sm"
            onClick={onExample}
            disabled={isLoading}
            className="glass-purple border border-white/20 text-white/80 hover:text-white hover:bg-white/10"
          >
            <LightbulbIcon className="w-4 h-4 mr-2" />
            Load Example
          </Button>
        )}

        <Button
          onClick={onTransform}
          disabled={!value.trim() || isLoading || charactersLeft < 0}
          className="relative overflow-hidden group bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 glow-purple hover:glow-pink transition-all duration-300"
        >
          <motion.div
            className="flex items-center"
            animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
          >
            {isLoading ? (
              <>
                <SparklesIcon className="w-4 h-4 mr-2" />
                Transforming...
              </>
            ) : (
              <>
                <SparklesIcon className="w-4 h-4 mr-2" />
                Transform Text
              </>
            )}
          </motion.div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </Button>
      </div>

      {/* Example text preview */}
      {showExample && !value && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl glass-pink border border-white/10"
        >
          <p className="text-xs text-white/60 mb-2">Example text to transform:</p>
          <p className="text-sm text-white/80 italic">
            "{exampleText}"
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ToolInput;
