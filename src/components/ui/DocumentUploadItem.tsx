'use client';

import React, { useRef, useState } from 'react';
import {
  Upload,
  FileText,
  Check,
  Eye,
  Trash2,
  RefreshCw,
  X,
  FileCheck,
} from 'lucide-react';

export interface UploadedFileMeta {
  name: string;
  size: string;
  uploadedAt: string;
  type?: string;
}

interface DocumentUploadItemProps {
  id: string;
  title: string;
  description: string;
  required?: boolean;
  file: UploadedFileMeta | null;
  onUpload: (file: UploadedFileMeta) => void;
  onRemove: () => void;
  acceptedFormats?: string;
}

export function DocumentUploadItem({
  id,
  title,
  description,
  required = true,
  file,
  onUpload,
  onRemove,
  acceptedFormats = '.pdf,.png,.jpg,.jpeg',
}: DocumentUploadItemProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      const sizeMB = (selected.size / (1024 * 1024)).toFixed(1);
      const sizeStr = selected.size < 1024 * 1024
        ? `${Math.round(selected.size / 1024)} KB`
        : `${sizeMB} MB`;

      onUpload({
        name: selected.name,
        size: sizeStr,
        uploadedAt: 'Just now',
        type: selected.type,
      });
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="p-3.5 sm:p-4 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Clean Icon & Document Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              file ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
            }`}
          >
            {file ? <Check className="w-4 h-4 stroke-[2.5]" /> : <FileText className="w-4 h-4" />}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                {title}
              </span>
              {required && (
                <span className="text-rose-500 font-bold text-xs" title="Required Document">*</span>
              )}
            </div>

            {/* Single Secondary Line (File info or prompt) */}
            <p className="text-[11px] sm:text-xs text-slate-500 truncate mt-0.5">
              {file ? (
                <span className="inline-flex items-center gap-1.5 text-slate-600">
                  <span className="text-slate-700 font-medium truncate max-w-[200px] sm:max-w-sm">
                    {file.name}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span>{file.size}</span>
                </span>
              ) : (
                <span className="text-slate-400">{description}</span>
              )}
            </p>
          </div>
        </div>

        {/* Right: Restored Clear Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFormats}
            onChange={handleFileChange}
            className="hidden"
          />

          {file ? (
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 border border-emerald-200/80 px-2 py-1 rounded-lg mr-1">
                ✓ Uploaded
              </span>

              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-[0.98]"
                title="Preview Document"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>Preview</span>
              </button>

              <button
                type="button"
                onClick={handleTriggerUpload}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-[0.98]"
                title="Replace File"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                <span>Replace</span>
              </button>

              <button
                type="button"
                onClick={onRemove}
                className="p-1.5 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 transition-colors cursor-pointer shadow-2xs active:scale-[0.98]"
                title="Remove file"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleTriggerUpload}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-bold transition-all shadow-sm hover:shadow active:scale-[0.98] flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Document</span>
            </button>
          )}
        </div>
      </div>

      {/* Sleek Preview Modal */}
      {isPreviewOpen && file && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-900">{title}</h3>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-2">
              <FileText className="w-10 h-10 text-emerald-600 mx-auto" />
              <p className="text-xs font-bold text-slate-800">{file.name}</p>
              <p className="text-[11px] text-slate-500">File Size: {file.size} • Verified Format</p>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
