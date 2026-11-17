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
import { HeroHeartVisual } from './HeroHeartVisual';

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

  // Services List: concise, short, scannable (Styled in AxisCare Reference Format)
  const servicesList = [
    {
      id: 'ihss',
      pill: 'Home Care (IHSS)',
      badge: 'Parent & Family Care',
      title: 'In-Home Support Services',
      desc: 'Parents, spouses, and relatives are legally hired and paid competitive hourly rates to assist loved ones with daily living, mobility, meals, and hygiene under Colorado Medicaid.',
      image: '/images/service-ihss-father-son.jpg',
      imageAlt: 'Father embracing son in wheelchair at home in Colorado',
      features: [
        { icon: DollarSign, title: 'W-2 Hourly Pay ($28.50+ / hr)', desc: 'Bi-weekly ADP direct deposit & overtime eligibility' },
        { icon: Smartphone, title: 'Caregiver Mobile App', desc: '1-tap GPS Colorado EVV shift verification' },
        { icon: Heart, title: 'No Medical License Needed', desc: 'Family members qualify without healthcare experience' },
        { icon: Stethoscope, title: 'Dedicated Registered Nurse Oversight', desc: 'In-home clinical visits & care planning' },
        { icon: ShieldCheck, title: '100% Colorado Medicaid Funded', desc: 'Zero out-of-pocket family cost' },
      ],
      tagline: '100% Colorado Medicaid Funded • 15 to 40+ Hours / Week'
    },
    {
      id: 'cna',
      pill: 'Skilled Care (CNA)',
      badge: 'Skilled Medical Care',
      title: 'Certified Nurse Aide Program',
      desc: 'For loved ones with complex medical requirements. LiliSare sponsors and pays 100% of your Colorado CNA training, clinical skills labs, and state board licensing fees.',
      image: '/images/service-cna-mother-son.jpg',
      imageAlt: 'Mother holding her young son closely while receiving certified in-home care',
      features: [
        { icon: Award, title: 'Sponsored CNA Tuition & Testing', desc: 'Full funding for your state-approved course' },
        { icon: DollarSign, title: 'Elevated Pay Up to $32.50 / hr', desc: 'Premium wage recognizing certified clinical care' },
        { icon: Stethoscope, title: 'Supervised by Registered Nurses', desc: 'Continuous clinical coaching and check-ins' },
        { icon: ShieldCheck, title: 'State-Licensed Class A Agency', desc: 'Full CDPHE compliance and peace of mind' },
        { icon: FileCheck, title: 'Zero Student Loan Debt', desc: 'Direct agency sponsorship from day one' },
      ],
      tagline: 'Tuition Sponsored by LiliSare • Up to $32.50 / Hour'
    },
    {
      id: 'cfc',
      pill: 'Community First Choice',
      badge: 'State Plan Entitlement',
      title: 'Community First Choice (CFC)',
      desc: 'A Colorado Medicaid entitlement providing self-directed personal attendant care without multi-year waiver waiting lists or lottery restrictions.',
      image: '/images/service-cfc-sisters.jpg',
      imageAlt: 'Two sisters smiling outdoors in Colorado',
      features: [
        { icon: ShieldCheck, title: 'Zero Waiting List Entitlement', desc: 'Immediate access for eligible Medicaid recipients' },
        { icon: Users, title: 'You Choose Your Caregiver', desc: 'Direct your care and select trusted relatives' },
        { icon: HomeIcon, title: 'In-Home Independence', desc: 'Attendant care tailored to your daily household' },
        { icon: FileCheck, title: 'State-Backed Coverage', desc: 'Comprehensive funding for dignified home living' },
        { icon: Clock, title: 'Immediate Enrollment', desc: 'Fast-tracked intake with your county coordinator' },
      ],
      tagline: 'Colorado Medicaid Entitlement • Immediate Access'
    },
    {
      id: 'hcbs',
      pill: 'HCBS Waivers',
      badge: 'Children & Adults',
      title: 'Home & Community Waivers',
      desc: 'Comprehensive funding for children with special healthcare needs and adults with disabilities to live safely, independently, and comfortably at home.',
      image: '/images/service-hcbs-mother-daughter.jpg',
      imageAlt: 'Mother holding her daughter outdoors in Colorado park',
      features: [
        { icon: Baby, title: 'Children’s Waivers: CES & CHRP', desc: 'Intensive medical, physical, and behavioral support' },
        { icon: Users, title: 'Adult Waivers: SLS, DD & EBD', desc: 'Supported living, developmental disability, and elder care' },
        { icon: BadgeCheck, title: 'Case Management Agency Synced', desc: 'Direct links with RMHS, DP, Imagine!, and TRE' },
        { icon: Clock, title: 'Flexible Care Scheduling', desc: 'Day, evening, and weekend shift coverage' },
        { icon: ShieldCheck, title: '$0 Family Cost Guarantee', desc: '100% funded through Colorado Medicaid' },
      ],
      tagline: '100% Covered by Colorado Medicaid • $0 Out-of-Pocket'
    },
    {
      id: 'irss',
      pill: 'Host Homes & IRSS',
      badge: 'Residential Living',
      title: 'Individual Residential Services',
      desc: 'Supportive living arrangements and family caregiver models for adults with intellectual and developmental disabilities to thrive within caring households.',
      image: '/images/service-irss-mother-son-laptop.jpg',
      imageAlt: 'Mother and adult son reviewing tablet activities together at home',
      features: [
        { icon: HomeIcon, title: 'Family Caregiver Living Model', desc: 'Adult clients live at home with monthly agency stipends' },
        { icon: Smile, title: 'Vetted Colorado Host Homes', desc: 'Warm, supportive community homes with dedicated providers' },
        { icon: Activity, title: 'Life Skills & Community Outings', desc: 'Cooking, budgeting, recreation, and social connection' },
        { icon: ShieldCheck, title: '24/7 Agency Safety Oversight', desc: 'Respite, nurse check-ins, and emergency support' },
        { icon: Users, title: 'Caregiver Peer Support', desc: 'Regular gatherings through LiliSare WeGo events' },
      ],
      tagline: 'Colorado Adult IDD Residential • Dignified Community Living'
    },
    {
      id: 'waivers',
      pill: 'All Accepted Waivers',
      badge: 'Statewide Coverage',
      title: 'Accepted Colorado Waivers',
      desc: 'We are licensed to coordinate and deliver care under all major Colorado Medicaid waivers. Our intake specialists verify eligibility and coordinate with your county agency.',
      image: '/images/service-waivers-family-lake.jpg',
      imageAlt: 'Colorado family standing together happily at mountain resort',
      features: [
        { icon: FileCheck, title: 'Children’s Coverage: CES & CHRP', desc: 'Support for high-medical and behavioral conditions' },
        { icon: Heart, title: 'Adult Waivers: SLS, DD & EBD', desc: 'Independent living, residential support, and senior care' },
        { icon: Award, title: 'Community First Choice (CFC)', desc: 'State plan Medicaid personal attendant coverage' },
        { icon: Phone, title: 'Free 15-Minute Benefits Check', desc: 'Call 303-578-0181 to verify your family coverage' },
        { icon: ShieldCheck, title: 'Full County Coordination', desc: 'We coordinate paperwork with case managers directly' },
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
      {/* 2. MAIN HEADER NAVIGATION (Modern Glass & Clean Menus)                     */}
      {/* ========================================================================= */}
      <header className="bg-white/90 backdrop-blur-xl sticky top-0 z-40 border-b border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-[70px] flex items-center justify-between gap-4">
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

          {/* Center: Simple Independent Navigation Links (No background capsule) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold select-none">
            <a href="#home" className="text-slate-700 hover:text-[#2d551e] transition-colors">Home</a>
            <a href="#services" className="text-slate-700 hover:text-[#2d551e] transition-colors">Services</a>
            <a href="#steps" className="text-slate-700 hover:text-[#2d551e] transition-colors">Steps</a>
            <a href="#contact" className="text-slate-700 hover:text-[#2d551e] transition-colors">Contact</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onExplorePortal}
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#2d551e] transition-colors hidden sm:block cursor-pointer px-3.5 py-2 rounded-xl hover:bg-slate-100/80"
            >
              Staff Portal
            </button>
            <button
              onClick={onStartOnboarding}
              className="bg-[#2d551e] hover:bg-[#224417] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-[0_2px_8px_rgba(45,85,30,0.25)] hover:shadow-[0_4px_16px_rgba(45,85,30,0.35)] transition-all active:scale-[0.98] inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Menu */}
        <div className="flex lg:hidden overflow-x-auto py-3 px-6 bg-white text-xs font-semibold text-slate-700 gap-6 border-t border-slate-100 scrollbar-none">
          <a href="#home" className="whitespace-nowrap hover:text-[#2d551e]">Home</a>
          <a href="#services" className="whitespace-nowrap hover:text-[#2d551e]">Services</a>
          <a href="#steps" className="whitespace-nowrap hover:text-[#2d551e]">Steps</a>
          <a href="#contact" className="whitespace-nowrap hover:text-[#2d551e]">Contact</a>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. HERO: SHORT, REFINED, PUNCHY                                           */}
      {/* ========================================================================= */}
      <section className="relative bg-[#0d220a] text-white pt-14 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-8 overflow-hidden">
        {/* Ambient Radial Lights */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3e6b2b]/30 rounded-full blur-[120px] pointer-events-none -z-0" />
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#F2B632]/15 rounded-full blur-[140px] pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-[#F2B632] border border-white/20 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#F2B632]" />
              <span>Colorado Medicaid IHSS &amp; CNA</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] text-white">
              Care for Family.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2B632] via-[#ffe082] to-[#ffaa00] underline decoration-[#ff7e5f]/70 decoration-2 underline-offset-8">
                Get Paid at Home.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
              Under Colorado Medicaid, parents and family members earn <strong className="text-white font-semibold">$28.50 to $32.50 / hour</strong> caring for loved ones at home. With 1-tap mobile visit tracking and dedicated RN nurse support.
            </p>

            {/* Quick Hero Form */}
            <div className="bg-white/10 backdrop-blur-xl p-2 rounded-2xl border border-white/20 max-w-md mx-auto lg:mx-0 shadow-2xl">
              <form onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter phone number or email..."
                  value={heroContact}
                  onChange={(e) => setHeroContact(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F2B632] font-normal shadow-inner"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto shrink-0 bg-gradient-to-r from-[#ff6b4a] to-[#ff8c68] hover:from-[#f05c39] hover:to-[#ff7b52] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <span>Check Eligibility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Micro Trust */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-emerald-100 font-medium">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00d084]" />
                <span>$0 Family Cost</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00d084]" />
                <span>Up to $32.50 / hr</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <Users className="w-3.5 h-3.5 text-emerald-200" />
                <span>900+ Caregivers</span>
              </div>
            </div>
          </div>

          {/* Right Visual: Vector Drawn Heart with Independent Inner Image */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-[500px] flex items-center justify-center">
              <HeroHeartVisual className="w-full" />

              {/* Floating Badges */}
              <div className="absolute top-2 -left-2 sm:left-0 bg-white/95 backdrop-blur-xl p-3 rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.25)] border border-white/70 flex items-center gap-3 z-20 hover:-translate-y-0.5 transition-transform">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1b3614] flex items-center justify-center font-bold shadow-xs">
                  <DollarSign className="w-4 h-4 text-emerald-800" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Bi-Weekly Pay</span>
                  <span className="text-xs font-bold text-slate-900">ADP Direct Deposit</span>
                </div>
              </div>

              <div className="absolute bottom-2 -left-2 sm:left-2 bg-white/95 backdrop-blur-xl p-3 rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.25)] border border-white/70 flex items-center gap-3 z-20 hover:-translate-y-0.5 transition-transform">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1b3614] flex items-center justify-center font-bold shadow-xs">
                  <Smartphone className="w-4 h-4 text-emerald-800" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Colorado EVV</span>
                  <span className="text-xs font-bold text-slate-900">1-Tap GPS Clock-In</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PARTNERS STRIP (Minimal, Clean)                                        */}
      {/* ========================================================================= */}
      <div className="py-6 bg-slate-50/70 border-b border-slate-200/60 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Authorized Case Management Agencies:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="px-3.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium shadow-xs">Rocky Mountain Human Services (RMHS)</span>
            <span className="px-3.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium shadow-xs">Developmental Pathways</span>
            <span className="px-3.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium shadow-xs">Imagine! Colorado</span>
            <span className="px-3.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium shadow-xs">The Resource Exchange (TRE)</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. STORY: SHORT & CONCISE                                                 */}
      {/* ========================================================================= */}
      <section id="story" className="py-20 sm:py-24 px-4 sm:px-8 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">Our Story</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Built by Caregivers, for Caregivers
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Founded by two Colorado mothers raising children with special needs. We created LiliSare to provide the compensation, clinical guidance, and community we wished we had.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-slate-50 via-white to-emerald-50/20 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
            {/* Left Photo with Quote */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg border border-slate-200/80 bg-slate-100">
                <img
                  src="/images/about-lilisare-team.jpg"
                  alt="LiliSare founders and families"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-800">"Care for both the loved one and the caregiver."</span>
              </div>
            </div>

            {/* Right Text */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Support for the Whole Family
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  When you call LiliSare, you speak with local coordinators and mothers who understand the daily reality of caring for high-need loved ones. We eliminate bureaucratic paperwork so you can focus on what matters most.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs mb-2">
                    01
                  </div>
                  <span className="font-bold text-slate-900 block text-xs mb-1">Our Mission</span>
                  <span className="text-xs text-slate-600 leading-relaxed block">Care for both the loved one receiving care and the caregiver giving it.</span>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-200 transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs mb-2">
                    02
                  </div>
                  <span className="font-bold text-slate-900 block text-xs mb-1">Our Vision</span>
                  <span className="text-xs text-slate-600 leading-relaxed block">A Colorado where no caregiving family is overlooked, unpaid, or alone.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SUPPORT PILLARS: 3 ELEVATED CARDS                                      */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 bg-[#fbfdfa] border-b border-slate-100">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">Why LiliSare</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Support That Fits Your Home
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Three core pillars designed to remove administrative stress and keep care where it belongs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="group bg-white rounded-3xl p-7 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600" />
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#2d551e] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <DollarSign className="w-6 h-6 text-emerald-800" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-slate-900">Competitive Pay</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Earn $28.50+ / hr for IHSS and up to $32.50 / hr for CNA care, paid bi-weekly with ADP direct deposit and W-2 protections.
                  </p>
                </div>
              </div>
              <button
                onClick={onStartOnboarding}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#2d551e] hover:text-[#1b3614] group-hover:translate-x-1 transition-all cursor-pointer pt-3 border-t border-slate-100"
              >
                <span>Calculate Your Pay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2 */}
            <div className="group bg-white rounded-3xl p-7 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-500" />
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#a16207] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Smartphone className="w-6 h-6 text-amber-700" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-slate-900">1-Tap Mobile EVV</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Clock in and out in seconds on your phone. GPS verifies your location automatically with zero paper timesheets.
                  </p>
                </div>
              </div>
              <button
                onClick={onStartOnboarding}
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 hover:text-amber-900 group-hover:translate-x-1 transition-all cursor-pointer pt-3 border-t border-slate-100"
              >
                <span>See EVV Simplicity</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3 */}
            <div className="group bg-white rounded-3xl p-7 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 to-rose-500" />
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Stethoscope className="w-6 h-6 text-rose-700" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-slate-900">Dedicated RN Support</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Our Colorado Registered Nurses provide in-home visits, health delegation, and clinical coaching whenever you need it.
                  </p>
                </div>
              </div>
              <button
                onClick={onStartOnboarding}
                className="inline-flex items-center gap-2 text-xs font-bold text-rose-700 hover:text-rose-900 group-hover:translate-x-1 transition-all cursor-pointer pt-3 border-t border-slate-100"
              >
                <span>Meet Our Nurses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. EARNINGS CALCULATOR: ULTRA-PREMIUM FINTECH CARD                         */}
      {/* ========================================================================= */}
      <section id="earnings" className="py-20 sm:py-24 px-4 sm:px-8 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">Calculator</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Estimate Your Earnings
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Select your program and weekly care hours to calculate your estimated income.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.06)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Controls */}
            <div className="md:col-span-7 space-y-6">
              {/* Program Switcher */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Select Care Level:</label>
                <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setCareRoleType('ihss')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center ${
                      careRoleType === 'ihss'
                        ? 'bg-white text-emerald-900 shadow-sm border border-slate-200/60'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>IHSS Attendant</span>
                    <span className="text-[10px] font-semibold text-emerald-700">$28.50 / hr</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCareRoleType('cna')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center ${
                      careRoleType === 'cna'
                        ? 'bg-white text-emerald-900 shadow-sm border border-slate-200/60'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>Certified CNA</span>
                    <span className="text-[10px] font-semibold text-emerald-700">$32.50 / hr</span>
                  </button>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Weekly Care Hours:</span>
                  <span className="text-base font-extrabold text-emerald-800 px-3 py-1 bg-emerald-50 rounded-xl border border-emerald-200/80 shadow-xs">
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
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2d551e]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium px-0.5">
                  <span>10 hrs (Part-Time)</span>
                  <span>Average: 28.5 hrs</span>
                  <span>40 hrs (Full-Time)</span>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-xs text-emerald-900 flex items-center gap-2.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% funded by Colorado Medicaid. Zero out-of-pocket family cost.</span>
              </div>
            </div>

            {/* Right Summary Card (Fintech Style) */}
            <div className="md:col-span-5 bg-gradient-to-br from-[#163311] via-[#1c3e16] to-[#254f1c] text-white p-7 sm:p-8 rounded-3xl shadow-xl text-center space-y-5 border border-white/10 relative overflow-hidden">
              <div className="space-y-1">
                <span className="text-[11px] text-emerald-200/90 uppercase tracking-widest font-bold block">Estimated Monthly Pay</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  ${monthlyEarnings.toLocaleString()}
                  <span className="text-xs font-normal text-emerald-200"> / mo</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-emerald-200 block">Weekly</span>
                  <span className="font-bold text-white">${weeklyEarnings.toLocaleString()}</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-emerald-200 block">Bi-Weekly (ADP)</span>
                  <span className="font-bold text-white">${(weeklyEarnings * 2).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={onStartOnboarding}
                className="w-full bg-gradient-to-r from-[#ff6b4a] to-[#ff8c68] hover:from-[#f05c39] hover:to-[#ff7b52] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Claim Your Hours</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. SERVICES & WAIVERS (Modeled on AxisCare Clean Premium Layout)          */}
      {/* ========================================================================= */}
      <section id="services" className="py-20 sm:py-24 px-4 sm:px-8 bg-[#f4f7f5] border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Eyebrow & Title */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#2d551e] uppercase">
              What You Get
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#11230e] tracking-tight">
              LiliSare Program Features
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Colorado Medicaid care programs designed for families and individuals.
            </p>
          </div>

          {/* Horizontal Pills (AxisCare Style) */}
          <div className="flex items-center justify-start md:justify-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {servicesList.map((service, idx) => (
              <button
                key={service.id}
                onClick={() => setActiveServiceTab(idx)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeServiceTab === idx
                    ? 'bg-[#2d551e] text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {service.pill}
              </button>
            ))}
          </div>

          {/* 2-Card Showcase Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Left Card: Main Editorial Split Card (Content on Left, Photo on Right) */}
            <div className="lg:col-span-8 bg-white rounded-3xl sm:rounded-[28px] border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch">
              {/* Content Left */}
              <div className="md:col-span-6 p-7 sm:p-9 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full inline-block border border-emerald-100">
                    {servicesList[activeServiceTab].badge}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                    {servicesList[activeServiceTab].title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {servicesList[activeServiceTab].desc}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <button
                      onClick={onStartOnboarding}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2d551e] hover:text-[#1b3614] hover:gap-2.5 transition-all cursor-pointer group"
                    >
                      <span>Learn More</span>
                      <ChevronRight className="w-4 h-4 text-[#2d551e] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={onStartOnboarding}
                      className="bg-[#2d551e] hover:bg-[#224417] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-[0_2px_8px_rgba(45,85,30,0.25)] hover:shadow-[0_4px_16px_rgba(45,85,30,0.35)] transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Photo Right: Editorial photo filling right side */}
              <div className="md:col-span-6 relative min-h-[260px] md:min-h-[380px] bg-slate-100">
                <img
                  src={servicesList[activeServiceTab].image}
                  alt={servicesList[activeServiceTab].imageAlt}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </div>
            </div>

            {/* Right Card: Key Features */}
            <div className="lg:col-span-4 bg-white rounded-3xl sm:rounded-[28px] border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-7 sm:p-9 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <h4 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  Key Features
                </h4>

                <div className="space-y-4">
                  {servicesList[activeServiceTab].features.map((feature, idx) => {
                    const IconComp = feature.icon;
                    return (
                      <div key={idx} className="flex items-center gap-3.5 group">
                        <div className="w-9 h-9 rounded-xl border border-slate-200/90 bg-slate-50/80 text-[#2d551e] flex items-center justify-center shrink-0 shadow-2xs group-hover:border-emerald-300 group-hover:bg-emerald-50 transition-colors">
                          <IconComp className="w-4 h-4 text-[#2d551e]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 leading-snug group-hover:text-slate-950 transition-colors">
                            {feature.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 block">
                  {servicesList[activeServiceTab].tagline}
                </span>
              </div>
            </div>
          </div>

          {/* Centered Pill Button (AxisCare Style) */}
          <div className="text-center pt-2">
            <button
              onClick={onStartOnboarding}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white border border-slate-200/90 text-slate-800 font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer active:scale-[0.98]"
            >
              <span>Explore All Features</span>
              <ChevronRight className="w-4 h-4 text-[#2d551e]" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. HOW IT WORKS: 4 SIMPLE STEPS (Connected Roadmap)                       */}
      {/* ========================================================================= */}
      <section id="steps" className="py-20 sm:py-24 px-4 sm:px-8 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">Process</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Four straightforward steps from initial call to your first direct deposit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50/90 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all space-y-3 relative">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-xs">01</span>
              <h3 className="text-base font-bold text-slate-900">15-Min Chat</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Call or fill out our short form to discuss your family’s care needs with no pressure.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50/90 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all space-y-3 relative">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-xs">02</span>
              <h3 className="text-base font-bold text-slate-900">Waiver Approval</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                We coordinate directly with your county case manager to authorize your weekly care hours.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50/90 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all space-y-3 relative">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-xs">03</span>
              <h3 className="text-base font-bold text-slate-900">Quick Onboarding</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Complete digital paperwork from your phone and set up your 1-tap mobile timekeeping app.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50/90 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all space-y-3 relative">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-xs">04</span>
              <h3 className="text-base font-bold text-slate-900">Care &amp; Get Paid</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Clock in with 1 tap at home. Enjoy bi-weekly ADP direct deposit and ongoing nurse check-ins.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onStartOnboarding}
              className="bg-[#2d551e] hover:bg-[#224417] text-white font-semibold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-[0_2px_8px_rgba(45,85,30,0.25)] hover:shadow-[0_4px_16px_rgba(45,85,30,0.35)] transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Start Onboarding</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. APPROACH (Modeled on AxisCare Reference Layout)                       */}
      {/* ========================================================================= */}
      <section className="w-full bg-white border-b border-slate-200/60 overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-5 max-w-xl">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#2d551e] uppercase">
              Our Approach
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#11230e] tracking-tight leading-[1.18]">
              Our Family-First Approach &amp; Quiet Technology Empower Colorado Caregivers
            </h2>

            <p className="text-sm sm:text-base text-slate-800 font-semibold leading-snug">
              Licensed CDPHE Agency Backed by In-Home Registered Nurse Support
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              LiliSare helps Colorado families care for loved ones at home with greater confidence, dignity, and direct Medicaid compensation. From 1-tap mobile visit tracking to bi-weekly direct deposit, our platform and clinical team handle compliance quietly in the background so you can focus entirely on the person you love.
            </p>

            <div className="pt-2">
              <button
                onClick={onStartOnboarding}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm shadow-xs hover:border-[#2d551e] hover:text-[#2d551e] transition-all cursor-pointer"
              >
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4 text-[#2d551e]" />
              </button>
            </div>
          </div>

          {/* Right Visual: Photo with soft bleed fade */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[440px] overflow-hidden rounded-2xl lg:rounded-none">
              <img
                src="/images/approach-reference.jpg"
                alt="Registered Nurse reviewing digital care plan with senior loved one"
                className="w-[185%] max-w-none h-full object-cover object-right absolute right-0 top-0 select-none"
              />
              {/* Soft fade into white on the left */}
              <div className="hidden lg:block absolute inset-y-0 left-0 w-28 sm:w-40 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. SUNSET BANNER: PUNCHY & ELEGANT                                       */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-r from-[#e8532f] via-[#f7714d] to-[#ff8f66] text-white py-16 sm:py-20 px-4 sm:px-8 text-center relative overflow-hidden shadow-inner">
        <div className="max-w-3xl mx-auto space-y-5 relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
            The best caregiver is already family.
          </h2>
          <p className="text-sm sm:text-base text-white/95 max-w-xl mx-auto font-normal leading-relaxed">
            Get paid, clinically supported, and fairly valued to care for your loved one at home.
          </p>
          <div className="pt-2">
            <button
              onClick={onStartOnboarding}
              className="bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Become a Family Caregiver</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-900" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. WEGO COMMUNITY (Clean Photo Grid)                                     */}
      {/* ========================================================================= */}
      <section id="community" className="py-20 sm:py-24 px-4 sm:px-8 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">Community</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              WeGo Family Events
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Connecting Colorado caregiving families through accessible outings and peer support.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xs border border-slate-200/80 bg-slate-100 group relative">
              <img src="/images/wego-park-wheelchair.jpg" alt="Accessible park walk" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-semibold text-white">Park Outings</span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xs border border-slate-200/80 bg-slate-100 group relative">
              <img src="/images/wego-therapy-pony.jpg" alt="Therapy pony visit" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-semibold text-white">Therapy Ponies</span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xs border border-slate-200/80 bg-slate-100 group relative">
              <img src="/images/wego-chuckecheese.jpg" alt="Sensory play day" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-semibold text-white">Sensory Play</span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xs border border-slate-200/80 bg-slate-100 group relative">
              <img src="/images/wego-family-friends.jpg" alt="Caregiver peer support" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-semibold text-white">Peer Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. FAQ (Concise & Clear)                                                 */}
      {/* ========================================================================= */}
      <section id="faq" className="py-20 sm:py-24 px-4 sm:px-8 bg-[#fbfdfa] border-b border-slate-100">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">FAQ</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Questions &amp; Answers
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Clear guidance on getting paid, Medicaid eligibility, and hours.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 overflow-hidden bg-white shadow-xs hover:border-slate-300 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-slate-900 text-xs sm:text-sm flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#2d551e] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-normal">
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
      <section id="resources" className="py-20 sm:py-24 px-4 sm:px-8 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">Resources</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Free Family Guides
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Downloadable tools to help navigate Colorado Medicaid.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="w-9 h-9 rounded-xl bg-emerald-100/80 text-emerald-900 flex items-center justify-center mb-3">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900">Medicaid Waiver Guide</h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">Breakdown of CES, CHRP, SLS, and EBD.</p>
              </div>
              <button
                onClick={() => handleResourceDownload('Medicaid Waiver Guide')}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Download PDF
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="w-9 h-9 rounded-xl bg-emerald-100/80 text-emerald-900 flex items-center justify-center mb-3">
                  <CheckCheck className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900">IHSS Caregiver Checklist</h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">CBI fingerprinting and tax forms checklist.</p>
              </div>
              <button
                onClick={() => handleResourceDownload('IHSS Checklist')}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Download PDF
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="w-9 h-9 rounded-xl bg-emerald-100/80 text-emerald-900 flex items-center justify-center mb-3">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900">EVV App User Manual</h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">Photo tutorial on 1-tap mobile visit logging.</p>
              </div>
              <button
                onClick={() => handleResourceDownload('EVV Manual')}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Download PDF
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="w-9 h-9 rounded-xl bg-emerald-100/80 text-emerald-900 flex items-center justify-center mb-3">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900">Agency Directory</h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">Phone numbers for RMHS, DP, and TRE.</p>
              </div>
              <button
                onClick={() => handleResourceDownload('Agency Directory')}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer shadow-xs"
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
      <section id="contact" className="py-20 sm:py-24 px-4 sm:px-8 bg-[#fbfdfa]">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">Contact</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Speak directly with our local Colorado team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Info */}
            <div className="md:col-span-5 bg-gradient-to-br from-[#12280d] to-[#1c3e16] text-white p-7 sm:p-8 rounded-3xl shadow-xl space-y-6 text-xs border border-white/10">
              <h3 className="text-lg font-bold text-white">LiliSare Colorado</h3>

              <div className="space-y-4 text-slate-200">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#F2B632] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Offices:</strong>
                    <p>7100 E Belleview Ave, Ste 310, Greenwood Village</p>
                    <p className="text-slate-300 mt-1">3750 Dacoro Ln, Ste 130, Castle Rock</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#F2B632] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Call or Text:</strong>
                    <a href="tel:3035780181" className="text-white hover:text-[#F2B632] font-bold underline">
                      303-578-0181
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#F2B632] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Email:</strong>
                    <a href="mailto:info@lilisare.com" className="text-white hover:underline">
                      info@lilisare.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-7 bg-white border border-slate-200/80 p-7 sm:p-8 rounded-3xl shadow-[0_4px_25px_-4px_rgba(0,0,0,0.06)] space-y-5">
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maria Gonzalez"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#2d551e] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700">Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(303) 555-0123"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#2d551e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">Email</label>
                    <input
                      type="email"
                      placeholder="maria@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#2d551e] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700">How can we help?</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about the loved one you care for or questions about Medicaid hours..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#2d551e] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2d551e] hover:bg-[#224417] text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send className="w-3.5 h-3.5" />
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
            <div className="flex items-center gap-6 text-xs text-slate-300 font-medium">
              <a href="#home" className="hover:text-white transition-colors">Home</a>
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
