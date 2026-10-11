import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import { QRCodeSVG } from 'qrcode.react';
import { FiPrinter, FiDownload, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';

const CertificateDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [revokeReason, setRevokeReason] = useState('');
  const [revoking, setRevoking] = useState(false);

  const fetchCertificate = async () => {
    try {
      const response = await api.get(`/certificates/${id}`);
      setCert(response.data.data);
    } catch (error) {
      console.error('Error fetching certificate', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificate();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleRevoke = async () => {
    setRevoking(true);
    try {
      await api.post(`/certificates/${id}/revoke`, { reason: revokeReason });
      setShowRevokeModal(false);
      fetchCertificate(); // Refresh
    } catch (error) {
      console.error('Error revoking', error);
      alert('Failed to revoke certificate');
    } finally {
      setRevoking(false);
    }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><LoadingSpinner /></div>;
  if (!cert) return <div>Certificate not found.</div>;

  const verifyUrl = cert.verifyUrl || `${window.location.origin}/verify/${cert.certificate_id}`;

  return (
    <div>
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/institution/certificates')} className="btn-ghost" style={{ padding: '0.5rem' }}>
            <FiArrowLeft size={20} />
          </button>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>Certificate Details</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
              <span style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>{cert.certificate_id}</span>
              <StatusBadge status={cert.status} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handlePrint} className="btn-secondary">
            <FiPrinter /> Print / Save PDF
          </button>
          {cert.status === 'VALID' && (
            <button onClick={() => setShowRevokeModal(true)} className="btn-danger">
              Revoke
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column', '@media (min-width: 1024px)': { flexDirection: 'row' } }}>
        
        {/* Certificate Display Area (Printable) */}
        <div className="printable-area" style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            width: '100%', 
            maxWidth: '900px', 
            aspectRatio: '1.414 / 1', // A4 landscape ratio
            backgroundColor: 'white', 
            position: 'relative',
            padding: '3rem',
            border: '1px solid var(--border)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            {/* Decorative Border */}
            <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', right: '1.5rem', bottom: '1.5rem', border: '2px solid var(--primary)', pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', right: '2rem', bottom: '2rem', border: '1px solid rgba(30, 64, 175, 0.2)', pointerEvents: 'none' }}></div>
            
            {/* Watermark if revoked */}
            {cert.status === 'REVOKED' && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-45deg)', fontSize: '8rem', color: 'rgba(220, 38, 38, 0.1)', fontWeight: '900', letterSpacing: '0.2em', pointerEvents: 'none', zIndex: 10 }}>
                REVOKED
              </div>
            )}

            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  🎓 CertiChain
                </h1>
                <p style={{ color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.875rem' }}>
                  Digital Certificate Verification Portal
                </p>
                <div style={{ width: '100px', height: '3px', backgroundColor: 'var(--accent)', margin: '1rem auto' }}></div>
              </div>

              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2rem' }}>
                CERTIFICATE OF {(cert.certificate_type || 'Achievement').toUpperCase()}
              </h2>

              <p style={{ fontSize: '1.125rem', fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                This is to certify that
              </p>

              <h3 style={{ fontSize: '3rem', fontFamily: 'serif', color: 'var(--text-main)', marginBottom: '1rem', fontWeight: '700' }}>
                {cert.student_name}
              </h3>

              <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '1rem', maxWidth: '80%', margin: '0 auto 1rem' }}>
                has successfully completed the program requirements for
              </p>

              <h4 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '2rem' }}>
                {cert.course}
              </h4>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', padding: '0 2rem' }}>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '1rem', fontWeight: '600', borderBottom: '1px solid black', paddingBottom: '0.25rem', marginBottom: '0.5rem', minWidth: '150px' }}>
                    {cert.issue_date ? new Date(cert.issue_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Date of Issue</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                   <div style={{ border: '4px solid white', boxShadow: '0 0 0 1px var(--border)' }}>
                     <QRCodeSVG value={verifyUrl} size={100} level="H" />
                   </div>
                   <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Scan to Verify</p>
                   <p style={{ fontSize: '0.65rem', fontFamily: 'monospace' }}>ID: {cert.certificate_id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="no-print card" style={{ width: '100%', maxWidth: '350px' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
            Record Information
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.05em' }}>Student ID</div>
              <div style={{ fontWeight: '500' }}>{cert.studentId}</div>
            </div>
            {cert.student_email && (
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.05em' }}>Email</div>
                <div style={{ fontWeight: '500' }}>{cert.student_email}</div>
              </div>
            )}
             <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.05em' }}>Department</div>
              <div style={{ fontWeight: '500' }}>{cert.department || 'N/A'}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.05em' }}>Graduation Year</div>
              <div style={{ fontWeight: '500' }}>{cert.graduationYear}</div>
            </div>
            
            <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '0.5rem 0' }}></div>
            
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.05em' }}>Certificate Hash (SHA-256)</div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.65rem', wordBreak: 'break-all', backgroundColor: 'var(--background)', padding: '0.5rem', borderRadius: '0.25rem', marginTop: '0.25rem' }}>
                {cert.certificate_hash}
              </div>
            </div>

            {cert.status === 'REVOKED' && (
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--danger-light)', borderRadius: '0.5rem', border: '1px solid var(--danger)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)', fontWeight: '600', marginBottom: '0.5rem' }}>
                  <FiAlertCircle /> Certificate Revoked
                </div>
                <div style={{ fontSize: '0.875rem' }}>
                  <strong>Date:</strong> {new Date(cert.revokedAt).toLocaleString()}<br/>
                  <strong>Reason:</strong> {cert.revocationReason || 'No reason provided'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Revoke Modal */}
      {showRevokeModal && (
        <div className="no-print" style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--danger)', marginBottom: '1rem' }}>Revoke Certificate</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              Are you sure you want to revoke this certificate? This action will mark the certificate as invalid for all future verifications. This action cannot be undone.
            </p>
            
            <div className="form-group">
              <label className="form-label">Reason for Revocation</label>
              <textarea 
                className="form-input" 
                rows="3" 
                value={revokeReason} 
                onChange={(e) => setRevokeReason(e.target.value)}
                placeholder="e.g. Issued in error, Academic misconduct..."
                required
              ></textarea>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={() => setShowRevokeModal(false)} className="btn-ghost" disabled={revoking}>Cancel</button>
              <button onClick={handleRevoke} className="btn-danger" disabled={revoking || !revokeReason.trim()}>
                {revoking ? 'Revoking...' : 'Confirm Revocation'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CertificateDetailPage;
