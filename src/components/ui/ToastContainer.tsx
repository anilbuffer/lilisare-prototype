'use client';

import React from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export function ToastContainer() {
  const { notifications, dismissNotification } = usePortal();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none p-2">
      {notifications.map((n) => {
        const isSuccess = n.type === 'success';
        const isWarning = n.type === 'warning';
        const isError = n.type === 'error';

        return (
          <div
            key={n.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-slate-900/10 text-slate-800 animate-in slide-in-from-bottom-5 duration-200"
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#00d084]" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-[#fcb900]" />}
              {isError && <XCircle className="w-5 h-5 text-rose-600" />}
              {!isSuccess && !isWarning && !isError && <Info className="w-5 h-5 text-sky-600" />}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 tracking-tight">{n.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
            </div>

            <button
              onClick={() => dismissNotification(n.id)}
              className="text-slate-400 hover:text-slate-600 p-1 -mr-1 -mt-1 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
