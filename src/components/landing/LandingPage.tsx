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
  FileCheck
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
  const [eligibilityChecked, setEligibilityChecked] = useState(false);

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 antialiased overflow-hidden">
      {/* 1. TOP UTILITY BAR (Exact from reference screenshot) */}
      <div className="bg-[#324925] text-white text-xs py-2 px-4 sm:px-8 border-b border-primary-800/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Contact info & Spanish badge */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <div className="flex items-center gap-1.5 font-medium">
              <span>Have Questions? Call or Text Us Today!</span>
              <a
                href="tel:3035780181"
                className="font-extrabold text-[#fcb900] hover:underline tracking-wide"
              >
                303-578-0181
              </a>
            </div>
            <button
              onClick={() => alert('Spanish language assistance: Llame al 303-578-0181 para atención en español.')}
              className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-bold px-3 py-0.5 rounded-full text-[11px] shadow-sm hover:opacity-95 transition-opacity"
            >
              📞 Se Habla Español
            </button>
          </div>

          {/* Search & Language Selector */}
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search services, waivers..."
                className="w-44 text-[11px] pl-7 pr-3 py-1 rounded-full bg-white/10 text-white placeholder-slate-300 border border-white/20 focus:outline-none focus:ring-1 focus:ring-[#F2B632]"
              />
              <Search className="w-3.5 h-3.5 absolute left-2 top-1.5 text-slate-300" />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Logo with Lotus & Heart */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              src="/images/lilisare-logo.png"
              alt="LiliSare - because we care"
              className="h-11 sm:h-13 w-auto object-contain"
            />
          </div>

          {/* Nav Pills in Orange Gradient (Matching reference) */}
          <nav className="hidden lg:flex items-center bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] rounded-full px-5 py-2 shadow-sm text-slate-950 font-bold text-xs tracking-wide space-x-6">
            <a href="#hero" className="hover:text-white transition-colors underline decoration-white decoration-2 underline-offset-4">Home</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">About Us</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#eligibility" className="hover:text-white transition-colors">Resources</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#community" className="hover:text-white transition-colors">Community</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact Us</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onExplorePortal}
              className="text-xs font-bold text-primary-800 hover:text-primary-950 px-3 py-2 rounded-xl hover:bg-primary-50 transition-colors hidden sm:block"
            >
              Staff Portal
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

      {/* 3. HERO SECTION (Reconstructed faithfully from the uploaded reference image) */}
      <section id="hero" className="relative bg-[#3e6b2b] text-white py-14 sm:py-20 px-4 sm:px-8 overflow-hidden">
        {/* Soft Organic Leaf / Water Lily Background Shapes */}
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-[#4e723c] rounded-full filter blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-[#324925] rounded-full filter blur-2xl opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Text Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-[#fef9ee]">
              <Sparkles className="w-4 h-4 text-[#F2B632]" />
              <span>Colorado’s Leading Family Caregiver Program</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.15] text-[#fef9ee]">
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
              <a
                href="tel:3035780181"
                className="w-full sm:w-auto text-center px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs transition-colors"
              >
                Call: (303) 578-0181
              </a>
            </div>

            {/* Micro value badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-emerald-100">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00d084]" />
                <span>100% Medicaid Funded</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00d084]" />
                <span>Top Hourly Rates</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00d084]" />
                <span>Dedicated RN Nurse Oversight</span>
              </div>
            </div>
          </div>

          {/* Right Image Frame: Heart-shaped Frame with Children (from reference) */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="relative w-full max-w-md sm:max-w-lg">
              {/* Outer decorative warm glow */}
              <div className="absolute inset-0 bg-[#F2B632]/20 rounded-full blur-2xl transform scale-95" />

              {/* Heart Frame Container */}
              <div className="relative rounded-[40px] border-4 border-[#fffbeb] bg-gradient-to-br from-white/10 to-white/5 p-3 shadow-2xl backdrop-blur-sm">
                <div className="overflow-hidden rounded-[32px] aspect-[4/3] relative">
                  <img
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=80"
                    alt="Happy family siblings smiling together"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Floating floating badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-white shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                        <Heart className="w-5 h-5 fill-rose-600 text-rose-600" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900 leading-tight">90% Family Caregivers</p>
                        <p className="text-[11px] text-slate-500">Parents, spouses & siblings paid weekly</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      Active CO Waiver
                    </span>
                  </div>
                </div>

                {/* Heart badge accents */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#fffbeb] text-rose-500 flex items-center justify-center shadow-lg border-2 border-[#F2B632]">
                  <Heart className="w-5 h-5 fill-rose-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THREE EASY STEPS / HOW IT WORKS (Clean, Full-width, Minimal Text) */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Simple & Transparent</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              We handle the complex state paperwork, background checks, and certifications so you can focus on caring for your family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-primary/50 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary flex items-center justify-center font-black text-lg mb-4 group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">Check Eligibility</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Take our 2-minute online check or speak with our team to verify if your family member qualifies under Colorado Health First (Medicaid).
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center text-xs font-bold text-primary">
                <span>Free Consultation</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-primary/50 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-secondary-100 text-secondary-900 flex items-center justify-center font-black text-lg mb-4 group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">Guided Onboarding</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Our 2-person intake team coordinates state case-manager authorizations, free CBI fingerprinting, and online LearnWorlds training.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center text-xs font-bold text-secondary-700">
                <span>100% Free Training</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-primary/50 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg mb-4 group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">Get Paid Bi-Weekly</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Clock in using our simple mobile app. Enjoy competitive hourly pay, direct deposit through ADP, and dedicated nurse support.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center text-xs font-bold text-emerald-700">
                <span>Direct Deposit to Bank</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVICES & PROGRAMS SECTION (Clean cards with imagery and tags) */}
      <section id="services" className="py-16 sm:py-20 px-4 sm:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Colorado State Programs</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Care Services Covered by Medicaid
              </h2>
            </div>
            <button
              onClick={onStartOnboarding}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>Explore which program fits your family</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Service 1: IHSS */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-primary-100 text-primary flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-primary-50 text-primary-800">
                  Most Popular
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">IHSS Program</h3>
                <p className="text-xs text-slate-500 font-medium">In-Home Support Services</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Allows parents or family members to be hired directly as attendants for personal care, hygiene, and daily living.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                No formal medical license required
              </div>
            </div>

            {/* Service 2: CNA */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-teal-50 text-teal-800">
                  Certified Care
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">CNA Services</h3>
                <p className="text-xs text-slate-500 font-medium">Certified Nurse Aide</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  For clients needing skilled physical support. Includes ongoing oversight from our Registered Nurse supervisors.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                Requires state DORA CNA license
              </div>
            </div>

            {/* Service 3: HMA */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800">
                  Skilled Maintenance
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">HMA Support</h3>
                <p className="text-xs text-slate-500 font-medium">Health Maintenance Activities</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Enteral feeding (G-tube), tracheostomy care, nebulizers, and medication administration with RN supervision.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                Initial RN visit + quarterly virtual checks
              </div>
            </div>

            {/* Service 4: Personal Care */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <HomeIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                  Daily Assistance
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">Personal Care</h3>
                <p className="text-xs text-slate-500 font-medium">Homemaker & ADL Support</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Meal preparation, light housekeeping, mobility assistance, and safety companionship for elderly and adults.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                Annual in-home assessment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INSTANT 30-SECOND ELIGIBILITY CHECKER (Interactive & Action-Oriented) */}
      <section id="eligibility" className="py-16 sm:py-20 px-4 sm:px-8 bg-white border-y border-slate-200/70">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#F2B632]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F2B632]">
                Instant Pre-Qualification
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Do You Qualify to Get Paid?
              </h2>
              <p className="text-xs text-slate-200">
                Answer 3 quick questions to check your family eligibility for Colorado paid caregiving.
              </p>
            </div>

            <div className="space-y-3 max-w-xl mx-auto">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-xs">
                <span className="font-semibold text-white">1. Does your family member live in Colorado?</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEligibilityAnswers({ ...eligibilityAnswers, livesInColorado: true })}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      eligibilityAnswers.livesInColorado ? 'bg-[#00d084] text-slate-950' : 'bg-white/20 text-white'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setEligibilityAnswers({ ...eligibilityAnswers, livesInColorado: false })}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      !eligibilityAnswers.livesInColorado ? 'bg-rose-500 text-white' : 'bg-white/20 text-white'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-xs">
                <span className="font-semibold text-white">2. Do they receive or qualify for Medicaid (Health First CO)?</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEligibilityAnswers({ ...eligibilityAnswers, hasMedicaid: true })}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      eligibilityAnswers.hasMedicaid ? 'bg-[#00d084] text-slate-950' : 'bg-white/20 text-white'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setEligibilityAnswers({ ...eligibilityAnswers, hasMedicaid: false })}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      !eligibilityAnswers.hasMedicaid ? 'bg-rose-500 text-white' : 'bg-white/20 text-white'
                    }`}
                  >
                    Not Sure
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-xs">
                <span className="font-semibold text-white">3. Are you a parent, spouse, relative, or trusted caregiver?</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEligibilityAnswers({ ...eligibilityAnswers, careForLovedOne: true })}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      eligibilityAnswers.careForLovedOne ? 'bg-[#00d084] text-slate-950' : 'bg-white/20 text-white'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setEligibilityAnswers({ ...eligibilityAnswers, careForLovedOne: false })}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      !eligibilityAnswers.careForLovedOne ? 'bg-rose-500 text-white' : 'bg-white/20 text-white'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            {/* Result callout */}
            <div className="text-center pt-2">
              <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold mb-4">
                <CheckCircle2 className="w-4 h-4 text-[#00d084]" />
                <span>You likely qualify! You can receive competitive weekly pay to care for your loved one.</span>
              </div>
              <div>
                <button
                  onClick={onStartOnboarding}
                  className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6b6b] hover:to-[#ffa07a] text-slate-950 font-black text-sm px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  Start Guided Onboarding Wizard $\rightarrow$
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REAL FAMILY STORIES / TESTIMONIALS */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Voices from Colorado</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Real Families, Real Care
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                &ldquo;Before LiliSare, I was struggling to juggle an outside job while taking care of my 10-year-old son with special needs. Through the IHSS program, I am now paid to be his full-time caregiver. The paperwork was handled for me, and clocking in on the app is so simple.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center">
                  EM
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Elena Morales</h4>
                  <p className="text-[11px] text-slate-500">Denver, CO • IHSS Family Caregiver for Mateo</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                &ldquo;My daughter has complex health needs requiring daily G-tube maintenance. LiliSare arranged the initial RN visit, assisted with our Rocky Mountain Human Services authorization, and guided us every step of the way.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center">
                  MR
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Marcos Ramirez</h4>
                  <p className="text-[11px] text-slate-500">Aurora, CO • HMA Caregiver for Sophia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER (Clean, professional, compliant) */}
      <footer id="contact" className="bg-[#14210e] text-slate-300 py-12 px-4 sm:px-8 border-t border-primary-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <img
              src="/images/lilisare-logo.png"
              alt="LiliSare"
              className="h-10 w-auto object-contain brightness-0 invert"
            />
            <p className="text-xs text-slate-400 leading-relaxed">
              LiliSare unites Mountain Lane and Colorado Home Health to empower families with compassionate, state-funded in-home caregiving services across Colorado.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Care Programs</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>In-Home Support Services (IHSS)</li>
              <li>Certified Nurse Aide (CNA) Care</li>
              <li>Health Maintenance Activities (HMA)</li>
              <li>Personal Care & Homemaker Services</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Colorado Contact</h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p className="font-semibold text-white">LiliSare Operations Center</p>
              <p>Call or Text: <a href="tel:3035780181" className="text-[#F2B632] hover:underline font-bold">303-578-0181</a></p>
              <p>Email: <a href="mailto:info@lilisare.com" className="text-slate-300 hover:underline">info@lilisare.com</a></p>
              <p>Serving Denver, Aurora, Lakewood, Boulder, Colorado Springs & Rural Counties</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Compliance & State Standards</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Certified by the Colorado Department of Public Health and Environment (CDPHE) and Health First Colorado (Medicaid). Enforced under HIPAA BAA standards.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-emerald-300 border border-white/10">
                HIPAA Compliant
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-[#F2B632] border border-white/10">
                CDPHE Licensed
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} LiliSare LLC. All rights reserved. &ldquo;because we care&rdquo;</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Client Rights</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
