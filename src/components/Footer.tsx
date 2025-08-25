import React from "react";
import { Github, Linkedin, Instagram, Twitter, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-8 mt-16 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <p className="flex items-center justify-center md:justify-start gap-2">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-lg font-bold">
                Humanify
              </span>
            </p>
            <p className="text-sm text-gray-300 mt-1 max-w-sm">
              Instantly humanize AI-generated text into natural, engaging content
            </p>
          </div>

          {/* Links + Social */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://priyanshu-v.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Portfolio
              </a>
              <a
                href="https://github.com/priyyannshhu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/priyanshu-vishwakarmaa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/priyyannshhu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/priyyannshhu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>

            <p className="text-sm text-gray-300">
              Created by{" "}
              <a
                href="https://www.instagram.com/priyyannshhu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Priyanshu
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-100 text-center text-sm text-gray-300">
          <p>© 2025 Humanify – The Free AI Humanizer Tool. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
