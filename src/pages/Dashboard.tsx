import React from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  FileTextIcon, 
  TrendingUpIcon, 
  ZapIcon,
  UsersIcon,
  ClockIcon
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getUsageStats } from '@/services/enhancedTransformService';

const Dashboard: React.FC = () => {
  const stats = getUsageStats();

  const statCards = [
    {
      title: 'Transformations Today',
      value: stats.transformationsToday,
      max: 10,
      icon: SparklesIcon,
      color: 'from-primary to-accent',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30'
    },
    {
      title: 'Characters Processed',
      value: stats.totalCharacters.toLocaleString(),
      icon: FileTextIcon,
      color: 'from-blue-500 to-purple-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    },
    {
      title: 'Most Used Tool',
      value: stats.mostUsedTool.charAt(0).toUpperCase() + stats.mostUsedTool.slice(1),
      icon: TrendingUpIcon,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30'
    },
    {
      title: 'Remaining Uses',
      value: `${stats.remainingUses} / 10`,
      icon: ZapIcon,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30'
    }
  ];

  const recentActivity = [
    { tool: 'Humanize', time: '2 minutes ago', status: 'success' },
    { tool: 'Paraphrase', time: '15 minutes ago', status: 'success' },
    { tool: 'Tone Changer', time: '1 hour ago', status: 'success' },
    { tool: 'Summarize', time: '2 hours ago', status: 'success' },
  ];

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-lg text-white/70">
            Welcome back! Here's your AI writing activity overview.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`glass p-6 border ${stat.borderColor} hover:scale-105 transition-transform duration-300`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 text-white bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                    </div>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                  </div>
                  <p className="text-white/60 text-sm">{stat.title}</p>
                  
                  {stat.max && (
                    <div className="mt-3 w-full bg-white/10 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                        style={{ width: `${(typeof stat.value === 'number' ? stat.value : parseInt(stat.value)) / stat.max * 100}%` }}
                      />
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="glass p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <ZapIcon className="w-5 h-5 text-primary" />
                Quick Actions
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'Humanize', icon: '🤖', color: 'from-primary to-accent' },
                  { name: 'Paraphrase', icon: '🔄', color: 'from-blue-500 to-purple-500' },
                  { name: 'Tone Changer', icon: '🎭', color: 'from-green-500 to-teal-500' },
                  { name: 'Simplify', icon: '📝', color: 'from-orange-500 to-red-500' },
                  { name: 'Summarize', icon: '📋', color: 'from-pink-500 to-rose-500' },
                  { name: 'Grammar Fix', icon: '✅', color: 'from-indigo-500 to-purple-500' },
                ].map((tool, index) => (
                  <motion.button
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl glass border border-white/20 hover:border-white/40 transition-all duration-300 group`}
                  >
                    <div className={`text-3xl mb-2 group-hover:scale-110 transition-transform`}>
                      {tool.icon}
                    </div>
                    <p className="text-white font-medium text-sm">{tool.name}</p>
                    <div className={`h-0.5 bg-gradient-to-r ${tool.color} mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="glass p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-primary" />
                Recent Activity
              </h2>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg glass-pink border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <div>
                        <p className="text-white font-medium text-sm">{activity.tool}</p>
                        <p className="text-white/40 text-xs">{activity.time}</p>
                      </div>
                    </div>
                    <div className="text-green-400 text-xs">✓</div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Upgrade Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Card className="glass-gradient border border-white/20 p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">
                Upgrade to Pro
              </h3>
              <p className="text-white/70 mb-4">
                Get unlimited transformations, higher character limits, and priority support.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Upgrade Now
              </motion.button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
