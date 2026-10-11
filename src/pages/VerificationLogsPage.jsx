import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { History, Search, ArrowLeft, ShieldCheck, AlertTriangle, Globe, Monitor } from 'lucide-react';

export default function VerificationLogsPage() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/verification-logs', {
        params: { search }
      });
      if (res.data.success) {
        setLogs(res.data.logs);
      }
    } catch (err) {
      console.error('Error fetching verification logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchLogs();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/institution/dashboard" className="text-slate-400 hover:text-slate-600">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Verification Audit Logs
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 pl-7">
            Real-time audit history of every verification request executed by employers and third-party verifiers.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="max-w-md flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search Certificate ID, Student Name, Status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
          >
            Search Logs
          </button>
        </form>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <LoadingSpinner text="Fetching verification logs..." />
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <History className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold">No verification audit logs recorded yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4">Verification Time</th>
                  <th className="py-3.5 px-4">Certificate ID</th>
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">Verification Result</th>
                  <th className="py-3.5 px-4">Digital Fingerprint Integrity</th>
                  <th className="py-3.5 px-4">Verifier IP / Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {new Date(log.verified_at).toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                      <Link to={`/verify/${log.certificate_id}`} className="hover:underline">
                        {log.certificate_id}
                      </Link>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{log.student_name || 'N/A'}</div>
                      <div className="text-[10px] text-slate-400">{log.course}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        log.verification_result === 'VALID' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : log.verification_result === 'REVOKED'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {log.verification_result}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        log.integrity_result === 'PASSED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {log.integrity_result}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{log.ip_address || '127.0.0.1'}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[200px]" title={log.user_agent}>
                        {log.user_agent || 'Web Browser'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
