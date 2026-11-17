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
  ExternalLink,
  Smartphone,
  LayoutDashboard,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
  Play,
  Check,
  FileText,
  Star,
  Sliders,
  ArrowUpRight,
  CheckCheck,
  BadgeCheck,
  Layers,
  Baby,
  UserCheck
} from 'lucide-react';
import { usePortal } from '@/lib/store/portal-context';

interface LandingPageProps {
  onStartOnboarding: () => void;
  onExplorePortal: () => void;
}

export function LandingPage({ onStartOnboarding, onExplorePortal }: LandingPageProps) {
  const { notify } = usePortal();

  // Interactive Pay Calculator State
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(28);
  const hourlyRate = 28.5; // Average Colorado IHSS Attendant wage
  const weeklyEarnings = Math.round(hoursPerWeek * hourlyRate);
  const monthlyEarnings = Math.round(weeklyEarnings * 4.33);

  // Feature Tabs State
  const [activeTab, setActiveTab] = useState<'mobile' | 'intake' | 'clinical' | 'billing'>('mobile');

  // Interactive EVV Phone Simulation State
  const [isClockedIn, setIsClockedIn] = useState<boolean>(true);

  // Quick Lead Capture State
  const [leadContact, setLeadContact] = useState<string>('');
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadContact.trim()) return;
    setLeadSubmitted(true);
    notify(
      'Eligibility Inquiry Received',
      `Thank you! A LiliSare Care Coordinator will contact ${leadContact} within 24 hours.`,
      'success'
    );
  };

  return (
    <div className="w-full bg-[#fbfdfa] text-slate-800 antialiased overflow-x-hidden selection:bg-[#3e6b2b] selection:text-white">
      {/* SVG Clip Path for Heart Photo Cutouts */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M0.5,0.85 C0.3,0.7 0.05,0.5 0.05,0.3 C0.05,0.12 0.2,0.02 0.35,0.02 C0.43,0.02 0.48,0.08 0.5,0.14 C0.52,0.08 0.57,0.02 0.65,0.02 C0.8,0.02 0.95,0.12 0.95,0.3 C0.95,0.5 0.7,0.7 0.5,0.85 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* ========================================================================= */}
      {/* 1. TOP GREEN UTILITY BAR (Clean, High-Trust Colorado Header)               */}
      {/* ========================================================================= */}
      <div className="bg-[#244218] text-white text-xs py-2 px-4 sm:px-8 border-b border-primary-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3 flex-wrap justify-center text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00d084]" />
              Colorado CDPHE Licensed Agency • 100% Medicaid Covered
            </span>
            <span className="text-white/30 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-200">Have Questions? Call or Text:</span>
              <a href="tel:3035780181" className="font-extrabold text-[#F2B632] hover:underline">
                303-578-0181
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => alert('Para asistencia en español, llámenos directamente al 303-578-0181.')}
              className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-black px-2.5 py-0.5 rounded-full hover:brightness-105 transition-all shadow-xs"
            >
              📞 Se Habla Español
            </button>
            <div className="flex items-center gap-1 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-[#F2B632]" />
              <span className="font-bold">EN / ES</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN HEADER NAVIGATION (Crisp LiliSare Brand, Sticky & Accessible)       */}
      {/* ========================================================================= */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/images/lilisare-logo.png"
              alt="LiliSare - because we care"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </div>

          <nav className="hidden lg:flex items-center space-x-7 text-xs font-bold text-slate-700">
            <a href="#services" className="hover:text-primary transition-colors">Care Services</a>
            <a href="#calculator" className="hover:text-primary transition-colors flex items-center gap-1">
              <span>Pay Calculator</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e] text-[9px] font-black uppercase">Live</span>
            </a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
            <a href="#platform" className="hover:text-primary transition-colors">Software Features</a>
            <a href="#about-us" className="hover:text-primary transition-colors">Who We Are</a>
            <a href="#stories" className="hover:text-primary transition-colors">Family Stories</a>
            <a href="#community" className="hover:text-primary transition-colors">Community</a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onExplorePortal}
              className="text-xs font-bold text-slate-700 hover:text-primary px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors hidden sm:block"
            >
              Staff Portal
            </button>
            <button
              onClick={onStartOnboarding}
              className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6b6b] hover:to-[#ffa07a] text-slate-950 font-black px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. HERO SECTION (Full-Width, Emotional Heart Imagery + High-Converting CTA) */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#1b3114] via-[#2a4a1f] to-[#3e6b2b] text-white pt-12 pb-20 sm:pt-16 sm:pb-28 px-4 sm:px-8 overflow-hidden">
        {/* Soft Background Glow Effects */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-96 h-96 bg-[#F2B632]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          {/* Left Column: High-Impact Typography & Fast Action */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-[#F2B632]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Colorado Medicaid In-Home Support Services (IHSS & CNA)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
              Get Paid to care for your{' '}
              <span className="text-[#F2B632] underline decoration-[#ff7e5f] decoration-wavy decoration-2 underline-offset-4">
                loved ones
              </span>{' '}
              at home.
            </h1>

            <p className="text-base sm:text-lg text-emerald-100 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Because the <strong className="text-white font-black">Best Care</strong> starts with Family! LiliSare empowers parents, family members, and friends with competitive wages, easy mobile time-tracking, and complete RN nurse support.
            </p>

            {/* Quick Hero Lead Form */}
            <div className="bg-white/10 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl border border-white/25 max-w-lg mx-auto lg:mx-0 shadow-xl">
              <form onSubmit={handleLeadSubmit} className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter phone number or email..."
                  value={leadContact}
                  onChange={(e) => setLeadContact(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F2B632] font-medium"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto shrink-0 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6b6b] hover:to-[#ffa07a] text-slate-950 font-black text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap"
                >
                  <span>Check Eligibility</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Trust Metrics & Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-emerald-100 font-medium">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#F2B632]">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span><strong>900+</strong> Caregivers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00d084]" />
                <span><strong>$0</strong> Family Out-of-Pocket</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00d084]" />
                <span>Up to <strong>$32.50/hr</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Heart Frame + Floating Interactive Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Outer Decorative Heart Container */}
            <div className="relative w-full max-w-md sm:max-w-lg aspect-square flex items-center justify-center">
              {/* Glowing Warm Backdrop Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#F2B632]/25 to-emerald-400/20 blur-2xl transform scale-90 animate-pulse pointer-events-none" />

              {/* Heart Shape Photo Frame with Authentic Styling */}
              <div className="relative w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] p-3 rounded-[3.5rem] bg-gradient-to-b from-[#fef08a] via-[#fde047] to-[#F2B632] shadow-2xl flex items-center justify-center overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
                <div className="relative w-full h-full rounded-[3rem] overflow-hidden bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&auto=format&fit=crop&q=80"
                    alt="Mother joyfully caring for her happy child at home"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/10" />

                  {/* Inner Photo Caption */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-xs font-black tracking-wide uppercase text-[#F2B632]">Real Colorado Family</p>
                    <p className="text-sm sm:text-base font-extrabold leading-snug">
                      Elena & Mateo • Denver, Colorado
                    </p>
                    <p className="text-[11px] text-emerald-200 mt-0.5">Paid 28.5 hrs/week under IHSS Program</p>
                  </div>
                </div>

                {/* Decorative Mini Heart Accents along Frame Border */}
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#fde047] text-amber-900 flex items-center justify-center shadow-lg">
                  <Heart className="w-4 h-4 fill-amber-900" />
                </div>
                <div className="absolute bottom-12 right-2 w-6 h-6 rounded-full bg-[#fde047] text-amber-900 flex items-center justify-center shadow-md">
                  <Heart className="w-3 h-3 fill-amber-900" />
                </div>
              </div>

              {/* Floating Glass Badge 1: Top Left (Compensation) */}
              <div className="absolute -top-3 left-0 sm:-left-4 bg-white/95 backdrop-blur-md text-slate-900 p-3 sm:p-3.5 rounded-2xl shadow-2xl border border-white/60 flex items-center gap-3 transform -rotate-1 hover:rotate-0 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Bi-Weekly Pay</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900">Direct Deposit via ADP</span>
                </div>
              </div>

              {/* Floating Glass Badge 2: Bottom Left (Mobile EVV) */}
              <div className="absolute -bottom-4 left-2 sm:-left-4 bg-white/95 backdrop-blur-md text-slate-900 p-3 sm:p-3.5 rounded-2xl shadow-2xl border border-white/60 flex items-center gap-3 transform rotate-1 hover:rotate-0 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center font-bold">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Colorado EVV</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900">1-Tap GPS Mobile Clock-In</span>
                </div>
              </div>

              {/* Floating Glass Badge 3: Bottom Right (90% Family) */}
              <div className="absolute -bottom-2 right-0 sm:-right-4 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 p-2.5 sm:p-3 rounded-2xl shadow-2xl flex items-center gap-2 transform -rotate-2 hover:rotate-0 transition-transform">
                <Users className="w-4 h-4 fill-slate-950" />
                <span className="text-xs font-black">90% Family Caregivers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TRUSTED PARTNERS / COLORADO CASE MANAGEMENT AGENCIES                     */}
      {/* ========================================================================= */}
      <section className="py-8 bg-white border-b border-slate-200/80 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-black uppercase tracking-wider text-slate-400 mb-6">
            Authorized & Coordinated with Colorado Medicaid Case Management Agencies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-slate-500 font-bold text-xs sm:text-sm">
            <span className="hover:text-primary transition-colors flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
              Rocky Mountain Human Services (RMHS)
            </span>
            <span className="hover:text-primary transition-colors flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
              Developmental Pathways
            </span>
            <span className="hover:text-primary transition-colors flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
              Imagine! Colorado
            </span>
            <span className="hover:text-primary transition-colors flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
              The Resource Exchange (TRE)
            </span>
            <span className="hover:text-primary transition-colors flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
              Envision Colorado
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE COLORADO PAY CALCULATOR (High-Converting SaaS Tool)         */}
      {/* ========================================================================= */}
      <section id="calculator" className="py-16 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-[#f4f7f2] to-white relative">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Colorado Compensation Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Calculate Your Family Caregiver Monthly Earnings
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Under Colorado’s IHSS and CNA programs, family members earn competitive hourly wages to provide care right at home. Adjust the slider to see your potential compensation:
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-3xl border-2 border-emerald-200/80 p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Slider Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Weekly Care Hours Authorized:
                  </span>
                  <span className="text-2xl font-black text-primary px-3 py-1 bg-primary-50 rounded-xl border border-primary-200">
                    {hoursPerWeek} hrs / week
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="40"
                  step="1"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#3e6b2b]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-semibold">
                  <span>Part-Time (10 hrs)</span>
                  <span>Average IHSS (28.5 hrs)</span>
                  <span>Full-Time (40 hrs)</span>
                </div>
              </div>

              {/* Breakdown Highlights */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 font-semibold block text-[11px]">Colorado State Hourly Base</span>
                  <span className="text-base font-black text-slate-900">${hourlyRate.toFixed(2)} / hr</span>
                  <span className="text-[10px] text-emerald-600 block font-medium">Overtime eligible &gt; 40h</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 font-semibold block text-[11px]">Payroll Schedule</span>
                  <span className="text-base font-black text-slate-900">Bi-Weekly</span>
                  <span className="text-[10px] text-slate-500 block font-medium">Direct Deposit to your bank</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 flex items-start gap-2.5 text-xs text-emerald-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p>
                  <strong>100% Covered by Colorado Medicaid.</strong> There are zero out-of-pocket costs, application fees, or deductions from your loved one&apos;s benefits.
                </p>
              </div>
            </div>

            {/* Results & Immediate Action */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#1b3114] to-[#3e6b2b] text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col justify-between space-y-6 text-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F2B632]">Estimated Monthly Pay</span>
                <div className="text-3xl sm:text-5xl font-black text-white mt-1">
                  ${monthlyEarnings.toLocaleString()}
                  <span className="text-sm font-semibold text-emerald-200">/mo</span>
                </div>
                <p className="text-xs text-emerald-100/90 mt-1">
                  Estimated Weekly: <strong>${weeklyEarnings.toLocaleString()}</strong>
                </p>
                <p className="text-xs text-emerald-100/90">
                  Annual Support: <strong>${(weeklyEarnings * 52).toLocaleString()} / year</strong>
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/20">
                <button
                  onClick={onStartOnboarding}
                  className="w-full bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6b6b] hover:to-[#ffa07a] text-slate-950 font-black text-xs sm:text-sm py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Claim These Hours Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-emerald-200/80">
                  Fast 5-minute online intake • No commitment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. "OUR AVAILABLE SERVICES" (Heart Photos & Buttercup Cards like LiliSare) */}
      {/* ========================================================================= */}
      <section id="services" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#324925] text-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#F2B632] text-xs font-black uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-[#F2B632]" />
              <span>Compassionate Programs</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Our Available Care Services
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              We specialize in Colorado Medicaid waivers supporting children with special healthcare needs and adults with disabilities in their own homes.
            </p>
          </div>

          {/* 6 Warm Buttercup Service Cards with Heart-Shaped Photo Cutouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Service 1: IHSS */}
            <div className="bg-[#fef9ee] text-slate-900 p-6 rounded-3xl border border-[#fbe2a6] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                {/* Heart Cutout Frame */}
                <div className="relative w-36 h-36 mx-auto">
                  <div className="w-full h-full rounded-[2rem] overflow-hidden border-4 border-[#F2B632] shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&auto=format&fit=crop&q=80"
                      alt="Parent caring for child"
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#F2B632] text-amber-950 flex items-center justify-center shadow">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>

                <div className="text-center space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 inline-block">
                    Most Popular • Parent as Paid Caregiver
                  </span>
                  <h3 className="text-lg font-black text-slate-900">In-Home Support Services (IHSS)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Allows parents and family members to be hired and paid directly to provide personal care and homemaking for their loved one.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#fbe2a6] flex items-center justify-between gap-2">
                <button
                  onClick={onStartOnboarding}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-black text-xs shadow-sm hover:shadow transition-all"
                >
                  Apply Now
                </button>
                <button
                  onClick={onStartOnboarding}
                  className="px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white transition-colors"
                >
                  Read More
                </button>
              </div>
            </div>

            {/* Service 2: CNA */}
            <div className="bg-[#fef9ee] text-slate-900 p-6 rounded-3xl border border-[#fbe2a6] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="relative w-36 h-36 mx-auto">
                  <div className="w-full h-full rounded-[2rem] overflow-hidden border-4 border-[#F2B632] shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1594824813589-3221b2d7904e?w=400&auto=format&fit=crop&q=80"
                      alt="CNA Caregiver"
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#F2B632] text-amber-950 flex items-center justify-center shadow">
                    <Stethoscope className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-center space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 inline-block">
                    Skilled Clinical Care
                  </span>
                  <h3 className="text-lg font-black text-slate-900">Certified Nurse Aide (CNA)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Family members who are licensed CNAs earn elevated hourly wages providing skilled medical tasks with dedicated RN supervision.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#fbe2a6] flex items-center justify-between gap-2">
                <button
                  onClick={onStartOnboarding}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-black text-xs shadow-sm hover:shadow transition-all"
                >
                  Apply Now
                </button>
                <button
                  onClick={onStartOnboarding}
                  className="px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white transition-colors"
                >
                  Read More
                </button>
              </div>
            </div>

            {/* Service 3: HMA */}
            <div className="bg-[#fef9ee] text-slate-900 p-6 rounded-3xl border border-[#fbe2a6] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="relative w-36 h-36 mx-auto">
                  <div className="w-full h-full rounded-[2rem] overflow-hidden border-4 border-[#F2B632] shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1576765608866-5b51046452be?w=400&auto=format&fit=crop&q=80"
                      alt="Health Maintenance Activities"
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#F2B632] text-amber-950 flex items-center justify-center shadow">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-center space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 inline-block">
                    Nurse-Delegated Care
                  </span>
                  <h3 className="text-lg font-black text-slate-900">Health Maintenance (HMA)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Delegated clinical care such as medication administration, bowel/bladder regimens, and specialized therapy routines.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#fbe2a6] flex items-center justify-between gap-2">
                <button
                  onClick={onStartOnboarding}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-black text-xs shadow-sm hover:shadow transition-all"
                >
                  Apply Now
                </button>
                <button
                  onClick={onStartOnboarding}
                  className="px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white transition-colors"
                >
                  Read More
                </button>
              </div>
            </div>

            {/* Service 4: Community First Choice (CFC) */}
            <div className="bg-[#fef9ee] text-slate-900 p-6 rounded-3xl border border-[#fbe2a6] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="relative w-36 h-36 mx-auto">
                  <div className="w-full h-full rounded-[2rem] overflow-hidden border-4 border-[#F2B632] shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&auto=format&fit=crop&q=80"
                      alt="Community First Choice"
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#F2B632] text-amber-950 flex items-center justify-center shadow">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-center space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 inline-block">
                    Independent Living
                  </span>
                  <h3 className="text-lg font-black text-slate-900">Community First Choice (CFC)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Assistance with activities of daily living and community integration to help individuals remain independent at home.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#fbe2a6] flex items-center justify-between gap-2">
                <button
                  onClick={onStartOnboarding}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-black text-xs shadow-sm hover:shadow transition-all"
                >
                  Apply Now
                </button>
                <button
                  onClick={onStartOnboarding}
                  className="px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white transition-colors"
                >
                  Read More
                </button>
              </div>
            </div>

            {/* Service 5: Pediatric Respite */}
            <div className="bg-[#fef9ee] text-slate-900 p-6 rounded-3xl border border-[#fbe2a6] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="relative w-36 h-36 mx-auto">
                  <div className="w-full h-full rounded-[2rem] overflow-hidden border-4 border-[#F2B632] shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&auto=format&fit=crop&q=80"
                      alt="Pediatric Respite Care"
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#F2B632] text-amber-950 flex items-center justify-center shadow">
                    <Baby className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-center space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 inline-block">
                    Children with Special Needs
                  </span>
                  <h3 className="text-lg font-black text-slate-900">Pediatric & Respite Care</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Giving primary family caregivers temporary relief while trusted family friends or secondary attendants step in with full pay.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#fbe2a6] flex items-center justify-between gap-2">
                <button
                  onClick={onStartOnboarding}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-black text-xs shadow-sm hover:shadow transition-all"
                >
                  Apply Now
                </button>
                <button
                  onClick={onStartOnboarding}
                  className="px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white transition-colors"
                >
                  Read More
                </button>
              </div>
            </div>

            {/* Service 6: Adult & Senior Care */}
            <div className="bg-[#fef9ee] text-slate-900 p-6 rounded-3xl border border-[#fbe2a6] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="relative w-36 h-36 mx-auto">
                  <div className="w-full h-full rounded-[2rem] overflow-hidden border-4 border-[#F2B632] shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=400&auto=format&fit=crop&q=80"
                      alt="Adult and Senior Home Care"
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#F2B632] text-amber-950 flex items-center justify-center shadow">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-center space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 inline-block">
                    Elderly Parents & Adults
                  </span>
                  <h3 className="text-lg font-black text-slate-900">Adult Services & Supports</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Compassionate daily assistance allowing adult children and live-in relatives to care for aging parents with dignity.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#fbe2a6] flex items-center justify-between gap-2">
                <button
                  onClick={onStartOnboarding}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-black text-xs shadow-sm hover:shadow transition-all"
                >
                  Apply Now
                </button>
                <button
                  onClick={onStartOnboarding}
                  className="px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white transition-colors"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. HOW IT WORKS: 4 SIMPLE WELCOME STEPS (From LiliSare Original Site)      */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-primary">Simple & Stress-Free</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              4 Welcome Steps to Getting Paid
            </h2>
            <p className="text-xs text-slate-500">
              We handle the complicated state bureaucracy so your family can focus on what matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-[#fef9ee] border border-[#fbe2a6] text-center space-y-4 hover:shadow-lg transition-shadow relative">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#ff7e5f] to-[#feb47b] text-slate-950 flex items-center justify-center font-black text-lg shadow-md">
                1
              </div>
              <h3 className="text-base font-black text-slate-900">Get Started Online</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fill out our quick 5-minute intake. We verify your Medicaid waiver and start your care circle.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-[#fef9ee] border border-[#fbe2a6] text-center space-y-4 hover:shadow-lg transition-shadow relative">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#ff7e5f] to-[#feb47b] text-slate-950 flex items-center justify-center font-black text-lg shadow-md">
                2
              </div>
              <h3 className="text-base font-black text-slate-900">Case Manager Link</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We coordinate directly with your state case worker and physician for prior authorizations.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-[#fef9ee] border border-[#fbe2a6] text-center space-y-4 hover:shadow-lg transition-shadow relative">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#ff7e5f] to-[#feb47b] text-slate-950 flex items-center justify-center font-black text-lg shadow-md">
                3
              </div>
              <h3 className="text-base font-black text-slate-900">Start of Services</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Download the caregiver mobile app, complete digital signing, and begin clocking hours at home.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-3xl bg-[#fef9ee] border border-[#fbe2a6] text-center space-y-4 hover:shadow-lg transition-shadow relative">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#ff7e5f] to-[#feb47b] text-slate-950 flex items-center justify-center font-black text-lg shadow-md">
                4
              </div>
              <h3 className="text-base font-black text-slate-900">Ongoing Paid Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive on-time bi-weekly direct deposit pay, CPR refresher training, and ongoing nurse check-ins.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={onStartOnboarding}
              className="bg-primary hover:bg-primary-800 text-white font-black px-8 py-3.5 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              <span>Begin Step 1: Start Free Intake</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. SAAS PLATFORM SHOWCASE (AxisCare Style Interactive Tabs & App Mockup)  */}
      {/* ========================================================================= */}
      <section id="platform" className="py-16 sm:py-24 px-4 sm:px-8 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Purpose-Built Technology</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Modern Software for Families & Agency Staff
            </h2>
            <p className="text-xs text-slate-500">
              Explore how LiliSphere automates state EVV requirements, clinical nurse oversight, and Medicaid claim routing.
            </p>
          </div>

          {/* Interactive Tab Selectors */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 text-xs">
            {[
              { id: 'mobile', label: '1. Caregiver Mobile EVV App' },
              { id: 'intake', label: '2. Auto-Document Intake' },
              { id: 'clinical', label: '3. RN Supervisory Visits' },
              { id: 'billing', label: '4. Dual-NPI Medicaid Billing' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl font-black transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Tab Display Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* TAB 1: CAREGIVER MOBILE EVV */}
            {activeTab === 'mobile' && (
              <>
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                    Family-First Mobile Experience
                  </span>
                  <h3 className="text-xl sm:text-3xl font-black text-slate-900">
                    Colorado EVV Clock-In & Self-Service Correction
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Colorado requires Electronic Visit Verification for Medicaid home care. LiliSare makes this effortless with 1-tap mobile clock-in and our signature feature: self-service missed clock-out adjustments.
                  </p>
                  <div className="space-y-2.5 text-xs text-slate-700">
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>GPS Geofence automatically matches client residence.</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>AI voice-to-text notes make daily charting fast and compliant.</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Never lose pay: easy self-service corrections without calling the office.</span>
                    </p>
                  </div>
                </div>

                {/* Interactive Phone Simulation Widget */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-xs bg-slate-900 rounded-[2.5rem] p-3.5 shadow-2xl border-4 border-slate-800 text-white space-y-3 font-sans">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 pt-1">
                      <span>9:41 AM</span>
                      <div className="flex items-center gap-1">
                        <span>5G</span>
                        <div className="w-4 h-2 rounded-sm bg-emerald-500" />
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          Live Colorado EVV Shift
                        </span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                      </div>

                      <div>
                        <p className="text-sm font-black text-white">Mateo Morales (IHSS)</p>
                        <p className="text-[11px] text-slate-300">Caregiver: Elena Morales (Mother)</p>
                        <p className="text-[10px] text-emerald-300 font-mono mt-0.5">
                          Geofence: Inside Home Residence (100% Match)
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-900 text-center space-y-1">
                        <span className="text-[10px] text-slate-400">Shift Elapsed Today:</span>
                        <p className="text-xl font-black text-[#F2B632]">03h 45m 12s</p>
                      </div>

                      <button
                        onClick={() => {
                          setIsClockedIn(!isClockedIn);
                          notify(
                            isClockedIn ? 'Clocked Out' : 'Clocked In',
                            isClockedIn ? 'Shift recorded and synced with Sandata Colorado EVV.' : 'Shift active with live GPS validation.',
                            'info'
                          );
                        }}
                        className={`w-full py-2.5 rounded-xl font-black text-xs transition-all ${
                          isClockedIn
                            ? 'bg-rose-600 hover:bg-rose-700 text-white'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {isClockedIn ? 'Simulate Clock Out' : 'Simulate Clock In'}
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 text-[10px] text-slate-400">
                      ⚡ Synced live to Sandata Colorado Aggregator Hub
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* TAB 2: INTAKE */}
            {activeTab === 'intake' && (
              <>
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-900">
                    Automated Document Engine
                  </span>
                  <h3 className="text-xl sm:text-3xl font-black text-slate-900">
                    Rule-Driven 15–20 Document Compilation
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Staff never waste hours guessing forms. Selecting the service program (IHSS vs CNA vs HMA) and employment classification (W-2 vs 1099) auto-generates the exact document packet.
                  </p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> W-4 Federal withholding & Direct Deposit for family employees</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Automatic CBI fingerprint check and OIG exclusion triggers</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Independent patient & caregiver progress tracking (Rule 5)</p>
                  </div>
                </div>

                <div className="lg:col-span-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-2">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between">
                    <span>CBI Fingerprint Background Check:</span>
                    <strong className="text-emerald-700">Auto-Required</strong>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between">
                    <span>Family Attestation & Consent:</span>
                    <strong className="text-emerald-700">Auto-Required</strong>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between">
                    <span>State PAR (Prior Authorization):</span>
                    <strong className="text-primary font-bold">RMHS Linked</strong>
                  </div>
                </div>
              </>
            )}

            {/* TAB 3: CLINICAL RN */}
            {activeTab === 'clinical' && (
              <>
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900">
                    Clinical Excellence
                  </span>
                  <h3 className="text-xl sm:text-3xl font-black text-slate-900">
                    Registered Nurse Oversight & 60-Day Visits
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    State regulations require 60-day supervisory home visits for CNAs and quarterly reviews for HMA. Our platform automates scheduling and logs digital signatures.
                  </p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> On-site RN supervisory visits logged digitally</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Medication delegation & clinical competency evaluations</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Real-time compliance alerts for CPR and TB renewals</p>
                  </div>
                </div>

                <div className="lg:col-span-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-slate-900 block">60-Day CNA Onsite Supervisory Visit</span>
                    <span className="text-slate-500">Supervising RN: Rebecca Stern, RN • Next due: in 14 days</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-slate-900 block">HMA Quarterly Nurse Delegation</span>
                    <span className="text-emerald-700 font-semibold">Completed & Certified</span>
                  </div>
                </div>
              </>
            )}

            {/* TAB 4: BILLING */}
            {activeTab === 'billing' && (
              <>
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900">
                    Revenue Cycle & Payroll
                  </span>
                  <h3 className="text-xl sm:text-3xl font-black text-slate-900">
                    Dual-NPI Routing & Zero-Error Claims
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Automatically splits claims under Mountain Lane vs. Colorado Home Health, handles commercial denial attachments, and pushes verified EVV hours directly to ADP Run.
                  </p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Automated 837P electronic claim generation for Colorado MMIS</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Prerequisite commercial denial letter tracking</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% clean audit trail preserved for 7 years</p>
                  </div>
                </div>

                <div className="lg:col-span-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-2">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between">
                    <span>Mountain Lane NPI:</span>
                    <strong className="text-emerald-700 font-bold">1942289410</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between">
                    <span>Colorado Home Health NPI:</span>
                    <strong className="text-emerald-700 font-bold">1487621190</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between">
                    <span>ADP Payroll Batch:</span>
                    <strong className="text-slate-800">Ready for Direct Deposit</strong>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. WHO WE ARE: FOUNDED BY TWO MOTHERS (Heart & Soul Brand Story)           */}
      {/* ========================================================================= */}
      <section id="about-us" className="py-16 sm:py-24 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 text-primary-900 text-xs font-black uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Who We Are — LiliSare</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Live-In Caregivers, Family Caregivers, and Family Friends
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
              At LiliSare, we believe caregiving comes in many forms. Whether you&apos;re a family member or a close friend, we’re here to support you. We value the strength of community and the deep bond between those who provide care and those who receive it.
            </p>
          </div>

          {/* Founders Story Spotlight Box */}
          <div className="bg-gradient-to-br from-[#244218] via-[#324925] to-[#1b3114] text-white rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                <div className="relative w-40 h-40 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1576765608866-5b51046452be?w=600&auto=format&fit=crop&q=80"
                    alt="Founders of LiliSare"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Founded by Two Mothers</h3>
                  <p className="text-xs text-[#F2B632] font-semibold mt-0.5">Of children with special healthcare needs</p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-slate-100 leading-relaxed border-t lg:border-t-0 lg:border-l border-white/15 pt-6 lg:pt-0 lg:pl-8">
                <p className="font-semibold text-emerald-100 text-sm sm:text-base leading-relaxed">
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
            <div className="p-7 rounded-3xl bg-[#fef9ee] border border-[#fbe2a6] shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-[11px] font-black uppercase tracking-wider text-primary">
                  WE ARE COMMITTED
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900">Mission Statement</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                At LiliSare, our mission is to care for the whole family—both the loved one receiving care and the caregiver giving it. We share what we&apos;ve learned, navigate services alongside you, and offer the knowledge, guidance, and support that help your family thrive together.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#fef9ee] border border-[#fbe2a6] shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d99719]" />
                <span className="text-[11px] font-black uppercase tracking-wider text-[#d99719]">
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

      {/* ========================================================================= */}
      {/* 10. REAL STORIES FROM COLORADO FAMILIES                                    */}
      {/* ========================================================================= */}
      <section id="stories" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#1b3114] text-white">
        <div className="max-w-5xl mx-auto space-y-10 text-center">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F2B632]">Voices from Colorado</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Hear From Our Caregivers & Families
            </h2>
          </div>

          <div className="bg-slate-900/70 rounded-3xl border border-white/20 p-6 sm:p-10 backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
            <div className="md:col-span-5 relative aspect-video bg-black/40 rounded-2xl overflow-hidden border border-white/20 flex items-center justify-center group cursor-pointer shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"
                alt="Elena and Mateo family story"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
              />
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#ff7e5f] to-[#feb47b] text-slate-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <p className="text-xs sm:text-sm text-emerald-100 italic leading-relaxed">
                &ldquo;Before LiliSare, I was trying to balance a job outside our home while managing my 10-year-old son’s autism and therapy appointments. Now, through the IHSS program, I am paid as his full-time attendant. The clock-in app is effortless, and having dedicated RN nurse support makes us feel truly protected.&rdquo;
              </p>
              <div className="pt-2 border-t border-white/15">
                <h4 className="text-sm font-black text-white">Elena Morales</h4>
                <p className="text-xs text-[#F2B632]">Denver, Colorado • Family Caregiver for Mateo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. WEGO COMMUNITY OUTINGS (Warm Community Events Gallery)                */}
      {/* ========================================================================= */}
      <section id="community" className="py-16 px-4 sm:px-8 bg-[#244218] text-white text-center">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black text-white">Explore our WeGo Community Events</h2>
            <p className="text-xs sm:text-sm text-emerald-100">Connecting Colorado caregiving families through accessible community outings, sensory days, and peer support.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg border-2 border-white/20 transform hover:scale-105 transition-transform">
              <img src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&auto=format&fit=crop&q=80" alt="Outing" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg border-2 border-white/20 transform hover:scale-105 transition-transform">
              <img src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80" alt="Therapy pony" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg border-2 border-white/20 transform hover:scale-105 transition-transform">
              <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&auto=format&fit=crop&q=80" alt="Kids event" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg border-2 border-white/20 transform hover:scale-105 transition-transform">
              <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&auto=format&fit=crop&q=80" alt="Caregivers" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. HIGH-CONVERTING BOTTOM CTA / LEAD CAPTURE                             */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-white">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#244218] via-[#324925] to-[#1b3114] text-white rounded-3xl p-8 sm:p-14 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <span className="text-xs font-black uppercase tracking-wider text-[#F2B632]">Ready to Begin?</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Start Your Family Onboarding in 5 Minutes
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
              Join hundreds of Colorado families getting paid to care for their loved ones. Our onboarding wizard walks you through every step with zero paperwork confusion.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button
              onClick={onStartOnboarding}
              className="w-full sm:w-auto bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6b6b] hover:to-[#ffa07a] text-slate-950 font-black text-xs sm:text-sm px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Launch Onboarding Wizard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:3035780181"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#F2B632]" />
              <span>Call / Text: 303-578-0181</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. ENTERPRISE FOOTER                                                     */}
      {/* ========================================================================= */}
      <footer className="bg-[#14210e] text-slate-300 py-16 px-4 sm:px-8 border-t border-primary-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <img
              src="/images/lilisare-logo.png"
              alt="LiliSare"
              className="h-11 w-auto object-contain brightness-0 invert"
            />
            <p className="text-xs text-slate-400 leading-relaxed">
              LiliSare combines Mountain Lane and Colorado Home Health to deliver compassionate, technology-enabled caregiving operations across Colorado.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-emerald-300">CDPHE Licensed</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-[#F2B632]">HIPAA BAA Verified</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px] mb-3">Headquarters & Contact</h4>
            <p className="text-slate-300">7100 E Belleview Ave, Ste 310</p>
            <p className="text-slate-300">Greenwood Village, CO 80111</p>
            <p className="pt-2 text-slate-400">Call / Text: <a href="tel:3035780181" className="text-[#F2B632] font-bold">303-578-0181</a></p>
            <p className="text-slate-400">Email: <a href="mailto:info@lilisare.com" className="text-slate-200">info@lilisare.com</a></p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px] mb-3">Software & Portals</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={onStartOnboarding} className="hover:text-white">Patient & Caregiver Onboarding</button></li>
              <li><button onClick={onExplorePortal} className="hover:text-white">Staff Operations Portal</button></li>
              <li><button onClick={onExplorePortal} className="hover:text-white">Family Caregiver Mobile Portal</button></li>
              <li><button onClick={onExplorePortal} className="hover:text-white">Colorado EVV Aggregator Hub</button></li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px] mb-3">Medicaid Programs</h4>
            <ul className="space-y-2 text-slate-400">
              <li>In-Home Support Services (IHSS)</li>
              <li>Certified Nurse Aide (CNA) Care</li>
              <li>Health Maintenance Activities (HMA)</li>
              <li>Community First Choice (CFC)</li>
              <li>HCBS Waiver Respite & Supports</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} LiliSare LLC. All rights reserved. &ldquo;because we care&rdquo;</p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Client Rights</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Emergency Protocol</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
