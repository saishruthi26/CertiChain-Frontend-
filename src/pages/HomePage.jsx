import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Search, Building2, QrCode, FileCheck2, Lock, ArrowRight, CheckCircle2, Cpu, FileSpreadsheet, ShieldAlert } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-20 pb-24 border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide">
              <ShieldCheck className="w-4 h-4" />
              <span>Digital Fingerprint & Instant QR Verification</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Certi<span className="text-blue-500">Chain</span> — Digital Certificate Verification Portal
            </h1>

            <p className="text-xl sm:text-2xl font-light text-blue-200 tracking-wide font-serif-academic italic">
              "Verified. Trusted. Paperless."
            </p>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Securely issue, verify, and manage academic certificates with QR-based verification and tamper-evident Digital Fingerprinting. Eliminate certificate fraud and manual college contacts instantly.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/verify"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Search className="w-5 h-5" />
                Verify Certificate
              </Link>
              <Link
                to="/institution/login"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Building2 className="w-5 h-5 text-blue-400" />
                Institution Login
              </Link>
            </div>

            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                <div className="text-2xl font-bold text-blue-400">100%</div>
                <div className="text-xs text-slate-400 font-medium">Digital Verification</div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                <div className="text-xl font-bold text-emerald-400">Fingerprint</div>
                <div className="text-xs text-slate-400 font-medium">Tamper Protection</div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                <div className="text-2xl font-bold text-indigo-400">Instant</div>
                <div className="text-xs text-slate-400 font-medium">QR Scan Lookup</div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                <div className="text-2xl font-bold text-amber-400">Zero</div>
                <div className="text-xs text-slate-400 font-medium">Manual Mail/Phone Delay</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How CertiChain Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Architectural Workflow</h2>
          <h3 className="text-3xl font-extrabold text-slate-900">How CertiChain Works</h3>
          <p className="text-slate-600 text-sm mt-2">
            A secure end-to-end issuance and instant verification pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
              1
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              Institution Issues Certificate
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Authorized university administrators enter student data (Name, Roll No, Degree, Year).
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
              2
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-600" />
              Unique ID & Digital Fingerprint
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              System generates a collision-safe ID (e.g. CERT-2026-000001) and computes Digital Fingerprint.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
              3
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-emerald-600" />
              QR Code Is Generated
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              A high-density QR code embedding the verification portal link is generated on the digital certificate.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
              4
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-600" />
              Secure Storage
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Certificate records, hashes, and previous-hash pointers are securely saved in Neon PostgreSQL.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
              5
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Search className="w-5 h-5 text-purple-600" />
              Employer Scans QR
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Verifiers or employers scan the QR code via mobile camera or input Certificate ID manually.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
              6
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-teal-600" />
              Instant Verification Result
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Backend recalculates hash, checks status (VALID, REVOKED, TAMPERED) and displays result instantly.
            </p>
          </div>

        </div>
      </section>

      {/* Key Benefits */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Core Platform Strengths</h2>
            <h3 className="text-3xl font-extrabold text-slate-900">Key Benefits</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Fast Verification</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Verify academic credentials in seconds without waiting days for university registrar responses.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">QR-Based Access</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mobile camera QR scanning provides seamless verification for HR personnel and recruiters.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-lg shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Tamper Detection</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Digital Fingerprints detect any unauthorized modification to student name, grade, or date.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Secure Storage</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  PostgreSQL relational integrity with hash-chaining prevents retroactive database alterations.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-lg shrink-0">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Paperless Process</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Replaces physical paper transcripts with verifiable digital certificates that can be downloaded or printed anytime.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-lg shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">No Institution Contact Required</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Employers verify certificates directly against the portal without contacting the university administration.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Demo Quick Start Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
              Demo Test Drive
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">Try Verifying Sample Certificate</h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Use sample Certificate ID <code className="bg-slate-800 text-blue-300 px-2 py-1 rounded font-mono text-xs font-bold">CERT-2026-000001</code> to test instant verification right now!
            </p>
          </div>
          <Link
            to="/verify/CERT-2026-000001"
            className="shrink-0 px-6 py-3.5 bg-white text-blue-900 hover:bg-blue-50 font-bold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
          >
            <span>Verify Sample Certificate</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
