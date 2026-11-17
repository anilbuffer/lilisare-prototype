'use client';

import React, { useState } from 'react';
import {
  Heart,
  Phone,
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
  Smartphone,
  DollarSign,
  TrendingUp,
  Activity,
  FileText,
  Star,
  CheckCheck,
  BadgeCheck,
  Baby,
  Download,
  BookOpen,
  Send,
  Facebook,
  Instagram
} from 'lucide-react';
import { usePortal } from '@/lib/store/portal-context';

/* ========================================================================= */
/* 1. MULTILINGUAL SUPPORT & REAL SVG FLAGS                                  */
/* ========================================================================= */
interface LanguageOption {
  code: string;
  label: string;
  short: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Español (Spanish)', short: 'ES' },
  { code: 'vi', label: 'Tiếng Việt (Vietnamese)', short: 'VI' },
  { code: 'ar', label: 'العربية (Arabic)', short: 'AR' },
  { code: 'so', label: 'Soomaali (Somali)', short: 'SO' },
  { code: 'ru', label: 'Русский (Russian)', short: 'RU' },
  { code: 'zh', label: '中文 (Chinese)', short: 'ZH' },
  { code: 'fr', label: 'Français (French)', short: 'FR' },
  { code: 'de', label: 'Deutsch (German)', short: 'DE' },
  { code: 'nl', label: 'Nederlands (Dutch)', short: 'NL' },
];

const FlagUS = () => (
  <svg className="w-4 h-3 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
    <path fill="#bd3d44" d="M0 0h640v480H0z" />
    <path stroke="#fff" strokeWidth="37" d="M0 55.5h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640" />
    <path fill="#192f5d" d="M0 0h260v259H0z" />
    <g fill="#fff">
      {[25, 75, 125, 175, 225].map((cy) =>
        [25, 65, 105, 145, 185, 225].map((cx) => (
          <circle key={`s1-${cx}-${cy}`} cx={cx} cy={cy} r="6" />
        ))
      )}
      {[50, 100, 150, 200].map((cy) =>
        [45, 85, 125, 165, 205].map((cx) => (
          <circle key={`s2-${cx}-${cy}`} cx={cx} cy={cy} r="6" />
        ))
      )}
    </g>
  </svg>
);

const FlagSpanish = () => (
  <svg className="w-4 h-3 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
    <path fill="#c60b1e" d="M0 0h640v480H0z" />
    <path fill="#ffc400" d="M0 120h640v240H0z" />
    <circle cx="160" cy="240" r="36" fill="#c60b1e" />
  </svg>
);

const FlagVietnamese = () => (
  <svg className="w-4 h-3 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
    <path fill="#da251d" d="M0 0h640v480H0z" />
    <polygon fill="#ff0" points="320,130 356,236 468,236 377,301 412,408 320,342 228,408 263,301 172,236 284,236" />
  </svg>
);

const FlagArabic = () => (
  <svg className="w-4 h-3 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
    <path fill="#056839" d="M0 0h640v480H0z" />
    <circle cx="320" cy="240" r="115" fill="none" stroke="#fff" strokeWidth="12" />
    <circle cx="320" cy="240" r="95" fill="none" stroke="#f6c23e" strokeWidth="8" />
  </svg>
);

const FlagSomali = () => (
  <svg className="w-4 h-3 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
    <path fill="#4189dd" d="M0 0h640v480H0z" />
    <polygon fill="#fff" points="320,140 354,238 460,238 375,300 408,398 320,336 232,398 265,300 180,238 286,238" />
  </svg>
);

const FlagRussian = () => (
  <svg className="w-4 h-3 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
    <path fill="#fff" d="M0 0h640v160H0z" />
    <path fill="#0039a6" d="M0 160h640v160H0z" />
    <path fill="#d52b1e" d="M0 320h640v160H0z" />
  </svg>
);

const FlagChinese = () => (
  <svg className="w-4 h-3 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
    <path fill="#de2910" d="M0 0h640v480H0z" />
    <polygon fill="#ffde00" points="100,50 115,95 160,95 125,120 140,165 100,140 60,165 75,120 40,95 85,95" />
  </svg>
);

const FlagFrench = () => (
  <svg className="w-4 h-3 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
    <path fill="#002395" d="M0 0h213.3v480H0z" />
    <path fill="#fff" d="M213.3 0h213.4v480H213.3z" />
    <path fill="#ed2939" d="M426.7 0H640v480H426.7z" />
  </svg>
);

const FlagGerman = () => (
  <svg className="w-4 h-3 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
    <path fill="#000" d="M0 0h640v160H0z" />
    <path fill="#d00" d="M0 160h640v160H0z" />
    <path fill="#ffce00" d="M0 320h640v160H0z" />
  </svg>
);

const FlagDutch = () => (
  <svg className="w-4 h-3 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
    <path fill="#ae1c28" d="M0 0h640v160H0z" />
    <path fill="#fff" d="M0 160h640v160H0z" />
    <path fill="#21468b" d="M0 320h640v160H0z" />
  </svg>
);

const FlagIcon = ({ code }: { code: string }) => {
  switch (code) {
    case 'en': return <FlagUS />;
    case 'es': return <FlagSpanish />;
    case 'vi': return <FlagVietnamese />;
    case 'ar': return <FlagArabic />;
    case 'so': return <FlagSomali />;
    case 'ru': return <FlagRussian />;
    case 'zh': return <FlagChinese />;
    case 'fr': return <FlagFrench />;
    case 'de': return <FlagGerman />;
    case 'nl': return <FlagDutch />;
    default: return <FlagUS />;
  }
};

interface LandingPageProps {
  onStartOnboarding: () => void;
  onExplorePortal: () => void;
}

export function LandingPage({ onStartOnboarding, onExplorePortal }: LandingPageProps) {
  const { notify, addLead } = usePortal();

  // Language state
  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [isLangOpen, setIsLangOpen] = useState<boolean>(false);
  const currentLang = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  // Pay Calculator state
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(28);
  const [careRoleType, setCareRoleType] = useState<'ihss' | 'cna'>('ihss');

  const hourlyRate = careRoleType === 'cna' ? 32.50 : 28.50;
  const weeklyEarnings = Math.round(hoursPerWeek * hourlyRate);
  const monthlyEarnings = Math.round(weeklyEarnings * 4.33);

  // Active Service Tab
  const [activeServiceTab, setActiveServiceTab] = useState<number>(0);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Quick Hero Lead state
  const [heroContact, setHeroContact] = useState<string>('');

  // Contact Form state
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactCounty, setContactCounty] = useState<string>('Denver County');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Handlers
  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroContact.trim()) return;

    if (addLead) {
      addLead({
        clientName: 'Family Care Client',
        primaryContactName: 'Family Inquirer',
        relationship: 'Family Member',
        phone: heroContact.includes('@') ? '' : heroContact,
        email: heroContact.includes('@') ? heroContact : '',
        dateOfBirth: '2016-04-12',
        inquirySource: 'Website Inquiry',
        referralAgency: 'Website Direct',
        caseManagerName: 'Pending Assignment',
        caseManagerPhone: '',
        caseManagerEmail: '',
        requestedService: careRoleType === 'cna' ? 'CNA' : 'IHSS',
        assignedStaff: 'Danielle Brooks',
        status: 'New Inquiry',
        nextFollowUpDate: '2026-11-18',
        notes: `Quick inquiry. Preferred contact: ${heroContact}`,
      });
    }

    notify(
      'Inquiry Received',
      `Thank you! A LiliSare Care Coordinator will contact ${heroContact} within 24 hours.`,
      'success'
    );
    setHeroContact('');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || (!contactPhone.trim() && !contactEmail.trim())) {
      notify('Missing Information', 'Please provide your name and phone number or email.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      if (addLead) {
        addLead({
          clientName: `${contactName}'s Loved One`,
          primaryContactName: contactName,
          relationship: 'Family Member',
          phone: contactPhone,
          email: contactEmail,
          dateOfBirth: '2015-08-20',
          inquirySource: 'Website Inquiry',
          referralAgency: 'Website Direct',
          caseManagerName: 'Pending Assignment',
          caseManagerPhone: '',
          caseManagerEmail: '',
          requestedService: 'IHSS',
          assignedStaff: 'Danielle Brooks',
          status: 'New Inquiry',
          nextFollowUpDate: '2026-11-18',
          notes: `County: ${contactCounty}. Note: ${contactMessage || 'No extra note provided.'}`,
        });
      }

      notify(
        'Message Sent',
        `Thank you ${contactName}! We will reach out shortly.`,
        'success'
      );
      setContactName('');
      setContactPhone('');
      setContactEmail('');
      setContactMessage('');
      setIsSubmitting(false);
    }, 350);
  };

  const handleResourceDownload = (resourceTitle: string) => {
    notify(
      'Resource Download Initiated',
      `"${resourceTitle}" is downloading to your device.`,
      'info'
    );
  };

  // Services List: concise, short, scannable
  const servicesList = [
    {
      id: 'ihss',
      pill: 'IHSS Attendant',
      badge: 'Parent & Family Care',
      title: 'In-Home Support Services (IHSS)',
      desc: 'Parents, spouses, and relatives can be hired as legal attendants to assist with daily living, mobility, meals, and hygiene.',
      image: '/images/service-ihss-father-son.jpg',
      imageAlt: 'Father embracing son in wheelchair at home in Colorado',
      features: [
        { icon: Heart, title: 'No Medical License Required', desc: 'Family members qualify without prior healthcare experience.' },
        { icon: DollarSign, title: '$28.50+ / Hour with ADP Direct Deposit', desc: 'W-2 employment, overtime eligibility, and bi-weekly direct deposit.' },
        { icon: Smartphone, title: '1-Tap Mobile Visit Verification', desc: 'Simple GPS-verified shift clock-in without paper timesheets.' },
        { icon: Stethoscope, title: 'Dedicated Registered Nurse Oversight', desc: 'Ongoing clinical coaching, care planning, and peace of mind.' },
      ],
      tagline: '100% Colorado Medicaid Funded • 15 to 40+ Hours / Week'
    },
    {
      id: 'cna',
      pill: 'Become a CNA',
      badge: 'Skilled Medical Care',
      title: 'Colorado Certified Nurse Aide (CNA)',
      desc: 'For loved ones with complex medical needs. We sponsor and pay for your Colorado CNA training and state licensing.',
      image: '/images/service-cna-mother-son.jpg',
      imageAlt: 'Mother holding her young son closely while receiving certified in-home care',
      features: [
        { icon: Award, title: 'Sponsored Tuition & State Testing', desc: 'We cover the full cost of your approved Colorado CNA course.' },
        { icon: DollarSign, title: 'Earn Up to $32.50 / Hour', desc: 'Elevated hourly pay recognizing certified clinical care.' },
        { icon: Stethoscope, title: 'Supervised by Registered Nurses', desc: 'Regular in-home visits and clinical support.' },
        { icon: ShieldCheck, title: 'State-Licensed Class A Agency', desc: 'Full CDPHE compliance protecting your family.' },
      ],
      tagline: 'Tuition Sponsored by LiliSare • Up to $32.50 / Hour'
    },
    {
      id: 'cfc',
      pill: 'CFC Benefit',
      badge: 'State Plan Entitlement',
      title: 'Community First Choice (CFC)',
      desc: 'A Colorado Medicaid entitlement providing self-directed personal attendant care without multi-year waiver waiting lists.',
      image: '/images/service-cfc-sisters.jpg',
      imageAlt: 'Two sisters smiling outdoors in Colorado',
      features: [
        { icon: ShieldCheck, title: 'Zero Waiting List Entitlement', desc: 'Available to all eligible Colorado Medicaid recipients.' },
        { icon: Users, title: 'You Choose Your Caregiver', desc: 'Direct your care and select trusted family members.' },
        { icon: HomeIcon, title: 'In-Home Independence', desc: 'Personal attendant care tailored to your daily routine.' },
        { icon: FileCheck, title: 'State-Backed Coverage', desc: 'Comprehensive funding that supports dignified home living.' },
      ],
      tagline: 'Colorado Medicaid Entitlement • Immediate Access'
    },
    {
      id: 'hcbs',
      pill: 'HCBS Waivers',
      badge: 'Children & Adults',
      title: 'Home & Community-Based Services (HCBS)',
      desc: 'Comprehensive funding for children with special healthcare needs and adults with disabilities to live safely at home.',
      image: '/images/service-hcbs-mother-daughter.jpg',
      imageAlt: 'Mother holding her daughter outdoors in Colorado park',
      features: [
        { icon: Baby, title: 'Children’s Waivers: CES, CHRP & CHCBS', desc: 'Support for high-medical and behavioral conditions.' },
        { icon: Users, title: 'Adult Waivers: SLS, DD, EBD & CIH', desc: 'Supported living, developmental disability, and elder care.' },
        { icon: BadgeCheck, title: 'Case Management Agency Synced', desc: 'Authorized through RMHS, Developmental Pathways, Imagine! & TRE.' },
        { icon: Clock, title: 'Flexible Care Scheduling', desc: 'Day, evening, and weekend coverage tailored to your household.' },
      ],
      tagline: '100% Covered by Colorado Medicaid • $0 Out-of-Pocket'
    },
    {
      id: 'irss',
      pill: 'Host Homes & IRSS',
      badge: 'Residential Living',
      title: 'Individual Residential Services (IRSS)',
      desc: 'Supportive living arrangements and family caregiver models for adults with intellectual and developmental disabilities.',
      image: '/images/service-irss-mother-son-laptop.jpg',
      imageAlt: 'Mother and adult son reviewing tablet activities together at home',
      features: [
        { icon: HomeIcon, title: 'Family Caregiver Living Model', desc: 'Adult clients live with family caregivers with monthly funding.' },
        { icon: Smile, title: 'Vetted Colorado Host Homes', desc: 'Warm, supportive community homes with dedicated providers.' },
        { icon: Activity, title: 'Life Skills & Social Flourishing', desc: 'Cooking, budgeting, community outings, and peer connection.' },
        { icon: ShieldCheck, title: '24/7 Agency Safety Oversight', desc: 'Ongoing respite, nurse check-ins, and emergency support.' },
      ],
      tagline: 'Colorado Adult IDD Residential • Dignified Community Living'
    },
    {
      id: 'waivers',
      pill: 'All Accepted Waivers',
      badge: 'Statewide Coverage',
      title: 'Accepted Colorado Medicaid Waivers',
      desc: 'We are certified to coordinate and manage care under all major Colorado Medicaid waivers. We handle verification for you.',
      image: '/images/service-waivers-family-lake.jpg',
      imageAlt: 'Colorado family standing together happily at mountain resort',
      features: [
        { icon: FileCheck, title: 'Children’s Waivers: CES & CHRP', desc: 'For children with intense behavioral, medical, or physical needs.' },
        { icon: Heart, title: 'Adult Waivers: SLS, DD & EBD', desc: 'Independent living, residential support, and senior care.' },
        { icon: Award, title: 'Community First Choice (CFC)', desc: 'State plan Medicaid personal attendant coverage.' },
        { icon: Phone, title: 'Free 15-Minute Benefits Check', desc: 'Call us at 303-578-0181 to verify your family’s coverage.' },
      ],
      tagline: 'CES • CHRP • SLS • DD • EBD • CHCBS • CIH • CFC'
    }
  ];

  // FAQ items: short, clear, empathetic
  const faqItems = [
    {
      q: 'Can parents or family members get paid to care for loved ones in Colorado?',
      a: 'Yes. Under Colorado Medicaid’s IHSS and CNA programs, parents of minor children, spouses, adult children, and family friends can be legally hired and receive competitive hourly pay as in-home caregivers.'
    },
    {
      q: 'Does this cost our family anything or affect other Medicaid benefits?',
      a: 'No. There is $0 out-of-pocket cost. These services are 100% funded through Colorado Medicaid HCBS waivers and do not reduce your loved one’s therapies, medical equipment, or physician coverage.'
    },
    {
      q: 'Do I need medical training or a nursing license to start?',
      a: 'No. IHSS covers everyday assistance—like mobility, feeding, dressing, and hygiene—with no prior medical license required. If skilled clinical care is needed (CNA), LiliSare sponsors your full training and licensing.'
    },
    {
      q: 'How many hours per week can our family be approved for?',
      a: 'Weekly hours are determined by an assessment with your local Case Management Agency (such as RMHS, Developmental Pathways, or Imagine!). Most families are approved for 15 to 40+ hours per week, with overtime available.'
    },
    {
      q: 'What if we don’t have Medicaid yet or don’t know our waiver?',
      a: 'We can help. Call or text us at 303-578-0181. Our intake coordinators will check your status, connect you with your county agency, and guide you through the enrollment process at no cost.'
    },
    {
      q: 'How do I clock in and get paid?',
      a: 'Caregivers use our simple mobile app to clock in with 1 tap at home. Hours are automatically verified and paid bi-weekly via direct deposit through ADP.'
    }
  ];

  return (
    <div id="home" className="w-full bg-[#fbfdfa] text-slate-800 antialiased overflow-x-hidden selection:bg-[#2d551e] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. TOP UTILITY BAR (Clean, Concise)                                       */}
      {/* ========================================================================= */}
      <div className="bg-[#1b3614] text-white text-xs py-2 px-4 sm:px-8 border-b border-emerald-950/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3 flex-wrap justify-center text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-medium text-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00d084] shrink-0" />
              Colorado CDPHE Licensed Agency • 100% Medicaid Covered
            </span>
            <span className="text-white/30 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-200">Questions? Call or text:</span>
              <a href="tel:3035780181" className="font-bold text-[#F2B632] hover:underline">
                303-578-0181
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] relative">
            <button
              onClick={() => {
                setSelectedLang('es');
                notify('Asistencia en Español', 'Llámenos directamente al 303-578-0181.', 'info');
              }}
              className="bg-gradient-to-r from-[#ff6b4a] to-[#ff8c68] text-white font-medium px-2.5 py-0.5 rounded-full hover:brightness-105 transition-all text-[11px] cursor-pointer"
            >
              Se Habla Español
            </button>

            {/* Language dropdown */}
            <div className="relative">
              {isLangOpen && (
                <div
                  className="fixed inset-0 z-40 bg-transparent cursor-default"
                  onClick={() => setIsLangOpen(false)}
                />
              )}

              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="bg-white/10 hover:bg-white/15 text-white text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border border-white/20 cursor-pointer"
              >
                <FlagIcon code={currentLang.code} />
                <span>{currentLang.short}</span>
                <ChevronDown className="w-3 h-3 text-slate-300" />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 py-1.5 z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang.code);
                        setIsLangOpen(false);
                      }}
                      className="w-full px-3 py-1.5 text-left flex items-center gap-2 text-xs hover:bg-slate-50 transition-colors"
                    >
                      <FlagIcon code={lang.code} />
                      <span className={selectedLang === lang.code ? 'font-semibold text-emerald-800' : 'text-slate-700'}>
                        {lang.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN HEADER NAVIGATION (Short, Clean Menus)                            */}
      {/* ========================================================================= */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-[68px] flex items-center justify-between gap-4">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/images/lilisare-logo.png"
              alt="LiliSare"
              className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-[1.01]"
            />
          </div>

          {/* Center: Simplified Short Menu Names */}
          <nav className="hidden lg:flex items-center bg-gradient-to-r from-[#ff6b4a] via-[#ff7e5f] to-[#ff9e6c] text-white rounded-full px-6 py-2 shadow-xs gap-5 text-xs font-semibold select-none">
            <a href="#home" className="hover:opacity-90 transition-opacity">Home</a>
            <a href="#story" className="hover:opacity-90 transition-opacity">Story</a>
            <a href="#earnings" className="hover:opacity-90 transition-opacity">Earnings</a>
            <a href="#services" className="hover:opacity-90 transition-opacity">Services</a>
            <a href="#steps" className="hover:opacity-90 transition-opacity">Steps</a>
            <a href="#community" className="hover:opacity-90 transition-opacity">Community</a>
            <a href="#faq" className="hover:opacity-90 transition-opacity">FAQ</a>
            <a href="#contact" className="hover:opacity-90 transition-opacity">Contact</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onExplorePortal}
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#2d551e] transition-colors hidden sm:block cursor-pointer px-3 py-1.5 rounded-lg hover:bg-slate-50"
            >
              Staff Portal
            </button>
            <button
              onClick={onStartOnboarding}
              className="bg-[#2d551e] hover:bg-[#224417] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-[0.98] inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Menu */}
        <div className="flex lg:hidden overflow-x-auto py-2 px-4 bg-white text-xs font-medium text-slate-700 gap-4 border-t border-slate-100 scrollbar-none">
          <a href="#home" className="whitespace-nowrap hover:text-[#2d551e]">Home</a>
          <a href="#story" className="whitespace-nowrap hover:text-[#2d551e]">Story</a>
          <a href="#earnings" className="whitespace-nowrap hover:text-[#2d551e]">Earnings</a>
          <a href="#services" className="whitespace-nowrap hover:text-[#2d551e]">Services</a>
          <a href="#steps" className="whitespace-nowrap hover:text-[#2d551e]">Steps</a>
          <a href="#community" className="whitespace-nowrap hover:text-[#2d551e]">Community</a>
          <a href="#faq" className="whitespace-nowrap hover:text-[#2d551e]">FAQ</a>
          <a href="#contact" className="whitespace-nowrap hover:text-[#2d551e]">Contact</a>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. HERO: SHORT, REFINED, PUNCHY                                           */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#162f11] via-[#1e3d18] to-[#2b5321] text-white pt-12 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-[#F2B632] border border-white/15">
              <Sparkles className="w-3 h-3" />
              <span>Colorado Medicaid IHSS &amp; CNA</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white">
              Care for Family.{' '}
              <span className="text-[#F2B632] underline decoration-[#ff7e5f] decoration-2 underline-offset-6">
                Get Paid at Home.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
              Under Colorado Medicaid, parents and family members earn <strong className="text-white font-semibold">$28.50 to $32.50 / hour</strong> caring for loved ones at home. With 1-tap mobile visit tracking and dedicated RN nurse support.
            </p>

            {/* Quick Hero Form */}
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 max-w-md mx-auto lg:mx-0 shadow-lg">
              <form onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter phone number or email..."
                  value={heroContact}
                  onChange={(e) => setHeroContact(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F2B632] font-normal"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto shrink-0 bg-gradient-to-r from-[#ff6b4a] to-[#ff8c68] hover:from-[#f05c39] hover:to-[#ff7b52] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-xs hover:shadow-md transition-all active:scale-[0.98] inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <span>Check Eligibility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Micro Trust */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-emerald-100 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00d084]" />
                <span>$0 Family Cost</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00d084]" />
                <span>Up to $32.50 / hr</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-200" />
                <span>900+ Colorado Caregivers</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              <div className="relative w-full max-w-[400px] aspect-square rounded-3xl overflow-hidden shadow-xl border border-white/20 bg-emerald-950/40">
                <img
                  src="/images/hero-caregiver-heart.jpg"
                  alt="Caregiver supporting senior loved one in garden"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-2 left-0 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white/80 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1b3614] flex items-center justify-center font-bold">
                  <DollarSign className="w-4 h-4 text-emerald-800" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block">Bi-Weekly Pay</span>
                  <span className="text-xs font-semibold text-slate-900">ADP Direct Deposit</span>
                </div>
              </div>

              <div className="absolute -bottom-2 left-2 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white/80 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1b3614] flex items-center justify-center font-bold">
                  <Smartphone className="w-4 h-4 text-emerald-800" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block">Colorado EVV</span>
                  <span className="text-xs font-semibold text-slate-900">1-Tap GPS Clock-In</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PARTNERS STRIP (Minimal, Clean)                                        */}
      {/* ========================================================================= */}
      <div className="py-5 bg-white border-b border-slate-100 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-slate-500 text-xs font-medium">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Authorized With:</span>
          <span className="hover:text-slate-900 transition-colors">Rocky Mountain Human Services (RMHS)</span>
          <span className="hover:text-slate-900 transition-colors">Developmental Pathways</span>
          <span className="hover:text-slate-900 transition-colors">Imagine! Colorado</span>
          <span className="hover:text-slate-900 transition-colors">The Resource Exchange (TRE)</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. STORY: SHORT & CONCISE                                                 */}
      {/* ========================================================================= */}
      <section id="story" className="py-16 sm:py-20 px-4 sm:px-8 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Our Story</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Built by Caregivers, for Caregivers
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Founded by two Colorado mothers raising children with special needs. We created LiliSare to provide the compensation, clinical guidance, and community we wished we had.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100">
            {/* Left Photo */}
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden aspect-[4/3] shadow-sm border border-slate-200/80 bg-slate-100">
                <img
                  src="/images/about-lilisare-team.jpg"
                  alt="LiliSare founders and families"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Text */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Support for the Whole Family
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                When you call LiliSare, you speak with local coordinators and mothers who understand the daily reality of caring for high-need loved ones. We eliminate bureaucratic paperwork so you can focus on what matters most.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-white rounded-xl border border-slate-200/70 text-xs">
                  <span className="font-semibold text-slate-900 block mb-0.5">Our Mission</span>
                  <span className="text-slate-600">Care for both the loved one receiving care and the caregiver giving it.</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/70 text-xs">
                  <span className="font-semibold text-slate-900 block mb-0.5">Our Vision</span>
                  <span className="text-slate-600">A Colorado where no caregiving family is overlooked, unpaid, or alone.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SUPPORT PILLARS: 3 SIMPLE CARDS                                        */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-[#fbfdfa] border-b border-slate-100">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Why LiliSare</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Support That Fits Your Home
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Three core pillars designed to remove administrative stress and keep care where it belongs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2d551e] flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">Competitive Pay</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Earn $28.50+ / hr for IHSS and up to $32.50 / hr for CNA care, paid bi-weekly with ADP direct deposit and W-2 protections.
                </p>
              </div>
              <button
                onClick={onStartOnboarding}
                className="w-full bg-[#2d551e] hover:bg-[#224417] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Estimate Pay
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#a16207] flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">1-Tap Mobile EVV</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Clock in and out in seconds on your phone. GPS verifies your location automatically with zero paper timesheets.
                </p>
              </div>
              <button
                onClick={onStartOnboarding}
                className="w-full bg-[#2d551e] hover:bg-[#224417] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                How It Works
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">Dedicated RN Support</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Our Colorado Registered Nurses provide in-home visits, health delegation, and clinical coaching whenever you need it.
                </p>
              </div>
              <button
                onClick={onStartOnboarding}
                className="w-full bg-[#2d551e] hover:bg-[#224417] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Meet Our Nurses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. EARNINGS CALCULATOR: CLEAN & INTUITIVE                                 */}
      {/* ========================================================================= */}
      <section id="earnings" className="py-16 sm:py-20 px-4 sm:px-8 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Calculator</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Estimate Your Earnings
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Select your program and weekly care hours to calculate your estimated income.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Controls */}
            <div className="md:col-span-7 space-y-5">
              {/* Role Toggle */}
              <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setCareRoleType('ihss')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    careRoleType === 'ihss'
                      ? 'bg-[#2d551e] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  IHSS ($28.50 / hr)
                </button>
                <button
                  type="button"
                  onClick={() => setCareRoleType('cna')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    careRoleType === 'cna'
                      ? 'bg-[#2d551e] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  CNA Aide ($32.50 / hr)
                </button>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-600">Weekly Care Hours:</span>
                  <span className="text-base font-bold text-[#2d551e] px-2.5 py-0.5 bg-emerald-50 rounded-lg border border-emerald-100">
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
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2d551e]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>10 hrs</span>
                  <span>Average: 28.5 hrs</span>
                  <span>40 hrs</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200/70 text-xs text-slate-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% funded by Colorado Medicaid. Zero out-of-pocket cost.</span>
              </div>
            </div>

            {/* Right Summary */}
            <div className="md:col-span-5 bg-[#1e3d18] text-white p-6 rounded-2xl shadow-sm text-center space-y-4">
              <div>
                <span className="text-[11px] text-emerald-200 uppercase tracking-wider font-semibold block">Estimated Monthly Pay</span>
                <div className="text-3xl sm:text-4xl font-bold text-white mt-1">
                  ${monthlyEarnings.toLocaleString()}
                  <span className="text-xs font-normal text-emerald-200"> / mo</span>
                </div>
                <p className="text-xs text-emerald-100 mt-1">
                  Weekly: <strong>${weeklyEarnings.toLocaleString()}</strong>
                </p>
              </div>

              <button
                onClick={onStartOnboarding}
                className="w-full bg-gradient-to-r from-[#ff6b4a] to-[#ff8c68] hover:from-[#f05c39] hover:to-[#ff7b52] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-[0.98] inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Claim Hours</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. SERVICES & WAIVERS (Short, Scannable Tabs)                             */}
      {/* ========================================================================= */}
      <section id="services" className="py-16 sm:py-20 px-4 sm:px-8 bg-[#fbfdfa] border-b border-slate-100">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Programs</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Services &amp; Waivers
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Colorado Medicaid programs designed for children and adults with healthcare needs.
            </p>
          </div>

          {/* Horizontal Pills */}
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {servicesList.map((service, idx) => (
              <button
                key={service.id}
                onClick={() => setActiveServiceTab(idx)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeServiceTab === idx
                    ? 'bg-[#2d551e] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {service.pill}
              </button>
            ))}
          </div>

          {/* 2-Card Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Card */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-7 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block border border-emerald-100">
                  {servicesList[activeServiceTab].badge}
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {servicesList[activeServiceTab].title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {servicesList[activeServiceTab].desc}
                </p>

                {/* Photo inside card */}
                <div className="rounded-xl overflow-hidden aspect-[16/9] shadow-xs border border-slate-100 mt-2">
                  <img
                    src={servicesList[activeServiceTab].image}
                    alt={servicesList[activeServiceTab].imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={onStartOnboarding}
                  className="bg-[#2d551e] hover:bg-[#224417] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all active:scale-[0.98] inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onStartOnboarding}
                  className="border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Check Eligibility
                </button>
              </div>
            </div>

            {/* Right Card: Features */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-7 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-900 pb-2 border-b border-slate-100">
                  Key Benefits
                </h4>
                <div className="space-y-3.5">
                  {servicesList[activeServiceTab].features.map((feature, idx) => {
                    const IconComp = feature.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#2d551e] flex items-center justify-center shrink-0">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-semibold text-slate-900 leading-snug">{feature.title}</p>
                          <p className="text-[11px] text-slate-500 leading-snug">{feature.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px] text-slate-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{servicesList[activeServiceTab].tagline}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. HOW IT WORKS: 4 SIMPLE STEPS                                           */}
      {/* ========================================================================= */}
      <section id="steps" className="py-16 sm:py-20 px-4 sm:px-8 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Process</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How It Works
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Four straightforward steps from initial call to your first direct deposit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">01</span>
              <h3 className="text-sm font-semibold text-slate-900">15-Min Chat</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Call or fill out our short form to discuss your family’s care needs with no pressure.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">02</span>
              <h3 className="text-sm font-semibold text-slate-900">Waiver Approval</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                We coordinate directly with your county case manager to authorize your weekly care hours.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">03</span>
              <h3 className="text-sm font-semibold text-slate-900">Quick Onboarding</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Complete digital paperwork from your phone and set up your 1-tap mobile timekeeping app.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">04</span>
              <h3 className="text-sm font-semibold text-slate-900">Care &amp; Get Paid</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Clock in with 1 tap at home. Enjoy bi-weekly ADP direct deposit and ongoing nurse check-ins.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onStartOnboarding}
              className="bg-[#2d551e] hover:bg-[#224417] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Start Onboarding</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. APPROACH: CLEAN 2-COLUMN WITH MOTHER & CHILD                          */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#fbfdfa] border-b border-slate-100 overflow-hidden py-16 sm:py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Our Approach</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
              Human Care, Quiet Technology
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Traditional home health agencies burden families with paper clipboards and rigid policies. LiliSare handles compliance quietly in the background, giving you simple tools so you can focus entirely on the person you love.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-700">
              <span className="px-3 py-1 rounded-full bg-white border border-slate-200 font-medium">100% Family Focus</span>
              <span className="px-3 py-1 rounded-full bg-white border border-slate-200 font-medium">1-Tap Colorado EVV</span>
              <span className="px-3 py-1 rounded-full bg-white border border-slate-200 font-medium">Dedicated RN Nurses</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-sm border border-slate-200/80 bg-slate-100">
              <img
                src="/images/mother-child-art.jpg"
                alt="Mother embracing son with special needs"
                className="w-full h-full object-cover object-[82%_center]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. SUNSET BANNER: PUNCHY & ELEGANT                                       */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-r from-[#ff6b4a] via-[#ff7e5f] to-[#ff9e6c] text-white py-14 sm:py-16 px-4 sm:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
            The best caregiver is already family.
          </h2>
          <p className="text-xs sm:text-sm text-white/95 max-w-xl mx-auto font-normal leading-relaxed">
            Get paid, clinically supported, and fairly valued to care for your loved one at home.
          </p>
          <div className="pt-2">
            <button
              onClick={onStartOnboarding}
              className="bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Become a Family Caregiver</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. WEGO COMMUNITY (Clean Photo Grid)                                     */}
      {/* ========================================================================= */}
      <section id="community" className="py-16 sm:py-20 px-4 sm:px-8 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Community</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              WeGo Family Events
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Connecting Colorado caregiving families through accessible outings and peer support.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl overflow-hidden aspect-[4/3] shadow-xs border border-slate-200/80 bg-slate-100">
              <img src="/images/wego-park-wheelchair.jpg" alt="Accessible park walk" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden aspect-[4/3] shadow-xs border border-slate-200/80 bg-slate-100">
              <img src="/images/wego-therapy-pony.jpg" alt="Therapy pony visit" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden aspect-[4/3] shadow-xs border border-slate-200/80 bg-slate-100">
              <img src="/images/wego-chuckecheese.jpg" alt="Sensory play day" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden aspect-[4/3] shadow-xs border border-slate-200/80 bg-slate-100">
              <img src="/images/wego-family-friends.jpg" alt="Caregiver peer support" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. FAQ (Concise & Clear)                                                 */}
      {/* ========================================================================= */}
      <section id="faq" className="py-16 sm:py-20 px-4 sm:px-8 bg-[#fbfdfa] border-b border-slate-100">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Questions &amp; Answers
            </h2>
            <p className="text-sm text-slate-600 font-normal">
              Clear guidance on getting paid, Medicaid eligibility, and hours.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200/80 overflow-hidden bg-white shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-semibold text-slate-900 text-xs sm:text-sm flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#2d551e] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-normal">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 14. RESOURCES (Concise Download Cards)                                     */}
      {/* ========================================================================= */}
      <section id="resources" className="py-16 sm:py-20 px-4 sm:px-8 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Resources</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Free Family Guides
            </h2>
            <p className="text-sm text-slate-600 font-normal">
              Downloadable tools to help navigate Colorado Medicaid.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between space-y-3">
              <div>
                <FileText className="w-5 h-5 text-emerald-800 mb-2" />
                <h3 className="text-xs font-semibold text-slate-900">Medicaid Waiver Guide</h3>
                <p className="text-[11px] text-slate-500 mt-1">Breakdown of CES, CHRP, SLS, and EBD.</p>
              </div>
              <button
                onClick={() => handleResourceDownload('Medicaid Waiver Guide')}
                className="w-full py-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
              >
                Download PDF
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between space-y-3">
              <div>
                <CheckCheck className="w-5 h-5 text-emerald-800 mb-2" />
                <h3 className="text-xs font-semibold text-slate-900">IHSS Caregiver Checklist</h3>
                <p className="text-[11px] text-slate-500 mt-1">CBI fingerprinting and tax forms checklist.</p>
              </div>
              <button
                onClick={() => handleResourceDownload('IHSS Checklist')}
                className="w-full py-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
              >
                Download PDF
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between space-y-3">
              <div>
                <Smartphone className="w-5 h-5 text-emerald-800 mb-2" />
                <h3 className="text-xs font-semibold text-slate-900">EVV App User Manual</h3>
                <p className="text-[11px] text-slate-500 mt-1">Photo tutorial on 1-tap mobile visit logging.</p>
              </div>
              <button
                onClick={() => handleResourceDownload('EVV Manual')}
                className="w-full py-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
              >
                Download PDF
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between space-y-3">
              <div>
                <Users className="w-5 h-5 text-emerald-800 mb-2" />
                <h3 className="text-xs font-semibold text-slate-900">Agency Directory</h3>
                <p className="text-[11px] text-slate-500 mt-1">Phone numbers for RMHS, DP, and TRE.</p>
              </div>
              <button
                onClick={() => handleResourceDownload('Agency Directory')}
                className="w-full py-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 15. CONTACT (Clean, Uncluttered Form)                                     */}
      {/* ========================================================================= */}
      <section id="contact" className="py-16 sm:py-20 px-4 sm:px-8 bg-[#fbfdfa]">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contact</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-sm text-slate-600 font-normal">
              Speak directly with our local Colorado team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Info */}
            <div className="md:col-span-5 bg-[#1b3614] text-white p-6 sm:p-7 rounded-2xl shadow-sm space-y-5 text-xs">
              <h3 className="text-base font-semibold text-white">LiliSare Colorado</h3>

              <div className="space-y-3 text-slate-200">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#F2B632] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Offices:</strong>
                    <p>7100 E Belleview Ave, Ste 310, Greenwood Village</p>
                    <p className="text-slate-300 mt-0.5">3750 Dacoro Ln, Ste 130, Castle Rock</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#F2B632] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Call or Text:</strong>
                    <a href="tel:3035780181" className="text-white hover:text-[#F2B632] font-semibold underline">
                      303-578-0181
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#F2B632] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Email:</strong>
                    <a href="mailto:info@lilisare.com" className="text-white hover:underline">
                      info@lilisare.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-7 bg-white border border-slate-200/80 p-6 sm:p-7 rounded-2xl shadow-xs space-y-4">
              <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-medium text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maria Gonzalez"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#2d551e] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-medium text-slate-700">Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(303) 555-0123"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#2d551e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-700">Email</label>
                    <input
                      type="email"
                      placeholder="maria@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#2d551e] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-medium text-slate-700">How can we help?</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about the loved one you care for or questions about Medicaid hours..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#2d551e] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2d551e] hover:bg-[#224417] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-[0.98] inline-flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 16. FOOTER (Clean, Premium, Minimal)                                      */}
      {/* ========================================================================= */}
      <footer className="bg-[#1b3614] text-white py-12 px-4 sm:px-8 border-t border-emerald-950">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/15">
            <img
              src="/images/lilisare-logo.png"
              alt="LiliSare"
              className="h-9 w-auto object-contain brightness-0 invert"
            />
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <a href="#home" className="hover:text-white transition-colors">Home</a>
              <a href="#story" className="hover:text-white transition-colors">Story</a>
              <a href="#earnings" className="hover:text-white transition-colors">Earnings</a>
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#steps" className="hover:text-white transition-colors">Steps</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <p>&copy; {new Date().getFullYear()} LiliSare Home Health &amp; Mountain Lane. Colorado CDPHE Licensed Class A &amp; B Agency.</p>
            <p className="flex items-center gap-2">
              <a href="#" className="hover:underline">Privacy Notice</a>
              <span>•</span>
              <a href="#" className="hover:underline">Non-Discrimination Policy</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
