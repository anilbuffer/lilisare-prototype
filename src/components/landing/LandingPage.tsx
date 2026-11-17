'use client';

import React, { useState } from 'react';
import {
  Heart,
  Phone,
  Search,
  Globe,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Users,
  Award,
  ChevronRight,
  Stethoscope,
  Smile,
  Home as HomeIcon,
  HelpCircle,
  FileCheck,
  MapPin,
  Mail,
  ExternalLink
} from 'lucide-react';

interface LandingPageProps {
  onStartOnboarding: () => void;
  onExplorePortal: () => void;
}

export function LandingPage({ onStartOnboarding, onExplorePortal }: LandingPageProps) {
  const [eligibilityAnswers, setEligibilityAnswers] = useState({
    livesInColorado: true,
    hasMedicaid: true,
    careForLovedOne: true,
  });

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 antialiased overflow-hidden">
      {/* 1. TOP GREEN NOTIFICATION / UTILITY BAR */}
      <div className="bg-[#3e6b2b] text-white text-xs py-2 px-4 sm:px-8 border-b border-primary-800/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
          {/* Contact number & Callouts */}
          <div className="flex items-center gap-3 flex-wrap justify-center text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5 font-medium">
              <span>Have Questions? Call or Text Us Today!</span>
              <a href="tel:3035780181" className="font-extrabold text-[#F2B632] hover:underline">
                303-578-0181
              </a>
            </div>
            <button
              onClick={() => alert('Para asistencia en español, llámenos directamente al 303-578-0181.')}
              className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-bold px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] shadow-sm hover:opacity-95 transition-opacity"
            >
              📞 Se Habla Español
            </button>
            <button
              onClick={onStartOnboarding}
              className="hidden lg:inline-flex items-center text-[11px] text-emerald-100 hover:text-white underline underline-offset-2"
            >
              Click here to see if you or a loved one qualifies!
            </button>
          </div>

          {/* Search bar & Language selector */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search services..."
                className="w-40 sm:w-48 text-[11px] pl-7 pr-3 py-1 rounded-full bg-white/10 text-white placeholder-emerald-100/70 border border-white/20 focus:outline-none focus:ring-1 focus:ring-[#F2B632]"
              />
              <Search className="w-3.5 h-3.5 absolute left-2 top-1.5 text-emerald-100/80" />
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-200 bg-white/10 px-2 py-0.5 rounded-md border border-white/20">
              <Globe className="w-3.5 h-3.5 text-[#F2B632]" />
              <span className="font-bold">EN</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER & BRAND NAVIGATION */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          {/* Logo with Lotus & Heart */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/images/lilisare-logo.png"
              alt="LiliSare - because we care"
              className="h-11 sm:h-13 w-auto object-contain"
            />
          </div>

          {/* Nav Pills in Orange-Coral Gradient (Direct match to reference) */}
          <nav className="hidden lg:flex items-center bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] rounded-full px-6 py-2 shadow-sm text-slate-950 font-bold text-xs tracking-wide space-x-6">
            <a href="#hero" className="hover:text-white transition-colors underline decoration-white decoration-2 underline-offset-4">Home</a>
            <a href="#about-us" className="hover:text-white transition-colors">About Us</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#welcome-steps" className="hover:text-white transition-colors">Welcome Steps</a>
            <a href="#community" className="hover:text-white transition-colors">Community</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact Us</a>
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onExplorePortal}
              className="text-xs font-bold text-primary-800 hover:text-primary-950 px-3 py-1.5 rounded-xl hover:bg-primary-50 transition-colors hidden sm:block"
            >
              Operations Portal
            </button>
            <button
              onClick={onStartOnboarding}
              className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6b6b] hover:to-[#ffa07a] text-slate-950 font-black px-4 sm:px-5 py-2 rounded-full text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION (Green background with heart-framed smiling children) */}
      <section id="hero" className="relative bg-[#3e6b2b] text-white py-14 sm:py-20 px-4 sm:px-8 overflow-hidden">
        {/* Subtle Water Lily / Leaf watermark background graphics */}
        <div className="absolute -left-16 -top-16 w-80 h-80 bg-[#4e723c] rounded-full filter blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-[#324925] rounded-full filter blur-2xl opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.15] text-[#fef9ee]">
              Get Paid <span className="text-white font-normal">to care for your loved ones at home.</span>
            </h1>

            <p className="text-lg sm:text-xl font-medium text-emerald-100 max-w-xl mx-auto lg:mx-0">
              Because the <strong className="text-white font-black underline decoration-[#F2B632] decoration-2 underline-offset-4">Best Care</strong> starts with Family!
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onStartOnboarding}
                className="w-full sm:w-auto bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6b6b] hover:to-[#ffa07a] text-slate-950 font-black text-sm px-8 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Heart-Shaped Image Frame */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="relative w-full max-w-md sm:max-w-lg">
              <div className="relative rounded-[40px] border-4 border-[#fffbeb] bg-gradient-to-br from-white/10 to-white/5 p-3 shadow-2xl backdrop-blur-sm">
                <div className="overflow-hidden rounded-[32px] aspect-[4/3] relative">
                  <img
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=80"
                    alt="Smiling children - Best care starts with family"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {/* Floating soft yellow heart badges along the frame */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#fffbeb] text-rose-500 flex items-center justify-center shadow-lg border-2 border-[#F2B632]">
                  <Heart className="w-5 h-5 fill-rose-500" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-9 h-9 rounded-full bg-[#fffbeb] text-[#F2B632] flex items-center justify-center shadow-md">
                  <Heart className="w-4 h-4 fill-[#F2B632]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "OUR AVAILABLE SERVICES" SECTION (Green background with 6 Cream Cards) */}
      <section id="services" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#324925] text-white relative">
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Our Available Services
            </h2>
            <p className="text-xs text-emerald-100">
              State-funded Colorado Medicaid waiver programs designed to keep care at home.
            </p>
          </div>

          {/* 6 Cream Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Pediatric Child Healthcare */}
            <div className="bg-[#fef8d8] text-slate-800 rounded-3xl p-5 shadow-lg border border-[#fdeea8] flex flex-col justify-between space-y-4 relative group">
              <div className="flex gap-4 items-start">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-sm bg-amber-100">
                  <img
                    src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=300&auto=format&fit=crop&q=80"
                    alt="Pediatric Care"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="text-sm font-black text-slate-900 leading-snug">
                    Pediatric / Child Healthcare & Skilled Care
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3">
                    Specialized home healthcare for children with developmental delays, medical complexity, or special needs.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-[#f7e692]/60 flex items-center justify-between">
                <button
                  onClick={onStartOnboarding}
                  className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-bold text-[11px] px-3.5 py-1.5 rounded-full shadow-sm"
                >
                  Apply Now
                </button>
                <button onClick={onStartOnboarding} className="text-[11px] font-bold text-primary hover:underline">
                  Become a Paid Caregiver
                </button>
              </div>
            </div>

            {/* Card 2: Community First Choice (CFC) */}
            <div className="bg-[#fef8d8] text-slate-800 rounded-3xl p-5 shadow-lg border border-[#fdeea8] flex flex-col justify-between space-y-4 relative group">
              <div className="flex gap-4 items-start">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-sm bg-amber-100">
                  <img
                    src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=300&auto=format&fit=crop&q=80"
                    alt="Community First Choice"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="text-sm font-black text-slate-900 leading-snug">
                    Community First Choice (CFC)
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3">
                    Person-centered attendant support providing help with daily living activities, community access, and independence.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-[#f7e692]/60 flex items-center justify-between">
                <button
                  onClick={onStartOnboarding}
                  className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-bold text-[11px] px-3.5 py-1.5 rounded-full shadow-sm"
                >
                  Apply Now
                </button>
                <button onClick={onStartOnboarding} className="text-[11px] font-bold text-primary hover:underline">
                  Become a Paid Caregiver
                </button>
              </div>
            </div>

            {/* Card 3: In-Home Support Services (IHSS) */}
            <div className="bg-[#fef8d8] text-slate-800 rounded-3xl p-5 shadow-lg border border-[#fdeea8] flex flex-col justify-between space-y-4 relative group">
              <div className="flex gap-4 items-start">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-sm bg-amber-100">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80"
                    alt="IHSS Family Care"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="text-sm font-black text-slate-900 leading-snug">
                    In-Home Support Services (IHSS)
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3">
                    Empowering parents and relatives to be paid directly for providing personal care, hygiene, and medical attendant tasks.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-[#f7e692]/60 flex items-center justify-between">
                <button
                  onClick={onStartOnboarding}
                  className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-bold text-[11px] px-3.5 py-1.5 rounded-full shadow-sm"
                >
                  Apply Now
                </button>
                <button onClick={onStartOnboarding} className="text-[11px] font-bold text-primary hover:underline">
                  Become a Paid Caregiver
                </button>
              </div>
            </div>

            {/* Card 4: HCBS Waivers */}
            <div className="bg-[#fef8d8] text-slate-800 rounded-3xl p-5 shadow-lg border border-[#fdeea8] flex flex-col justify-between space-y-4 relative group">
              <div className="flex gap-4 items-start">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-sm bg-amber-100">
                  <img
                    src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=300&auto=format&fit=crop&q=80"
                    alt="HCBS Services"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="text-sm font-black text-slate-900 leading-snug">
                    Home and Community Based Services (HCBS)
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3">
                    Comprehensive state waiver programs covering respite care, behavioral support, and customized personal care.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-[#f7e692]/60 flex items-center justify-between">
                <button
                  onClick={onStartOnboarding}
                  className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-bold text-[11px] px-3.5 py-1.5 rounded-full shadow-sm"
                >
                  Apply Now
                </button>
                <button onClick={onStartOnboarding} className="text-[11px] font-bold text-primary hover:underline">
                  Become a Paid Caregiver
                </button>
              </div>
            </div>

            {/* Card 5: IRSS / Host Home */}
            <div className="bg-[#fef8d8] text-slate-800 rounded-3xl p-5 shadow-lg border border-[#fdeea8] flex flex-col justify-between space-y-4 relative group">
              <div className="flex gap-4 items-start">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-sm bg-amber-100">
                  <img
                    src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=300&auto=format&fit=crop&q=80"
                    alt="IRSS Host Home"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="text-sm font-black text-slate-900 leading-snug">
                    Individual Residential Services & Supports (IRSS)
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3">
                    Supportive host home and family caregiver living arrangements providing 24/7 care stability.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-[#f7e692]/60 flex items-center justify-between">
                <button
                  onClick={onStartOnboarding}
                  className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-bold text-[11px] px-3.5 py-1.5 rounded-full shadow-sm"
                >
                  Apply Now
                </button>
                <button onClick={onStartOnboarding} className="text-[11px] font-bold text-primary hover:underline">
                  Become a Paid Caregiver
                </button>
              </div>
            </div>

            {/* Card 6: Medicaid Waivers Accepted */}
            <div className="bg-[#fef8d8] text-slate-800 rounded-3xl p-5 shadow-lg border border-[#fdeea8] flex flex-col justify-between space-y-4 relative group">
              <div className="flex gap-4 items-start">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-sm bg-amber-100">
                  <img
                    src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&auto=format&fit=crop&q=80"
                    alt="Medicaid Waivers"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="text-sm font-black text-slate-900 leading-snug">
                    We Accept Medicaid & State Waivers
                  </h3>
                  <p className="text-[11px] text-slate-700 font-semibold leading-relaxed">
                    CES • SLS • CHCBS • DD • EBD • CHRP • CIH • Brain Injury
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-[#f7e692]/60 flex items-center justify-between">
                <button
                  onClick={onStartOnboarding}
                  className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-bold text-[11px] px-3.5 py-1.5 rounded-full shadow-sm"
                >
                  Apply Now
                </button>
                <button onClick={onStartOnboarding} className="text-[11px] font-bold text-primary hover:underline">
                  Check Waiver Eligibility
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT US & FOUNDERS' STORY (Authentic LiliSare Story, Mission & Vision) */}
      <section id="about-us" className="py-16 sm:py-24 px-4 sm:px-8 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 text-primary-900 text-xs font-extrabold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Who We Are — LiliSare</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Live-In Caregivers, Family Caregivers, and Family Friends
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              At LiliSare, we believe caregiving comes in many forms. Whether you&apos;re a family member or a close friend, we’re here to support you. We value the strength of community and the deep bond between those who provide care and those who receive it. No matter your role, we’re here to guide and empower you every step of the way.
            </p>
          </div>

          {/* Founders Story Spotlight Box */}
          <div className="bg-gradient-to-br from-[#3e6b2b] via-[#324925] to-[#2a3d20] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
                <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md p-3.5 border border-white/20 shadow-inner flex items-center justify-center">
                  <img
                    src="/images/lilisare-icon.png"
                    alt="LiliSare Lotus"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-black text-white">Founded by Two Mothers</h3>
                <p className="text-xs text-emerald-200">Of children with special healthcare needs</p>
              </div>

              <div className="lg:col-span-8 space-y-3 text-xs sm:text-sm text-slate-100 leading-relaxed border-t lg:border-t-0 lg:border-l border-white/15 pt-6 lg:pt-0 lg:pl-8">
                <p className="font-medium text-emerald-50 text-sm sm:text-base leading-relaxed">
                  LiliSare was founded by two mothers of children with special needs who understand both the challenges and rewards of caregiving. We created this company to share our experience, knowledge, and support with others navigating similar journeys.
                </p>
                <p className="text-slate-200 leading-relaxed">
                  <strong className="text-white font-bold">You’re why we do what we do.</strong> At LiliSare, we lead with the heart, understanding the love, strength, and dedication it takes to care for someone close to you—whether you&apos;re a family member or a family friend providing care. We’re here for you. Our team offers compassion, guidance, and real connection—treating you like family every step of the way.
                </p>
              </div>
            </div>
          </div>

          {/* Mission & Vision Statements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">
                  WE ARE COMMITTED
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900">Mission Statement</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                At LiliSare, our mission is to care for the whole family—both the loved one receiving care and the caregiver giving it. We share what we&apos;ve learned, navigate services alongside you, and offer the knowledge, guidance, and support that help your family thrive together.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d99719]" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#d99719]">
                  EMPOWERING FAMILIES AND CAREGIVERS
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900">Vision Statement</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We envision a world where no one in a caregiving family is overlooked—where the person receiving care is seen and valued, and the caregiver is supported, never depleted, and never alone. We treat your family like our own: lifting one another through compassion, connection, and community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. "WELCOME STEPS" SECTION (White background with 4 Peach-Coral Stepper Cards) */}
      <section id="welcome-steps" className="py-16 sm:py-24 px-4 sm:px-8 bg-slate-50/70 border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Welcome Steps
            </h2>
            <p className="text-xs text-slate-500">
              A smooth, supportive journey from your first call to ongoing care delivery.
            </p>
          </div>

          {/* 4 Cards with Lotus Topper */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="relative pt-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-md border-2 border-[#ff7e5f] p-1.5 flex items-center justify-center z-10">
                <img src="/images/lilisare-icon.png" alt="Lotus" className="w-full h-full object-contain" />
              </div>
              <div className="bg-gradient-to-b from-[#ff8c70] to-[#feb47b] text-slate-950 rounded-3xl p-6 shadow-md text-center space-y-2 pt-8">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/30 px-2 py-0.5 rounded-full">
                  Step 1
                </span>
                <h3 className="text-base font-black text-slate-950">Get Started</h3>
                <p className="text-xs text-slate-900 leading-relaxed font-medium">
                  We&apos;ll take care of all the paperwork, guide you through every step of the way, and check your eligibility.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative pt-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-md border-2 border-[#ff7e5f] p-1.5 flex items-center justify-center z-10">
                <img src="/images/lilisare-icon.png" alt="Lotus" className="w-full h-full object-contain" />
              </div>
              <div className="bg-gradient-to-b from-[#ff8c70] to-[#feb47b] text-slate-950 rounded-3xl p-6 shadow-md text-center space-y-2 pt-8">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/30 px-2 py-0.5 rounded-full">
                  Step 2
                </span>
                <h3 className="text-base font-black text-slate-950">Case Manager Coordination</h3>
                <p className="text-xs text-slate-900 leading-relaxed font-medium">
                  We work with your state case manager to ensure your loved one receives prior authorization and care hours.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative pt-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-md border-2 border-[#ff7e5f] p-1.5 flex items-center justify-center z-10">
                <img src="/images/lilisare-icon.png" alt="Lotus" className="w-full h-full object-contain" />
              </div>
              <div className="bg-gradient-to-b from-[#ff8c70] to-[#feb47b] text-slate-950 rounded-3xl p-6 shadow-md text-center space-y-2 pt-8">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/30 px-2 py-0.5 rounded-full">
                  Step 3
                </span>
                <h3 className="text-base font-black text-slate-950">Start of Services</h3>
                <p className="text-xs text-slate-900 leading-relaxed font-medium">
                  We ensure you are equipped with the knowledge and tools you need to provide the best care at home.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative pt-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-md border-2 border-[#ff7e5f] p-1.5 flex items-center justify-center z-10">
                <img src="/images/lilisare-icon.png" alt="Lotus" className="w-full h-full object-contain" />
              </div>
              <div className="bg-gradient-to-b from-[#ff8c70] to-[#feb47b] text-slate-950 rounded-3xl p-6 shadow-md text-center space-y-2 pt-8">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/30 px-2 py-0.5 rounded-full">
                  Step 4
                </span>
                <h3 className="text-base font-black text-slate-950">Ongoing Support</h3>
                <p className="text-xs text-slate-900 leading-relaxed font-medium">
                  We check in regularly to make sure everything is running smoothly, and our clinical nursing team is always here.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={onStartOnboarding}
              className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6b6b] hover:to-[#ffa07a] text-slate-950 font-black text-xs px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              Get Started $\rightarrow$
            </button>
          </div>
        </div>
      </section>

      {/* 7. "EXPLORE OUR WEGO COMMUNITY EVENTS" SECTION */}
      <section id="community" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#3e6b2b] text-white">
        <div className="max-w-6xl mx-auto space-y-10 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Explore our WeGo Community Events
            </h2>
            <p className="text-xs text-emerald-100">
              Connecting families through inclusive, accessible outings, sensory events, and family peer groups across Colorado.
            </p>
          </div>

          {/* 4 Community Photos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border-2 border-white/20">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&auto=format&fit=crop&q=80"
                alt="Community event wheelchair accessible outdoors"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border-2 border-white/20">
              <img
                src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80"
                alt="Boy petting therapy pony"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border-2 border-white/20">
              <img
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&auto=format&fit=crop&q=80"
                alt="Mascot event with kids"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border-2 border-white/20">
              <img
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&auto=format&fit=crop&q=80"
                alt="Caregiver community smiles"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Social Media Pills & Community Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-bold px-4 py-2 rounded-full text-xs shadow-md">
              <span>Follow Our Community:</span>
              <span className="font-extrabold">Facebook • Instagram</span>
            </div>
            <button
              onClick={onStartOnboarding}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-6 py-2 rounded-full border border-white/30 transition-colors"
            >
              Join our Community $\rightarrow$
            </button>
          </div>
        </div>
      </section>

      {/* 8. FOOTER (Matching reference layout & details) */}
      <footer id="contact" className="bg-[#1e3416] text-slate-300 py-14 px-4 sm:px-8 border-t border-primary-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <img
              src="/images/lilisare-logo.png"
              alt="LiliSare - because we care"
              className="h-11 w-auto object-contain brightness-0 invert"
            />
            <p className="text-xs text-emerald-100/70 leading-relaxed">
              Proudly serving caregiving families throughout Colorado.
            </p>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px] mb-2">Headquarters</h4>
            <p className="font-medium">7100 E Belleview Ave, Ste 310</p>
            <p>Greenwood Village, CO 80111</p>
            <div className="pt-2">
              <span className="font-bold text-white block">Send Us an Email:</span>
              <a href="mailto:info@lilisare.com" className="text-emerald-200 hover:underline">
                info@lilisare.com
              </a>
            </div>
            <div className="pt-1">
              <span className="font-bold text-white block">Call or Text Now!</span>
              <a href="tel:3035780181" className="text-[#F2B632] hover:underline font-bold">
                303-578-0181
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-white">Home</a></li>
              <li><a href="#about-us" className="hover:text-white">About Us</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#welcome-steps" className="hover:text-white">Welcome Steps</a></li>
            </ul>
            <ul className="space-y-2">
              <li><a href="#community" className="hover:text-white">Community</a></li>
              <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
              <li><button onClick={onStartOnboarding} className="text-[#F2B632] hover:underline font-bold">Apply Now</button></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs text-slate-400">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">Certifications</h4>
            <p className="text-[11px] text-emerald-100/70 leading-relaxed">
              CDPHE Licensed • Health First Colorado Provider • Colorado Department of Health Care Policy & Financing (HCPF)
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-emerald-300 border border-white/10">
                HIPAA Compliant
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-[#F2B632] border border-white/10">
                CDPHE Verified
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© Copyright 2024 LiliSare LLC. All rights reserved. &ldquo;because we care&rdquo;</p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Non-Discrimination Notice</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Emergency Information</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Do Not Sell My Personal Information</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
