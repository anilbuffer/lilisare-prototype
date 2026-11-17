'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import {
  HeartHandshake,
  Search,
  Filter,
  Plus,
  ShieldCheck,
  Award,
  Clock,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export default function CaregiversPage() {
  const { caregivers, notify } = usePortal();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');

  const filteredCaregivers = caregivers.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.linkedClientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === 'all' || c.classification === filterClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Active Caregivers Roster
            </h1>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200">
              902 Roster
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            38 currently in onboarding pipeline • 98% under 40 hours limit
          </p>
        </div>

        <button
          onClick={() => notify('Invite Caregiver', 'Opening caregiver invitation link generator.', 'info')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white text-xs font-bold shadow-[0_3px_12px_rgba(255,107,74,0.3)] hover:shadow-[0_4px_18px_rgba(255,107,74,0.4)] transition-all cursor-pointer self-start sm:self-auto active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Invite Caregiver</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Active Staff</p>
          <p className="text-2xl font-black text-slate-900 mt-1">902</p>
          <span className="text-[10px] font-semibold text-emerald-600">38 in onboarding</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Family Caregivers</p>
          <p className="text-2xl font-black text-[#3e6b2b] mt-1">714</p>
          <span className="text-[10px] text-slate-400">79% of total workforce</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Expiring Certs</p>
          <p className="text-2xl font-black text-[#ff6900] mt-1">41</p>
          <span className="text-[10px] font-semibold text-rose-600">8 expired urgently</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Avg Rating</p>
          <p className="text-2xl font-black text-slate-900 mt-1">4.9 / 5.0</p>
          <span className="text-[10px] text-slate-400">Based on family surveys</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search caregivers by name, ID, or patient..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e6b2b]/20 focus:border-[#3e6b2b]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="all">All Classifications</option>
            <option value="Employee (W-2)">Employee (W-2)</option>
            <option value="Independent Contractor (1099)">Independent Contractor (1099)</option>
            <option value="Dual (Employee + Contractor)">Dual (Employee + Contractor)</option>
          </select>
        </div>
      </div>

      {/* Caregivers Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCaregivers.map((cg) => {
          const isActive = cg.onboardingStage === 'Active & Activated';
          return (
            <div
              key={cg.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200 font-black text-xs flex items-center justify-center shrink-0">
                    {cg.fullName.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{cg.fullName}</h3>
                    <p className="text-[11px] text-slate-400 font-mono">{cg.classification} • {cg.id}</p>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive
                      ? 'bg-emerald-50 text-[#3e6b2b] border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {isActive ? 'Active' : 'Onboarding'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-[11px] text-slate-400">Linked Client:</span>
                  <span className="font-semibold text-slate-800">{cg.linkedClientName}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-[11px] text-slate-400">Onboarding Progress:</span>
                  <span className="font-bold text-[#3e6b2b]">{cg.onboardingProgress}%</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-[11px] text-slate-400">Documents Verified:</span>
                  <span className="font-mono text-slate-700">{cg.documents.filter((d) => d.status === 'Verified').length} / {cg.documents.length}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{cg.phone}</span>
                <button
                  onClick={() => notify('Caregiver Profile', `Viewing employee file for ${cg.fullName}`, 'info')}
                  className="font-bold text-[#3e6b2b] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View File</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
