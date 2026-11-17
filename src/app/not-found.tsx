import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <h2 className="text-2xl font-black text-slate-900">Page Not Found</h2>
      <p className="text-xs text-slate-500 max-w-sm">
        The requested resource is not available or has moved.
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-600 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
