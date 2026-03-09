import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  SettingsIcon, 
  UserIcon, 
  BellIcon, 
  ShieldIcon, 
  PaletteIcon,
  GlobeIcon,
  ZapIcon,
  CreditCardIcon,
  HelpCircleIcon,
  LogOutIcon,
  MailIcon,
  GithubIcon,
  TwitterIcon
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [language, setLanguage] = useState('en');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved settings
    const savedSettings = localStorage.getItem('humanify-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setDarkMode(settings.darkMode ?? true);
      setNotifications(settings.notifications ?? true);
      setAutoSave(settings.autoSave ?? true);
      setLanguage(settings.language ?? 'en');
    }
    
    // Load API key
    const savedApiKey = localStorage.getItem('humanify-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const saveSettings = () => {
    const settings = {
      darkMode,
      notifications,
      autoSave,
      language
    };
    localStorage.setItem('humanify-settings', JSON.stringify(settings));
    
    if (apiKey) {
      localStorage.setItem('humanify-api-key', apiKey);
    }
    
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear user data
      localStorage.removeItem('humanify-settings');
      localStorage.removeItem('humanify-api-key');
      localStorage.removeItem('humanify-history');
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      // Redirect to home
      window.location.href = '/';
    }
  };

  const settingsSections = [
    {
      title: 'General',
      icon: <SettingsIcon className="w-5 h-5" />,
      items: [
        {
          label: 'Dark Mode',
          description: 'Use dark theme across the application',
          control: (
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          )
        },
        {
          label: 'Language',
          description: 'Choose your preferred language',
          control: (
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-40 glass-purple border border-white/20 bg-black/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass border border-white/20 bg-black/90">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
          )
        }
      ]
    },
    {
      title: 'Preferences',
      icon: <UserIcon className="w-5 h-5" />,
      items: [
        {
          label: 'Notifications',
          description: 'Receive notifications about updates and features',
          control: (
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          )
        },
        {
          label: 'Auto-save History',
          description: 'Automatically save transformation history',
          control: (
            <Switch
              checked={autoSave}
              onCheckedChange={setAutoSave}
            />
          )
        }
      ]
    },
    {
      title: 'API Configuration',
      icon: <ShieldIcon className="w-5 h-5" />,
      items: [
        {
          label: 'Gemini API Key',
          description: 'Your Google Gemini API key for transformations',
          control: (
            <div className="flex items-center gap-2">
              <Input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="w-64 glass-purple border border-white/20 bg-black/30 text-white"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowApiKey(!showApiKey)}
                className="text-white/60 hover:text-white"
              >
                {showApiKey ? 'Hide' : 'Show'}
              </Button>
            </div>
          )
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Settings
            </span>
          </h1>
          <p className="text-lg text-white/70">
            Manage your account settings and preferences.
          </p>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <Card className="glass border border-white/20 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20">
                      {section.icon}
                    </div>
                    <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {section.items.map((item, itemIndex) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <Label className="text-white font-medium">{item.label}</Label>
                            <p className="text-white/60 text-sm mt-1">{item.description}</p>
                          </div>
                          <div className="ml-4">
                            {item.control}
                          </div>
                        </div>
                        {itemIndex < section.items.length - 1 && (
                          <Separator className="mt-6 bg-white/10" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass border border-white/20">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-red-500/20 to-orange-500/20">
                    <ShieldIcon className="w-5 h-5 text-red-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Account Actions</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Clear History</p>
                      <p className="text-white/60 text-sm">Remove all transformation history</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to clear all history?')) {
                          localStorage.removeItem('humanify-history');
                          toast({
                            title: "History cleared",
                            description: "All history has been removed.",
                          });
                        }
                      }}
                      className="glass-pink border border-white/20 text-white/80 hover:text-white hover:bg-white/10"
                    >
                      Clear
                    </Button>
                  </div>
                  
                  <Separator className="bg-white/10" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Logout</p>
                      <p className="text-white/60 text-sm">Sign out of your account</p>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      className="bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 hover:text-red-300"
                    >
                      <LogOutIcon className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <Button
              onClick={saveSettings}
              className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Save Settings
            </Button>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Card className="glass border border-white/20 p-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Badge className="bg-gradient-to-r from-primary to-accent border-0">
                Free Plan
              </Badge>
              <span className="text-white/60">•</span>
              <span className="text-white/60">Version 1.0.0</span>
            </div>
            
            <div className="flex items-center justify-center gap-6 mb-6">
              <a href="mailto:support@humanify.ai" className="text-white/60 hover:text-white transition-colors">
                <MailIcon className="w-5 h-5" />
              </a>
              <a href="https://github.com/humanify-ai" className="text-white/60 hover:text-white transition-colors">
                <GithubIcon className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/humanify_ai" className="text-white/60 hover:text-white transition-colors">
                <TwitterIcon className="w-5 h-5" />
              </a>
            </div>
            
            <p className="text-white/40 text-sm">
              Made with ❤️ by Priyanshu Vishwakarma
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
