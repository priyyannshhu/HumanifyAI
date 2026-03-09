import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Sparkles,
  RefreshCw,
  Palette,
  Zap,
  FileText,
  CheckCircle,
  History,
  Settings,
  Menu,
  X,
  Brain
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'humanize', label: 'Humanize', icon: Sparkles, path: '/humanize' },
  { id: 'paraphrase', label: 'Paraphrase', icon: RefreshCw, path: '/paraphrase' },
  { id: 'tone', label: 'Tone Changer', icon: Palette, path: '/tone' },
  { id: 'simplify', label: 'Simplify', icon: Zap, path: '/simplify' },
  { id: 'summarize', label: 'Summarize', icon: FileText, path: '/summarize' },
  { id: 'grammar', label: 'Grammar Fix', icon: CheckCircle, path: '/grammar' },
  { id: 'history', label: 'History', icon: History, path: '/history' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

const SidebarNavigation: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={toggleMobile}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 280,
          x: isMobileOpen ? 0 : -280,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-screen bg-black/40 backdrop-blur-xl border-r border-white/10 z-50 lg:translate-x-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-2"
                >
                  <Brain className="w-8 h-8 text-primary" />
                  <div>
                    <h1 className="text-xl font-bold text-white">Humanify</h1>
                    <p className="text-xs text-white/60">AI Suite</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button
              onClick={isCollapsed ? toggleCollapse : toggleMobile}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg glass-purple text-white/80 hover:text-white transition-colors"
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Menu className="w-4 h-4" />
              </motion.div>
            </button>

            <button
              onClick={toggleMobile}
              className="flex lg:hidden items-center justify-center w-8 h-8 rounded-lg glass-purple text-white/80 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`
                      relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-white border border-white/20' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    
                    <AnimatePresence mode="wait">
                      {!isCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="flex-1 flex items-center justify-between"
                        >
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary border border-primary/30">
                              {item.badge}
                            </span>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-white/10 -z-10"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="text-center"
                >
                  <div className="glass-pink rounded-lg p-3 mb-3">
                    <p className="text-xs text-white/60 mb-1">Free Plan</p>
                    <p className="text-sm font-semibold text-white">10 / 10 uses</p>
                    <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                      <div className="bg-gradient-to-r from-primary to-accent h-1.5 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <p className="text-xs text-white/40">Made with ❤️ by Priyanshu</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Mobile menu button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-40 flex items-center justify-center w-10 h-10 rounded-xl glass-purple text-white/80 hover:text-white transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
};

export default SidebarNavigation;
