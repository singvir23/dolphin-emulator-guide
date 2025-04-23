'use client';

import React, { useRef } from 'react';
import Header from './components/Header';
import ParallaxSection from './components/ParallaxSection';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

// Define types for section content
export interface StepContent {
  step: number | string;
  title: string;
  description: string;
}

export interface Section {
  id: string;
  title: string;
  content: StepContent[];
  bg: string; // Using original image paths
}

// Content for the different sections (Using original image paths)
const sectionsData: Section[] = [
  {
    id: 'windows',
    title: 'Windows Setup',
    content: [
       { step: 1, title: 'Download Dolphin', description: 'Visit dolphin-emu.org >> Download latest dev build (Win x64).' },
       { step: 2, title: 'Extract Files', description: 'Unzip archive >> Place folder (e.g., C:\\Emulators\\Dolphin\\).' },
       { step: 3, title: 'Configure Dolphin', description: 'Run Dolphin.exe >> Set Graphics (Direct3D/Vulkan) & Controllers.' },
       { step: 4, title: 'Add Games', description: 'Config > Paths > Add... >> Select game file directory (ISO/GCM/etc).' },
       { step: 5, title: 'Launch!', description: 'Double-click game >> Alt+Enter (Fullscreen) >> Esc (Stop).' },
    ],
    bg: '/images/windows.png', // Original Path
  },
  {
    id: 'mac',
    title: 'macOS Setup',
    content: [
       { step: 1, title: 'Download Dolphin', description: 'Visit dolphin-emu.org >> Grab macOS Universal .DMG.' },
       { step: 2, title: 'Install', description: 'Open .DMG >> Drag Dolphin.app to Applications folder.' },
       { step: 3, title: 'Launch', description: 'Open Dolphin >> Security warning? Ctrl+Click > "Open".' },
       { step: 4, title: 'Configure', description: 'Setup Graphics (Metal recommended) & Controllers via Preferences.' },
       { step: 5, title: 'Add Games', description: 'Set game paths >> Tweak game-specific settings if needed.' },
    ],
    bg: '/images/apple.png', // Original Path
  },
  {
    id: 'controller',
    title: 'Controller Setup',
    content: [
       { step: 1, title: 'GameCube Input', description: 'Use official/third-party USB GC Adapter or map standard controller.' },
       { step: 2, title: 'Wii Remote Input', description: 'Map standard controller as emulated Wiimote OR connect real Wiimotes (Bluetooth).' },
       { step: 3, title: 'Motion Controls', description: 'Requires real Wiimotes OR map motion to analog sticks/gyro (if available).' },
    ],
    bg: '/images/wiimote.png', // Original Path
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    content: [
       { step: 1, title: 'Performance Issues', description: 'Lower Internal Res >> Enable "Performance" mode >> Use Hybrid Ubershaders.' },
       { step: 2, title: 'Game-Specific Fixes', description: 'Consult the Dolphin Wiki (wiki.dolphin-emu.org) for game compatibility & settings.' },
       { step: '!', title: 'Newer macOS Warning', description: 'Dolphin may struggle on recent macOS versions due to blocks from Apple. Consider running on Windows.' },
    ],
    bg: '/images/troubleshooting-bg.jpg', // Original Path
  },
];

// Export sections for use in ParallaxSection's click handler
export const sections = sectionsData;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    // Apply base styles: black background, green text, chosen font
    <main className="min-h-screen bg-black text-green-400 font-tech">
      <Header />

      {/* Intro Paragraph */}
      <div className="relative pt-28 pb-12 container mx-auto px-6 z-10">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-3xl mx-auto bg-black/60 border border-green-700/40 p-6 rounded-sm shadow-lg shadow-green-900/20 backdrop-blur-sm" // Simplified border/bg
          >
             {/* Removed // from title */}
            <h2 className="text-2xl font-semibold text-green-300 mb-4">Dolphin: GameCube & Wii Emulator</h2>
             {/* Removed > from paragraph start */}
            <p className="text-green-400/90 leading-relaxed text-sm">
               Dolphin emulates Nintendo&apos;s GameCube and Wii consoles. The GameCube hosted classics <em className="text-green-200 not-italic font-medium">Super Smash Bros. Melee</em> and <em className="text-green-200 not-italic font-medium">Metroid Prime</em>. The Wii changed history with motion controls, bringing hits like <em className="text-green-200 not-italic font-medium">Wii Sports</em> and <em className="text-green-200 not-italic font-medium">Super Mario Galaxy</em>. Dolphin lets you experience these platforms on modern PCs and Android.
            </p>
        </motion.div>
      </div>

      {/* Sections Container */}
      <div ref={containerRef} className="relative">
        {sections.map((section, index) => (
          <ParallaxSection
            key={section.id}
            section={section}
            index={index}
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
          />
        ))}
      </div>

      <Footer />
    </main>
  );
}