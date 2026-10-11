import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import { FileText, Search, Filter, ArrowUpDown, Eye, ShieldCheck, AlertTriangle, X, CheckCircle2, ArrowLeft, PlusCircle } from 'lucide-react';

export default function CertificatesListPage() {
  const [loading, setLoading] = useState(true);
  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('newest');
  
  // Revoke modal state
  const [revokeModalCert, setRevokeModalCert] = useState(null);
  const [revocationReason, setRevocationReason] = useState('');
  const [revoking, setRevoking] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await api.get('/certificates', {
        params: {
          search,
          status: statusFilter,
          sort: sortOrder
        }
      });
      if (res.data.success) {
        setCertificates(res.data.certificates);
      }
    } catch (err) {
      console.error('Error fetching certificates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, [statusFilter, sortOrder]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCertificates();
  };

  const handleRevokeSubmit = async (e) => {
    e.preventDefault();
    if (!revocationReason.trim() || !revokeModalCert) return;

    setRevoking(true);
    setAlertMsg(null);

    try {
      const res = await api.post(`/certificates/${revokeModalCert.certificate_id}/revoke`, {
        revocation_reason: revocationReason.trim()
      });

      if (res.data.success) {
        setAlertMsg({ type: 'success', text: `Certificate ${revokeModalCert.certificate_id} has been revoked.` });
        setRevokeModalCert(null);
        setRevocationReason('');
        fetchCertificates();
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to revoke certificate.';
      setAlertMsg({ type: 'error', text: msg });
    } finally {
      setRevoking(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/institution/dashboard" className="text-slate-400 hover:text-slate-600">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Issued Certificates Management
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 pl-7">
            Search, filter, inspect hash integrity, or revoke digital certificates.
          </p>
        </div>

        <Link
          to="/institution/certificates/create"
          className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Issue New Certificate</span>
        </Link>
      </div>

      {alertMsg && <Alert type={alertMsg.type} message={alertMsg.text} />}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="w-full md:w-96 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search ID, Student Name, Roll No..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
          >
            Search
          </button>
        </form>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-800 font-medium"
            >
              <option value="ALL">All Statuses</option>
              <option value="VALID">VALID Only</option>
              <option value="REVOKED">REVOKED Only</option>
            </select>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-600">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold">Sort:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-800 font-medium"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

        </div>
      </div>

      {/* Certificates Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <LoadingSpinner text="Fetching certificates..." />
        ) : certificates.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold">No certificates match your search filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4">Certificate ID</th>
                  <th className="py-3.5 px-4">Student Details</th>
                  <th className="py-3.5 px-4">Course</th>
                  <th className="py-3.5 px-4">Issue Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                      {cert.certificate_id}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{cert.student_name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">ID: {cert.student_code}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{cert.course}</div>
                      <div className="text-[10px] text-slate-400">{cert.certificate_type}</div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {new Date(cert.issue_date).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        cert.status === 'VALID' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {cert.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        
                        <Link
                          to={`/verify/${cert.certificate_id}`}
                          className="px-2.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold rounded-lg flex items-center gap-1 transition-colors"
                          title="Verify / View Certificate"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </Link>

                        {cert.status === 'VALID' && (
                          <button
                            onClick={() => setRevokeModalCert(cert)}
                            className="px-2.5 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold rounded-lg flex items-center gap-1 transition-colors"
                            title="Revoke Certificate"
                          >
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Revoke</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Revocation Modal */}
      {revokeModalCert && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 p-6 space-y-4">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-lg text-rose-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Revoke Certificate
              </h3>
              <button
                onClick={() => setRevokeModalCert(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to revoke Certificate ID <strong className="font-mono text-slate-900">{revokeModalCert.certificate_id}</strong> issued to <strong>{revokeModalCert.student_name}</strong>?
            </p>

            <form onSubmit={handleRevokeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Reason for Revocation *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Administrative error, Duplicate record, Misconduct..."
                  value={revocationReason}
                  onChange={(e) => setRevocationReason(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 bg-slate-50/50"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRevokeModalCert(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={revoking}
                  className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow disabled:opacity-50"
                >
                  {revoking ? 'Revoking...' : 'Confirm Revocation'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
