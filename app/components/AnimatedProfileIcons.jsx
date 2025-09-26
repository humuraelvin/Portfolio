'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedProfileIcons() {
  const [isHovered, setIsHovered] = useState(false);
  
  // SVG Icons that will orbit around the profile
  const icons = [
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
        </svg>
      ),
      color: 'text-blue-500',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z" clipRule="evenodd" />
        </svg>
      ),
      color: 'text-yellow-500',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.95 49.95 0 00-9.902 3.912.75.75 0 01-.584 0A50.01 50.01 0 007.5 12.173v-.224a.75.75 0 01.364-.643l.002-.001 10.41-6.025a.75.75 0 00-.182-1.374l-.703-.189a50.544 50.544 0 00-10.26 2.226.75.75 0 01-.633 0A50.72 50.72 0 003 6.509v9.431a48.62 48.62 0 01-1.5-.174v-9.45a48.55 48.55 0 00-1.5.174v9.431c.05.493.124.983.22 1.468a.75.75 0 001.38.063 49.412 49.412 0 011.5-5.484v2.25a.75.75 0 001.5 0v-2.817a60.9 60.9 0 015.343.371.75.75 0 10.255-1.478 62.31 62.31 0 00-5.6-.335v-2.25a.75.75 0 01.388-.657l1.996-1.155a.75.75 0 01.75 0l9.71 5.616a.75.75 0 01-.182 1.374l-.703.188a50.9 50.9 0 01-10.26-2.226v4.768a.75.75 0 11-1.5 0v-9.5a.75.75 0 01.388-.657l1.996-1.155a.75.75 0 01.75 0l9.71 5.616a.75.75 0 01-.182 1.374l-.704.188a50.9 50.9 0 01-10.26-2.226v4.768a.75.75 0 11-1.5 0v-9.5a.75.75 0 01.388-.657l1.996-1.155a.75.75 0 01.75 0l9.71 5.616a.75.75 0 01-.182 1.374l-.704.188a50.9 50.9 0 01-10.26-2.226v4.768a.75.75 0 11-1.5 0v-9.5a.75.75 0 01.388-.657l1.996-1.155a.75.75 0 01.75 0l9.71 5.616a.75.75 0 01-.182 1.374l-.704.188a50.9 50.9 0 01-10.26-2.226v4.768a.75.75 0 11-1.5 0v-9.5a.75.75 0 01.388-.657l1.996-1.155a.75.75 0 01.75 0z" clipRule="evenodd" />
        </svg>
      ),
      color: 'text-green-500',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5z" clipRule="evenodd" />
        </svg>
      ),
      color: 'text-red-500',
    },
  ];

  return (
    <div 
      className="relative w-64 h-64 mx-auto mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Profile image container */}
      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/30 shadow-lg z-10">
        <img 
          src="/image/profile.png"
          alt="Profile"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 mix-blend-overlay"></div>
      </div>

      {/* Animated SVG Icons */}
      {icons.map((icon, index) => {
        const angle = (index * (360 / icons.length)) * (Math.PI / 180);
        const radius = 120; // Distance from center
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={index}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${icon.color} z-0`}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: isHovered ? x : 0,
              y: isHovered ? y : 0,
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? [1, 1.2, 1] : 0.5,
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
              delay: isHovered ? index * 0.1 : 0,
              scale: {
                repeat: isHovered ? Infinity : 0,
                repeatType: 'reverse',
                duration: 2,
                ease: 'easeInOut',
              },
            }}
          >
            <motion.div
              animate={{
                rotate: isHovered ? 360 : 0,
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {icon.icon}
            </motion.div>
          </motion.div>
        );
      })}

      {/* Animated border */}
      <motion.div 
        className="absolute inset-0 rounded-full border-4 border-transparent"
        style={{
          borderImage: 'linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899, #f43f5e) 1',
          borderImageSlice: 1,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          },
          scale: {
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          },
        }}
      />
    </div>
  );
}
