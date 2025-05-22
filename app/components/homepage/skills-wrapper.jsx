"use client";

import dynamic from 'next/dynamic';

// Dynamically import the Skills component
const Skills = dynamic(() => import('./skills'), { ssr: false });

export default function SkillsWrapper() {
  return <Skills />;
} 