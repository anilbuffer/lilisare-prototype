'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import {
  Users,
  Search,
  Filter,
  Plus,
  ShieldCheck,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  HeartHandshake,
  FileText,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export default function ClientsPage() {
  const { clients, notify } = usePortal();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('all');

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseManager.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = filterProgram === 'all' || c.program === filterProgram;
    return matchesSearch && matchesProgram;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Active Clients Directory
            </h1>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200">
              487 Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Active patient roster across Mountain Lane &amp; Colorado Home Health branches
          </p>
        </div>

        <button
          onClick={() => notify('Add Client', 'Opening patient enrollment intake form.', 'info')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white text-xs font-bold shadow-[0_3px_12px_rgba(255,107,74,0.3)] hover:shadow-[0_4px_18px_rgba(255,107,74,0.4)] transition-all cursor-pointer self-start sm:self-auto active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>New Client Intake</span>
        </button>
      </div>

      {/* KPI Stats Quick Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Total Clients</p>
          <p className="text-2xl font-black text-slate-900 mt-1">487</p>
          <span className="text-[10px] font-semibold text-emerald-600">+12 this month</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">IHSS Care</p>
          <p className="text-2xl font-black text-[#3e6b2b] mt-1">312</p>
          <span className="text-[10px] text-slate-400">Family caregivers</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Pending Auths</p>
          <p className="text-2xl font-black text-[#ff6900] mt-1">23</p>
          <span className="text-[10px] font-semibold text-rose-600">4 overdue state review</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Weekly Hours</p>
          <p className="text-2xl font-black text-slate-900 mt-1">11,420</p>
          <span className="text-[10px] text-slate-400">98.2% EVV matched</span>
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
            placeholder="Search clients by name, ID, or case manager..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e6b2b]/20 focus:border-[#3e6b2b]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="all">All Service Programs</option>
            <option value="IHSS Waiver">IHSS Waiver</option>
            <option value="Colorado HCBS-EBD">Colorado HCBS-EBD</option>
            <option value="HCBS-CES Waiver">HCBS-CES Waiver</option>
            <option value="CFC Medicaid Program">CFC Medicaid Program</option>
          </select>
        </div>
      </div>

      {/* Clients Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => {
          const totalHours = client.authorizedServices.reduce((sum, s) => sum + s.authorizedHoursWeekly, 0);
          return (
            <div
              key={client.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{client.fullName}</h3>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{client.id} • {client.city}, {client.state}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#3e6b2b] border border-emerald-200">
                  {client.clinicalStatus}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-[11px] text-slate-400">Responsible Party:</span>
                  <span className="font-semibold text-slate-800">{client.responsiblePartyName} ({client.responsiblePartyRelationship})</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-[11px] text-slate-400">Authorized Hours:</span>
                  <span className="font-bold text-slate-900">{totalHours} hrs / week</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-[11px] text-slate-400">Medicaid ID:</span>
                  <span className="font-mono text-slate-700">{client.medicaidNumber}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-[11px] text-slate-400">Program:</span>
                  <span className="font-medium text-slate-700 truncate">{client.program}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">CMA: <strong className="text-slate-700">{client.caseManager.name}</strong></span>
                <button
                  onClick={() => notify('Client Profile', `Viewing file for ${client.fullName}`, 'info')}
                  className="font-bold text-[#3e6b2b] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View Details</span>
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
