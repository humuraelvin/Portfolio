"use client";

import { personalData } from "@/utils/data/personal-data";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaDownload, FaTimes } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled 
            ? "bg-dark-darker/80 backdrop-blur-lg shadow-lg" 
            : "bg-transparent"
        } transition-all duration-300`}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Name */}
            <Link href="/" className="flex items-center">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              >
                {personalData.name.split(' ')[0]}
                <span className="text-white">.</span>
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={link.href}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <Link 
                  href={personalData.resume} 
                  target="_blank"
                  className="ml-4 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
                >
                  <span>Resume</span>
                  <FaDownload size={14} />
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg bg-dark-lighter text-white focus:outline-none"
              >
                {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ 
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-16 left-0 right-0 z-40 bg-dark-darker/95 backdrop-blur-lg overflow-hidden md:hidden`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-gray-300 hover:text-white border-b border-gray-700"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href={personalData.resume}
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 mt-4"
            >
              <span>Resume</span>
              <FaDownload size={14} />
            </Link>
          </div>
        </div>
      </motion.div>
      
      {/* Spacer for fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default NavBar;