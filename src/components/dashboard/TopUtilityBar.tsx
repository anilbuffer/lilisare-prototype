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
} from 'lucide-react';
import { GLOBAL_SEARCH_ITEMS, SearchItem } from './dashboard-data';
import { usePortal } from '@/lib/store/portal-context';

interface TopUtilityBarProps {
  onSelectSearchItem: (item: SearchItem) => void;
  onOpenNotificationsModal: () => void;
  onOpenProfileModal: (tab?: string) => void;
  onOpenAIBriefing?: () => void;
  onTrackCaregivers?: () => void;
}

export function TopUtilityBar({
  onSelectSearchItem,
  onOpenNotificationsModal,
  onOpenProfileModal,
  onOpenAIBriefing,
  onTrackCaregivers,
}: TopUtilityBarProps) {
  const router = useRouter();
  const { setActiveView, notify } = usePortal();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(4);
  const [readIds, setReadIds] = useState<string[]>([]);
  const notifContainerRef = useRef<HTMLDivElement>(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileContainerRef = useRef<HTMLDivElement>(null);

  const filteredResults = searchQuery.trim() === ''
    ? GLOBAL_SEARCH_ITEMS.slice(0, 6)
    : GLOBAL_SEARCH_ITEMS.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      } else if (e.key === '/' && document.activeElement !== searchInputRef.current && !(document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsNotificationsOpen(false);
        setIsProfileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notifContainerRef.current && !notifContainerRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileContainerRef.current && !profileContainerRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
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
    }
  };

  const handleSelectItem = (item: SearchItem) => {
    onSelectSearchItem(item);
    setIsSearchOpen(false);
    setSearchQuery('');
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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
      {/* Left Page Title / Breadcrumb with Official Logo (Consistent with Home Page) */}
      <div className="flex items-center gap-3">
        <Link
          href="/landing"
          className="flex items-center gap-2 cursor-pointer group shrink-0"
          title="Return to LiliSare Public Home Page"
        >
          <img
            src="/images/lilisare-logo.png"
            alt="LiliSare"
            className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>
        <div className="h-5 w-[1px] bg-slate-200 hidden sm:block" />
        <Link
          href="/admin-portal/dashboard"
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#3e6b2b] border border-emerald-200/80 flex items-center justify-center shadow-2xs group-hover:bg-emerald-100 transition-colors">
            <LayoutDashboard className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-slate-900 text-sm tracking-tight group-hover:text-[#3e6b2b] transition-colors">Dashboard</span>
        </Link>
      </div>

      {/* Middle & Right: Search Bar & Actions */}
      <div className="flex items-center gap-3 flex-1 justify-end max-w-2xl">
        <div className="relative flex-1 max-w-md lg:max-w-lg" ref={searchContainerRef}>
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              role="combobox"
              aria-expanded={isSearchOpen}
              aria-autocomplete="list"
              aria-label="Search clients, caregivers, pages"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
                setSelectedIndex(0);
              }}
              onFocus={() => setIsSearchOpen(true)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search clients, caregivers, pages..."
              className="w-full pl-9 pr-24 py-2 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e6b2b]/15 focus:border-[#3e6b2b] shadow-2xs hover:border-slate-300 transition-all font-medium"
            />
            <div className="absolute right-2 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    searchInputRef.current?.focus();
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                  title="Clear"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-[#3e6b2b] border border-emerald-200/60 hidden sm:inline">
                GLOBAL
              </span>
              <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-50 border border-slate-200 rounded shadow-2xs font-semibold">
                ⌘K
              </kbd>
            </div>
          </div>

        {/* Search Suggestions Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden z-50 animate-in fade-in zoom-in-98 duration-150">
            <div className="p-2.5 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-400 bg-slate-50/80 font-medium">
              <span>{searchQuery.trim() ? `Search Results (${filteredResults.length})` : 'Suggested Quick Access'}</span>
              <span>Navigate with ↑ ↓ • Press Enter</span>
            </div>

            <div className="max-h-72 overflow-y-auto p-1.5 space-y-0.5">
              {filteredResults.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${index === selectedIndex
                    ? 'bg-[#3e6b2b]/10 text-slate-900 font-bold'
                    : 'hover:bg-slate-50 text-slate-700'
                    }`}
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-900">{item.title}</p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.subtitle}</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                    {item.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Controls: Track Caregivers, AI Briefing, Notifications & Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 self-end sm:self-auto">
        {/* Track Caregivers action */}
        <button
          onClick={onTrackCaregivers || (() => notify('Caregiver Tracking', 'Opening real-time GPS telemetry for active branch caregivers.', 'info'))}
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200/90 rounded-xl text-xs font-bold transition-all shadow-2xs active:scale-98 cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5 text-emerald-600" />
          <span>Track Caregivers</span>
        </button>

        {/* AI Briefing button */}
        {onOpenAIBriefing && (
          <button
            onClick={onOpenAIBriefing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#3e6b2b] hover:bg-[#345b24] text-white rounded-xl text-xs font-bold transition-all shadow-[0_2px_8px_rgba(62,107,43,0.25)] hover:shadow-md active:scale-98 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F2B632] animate-pulse" />
            <span>AI Briefing</span>
          </button>
        )}

        {/* Notification Bell */}
        <div className="relative" ref={notifContainerRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            aria-label="Notifications"
            className="relative p-2.5 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl transition-all cursor-pointer shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] active:scale-95"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F2B632] text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center font-mono shadow-sm ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden">
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
                    onOpenNotificationsModal();
                  }}
                  className="text-xs font-semibold text-[#3e6b2b] hover:underline"
                >
                  View all notifications &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Badge */}
        <div className="relative" ref={profileContainerRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1.5 pl-2 pr-3 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl transition-all cursor-pointer shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] group active:scale-98"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#1b3612] to-[#3e6b2b] text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-[#3e6b2b]/20">
              AD
            </div>
            <span className="text-xs font-bold text-slate-800">
              Admin Demo
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 z-50">
              <div className="p-3 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-900">Admin Demo (Lisa)</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">lisa.admin@lilisare.health</p>
              </div>
              <div className="py-1 space-y-0.5 text-xs text-slate-700">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onOpenProfileModal('profile');
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 font-medium"
                >
                  My Profile
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onOpenProfileModal('settings');
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 font-medium"
                >
                  Account Settings
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onOpenProfileModal('support');
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 font-medium"
                >
                  Help &amp; Support
                </button>
                <div className="pt-1 mt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      setActiveView('login');
                      router.push('/login');
                      notify('Signed Out', 'You have been safely signed out of LiliSare Operations.', 'info');
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-rose-50 text-rose-600 font-semibold flex items-center justify-between cursor-pointer"
                  >
                    <span>Sign Out</span>
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
