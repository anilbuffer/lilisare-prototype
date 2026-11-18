'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePortal } from '@/lib/store/portal-context';
import { UserRole } from '@/lib/types';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building2,
  Stethoscope,
  HeartHandshake,
  Users,
  Sparkles,
  Globe2,
  Activity,
  Layers,
  Heart,
  Baby,
  CheckCircle2,
  Award,
} from 'lucide-react';

export function LoginPage() {
  const router = useRouter();
  const { setActiveView, switchRole, notify } = usePortal();

  // Role selector state: default 'admin'
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');

  const roleAccounts: Record<UserRole, { name: string; title: string; email: string; desc: string }> = {
    admin: {
      name: 'Sarah Jenkins',
      title: 'Executive Admin',
      email: 'sarah.jenkins@lilisare.health',
      desc: 'Full agency operations across Mountain Lane & Colorado Home Health',
    },
    onboarding: {
      name: 'Danielle Brooks',
      title: 'Onboarding Lead',
      email: 'danielle.brooks@lilisare.health',
      desc: 'Caregiver intake pipeline, 15/20 packets, CBI checks, ADP provisioning',
    },
    enrollment: {
      name: 'Maya Ramirez',
      title: 'Enrollment Specialist',
      email: 'maya.ramirez@lilisare.health',
      desc: 'Client inquiry pipeline, CMA directory, case manager correspondence',
    },
    clinical: {
      name: 'Rebecca Stern, BSN, RN',
      title: 'Clinical Supervisor',
      email: 'rebecca.stern@lilisare.health',
      desc: '60-day in-home nurse evaluations, Form 485, AI care note audits',
    },
    compliance: {
      name: 'Marcus Vance',
      title: 'Compliance Officer',
      email: 'marcus.vance@lilisare.health',
      desc: 'Credential lifecycles, 30/7-day renewal alerts, 7-year audit vault',
    },
    billing: {
      name: 'Alicia Torres',
      title: 'Medicaid Billing Specialist',
      email: 'alicia.torres@lilisare.health',
      desc: 'Dual-NPI claims routing, 837P batch engine, commercial denial letters',
    },
    caregiver: {
      name: 'Elena Morales',
      title: 'Family Caregiver',
      email: 'elena.morales@coloradomail.net',
      desc: 'GPS-verified EVV shift clock in/out, time self-correction, AI notes',
    },
  };

  // Autofilled credentials per role
  const [email, setEmail] = useState(roleAccounts.admin.email);
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Switch role and update autofilled credentials
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(roleAccounts[role].email);
    setPassword('password123');
  };

  // Sign In submit handler
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      switchRole(selectedRole);
      setActiveView('portal');
      router.push('/admin-portal/dashboard');
      notify(
        'Signed In Successfully',
        `Welcome to LiliSphere! Authenticated as ${roleAccounts[selectedRole].name} (${roleAccounts[selectedRole].title}).`,
        'success'
      );
    }, 300);
  };

  const getPortalTitle = () => {
    return `${roleAccounts[selectedRole].title} Console`;
  };

  return (
    <div className="flex min-h-screen w-full bg-white select-none">
      {/* LEFT 50%: Clean, Heavy-Text-Free Luminous Forest Gradient Pane */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#689f45] via-[#4d7d33] to-[#2f511e] text-white p-10 xl:p-16 flex-col justify-between relative overflow-hidden border-r border-[#264418]">
        {/* Ambient Branded Watermark Emblem (Top-Aligned) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center items-start overflow-hidden select-none">
          <img
            src="/images/lilisare-watermark.png"
            alt=""
            className="w-[620px] max-w-none opacity-10 select-none pointer-events-none transform -translate-y-8"
          />
        </div>

        {/* Subtle Ambient Glow Effects */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 bg-[#7bdcb5]/25 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />


        {/* Center: Brand Mark & Title (Clean, Minimal, Heavy-Text-Free) */}
        <div className="relative z-10 my-auto py-10 max-w-xl">
          <div className="flex items-center gap-4">
            <div className="h-16 lg:h-20 rounded-2xl bg-white p-3 px-4 flex items-center justify-center shadow-2xl border border-white/30 shrink-0">
              <img
                src="/images/lilisare-logo.png"
                alt="LiliSare - because we care"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="h-14 w-[1.5px] bg-white/25" />
            <div>
              <h1 className="text-2xl xl:text-3xl font-black text-white tracking-tight leading-tight">
                Healthcare Ecosystem
              </h1>
              <p className="text-xs text-emerald-100/90 font-medium mt-1">
                Colorado Mountain Lane &amp; CHH
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer Info */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-emerald-100/80">
          <span>Enterprise Secure Gateway • SSL 256-bit Encrypted</span>
          <span>LiliSare Colorado • CDPHE #03M812</span>
        </div>
      </div>

      {/* RIGHT 50%: Modern Clean Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-5 sm:p-10 lg:p-16 bg-white overflow-y-auto">
        <div className="w-full max-w-md space-y-5 sm:space-y-6">
          {/* Mobile Brand Logo Header (Visible on screens < lg) */}
          <div className="lg:hidden flex items-center justify-center pt-2 pb-1">
            <div className="inline-flex items-center gap-2.5 bg-white p-2 px-4 rounded-2xl shadow-sm border border-slate-200/90">
              <img
                src="/images/lilisare-logo.png"
                alt="LiliSare"
                className="h-8 w-auto object-contain"
              />
            </div>
          </div>

          {/* Header */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Sign in to LiliSphere
            </h2>
          </div>

          {/* Role Persona Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Persona to Simulate
              </label>
              <span className="text-[10px] font-bold text-[#3e6b2b] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                7 Roles Configured
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200/70 shadow-inner">
              {[
                { id: 'admin' as UserRole, label: 'Admin', icon: Building2 },
                { id: 'onboarding' as UserRole, label: 'Onboard', icon: Award },
                { id: 'enrollment' as UserRole, label: 'Intake', icon: Users },
                { id: 'clinical' as UserRole, label: 'Clinical', icon: Stethoscope },
                { id: 'compliance' as UserRole, label: 'Comply', icon: ShieldCheck },
                { id: 'billing' as UserRole, label: 'Billing', icon: Activity },
                { id: 'caregiver' as UserRole, label: 'Caregiver', icon: HeartHandshake },
              ].map((item) => {
                const IconComponent = item.icon;
                const isSelected = selectedRole === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleRoleSelect(item.id)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center cursor-pointer flex flex-col items-center gap-1 ${
                      isSelected
                        ? 'bg-white text-slate-900 shadow-xs ring-1 ring-[#3e6b2b]/30'
                        : 'text-slate-500 hover:text-slate-900 font-medium'
                    }`}
                  >
                    <IconComponent
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-[#3e6b2b]' : 'text-slate-400'
                      }`}
                    />
                    <span className="text-[10px] leading-none truncate w-full">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Persona Callout Card */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-100/80 text-[#3e6b2b] shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-900 leading-tight">
                  {roleAccounts[selectedRole].name}{' '}
                  <span className="font-normal text-slate-500">
                    ({roleAccounts[selectedRole].title})
                  </span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {roleAccounts[selectedRole].desc}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Registered Account Email
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@lilisare.health"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e6b2b]/20 focus:border-[#3e6b2b] shadow-2xs transition-all font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    notify('Password Recovery', 'A secure reset link has been dispatched to your authorized email address.', 'info');
                  }}
                  className="text-xs font-semibold text-[#3e6b2b] hover:underline cursor-pointer"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e6b2b]/20 focus:border-[#3e6b2b] shadow-2xs transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Autofill Demo Notice */}
            <div className="p-2.5 bg-emerald-50/70 rounded-xl border border-emerald-200/60 flex items-center justify-between text-[11px] text-[#3e6b2b]">
              <span className="flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d084]" />
                Demo Credentials Autofilled
              </span>
              <span className="text-[10px] font-bold text-emerald-800">
                {selectedRole.toUpperCase()} • Mountain Lane
              </span>
            </div>

            {/* Submit Button (Matching Home Page Signature CTA Gradient & Shadow) */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white font-bold text-xs sm:text-sm shadow-[0_4px_14px_rgba(255,107,74,0.35)] hover:shadow-[0_6px_20px_rgba(255,107,74,0.45)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] disabled:opacity-70"
            >
              <span>Sign In to {getPortalTitle()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Registration Navigation Section */}
          <div className="pt-3 border-t border-slate-100 space-y-3 text-center">
            <p className="text-xs text-slate-500 font-medium">
              New to LiliSare Healthcare &amp; Support Services?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Link
                href="/registration/patient"
                className="w-full py-2.5 px-3.5 rounded-xl bg-white hover:bg-[#3e6b2b]/5 border border-slate-200/90 hover:border-[#3e6b2b]/30 text-xs text-slate-800 hover:text-[#3e6b2b] font-bold shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98] group"
              >
                <span>Patient Registration</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#3e6b2b] group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/registration/caregiver"
                className="w-full py-2.5 px-3.5 rounded-xl bg-white hover:bg-[#3e6b2b]/5 border border-slate-200/90 hover:border-[#3e6b2b]/30 text-xs text-slate-800 hover:text-[#3e6b2b] font-bold shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98] group"
              >
                <span>Caregiver Application</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#3e6b2b] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-2">
            <p className="text-[11px] text-slate-400">
              Powered by <strong className="text-slate-600 font-bold">LiliSphere</strong> • Global Home-Based Healthcare System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
