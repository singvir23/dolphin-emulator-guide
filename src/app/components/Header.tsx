'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaTerminal } from 'react-icons/fa'; // Changed icon to Terminal
import { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

const Header = () => {
  return (
    <motion.header
      className="fixed w-full z-50 bg-black/85 backdrop-blur-md border-b border-green-800/50 font-tech" // Slightly more opaque bg
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row justify-between items-center">
        {/* Logo/Title */}
        <motion.div
          className="flex items-center space-x-2.5 group cursor-pointer"
          whileHover={{ scale: 1.02 }} // Subtle scale
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {/* Icon with Green Border */}
          <div className="w-7 h-7 rounded-sm border border-green-600/70 flex items-center justify-center group-hover:border-green-500 transition-colors">
            <FaTerminal className="text-green-400 text-sm group-hover:text-green-300 transition-colors" />
          </div>
          <h1 className="text-lg sm:text-xl font-medium text-green-300 group-hover:text-green-200 transition-colors">
            Dolphin_Guide<span className="text-green-600">.exe</span> {/* Retro filename style */}
          </h1>
        </motion.div>

        {/* Navigation */}
        <nav className="mt-3 md:mt-0">
          <ul className="flex space-x-1 sm:space-x-2">
            <NavLink href="#windows">Windows</NavLink>
            <NavLink href="#mac">macOS</NavLink>
            <NavLink href="#controller">Controls</NavLink>
            <NavLink href="#troubleshooting">Troubleshoot</NavLink>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

// Navigation Link Component
const NavLink = ({ href, children }: NavLinkProps) => {
    // Smooth scroll logic (same as before)
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            const headerHeight = document.querySelector('header')?.offsetHeight || 60;
            const offset = headerHeight + 30; // Adjusted offset slightly
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = targetElement.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

  return (
    <motion.li whileHover={{ scale: 1.03 }}> {/* Slightly less scale */}
      <a
        href={href}
        onClick={handleClick}
        className="px-3 py-1.5 rounded-sm text-xs sm:text-sm text-green-400/90 hover:text-green-200 hover:bg-green-800/30 transition-colors duration-200" // Simpler hover
      >
        {children}
      </a>
    </motion.li>
  );
};

export default Header;