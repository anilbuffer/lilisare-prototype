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
  ChevronDown,
  ChevronUp,
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
  UserCheck,
  Download,
  BookOpen,
  Send,
  MessageSquare
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

  // FAQ Accordion State (first open by default)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Quick Lead Capture State
  const [leadContact, setLeadContact] = useState<string>('');

  // Contact Us Form State
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadContact.trim()) return;
    notify(
      'Eligibility Inquiry Received',
      `Thank you! A LiliSare Care Coordinator will contact ${leadContact} within 24 hours.`,
      'success'
    );
    setLeadContact('');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || (!contactPhone.trim() && !contactEmail.trim())) {
      notify('Missing Information', 'Please provide your name and phone number or email.', 'warning');
      return;
    }
    setContactSubmitted(true);
    notify(
      'Message Sent Successfully',
      `Thank you ${contactName}! We will reach out shortly regarding Colorado caregiver support.`,
      'success'
    );
    setContactName('');
    setContactPhone('');
    setContactEmail('');
    setContactMessage('');
  };

  const handleResourceDownload = (resourceTitle: string) => {
    notify(
      'Resource Download Initiated',
      `"${resourceTitle}" is downloading. Check your downloads folder!`,
      'info'
    );
  };

  const faqItems = [
    {
      q: 'Can I really get paid as a parent or family member to care for my loved one in Colorado?',
      a: 'Yes! Under Colorado Medicaid’s In-Home Support Services (IHSS) and Certified Nurse Aide (CNA) programs, parents of minor children, spouses, adult children, and family friends can be hired and receive competitive hourly pay as legal caregivers.'
    },
    {
      q: 'Does this cost our family anything or take away from my loved one’s Medicaid benefits?',
      a: 'No. There is $0 out-of-pocket cost to your family. These programs are 100% funded through Colorado Medicaid HCBS waivers (such as CES, CHRP, SLS, and EBD). Receiving pay as a caregiver does not reduce your loved one’s other medical or therapy coverage.'
    },
    {
      q: 'How many hours per week can I be authorized for?',
      a: 'Authorized hours are determined by your Colorado Case Management Agency (such as RMHS, Developmental Pathways, or Imagine!) based on an assessment of your loved one’s daily care needs. Families are typically approved for 15 to 40+ hours per week, with overtime available for eligible shifts.'
    },
    {
      q: 'How do I clock in and get paid?',
      a: 'Caregivers use our mobile app for Colorado Electronic Visit Verification (EVV) to clock in and out with 1 tap at home. Hours are automatically verified and paid bi-weekly via direct deposit right into your bank account through ADP.'
    },
    {
      q: 'What if we do not have Medicaid yet or do not know which waiver we have?',
      a: 'That is completely normal! Contact our team at 303-578-0181 or start our online intake. Our Care Coordinators will help you determine eligibility, connect with your local county case management agency, and guide you through waiver enrollment step-by-step.'
    },
    {
      q: 'What is the difference between IHSS, CNA, and HMA services?',
      a: 'IHSS covers personal care and homemaking with no medical license required. CNA requires a Colorado nurse aide license (which we can help you obtain) for skilled medical care at elevated wages. HMA covers nurse-delegated clinical tasks overseen by a LiliSare Registered Nurse.'
    }
  ];

  return (
    <div id="home" className="w-full bg-[#fbfdfa] text-slate-800 antialiased overflow-x-hidden selection:bg-[#3e6b2b] selection:text-white">
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
              <span className="text-slate-200">Have Questions? Call or Text Today!</span>
              <a href="tel:3035780181" className="font-extrabold text-[#F2B632] hover:underline">
                303-578-0181
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
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
      {/* 2. MAIN HEADER NAVIGATION WITH SIGNATURE LILISARE CORAL CAPSULE MENU       */}
      {/* Menus: [Home], [About Us], [Services], [Resources], [Contact Us]           */}
      {/* + direct anchor shortcuts to [FAQ] & [Community]                           */}
      {/* ========================================================================= */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/images/lilisare-logo.png"
              alt="LiliSare - because we care"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </div>

          {/* Signature Coral Capsule Menu as in Original Design */}
          <nav className="hidden lg:flex items-center bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-white rounded-full px-5 py-2 shadow-md space-x-6 text-xs font-bold">
            <a href="#home" className="hover:text-amber-100 transition-colors">Home</a>
            <a href="#about-us" className="hover:text-amber-100 transition-colors">About Us</a>
            <a href="#services" className="hover:text-amber-100 transition-colors">Services</a>
            <a href="#resources" className="hover:text-amber-100 transition-colors">Resources</a>
            <a href="#faq" className="hover:text-amber-100 transition-colors">FAQ</a>
            <a href="#community" className="hover:text-amber-100 transition-colors">Community</a>
            <a href="#contact" className="hover:text-amber-100 transition-colors">Contact Us</a>
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
              className="bg-primary hover:bg-primary-800 text-white font-black px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex lg:hidden overflow-x-auto py-2 px-4 bg-slate-100 text-xs font-bold text-slate-700 gap-4 border-t border-slate-200">
          <a href="#home" className="whitespace-nowrap hover:text-primary">Home</a>
          <a href="#about-us" className="whitespace-nowrap hover:text-primary">About Us</a>
          <a href="#services" className="whitespace-nowrap hover:text-primary">Services</a>
          <a href="#resources" className="whitespace-nowrap hover:text-primary">Resources</a>
          <a href="#faq" className="whitespace-nowrap hover:text-primary">FAQ</a>
          <a href="#community" className="whitespace-nowrap hover:text-primary">Community</a>
          <a href="#contact" className="whitespace-nowrap hover:text-primary">Contact Us</a>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. HERO SECTION (Full-Width, Heart Photo Frame + High-Converting Action)   */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#1b3114] via-[#2a4a1f] to-[#3e6b2b] text-white pt-12 pb-20 sm:pt-16 sm:pb-28 px-4 sm:px-8 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-96 h-96 bg-[#F2B632]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          {/* Left Column: Heading & Lead Capture */}
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
              <form onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row items-center gap-2">
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

            {/* Trust Metrics */}
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
                <span><strong>$0</strong> Out-of-Pocket Cost</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00d084]" />
                <span>Up to <strong>$32.50/hr</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Heart Photo Frame with Floating Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-square flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#F2B632]/25 to-emerald-400/20 blur-2xl transform scale-90 animate-pulse pointer-events-none" />

              <div className="relative w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] p-3 rounded-[3.5rem] bg-gradient-to-b from-[#fef08a] via-[#fde047] to-[#F2B632] shadow-2xl flex items-center justify-center overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
                <div className="relative w-full h-full rounded-[3rem] overflow-hidden bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&auto=format&fit=crop&q=80"
                    alt="Mother joyfully caring for her happy child at home"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/10" />

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-xs font-black tracking-wide uppercase text-[#F2B632]">Real Colorado Family</p>
                    <p className="text-sm sm:text-base font-extrabold leading-snug">Elena & Mateo • Denver, Colorado</p>
                    <p className="text-[11px] text-emerald-200 mt-0.5">Paid 28.5 hrs/week under IHSS Program</p>
                  </div>
                </div>

                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#fde047] text-amber-950 flex items-center justify-center shadow-lg">
                  <Heart className="w-4 h-4 fill-amber-900" />
                </div>
                <div className="absolute bottom-12 right-2 w-6 h-6 rounded-full bg-[#fde047] text-amber-950 flex items-center justify-center shadow-md">
                  <Heart className="w-3 h-3 fill-amber-900" />
                </div>
              </div>

              {/* Floating Glass Badges */}
              <div className="absolute -top-3 left-0 sm:-left-4 bg-white/95 backdrop-blur-md text-slate-900 p-3 sm:p-3.5 rounded-2xl shadow-2xl border border-white/60 flex items-center gap-3 transform -rotate-1 hover:rotate-0 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Bi-Weekly Pay</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900">Direct Deposit via ADP</span>
                </div>
              </div>

              <div className="absolute -bottom-4 left-2 sm:-left-4 bg-white/95 backdrop-blur-md text-slate-900 p-3 sm:p-3.5 rounded-2xl shadow-2xl border border-white/60 flex items-center gap-3 transform rotate-1 hover:rotate-0 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center font-bold">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Colorado EVV</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900">1-Tap GPS Mobile Clock-In</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PARTNER AGENCIES BAR                                                   */}
      {/* ========================================================================= */}
      <div className="py-8 bg-white border-b border-slate-200/80 px-4 sm:px-8">
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
      </div>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE COLORADO PAY CALCULATOR                                    */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-[#f4f7f2] to-white">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Compensation Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Calculate Your Family Caregiver Monthly Earnings
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Under Colorado’s IHSS and CNA programs, family members earn competitive hourly wages to provide care right at home. Adjust the slider to see your potential compensation:
            </p>
          </div>

          <div className="bg-white rounded-3xl border-2 border-emerald-200/80 p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
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

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 font-semibold block text-[11px]">Colorado State Hourly Base</span>
                  <span className="text-base font-black text-slate-900">${hourlyRate.toFixed(2)} / hr</span>
                  <span className="text-[10px] text-emerald-600 block font-medium">Overtime eligible &gt; 40h</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 font-semibold block text-[11px]">Payroll Schedule</span>
                  <span className="text-base font-black text-slate-900">Bi-Weekly</span>
                  <span className="text-[10px] text-slate-500 block font-medium">Direct Deposit to bank</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 flex items-start gap-2.5 text-xs text-emerald-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p>
                  <strong>100% Covered by Colorado Medicaid.</strong> There are zero out-of-pocket costs, application fees, or deductions from your loved one&apos;s benefits.
                </p>
              </div>
            </div>

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
      {/* 6. SECTION: [SERVICES] — 6 Core Programs with Heart Photo Cutout Cards     */}
      {/* ========================================================================= */}
      <section id="services" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#324925] text-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#F2B632] text-xs font-black uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-[#F2B632]" />
              <span>Compassionate Programs</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Our Available Services
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              We specialize in Colorado Medicaid waivers supporting children with special healthcare needs and adults with disabilities in their own homes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Service 1: IHSS */}
            <div className="bg-[#fef9ee] text-slate-900 p-6 rounded-3xl border border-[#fbe2a6] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
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
                    Parent as Paid Caregiver
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
                    Nurse-Delegated Tasks
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
      {/* 7. SECTION: [ABOUT US] — Founders' Story, Mission & Vision Statements       */}
      {/* ========================================================================= */}
      <section id="about-us" className="py-16 sm:py-24 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 text-primary-900 text-xs font-black uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>About Us — LiliSare</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Live-In Caregivers, Family Caregivers, and Family Friends
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
              At LiliSare, we believe caregiving comes in many forms. Whether you&apos;re a family member or a close friend, we’re here to support you. We value the strength of community and the deep bond between those who provide care and those who receive it.
            </p>
          </div>

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
      {/* 8. SECTION: [RESOURCES] — Guides, Checklists & Colorado Medicaid Tools      */}
      {/* ========================================================================= */}
      <section id="resources" className="py-16 sm:py-24 px-4 sm:px-8 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 text-primary-900 text-xs font-black uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              <span>Helpful Knowledge Base</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Resources for Colorado Families & Caregivers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Download free guides, explore Colorado Medicaid waiver breakdowns, and access step-by-step checklists to make family caregiving simple.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Resource 1 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-slate-900">Colorado Medicaid Waiver Guide</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Complete breakdown of CES, CHRP, SLS, and EBD waivers with eligibility requirements.
                </p>
              </div>
              <button
                onClick={() => handleResourceDownload('Colorado Medicaid Waiver Guide')}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-primary hover:text-white text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Guide</span>
              </button>
            </div>

            {/* Resource 2 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCheck className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-slate-900">IHSS Caregiver Checklist</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Everything you need for onboarding: CBI fingerprinting, I-9 verification, and tax forms.
                </p>
              </div>
              <button
                onClick={() => handleResourceDownload('IHSS Caregiver Checklist')}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-primary hover:text-white text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Checklist</span>
              </button>
            </div>

            {/* Resource 3 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-slate-900">EVV Mobile App User Manual</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Simple photo tutorial on clocking in, GPS geofencing, and self-service time adjustments.
                </p>
              </div>
              <button
                onClick={() => handleResourceDownload('EVV Mobile App Manual')}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-primary hover:text-white text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Manual</span>
              </button>
            </div>

            {/* Resource 4 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-slate-900">Case Manager Agency Directory</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct phone numbers and intake contacts for RMHS, Developmental Pathways, and TRE.
                </p>
              </div>
              <button
                onClick={() => handleResourceDownload('Case Manager Directory')}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-primary hover:text-white text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Directory</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. SECTION: [FAQ] — Frequently Asked Questions Accordion                   */}
      {/* ========================================================================= */}
      <section id="faq" className="py-16 sm:py-24 px-4 sm:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questions & Answers</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
              Everything Colorado families need to know about getting paid as a caregiver, Medicaid waiver qualifications, and state EVV requirements.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 overflow-hidden bg-slate-50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-black text-slate-900 text-xs sm:text-sm flex items-center justify-between gap-4 hover:bg-slate-100 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary-100 text-primary flex items-center justify-center text-xs font-black shrink-0">
                      {idx + 1}
                    </span>
                    <span>{item.q}</span>
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-[#fef9ee] border border-[#fbe2a6] text-center space-y-3">
            <h4 className="text-sm font-black text-slate-900">Have a question not listed here?</h4>
            <p className="text-xs text-slate-600">Our family care team is available by call or text to walk you through your exact situation.</p>
            <a
              href="tel:3035780181"
              className="inline-flex items-center gap-2 text-xs font-black text-primary hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call / Text: 303-578-0181</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. SECTION: [COMMUNITY] — WeGo Community Outings & Events Gallery         */}
      {/* ========================================================================= */}
      <section id="community" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#244218] text-white text-center">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#F2B632] text-xs font-black uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 fill-[#F2B632]" />
              <span>Stronger Together</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">Explore our WeGo Community Events</h2>
            <p className="text-xs sm:text-sm text-emerald-100">
              Connecting Colorado caregiving families through accessible community outings, sensory-friendly days, and peer support networks.
            </p>
          </div>

          {/* Photo Gallery with Hover Zoom */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg border-2 border-white/20">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&auto=format&fit=crop&q=80"
                alt="Accessible Zoo Day"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-left">
                <p className="text-[11px] font-bold text-white">Denver Zoo Accessible Outing</p>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg border-2 border-white/20">
              <img
                src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80"
                alt="Therapy Pony Day"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-left">
                <p className="text-[11px] font-bold text-white">Therapeutic Equine & Pony Experience</p>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg border-2 border-white/20">
              <img
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&auto=format&fit=crop&q=80"
                alt="Sensory Kids Gathering"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-left">
                <p className="text-[11px] font-bold text-white">Sensory Play & Kids Mornings</p>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg border-2 border-white/20">
              <img
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&auto=format&fit=crop&q=80"
                alt="Caregiver Meetup"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-left">
                <p className="text-[11px] font-bold text-white">Parent & Caregiver Coffee Circle</p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all flex items-center gap-2"
            >
              <span>Follow on Facebook</span>
              <ExternalLink className="w-3 h-3 text-[#F2B632]" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all flex items-center gap-2"
            >
              <span>Follow on Instagram</span>
              <ExternalLink className="w-3 h-3 text-[#F2B632]" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. SECTION: [CONTACT US] — Headquarters, Direct Phone, Form & Inquiries   */}
      {/* ========================================================================= */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 text-primary-900 text-xs font-black uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span>Get in Touch</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Contact Us — We&apos;re Here for Your Family
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Whether you need to check waiver eligibility, have questions about IHSS hourly wages, or want to start service, our local Colorado team is ready to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Details Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#244218] via-[#324925] to-[#1b3114] text-white p-7 sm:p-10 rounded-3xl shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-black text-white">LiliSare Colorado Headquarters</h3>
                <p className="text-xs text-emerald-200 mt-1">Mountain Lane & Colorado Home Health</p>
              </div>

              <div className="space-y-4 text-xs text-slate-200">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#F2B632] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">Office Address:</strong>
                    <p>7100 E Belleview Ave, Ste 310</p>
                    <p>Greenwood Village, CO 80111</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#F2B632] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">Direct Phone / Text:</strong>
                    <a href="tel:3035780181" className="text-emerald-100 hover:text-white font-extrabold text-sm underline">
                      303-578-0181
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#F2B632] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">General Inquiries:</strong>
                    <a href="mailto:info@lilisare.com" className="text-emerald-100 hover:text-white underline">
                      info@lilisare.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#00d084] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">Licensing:</strong>
                    <p>State of Colorado CDPHE Licensed Class A & B Home Care</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/15">
                <button
                  onClick={onStartOnboarding}
                  className="w-full bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-black text-xs py-3 rounded-xl shadow-md hover:brightness-105 transition-all"
                >
                  Start Patient & Caregiver Onboarding
                </button>
              </div>
            </div>

            {/* Direct Inquiry Form */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200/90 p-7 sm:p-10 rounded-3xl shadow-sm space-y-5">
              <h3 className="text-lg font-black text-slate-900">Send Us a Direct Message</h3>
              <p className="text-xs text-slate-500">We typically respond within 2 to 4 business hours.</p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maria Gonzalez"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(303) 555-0123"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="maria@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">How can we help your family?</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about the loved one you care for, your current Medicaid waiver, or questions about hours and hourly pay..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-800 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Care Coordinator</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. ENTERPRISE FOOTER WITH MATCHING MENUS                                 */}
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
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px] mb-3">Navigation Menus</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#about-us" className="hover:text-white">About Us</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#resources" className="hover:text-white">Resources</a></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
              <li><a href="#community" className="hover:text-white">Community</a></li>
              <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px] mb-3">Medicaid Programs</h4>
            <ul className="space-y-2 text-slate-400">
              <li>In-Home Support Services (IHSS)</li>
              <li>Certified Nurse Aide (CNA) Care</li>
              <li>Health Maintenance Activities (HMA)</li>
              <li>Community First Choice (CFC)</li>
              <li>Pediatric Respite & Supports</li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px] mb-3">Headquarters & Hotline</h4>
            <p className="text-slate-300">7100 E Belleview Ave, Ste 310</p>
            <p className="text-slate-300">Greenwood Village, CO 80111</p>
            <p className="pt-2 text-slate-400">Call / Text: <a href="tel:3035780181" className="text-[#F2B632] font-bold">303-578-0181</a></p>
            <p className="text-slate-400">Email: <a href="mailto:info@lilisare.com" className="text-slate-200">info@lilisare.com</a></p>
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
