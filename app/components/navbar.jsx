"use client";

import { personalData } from "@/utils/data/personal-data";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaDownload, FaTimes } from "react-icons/fa";
import ThemeToggle from "./theme-toggle";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when ESC key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled 
            ? isDark 
            ? "bg-dark-darker/90 backdrop-blur-xl shadow-lg" 
              : "bg-light-darker/90 backdrop-blur-xl shadow-lg"
            : "bg-transparent"
        } transition-all duration-300`}
      >
        <nav className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Name */}
            <Link href="/" className="flex items-center z-50 relative">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              >
                {personalData.name.split(' ')[0]}
                <span className="text-[rgb(var(--foreground-rgb))]">.</span>
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={link.href}
                    className={`px-3 py-2 text-sm xl:text-base xl:px-4 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors duration-300`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="flex items-center gap-2"
              >
                <ThemeToggle />
                <Link 
                  href={personalData.resume} 
                  target="_blank"
                  className="ml-2 sm:ml-4 px-3 py-2 sm:px-4 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-300 flex items-center gap-2 text-sm xl:text-base"
                >
                  <span>Resume</span>
                  <FaDownload size={14} />
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button and Theme Toggle */}
            <div className="lg:hidden z-50 relative flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className={`p-2 rounded-lg ${isDark ? 'bg-dark-lighter' : 'bg-light-darker'} text-[rgb(var(--foreground-rgb))] focus:outline-none hover:bg-primary/80 transition-colors duration-300`}
              >
                {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu - Full screen overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
      <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
              className={`fixed inset-0 ${isDark ? 'bg-dark-darker/70' : 'bg-light-darker/70'} backdrop-blur-lg z-40 lg:hidden`}
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Slide-in menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm ${isDark ? 'bg-dark-darker/95' : 'bg-light-darker/95'} backdrop-blur-lg z-50 lg:hidden shadow-xl`}
            >
              {/* Close button inside sidebar */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className={`absolute top-6 right-6 p-2 rounded-full ${isDark ? 'bg-dark-lighter' : 'bg-light-darker'} text-[rgb(var(--foreground-rgb))] hover:bg-primary/80 transition-colors duration-300`}
              >
                <FaTimes size={18} />
              </button>
              
              <div className="flex flex-col h-full pt-20 pb-6 px-6">
                <div className="flex-grow overflow-y-auto">
                  <div className="flex flex-col space-y-1">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block px-4 py-3 text-lg font-medium ${isDark ? 'text-gray-300 hover:text-white hover:bg-dark-lighter' : 'text-gray-700 hover:text-gray-900 hover:bg-light-darker'} rounded-lg transition-colors duration-200`}
              >
                {link.name}
              </Link>
                      </motion.div>
            ))}
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
            <Link
              href={personalData.resume}
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
                    className="w-full px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 text-lg font-medium"
            >
              <span>Resume</span>
                    <FaDownload size={16} />
            </Link>
                </motion.div>
                
                <div className="mt-10 pt-6 border-t border-gray-700">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center`}
                  >
                    &copy; {new Date().getFullYear()} {personalData.name}
                  </motion.div>
          </div>
        </div>
      </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Spacer for fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default NavBar;