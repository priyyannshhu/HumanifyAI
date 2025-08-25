
import React from "react";
import FeatureCard from "./FeatureCard";
import { RefreshCwIcon, ZapIcon, ScanTextIcon, PencilLineIcon, ShieldCheckIcon, GaugeIcon } from "lucide-react";

const FeaturesSection = () => {
const features = [
  {
    icon: ScanTextIcon,
    title: "Original Meaning",
    description: "Preserves your original message and intent, so you can transform AI text into an authentic human voice without losing context."
  },
  {
    icon: PencilLineIcon,
    title: "Effortless Flow",
    description: "Enhances robotic AI-generated content with smooth, natural, and engaging language that truly reads like a genuine human conversation."
  },
  {
    icon: ZapIcon,
    title: "Zero AI Detection",
    description: "Generates content with a 0% AI detection score on leading platforms, ensuring your text is completely undetectable and genuinely human."
  },
  {
    icon: RefreshCwIcon,
    title: "Free & Unlimited",
    description: "Use our free tool with no limits—transform up to 1,000 characters at a time, with no sign-up or credit card required."
  },
  {
    icon: ShieldCheckIcon,
    title: "Total Privacy",
    description: "Your content is never stored or reused to train any AI models. Your text always remains completely private, safe, and secure."
  },
  {
    icon: GaugeIcon,
    title: "Instant Results",
    description: "Get immediate, high-quality transformations. Our cutting-edge AI delivers instant humanized text in seconds."
  },
];
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Why Humanify is the AI Humanizer You Need
            </span>
          </h2>
          <p className="text-gray-300">
Our tool transforms your AI-generated text into content that resonates. It uses powerful AI to turn robotic content into natural, flowing human-like text that's authentic and undetectable by leading AI checkers.          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="animate-fadein" style={{ animationDelay: `${index * 100}ms` }}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
