"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { HiStar } from "react-icons/hi";

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, x: 100 }}
      animate={{
        opacity: isActive ? 1 : 0,
        x: isActive ? 0 : 100,
        scale: isActive ? 1 : 0.9,
      }}
      transition={{
        opacity: { duration: 0.5 },
        x: { duration: 0.5 },
        scale: { duration: 0.5 },
      }}
    >
      <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-8 h-full shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 h-full">
          {/* Avatar and rating for mobile - top aligned */}
          <div className="flex-shrink-0 flex flex-col items-center sm:block">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative rounded-full mb-3 overflow-hidden">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                fill
                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                className="object-cover"
                priority
              />
              <motion.div 
                className="absolute inset-0 ring-2 ring-primary/30 rounded-full"
                animate={{ 
                  boxShadow: isActive 
                    ? "0 0 15px rgba(59, 130, 246, 0.5)"
                    : "0 0 0px rgba(59, 130, 246, 0)"
                }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
            <div className="flex gap-0.5 sm:gap-1 mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <HiStar key={i} className="text-yellow-400 w-3 h-3 sm:w-4 sm:h-4" />
              ))}
            </div>
          </div>
          
          <div className="flex flex-col justify-between flex-grow">
            <div>
              <FaQuoteLeft className="text-primary mb-2 sm:mb-3 w-5 h-5 sm:w-6 sm:h-6 opacity-60" />
              <p className="text-gray-200 text-xs sm:text-sm md:text-base mb-4 sm:mb-6 italic leading-relaxed">
                &ldquo;{testimonial.testimonial}&rdquo;
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white text-sm sm:text-base md:text-lg">
                {testimonial.name}
              </h4>
              <p className="text-gray-400 text-xs sm:text-sm">
                {testimonial.position}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard; 