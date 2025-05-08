"use client";

import { personalData } from '@/utils/data/personal-data';
import ScrollReveal from '../../helper/scroll-reveal';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaStackOverflow } from 'react-icons/fa';
import { FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from './contact-form';

function ContactSection() {
  return (
    <div id="contact" className="relative py-20 lg:py-32">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-dark-darker/50 to-transparent"></div>
        <div className="absolute -left-32 top-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -right-32 bottom-1/4 w-64 h-64 bg-secondary/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Get In Touch
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? Feel free to reach out and I&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="glass-card p-0.5">
              <div className="bg-dark-lighter p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="shrink-0 bg-primary/10 p-3 rounded-lg">
                      <MdAlternateEmail className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Email</p>
                      <a 
                        href={`mailto:${personalData.email}`} 
                        className="text-white hover:text-primary transition-colors"
                      >
                        {personalData.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="shrink-0 bg-primary/10 p-3 rounded-lg">
                      <IoMdCall className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Phone</p>
                      <a 
                        href={`tel:${personalData.phone}`} 
                        className="text-white hover:text-primary transition-colors"
                      >
                        {personalData.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="shrink-0 bg-primary/10 p-3 rounded-lg">
                      <CiLocationOn className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Location</p>
                      <p className="text-white">{personalData.address}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-700">
                  <p className="text-sm text-gray-400 mb-4">Connect with me on social media</p>
                  <div className="flex space-x-4">
                    <motion.a
                      whileHover={{ y: -3 }}
                      href={personalData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-dark text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
                    >
                      <FaGithub className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ y: -3 }}
                      href={personalData.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-dark text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
                    >
                      <BiLogoLinkedin className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ y: -3 }}
                      href={personalData.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-dark text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
                    >
                      <FaXTwitter className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ y: -3 }}
                      href={personalData.stackOverflow}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-dark text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
                    >
                      <FaStackOverflow className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ y: -3 }}
                      href={personalData.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-dark text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
                    >
                      <FaInstagram className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right">
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;