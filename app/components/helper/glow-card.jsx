"use client"

import { useTheme } from "@/app/context/ThemeContext";
import { useEffect, useRef } from "react";

const GlowCard = ({ children, identifier = "default" }) => {
  const cardRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Add CSS for the glow effect
    const styleId = `glow-style-${identifier}`;
    
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        .glow-container-${identifier} {
          position: relative;
          z-index: 1;
        }
        .glow-card-${identifier} {
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        .glow-card-${identifier} .glows {
          position: absolute;
          inset: 0;
          z-index: -1;
        }
        .glow-card-${identifier} .glows::before,
        .glow-card-${identifier} .glows::after {
          content: '';
          position: absolute;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        .glow-card-${identifier} .glows::before {
          background: radial-gradient(circle, rgba(37, 99, 235, 0.6) 0%, rgba(37, 99, 235, 0) 70%);
          left: -75px;
          top: -75px;
        }
        .glow-card-${identifier} .glows::after {
          background: radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(139, 92, 246, 0) 70%);
          right: -75px;
          bottom: -75px;
      }
        .glow-card-${identifier}:hover .glows::before,
        .glow-card-${identifier}:hover .glows::after {
          opacity: 0.6;
        }
      `;
      document.head.appendChild(style);
    }

    // Clean up
    return () => {
      const styleElement = document.getElementById(styleId);
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [identifier]);

  return (
    <div className={`glow-container-${identifier} glow-container`}>
      <article className={`glow-card glow-card-${identifier} h-fit cursor-pointer border ${isDark ? 'border-[#2a2e5a] bg-[#101123] text-gray-200' : 'border-gray-300 bg-light-darker text-gray-800'} transition-all duration-300 relative rounded-xl hover:border-transparent w-full`}>
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
};

export default GlowCard;
