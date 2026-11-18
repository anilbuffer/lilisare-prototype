'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import {
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  User,
  Building2,
  FileText,
  AlertCircle,
  Inbox,
} from 'lucide-react';

export default function CMEmailsPage() {
  const { notify } = usePortal();
  const [selectedThreadId, setSelectedThreadId] = useState('cm-1');
  const [replyText, setReplyText] = useState('');
  const [repliedIds, setRepliedIds] = useState<string[]>([]);

  const threads = [
    {
      id: 'cm-1',
      sender: 'Dana Whitfield',
      agency: 'Jefferson County CMA',
      client: 'Marisol Vega',
      subject: 'PAR Renewal Request — 14 Days Overdue Follow-up',
      date: 'Today, 08:45 AM',
      unread: true,
      body: 'Hello Lisa, I am following up on the PAR revision for Marisol Vega. We received the updated physician order from Dr. Reynolds, but need verification on the additional 4 respite hours requested under IHSS.',
      suggestedReply: 'Hi Dana, thank you for reaching out. Attached is the amended care plan detailing the clinical necessity for the 4 additional respite hours per Dr. Reynolds’ orders. Let us know if you need anything else to issue the PAR approval.',
    },
    {
      id: 'cm-2',
      sender: 'Dana Whitfield',
      agency: 'Jefferson County CMA',
      client: 'Harper Nguyen',
      subject: 'Annual Supervisory Assessment Documentation',
      date: 'Yesterday, 03:20 PM',
      unread: true,
      body: 'Hi team, checking if RN Sarah Jenkins has completed the in-person 60-day HMA supervisory evaluation for Harper Nguyen. Please transmit the signed state audit sheet.',
      suggestedReply: 'Hi Dana, Sarah Jenkins completed the evaluation on Nov 14th with full compliance. The signed HMA supervisory audit sheet has been uploaded to the state vault and attached herein.',
    },
    {
      id: 'cm-3',
      sender: 'Priya Shah',
      agency: 'Denver Health CMA',
      client: 'Desmond Clarke',
      subject: 'Pending Authorization Approval Notice',
      date: 'Yesterday, 11:10 AM',
      unread: false,
      body: 'Good morning, Desmond Clarke’s Medicaid recertification packet has been submitted to Health First Colorado. Expected turnaround is 48 hours.',
      suggestedReply: 'Thank you Priya. We have Desmond queued on temporary schedule continuity so care is not disrupted.',
    },
    {
      id: 'cm-4',
      sender: 'Marcus Brody',
      agency: 'Arapahoe / Douglas CMA',
      client: 'Mateo Morales',
      subject: 'Transition to Adult Waiver Support',
      date: 'Nov 15, 2026',
      unread: false,
      body: 'Please ensure Elena Morales has completed the authorized representative designation form for the upcoming waiver transition.',
      suggestedReply: 'Elena has completed the digital packet via LiliSphere portal. All signed documents are verified in the household binder.',
    },
  ];

  const currentThread = threads.find((t) => t.id === selectedThreadId) || threads[0];

  const handleSendReply = () => {
    setRepliedIds((prev) => [...prev, currentThread.id]);
    notify('Email Dispatched', `Reply sent to ${currentThread.sender} (${currentThread.agency}).`, 'success');
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Case Agency &amp; Manager Communications (CA Emails)
            </h1>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              7 Active Inquiries
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Centralized email &amp; PAR messaging hub with Case Management Agencies across Colorado
          </p>
        </div>

        <button
          onClick={() => notify('Compose Notice', 'Opening new CMA communication composer.', 'info')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white text-xs font-bold shadow-[0_3px_12px_rgba(255,107,74,0.3)] hover:shadow-[0_4px_18px_rgba(255,107,74,0.4)] transition-all cursor-pointer self-start sm:self-auto active:scale-[0.98]"
        >
          <Mail className="w-4 h-4" />
          <span>Compose New Message</span>
        </button>
      </div>

      {/* Two-Column Mail Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Message Threads List */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <span className="text-xs font-bold text-slate-700">Inbox (7 CM Messages)</span>
            <span className="text-[10px] text-slate-400 font-medium">All CMA Districts</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {threads.map((t) => {
              const isSelected = t.id === currentThread.id;
              const isReplied = repliedIds.includes(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedThreadId(t.id)}
                  className={`w-full text-left p-4 transition-all cursor-pointer flex flex-col gap-1.5 ${
                    isSelected ? 'bg-emerald-50/50 border-l-4 border-l-[#3e6b2b]' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{t.sender}</span>
                    <span className="text-[10px] text-slate-400">{t.date}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 truncate">{t.subject}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{t.body}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                      {t.client}
                    </span>
                    <span className="text-[9px] text-slate-400">{t.agency}</span>
                    {isReplied && (
                      <span className="text-[9px] font-bold text-emerald-600 ml-auto flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Replied
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Thread Detail & AI Reply Composer */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-4">
          <div className="pb-4 border-b border-slate-100">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">{currentThread.subject}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  From: <strong className="text-slate-800">{currentThread.sender}</strong> ({currentThread.agency}) • For Client: <strong className="text-[#3e6b2b]">{currentThread.client}</strong>
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 shrink-0">{currentThread.date}</span>
            </div>
          </div>

          {/* Original Message Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-800 leading-relaxed">
            {currentThread.body}
          </div>

          {/* AI Recommended Response Box */}
          <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F2B632]" />
                <span>AI Recommended Response (Audit &amp; State Compliant)</span>
              </span>
              <button
                onClick={() => setReplyText(currentThread.suggestedReply)}
                className="text-[11px] font-bold text-[#3e6b2b] hover:underline cursor-pointer"
              >
                Insert Draft
              </button>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed italic">
              "{currentThread.suggestedReply}"
            </p>
          </div>

          {/* Composer Input */}
          <div className="space-y-3 pt-2">
            <textarea
              rows={4}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type response to Case Manager or click 'Insert Draft' above..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e6b2b]/20 focus:border-[#3e6b2b]"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Attaches encrypted HIPAA-compliant transmission header</span>
              <button
                onClick={handleSendReply}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white text-xs font-bold shadow-[0_3px_12px_rgba(255,107,74,0.3)] hover:shadow-[0_4px_18px_rgba(255,107,74,0.4)] transition-all cursor-pointer active:scale-[0.98]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Response</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
