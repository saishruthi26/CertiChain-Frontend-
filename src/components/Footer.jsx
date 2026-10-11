import React from 'react';
import { ShieldCheck, Lock, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-12 pb-8 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Certi<span className="text-blue-400">Chain</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Digital Certificate Verification Portal. Secured by Digital Fingerprint tamper-evident chaining and QR code verification.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/50 w-fit">
              <Lock className="w-3.5 h-3.5" />
              <span>Digital Fingerprint Protection</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home Portal</Link></li>
              <li><Link to="/verify" className="hover:text-blue-400 transition-colors">Verify Certificate</Link></li>
              <li><Link to="/institution/login" className="hover:text-blue-400 transition-colors">Institution Login</Link></li>
              <li><Link to="/institution/register" className="hover:text-blue-400 transition-colors">Register Institution</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Verification Portal</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant QR Scanning</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Institution Contact</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Revocation Status Audit</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Tamper Evidence Verification</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">System Details</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Designed for colleges, universities, and academic institutions to eliminate certificate fraud.
            </p>
            <div className="text-xs text-slate-500 font-mono">
              Backend API: Express + Neon PostgreSQL<br />
              Fingerprint standard: SHA-256 Canonical
            </div>
          </div>

        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} CertiChain — Digital Certificate Verification Portal. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span>Verified. Trusted. Paperless.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
