'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  Bell,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  FileText,
  HeartHandshake,
  ShieldCheck,
  Radio,
  LayoutDashboard,
  Compass,
  MapPin,
  Columns2,
  Users,
  Pill,
  TrendingUp,
} from 'lucide-react';
import { GLOBAL_SEARCH_ITEMS, SearchItem } from './dashboard-data';
import { usePortal } from '@/lib/store/portal-context';

interface TopUtilityBarProps {
  title?: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
  onSelectSearchItem?: (item: SearchItem) => void;
  onOpenNotificationsModal?: () => void;
  onOpenProfileModal?: (tab?: string) => void;
  onOpenAIBriefing?: () => void;
  onTrackCaregivers?: () => void;
}

export function TopUtilityBar({
  title = 'Dashboard',
  subtitle,
  actionButton,
  onSelectSearchItem,
  onOpenNotificationsModal,
  onOpenProfileModal,
  onOpenAIBriefing,
  onTrackCaregivers,
}: TopUtilityBarProps) {
  const router = useRouter();
  const { setActiveView, notify, toggleSidebar } = usePortal();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const modalInputRef = useRef<HTMLInputElement>(null);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(4);
  const [readIds, setReadIds] = useState<string[]>([]);
  const notifContainerRef = useRef<HTMLDivElement>(null);

  const filteredResults = GLOBAL_SEARCH_ITEMS.filter((item) => {
    if (selectedCategory) {
      if (selectedCategory === 'Patients' && item.type !== 'client') return false;
      if (selectedCategory === 'Medications' && item.type !== 'medication') return false;
      if (selectedCategory === 'Chronology' && item.type !== 'chronology') return false;
      if (selectedCategory === 'Compliance' && item.type !== 'compliance') return false;
      if (selectedCategory === 'Caregivers' && item.type !== 'caregiver') return false;
      if (selectedCategory === 'Assessments' && item.type !== 'assessment') return false;
    }

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q) ||
      item.meta.toLowerCase().includes(q)
    );
  }).slice(0, 8);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        modalInputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === '/' && !(document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsNotificationsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifContainerRef.current && !notifContainerRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredResults.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelectItem(filteredResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  const handleSelectItem = (item: SearchItem) => {
    if (onSelectSearchItem) {
      onSelectSearchItem(item);
    } else {
      if (item.type === 'client') {
        router.push('/admin-portal/client-intake');
      } else if (item.type === 'caregiver') {
        router.push('/admin-portal/caregiver-intake');
      } else {
        router.push('/admin-portal/dashboard');
      }
    }
    setIsSearchOpen(false);
    setSearchQuery('');
    setSelectedCategory(null);
  };

  const notifications = [
    {
      id: 'notif-1',
      title: 'Screening result flagged for internal review',
      detail: '3 CBI checks require administrative evaluation before scheduling.',
      time: '10m ago',
      urgent: true,
      category: 'Compliance',
    },
    {
      id: 'notif-2',
      title: 'Prior Authorizations Overdue',
      detail: '4 PARs have passed the 10-day Colorado state HCPF SLA deadline.',
      time: '45m ago',
      urgent: true,
      category: 'Authorizations',
    },
    {
      id: 'notif-3',
      title: 'EVV Visit Exceptions at Risk',
      detail: '14 shifts require time reconciliation or GPS geofence clarification.',
      time: '2h ago',
      urgent: false,
      category: 'EVV Hub',
    },
    {
      id: 'notif-4',
      title: '6 Caregivers Working Unapproved',
      detail: 'Payment authorization expired or pending CM sign-off.',
      time: '3h ago',
      urgent: true,
      category: 'Billing',
    },
  ];

  return (
    <>
      {/* Top Edge Separate Common Header */}
      <header className="bg-[#f4f7f6] border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 z-30 transition-all">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Circular Sidebar Toggle Button + Page Title */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleSidebar}
              className="w-7 h-7 rounded-full bg-[#3e6b2b] hover:bg-[#345b24] text-white flex items-center justify-center shadow-xs transition-transform active:scale-95 cursor-pointer shrink-0"
              title="Toggle Sidebar"
            >
              <Columns2 className="w-3.5 h-3.5 text-white" />
            </button>
            <h1 className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight">
              {title}
            </h1>
          </div>

          {/* Right: Pill Search Bar Trigger & Circular Notification Bell */}
          <div className="flex items-center gap-2.5 flex-1 justify-end max-w-xl">
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen(true);
                setSearchQuery('');
              }}
              className="relative flex-1 max-w-xs sm:max-w-lg bg-white border border-slate-200/90 rounded-full py-1.5 sm:py-2 pl-4 pr-3 flex items-center justify-between shadow-2xs hover:border-[#3e6b2b]/40 hover:shadow-xs transition-all cursor-pointer group text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#3e6b2b] transition-colors shrink-0" />
                <span className="text-xs text-slate-400 font-medium truncate">
                  Search notes, staff, clients...
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200/80 hidden sm:inline-flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#3e6b2b]" />
                  GLOBAL
                </span>
                <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-50 border border-slate-200 rounded-md shadow-2xs font-semibold">
                  ⌘K
                </kbd>
              </div>
            </button>

            {/* Notification Bell (Circular Pill with Red Dot Badge) */}
            <div className="relative" ref={notifContainerRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                aria-label="Notifications"
                className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all cursor-pointer relative active:scale-95"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-98 duration-150">
                  <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                    <span className="text-xs font-bold text-slate-900">Notifications</span>
                    <button
                      onClick={() => {
                        setReadIds(notifications.map((n) => n.id));
                        setUnreadCount(0);
                      }}
                      className="text-[11px] font-semibold text-[#3e6b2b] hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          if (!readIds.includes(n.id)) {
                            setReadIds((prev) => [...prev, n.id]);
                            setUnreadCount((prev) => Math.max(0, prev - 1));
                          }
                        }}
                        className="p-3.5 hover:bg-slate-50 cursor-pointer text-xs space-y-1 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-800">{n.title}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">{n.detail}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-2.5 border-t border-slate-100 bg-slate-50 text-center">
                    <button
                      onClick={() => {
                        setIsNotificationsOpen(false);
                        if (onOpenNotificationsModal) onOpenNotificationsModal();
                      }}
                      className="text-xs font-semibold text-[#3e6b2b] hover:underline cursor-pointer"
                    >
                      View all notifications &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Action Button Slot (e.g. Add inquiry / + Add caregiver) */}
            {actionButton && (
              <div className="shrink-0">
                {actionButton}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Command Center Search Modal (Exact Match to Attached Reference Screenshot) */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Input Row */}
            <div className="flex items-center px-4 py-3.5 gap-3 border-b border-slate-100">
              <Search className="w-5 h-5 text-[#3e6b2b] shrink-0" />
              <input
                ref={modalInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search care plans, patients, vitals, caregivers, compliance docs, caregiver notes across..."
                className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
                autoFocus
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    modalInputRef.current?.focus();
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                  title="Close search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Categories Section (Colored Chips matching Attached Reference) */}
            <div className="px-4 pt-3.5 pb-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                CATEGORIES
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Patients', icon: Users, color: 'bg-sky-50 text-sky-700 border-sky-200/80 hover:bg-sky-100' },
                  { label: 'Medications', icon: Pill, color: 'bg-purple-50 text-purple-700 border-purple-200/80 hover:bg-purple-100' },
                  { label: 'Chronology', icon: Clock, color: 'bg-amber-50 text-amber-700 border-amber-200/80 hover:bg-amber-100' },
                  { label: 'Compliance', icon: ShieldCheck, color: 'bg-emerald-50 text-[#3e6b2b] border-emerald-200/80 hover:bg-emerald-100' },
                  { label: 'Caregivers', icon: HeartHandshake, color: 'bg-teal-50 text-teal-700 border-teal-200/80 hover:bg-teal-100' },
                  { label: 'Assessments', icon: FileText, color: 'bg-indigo-50 text-indigo-700 border-indigo-200/80 hover:bg-indigo-100' },
                ].map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.label;
                  return (
                    <button
                      key={cat.label}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(isSelected ? null : cat.label);
                        setSelectedIndex(0);
                        modalInputRef.current?.focus();
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${isSelected
                        ? 'bg-[#3e6b2b] text-white border-[#3e6b2b] shadow-xs'
                        : cat.color
                        }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Try Searching Section (Suggestion Pills matching Attached Reference) */}
            <div className="px-4 pt-1.5 pb-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                <span>TRY SEARCHING</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Lisinopril', 'Sarah Jenkins', 'fall risk', 'I-9 Form'].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setSelectedCategory(null);
                      setSelectedIndex(0);
                      modalInputRef.current?.focus();
                    }}
                    className="px-3 py-1 rounded-full text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Results List */}
            <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 border-t border-slate-100">
              {filteredResults.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs font-medium">
                  No matching records found across care plans, patients or docs.
                </div>
              ) : (
                filteredResults.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between p-3 px-4 text-left transition-all cursor-pointer ${isSelected
                        ? 'bg-[#3e6b2b]/10 text-slate-900 font-bold'
                        : 'hover:bg-slate-50 text-slate-700'
                        }`}
                    >
                      <div className="min-w-0 pr-3">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900">{item.title}</p>
                          <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                            {item.meta}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.subtitle}</p>
                      </div>
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200/80 shrink-0">
                        {item.tag}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Keyboard Navigation Footer */}
            <div className="p-3 px-4 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono text-[10px] shadow-2xs font-semibold">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono text-[10px] shadow-2xs font-semibold">↓</kbd>
                  <span>navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono text-[10px] shadow-2xs font-semibold">Enter</kbd>
                  <span>open</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono text-[10px] shadow-2xs font-semibold">Esc</kbd>
                  <span>close</span>
                </span>
              </div>
              <span className="text-[10px] font-semibold text-[#3e6b2b]">
                LiliSphere Search
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
