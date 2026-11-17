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
              className="h-10 sm:h-14 w-auto object-contain transition-transform group-hover:scale-[1.01]"
            />
          </div>

          {/* Center: Simple Independent Navigation Links (No background capsule) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold select-none">
            <a href="#home" className="text-slate-700 hover:text-[#2e541c] transition-colors">Home</a>
            <a href="#services" className="text-slate-700 hover:text-[#2e541c] transition-colors">Services</a>
            <a href="#steps" className="text-slate-700 hover:text-[#2e541c] transition-colors">Steps</a>
            <a href="#contact" className="text-slate-700 hover:text-[#2e541c] transition-colors">Contact</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onExplorePortal}
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#2e541c] transition-colors hidden sm:block cursor-pointer px-3.5 py-2 rounded-xl hover:bg-slate-100/80"
            >
              Staff Portal
            </button>
            <button
              onClick={onStartOnboarding}
              className="bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-[0_3px_12px_rgba(255,107,74,0.3)] hover:shadow-[0_4px_18px_rgba(255,107,74,0.4)] transition-all active:scale-[0.98] inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Menu */}
        <div className="flex lg:hidden overflow-x-auto py-3 px-6 bg-white text-xs font-semibold text-slate-700 gap-6 border-t border-slate-100 scrollbar-none">
          <a href="#home" className="whitespace-nowrap hover:text-[#2e541c]">Home</a>
          <a href="#services" className="whitespace-nowrap hover:text-[#2e541c]">Services</a>
          <a href="#steps" className="whitespace-nowrap hover:text-[#2e541c]">Steps</a>
          <a href="#contact" className="whitespace-nowrap hover:text-[#2e541c]">Contact</a>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. HERO: SHORT, REFINED, PUNCHY (Brand Rich Olive-Forest Tone)            */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#2b501a] via-[#366122] to-[#284a19] text-white pt-14 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-8 overflow-hidden">
        {/* Ambient Radial Lights */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4a802f]/25 rounded-full blur-[120px] pointer-events-none -z-0" />
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#F2B632]/20 rounded-full blur-[140px] pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-[#F2B632] border border-white/20 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#F2B632]" />
              <span>Colorado Medicaid IHSS &amp; CNA</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] text-white">
              Care for Family.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9DC72] via-[#ffe58f] to-[#F2B632] underline decoration-[#ff7e5f]/70 decoration-2 underline-offset-8">
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
                  className="w-full sm:w-auto shrink-0 bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
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
      {/* 5. STORY: SHORT & CONCISE (Modern Editorial Layout)                       */}
      {/* ========================================================================= */}
      <section id="story" className="py-20 sm:py-24 px-4 sm:px-8 bg-white border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Eyebrow & Title */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#2d551e] uppercase">
              Our Story
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#11230e] tracking-tight">
              Built by Caregivers, for Caregivers
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Founded by two Colorado mothers raising children with special healthcare needs.
            </p>
          </div>

          {/* Main Story Floating Card */}
          <div className="bg-[#f8faf8] rounded-3xl sm:rounded-[28px] border border-slate-200/80 p-8 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Photo with Quote */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-slate-200/80 bg-slate-100 group">
                <img
                  src="/images/about-lilisare-team.jpg"
                  alt="LiliSare founders and families"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-4 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                </div>
                <span className="text-xs font-bold text-slate-800">
                  "Because the best care starts with family."
                </span>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full inline-block border border-emerald-100">
                  Real Family Experience
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  Support Designed for Real Households
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  When you speak with LiliSare, you talk with Colorado coordinators and mothers who live the caregiving journey every day. We eliminate bureaucratic paperwork so you can care with confidence, dignity, and direct hourly compensation.
                </p>
              </div>

              {/* Two Feature Boxes (AxisCare Icon-in-Box Style) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-colors flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl border border-emerald-200 bg-emerald-50/80 text-[#2d551e] flex items-center justify-center shrink-0 shadow-2xs">
                    <ShieldCheck className="w-5 h-5 text-[#2d551e]" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm mb-0.5">Our Mission</span>
                    <span className="text-xs text-slate-600 leading-relaxed block">Care for both the loved one receiving care and the caregiver giving it.</span>
                  </div>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-300 transition-colors flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl border border-amber-200 bg-amber-50/80 text-amber-800 flex items-center justify-center shrink-0 shadow-2xs">
                    <Sparkles className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm mb-0.5">Our Vision</span>
                    <span className="text-xs text-slate-600 leading-relaxed block">A Colorado where no caregiving family is overlooked, unpaid, or alone.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onStartOnboarding}
                  className="bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-[0_4px_14px_rgba(255,107,74,0.35)] hover:shadow-[0_6px_20px_rgba(255,107,74,0.45)] transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Start a Conversation</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SUPPORT PILLARS (Modern Floating Cards)                                */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 bg-[#f4f7f5] border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Eyebrow & Title */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#2d551e] uppercase">
              Why LiliSare
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#11230e] tracking-tight">
              Caregiver Support That Puts Family First
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Three core pillars designed to eliminate bureaucracy and reward your daily dedication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="group bg-white rounded-3xl sm:rounded-[28px] p-8 border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl border border-emerald-200 bg-emerald-50/70 text-[#2d551e] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <DollarSign className="w-6 h-6 text-[#2d551e]" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block border border-emerald-100">
                    $28.50 to $32.50 / hr
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">Competitive W-2 Pay</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Earn dependable hourly wages with bi-weekly ADP direct deposit, tax withholdings, and overtime eligibility.
                  </p>
                </div>
              </div>
              <button
                onClick={onStartOnboarding}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d551e] hover:text-[#1b3614] group-hover:gap-2.5 transition-all cursor-pointer pt-3 border-t border-slate-100"
              >
                <span>Estimate Your Pay</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2 */}
            <div className="group bg-white rounded-3xl sm:rounded-[28px] p-8 border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl border border-amber-200 bg-amber-50/70 text-amber-700 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Smartphone className="w-6 h-6 text-amber-700" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full inline-block border border-amber-100">
                    Zero Paper Timesheets
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">1-Tap Mobile EVV</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Clock in and out in seconds on your smartphone. GPS verifies your location seamlessly without tedious physical logs.
                  </p>
                </div>
              </div>
              <button
                onClick={onStartOnboarding}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900 group-hover:gap-2.5 transition-all cursor-pointer pt-3 border-t border-slate-100"
              >
                <span>See EVV Simplicity</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3 */}
            <div className="group bg-white rounded-3xl sm:rounded-[28px] p-8 border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl border border-rose-200 bg-rose-50/70 text-rose-700 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Stethoscope className="w-6 h-6 text-rose-700" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full inline-block border border-rose-100">
                    In-Home Clinical Guidance
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">Dedicated RN Support</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Our Colorado Registered Nurses provide delegation, customized care planning, and peace of mind whenever you need it.
                  </p>
                </div>
              </div>
              <button
                onClick={onStartOnboarding}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-900 group-hover:gap-2.5 transition-all cursor-pointer pt-3 border-t border-slate-100"
              >
                <span>Meet Our Nurses</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. EARNINGS CALCULATOR: MODERN FINTECH SHOWCASE                           */}
      {/* ========================================================================= */}
      <section id="earnings" className="py-20 sm:py-24 px-4 sm:px-8 bg-white border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Eyebrow & Title */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#2d551e] uppercase">
              Estimate Your Income
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#11230e] tracking-tight">
              Caregiver Earnings Calculator
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Select your care level and weekly hours to calculate your projected direct deposit.
            </p>
          </div>

          <div className="bg-[#f8faf8] rounded-3xl sm:rounded-[28px] border border-slate-200/80 p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Controls */}
            <div className="md:col-span-7 space-y-6">
              {/* Program Switcher */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Select Care Level:</label>
                <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-200/60 rounded-2xl border border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => setCareRoleType('ihss')}
                    className={`py-3 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center ${careRoleType === 'ihss'
                      ? 'bg-white text-emerald-950 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    <span>IHSS Attendant</span>
                    <span className="text-[10px] font-semibold text-emerald-700">$28.50 / hr</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCareRoleType('cna')}
                    className={`py-3 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center ${careRoleType === 'cna'
                      ? 'bg-white text-emerald-950 shadow-sm border border-slate-200/60'
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
                  <span className="text-base font-extrabold text-emerald-800 px-3.5 py-1 bg-white rounded-xl border border-emerald-200/80 shadow-xs">
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
                <div className="flex justify-between text-[11px] text-slate-500 font-medium px-0.5">
                  <button type="button" onClick={() => setHoursPerWeek(15)} className="hover:text-emerald-700 cursor-pointer">15 hrs</button>
                  <button type="button" onClick={() => setHoursPerWeek(28)} className="hover:text-emerald-700 cursor-pointer font-bold text-slate-700">Avg: 28.5 hrs</button>
                  <button type="button" onClick={() => setHoursPerWeek(40)} className="hover:text-emerald-700 cursor-pointer">40 hrs (Full-Time)</button>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 text-xs text-emerald-900 flex items-center gap-2.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% funded by Colorado Medicaid. Zero out-of-pocket family cost.</span>
              </div>
            </div>

            {/* Right Summary Card (Fintech Payout Card) */}
            <div className="md:col-span-5 bg-gradient-to-br from-[#12280d] via-[#1c3e16] to-[#254f1c] text-white p-7 sm:p-8 rounded-3xl shadow-xl text-center space-y-6 border border-white/10 relative overflow-hidden">
              <div className="space-y-1">
                <span className="text-[11px] text-emerald-200/90 uppercase tracking-widest font-bold block">Estimated Monthly Pay</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  ${monthlyEarnings.toLocaleString()}
                  <span className="text-xs font-normal text-emerald-200"> / mo</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-emerald-200 block">Weekly</span>
                  <span className="font-bold text-white">${weeklyEarnings.toLocaleString()}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-emerald-200 block">Bi-Weekly (ADP)</span>
                  <span className="font-bold text-white">${(weeklyEarnings * 2).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={onStartOnboarding}
                className="w-full bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-[0_4px_14px_rgba(255,107,74,0.35)] hover:shadow-[0_6px_20px_rgba(255,107,74,0.45)] transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Claim Your Hours</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. SERVICES & WAIVERS (Bright Green Brand Gradients Showcase)              */}
      {/* ========================================================================= */}
      <section id="services" className="relative py-20 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-[#345f1e] via-[#467c2a] to-[#335d1d] text-white border-y border-[#2a4d18] overflow-hidden">
        {/* Ambient Radial Lighting Overlays */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#68b040]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-[#F2B632]/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-10 relative z-10">
          {/* Eyebrow & Title */}
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F9DC72] uppercase bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20 inline-block shadow-inner">
              What You Get
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              LiliSare Program Features
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              Colorado Medicaid care programs designed for families and individuals.
            </p>
          </div>

          {/* Horizontal Pills (High-Contrast On Bright Green) */}
          <div className="flex items-center justify-start md:justify-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {servicesList.map((service, idx) => (
              <button
                key={service.id}
                onClick={() => setActiveServiceTab(idx)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${activeServiceTab === idx
                  ? 'bg-white text-[#204012] shadow-lg scale-[1.02]'
                  : 'bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md shadow-2xs hover:border-white/40'
                  }`}
              >
                {service.pill}
              </button>
            ))}
          </div>

          {/* 2-Card Showcase Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Left Card: Main Editorial Split Card (Content on Left, Photo on Right) */}
            <div className="lg:col-span-8 bg-white text-slate-800 rounded-3xl sm:rounded-[28px] border border-white/40 shadow-[0_25px_60px_rgba(0,0,0,0.18)] overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch">
              {/* Content Left */}
              <div className="md:col-span-6 p-7 sm:p-9 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2e541c] bg-[#eef7ea] px-3 py-1 rounded-full inline-block border border-[#cbe5c3]">
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
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2e541c] hover:text-[#1e3812] hover:gap-2.5 transition-all cursor-pointer group"
                    >
                      <span>Learn More</span>
                      <ChevronRight className="w-4 h-4 text-[#2e541c] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={onStartOnboarding}
                      className="bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-[0_4px_14px_rgba(255,107,74,0.35)] hover:shadow-[0_6px_20px_rgba(255,107,74,0.45)] transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4 text-white" />
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
            <div className="lg:col-span-4 bg-white text-slate-800 rounded-3xl sm:rounded-[28px] border border-white/40 shadow-[0_25px_60px_rgba(0,0,0,0.18)] p-7 sm:p-9 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <h4 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  Key Features
                </h4>

                <div className="space-y-4">
                  {servicesList[activeServiceTab].features.map((feature, idx) => {
                    const IconComp = feature.icon;
                    return (
                      <div key={idx} className="flex items-center gap-3.5 group">
                        <div className="w-9 h-9 rounded-xl border border-emerald-200/80 bg-emerald-50/70 text-[#2e541c] flex items-center justify-center shrink-0 shadow-2xs group-hover:border-emerald-300 group-hover:bg-emerald-50 transition-colors">
                          <IconComp className="w-4 h-4 text-[#2e541c]" />
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

          {/* Centered Action Button */}
          <div className="text-center pt-2">
            <button
              onClick={onStartOnboarding}
              className="bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-2xl shadow-[0_4px_14px_rgba(255,107,74,0.35)] hover:shadow-[0_6px_20px_rgba(255,107,74,0.45)] transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All Features</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. HOW IT WORKS: 4 SIMPLE STEPS (Modern Elevated White Cards)             */}
      {/* ========================================================================= */}
      <section id="steps" className="py-20 sm:py-24 px-4 sm:px-8 bg-[#f8faf7] border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2e541c] bg-[#eef7ea] border border-[#cbe5c3] px-3.5 py-1 rounded-full shadow-2xs">
              Process
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Four straightforward steps from initial call to your first direct deposit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="group bg-white rounded-3xl sm:rounded-[28px] p-7 sm:p-8 border border-slate-200/70 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#eef7ea] to-[#e1f0db] border border-[#cbe5c3] text-[#244616] font-extrabold text-sm flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    01
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border bg-emerald-50 text-emerald-800 border-emerald-200/80">
                    Step 1
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#2e541c] transition-colors leading-snug">
                    15-Min Chat
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Call or fill out our short form to discuss your family’s care needs with no pressure.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-emerald-700">No obligation consultation</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group bg-white rounded-3xl sm:rounded-[28px] p-7 sm:p-8 border border-slate-200/70 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#eef7ea] to-[#e1f0db] border border-[#cbe5c3] text-[#244616] font-extrabold text-sm flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    02
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border bg-emerald-50 text-emerald-800 border-emerald-200/80">
                    Step 2
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#2e541c] transition-colors leading-snug">
                    Waiver Approval
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    We coordinate directly with your county case manager to authorize your weekly care hours.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-emerald-700">Direct county coordination</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group bg-white rounded-3xl sm:rounded-[28px] p-7 sm:p-8 border border-slate-200/70 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#eef7ea] to-[#e1f0db] border border-[#cbe5c3] text-[#244616] font-extrabold text-sm flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    03
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border bg-emerald-50 text-emerald-800 border-emerald-200/80">
                    Step 3
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#2e541c] transition-colors leading-snug">
                    Quick Onboarding
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Complete digital paperwork from your phone and set up your 1-tap mobile timekeeping app.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-emerald-700">Digital paperwork from phone</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group bg-white rounded-3xl sm:rounded-[28px] p-7 sm:p-8 border border-slate-200/70 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#eef7ea] to-[#e1f0db] border border-[#cbe5c3] text-[#244616] font-extrabold text-sm flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    04
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border bg-emerald-50 text-emerald-800 border-emerald-200/80">
                    Step 4
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#2e541c] transition-colors leading-snug">
                    Care &amp; Get Paid
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Clock in with 1 tap at home. Enjoy bi-weekly ADP direct deposit and ongoing nurse check-ins.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-emerald-700">Bi-weekly ADP direct deposit</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onStartOnboarding}
              className="bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-2xl shadow-[0_4px_14px_rgba(255,107,74,0.35)] hover:shadow-[0_6px_20px_rgba(255,107,74,0.45)] transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Start Onboarding</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. APPROACH (Brand-Related Image Flush to Right Edge - Full Width Feel)   */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-white border-b border-[#2e541c]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[460px] lg:min-h-[500px]">
            {/* Left Text Column */}
            <div className="lg:col-span-6 py-14 sm:py-18 lg:py-20 space-y-5 max-w-xl z-10 pr-0 lg:pr-8">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#2e541c] uppercase">
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
                  type="button"
                  onClick={onStartOnboarding}
                  className="bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-[0_4px_14px_rgba(255,107,74,0.35)] hover:shadow-[0_6px_20px_rgba(255,107,74,0.45)] transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Mobile / Tablet Image (Inline Stack) */}
            <div className="block lg:hidden w-full pb-12">
              <div className="relative w-full h-[280px] sm:h-[360px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md">
                <img
                  src="/images/family-bubbles-wheelchair.jpg"
                  alt="Colorado family enjoying joyful in-home care moments together"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Full-Bleed Right Edge Image: Spans all the way to right edge of section */}
        <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-[48%] xl:w-[50%] h-full overflow-hidden select-none">
          <img
            src="/images/family-bubbles-wheelchair.jpg"
            alt="Colorado family enjoying joyful in-home care moments together"
            className="w-full h-full object-cover object-center"
          />
          {/* Soft fade into white on the left edge */}
          <div className="absolute inset-y-0 left-0 w-32 xl:w-44 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
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
      {/* 12. WEGO COMMUNITY (Modern Elevated White Cards With Soft Outer Shadow)   */}
      {/* ========================================================================= */}
      <section id="community" className="py-20 sm:py-24 px-4 sm:px-8 bg-[#f8faf7] border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Eyebrow & Title */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#2e541c] uppercase bg-[#eef7ea] border border-[#cbe5c3] px-3.5 py-1 rounded-full shadow-2xs">
              WeGo Community
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#11230e] tracking-tight">
              Explore Our WeGo Community Events
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Connecting Colorado caregiving families through fully accessible outdoor adventures, sensory sessions, and warm peer circles.
            </p>
          </div>

          {/* 4 Community Event Cards with High-Legibility Modern Thumbnails */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="group bg-white rounded-3xl sm:rounded-[28px] overflow-hidden border border-slate-200/70 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src="/images/wego-park-wheelchair.jpg"
                  alt="Accessible park and trail walk"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-md text-[#2e541c] border border-white/80 shadow-xs">
                    Park Outings
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3 bg-white">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#2e541c] transition-colors leading-snug">
                    Accessible Park &amp; Trail Days
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    Paved scenic Colorado trail walks, shade pavilions, and family picnic gatherings.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-emerald-700">
                  Monthly Outdoor Outings
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white rounded-3xl sm:rounded-[28px] overflow-hidden border border-slate-200/70 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src="/images/wego-therapy-pony.jpg"
                  alt="Mini therapy pony visits"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-md text-amber-800 border border-white/80 shadow-xs">
                    Animal Therapy
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3 bg-white">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                    Mini Therapy Pony Visits
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    Calm, gentle hands-on animal sessions promoting emotional relaxation and joy.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-amber-700">
                  Hands-On Animal Therapy
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white rounded-3xl sm:rounded-[28px] overflow-hidden border border-slate-200/70 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src="/images/wego-chuckecheese.jpg"
                  alt="Sensory play day"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-md text-blue-800 border border-white/80 shadow-xs">
                    Sensory Play
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3 bg-white">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-800 transition-colors leading-snug">
                    Sensory-Friendly Mornings
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    Private low-stimulation play hours with dimmed lighting and calm surroundings.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-blue-700">
                  Low-Stimulation Play Sessions
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group bg-white rounded-3xl sm:rounded-[28px] overflow-hidden border border-slate-200/70 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src="/images/wego-family-friends.jpg"
                  alt="Caregiver peer support circle"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-md text-purple-800 border border-white/80 shadow-xs">
                    Peer Circles
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3 bg-white">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-800 transition-colors leading-snug">
                    Caregiver Coffee &amp; Support
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    Parent coffee meetups, shared caregiver wisdom, and lifelong family friendships.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-purple-700">
                  Peer Wisdom &amp; Coffee Meetups
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Links & Join Action (Matching user's reference) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ffeae3] to-[#ffd7cd] border border-[#ffc3b5] shadow-xs">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white text-[#ff6b4a] hover:bg-[#ff6b4a] hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                aria-label="LiliSare Facebook Community"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
              <span className="text-xs font-bold text-slate-700">Follow Our Community</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white text-[#ff6b4a] hover:bg-[#ff6b4a] hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                aria-label="LiliSare Instagram Community"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={() => notify('WeGo Community', 'Check out upcoming community events or follow our social channels!', 'info')}
              className="bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-[0_4px_14px_rgba(255,107,74,0.35)] hover:shadow-[0_6px_20px_rgba(255,107,74,0.45)] transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Join WeGo Community</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. FAQ (Elevated White Cards With Soft Outer Shadow)                     */}
      {/* ========================================================================= */}
      <section id="faq" className="py-20 sm:py-24 px-4 sm:px-8 bg-[#f8faf7] border-b border-slate-200/60">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#2e541c] bg-[#eef7ea] border border-[#cbe5c3] px-3.5 py-1 rounded-full shadow-2xs">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Questions &amp; Answers
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Clear guidance on getting paid, Medicaid eligibility, and hours.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden bg-white ${
                  openFaq === idx
                    ? 'border-[#2e541c]/40 shadow-[0_20px_50px_rgba(0,0,0,0.08)] -translate-y-0.5'
                    : 'border-slate-200/70 shadow-[0_15px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:-translate-y-0.5'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 sm:p-7 text-left font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <span className="leading-snug">{item.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      openFaq === idx ? 'bg-[#eef7ea] text-[#2e541c]' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {openFaq === idx ? (
                      <ChevronUp className="w-4 h-4 text-[#2e541c]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 font-normal">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 14. RESOURCES (Modern Elevated White Cards With Soft Outer Shadow)        */}
      {/* ========================================================================= */}
      <section id="resources" className="py-20 sm:py-24 px-4 sm:px-8 bg-[#f8faf7] border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Eyebrow & Title */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#2e541c] uppercase bg-[#eef7ea] border border-[#cbe5c3] px-3.5 py-1 rounded-full shadow-2xs">
              Free Downloads &amp; Toolkits
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#11230e] tracking-tight">
              Family Caregiver Guides &amp; Resources
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Practical, step-by-step tools to help Colorado families unlock benefits, pass evaluations, and record hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Guide 1 */}
            <div className="group bg-white rounded-3xl sm:rounded-[28px] p-7 sm:p-8 border border-slate-200/70 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl border border-emerald-200 bg-emerald-50/80 text-[#2e541c] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <FileText className="w-6 h-6 text-[#2e541c]" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border bg-emerald-50 text-emerald-800 border-emerald-200/80">
                    PDF • 8 Pages
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#2e541c] transition-colors leading-snug">
                    Medicaid Waiver Guide
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Complete breakdown of CES, CHRP, SLS, DD, and EBD program rules, eligibility, and pay rates.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleResourceDownload('Medicaid Waiver Guide')}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_14px_rgba(255,107,74,0.3)] hover:shadow-[0_6px_20px_rgba(255,107,74,0.4)] active:scale-[0.98]"
              >
                <span>Download Free PDF</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Guide 2 */}
            <div className="group bg-white rounded-3xl sm:rounded-[28px] p-7 sm:p-8 border border-slate-200/70 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl border border-amber-200 bg-amber-50/80 text-amber-700 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <CheckCheck className="w-6 h-6 text-amber-700" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border bg-amber-50 text-amber-800 border-amber-200/80">
                    Checklist • 3 Pages
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                    IHSS Caregiver Checklist
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Step-by-step checklist for CBI background check, W-4 tax setup, and agency intake requirements.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleResourceDownload('IHSS Checklist')}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_14px_rgba(255,107,74,0.3)] hover:shadow-[0_6px_20px_rgba(255,107,74,0.4)] active:scale-[0.98]"
              >
                <span>Download Free PDF</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Guide 3 */}
            <div className="group bg-white rounded-3xl sm:rounded-[28px] p-7 sm:p-8 border border-slate-200/70 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl border border-blue-200 bg-blue-50/80 text-blue-700 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Smartphone className="w-6 h-6 text-blue-700" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border bg-blue-50 text-blue-800 border-blue-200/80">
                    Manual • 4 Pages
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                    EVV App User Manual
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Illustrated screenshot tutorial showing 1-tap mobile clock-in, break logging, and timesheet approvals.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleResourceDownload('EVV Manual')}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_14px_rgba(255,107,74,0.3)] hover:shadow-[0_6px_20px_rgba(255,107,74,0.4)] active:scale-[0.98]"
              >
                <span>Download Free PDF</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Guide 4 */}
            <div className="group bg-white rounded-3xl sm:rounded-[28px] p-7 sm:p-8 border border-slate-200/70 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl border border-purple-200 bg-purple-50/80 text-purple-700 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Users className="w-6 h-6 text-purple-700" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border bg-purple-50 text-purple-800 border-purple-200/80">
                    Directory • 2026
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug">
                    Colorado Agency Directory
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Direct phone numbers and intake links for RMHS, Developmental Pathways, Imagine!, and TRE.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleResourceDownload('Agency Directory')}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_14px_rgba(255,107,74,0.3)] hover:shadow-[0_6px_20px_rgba(255,107,74,0.4)] active:scale-[0.98]"
              >
                <span>Download Free PDF</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 15. CONTACT (Modern Luxury AxisCare Dual-Card Layout)                      */}
      {/* ========================================================================= */}
      <section id="contact" className="py-20 sm:py-24 px-4 sm:px-8 bg-white border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Eyebrow & Title */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#2d551e] uppercase">
              Get In Touch
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#11230e] tracking-tight">
              Connect With Our Colorado Care Team
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Speak directly with our local family care coordinators for waiver verification, intake, or general questions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Deep Green Luxury Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#12280d] via-[#1a3a14] to-[#254f1c] text-white p-8 sm:p-10 rounded-3xl sm:rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/10 flex flex-col justify-between space-y-8 relative overflow-hidden">
              {/* Subtle ambient gold blur */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#F2B632]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-200/90 bg-white/10 border border-white/15 px-3 py-1 rounded-full inline-block">
                    CDPHE Licensed Class A &amp; B
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">LiliSare Colorado</h3>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
                    Direct, compassionate guidance from Colorado caregivers and intake coordinators who live the caregiving journey.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Phone highlight */}
                  <a
                    href="tel:3035780181"
                    className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 flex items-center gap-3.5 transition-all group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-[#F2B632]/20 border border-[#F2B632]/30 flex items-center justify-center text-[#F2B632] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-200/80 font-bold uppercase tracking-wider block">
                        Call or Text Directly
                      </span>
                      <span className="text-base font-extrabold text-white group-hover:text-[#F2B632] transition-colors">
                        303-578-0181
                      </span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@lilisare.com"
                    className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 flex items-center gap-3.5 transition-all group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-200/80 font-bold uppercase tracking-wider block">
                        Email Our Coordinators
                      </span>
                      <span className="text-sm font-bold text-white group-hover:underline">
                        info@lilisare.com
                      </span>
                    </div>
                  </a>
                </div>

                {/* Office Addresses */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#F2B632] shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="text-slate-200 text-xs leading-relaxed">
                      <strong className="text-white block font-semibold mb-0.5">Denver Metro &amp; South Offices:</strong>
                      <p>7100 E Belleview Ave, Ste 310, Greenwood Village, CO 80111</p>
                      <p className="text-slate-300 mt-1">3750 Dacoro Ln, Ste 130, Castle Rock, CO 80109</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours Micro Notice */}
              <div className="flex items-center gap-2 text-[11px] text-emerald-200/80 pt-4 border-t border-white/10 relative z-10">
                <Clock className="w-3.5 h-3.5 text-[#F2B632] shrink-0" />
                <span>Mon–Fri: 8am–5pm MT • 24/7 RN On-Call for Active Families</span>
              </div>
            </div>

            {/* Right Column: Floating White Form Card */}
            <div className="lg:col-span-7 bg-[#f8faf8] sm:bg-white rounded-3xl sm:rounded-[28px] border border-slate-200/80 p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Send Us a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal">
                  A local coordinator will review your inquiry and follow up within 24 business hours.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                {/* County Selection */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Colorado County</label>
                  <select
                    value={contactCounty}
                    onChange={(e) => setContactCounty(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#2d551e] focus:border-[#2d551e] focus:outline-none shadow-xs transition-colors"
                  >
                    <option value="Denver County">Denver County</option>
                    <option value="Arapahoe County">Arapahoe County</option>
                    <option value="Douglas County">Douglas County</option>
                    <option value="Jefferson County">Jefferson County</option>
                    <option value="Adams County">Adams County</option>
                    <option value="El Paso County">El Paso County (Colorado Springs)</option>
                    <option value="Boulder County">Boulder County</option>
                    <option value="Larimer / Weld County">Larimer / Weld County</option>
                    <option value="Other Colorado County">Other Colorado County</option>
                  </select>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maria Gonzalez"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[#2d551e] focus:border-[#2d551e] focus:outline-none shadow-xs transition-colors"
                  />
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(303) 555-0123"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[#2d551e] focus:border-[#2d551e] focus:outline-none shadow-xs transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Email Address</label>
                    <input
                      type="email"
                      placeholder="maria@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[#2d551e] focus:border-[#2d551e] focus:outline-none shadow-xs transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">How can we help your family?</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your loved one, waiver status (CES, SLS, EBD), or questions about hours and pay..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[#2d551e] focus:border-[#2d551e] focus:outline-none shadow-xs transition-colors"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white font-bold text-xs sm:text-sm py-4 rounded-2xl shadow-[0_4px_14px_rgba(255,107,74,0.35)] hover:shadow-[0_6px_20px_rgba(255,107,74,0.45)] transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending Inquiry...' : 'Send Message'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>100% confidential. Your information is protected under HIPAA.</span>
                </div>
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
