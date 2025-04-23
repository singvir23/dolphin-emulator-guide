'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import { GiDolphin } from "react-icons/gi";
import { VscTerminalPowershell } from "react-icons/vsc"; // Terminal icon
import { ReactNode } from 'react';

interface FooterLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
}

const Footer = () => {
  return (
    <motion.footer
      className="bg-black py-8 border-t border-green-800/50 font-tech"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.1 }} // Trigger sooner
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          {/* Left Side: Title & Copyright */}
          <div className="text-center md:text-left">
            <motion.div
              className="flex items-center justify-center md:justify-start space-x-2 mb-1.5"
              initial={{ y: 15, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
               viewport={{ once: true }}
            >
              <VscTerminalPowershell className="w-5 h-5 text-green-500" />
              <h2 className="text-base font-medium text-green-300">Dolphin_Guide</h2>
            </motion.div>
            <p className="text-xs text-green-600/80">
              Unofficial guide // For informational purposes only // {new Date().getFullYear()}
            </p>
          </div>

          {/* Right Side: Social/External Links */}
          <motion.div
            className="flex items-center space-x-4 sm:space-x-5" // Reduced spacing
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
             viewport={{ once: true }}
          >
            <FooterLink href="https://dolphin-emu.org/" icon={<GiDolphin />} label="Official Dolphin Site" />
            <FooterLink href="https://github.com/dolphin-emu/dolphin" icon={<FaGithub />} label="GitHub" />
            <FooterLink href="https://discord.gg/dolphin-emu" icon={<FaDiscord />} label="Discord" />
            {/* Removed Twitter as Dolphin's activity there is less consistent */}
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

// Footer Link Component
const FooterLink = ({ href, icon, label }: FooterLinkProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-green-500 hover:text-green-300 transition-colors duration-200"
      whileHover={{ scale: 1.1, color: '#86efac' }} // Lighter green on hover
      title={label}
    >
      <div className="text-lg sm:text-xl">{icon}</div> {/* Slightly smaller icons */}
    </motion.a>
  );
};

export default Footer;