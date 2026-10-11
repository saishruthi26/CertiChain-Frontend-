import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { FileText, ShieldCheck, AlertTriangle, SearchCheck, PlusCircle, History, ArrowRight, Building2, User, Eye, CheckCircle2 } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    stats: {
      totalCertificates: 0,
      validCertificates: 0,
      revokedCertificates: 0,
      totalVerifications: 0
    },
    recentCertificates: [],
    recentActivity: []
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await api.get('/certificates/stats/dashboard');
        if (res.data.success) {
          setData({
            stats: res.data.stats,
            recentCertificates: res.data.recentCertificates || [],
            recentActivity: res.data.recentActivity || []
          });
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner text="Loading Institution Dashboard Statistics..." />
      </div>
    );
  }

  const { stats, recentCertificates, recentActivity } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold tracking-wider uppercase">
            <Building2 className="w-4 h-4" />
            <span>{user?.institution_code || 'INST'} • Official Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {user?.institution_name || 'Institution Dashboard'}
          </h1>
          <p className="text-xs text-slate-400">
            Digital Certificate Issuance, Digital Fingerprint Management, and Verification Audit.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/institution/certificates/create"
            className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Issue Certificate</span>
          </Link>
          <Link
            to="/institution/certificates"
            className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl border border-slate-700 flex items-center gap-2 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Certificates List</span>
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Certificates</div>
            <div className="text-3xl font-black text-slate-900 mt-1">{stats.totalCertificates}</div>
            <div className="text-[11px] text-slate-400 mt-1">Issued across all courses</div>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Valid Certificates</div>
            <div className="text-3xl font-black text-emerald-600 mt-1">{stats.validCertificates}</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">Active & Verifiable</div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Revoked Certificates</div>
            <div className="text-3xl font-black text-rose-600 mt-1">{stats.revokedCertificates}</div>
            <div className="text-[11px] text-rose-600 font-medium mt-1">Status Revoked</div>
          </div>
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Verifications</div>
            <div className="text-3xl font-black text-indigo-600 mt-1">{stats.totalVerifications}</div>
            <div className="text-[11px] text-indigo-600 font-medium mt-1">Employer QR lookups</div>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
            <SearchCheck className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Main Grid: Recent Certificates & Verification Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Certificates Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-base">Recent Issued Certificates</h3>
            </div>
            <Link
              to="/institution/certificates"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 overflow-x-auto flex-1">
            {recentCertificates.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No certificates issued yet. Click "Issue Certificate" to issue your first credential!
              </div>
            ) : (
              recentCertificates.map((cert) => (
                <div key={cert.certificate_id} className="p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span>{cert.student_name}</span>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        cert.status === 'VALID' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {cert.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      {cert.certificate_id} • {cert.course}
                    </div>
                  </div>
                  <Link
                    to={`/verify/${cert.certificate_id}`}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shrink-0"
                    title="View Certificate"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Verification Activity */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-base">Recent Verification Audit Activity</h3>
            </div>
            <Link
              to="/institution/verification-logs"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View Logs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 overflow-x-auto flex-1">
            {recentActivity.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No verifications logged yet. When employers scan certificate QR codes, logs will appear here live.
              </div>
            ) : (
              recentActivity.map((log, index) => (
                <div key={index} className="p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span>{log.student_name || 'Certificate Verification'}</span>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        log.verification_result === 'VALID' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : log.verification_result === 'REVOKED'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {log.verification_result}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      {log.certificate_id} • Hash Check: {log.integrity_result}
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 font-mono shrink-0">
                    {new Date(log.verified_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
