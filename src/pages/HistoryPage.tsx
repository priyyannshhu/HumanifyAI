import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HistoryIcon, 
  Trash2Icon, 
  CopyIcon, 
  SearchIcon,
  FilterIcon,
  CalendarIcon,
  SparklesIcon,
  RefreshCwIcon,
  PaletteIcon,
  ZapIcon,
  FileTextIcon,
  CheckCircleIcon
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { getHistory, deleteHistoryItem, clearHistory, HistoryItem } from '@/services/enhancedTransformService';
import { useToast } from '@/components/ui/use-toast';

const toolIcons: Record<string, React.ReactNode> = {
  humanize: <SparklesIcon className="w-4 h-4" />,
  paraphrase: <RefreshCwIcon className="w-4 h-4" />,
  tone: <PaletteIcon className="w-4 h-4" />,
  simplify: <ZapIcon className="w-4 h-4" />,
  summarize: <FileTextIcon className="w-4 h-4" />,
  grammar: <CheckCircleIcon className="w-4 h-4" />,
};

const toolColors: Record<string, string> = {
  humanize: 'from-primary to-accent',
  paraphrase: 'from-blue-500 to-purple-500',
  tone: 'from-green-500 to-teal-500',
  simplify: 'from-orange-500 to-red-500',
  summarize: 'from-pink-500 to-rose-500',
  grammar: 'from-indigo-500 to-purple-500',
};

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTool, setFilterTool] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    filterHistory();
  }, [history, searchTerm, filterTool]);

  const loadHistory = () => {
    const historyData = getHistory();
    setHistory(historyData);
  };

  const filterHistory = () => {
    let filtered = history;

    if (filterTool !== 'all') {
      filtered = filtered.filter(item => item.toolUsed === filterTool);
    }

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.inputText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.outputText.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredHistory(filtered);
  };

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: `${type} text has been copied.`,
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy text.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteHistoryItem(id);
    loadHistory();
    toast({
      title: "Deleted",
      description: "History item has been deleted.",
    });
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
      clearHistory();
      loadHistory();
      toast({
        title: "History cleared",
        description: "All history has been deleted.",
      });
    }
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                History
              </span>
            </h1>
            <p className="text-lg text-white/70">
              View and manage your AI transformation history.
            </p>
          </div>
          
          {history.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="glass-pink border border-white/20 text-white/80 hover:text-white hover:bg-white/10"
            >
              <Trash2Icon className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="glass p-6 border border-white/20">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  placeholder="Search history..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass-purple border border-white/20 bg-black/30 text-white placeholder:text-white/40"
                />
              </div>

              {/* Filter */}
              <div className="lg:w-48">
                <Select value={filterTool} onValueChange={setFilterTool}>
                  <SelectTrigger className="glass-purple border border-white/20 bg-black/30 text-white">
                    <FilterIcon className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass border border-white/20 bg-black/90">
                    <SelectItem value="all">All Tools</SelectItem>
                    <SelectItem value="humanize">Humanize</SelectItem>
                    <SelectItem value="paraphrase">Paraphrase</SelectItem>
                    <SelectItem value="tone">Tone Changer</SelectItem>
                    <SelectItem value="simplify">Simplify</SelectItem>
                    <SelectItem value="summarize">Summarize</SelectItem>
                    <SelectItem value="grammar">Grammar Fix</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* History List */}
        <AnimatePresence mode="wait">
          {filteredHistory.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <HistoryIcon className="w-16 h-16 mx-auto mb-4 text-white/20" />
              <h3 className="text-xl font-semibold text-white mb-2">No history found</h3>
              <p className="text-white/60">
                {history.length === 0 
                  ? "Start transforming text to see your history here."
                  : "Try adjusting your search or filter criteria."
                }
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredHistory.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="glass border border-white/20 overflow-hidden hover:border-white/40 transition-all duration-300">
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${toolColors[item.toolUsed]}`}>
                            {toolIcons[item.toolUsed]}
                          </div>
                          <div>
                            <Badge className={`mb-1 bg-gradient-to-r ${toolColors[item.toolUsed]} border-0`}>
                              {item.toolUsed.charAt(0).toUpperCase() + item.toolUsed.slice(1)}
                            </Badge>
                            <div className="flex items-center gap-2 text-sm text-white/60">
                              <CalendarIcon className="w-3 h-3" />
                              {formatDate(item.date)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(item.outputText, 'Output')}
                            className="text-white/60 hover:text-white hover:bg-white/10"
                          >
                            <CopyIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2Icon className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        {/* Input */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white/80">Input Text</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopy(item.inputText, 'Input')}
                              className="text-xs text-white/40 hover:text-white/60"
                            >
                              <CopyIcon className="w-3 h-3 mr-1" />
                              Copy
                            </Button>
                          </div>
                          <div className="p-3 rounded-lg glass-pink border border-white/10">
                            <p className="text-white/80 text-sm">
                              {expandedItems.has(item.id) 
                                ? item.inputText 
                                : truncateText(item.inputText, 150)
                              }
                            </p>
                            {item.inputText.length > 150 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleExpand(item.id)}
                                className="mt-2 text-xs text-primary hover:text-primary/80"
                              >
                                {expandedItems.has(item.id) ? 'Show less' : 'Show more'}
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Output */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white/80">Output Text</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-green-400">
                                {item.outputText.length} chars
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopy(item.outputText, 'Output')}
                                className="text-xs text-white/40 hover:text-white/60"
                              >
                                <CopyIcon className="w-3 h-3 mr-1" />
                                Copy
                              </Button>
                            </div>
                          </div>
                          <div className="p-3 rounded-lg glass-purple border border-white/10">
                            <p className="text-white/80 text-sm">
                              {expandedItems.has(item.id) 
                                ? item.outputText 
                                : truncateText(item.outputText, 150)
                              }
                            </p>
                            {item.outputText.length > 150 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleExpand(item.id)}
                                className="mt-2 text-xs text-primary hover:text-primary/80"
                              >
                                {expandedItems.has(item.id) ? 'Show less' : 'Show more'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HistoryPage;
