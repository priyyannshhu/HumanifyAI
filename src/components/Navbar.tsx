import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    const transformerSection = document.getElementById("transformer-section");
    if (transformerSection) {
      transformerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Dynamic blur intensity based on scroll position
  const blurIntensity = Math.min(scrollY / 100, 1);
  const backdropBlur = `blur(${8 + blurIntensity * 12}px)`;
  const backgroundColor = `rgba(0, 0, 0, ${0.4 + blurIntensity * 0.3})`;

  return (
    <nav 
      className="w-full py-4 border-b border-white/10 fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
        backgroundColor: backgroundColor,
        boxShadow: scrollY > 50 ? '0 8px 32px rgba(0, 0, 0, 0.3)' : 'none',
      }}
    >
      <div className="container flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-xl font-bold">
            Humanify
          </span>
          {/* <span className="text-white/90">– AI Text Humanizer</span> */}
        </a>
        <div className="flex items-center gap-4">
          <a
            href="#about"
            className="text-sm text-white/70 hover:text-primary transition-colors hover:glow-pink"
          >
            About
          </a>
          <a
            href="#features"
            className="text-sm text-white/70 hover:text-accent transition-colors hover:glow-purple"
          >
            Features
          </a>
          <Button
            variant="default"
            size="sm"
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all text-white border-0 glow-pink hover:glow-purple"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;