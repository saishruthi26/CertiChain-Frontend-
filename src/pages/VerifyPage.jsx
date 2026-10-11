import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, QrCode, ShieldCheck, ArrowRight, HelpCircle, CheckCircle2 } from 'lucide-react';
import QRScannerModal from '../components/QRScannerModal';

export default function VerifyPage() {
  const [certId, setCertId] = useState('');
  const [error, setError] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    if (!certId.trim()) {
      setError('Please enter a valid Certificate ID.');
      return;
    }
    setError('');
    navigate(`/verify/${encodeURIComponent(certId.trim())}`);
  };

  const handleQuickDemo = (sampleId) => {
    navigate(`/verify/${sampleId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-md">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Verify Certificate Authenticity
        </h1>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          Enter the unique Certificate ID or scan the QR code printed on the digital certificate to verify instant validity and check for tampering.
        </p>
      </div>

      {/* Verification Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-8">
        
        {/* Option A: Enter Certificate ID */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider">
            Option A: Enter Certificate ID
          </label>
          
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Example: CERT-2026-000001"
                value={certId}
                onChange={(e) => { setCertId(e.target.value); setError(''); }}
                className="w-full px-4 py-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-base font-semibold uppercase placeholder:normal-case placeholder:font-sans placeholder:text-slate-400 text-slate-900 bg-slate-50/50"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shrink-0"
            >
              <Search className="w-5 h-5" />
              <span>Verify Certificate</span>
            </button>
          </form>

          {error && (
            <p className="text-xs text-rose-600 font-medium pl-1">{error}</p>
          )}

          <p className="text-xs text-slate-500 flex items-center gap-1.5 pl-1">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            Certificate IDs are located at the bottom-right of all CertiChain issued credentials.
          </p>
        </div>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-xs uppercase tracking-widest text-slate-400 font-bold bg-white px-2">
            OR
          </span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Option B: Scan QR Code */}
        <div className="space-y-4 text-center">
          <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider">
            Option B: Scan Certificate QR Code
          </label>
          
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center space-y-3">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <QrCode className="w-8 h-8" />
            </div>
            <p className="text-xs text-slate-600 max-w-sm">
              Use your device camera or upload a QR image file to perform automatic instant scanning.
            </p>
            <button
              type="button"
              onClick={() => setIsScannerOpen(true)}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <QrCode className="w-4 h-4 text-blue-400" />
              <span>Open Camera Scanner / Upload QR</span>
            </button>
          </div>
        </div>

      </div>

      {/* Demo sample selector for evaluation */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 space-y-3">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600" />
          Test Drive Demo Certificates
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          Click any demo Certificate ID below to see live verification state handling:
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => handleQuickDemo('CERT-2026-000001')}
            className="px-3 py-1.5 bg-white border border-blue-300 text-blue-800 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-mono font-semibold transition-colors flex items-center gap-1 shadow-sm"
          >
            <span>CERT-2026-000001</span>
            <span className="text-[10px] uppercase font-sans font-bold text-emerald-600 bg-emerald-50 px-1 rounded">VALID</span>
          </button>
        </div>
      </div>

      {/* QR Scanner Modal */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />

    </div>
  );
}
