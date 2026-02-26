import React, { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExploringSection from "@/components/ExploringSection";
import ContactSection from "@/components/ContactSection";

const WheelViewer = lazy(() => import("@/components/WheelViewer"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto px-4">
        <Suspense fallback={<div className="w-full h-[500px] my-8 animate-pulse bg-slate-100 rounded-xl border border-slate-200" />}>
          <WheelViewer />
        </Suspense>
      </div>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExploringSection />
      <ContactSection />
    </div>
  );
};

export default Index;
