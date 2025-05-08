"use client";

import { personalData } from "@/utils/data/personal-data";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaTwitter } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { 
      name: "LinkedIn", 
      icon: <FaLinkedin className="w-5 h-5" />,
      href: personalData.linkedIn,
    },
    { 
      name: "GitHub", 
      icon: <FaGithub className="w-5 h-5" />,
      href: personalData.github,
    },
    { 
      name: "Twitter", 
      icon: <FaTwitter className="w-5 h-5" />,
      href: personalData.twitter,
    },
    { 
      name: "Instagram", 
      icon: <FaInstagram className="w-5 h-5" />,
      href: personalData.instagram,
    },
  ];

  return (
    <footer className="bg-dark-darker relative mt-20">
      {/* Decorative Top Border */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-accent"></div>
      
      {/* Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & Info */}
          <div className="md:col-span-2">
            <Link href="/">
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {personalData.name}
              </h3>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Software developer specializing in creating exceptional digital experiences 
              with a focus on quality, performance, and user experience.
            </p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${personalData.email}`} className="text-gray-300 hover:text-primary flex items-center gap-2 transition-colors duration-300">
                <FaEnvelope className="w-4 h-4" />
                <span>{personalData.email}</span>
              </a>
              <a href={`tel:${personalData.phone}`} className="text-gray-300 hover:text-primary flex items-center gap-2 transition-colors duration-300">
                <FaPhone className="w-4 h-4" />
                <span>{personalData.phone}</span>
              </a>
              <div className="text-gray-300 flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4 text-primary" />
                <span>{personalData.address}</span>
              </div>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Connect */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="w-10 h-10 rounded-full bg-dark-lighter flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} {personalData.name}. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Designed & Built with <span className="text-primary">❤</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;