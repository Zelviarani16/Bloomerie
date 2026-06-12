"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedBouquets from "@/components/FeaturedBouquets";
import AboutSection from "@/components/AboutSection";
import TestimonialSection from "@/components/TestimonialSection";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <main className="bg-[#0f0508] min-h-screen overflow-x-hidden">
      <CursorGlow />
      <Navbar />
      <HeroSection />
      <FeaturedBouquets />
      <AboutSection />
      <TestimonialSection />
      <Footer />
    </main>
  );
}