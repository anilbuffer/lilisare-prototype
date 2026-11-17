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
  LayoutDashboard,
  DollarSign,
  TrendingUp,
  Activity,
  Check,
  FileText,
  Star,
  CheckCheck,
  BadgeCheck,
  Baby,
  Download,
  BookOpen,
  Send,
  Facebook,
  Instagram,
  Quote,
  MapPinned,
  Compass
} from 'lucide-react';
import { usePortal } from '@/lib/store/portal-context';

/* ========================================================================= */
/* 1. MULTILINGUAL SUPPORT & REAL SVG FLAGS (Inclusive Colorado Community)   */
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
  <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
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
  <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
    <path fill="#c60b1e" d="M0 0h640v480H0z" />
    <path fill="#ffc400" d="M0 120h640v240H0z" />
    <circle cx="160" cy="240" r="36" fill="#c60b1e" />
  </svg>
);

const FlagVietnamese = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
    <path fill="#da251d" d="M0 0h640v480H0z" />
    <polygon fill="#ff0" points="320,130 356,236 468,236 377,301 412,408 320,342 228,408 263,301 172,236 284,236" />
  </svg>
);

const FlagArabic = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
    <path fill="#056839" d="M0 0h640v480H0z" />
    <circle cx="320" cy="240" r="115" fill="none" stroke="#fff" strokeWidth="12" />
    <circle cx="320" cy="240" r="95" fill="none" stroke="#f6c23e" strokeWidth="8" />
  </svg>
);

const FlagSomali = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
    <path fill="#4189dd" d="M0 0h640v480H0z" />
    <polygon fill="#fff" points="320,140 354,238 460,238 375,300 408,398 320,336 232,398 265,300 180,238 286,238" />
  </svg>
);

const FlagRussian = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
    <path fill="#fff" d="M0 0h640v160H0z" />
    <path fill="#0039a6" d="M0 160h640v160H0z" />
    <path fill="#d52b1e" d="M0 320h640v160H0z" />
  </svg>
);

const FlagChinese = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
    <path fill="#de2910" d="M0 0h640v480H0z" />
    <polygon fill="#ffde00" points="100,50 115,95 160,95 125,120 140,165 100,140 60,165 75,120 40,95 85,95" />
  </svg>
);

const FlagFrench = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
    <path fill="#002395" d="M0 0h213.3v480H0z" />
    <path fill="#fff" d="M213.3 0h213.4v480H213.3z" />
    <path fill="#ed2939" d="M426.7 0H640v480H426.7z" />
  </svg>
);

const FlagGerman = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
    <path fill="#000" d="M0 0h640v160H0z" />
    <path fill="#d00" d="M0 160h640v160H0z" />
    <path fill="#ffce00" d="M0 320h640v160H0z" />
  </svg>
);

const FlagDutch = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/15" viewBox="0 0 640 480">
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

  // Language Dropdown State
  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [isLangOpen, setIsLangOpen] = useState<boolean>(false);
  const currentLang = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  // Pay Calculator State (Colorado Medicaid IHSS & CNA Rates)
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(28);
  const [careRoleType, setCareRoleType] = useState<'ihss' | 'cna'>('ihss');
  
  // Real Colorado Medicaid baseline averages
  const hourlyRate = careRoleType === 'cna' ? 32.50 : 28.50;
  const weeklyEarnings = Math.round(hoursPerWeek * hourlyRate);
  const monthlyEarnings = Math.round(weeklyEarnings * 4.33);
  const annualEarnings = Math.round(weeklyEarnings * 52);

  // Active Service Tab for Interactive Programs Showcase
  const [activeServiceTab, setActiveServiceTab] = useState<number>(0);

  // FAQ Accordion State (first item open by default)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Quick Hero Lead Capture State
  const [heroContact, setHeroContact] = useState<string>('');
  const [heroCareRelation, setHeroCareRelation] = useState<string>('child');

  // Contact Form State
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactRelation, setContactRelation] = useState<string>('My Child (Minor or Adult)');
  const [contactCounty, setContactCounty] = useState<string>('Denver County');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Handlers
  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroContact.trim()) return;

    if (addLead) {
      addLead({
        clientName: heroCareRelation === 'child' ? 'Family Child Client' : 'Family Adult Client',
        primaryContactName: 'Family Inquirer',
        relationship: heroCareRelation === 'child' ? 'Parent' : 'Family Member',
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
        notes: `Quick hero inquiry. Caring for: ${heroCareRelation}. Preferred contact: ${heroContact}`,
      });
    }

    notify(
      'Inquiry Received with Warmth',
      `Thank you! A LiliSare Care Coordinator will reach out to ${heroContact} within 24 hours to help guide your family.`,
      'success'
    );
    setHeroContact('');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || (!contactPhone.trim() && !contactEmail.trim())) {
      notify('Please provide a contact method', 'Please include your name and either a phone number or email so we can reach back out.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      if (addLead) {
        addLead({
          clientName: `${contactName}'s Loved One`,
          primaryContactName: contactName,
          relationship: contactRelation,
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
          notes: `Location: ${contactCounty}. Relationship: ${contactRelation}. Note: ${contactMessage || 'No extra note provided.'}`,
        });
      }

      notify(
        'Message Sent Successfully',
        `Thank you ${contactName}! We received your note. A member of our family care team will call or text you shortly.`,
        'success'
      );
      setContactName('');
      setContactPhone('');
      setContactEmail('');
      setContactMessage('');
      setIsSubmitting(false);
    }, 400);
  };

  const handleResourceDownload = (resourceTitle: string) => {
    notify(
      'Resource Ready',
      `"${resourceTitle}" is downloading to your device. May it bring clarity to your family's next steps!`,
      'info'
    );
  };

  // Humanized, Authentic Colorado Service List
  const servicesList = [
    {
      id: 'ihss',
      pill: 'In-Home Support (IHSS)',
      badge: 'Parent & Family Attendant Care',
      title: 'In-Home Support Services (IHSS)',
      headline: 'Be hired as your loved one’s primary caregiver with competitive hourly wages and zero medical license required.',
      desc: 'Under Colorado Medicaid, parents of minor children, spouses, and adult children are legally recognized as the very best people to provide care. IHSS covers everyday assistance—mobility, meal preparation, dressing, medication prompting, and personal hygiene—giving you reliable bi-weekly compensation while keeping your loved one safely in their own home.',
      image: '/images/service-ihss-father-son.jpg',
      imageAlt: 'Loving father embracing his son in wheelchair at home in Colorado',
      features: [
        { icon: Heart, title: 'Parents & Relatives Legally Hired', desc: 'No prior healthcare background or certification needed to start.' },
        { icon: DollarSign, title: '$28.50+ / Hour with Direct Deposit', desc: 'W-2 employment, overtime eligibility, and bi-weekly direct deposit via ADP.' },
        { icon: Smartphone, title: '1-Tap Mobile Visit Verification', desc: 'Clock in and out in 5 seconds without paper timesheets or complicated logs.' },
        { icon: Stethoscope, title: 'Dedicated Colorado Registered Nurse', desc: 'Continuous clinical coaching, care planning, and peace of mind for your home.' },
      ],
      tagline: '100% Colorado Medicaid Funded • Authorized for 15 to 40+ Hours / Week'
    },
    {
      id: 'cna',
      pill: 'Become a Colorado CNA',
      badge: 'Paid Skilled In-Home Nursing Aide',
      title: 'Become a Certified Nurse Aide for Your Loved One',
      headline: 'We sponsor and pay for your Colorado CNA training so you can provide skilled medical care at elevated wages.',
      desc: 'When your loved one has complex clinical needs—such as G-tubes, tracheostomies, respiratory therapy, or specialized medication administration—they deserve skilled care from someone they deeply trust. LiliSare sponsors your state class tuition, test fees, and licensing, preparing you to deliver certified care at home with wages up to $32.50 per hour.',
      image: '/images/service-cna-mother-son.jpg',
      imageAlt: 'Mother holding her young son closely while receiving certified in-home care',
      features: [
        { icon: Award, title: '100% Sponsored Tuition & Testing', desc: 'We cover the full cost of your approved Colorado CNA course and state exam.' },
        { icon: DollarSign, title: 'Earn Up to $32.50 / Hour', desc: 'Elevated hourly compensation recognizing your skilled clinical capability.' },
        { icon: Stethoscope, title: 'Supervised by Our Registered Nurses', desc: 'Rebecca Stern, RN and our nursing team guide and support you every step.' },
        { icon: ShieldCheck, title: 'State-Licensed Class A Agency', desc: 'Full CDPHE compliance protecting your family with clinical excellence.' },
      ],
      tagline: 'Tuition Sponsored by LiliSare • Elevated In-Home Medical Compensation'
    },
    {
      id: 'cfc',
      pill: 'Community First Choice (CFC)',
      badge: 'Medicaid State Plan Entitlement',
      title: 'Community First Choice (CFC) Benefit',
      headline: 'A Colorado Medicaid entitlement that provides self-directed personal attendant care with zero waiting lists.',
      desc: 'Unlike traditional waivers that can have multi-year waiting lists, Community First Choice is an uncapped entitlement under Colorado Medicaid. CFC allows participants to handpick their personal care attendants, direct their daily routines, and receive the assistance they need to live independently and actively in their local community.',
      image: '/images/service-cfc-sisters.jpg',
      imageAlt: 'Two sisters smiling outdoors in the Colorado sunshine',
      features: [
        { icon: ShieldCheck, title: 'Zero Waiting List Entitlement', desc: 'Available to all eligible Colorado Medicaid recipients without multi-year delays.' },
        { icon: Users, title: 'You Choose Your Caregiver', desc: 'Direct your care and select trusted family members or friends as your attendants.' },
        { icon: HomeIcon, title: 'True Community Independence', desc: 'Personal care tailored around your life, your home, and your personal schedule.' },
        { icon: FileCheck, title: 'Full State Plan Protection', desc: 'Comprehensive state-backed coverage that supports dignified long-term living.' },
      ],
      tagline: 'Colorado Medicaid Entitlement • Immediate Access Without Waiver Waitlists'
    },
    {
      id: 'hcbs',
      pill: 'HCBS Waivers (Children & Adults)',
      badge: 'Comprehensive Community Care',
      title: 'Home and Community-Based Services (HCBS Waivers)',
      headline: 'Comprehensive funding for children with special healthcare needs and adults with disabilities to flourish at home.',
      desc: 'Colorado HCBS waivers provide vital funding so that high-medical or behavioral need individuals don’t have to live in institutional facilities. We actively coordinate with your regional Case Management Agency to ensure your family receives every authorized dollar for personal care, respite, assistive technology, and home adaptations.',
      image: '/images/service-hcbs-mother-daughter.jpg',
      imageAlt: 'Mother holding her daughter outdoors in a lush green Colorado park',
      features: [
        { icon: Baby, title: 'Children’s Waivers: CES, CHRP & CHCBS', desc: 'Specialized support for high-medical and behavioral conditions during childhood.' },
        { icon: Users, title: 'Adult Waivers: SLS, DD, EBD & CIH', desc: 'Supported living, developmental disability, and elder care in family settings.' },
        { icon: BadgeCheck, title: 'Case Management Agency Synced', desc: 'Seamlessly authorized through RMHS, Developmental Pathways, Imagine! & TRE.' },
        { icon: Clock, title: 'Flexible In-Home Coverage', desc: 'Morning, evening, weekend, and overnight shifts tailored to your household.' },
      ],
      tagline: '100% Covered by Colorado Medicaid • $0 Out-of-Pocket Family Cost'
    },
    {
      id: 'irss',
      pill: 'IRSS & Host Homes',
      badge: 'Family Living & Community Supports',
      title: 'Individual Residential Services and Supports (IRSS)',
      headline: 'Loving residential arrangements and family caregiver models for adults with developmental disabilities.',
      desc: 'Every adult with intellectual or developmental disabilities deserves a place to live where they are cherished, respected, and given space to grow. Through IRSS, adults can continue living with their own families with structured funding, or reside in thoroughly vetted, warm Colorado Host Homes where they develop lifelong life skills and community connections.',
      image: '/images/service-irss-mother-son-laptop.jpg',
      imageAlt: 'Mother and adult son reviewing tablet activities together at home',
      features: [
        { icon: HomeIcon, title: 'Family Caregiver Residential Model', desc: 'Adult clients remain in their family household with structured monthly funding.' },
        { icon: Smile, title: 'Vetted Colorado Host Homes', desc: 'Warm, deeply supportive community homes with dedicated host families.' },
        { icon: Activity, title: 'Life Skills & Social Flourishing', desc: 'Cooking, budgeting, community outings, transportation, and peer friendships.' },
        { icon: ShieldCheck, title: '24/7 Agency Safety Oversight', desc: 'Ongoing respite relief, clinical check-ins, and round-the-clock emergency support.' },
      ],
      tagline: 'Colorado Adult IDD Residential • Dignified, Lifelong Community Living'
    },
    {
      id: 'waivers',
      pill: 'All Accepted Waivers',
      badge: 'Complete Colorado Coverage',
      title: 'We Accept and Manage All Major Colorado Medicaid Waivers',
      headline: 'Unsure which waiver your family qualifies for? We look up your case and handle the paperwork for free.',
      desc: 'LiliSare is fully licensed and certified across Colorado to manage care under every primary waiver program. You do not need to navigate the state bureaucracy alone. Our team works hand-in-hand with county caseworkers across Denver, Aurora, Colorado Springs, and mountain towns to verify your benefits and unlock your caregiver pay.',
      image: '/images/service-waivers-family-lake.jpg',
      imageAlt: 'Colorado family standing together happily at mountain lake resort',
      features: [
        { icon: FileCheck, title: 'Children’s Extensive Support (CES)', desc: 'For children with intense behavioral, physical, or medical needs.' },
        { icon: Heart, title: 'Children’s Habilitation Residential (CHRP)', desc: 'Intensive home-based stabilization and family preservation.' },
        { icon: Award, title: 'Supported Living & DD Waivers (SLS / DD)', desc: 'Adult independent living, personal care, and community access.' },
        { icon: Phone, title: 'Free 15-Minute Benefits Lookup', desc: 'Call us at 303-578-0181 to check which waiver fits your family.' },
      ],
      tagline: 'CES • CHRP • SLS • DD • EBD • CHCBS • CIH • CFC'
    }
  ];

  // Human-Crafted FAQ (Answers real family questions without corporate filler)
  const faqItems = [
    {
      q: 'Can a mother, father, or close relative really get paid to care for their own child in Colorado?',
      a: 'Yes, absolutely. Under Colorado Medicaid’s In-Home Support Services (IHSS) and Certified Nurse Aide (CNA) programs, parents of minor children, spouses, adult children, siblings, and close family friends can be officially hired and paid hourly wages. Colorado law recognizes that family members are often the most reliable, loving, and medically attentive caregivers a person can have.'
    },
    {
      q: 'Does getting paid as a caregiver reduce our loved one’s other Medicaid or therapy benefits?',
      a: 'Not by a single penny. The funds for family caregiver pay come directly from Colorado Medicaid HCBS waiver programs (like CES, CHRP, SLS, or EBD). This is an authorized service entitlement. It does not deduct from your loved one’s speech therapy, occupational therapy, specialized equipment, medication coverage, or doctor visits.'
    },
    {
      q: 'What if I don’t have any medical training or certification?',
      a: 'You do not need any medical background to start as an IHSS caregiver. IHSS is designed specifically for family members providing assistance with activities of daily living—like mobility, feeding, dressing, bathing, and medication prompting. If your loved one needs skilled clinical care (like feeding tubes or tracheostomies), LiliSare will sponsor and pay for your Colorado CNA training and state licensing so you become fully qualified while getting paid.'
    },
    {
      q: 'How many hours per week can our family be approved for, and what is the hourly pay?',
      a: 'Approved weekly hours are determined by an assessment of your loved one’s daily living needs conducted with your local Case Management Agency (such as Rocky Mountain Human Services, Developmental Pathways, or Imagine!). Most families are authorized for 15 to 40+ hours per week. LiliSare pays competitive wages ($28.50+/hr for IHSS attendants, and up to $32.50/hr for CNAs) with W-2 tax protections, overtime pay, and bi-weekly direct deposit via ADP.'
    },
    {
      q: 'What if we don’t have Medicaid yet or don’t know which waiver we have?',
      a: 'That is completely okay—and very common. Navigating the state system can feel like learning a foreign language. Call or text our team at 303-578-0181. Our intake specialists will look up your loved one’s status, connect you with your county single entry point agency, and walk beside you through the entire enrollment application at zero charge.'
    },
    {
      q: 'How hard is clocking in, and how soon do I receive my first paycheck?',
      a: 'We built our mobile app specifically so busy parents don’t have to fight technology. Clocking in takes 1 tap when you are at home. GPS verifies your location automatically according to state rules. Hours are approved by our coordinators, and you receive bi-weekly direct deposit straight to your bank account. No paper timesheets, no chasing signatures.'
    }
  ];

  return (
    <div id="home" className="w-full bg-[#fbfdfa] text-slate-800 antialiased overflow-x-hidden selection:bg-[#3e6b2b] selection:text-white">
      {/* ========================================================================= */}
      {/* TOP GREEN UTILITY BAR (High-Trust Colorado Health Authority)              */}
      {/* ========================================================================= */}
      <div className="bg-[#1b3614] text-white text-xs py-2.5 px-4 sm:px-8 border-b border-emerald-950/60 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-3 flex-wrap justify-center text-[11px] sm:text-xs font-medium">
            <span className="flex items-center gap-1.5 font-bold text-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00d084] shrink-0" />
              Colorado CDPHE Licensed Agency (Class A & B) • 100% Medicaid Covered
            </span>
            <span className="text-white/30 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-200">Questions about your family’s hours? Call or text:</span>
              <a href="tel:3035780181" className="font-black text-[#F2B632] hover:underline tracking-tight">
                303-578-0181
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-[11px] relative">
            <button
              onClick={() => {
                setSelectedLang('es');
                notify(
                  'Asistencia en Español',
                  'Para asistencia inmediata en español con un coordinador bilingüe de LiliSare, llámenos directamente al 303-578-0181.',
                  'info'
                );
              }}
              className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-black px-3 py-1 rounded-full hover:brightness-105 transition-all shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <span>📞 Se Habla Español</span>
            </button>

            {/* Language Selector Dropdown */}
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
                className={`bg-white text-slate-800 text-xs font-bold px-3 py-1 flex items-center gap-1.5 shadow-xs hover:shadow transition-all border border-slate-200 cursor-pointer select-none relative z-50 ${
                  isLangOpen ? 'rounded-t-xl rounded-b-none border-b-transparent shadow-md' : 'rounded-full'
                }`}
              >
                <FlagIcon code={currentLang.code} />
                <span>{currentLang.short}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 top-full w-56 bg-white text-slate-800 rounded-b-2xl rounded-tl-2xl shadow-2xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Select Preferred Language
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1">
                    {LANGUAGES.map((lang) => {
                      const isSelected = selectedLang === lang.code;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setSelectedLang(lang.code);
                            setIsLangOpen(false);
                            notify(
                              `Language Selected: ${lang.label}`,
                              `LiliSare provides translated intake packets and multi-lingual coordinator support for Colorado families.`,
                              'info'
                            );
                          }}
                          className={`w-full px-3 py-2 text-left flex items-center gap-2.5 text-xs transition-colors hover:bg-emerald-50 ${
                            isSelected ? 'bg-emerald-50 font-bold text-[#1b3614]' : 'text-slate-700'
                          }`}
                        >
                          <FlagIcon code={lang.code} />
                          <span>{lang.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN HEADER NAVIGATION (Editorial, Refined, Signature Coral Pill)         */}
      {/* ========================================================================= */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4">
          {/* Left: LiliSare Lotus Logo */}
          <div
            className="flex items-center cursor-pointer group shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/images/lilisare-logo.png"
              alt="LiliSare - because we care"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </div>

          {/* Center: Signature Coral Capsule Menu */}
          <nav className="hidden lg:flex items-center bg-gradient-to-r from-[#ff6b4a] via-[#ff7e5f] to-[#ff9e6c] text-white rounded-full px-7 py-2.5 shadow-[0_4px_16px_rgba(255,110,64,0.24)] gap-5 text-[13px] font-bold tracking-normal select-none">
            <a href="#home" className="hover:opacity-90 transition-opacity">Home</a>
            <a href="#our-story" className="hover:opacity-90 transition-opacity">Our Story</a>
            <a href="#calculator" className="hover:opacity-90 transition-opacity">How You Earn</a>
            <a href="#services" className="hover:opacity-90 transition-opacity">Programs &amp; Waivers</a>
            <a href="#steps" className="hover:opacity-90 transition-opacity">4 Simple Steps</a>
            <a href="#community" className="hover:opacity-90 transition-opacity">Community</a>
            <a href="#faq" className="hover:opacity-90 transition-opacity">FAQ</a>
            <a href="#contact" className="hover:opacity-90 transition-opacity">Contact Us</a>
          </nav>

          {/* Right: Staff Portal link + Forest Green Get Started CTA */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              onClick={onExplorePortal}
              className="text-[13px] sm:text-sm font-bold text-slate-700 hover:text-[#27481b] transition-colors hidden sm:block cursor-pointer px-3 py-1.5 rounded-lg hover:bg-slate-100/70"
            >
              Staff Portal
            </button>
            <button
              onClick={onStartOnboarding}
              className="bg-[#2a4e1d] hover:bg-[#1f3b15] text-white font-bold px-5 sm:px-6 py-2.5 rounded-full text-[13px] sm:text-sm shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 px-4 bg-white text-xs font-bold text-slate-700 gap-5 border-t border-slate-100 scrollbar-none">
          <a href="#home" className="whitespace-nowrap hover:text-[#2a4e1d]">Home</a>
          <a href="#our-story" className="whitespace-nowrap hover:text-[#2a4e1d]">Our Story</a>
          <a href="#calculator" className="whitespace-nowrap hover:text-[#2a4e1d]">Earnings Calculator</a>
          <a href="#services" className="whitespace-nowrap hover:text-[#2a4e1d]">Programs</a>
          <a href="#steps" className="whitespace-nowrap hover:text-[#2a4e1d]">4 Steps</a>
          <a href="#community" className="whitespace-nowrap hover:text-[#2a4e1d]">Community</a>
          <a href="#faq" className="whitespace-nowrap hover:text-[#2a4e1d]">FAQ</a>
          <a href="#contact" className="whitespace-nowrap hover:text-[#2a4e1d]">Contact</a>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 1. HERO: THE HUMAN TRUTH & THE PROMISE OF FAMILY CARE                     */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#142910] via-[#213f19] to-[#2f5524] text-white pt-14 pb-20 sm:pt-20 sm:pb-32 px-4 sm:px-8 overflow-hidden">
        {/* Soft Organic Atmospheric Glows */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-[500px] h-[500px] bg-[#F2B632]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
          {/* Left Column: Authentic Brand Narrative & Lead Action */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-[#F2B632]">
              <Sparkles className="w-3.5 h-3.5 text-[#F2B632]" />
              <span>Colorado Medicaid In-Home Support Services (IHSS &amp; CNA)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
              You already provide the love.{' '}
              <span className="text-[#F2B632] underline decoration-[#ff7e5f] decoration-wavy decoration-2 underline-offset-8">
                Colorado pays you
              </span>{' '}
              to care for them at home.
            </h1>

            <p className="text-base sm:text-lg text-emerald-100 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Caring for a child with special needs or an aging parent isn’t just a responsibility—it’s your life. Under Colorado Medicaid, parents and family members can earn <strong className="text-white font-bold">$28.50 to $32.50 / hour</strong> as legal in-home caregivers, backed by easy 1-tap mobile time tracking and dedicated Registered Nurses who visit your home.
            </p>

            {/* Quick Hero Lead Form */}
            <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/25 max-w-lg mx-auto lg:mx-0 shadow-2xl">
              <form onSubmit={handleHeroSubmit} className="space-y-2">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter your phone number or email..."
                    value={heroContact}
                    onChange={(e) => setHeroContact(e.target.value)}
                    className="w-full text-xs sm:text-sm px-4 py-3.5 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F2B632] font-medium shadow-inner"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto shrink-0 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6b6b] hover:to-[#ffa07a] text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap cursor-pointer"
                  >
                    <span>Check Eligibility</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between px-2 text-[11px] text-emerald-200/90 font-medium">
                  <span>Who are you caring for?</span>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="relation"
                        checked={heroCareRelation === 'child'}
                        onChange={() => setHeroCareRelation('child')}
                        className="accent-[#F2B632]"
                      />
                      <span>My Child</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="relation"
                        checked={heroCareRelation === 'parent'}
                        onChange={() => setHeroCareRelation('parent')}
                        className="accent-[#F2B632]"
                      />
                      <span>My Parent / Adult</span>
                    </label>
                  </div>
                </div>
              </form>
            </div>

            {/* Humanized Trust Metrics */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-emerald-100 font-medium">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#F2B632]">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span><strong>900+</strong> Colorado Caregivers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00d084]" />
                <span><strong>$0</strong> Cost to Your Family</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00d084]" />
                <span>Up to <strong>$32.50/hr</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Heart Image + Floating Glass Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#F2B632]/20 to-emerald-400/20 blur-3xl transform scale-95 pointer-events-none" />

              {/* Heart Photography Frame */}
              <div className="relative w-full max-w-[440px] aspect-square rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.01] flex items-center justify-center border-4 border-white/20 bg-emerald-950/40">
                <img
                  src="/images/hero-caregiver-heart.jpg"
                  alt="Young caregiver gently supporting senior loved one in sunny Colorado garden"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Floating Glass Badge 1: Bi-Weekly Pay via ADP */}
              <div className="absolute -top-3 left-0 sm:-left-4 bg-white/95 backdrop-blur-md text-slate-900 p-3 sm:p-3.5 rounded-2xl shadow-2xl border border-white/60 flex items-center gap-3 transform -rotate-1 hover:rotate-0 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#1b3614] flex items-center justify-center font-bold">
                  <DollarSign className="w-5 h-5 text-emerald-800" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Bi-Weekly Pay</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900">Direct Deposit via ADP</span>
                </div>
              </div>

              {/* Floating Glass Badge 2: 1-Tap Colorado EVV */}
              <div className="absolute -bottom-4 left-2 sm:-left-4 bg-white/95 backdrop-blur-md text-slate-900 p-3 sm:p-3.5 rounded-2xl shadow-2xl border border-white/60 flex items-center gap-3 transform rotate-1 hover:rotate-0 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-primary-100 text-[#2a4e1d] flex items-center justify-center font-bold">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Colorado EVV</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900">1-Tap GPS Mobile Clock-In</span>
                </div>
              </div>

              {/* Floating Glass Badge 3: Licensed Authority */}
              <div className="absolute bottom-16 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md text-slate-900 px-3 py-2 rounded-2xl shadow-2xl border border-white/60 hidden sm:flex items-center gap-2 transform -rotate-2 hover:rotate-0 transition-transform">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px] font-bold text-slate-800">CDPHE Licensed Class A &amp; B</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CASE MANAGEMENT AGENCIES TRUST STRIP                                   */}
      {/* ========================================================================= */}
      <div className="py-7 bg-white border-b border-slate-200/80 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <p className="text-center text-xs font-black uppercase tracking-wider text-slate-400">
            Authorized &amp; Coordinated Across Colorado Medicaid Single Entry Point &amp; Case Management Agencies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-600 font-bold text-xs sm:text-sm">
            <span className="hover:text-[#2a4e1d] transition-colors flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              Rocky Mountain Human Services (RMHS)
            </span>
            <span className="hover:text-[#2a4e1d] transition-colors flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              Developmental Pathways
            </span>
            <span className="hover:text-[#2a4e1d] transition-colors flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              Imagine! Colorado
            </span>
            <span className="hover:text-[#2a4e1d] transition-colors flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              The Resource Exchange (TRE)
            </span>
            <span className="hover:text-[#2a4e1d] transition-colors flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              Envision Colorado
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ACT I: OUR ORIGIN STORY — FOUNDED BY TWO MOTHERS                       */}
      {/* (Moved up right here: This is the heartbeat of LiliSare's human voice)    */}
      {/* ========================================================================= */}
      <section id="our-story" className="py-20 sm:py-28 px-4 sm:px-8 bg-gradient-to-b from-white via-[#f7faf4] to-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#1b3614] text-xs font-black uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-[#ff6b4a] text-[#ff6b4a]" />
              <span>Our Colorado Story &amp; Ethos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Founded by Two Mothers Who Walked in Your Exact Shoes.
            </h2>
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              We didn’t start LiliSare in a corporate boardroom. We built it around our kitchen tables while raising children with special healthcare needs right here in Colorado.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1e3b16] via-[#2a501f] to-[#152910] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden border border-emerald-900/60">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#F2B632]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Column: Authentic Team & Community Photo */}
              <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                <div className="relative w-full max-w-md aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-900 group">
                  <img
                    src="/images/about-lilisare-team.jpg"
                    alt="LiliSare founders, caregivers, and individuals with disabilities together in Colorado park"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Photo Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[#F2B632] text-xs font-black shadow-lg">
                      <Heart className="w-3.5 h-3.5 fill-[#ff7e5f] text-[#ff7e5f]" />
                      Real LiliSare Community &amp; Families
                    </span>
                    <span className="text-[11px] text-white/80 font-medium px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-xs">
                      Colorado Born
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">Because We Lived the Exhaustion First</h3>
                  <p className="text-xs sm:text-sm text-[#F2B632] font-bold mt-0.5">
                    Mothers of children with special needs • 100% Colorado Family-Run
                  </p>
                </div>
              </div>

              {/* Right Column: Heart-to-Heart Narrative */}
              <div className="lg:col-span-6 space-y-5 text-xs sm:text-sm text-slate-100 leading-relaxed border-t lg:border-t-0 lg:border-l border-white/15 pt-6 lg:pt-0 lg:pl-8">
                <div className="space-y-3">
                  <p className="font-semibold text-emerald-100 text-sm sm:text-base leading-relaxed">
                    When you call LiliSare, you are never routed to an offshore call center or handed off to someone reading a generic script. You are talking to mothers and care coordinators who know the weight you carry.
                  </p>
                  <p className="text-slate-200 leading-relaxed">
                    We remember what it felt like to balance sleepless nights with mountains of state paperwork. We remember the panic of wondering if we had the right waiver, the frustration of delayed authorizations, and the isolation of feeling like no one understood what our days actually looked like.
                  </p>
                  <p className="text-slate-200 leading-relaxed">
                    We created LiliSare to be the agency we desperately wished existed when our own families began this journey: warm, completely transparent, fast to respond, and determined to treat you like family every single step of the way.
                  </p>
                </div>

                {/* Micro trust indicators */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-[#F2B632] shrink-0" />
                    <span className="text-xs font-bold text-white">Moms Who Truly Understand</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-[#F2B632] shrink-0" />
                    <span className="text-xs font-bold text-white">Registered Nurse Clinical Backing</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-[#F2B632] shrink-0" />
                    <span className="text-xs font-bold text-white">Zero Red Tape, Zero Runaround</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-[#F2B632] shrink-0" />
                    <span className="text-xs font-bold text-white">100% Colorado Focused</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision Callout Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-[#fefaf0] border border-[#fce2a9] shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2a4e1d]" />
                <span className="text-[11px] font-black uppercase tracking-wider text-[#2a4e1d]">
                  OUR SACRED COMMITMENT
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                To care for the <strong>whole family</strong>—both the loved one receiving care and the caregiver giving it. We take the bureaucratic burden off your shoulders, unlock the state wages you deserve, and ensure you never have to navigate Colorado healthcare alone.
              </p>
            </div>

            <div className="p-7 sm:p-8 rounded-3xl bg-[#fefaf0] border border-[#fce2a9] shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d99719]" />
                <span className="text-[11px] font-black uppercase tracking-wider text-[#d99719]">
                  EMPOWERING EVERY HOUSEHOLD
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                A Colorado where no caregiving family is overlooked or left depleted. Where parents and family caregivers are fairly paid, deeply respected, and equipped with the clinical and peer support they need to help their loved ones thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ACT II: WHAT FLOURISHING FEELS LIKE (The 3 Pillars of Support)          */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#13270f] via-[#1c3816] to-[#284c1f] text-white pt-20 pb-28 px-4 sm:px-8 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-[#F2B632]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#F2B632]">
              The LiliSare Standard of Care
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Because the Most Important Care Happens Around Your Kitchen Table.
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
              Family caregiving is hard work, but the administrative chaos shouldn’t make it impossible. When you partner with LiliSare, you gain the three foundational pillars every caregiving family deserves: financial dignity, stress-free technology, and continuous clinical partnership.
            </p>
          </div>

          {/* 3 Elevated Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {/* Pillar 1: Financial Dignity */}
            <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-9 shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-8 border border-white/80 group">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#2a501f] flex items-center justify-center border border-emerald-100 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-7 h-7" />
                </div>
                <div className="space-y-2.5">
                  <h3 className="text-xl font-black text-slate-900 leading-snug">
                    Financial Dignity &amp; Fair Pay
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    You shouldn’t have to choose between a paycheck and being there for your child or parent. Earn <strong>$28.50+ / hr</strong> for IHSS and up to <strong>$32.50 / hr</strong> for CNA care, paid bi-weekly with ADP direct deposit and full W-2 protections.
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={onStartOnboarding}
                  className="w-full bg-[#2a501f] hover:bg-[#1f3b17] text-white font-black text-xs sm:text-sm py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all text-center cursor-pointer"
                >
                  Estimate Your Pay
                </button>
              </div>
            </div>

            {/* Pillar 2: 1-Tap EVV Technology */}
            <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-9 shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-8 border border-white/80 group">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#a16207] flex items-center justify-center border border-amber-200 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-7 h-7" />
                </div>
                <div className="space-y-2.5">
                  <h3 className="text-xl font-black text-slate-900 leading-snug">
                    Zero Paper Timesheets
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Our mobile app is designed for busy parents, not tech wizards. Clock in and out with 1 tap at home. GPS verifies your visit automatically with built-in grace periods so you never stress over an accidental missed clock-out.
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={onStartOnboarding}
                  className="w-full bg-[#1b3614] hover:bg-[#12240d] text-white font-black text-xs sm:text-sm py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all text-center cursor-pointer"
                >
                  See How EVV Works
                </button>
              </div>
            </div>

            {/* Pillar 3: Dedicated Clinical Oversight */}
            <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-9 shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-8 border border-white/80 group">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-200 group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-7 h-7" />
                </div>
                <div className="space-y-2.5">
                  <h3 className="text-xl font-black text-slate-900 leading-snug">
                    A Registered Nurse in Your Corner
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    You never have to guess in a crisis. Our Colorado Registered Nurses visit your home, provide health maintenance delegation, coach you on clinical care, and remain reachable 24/7 whenever you have questions.
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={onStartOnboarding}
                  className="w-full bg-[#F2B632] hover:bg-[#dfa423] text-amber-950 font-black text-xs sm:text-sm py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all text-center cursor-pointer"
                >
                  Meet Our Nurses
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ACT III: TRANSPARENT FAMILY PAY ESTIMATOR                               */}
      {/* ========================================================================= */}
      <section id="calculator" className="py-20 sm:py-28 px-4 sm:px-8 bg-gradient-to-b from-[#f4f7f2] to-white">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Real Colorado Compensation</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              See What Your Family Care Can Earn Each Month
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Colorado Medicaid recognizes family caregiving as valuable healthcare. Choose your role and slide the bar to calculate your estimated bi-weekly and monthly direct deposit:
            </p>
          </div>

          <div className="bg-white rounded-3xl border-2 border-emerald-200/80 p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Role Toggle: IHSS vs CNA */}
              <div className="flex items-center justify-between p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setCareRoleType('ihss')}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all ${
                    careRoleType === 'ihss'
                      ? 'bg-white text-[#1b3614] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  IHSS Attendant ($28.50 / hr)
                </button>
                <button
                  type="button"
                  onClick={() => setCareRoleType('cna')}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all ${
                    careRoleType === 'cna'
                      ? 'bg-white text-[#1b3614] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Certified Nurse Aide ($32.50 / hr)
                </button>
              </div>

              {/* Slider Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Authorized Weekly Care Hours:
                  </span>
                  <span className="text-2xl font-black text-[#2a4e1d] px-3.5 py-1 bg-emerald-50 rounded-xl border border-emerald-200">
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
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2a4e1d]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-semibold">
                  <span>Part-Time (10h)</span>
                  <span>Average Colorado Plan (28.5h)</span>
                  <span>Full-Time Cap (40h)</span>
                </div>
              </div>

              {/* Rate Badges */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 font-semibold block text-[11px]">Colorado Base Wage</span>
                  <span className="text-base font-black text-slate-900">${hourlyRate.toFixed(2)} / hr</span>
                  <span className="text-[10px] text-emerald-600 block font-medium">Overtime eligible &gt; 40h</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 font-semibold block text-[11px]">Payroll Schedule</span>
                  <span className="text-base font-black text-slate-900">Bi-Weekly (ADP)</span>
                  <span className="text-[10px] text-slate-500 block font-medium">Direct Deposit to your bank</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 flex items-start gap-2.5 text-xs text-emerald-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p>
                  <strong>100% Covered by Colorado Medicaid.</strong> Zero out-of-pocket costs, zero deductions from your child or loved one’s existing medical or therapy benefits.
                </p>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#1b3614] to-[#2f5524] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 text-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F2B632]">Estimated Monthly Compensation</span>
                <div className="text-4xl sm:text-5xl font-black text-white mt-1">
                  ${monthlyEarnings.toLocaleString()}
                  <span className="text-sm font-semibold text-emerald-200">/mo</span>
                </div>
                <p className="text-xs text-emerald-100/90 mt-2 font-medium">
                  Estimated Weekly: <strong>${weeklyEarnings.toLocaleString()}</strong>
                </p>
                <p className="text-xs text-emerald-100/90 font-medium">
                  Annual Support for Your Household: <strong>${annualEarnings.toLocaleString()} / year</strong>
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/20">
                <button
                  onClick={onStartOnboarding}
                  className="w-full bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6b6b] hover:to-[#ffa07a] text-slate-950 font-black text-xs sm:text-sm py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Claim These Hours for Your Family</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-emerald-200/80">
                  Fast 5-minute online intake • No paperwork commitment
                </p>
              </div>
            </div>
          </div>

          {/* Empathy Connection Card with Real Photo */}
          <div className="bg-gradient-to-r from-emerald-50 via-white to-amber-50/60 rounded-3xl border border-emerald-200/80 p-6 sm:p-7 flex flex-col md:flex-row items-center gap-6 shadow-sm">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-md">
              <img
                src="/images/girl-globe.jpg"
                alt="Smiling Colorado girl with special needs holding a toy globe"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#F2B632] flex items-center justify-center shadow-xs">
                <Heart className="w-3.5 h-3.5 fill-amber-900 text-amber-900" />
              </div>
            </div>
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block">
                Keeping Colorado Families Together
              </span>
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                &ldquo;Because every child deserves loving care at home from the people who love them most.&rdquo;
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl font-medium">
                When you are paid as a family caregiver, you gain the financial breathing room to focus on your loved one’s therapies, routines, and happiness—without the crushing fear of lost household income.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. ACT IV: COLORADO PROGRAMS & WAIVERS (Interactive Story Showcase)        */}
      {/* ========================================================================= */}
      <section id="services" className="py-20 sm:py-28 px-4 sm:px-8 bg-gradient-to-b from-[#f8faf7] via-white to-[#f4f7f2] text-slate-900 border-t border-slate-200/80 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#F2B632]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-10 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#2a4e1d]">
              Programs Tailored to Your Loved One
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Our Available Services &amp; Waivers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto pt-1 font-medium">
              We specialize in Colorado Medicaid programs supporting children with special healthcare needs and adults with intellectual and physical disabilities in their home environments.
            </p>
          </div>

          {/* Horizontal Pills Row */}
          <div className="flex items-center justify-start md:justify-center gap-2.5 overflow-x-auto pb-2 scrollbar-none px-1">
            {servicesList.map((service, idx) => {
              const isActive = activeServiceTab === idx;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveServiceTab(idx)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap shadow-xs cursor-pointer ${
                    isActive
                      ? 'bg-[#2a4e1d] text-white shadow-md font-black ring-2 ring-[#2a4e1d]/30'
                      : 'bg-white text-slate-700 border border-slate-200/90 hover:border-[#2a4e1d] hover:text-[#2a4e1d]'
                  }`}
                >
                  {service.pill}
                </button>
              );
            })}
          </div>

          {/* 2-Card Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Main Card: Text on Left, Photo on Right */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-7 p-7 sm:p-9 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full inline-block">
                    {servicesList[activeServiceTab].badge}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                    {servicesList[activeServiceTab].title}
                  </h3>

                  <p className="text-xs sm:text-sm font-bold text-[#2a4e1d] leading-snug">
                    {servicesList[activeServiceTab].headline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {servicesList[activeServiceTab].desc}
                  </p>

                  {/* Special Waiver Grid */}
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

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={onStartOnboarding}
                    className="w-full sm:w-auto bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6b6b] hover:to-[#ffa07a] text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap cursor-pointer"
                  >
                    <span>Become a Family Caregiver</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onStartOnboarding}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-[#2a4e1d] hover:text-[#2a4e1d] transition-colors text-center whitespace-nowrap cursor-pointer"
                  >
                    Free Benefits Check
                  </button>
                </div>
              </div>

              {/* Photo Column */}
              <div className="md:col-span-5 relative h-64 md:h-auto min-h-[300px] overflow-hidden bg-slate-100">
                <img
                  src={servicesList[activeServiceTab].image}
                  alt={servicesList[activeServiceTab].imageAlt}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md text-[#2a4e1d] flex items-center justify-center shadow-md">
                  <Heart className="w-5 h-5 fill-[#2a4e1d]" />
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

            {/* Right Card: Key Highlights */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-xl p-7 sm:p-9 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-xl font-black text-slate-900">What’s Included</h4>
                  <span className="text-[11px] font-bold text-[#2a4e1d] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    Colorado Medicaid
                  </span>
                </div>

                <div className="space-y-4">
                  {servicesList[activeServiceTab].features.map((feature, idx) => {
                    const IconComp = feature.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3.5 group">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2a4e1d] border border-emerald-100/80 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#2a4e1d] group-hover:text-white transition-all">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div className="space-y-0.5">
                          <h5 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-[#2a4e1d] transition-colors leading-snug">
                            {feature.title}
                          </h5>
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
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ACT V: THE 4 GENTLE WELCOME STEPS (From First Call to First Paycheck)   */}
      {/* ========================================================================= */}
      <section id="steps" className="py-20 sm:py-28 px-4 sm:px-8 bg-white border-t border-slate-200/80 relative overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-14 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-[#1b3614] text-xs font-black uppercase tracking-wider">
              <Smile className="w-3.5 h-3.5 text-[#2a4e1d]" />
              <span>Step-by-Step Clarity</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              From Your First Call to Your First Paycheck
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto font-medium">
              We know state paperwork can feel exhausting. That is why our team handles the case manager coordination, waiver verification, and compliance filings for you.
            </p>
          </div>

          {/* 4 Connected Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#fff6ed] to-[#fffaf5] border border-[#ffcfb5] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all text-center space-y-4 group">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ff7e5f] to-[#feb47b] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7 fill-white" />
                </div>
                <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider">
                  Step 01
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 pt-1">Friendly 15-Min Chat</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Call, text, or fill out our short online form. We listen to your family’s story, understand your daily care routine, and answer every question with zero pressure.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#fff6ed] to-[#fffaf5] border border-[#ffcfb5] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all text-center space-y-4 group">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ff7e5f] to-[#feb47b] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider">
                  Step 02
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 pt-1">Case Manager Coordination</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                We connect directly with your regional Case Management Agency (RMHS, Developmental Pathways, Imagine!, or TRE) to finalize the assessment and authorize weekly care hours.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#fff6ed] to-[#fffaf5] border border-[#ffcfb5] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all text-center space-y-4 group">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ff7e5f] to-[#feb47b] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Smartphone className="w-7 h-7 text-white" />
                </div>
                <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider">
                  Step 03
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 pt-1">Simple Digital Onboarding</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Complete quick W-2 paperwork and state CBI screening from your phone or sofa. We download your 1-tap mobile app and pair you with your Registered Nurse.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#fff6ed] to-[#fffaf5] border border-[#ffcfb5] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all text-center space-y-4 group">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ff7e5f] to-[#feb47b] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-7 h-7 text-white" />
                </div>
                <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider">
                  Step 04
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 pt-1">Start Caring &amp; Get Paid</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Clock in with 1 tap at home. Enjoy bi-weekly ADP direct deposit, ongoing RN home check-ins, and the peace of mind of having our whole family backing yours.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onStartOnboarding}
              className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6b6b] hover:to-[#ffa07a] text-slate-950 font-black text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Start Your Family Intake +</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. ACT VI: OUR APPROACH & HUMAN-FIRST TECHNOLOGY                          */}
      {/* ========================================================================= */}
      <section className="w-full bg-white border-y border-slate-200/80 overflow-hidden">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center min-h-[540px]">
          {/* Left Text Column */}
          <div className="lg:col-span-6 xl:col-span-5 px-6 sm:px-12 lg:pl-14 xl:pl-24 py-14 lg:py-20 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-[#2a4e1d] border border-emerald-200/60 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#2a4e1d]" />
              <span>Our Family-First Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Technology Built to Respect Your Time, Not Steal It.
            </h2>

            <p className="text-sm sm:text-base font-bold text-slate-700">
              Why Colorado parents and caregivers choose LiliSare over traditional agencies.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg font-normal">
              Traditional home health agencies treat caregivers like cog-in-the-machine employees, burying them under confusing clipboards and rigid rules. At LiliSare, we know you are doing sacred work. We built our systems to be quiet, intuitive, and supportive—handling the compliance in the background so you can stay fully present with your loved one.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5 border-t border-slate-100 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 font-bold text-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                100% Family Focus
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 font-bold text-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                1-Tap Colorado EVV
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 font-bold text-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Compassionate RN Nurses
              </span>
            </div>
          </div>

          {/* Right Image Column: Mother & Child in Art Studio */}
          <div className="lg:col-span-6 xl:col-span-7 relative h-96 sm:h-[480px] lg:h-full min-h-[460px] lg:min-h-[580px] w-full overflow-hidden bg-slate-100">
            <img
              src="/images/mother-child-art.jpg"
              alt="Loving mother embracing her son with special needs in art studio"
              className="w-full h-full object-cover object-[82%_center] transform hover:scale-105 transition-transform duration-700"
            />
            <div className="hidden lg:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/40 to-transparent pointer-events-none" />

            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/80 max-w-xs space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#2a4e1d] flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-[#2a4e1d]" />
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
      {/* 9. ACT VII: SIGNATURE LILISARE CORAL SUNSET AFFIRMATION                   */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-r from-[#ffa07a] via-[#ff7e5f] to-[#ff5a4e] text-white py-20 sm:py-24 px-4 sm:px-8 overflow-hidden shadow-inner">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#fde047]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-6 -right-6 w-36 h-36 opacity-10 pointer-events-none">
          <Heart className="w-full h-full fill-white" />
        </div>
        <div className="absolute -bottom-6 -left-6 w-36 h-36 opacity-10 pointer-events-none">
          <Heart className="w-full h-full fill-white" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-7 relative z-10">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] drop-shadow-xs">
            At LiliSare, we believe the best caregiver your loved one could ever have is already in the room.
          </h2>

          <p className="text-sm sm:text-lg text-white/95 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-2xs">
            You provide the heartbeat of your home. We make sure you are fairly compensated, clinically protected, and never doing it alone.
          </p>

          <div className="pt-2 flex flex-col items-center justify-center gap-3">
            <button
              onClick={onStartOnboarding}
              className="px-10 py-4 rounded-full bg-[#fef08a] hover:bg-white text-slate-950 font-black text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 inline-flex items-center gap-2.5 group cursor-pointer"
            >
              <span>Become a Paid Family Caregiver</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-slate-950" />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold text-white/90 pt-1">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#fef08a]" />
                <span>Competitive Rates ($28.50 – $32.50/hr)</span>
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>100% Colorado Medicaid Funded</span>
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-white text-white" />
                <span>$0 Out-of-Pocket Family Cost</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. ACT VIII: WEGO COMMUNITY & PEER CONNECTION                            */}
      {/* ========================================================================= */}
      <section id="community" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#253b1b] text-white text-center relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#F2B632]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#F2B632]">
              Caregivers Need Community Too
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Explore Our WeGo Community Events
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 font-normal leading-relaxed">
              Caregiving shouldn’t be an isolating island. LiliSare brings Colorado families together through sensory-friendly outings, equine therapy visits, accessible park days, and peer support groups.
            </p>
          </div>

          {/* 4 Real WeGo Community Photos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg border-2 border-white/20 bg-slate-900">
              <img
                src="/images/wego-park-wheelchair.jpg"
                alt="Young man in wheelchair enjoying outdoor Colorado nature walk with caregiver"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-3.5 text-left">
                <p className="text-xs font-bold text-white">Accessible Park Outings</p>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg border-2 border-white/20 bg-slate-900">
              <img
                src="/images/wego-therapy-pony.jpg"
                alt="Boy in wheelchair joyfully petting a miniature therapy pony"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-3.5 text-left">
                <p className="text-xs font-bold text-white">Equine Therapy &amp; Farm Visits</p>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg border-2 border-white/20 bg-slate-900">
              <img
                src="/images/wego-chuckecheese.jpg"
                alt="Young girl in wheelchair smiling warmly while hugging Chuck E. Cheese character"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-3.5 text-left">
                <p className="text-xs font-bold text-white">Sensory Play &amp; Fun Days</p>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg border-2 border-white/20 bg-slate-900">
              <img
                src="/images/wego-family-friends.jpg"
                alt="Colorado mother and adult daughter with Down syndrome smiling together outdoors"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-3.5 text-left">
                <p className="text-xs font-bold text-white">Caregiver Peer Circles</p>
              </div>
            </div>
          </div>

          {/* Social Links & Community Action */}
          <div className="flex flex-col items-center justify-center gap-4 pt-2">
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
              className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6b6b] hover:to-[#ffa07a] text-slate-950 font-black text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              Join Our Caregiver Community +
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. ACT IX: HONEST, COMPASSIONATE ANSWERS (FAQ)                           */}
      {/* ========================================================================= */}
      <section id="faq" className="py-20 sm:py-28 px-4 sm:px-8 bg-white border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Real Questions &amp; Clear Answers</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto font-medium">
              Everything Colorado families need to know about getting paid as a caregiver, Medicaid waiver qualifications, and state EVV requirements.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 overflow-hidden bg-slate-50 transition-colors shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-black text-slate-900 text-xs sm:text-sm flex items-center justify-between gap-4 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#1b3614] flex items-center justify-center text-xs font-black shrink-0">
                      {idx + 1}
                    </span>
                    <span>{item.q}</span>
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#2a4e1d] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white font-normal">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Need help callout box */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#fef9ee] border border-[#fbe2a6] text-center space-y-2.5">
            <h4 className="text-sm font-black text-slate-900">Have a question unique to your family’s situation?</h4>
            <p className="text-xs text-slate-600">Our family care coordinators are available by call or text to walk you through your exact waiver details.</p>
            <div className="pt-1">
              <a
                href="tel:3035780181"
                className="inline-flex items-center gap-2 text-xs font-black text-[#2a4e1d] hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call or Text Directly: 303-578-0181</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. ACT X: FREE PRACTICAL FAMILY RESOURCES & GUIDES                       */}
      {/* ========================================================================= */}
      <section id="resources" className="py-20 sm:py-28 px-4 sm:px-8 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#1b3614] text-xs font-black uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Free Knowledge Base</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Helpful Guides for Colorado Families &amp; Caregivers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Download free roadmaps, explore Colorado Medicaid waiver breakdowns, and access step-by-step checklists to make family caregiving simple.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Guide 1 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#1b3614] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-slate-900">Colorado Medicaid Waiver Roadmap</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Plain-language breakdown of CES, CHRP, SLS, DD, and EBD waivers with eligibility requirements.
                </p>
              </div>
              <button
                onClick={() => handleResourceDownload('Colorado Medicaid Waiver Roadmap')}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#2a4e1d] hover:text-white text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Guide</span>
              </button>
            </div>

            {/* Guide 2 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCheck className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-slate-900">IHSS Caregiver Onboarding Checklist</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Everything you need for activation: CBI fingerprinting, I-9 verification, and ADP direct deposit setup.
                </p>
              </div>
              <button
                onClick={() => handleResourceDownload('IHSS Caregiver Onboarding Checklist')}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#2a4e1d] hover:text-white text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Checklist</span>
              </button>
            </div>

            {/* Guide 3 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-slate-900">EVV Mobile App User Manual</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Simple photo tutorial on 1-tap clocking in, GPS geofencing, and self-service missed clock-out fixes.
                </p>
              </div>
              <button
                onClick={() => handleResourceDownload('EVV Mobile App User Manual')}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#2a4e1d] hover:text-white text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Manual</span>
              </button>
            </div>

            {/* Guide 4 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-slate-900">County Case Management Directory</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Direct phone numbers and intake contacts for RMHS, Developmental Pathways, Imagine!, and TRE.
                </p>
              </div>
              <button
                onClick={() => handleResourceDownload('County Case Management Directory')}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#2a4e1d] hover:text-white text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Directory</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. ACT XI: WE ARE HERE FOR YOU — HEADQUARTERS & DIRECT CONTACT           */}
      {/* ========================================================================= */}
      <section id="contact" className="py-20 sm:py-28 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#1b3614] text-xs font-black uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              <span>We’re Ready to Help</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Reach Out to Our Colorado Team
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Whether you need to check waiver eligibility, have questions about IHSS hourly wages, or want to start service, our local team is ready to walk with you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Details Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#1b3614] via-[#24461b] to-[#152910] text-white p-7 sm:p-10 rounded-3xl shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-black text-white">LiliSare Colorado Headquarters</h3>
                <p className="text-xs text-emerald-200 mt-1">Mountain Lane &amp; Colorado Home Health</p>
              </div>

              <div className="space-y-4 text-xs text-slate-200">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#F2B632] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">Office Address:</strong>
                    <p>7100 E Belleview Ave, Ste 310</p>
                    <p>Greenwood Village, CO 80111</p>
                    <p className="text-emerald-200/80 mt-1">Castle Rock Location: 3750 Dacoro Ln, Ste 130</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#F2B632] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">Direct Phone &amp; Text:</strong>
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
                    <strong className="text-white block font-bold">State Licensing:</strong>
                    <p>Colorado Department of Public Health and Environment (CDPHE)</p>
                    <p className="text-emerald-200/80">Class A &amp; Class B Home Care Agency</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/15">
                <button
                  onClick={onStartOnboarding}
                  className="w-full bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-950 font-black text-xs py-3.5 rounded-xl shadow-md hover:brightness-105 transition-all cursor-pointer"
                >
                  Start Patient &amp; Caregiver Onboarding
                </button>
              </div>
            </div>

            {/* Direct Inquiry Form */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200/90 p-7 sm:p-10 rounded-3xl shadow-sm space-y-5">
              <h3 className="text-lg font-black text-slate-900">Send a Note to Our Care Team</h3>
              <p className="text-xs text-slate-500">We respond to every message within 2 to 4 business hours.</p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maria Gonzalez"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-[#2a4e1d] focus:outline-none"
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
                      className="w-full text-xs px-4 py-3 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-[#2a4e1d] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="maria@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-[#2a4e1d] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Who do you care for?</label>
                    <select
                      value={contactRelation}
                      onChange={(e) => setContactRelation(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-[#2a4e1d] focus:outline-none text-slate-700"
                    >
                      <option value="My Child (Minor or Adult)">My Child (Minor or Adult)</option>
                      <option value="My Parent / Grandparent">My Parent / Grandparent</option>
                      <option value="My Spouse">My Spouse</option>
                      <option value="A Sibling or Family Friend">A Sibling or Family Friend</option>
                      <option value="I am seeking care for myself">I am seeking care for myself</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Colorado County</label>
                    <select
                      value={contactCounty}
                      onChange={(e) => setContactCounty(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-[#2a4e1d] focus:outline-none text-slate-700"
                    >
                      <option value="Denver County">Denver County</option>
                      <option value="Arapahoe County">Arapahoe County</option>
                      <option value="Jefferson County">Jefferson County</option>
                      <option value="Adams County">Adams County</option>
                      <option value="Douglas County">Douglas County</option>
                      <option value="El Paso County">El Paso County</option>
                      <option value="Boulder / Larimer">Boulder / Larimer County</option>
                      <option value="Mountain Communities (Summit/Eagle)">Mountain Communities (Summit/Eagle)</option>
                      <option value="Other Colorado County">Other Colorado County</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">How can we help your family?</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your loved one’s care needs, questions about IHSS hours, or which Medicaid waiver you currently have..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-[#2a4e1d] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#2a4e1d] hover:bg-[#1b3614] text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message to Care Coordinator'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 14. DIGNIFIED BRAND FOOTER (Modern, Clean & Authentic)                     */}
      {/* ========================================================================= */}
      <footer className="bg-[#1b3614] text-white py-16 px-4 sm:px-8 border-t border-emerald-950 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#F2B632]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-start pb-10 border-b border-white/20">
            {/* Column 1: Brand & Purpose */}
            <div className="md:col-span-4 space-y-4">
              <img
                src="/images/lilisare-logo.png"
                alt="LiliSare because we care"
                className="h-11 w-auto object-contain brightness-0 invert"
              />
              <p className="text-xs sm:text-sm font-semibold text-emerald-100 leading-snug">
                Empowering Colorado family caregivers with dignity, fair compensation, and clinical partnership.
              </p>
              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-white text-[#1b3614] hover:bg-[#F2B632] hover:text-slate-950 flex items-center justify-center transition-all shadow-sm"
                >
                  <Facebook className="w-4 h-4 fill-current" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white text-[#1b3614] hover:bg-[#F2B632] hover:text-slate-950 flex items-center justify-center transition-all shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Direct Contact */}
            <div className="md:col-span-4 space-y-4 text-xs text-emerald-100">
              <div>
                <h4 className="font-extrabold text-white text-sm">Colorado Headquarters</h4>
                <p className="mt-0.5 text-slate-200">7100 E Belleview Ave, Ste 310, Greenwood Village, CO 80111</p>
                <p className="text-slate-200">3750 Dacoro Lane, Suite 130, Castle Rock, CO 80109</p>
              </div>

              <div>
                <h4 className="font-extrabold text-white text-sm">Call or Text:</h4>
                <p className="mt-0.5">
                  Phone: <a href="tel:3035780181" className="text-white hover:text-[#F2B632] font-black underline">303-578-0181</a>
                </p>
              </div>

              <div>
                <h4 className="font-extrabold text-white text-sm">Email:</h4>
                <p className="mt-0.5">
                  <a href="mailto:info@lilisare.com" className="text-white hover:text-[#F2B632] underline font-medium">info@lilisare.com</a>
                </p>
              </div>
            </div>

            {/* Column 3: Quick Navigation */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs font-bold text-white">
              <div className="space-y-3">
                <p><a href="#home" className="hover:text-[#F2B632] transition-colors">Home</a></p>
                <p><a href="#our-story" className="hover:text-[#F2B632] transition-colors">Our Story</a></p>
                <p><a href="#calculator" className="hover:text-[#F2B632] transition-colors">Earnings Calculator</a></p>
                <p><a href="#services" className="hover:text-[#F2B632] transition-colors">Services &amp; Waivers</a></p>
              </div>
              <div className="space-y-3">
                <p><a href="#steps" className="hover:text-[#F2B632] transition-colors">4 Simple Steps</a></p>
                <p><a href="#community" className="hover:text-[#F2B632] transition-colors">WeGo Community</a></p>
                <p><a href="#faq" className="hover:text-[#F2B632] transition-colors">FAQ</a></p>
                <p><a href="#contact" className="hover:text-[#F2B632] transition-colors">Contact Us</a></p>
              </div>
            </div>
          </div>

          {/* Legal Compliance & Copyright */}
          <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-emerald-200/90">
            <p className="text-slate-300 text-center md:text-left">
              &copy; {new Date().getFullYear()} LiliSare Home Health &amp; Mountain Lane. State of Colorado CDPHE Licensed Class A &amp; B Agency.
            </p>
            <div className="flex items-center gap-4 text-slate-300">
              <a href="#" className="hover:text-white underline">Privacy Notice</a>
              <span>•</span>
              <a href="#" className="hover:text-white underline">Non-Discrimination Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white underline">HIPAA Notice</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
