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
  Star
} from 'lucide-react';

interface LandingPageProps {
  onStartOnboarding: () => void;
  onExplorePortal: () => void;
}

export function LandingPage({ onStartOnboarding, onExplorePortal }: LandingPageProps) {
  const [activeFeatureTab, setActiveFeatureTab] = useState<'intake' | 'mobile' | 'clinical' | 'billing'>('intake');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 antialiased overflow-hidden">
      {/* 1. TOP GREEN UTILITY BAR */}
      <div className="bg-[#3e6b2b] text-white text-xs py-2 px-4 sm:px-8 border-b border-primary-800/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-3 flex-wrap justify-center text-[11px] sm:text-xs">
            <span className="font-medium text-emerald-100">Colorado’s Unified Family Caregiver & EHR Operations Platform</span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 font-medium">
              <span>Questions? Call or Text:</span>
              <a href="tel:3035780181" className="font-extrabold text-[#F2B632] hover:underline">
                303-578-0181
              </a>
            </div>
            <button
              onClick={() => alert('Para asistencia en español, llámenos al 303-578-0181.')}
              className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-bold px-2.5 py-0.5 rounded-full text-[10px] shadow-sm hover:opacity-95"
            >
              📞 Se Habla Español
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search services, waivers..."
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

      {/* 2. MAIN HEADER (Clean AxisCare style with LiliSare brand) */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/images/lilisare-logo.png"
              alt="LiliSare - because we care"
              className="h-11 sm:h-12 w-auto object-contain"
            />
          </div>

          <nav className="hidden lg:flex items-center space-x-7 text-xs font-bold text-slate-700">
            <a href="#overview" className="hover:text-primary transition-colors">Platform Overview</a>
            <a href="#features" className="hover:text-primary transition-colors">Software Features</a>
            <a href="#about-us" className="hover:text-primary transition-colors">Who We Are</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">Family Stories</a>
            <a href="#community" className="hover:text-primary transition-colors">Community</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onExplorePortal}
              className="text-xs font-bold text-slate-700 hover:text-primary px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors hidden sm:block"
            >
              Sign In
            </button>
            <button
              onClick={onStartOnboarding}
              className="bg-primary hover:bg-primary-800 text-white font-black px-4 sm:px-5 py-2.5 rounded-xl text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION (Modeled after AxisCare's "Growth Takes the Right Partner" with SaaS Perspective Mockup) */}
      <section id="overview" className="relative bg-gradient-to-b from-[#1e3416] via-[#2a471f] to-[#3e6b2b] text-white pt-16 pb-24 px-4 sm:px-8 overflow-hidden text-center">
        {/* Soft glowing ambient lighting */}
        <div className="absolute left-1/2 -top-24 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-bold text-[#F2B632]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LiliSphere • Colorado Family Caregiver & EHR Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-white">
            Caregiving Takes the <span className="text-[#F2B632]">Right Partner</span>
          </h1>

          <p className="text-sm sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed font-medium">
            Get paid to care for loved ones at home while automating state Medicaid compliance, Colorado EVV time verification, and case-manager authorizations in one unified system.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onStartOnboarding}
              className="w-full sm:w-auto bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6b6b] hover:to-[#ffa07a] text-slate-950 font-black text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>Begin Patient & Caregiver Onboarding</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExplorePortal}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs transition-colors"
            >
              Explore Staff Operations Portals
            </button>
          </div>

          {/* Social Proof Star Ratings */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-100/90 font-medium">
            <div className="flex items-center gap-1.5">
              <div className="flex text-[#F2B632]"><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /></div>
              <span><strong>900+</strong> Caregivers Supported</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00d084]" />
              <span><strong>CDPHE</strong> Licensed Agency</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00d084]" />
              <span><strong>100%</strong> Colorado Medicaid Covered</span>
            </div>
          </div>

          {/* SaaS Perspective UI Mockup (Desktop Dashboard + Mobile EVV App side by side) */}
          <div className="pt-8 max-w-5xl mx-auto">
            <div className="relative rounded-3xl border-4 border-white/20 bg-slate-900/80 shadow-2xl p-3 sm:p-5 backdrop-blur-xl">
              <div className="bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 text-left space-y-4">
                {/* Mockup Topbar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-slate-300 ml-2">LiliSphere Command Console — Mountain Lane & Colorado Home Health</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    CO EVV: Live Synced
                  </span>
                </div>

                {/* Dashboard Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Caregivers</span>
                    <p className="text-xl font-black text-white mt-0.5">914</p>
                    <span className="text-[10px] text-emerald-400">90% Family Members</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Client Population</span>
                    <p className="text-xl font-black text-[#F2B632] mt-0.5">512</p>
                    <span className="text-[10px] text-slate-400">IHSS, CNA & HMA</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">EVV Match Rate</span>
                    <p className="text-xl font-black text-[#00d084] mt-0.5">99.1%</p>
                    <span className="text-[10px] text-slate-400">Sandata Open REST</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Unbilled Hours</span>
                    <p className="text-xl font-black text-white mt-0.5">0</p>
                    <span className="text-[10px] text-emerald-400">Dual-NPI Batch Cleared</span>
                  </div>
                </div>

                {/* Mock Queue Row */}
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      EM
                    </div>
                    <div>
                      <p className="font-bold text-white">Elena Morales → Mateo Morales (IHSS Program)</p>
                      <p className="text-[11px] text-slate-400">Denver Residence Geofence Matched • 28.5 hrs/wk authorized • ADP Run Direct Deposit</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active & Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRUSTED PARTNERS / CASE MANAGEMENT AGENCIES BAR (AxisCare style logo bar) */}
      <section className="py-8 bg-white border-b border-slate-200/80 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
            Coordinated with Colorado Medicaid Case Management Agencies & State Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-slate-500 font-bold text-xs sm:text-sm">
            <span className="hover:text-primary transition-colors">Rocky Mountain Human Services (RMHS)</span>
            <span className="hover:text-primary transition-colors">Developmental Pathways</span>
            <span className="hover:text-primary transition-colors">Imagine! Colorado</span>
            <span className="hover:text-primary transition-colors">The Resource Exchange (TRE)</span>
            <span className="hover:text-primary transition-colors">Boulder County Housing & Human Services</span>
          </div>
        </div>
      </section>

      {/* 5. "BUILT TO HELP YOUR FAMILY & AGENCY GROW" VALUE BANNER (Direct AxisCare inspiration) */}
      <section className="bg-gradient-to-r from-[#14210e] via-[#1e3416] to-[#14210e] text-white py-16 px-4 sm:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#F2B632]">
            The LiliSphere Advantage
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Built to Support Families & Scale Agency Capacity
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A small 2-person onboarding team can seamlessly manage 900+ family caregivers. We replace manual paperwork, chasing signatures, and fragmented legacy software with a single automated workflow engine.
          </p>
        </div>
      </section>

      {/* 6. A CUSTOMIZABLE THREE-PILLAR SOLUTION (3 Cards from AxisCare design) */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Purpose-Built Architecture</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              A Complete Operational Solution
            </h2>
            <p className="text-xs text-slate-500">
              Engineered specifically for Colorado home-care agencies where 90% of caregivers are family members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Pillar 1 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 hover:shadow-xl hover:border-primary/50 transition-all flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Empower Family Caregivers</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fast mobile onboarding, bi-weekly direct deposit through ADP, and self-service missed clock-out corrections that eliminate phone tag.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200/70">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary" /> Mobile-first friendly app</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary" /> Self-service time corrections</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary" /> AI voice-to-text care notes</li>
                </ul>
              </div>
              <button
                onClick={onStartOnboarding}
                className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-800 text-white font-bold text-xs shadow-sm transition-colors"
              >
                Learn More
              </button>
            </div>

            {/* Pillar 2 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 hover:shadow-xl hover:border-[#F2B632] transition-all flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary-100 text-secondary-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LayoutDashboard className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Gain Total Operational Control</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Automate service-driven 15–20 document packets, direct CBI background check triggers, and state case-manager follow-ups.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200/70">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-secondary-700" /> Linked household data model</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-secondary-700" /> Automated CBI & OIG screening</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-secondary-700" /> Case-manager automated alerts</li>
                </ul>
              </div>
              <button
                onClick={onExplorePortal}
                className="w-full py-2.5 rounded-xl bg-secondary hover:bg-secondary-500 text-slate-950 font-bold text-xs shadow-sm transition-colors"
              >
                Explore Operations
              </button>
            </div>

            {/* Pillar 3 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 hover:shadow-xl hover:border-emerald-500 transition-all flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Bill Confidently & Stay Compliant</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dual-NPI claim routing (Mountain Lane vs. Colorado Home Health), commercial insurer denial letters, and 7-year audit retention.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200/70">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Sandata EVV open REST standard</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Commercial denial letter workflow</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> 7-Year CDPHE audit vault</li>
                </ul>
              </div>
              <button
                onClick={onExplorePortal}
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-colors"
              >
                Compliance Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE SOFTWARE FEATURE TABS (Modeled after AxisCare's "Built-In Software Features") */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-8 bg-slate-50 border-y border-slate-200/70">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Core Modules</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Platform Software Features
            </h2>
          </div>

          {/* Feature Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 text-xs">
            {[
              { id: 'intake', label: 'Intake & Onboarding' },
              { id: 'mobile', label: 'Caregiver EVV Mobile' },
              { id: 'clinical', label: 'RN Supervision' },
              { id: 'billing', label: 'Medicaid Billing' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFeatureTab(tab.id as any)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                  activeFeatureTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Feature Tab Active Showcase */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {activeFeatureTab === 'intake' && (
              <>
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-primary-100 text-primary-900">
                    Two-Person Scaling Engine
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Automated Service-Driven Onboarding
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Staff never manually pick individual forms. Selecting the care service (IHSS, CNA, HMA, Personal Care) and caregiver classification (W-2 vs 1099) auto-compiles the exact 15–20 document packet.
                  </p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Linked household data reuse without duplicating legal records</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Direct Colorado Bureau of Investigation (CBI) background screening</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Automated case-manager follow-up alerts to protect authorizations</p>
                  </div>
                  <button
                    onClick={onStartOnboarding}
                    className="mt-2 text-xs font-bold text-primary hover:underline flex items-center gap-1.5"
                  >
                    <span>Launch 5-Step Onboarding Wizard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="lg:col-span-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3 font-mono">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-bold text-slate-800">Rule 4 Document Auto-Selection</span>
                    <span className="text-emerald-700 font-bold">IHSS + W-2 Family</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-between">
                    <span>Form W-4 Federal Tax Withholding</span>
                    <span className="text-emerald-600 font-bold">Auto-Included</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-between">
                    <span>CBI Fingerprint Background Check</span>
                    <span className="text-emerald-600 font-bold">Auto-Included</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-between">
                    <span>Family Attestation & Mutual Consent</span>
                    <span className="text-emerald-600 font-bold">Auto-Included</span>
                  </div>
                </div>
              </>
            )}

            {activeFeatureTab === 'mobile' && (
              <>
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-secondary-100 text-secondary-900">
                    Mobile-First Experience
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Colorado EVV Clock-In & Self-Correction
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Designed for family caregivers on mobile phones. One-tap clock-in with GPS geofencing, plus the #1 operational feature: self-service missed clock-out corrections.
                  </p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> GPS Geofence validation at client home residence</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Caregiver self-corrects missed time with reason logging</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> AI speech-to-text care notes with 97% compliance score</p>
                  </div>
                </div>
                <div className="lg:col-span-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                  <div className="p-4 rounded-xl bg-white border border-emerald-200 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Caregiver Mobile View</span>
                    <p className="text-sm font-black text-slate-900">Elena Morales caring for Mateo Morales</p>
                    <p className="text-emerald-700 font-bold">08:00 AM – 12:00 PM • GPS Geofenced Active</p>
                    <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-900 text-[11px] font-medium">
                      AI Note Transcription: &ldquo;Completed morning mobility routine & administered fluids. Mateo is happy.&rdquo; (97% Medicaid Compliant)
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeFeatureTab === 'clinical' && (
              <>
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-teal-100 text-teal-900">
                    Nursing & QA
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    State-Mandated RN Supervisory Visits
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Automated scheduling and evidence logging for 60-day in-home CNA visits and quarterly virtual HMA nurse reviews.
                  </p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Registered Nurse electronic signoffs</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> AI-assisted daily care note auditing across 900+ caregivers</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Proactive alerts for expiring CPR & TB screenings</p>
                  </div>
                </div>
                <div className="lg:col-span-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 font-mono">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-slate-900 block">CNA 60-Day Onsite Visit</span>
                    <span className="text-slate-500">Hannah Miller → Clara Oswald-Miller • Assigned: Rebecca Stern, RN</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-slate-900 block">HMA Quarterly Virtual Review</span>
                    <span className="text-slate-500">Marcos Ramirez → Sophia Ramirez • Telehealth Video Verified</span>
                  </div>
                </div>
              </>
            )}

            {activeFeatureTab === 'billing' && (
              <>
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                    Revenue Cycle
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Dual-NPI Medicaid Claim Routing
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Automatically routes claims under Mountain Lane (NPI 1) vs. Colorado Home Health (NPI 2), manages commercial insurer denial letters, and reconciles EVV hours directly with ADP payroll.
                  </p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Automated 837P batching to Health First Colorado (MMIS)</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Commercial denial letter attachment (prerequisite for secondary)</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> ADP Run (employees) & Workforce Now (contractors) sync</p>
                  </div>
                </div>
                <div className="lg:col-span-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 font-mono">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between">
                    <span>NPI 1 (Mountain Lane):</span>
                    <strong className="text-emerald-700">1942289410</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between">
                    <span>NPI 2 (CO Home Health):</span>
                    <strong className="text-emerald-700">1487621190</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between">
                    <span>Commercial Denial Code:</span>
                    <strong className="text-slate-800">PR-96 Validated</strong>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 8. WHO WE ARE & FOUNDERS' STORY (Authentic LiliSare Story) */}
      <section id="about-us" className="py-16 sm:py-24 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 text-primary-900 text-xs font-extrabold uppercase tracking-wider">
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
          <div className="bg-gradient-to-br from-[#3e6b2b] via-[#324925] to-[#2a3d20] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
                <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur p-3.5 border border-white/20 shadow-inner flex items-center justify-center">
                  <img src="/images/lilisare-icon.png" alt="LiliSare Lotus" className="w-full h-full object-contain" />
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

      {/* 9. TESTIMONIAL VIDEO / FAMILY STORIES (AxisCare "Hear From Our Customers" style) */}
      <section id="testimonials" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#1e3416] text-white">
        <div className="max-w-5xl mx-auto space-y-10 text-center">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F2B632]">Voices from Colorado</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Hear From Our Caregivers & Families
            </h2>
          </div>

          <div className="bg-slate-900/60 rounded-3xl border border-white/15 p-6 sm:p-10 backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
            <div className="md:col-span-5 relative aspect-video bg-black/40 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"
                alt="Family Caregiver Story"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity"
              />
              <div className="w-14 h-14 rounded-full bg-[#ff7e5f] text-slate-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
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

      {/* 10. TRUSTED BY THE NUMBERS BANNER (AxisCare Stats Row) */}
      <section className="py-12 bg-white border-b border-slate-200/80 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-black text-primary">900+</p>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Active Caregivers</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-primary">500+</p>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Colorado Clients</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-primary">99.1%</p>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">EVV Compliance</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-primary">$0</p>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Out-of-Pocket Family Cost</p>
          </div>
        </div>
      </section>

      {/* 11. LEAD CAPTURE & FAST START SECTION (AxisCare "Get to know the software solution") */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Ready to Begin?</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Get to Know the LiliSphere Care Platform
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your email or phone number to check eligibility for Colorado Medicaid family caregiver compensation, or start guided onboarding directly.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <button
                onClick={onStartOnboarding}
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Start Guided Onboarding</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              No obligation. We coordinate directly with your state case management agency.
            </p>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-xs space-y-3 max-w-sm w-full">
              <h4 className="font-bold text-slate-900">What Happens Next?</h4>
              <div className="space-y-2 text-slate-600">
                <p className="flex items-start gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <span>We verify your loved one’s Colorado Medicaid waiver eligibility.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span>We establish contact with their State Case Manager for care plan authorization.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <span>You complete digital onboarding on your phone and begin receiving bi-weekly pay.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. WEGO COMMUNITY OUTINGS */}
      <section id="community" className="py-16 px-4 sm:px-8 bg-[#324925] text-white text-center">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Explore our WeGo Community Events</h2>
            <p className="text-xs text-emerald-100">Connecting Colorado caregiving families through accessible outings and peer community.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border-2 border-white/20">
              <img src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&auto=format&fit=crop&q=80" alt="Outing" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border-2 border-white/20">
              <img src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80" alt="Therapy pony" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border-2 border-white/20">
              <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&auto=format&fit=crop&q=80" alt="Kids event" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border-2 border-white/20">
              <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&auto=format&fit=crop&q=80" alt="Caregivers" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 13. ENTERPRISE FOOTER (AxisCare styled footer in LiliSare brand) */}
      <footer id="contact" className="bg-[#14210e] text-slate-300 py-16 px-4 sm:px-8 border-t border-primary-950">
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
              <li><button onClick={onExplorePortal} className="hover:text-white">Agency Operations Console</button></li>
              <li><button onClick={onExplorePortal} className="hover:text-white">Family Caregiver Mobile Portal</button></li>
              <li><button onClick={onExplorePortal} className="hover:text-white">Colorado EVV Aggregator Hub</button></li>
              <li><button onClick={onExplorePortal} className="hover:text-white">7-Year Statutory Audit Vault</button></li>
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
