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
  UserCheck,
  Download,
  BookOpen,
  Send,
  MessageSquare,
  Facebook,
  Instagram
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

  // Active Service Tab State for AxisCare-Style Interactive Showcase
  const [activeServiceTab, setActiveServiceTab] = useState<number>(0);

  const servicesList = [
    {
      id: 'cna',
      pill: 'Become a CNA',
      badge: 'Skilled Nursing & Certified Aide',
      title: 'Become a CNA for your Loved One',
      desc: 'Certified Nurse Aide services (CNA) and Private Duty Nursing services (PDN). LiliSare guides and sponsors family members through Colorado CNA training, testing, and state licensing so you can provide skilled medical care to your loved one right at home with competitive hourly pay.',
      image: '/images/service-cna-mother-son.jpg',
      imageAlt: 'Loving mother with son receiving certified nurse aide care at home',
      features: [
        { icon: Award, title: 'Certified Nurse Aide (CNA)', desc: 'State-approved clinical care for high-need family members' },
        { icon: Stethoscope, title: 'Private Duty Nursing (PDN)', desc: 'RN/LPN supervised complex in-home medical care' },
        { icon: DollarSign, title: 'Earn Up to $32.50 / hour', desc: 'Elevated hourly pay rate for licensed skilled care' },
        { icon: BookOpen, title: 'Free Class & Testing Sponsorship', desc: 'We help you prepare and obtain your Colorado license' },
      ],
      tagline: '100% Covered by Colorado Medicaid • Family Caregiver Licensing Support'
    },
    {
      id: 'cfc',
      pill: 'Community First Choice',
      badge: 'Medicaid Community Benefit',
      title: 'Community First Choice (CFC)',
      desc: 'A Medicaid program that provides greater access to home and community-based services for eligible individuals. CFC empowers participants to choose their own personal care attendants, direct their daily routines, and maintain active community living.',
      image: '/images/service-cfc-sisters.jpg',
      imageAlt: 'Sisters smiling together outdoors in Colorado',
      features: [
        { icon: ShieldCheck, title: 'Medicaid State Plan Entitlement', desc: 'Available to all eligible Colorado Medicaid recipients' },
        { icon: HomeIcon, title: 'Full In-Home Independence', desc: 'Personal attendant care tailored to daily living tasks' },
        { icon: Users, title: 'Individualized Attendant Selection', desc: 'Choose your trusted caregiver from family or friends' },
        { icon: Clock, title: 'Zero Waiting List Enrollment', desc: 'State plan coverage without multi-year waiver delays' },
      ],
      tagline: 'Colorado Medicaid Entitlement • Unrestricted In-Home Community Support'
    },
    {
      id: 'ihss',
      pill: 'In-Home Support (IHSS)',
      badge: 'Parent as Paid Attendant',
      title: 'In-Home Support Services (IHSS)',
      desc: 'Become an attendant to assist with daily activities, personal care, and household tasks for your loved ones. Under Colorado Medicaid, parents of minor children, spouses, and adult children can be hired as legal attendants with reliable bi-weekly pay.',
      image: '/images/service-ihss-father-son.jpg',
      imageAlt: 'Father embracing son in wheelchair with love and dignity',
      features: [
        { icon: Heart, title: 'Parents & Family Members Hired', desc: 'No medical background or license needed to start' },
        { icon: Smartphone, title: '1-Tap Mobile GPS Clock-In (EVV)', desc: 'Fast, hassle-free visit verification via mobile app' },
        { icon: DollarSign, title: 'Bi-Weekly Pay via Direct Deposit', desc: 'W-2 employment, ADP payroll, and overtime eligible' },
        { icon: Stethoscope, title: 'Dedicated Registered Nurse Oversight', desc: 'Continuous clinical coaching and care coordination' },
      ],
      tagline: 'Colorado IHSS Attendant • Authorized for 15 to 40+ hours per week'
    },
    {
      id: 'hcbs',
      pill: 'HCBS Waivers',
      badge: 'Home & Community Care',
      title: 'Home and Community Based Services (HCBS Waivers)',
      desc: 'Support and care provided by a family caregiver in the comfort of home and within the community. Colorado HCBS waivers provide comprehensive funding so individuals with disabilities or complex medical needs thrive in family settings.',
      image: '/images/service-hcbs-mother-daughter.jpg',
      imageAlt: 'Mother holding daughter outdoors in green Colorado park',
      features: [
        { icon: ShieldCheck, title: '100% Colorado Medicaid Funded', desc: 'Zero copays, fees, or deductions from existing benefits' },
        { icon: Baby, title: 'Children & Adults with Disabilities', desc: 'Comprehensive coverage across developmental lifespans' },
        { icon: BadgeCheck, title: 'Local Case Management Agency Synced', desc: 'Seamless authorization with RMHS, DP, TRE & Imagine!' },
        { icon: Clock, title: 'Flexible Care Scheduling', desc: 'Daytime, evening, and weekend personal care coverage' },
      ],
      tagline: '100% Medicaid Covered • Personalized In-Home Care Plans'
    },
    {
      id: 'irss',
      pill: 'IRSS & Host Homes',
      badge: 'Host Homes & Family Caregiver',
      title: 'Individual Residential Services and Supports (IRSS)',
      desc: 'Family Caregiver, Host Homes. Providing comprehensive residential living arrangements and individualized support services for adults with intellectual and developmental disabilities to live safely, build life skills, and thrive in warm household communities.',
      image: '/images/service-irss-mother-son-laptop.jpg',
      imageAlt: 'Mother and son reviewing tablet learning activities together',
      features: [
        { icon: HomeIcon, title: 'Dedicated Family Caregiver Model', desc: 'Care provided in the client’s family residence' },
        { icon: Smile, title: 'Vetted Colorado Host Homes', desc: 'Loving community host home providers across the state' },
        { icon: Activity, title: 'Daily Living & Social Skills', desc: 'Community integration, meal preparation, and hygiene' },
        { icon: ShieldCheck, title: '24/7 Agency Emergency Backup', desc: 'Ongoing respite, safety oversight, and support' },
      ],
      tagline: 'Colorado Adult IDD Residential • Dignified Community Living'
    },
    {
      id: 'waivers',
      pill: 'Accepted Waivers',
      badge: '100% Medicaid Covered',
      title: 'We Accept Medicaid and the Following Medicaid Waivers:',
      desc: 'We are fully certified to bill and manage services under: CES (Children’s Extensive Support), CHRP (Children’s Habilitation Residential Program), SLS (Supported Living Services), DD (Developmental Disabilities), EBD (Elderly, Blind & Disabled), CHCBS (Children’s HCBS), CIH (Complementary & Integrative Health), and CFC Benefit.',
      image: '/images/service-waivers-family-lake.jpg',
      imageAlt: 'Colorado family standing together happily at lake mountain resort',
      features: [
        { icon: FileCheck, title: 'Children’s Waivers: CES, CHRP, CHCBS', desc: 'Specialized for high-medical and behavioral needs' },
        { icon: Award, title: 'Adult Waivers: SLS, DD, EBD, CIH', desc: 'Independent living, residential, and elder care supports' },
        { icon: Check, title: 'Community First Choice (CFC) Benefit', desc: 'Colorado state plan Medicaid personal attendant coverage' },
        { icon: Phone, title: 'Free Waiver Verification Call', desc: 'Speak directly with our Care Coordinators at 303-578-0181' },
      ],
      tagline: 'CES • CHRP • SLS • DD • EBD • CHCBS • CIH • CFC'
    }
  ];

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
                    src="/images/family-bubbles-wheelchair.jpg"
                    alt="Colorado family with child in wheelchair playing with bubbles outdoors"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/10" />

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-xs font-black tracking-wide uppercase text-[#F2B632]">Real Colorado Family</p>
                    <p className="text-sm sm:text-base font-extrabold leading-snug">Elena, Mateo &amp; Sophia • Denver, Colorado</p>
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
      {/* 4.5 SECTION: BUILT TO HELP YOUR FAMILY FLOURISH (Exact AxisCare 3-Card)   */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#142810] via-[#1d3917] to-[#2b4c22] text-white pt-20 pb-28 px-4 sm:px-8 overflow-hidden">
        {/* Side Glowing Ambient Blurs matching AxisCare teal/glow edges */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-[#F2B632]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-16 relative z-10">
          {/* Centered Top Headline & Editorial Paragraph */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Built to Help Your Family &amp; Caregivers Flourish
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
              Quality care requires more than goodwill; It requires the right support, clinical visibility, and seamless tools to care without unnecessary complexity. Families who partner with LiliSare gain competitive hourly pay ($28.50+/hr), 1-tap mobile visit verification, and dedicated RN clinical guidance, supported by a platform that brings care together and empowers loved ones to thrive at home.
            </p>
          </div>

          {/* Subtitle Header bridging into the 3 elevated cards */}
          <div className="text-center max-w-2xl mx-auto space-y-2 pt-2">
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#F2B632]">
              All-In-One Solution
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              A Complete Family Care &amp; Support Solution
            </h3>
            <p className="text-xs text-emerald-200/80">
              Tailored to solve Colorado Medicaid caregiving and daily operational challenges
            </p>
          </div>

          {/* 3 Elevated Cards matching AxisCare reference layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {/* Card 1: Empower Family Caregivers */}
            <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-9 shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between space-y-8 border border-white/80 group">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#2d7337] flex items-center justify-center border border-emerald-100 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7" />
                </div>
                <div className="space-y-2.5">
                  <h4 className="text-xl font-black text-slate-900 leading-snug">
                    Empower Family Caregivers
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Keep loved ones comfortable at home while earning reliable, state-approved wages ($28.50+/hr) as an authorized attendant or certified nurse aide.
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={onStartOnboarding}
                  className="w-full bg-[#2d7337] hover:bg-[#235c2b] text-white font-black text-xs sm:text-sm py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all text-center"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Card 2: Gain Full Control of Operations */}
            <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-9 shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between space-y-8 border border-white/80 group">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-[#1c3315] flex items-center justify-center border border-slate-200 group-hover:scale-110 transition-transform">
                  <LayoutDashboard className="w-7 h-7" />
                </div>
                <div className="space-y-2.5">
                  <h4 className="text-xl font-black text-slate-900 leading-snug">
                    Gain Full Control with 1-Tap EVV
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Streamline daily shifts with Colorado-approved GPS time-tracking—zero paperwork, automated ADP direct deposit, and real-time authorization tracking.
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={onStartOnboarding}
                  className="w-full bg-[#1c3315] hover:bg-[#13240e] text-white font-black text-xs sm:text-sm py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all text-center"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Card 3: Scale Confidently / Dedicated RN Support */}
            <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-9 shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between space-y-8 border border-white/80 group">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#b45309] flex items-center justify-center border border-amber-200 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <div className="space-y-2.5">
                  <h4 className="text-xl font-black text-slate-900 leading-snug">
                    Navigate Care Confidently
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Gain continuous clinical peace of mind with dedicated Registered Nurse home visits, health maintenance delegation, and 24/7 care coordination.
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={onStartOnboarding}
                  className="w-full bg-[#F2B632] hover:bg-[#e0a422] text-amber-950 font-black text-xs sm:text-sm py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all text-center"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

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

          {/* Emotional Caregiver Connection Card with Real Photo */}
          <div className="bg-gradient-to-r from-emerald-50 via-white to-amber-50/60 rounded-3xl border border-emerald-200/80 p-6 sm:p-7 flex flex-col md:flex-row items-center gap-6 shadow-sm">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-md">
              <img
                src="/images/girl-globe.jpg"
                alt="Smiling Colorado girl with special needs holding globe"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#F2B632] flex items-center justify-center shadow-xs">
                <Heart className="w-3.5 h-3.5 fill-amber-900 text-amber-900" />
              </div>
            </div>
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block">
                Colorado Medicaid IHSS &amp; CNA Programs
              </span>
              <h4 className="text-sm sm:text-base font-black text-slate-900">
                &ldquo;Because every child deserves loving care at home from the people who love them most.&rdquo;
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl font-medium">
                Colorado&apos;s Medicaid waivers allow parents, family members, and trusted friends to be hired as certified caregivers. You earn financial security while providing the dignified care your loved one deserves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SECTION: [SERVICES] — Interactive AxisCare-Style Feature Showcase      */}
      {/* (Pills Bar + 2-Column Main Showcase + Key Features Card + Bottom Action)  */}
      {/* ========================================================================= */}
      <section id="services" className="py-20 sm:py-28 px-4 sm:px-8 bg-gradient-to-b from-[#f8faf7] via-white to-[#f4f7f2] text-slate-900 border-t border-slate-200/80 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#F2B632]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-10 relative z-10">
          {/* Header matching AxisCare: Subtitle on top, Main Title below */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#3e6b2b]">
              What You Get
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Our Available Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto pt-1 font-medium">
              We specialize in Colorado Medicaid waivers supporting children with special healthcare needs and adults with disabilities in their own homes.
            </p>
          </div>

          {/* Horizontal Pills/Tabs row matching AxisCare reference */}
          <div className="flex items-center justify-start md:justify-center gap-2.5 overflow-x-auto pb-2 scrollbar-none px-1">
            {servicesList.map((service, idx) => {
              const isActive = activeServiceTab === idx;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveServiceTab(idx)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap shadow-xs ${
                    isActive
                      ? 'bg-[#3e6b2b] text-white shadow-md font-black ring-2 ring-[#3e6b2b]/30'
                      : 'bg-white text-slate-700 border border-slate-200/90 hover:border-[#3e6b2b] hover:text-[#3e6b2b]'
                  }`}
                >
                  {service.pill}
                </button>
              );
            })}
          </div>

          {/* Interactive 2-Card Layout matching AxisCare reference */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Main Card: Text on Left, Photo on Right */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
              {/* Left Column: Heading, Description, Action Buttons */}
              <div className="md:col-span-7 p-7 sm:p-9 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full inline-block">
                    {servicesList[activeServiceTab].badge}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                    {servicesList[activeServiceTab].title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {servicesList[activeServiceTab].desc}
                  </p>

                  {/* Special Waiver Badges for Waiver Card */}
                  {activeServiceTab === 5 && (
                    <div className="grid grid-cols-4 gap-1.5 pt-2 text-[11px] font-extrabold text-slate-800 text-center">
                      <span className="p-1 rounded-md bg-slate-50 border border-slate-200">CES</span>
                      <span className="p-1 rounded-md bg-slate-50 border border-slate-200">CHRP</span>
                      <span className="p-1 rounded-md bg-slate-50 border border-slate-200">SLS</span>
                      <span className="p-1 rounded-md bg-slate-50 border border-slate-200">DD</span>
                      <span className="p-1 rounded-md bg-slate-50 border border-slate-200">EBD</span>
                      <span className="p-1 rounded-md bg-slate-50 border border-slate-200">CHCBS</span>
                      <span className="p-1 rounded-md bg-slate-50 border border-slate-200">CIH</span>
                      <span className="p-1 rounded-md bg-amber-50 text-amber-900 border border-amber-300 font-black">CFC</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons: [Become a Family Caregiver] & [More Info] as requested */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={onStartOnboarding}
                    className="w-full sm:w-auto bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6b6b] hover:to-[#ffa07a] text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
                  >
                    <span>Become a Family Caregiver</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onStartOnboarding}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-[#3e6b2b] hover:text-[#3e6b2b] transition-colors text-center whitespace-nowrap"
                  >
                    More Info
                  </button>
                </div>
              </div>

              {/* Right Column: High-Res Real User Photo */}
              <div className="md:col-span-5 relative h-64 md:h-auto min-h-[300px] overflow-hidden bg-slate-100">
                <img
                  src={servicesList[activeServiceTab].image}
                  alt={servicesList[activeServiceTab].imageAlt}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md text-[#3e6b2b] flex items-center justify-center shadow-md">
                  <Heart className="w-5 h-5 fill-[#3e6b2b]" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F2B632] block">
                    Colorado Care Program
                  </span>
                  <span className="text-xs font-bold text-white leading-tight block">
                    {servicesList[activeServiceTab].pill}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Card: Key Features matching AxisCare reference */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-xl p-7 sm:p-9 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-xl font-black text-slate-900">Key Features</h3>
                  <span className="text-[11px] font-bold text-[#3e6b2b] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    Colorado Medicaid
                  </span>
                </div>

                <div className="space-y-4">
                  {servicesList[activeServiceTab].features.map((feature, idx) => {
                    const IconComp = feature.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3.5 group">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#3e6b2b] border border-emerald-100/80 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#3e6b2b] group-hover:text-white transition-all">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-[#3e6b2b] transition-colors leading-snug">
                            {feature.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 leading-snug">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f8faf7] border border-emerald-100 text-xs text-slate-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-700 leading-tight">
                  {servicesList[activeServiceTab].tagline}
                </span>
              </div>
            </div>
          </div>

          {/* Centered Bottom Action matching AxisCare reference */}
          <div className="text-center pt-2">
            <button
              onClick={onStartOnboarding}
              className="px-8 py-3.5 rounded-full border-2 border-slate-300 hover:border-[#3e6b2b] text-slate-800 hover:text-[#3e6b2b] font-black text-xs sm:text-sm transition-all shadow-xs hover:shadow-md inline-flex items-center gap-2 group bg-white"
            >
              <span>Explore All Services &amp; Waivers</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6.5 SECTION: WELCOME STEPS (Simple 4-Step Family Caregiver Journey)       */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 bg-white border-t border-slate-200/80 relative overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-[#2d4722] text-xs font-black uppercase tracking-wider">
              <Smile className="w-3.5 h-3.5 text-[#3e6b2b]" />
              <span>Simple 4-Step Process</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Welcome Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
              How simple it is to get started as a paid family caregiver with LiliSare in Colorado.
            </p>
          </div>

          {/* 4 Connected Step Cards matching original reference with modern SaaS execution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#fff6ed] to-[#fffaf5] border border-[#ffcfb5] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all text-center space-y-4 group">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ff7e5f] to-[#feb47b] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7 fill-white" />
                </div>
                <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider">
                  Step 01
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 pt-1">Get Started</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Call our friendly team or complete our 5-minute online intake. We will guide you through every step of enrollment.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#fff6ed] to-[#fffaf5] border border-[#ffcfb5] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all text-center space-y-4 group">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ff7e5f] to-[#feb47b] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider">
                  Step 02
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 pt-1">Care Manager Consultation</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                We help connect you with your local county case management agency to assess care needs and authorize weekly hours.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#fff6ed] to-[#fffaf5] border border-[#ffcfb5] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all text-center space-y-4 group">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ff7e5f] to-[#feb47b] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Smartphone className="w-7 h-7 text-white" />
                </div>
                <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider">
                  Step 03
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 pt-1">Start of Services</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Complete quick caregiver onboarding, download our easy 1-tap mobile app, and begin caring for your loved one at home.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#fff6ed] to-[#fffaf5] border border-[#ffcfb5] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all text-center space-y-4 group">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ff7e5f] to-[#feb47b] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-7 h-7 text-white" />
                </div>
                <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider">
                  Step 04
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 pt-1">Ongoing Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Receive reliable bi-weekly direct deposit pay, ongoing RN nurse support, and 24/7 care coordination whenever you need it.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onStartOnboarding}
              className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6b6b] hover:to-[#ffa07a] text-slate-950 font-black text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 inline-flex items-center gap-2"
            >
              <span>Start Here +</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FULL-WIDTH SECTION: OUR APPROACH (As in User's Reference Layout)       */}
      {/* ========================================================================= */}
      <section className="w-full bg-white border-y border-slate-200/80 overflow-hidden">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center min-h-[520px]">
          {/* Left Text Column */}
          <div className="lg:col-span-6 xl:col-span-7 px-6 sm:px-12 lg:pl-16 xl:pl-28 py-16 lg:py-24 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 text-primary-900 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Our Approach</span>
            </div>

            <h2 className="text-2xl sm:text-4xl xl:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Our Family-First Approach &amp; Innovative Technology Empower Colorado Families &amp; Agencies of All Sizes
            </h2>

            <p className="text-sm sm:text-base font-bold text-slate-700">
              Compassionate Care Backed by Colorado&apos;s Dedicated Support Team
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              LiliSare helps Colorado families operate with greater visibility, efficiency, and peace of mind, without ever losing focus on the people they love. From mobile visit verification and automated paperwork to dedicated RN nurse guidance, our platform and expert care team empower caregivers and provide better, dignified care for clients.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onStartOnboarding}
                className="px-6 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-black text-xs sm:text-sm transition-all flex items-center gap-2 group"
              >
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onStartOnboarding}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
              >
                Apply Online Now
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold text-slate-800">100% Family Focus</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold text-slate-800">Colorado EVV Synced</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold text-slate-800">Dedicated RN Nurse</span>
              </div>
            </div>
          </div>

          {/* Right Image Column (Full-bleed edge-to-edge with soft gradient fade) */}
          <div className="lg:col-span-6 xl:col-span-5 relative h-80 sm:h-96 lg:h-full min-h-[420px] lg:min-h-[580px] w-full overflow-hidden">
            <img
              src="/images/mother-child-art.jpg"
              alt="Loving mother embracing her son with special needs in art studio"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
            {/* Soft gradient fade on the left edge to blend seamlessly into white */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />

            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/80 max-w-xs space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary-100 text-primary flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-primary" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">Because We Care</p>
                  <p className="text-[10px] text-slate-500">Supporting Colorado families together</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. SECTION: [ABOUT US] — Founders' Story, Mission & Vision Statements       */}
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
      {/* 10. SECTION: [COMMUNITY] — Explore our WeGo Community Events              */}
      {/* ========================================================================= */}
      <section id="community" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#324925] text-white text-center relative overflow-hidden">
        {/* Subtle decorative background watermarks */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#F2B632]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-10 relative z-10">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Explore our WeGo Community Events
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100">
              Connecting Colorado caregiving families through accessible community outings, sensory-friendly days, and peer support networks.
            </p>
          </div>

          {/* 4 Real WeGo Community Photos from LiliSare's Original Site */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg border-2 border-white/20 bg-slate-900">
              <img
                src="/images/wego-park-wheelchair.jpg"
                alt="Young man in wheelchair with caregiver on outdoor walk"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-left">
                <p className="text-[11px] font-bold text-white">Accessible Community Outings</p>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg border-2 border-white/20 bg-slate-900">
              <img
                src="/images/wego-therapy-pony.jpg"
                alt="Boy in wheelchair petting miniature therapy pony at animal farm"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-left">
                <p className="text-[11px] font-bold text-white">Equine Therapy &amp; Farm Visits</p>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg border-2 border-white/20 bg-slate-900">
              <img
                src="/images/wego-chuckecheese.jpg"
                alt="Girl in wheelchair joyfully hugging Chuck E. Cheese mascot"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-left">
                <p className="text-[11px] font-bold text-white">Sensory Play &amp; Fun Days</p>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg border-2 border-white/20 bg-slate-900">
              <img
                src="/images/wego-family-friends.jpg"
                alt="Mother smiling warmly with adult daughter with Down syndrome"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-left">
                <p className="text-[11px] font-bold text-white">Caregiver Peer Connections</p>
              </div>
            </div>
          </div>

          {/* Social Capsule and Community Join Button matching LiliSare Original Design */}
          <div className="flex flex-col items-center justify-center gap-4 pt-4">
            <div className="inline-flex items-center justify-center gap-4 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] p-3 rounded-2xl shadow-md">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LiliSare Facebook"
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white transition-all transform hover:scale-110"
              >
                <Facebook className="w-5 h-5 fill-current" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LiliSare Instagram"
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white transition-all transform hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            <button
              onClick={onStartOnboarding}
              className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6b6b] hover:to-[#ffa07a] text-slate-950 font-black text-xs sm:text-sm px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              Join our Community +
            </button>
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
      {/* 12. CLEAN & SIMPLE BRAND FOOTER (Exact Match to LiliSare Website)          */}
      {/* ========================================================================= */}
      <footer className="bg-[#324925] text-white py-14 px-4 sm:px-8 border-t border-emerald-900/60 relative overflow-hidden">
        {/* Subtle background ambient watermarks */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#F2B632]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-10">
          {/* Main 3-Column Section with vertical divider lines */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-start pb-10 border-b border-white/20">
            {/* Column 1: Proudly serving + Socials */}
            <div className="md:col-span-3 space-y-4">
              <p className="text-xs sm:text-sm font-semibold text-emerald-100 leading-snug">
                Proudly serving communities throughout Colorado
              </p>
              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-white text-[#324925] hover:bg-[#F2B632] hover:text-slate-950 flex items-center justify-center transition-all shadow-sm"
                >
                  <Facebook className="w-4 h-4 fill-current" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white text-[#324925] hover:bg-[#F2B632] hover:text-slate-950 flex items-center justify-center transition-all shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Vertical Divider 1 */}
            <div className="hidden md:flex justify-center md:col-span-1 self-stretch">
              <div className="w-px h-full bg-white/25" />
            </div>

            {/* Column 2: Headquarters, Email, Phone */}
            <div className="md:col-span-4 space-y-5 text-xs text-emerald-100">
              <div>
                <h4 className="font-extrabold text-white text-sm">Headquarters</h4>
                <p className="mt-0.5 text-slate-200">3750 Dacoro Lane, Suite 130</p>
                <p className="text-slate-200">Castle Rock, CO 80109</p>
              </div>

              <div>
                <h4 className="font-extrabold text-white text-sm">Send Us an Email:</h4>
                <p className="mt-0.5">
                  Email: <a href="mailto:Info@LiliSare.com" className="text-white hover:text-[#F2B632] underline font-medium">Info@LiliSare.com</a>
                </p>
              </div>

              <div>
                <h4 className="font-extrabold text-white text-sm">Call or Text Now!</h4>
                <p className="mt-0.5">
                  Phone: <a href="tel:3035780181" className="text-white hover:text-[#F2B632] font-black underline">303-578-0181</a>
                </p>
              </div>
            </div>

            {/* Vertical Divider 2 */}
            <div className="hidden md:flex justify-center md:col-span-1 self-stretch">
              <div className="w-px h-full bg-white/25" />
            </div>

            {/* Column 3: 2 Sub-Columns Navigation */}
            <div className="md:col-span-3 grid grid-cols-2 gap-4 text-xs font-bold text-white">
              <div className="space-y-3">
                <p><a href="#home" className="hover:text-[#F2B632] transition-colors">Home</a></p>
                <p><a href="#about-us" className="hover:text-[#F2B632] transition-colors">About Us</a></p>
                <p><a href="#services" className="hover:text-[#F2B632] transition-colors">Services</a></p>
                <p><a href="#resources" className="hover:text-[#F2B632] transition-colors">Resources</a></p>
              </div>
              <div className="space-y-3">
                <p><a href="#faq" className="hover:text-[#F2B632] transition-colors">FAQ</a></p>
                <p><a href="#community" className="hover:text-[#F2B632] transition-colors">Community</a></p>
                <p><a href="#contact" className="hover:text-[#F2B632] transition-colors">Contact Us</a></p>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Logo on left, Copyright on right */}
          <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/images/lilisare-logo.png"
                alt="LiliSare because we care"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>

            <div className="text-center md:text-right text-[11px] text-emerald-200/90 space-y-1">
              <p className="flex flex-wrap items-center justify-center md:justify-end gap-2 text-slate-200">
                <span>&copy; Copyright {new Date().getFullYear()}</span>
                <span>|</span>
                <a href="#" className="hover:text-white underline">Privacy Notice</a>
                <span>|</span>
                <a href="#" className="hover:text-white underline">Non-Discrimination Policy</a>
                <span>|</span>
                <span>Designed by Proweaver</span>
              </p>
              <p className="text-center md:text-right">
                <a href="#" className="hover:text-white text-[10px] text-emerald-200/70 hover:underline">
                  Do Not Sell/Share My Personal Information
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
