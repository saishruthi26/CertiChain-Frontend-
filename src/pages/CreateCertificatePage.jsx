import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';
import { PlusCircle, Award, User, Mail, BookOpen, Building, Calendar, Hash, CheckCircle2, QrCode, Printer, Eye, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function CreateCertificatePage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [issuedCert, setIssuedCert] = useState(null);

  const [formData, setFormData] = useState({
    student_id: '',
    student_name: '',
    email: '',
    course: '',
    department: '',
    graduation_year: new Date().getFullYear(),
    certificate_type: 'Bachelor Degree',
    issue_date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.student_name || !formData.course || !formData.certificate_type || !formData.issue_date) {
      setError('Please fill in all required fields (Student Name, Course, Certificate Type, Issue Date).');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const res = await api.post('/certificates', formData);
      if (res.data.success) {
        setIssuedCert(res.data.certificate);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to issue digital certificate. Please try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex items-center justify-between no-print">
        <Link
          to="/institution/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <span className="text-xs text-slate-400 font-mono">
          Digital Fingerprint Engine
        </span>
      </div>

      {!issuedCert ? (
        /* Form View */
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl space-y-6">
          
          <div className="space-y-2 border-b border-slate-100 pb-6">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Create & Issue Digital Certificate
            </h1>
            <p className="text-slate-500 text-xs">
              Fill in student details. The system will automatically compute Digital Fingerprints and generate a verification QR code.
            </p>
          </div>

          {error && <Alert type="error" message={error} />}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Student Information Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>Student Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    name="student_name"
                    required
                    placeholder="Rahul Kumar"
                    value={formData.student_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Student ID / Roll Number
                  </label>
                  <input
                    type="text"
                    name="student_id"
                    placeholder="STU2026001"
                    value={formData.student_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono text-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Student Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="rahul.kumar@abc.edu"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Course / Degree *
                  </label>
                  <input
                    type="text"
                    name="course"
                    required
                    placeholder="B.Tech Computer Science"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    placeholder="Computer Science & Engg."
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>
            </div>

            {/* Certificate Details Section */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Certificate Metadata</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Certificate Type *
                  </label>
                  <select
                    name="certificate_type"
                    value={formData.certificate_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-slate-50/50"
                  >
                    <option value="Bachelor Degree">Bachelor Degree</option>
                    <option value="Master Degree">Master Degree</option>
                    <option value="Postgraduate Diploma">Postgraduate Diploma</option>
                    <option value="Doctorate (Ph.D.)">Doctorate (Ph.D.)</option>
                    <option value="Honorary Certificate">Honorary Certificate</option>
                    <option value="Academic Distinction">Academic Distinction</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Graduation Year *
                  </label>
                  <input
                    type="number"
                    name="graduation_year"
                    required
                    value={formData.graduation_year}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Issue Date *
                  </label>
                  <input
                    type="date"
                    name="issue_date"
                    required
                    value={formData.issue_date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              {submitting ? (
                <span>Generating Digital Fingerprint & QR Code...</span>
              ) : (
                <>
                  <Award className="w-5 h-5" />
                  <span>Issue & Publish Certificate</span>
                </>
              )}
            </button>

          </form>

        </div>
      ) : (
        /* Issued Certificate Success View */
        <div className="space-y-8">
          
          <div className="bg-emerald-600 text-white p-6 rounded-2xl shadow-xl flex items-center justify-between border border-emerald-500 no-print">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-white shrink-0" />
              <div>
                <h2 className="font-extrabold text-xl">Certificate Created Successfully!</h2>
                <p className="text-xs text-emerald-100">
                  Certificate ID <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded">{issuedCert.certificate_id}</span> has been published to database.
                </p>
              </div>
            </div>
            
            <Link
              to={`/verify/${issuedCert.certificate_id}`}
              className="px-4 py-2 bg-white text-emerald-900 font-bold text-xs rounded-xl shadow hover:bg-emerald-50 transition-colors shrink-0"
            >
              Live Verification View
            </Link>
          </div>

          {/* Academic Digital Certificate Document Card */}
          <div className="bg-white rounded-3xl border-8 double border-blue-900 shadow-2xl p-8 space-y-8 print-only-container certificate-paper">
            
            {/* Header */}
            <div className="text-center space-y-2 border-b border-slate-200 pb-6">
              <div className="text-xs font-bold uppercase tracking-widest text-blue-600">
                CERTICHAIN DIGITAL CERTIFICATE PORTAL
              </div>
              <h2 className="text-3xl font-serif-academic font-bold text-slate-900 tracking-wide">
                {issuedCert.institution_name}
              </h2>
              <div className="text-xs text-slate-500 font-medium">
                Official Credential of Higher Education
              </div>
            </div>

            {/* Body Statement */}
            <div className="text-center space-y-4 py-4">
              <p className="text-xs uppercase tracking-widest font-semibold text-slate-400">
                This is to certify that
              </p>
              
              <h3 className="text-3xl font-bold text-slate-900 font-serif-academic">
                {issuedCert.student_name}
              </h3>

              <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                has successfully completed all academic requirements for the award of
              </p>

              <div className="text-2xl font-bold text-blue-900 py-1">
                {issuedCert.course}
              </div>

              {issuedCert.department && (
                <div className="text-xs text-slate-500">
                  Department: {issuedCert.department}
                </div>
              )}
            </div>

            {/* Certificate Footer Metadata */}
            <div className="border-t border-slate-200 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              <div className="space-y-1 text-xs text-slate-600">
                <div><strong>Certificate ID:</strong> <span className="font-mono text-blue-800">{issuedCert.certificate_id}</span></div>
                <div><strong>Student ID:</strong> <span className="font-mono">{issuedCert.student_code}</span></div>
                <div><strong>Issue Date:</strong> {new Date(issuedCert.issue_date).toLocaleDateString()}</div>
                <div><strong>Status:</strong> <span className="text-emerald-600 font-bold">VALID</span></div>
              </div>

              <div className="text-center">
                {issuedCert.qr_code && (
                  <img
                    src={issuedCert.qr_code}
                    alt="Certificate QR Code"
                    className="w-28 h-28 mx-auto bg-white p-1 rounded-xl border border-slate-300 shadow-sm"
                  />
                )}
                <span className="text-[10px] text-slate-500 block mt-1">
                  Scan to Verify at CertiChain
                </span>
              </div>

              <div className="text-xs text-slate-500 space-y-1 font-mono break-all text-right">
                <div className="font-sans font-bold text-slate-700 text-[11px]">DIGITAL FINGERPRINT:</div>
                <div className="text-[9px] bg-slate-50 p-1.5 rounded border border-slate-200">
                  {issuedCert.certificate_hash}
                </div>
              </div>

            </div>

          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center no-print">
            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF Certificate</span>
            </button>
            <button
              onClick={() => setIssuedCert(null)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-md flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Issue Another Certificate</span>
            </button>
            <Link
              to="/institution/dashboard"
              className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-semibold text-sm rounded-xl shadow-sm flex items-center gap-2"
            >
              <span>Back to Dashboard</span>
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}
