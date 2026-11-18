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
  const { setActiveView, notify, toggleSidebar } = usePortal();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(4);
  const [readIds, setReadIds] = useState<string[]>([]);
  const notifContainerRef = useRef<HTMLDivElement>(null);

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
      {/* Left: Sidebar Toggle Button + Page Title (Matching Attached Reference) */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={toggleSidebar}
          className="w-8 h-8 rounded-lg bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          title="Toggle Sidebar"
        >
          <Columns2 className="w-4 h-4 text-slate-600" />
        </button>
        <h1 className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight">
          Dashboard
        </h1>
      </div>

      {/* Right: Clean Pill Search Bar & Notification Bell (Matching Attached Reference) */}
      <div className="flex items-center gap-2.5 flex-1 justify-end max-w-xl">
        <div className="relative flex-1 max-w-sm sm:max-w-md" ref={searchContainerRef}>
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              role="combobox"
              aria-expanded={isSearchOpen}
              aria-autocomplete="list"
              aria-label="Search care plans, clients, caregivers"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
                setSelectedIndex(0);
              }}
              onFocus={() => setIsSearchOpen(true)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search care plans..."
              className="w-full pl-9 pr-24 py-2 bg-white border border-slate-200/90 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e6b2b]/15 focus:border-[#3e6b2b] shadow-2xs hover:border-slate-300 transition-all font-medium"
            />
            <div className="absolute right-2 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    searchInputRef.current?.focus();
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
                  title="Clear"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200/80 hidden sm:inline-flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#3e6b2b]" />
                GLOBAL
              </span>
              <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-50 border border-slate-200 rounded-md shadow-2xs font-semibold">
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
      </div>
    </div>
  );
}
