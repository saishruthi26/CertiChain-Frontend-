import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { ShieldCheck, ShieldAlert, XCircle, AlertTriangle, Printer, Download, RefreshCw, Building2, User, Award, Calendar, Hash, ExternalLink, QrCode, ArrowLeft } from 'lucide-react';

export default function VerifyResultPage() {
  const { certificate_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [verificationData, setVerificationData] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVerification = async () => {
      setLoading(true);
      setErrorStatus(null);
      try {
        const res = await api.get(`/verify/${encodeURIComponent(certificate_id)}`);
        setVerificationData(res.data);
      } catch (err) {
        if (err.response && err.response.data) {
          setVerificationData(err.response.data);
          setErrorStatus(err.response.data.status || 'ERROR');
        } else {
          setErrorStatus('NETWORK_ERROR');
        }
      } finally {
        setLoading(false);
      }
    };

    if (certificate_id) {
      fetchVerification();
    }
  }, [certificate_id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner text={`Verifying certificate ${certificate_id}...`} />
      </div>
    );
  }

  const status = verificationData?.status || errorStatus;
  const cert = verificationData?.certificate;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Top Bar Navigation */}
      <div className="flex justify-between items-center no-print">
        <Link
          to="/verify"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Verify Another Certificate</span>
        </Link>
        <span className="text-xs text-slate-400 font-mono">
          Ref ID: {certificate_id}
        </span>
      </div>

      {/* STATE 1: VALID */}
      {status === 'VALID' && cert && (
        <div className="space-y-6">
          
          {/* Status Header Banner */}
          <div className="bg-emerald-600 text-white rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-emerald-500">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full">
                  Authenticity Confirmed
                </span>
                <h1 className="text-2xl font-extrabold mt-1">Certificate Verified Successfully</h1>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Issued by {cert.institution_name} • Digital Fingerprint Integrity Passed
                </p>
              </div>
            </div>
            
            <div className="bg-emerald-700/80 px-4 py-2 rounded-xl border border-emerald-500 text-center shrink-0">
              <div className="text-[10px] uppercase font-semibold text-emerald-200">Status</div>
              <div className="text-lg font-black tracking-wider text-white">VALID</div>
            </div>
          </div>

          {/* Detailed Verification Summary Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden print-only-container">
            
            {/* Academic Certificate Header */}
            <div className="bg-slate-900 text-white p-8 text-center relative border-b border-slate-800">
              <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">
                Official Digital Credential
              </div>
              <h2 className="text-2xl font-serif-academic font-bold text-slate-100 tracking-wide">
                {cert.institution_name}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Institution Code: {cert.institution_code}
              </p>
            </div>

            {/* Verification Key Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-slate-50 border-b border-slate-200">
              <div className="p-4 text-center">
                <div className="text-xs text-slate-500 font-medium">Certificate Status</div>
                <div className="text-sm font-bold text-emerald-600 flex items-center justify-center gap-1 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>VALID</span>
                </div>
              </div>
              <div className="p-4 text-center">
                <div className="text-xs text-slate-500 font-medium">Authenticity</div>
                <div className="text-sm font-bold text-blue-600 flex items-center justify-center gap-1 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>VERIFIED</span>
                </div>
              </div>
              <div className="p-4 text-center">
                <div className="text-xs text-slate-500 font-medium">Tamper Check</div>
                <div className="text-sm font-bold text-emerald-600 flex items-center justify-center gap-1 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>PASSED</span>
                </div>
              </div>
            </div>

            {/* Main Content Details Grid */}
            <div className="p-8 space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Student Name</div>
                      <div className="text-lg font-bold text-slate-900">{cert.student_name}</div>
                      <div className="text-xs text-slate-500 font-mono">Roll / Student ID: {cert.student_code}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Course / Qualification</div>
                      <div className="text-base font-bold text-slate-900">{cert.course}</div>
                      {cert.department && (
                        <div className="text-xs text-slate-500">Department: {cert.department}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Issuing Institution</div>
                      <div className="text-base font-bold text-slate-900">{cert.institution_name}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Hash className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Certificate ID</div>
                      <div className="text-base font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block">
                        {cert.certificate_id}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Issue Date & Graduation</div>
                      <div className="text-base font-bold text-slate-900">
                        {new Date(cert.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <div className="text-xs text-slate-500">Graduation Year: {cert.graduation_year}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Certificate Type</div>
                      <div className="text-base font-bold text-slate-900">{cert.certificate_type}</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* QR Code & SHA-256 Hash Details */}
              <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50/70 p-6 rounded-2xl">
                <div className="space-y-2 text-center md:text-left flex-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Digital Fingerprint
                  </div>
                  <div className="text-[11px] font-mono text-slate-600 bg-white p-2 rounded-lg border border-slate-200 break-all">
                    <span className="text-slate-400 font-sans font-semibold block text-[10px]">CERTIFICATE HASH:</span>
                    {cert.certificate_hash}
                  </div>
                  <div className="text-[11px] font-mono text-slate-600 bg-white p-2 rounded-lg border border-slate-200 break-all">
                    <span className="text-slate-400 font-sans font-semibold block text-[10px]">HASH CHAIN (CURRENT HASH):</span>
                    {cert.current_hash}
                  </div>
                </div>

                {cert.qr_code && (
                  <div className="text-center shrink-0">
                    <img
                      src={cert.qr_code}
                      alt="Verification QR Code"
                      className="w-28 h-28 mx-auto bg-white p-1 rounded-xl border border-slate-300 shadow-sm"
                    />
                    <span className="text-[10px] text-slate-500 font-semibold block mt-1">
                      Scanned Verification QR
                    </span>
                  </div>
                )}
              </div>

            </div>

            {/* Card Footer */}
            <div className="bg-slate-100 px-8 py-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2 no-print">
              <span>Verified by CertiChain Digital Certificate Portal</span>
              <span className="font-semibold text-slate-700">No institution contact required</span>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center no-print">
            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Verification Report</span>
            </button>
            <Link
              to="/verify"
              className="px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl shadow-sm flex items-center gap-2 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Verify Another Certificate</span>
            </Link>
          </div>

        </div>
      )}

      {/* STATE 2: REVOKED */}
      {status === 'REVOKED' && cert && (
        <div className="space-y-6">
          <div className="bg-rose-600 text-white rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-rose-500">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full">
                  Status Alert
                </span>
                <h1 className="text-2xl font-extrabold mt-1">Certificate Revoked</h1>
                <p className="text-xs text-rose-100 mt-0.5">
                  This certificate was officially revoked by {cert.institution_name} and is no longer valid.
                </p>
              </div>
            </div>

            <div className="bg-rose-700 px-4 py-2 rounded-xl border border-rose-400 text-center shrink-0">
              <div className="text-[10px] uppercase font-semibold text-rose-200">Status</div>
              <div className="text-lg font-black tracking-wider text-white">REVOKED</div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-rose-200 shadow-xl p-8 space-y-6">
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-xs text-rose-900 space-y-1">
              <div className="font-bold text-sm">Revocation Information:</div>
              <div><strong>Revoked On:</strong> {new Date(cert.revoked_at || Date.now()).toLocaleDateString()}</div>
              <div><strong>Reason for Revocation:</strong> {cert.revocation_reason || 'Specified by issuing authority.'}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><span className="text-slate-500">Certificate ID:</span> <span className="font-mono font-bold text-slate-800">{cert.certificate_id}</span></div>
              <div><span className="text-slate-500">Student Name:</span> <span className="font-bold text-slate-800">{cert.student_name}</span></div>
              <div><span className="text-slate-500">Course:</span> <span className="font-bold text-slate-800">{cert.course}</span></div>
              <div><span className="text-slate-500">Issuing Institution:</span> <span className="font-bold text-slate-800">{cert.institution_name}</span></div>
            </div>
          </div>

          <div className="text-center no-print">
            <Link
              to="/verify"
              className="px-6 py-3 bg-slate-900 text-white font-bold text-sm rounded-xl inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Verify Another Certificate</span>
            </Link>
          </div>
        </div>
      )}

      {/* STATE 3: NOT FOUND */}
      {status === 'NOT_FOUND' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-10 text-center space-y-6">
          <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full mx-auto flex items-center justify-center">
            <XCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Lookup Failed
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900">Certificate Not Found</h1>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              The Certificate ID <code className="bg-slate-100 text-rose-700 px-2 py-1 rounded font-mono font-bold">{certificate_id}</code> does not exist in the CertiChain repository.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl max-w-md mx-auto text-xs text-slate-600 text-left space-y-1">
            <div className="font-bold text-slate-800">Possible reasons:</div>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>Typo in Certificate ID (e.g. check standard format CERT-2026-000001).</li>
              <li>Certificate has not yet been issued by the institution.</li>
              <li>Invalid or counterfeit document code.</li>
            </ul>
          </div>

          <div className="pt-2">
            <Link
              to="/verify"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again / Enter Another ID</span>
            </Link>
          </div>
        </div>
      )}

      {/* STATE 4: TAMPERED */}
      {status === 'TAMPERED' && (
        <div className="bg-white rounded-3xl border border-rose-300 shadow-2xl p-10 text-center space-y-6">
          <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full mx-auto flex items-center justify-center animate-pulse">
            <ShieldAlert className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-100 px-3 py-1 rounded-full border border-rose-300">
              Security Breach Detected
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900">Certificate Integrity Check Failed</h1>
            <p className="text-sm text-rose-700 font-semibold max-w-md mx-auto">
              Warning: The Digital Fingerprint of this certificate does not match the original issued records. This document appears to be altered or tampered with.
            </p>
          </div>

          <div className="bg-rose-50 border border-rose-200 p-6 rounded-2xl max-w-lg mx-auto text-xs text-rose-900 text-left space-y-2">
            <div className="font-bold text-sm text-rose-800">Tamper Inspection Result:</div>
            <div>• Stored Record Hash: <code className="bg-white p-1 rounded font-mono text-[10px]">{cert?.certificate_hash || 'MISMATCHED'}</code></div>
            <div>• Verification Check: <strong>FAILED</strong></div>
            <p className="pt-2 text-[11px] text-slate-600">
              Do not accept this certificate as proof of qualification. Please notify the issuing institution immediately.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/verify"
              className="px-8 py-4 bg-slate-900 text-white font-bold text-sm rounded-xl shadow-lg inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Back to Verification Portal</span>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
