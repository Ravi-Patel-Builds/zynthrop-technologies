import React, { useState, useEffect } from 'react';
import { CircuitBackground } from './components/CircuitBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
import { CaseStudies } from './components/CaseStudies';
import { SystemSimulator } from './components/SystemSimulator';
import { TechStack } from './components/TechStack';
import { AboutFounder } from './components/AboutFounder';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';

export default function App() {
  const [targetScope, setTargetScope] = useState<string>('Full-Stack System');
  const [contactTab, setContactTab] = useState<'form' | 'estimator'>('form');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Global keyboard shortcut listener for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (sectionId: string) => {
    let element = document.getElementById(sectionId);
    if (!element && sectionId === 'system-simulator') {
      element = document.getElementById('simulator');
    } else if (!element && sectionId === 'simulator') {
      element = document.getElementById('system-simulator');
    }
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    if (serviceName.toLowerCase().includes('web')) {
      setTargetScope('Web App');
    } else if (serviceName.toLowerCase().includes('ai')) {
      setTargetScope('AI Integration');
    } else {
      setTargetScope('Full-Stack System');
    }
    setContactTab('form');
    scrollToSection('contact');
  };

  const handleDiscussProject = (projectTitle: string) => {
    if (projectTitle.toLowerCase().includes('financial') || projectTitle.toLowerCase().includes('pulse')) {
      setTargetScope('Web App');
    } else if (projectTitle.toLowerCase().includes('medical') || projectTitle.toLowerCase().includes('ai')) {
      setTargetScope('AI Integration');
    } else {
      setTargetScope('Full-Stack System');
    }
    setContactTab('form');
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#121418] text-[#A0AEC0] relative selection:bg-[#FF7A59]/30 selection:text-white flex flex-col font-sans">
      {/* Abstract Circuit Trace & Ambient Backdrop */}
      <CircuitBackground />

      {/* Glassmorphism Sticky Navbar */}
      <Navbar 
        onOpenContact={() => scrollToSection('contact')} 
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow relative z-10">
        {/* 1. Hero Section */}
        <Hero
          onExploreWork={() => scrollToSection('case-studies')}
          onBookConsultation={() => scrollToSection('contact')}
        />

        {/* 2. Capabilities & Services Grid */}
        <Capabilities onSelectService={handleSelectService} />

        {/* 3. Featured Case Studies & Proof of Work */}
        <CaseStudies onDiscussProject={handleDiscussProject} />

        {/* 4. Interactive Latency & System Simulator */}
        <div id="simulator">
          <SystemSimulator />
        </div>

        {/* 5. Master Tech Stack Marquee, Directory & Code Lab */}
        <TechStack />

        {/* 6. About the Founder & Philosophy */}
        <AboutFounder onInitiateProject={() => scrollToSection('contact')} />

        {/* 7. Frictionless Contact Form & Scope Estimator */}
        <ContactSection 
          initialScope={targetScope} 
          activeTab={contactTab}
          onTabChange={setContactTab}
        />
      </main>

      {/* 8. Minimalist Footer */}
      <Footer />

      {/* 9. Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={scrollToSection}
        onOpenEstimator={() => {
          setContactTab('estimator');
          scrollToSection('contact');
          setIsCommandPaletteOpen(false);
        }}
      />
    </div>
  );
}

