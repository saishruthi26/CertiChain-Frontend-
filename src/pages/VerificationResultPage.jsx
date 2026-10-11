import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { verifyCertificate } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const VerificationResultPage = () => {
  const { certificateId } = useParams();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerification = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await verifyCertificate(certificateId);
        setResult(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setResult({ status: 'NOT_FOUND' });
        } else if (err.response && err.response.data) {
          setError(err.response.data.message || 'Verification failed due to an error');
        } else {
          setError('Network error or server is unreachable');
        }
      } finally {
        setLoading(false);
      }
    };

    if (certificateId) {
      fetchVerification();
    }
  }, [certificateId]);

  if (loading) return <LoadingSpinner fullPage />;

  if (error) {
    return (
      <div className="verify-container">
        <div className="alert alert-danger">{error}</div>
        <Link to="/verify" className="btn btn-primary">Try Another</Link>
      </div>
    );
  }

  const renderResultContent = () => {
    switch (result?.status) {
      case 'VALID':
        return (
          <div className="card result-card result-valid">
            <div className="result-icon">✅</div>
            <h2 className="result-title">Certificate Verified Successfully</h2>
            <p>This certificate is authentic and issued by a recognized institution.</p>
            {renderDetails()}
          </div>
        );
      case 'REVOKED':
        return (
          <div className="card result-card result-revoked">
            <div className="result-icon">❌</div>
            <h2 className="result-title">Certificate Has Been Revoked</h2>
            <p>This certificate was revoked by the issuing institution and is no longer valid.</p>
            {result.verificationResult?.revocationReason && (
              <div className="alert alert-danger" style={{ marginTop: '1rem', textAlign: 'left' }}>
                <strong>Reason:</strong> {result.verificationResult.revocationReason}
              </div>
            )}
            {renderDetails()}
          </div>
        );
      case 'TAMPERED':
        return (
          <div className="card result-card result-tampered">
            <div className="result-icon">⚠️</div>
            <h2 className="result-title">Integrity Check Failed</h2>
            <p>The certificate data has been tampered with or modified after issuance. This certificate is NOT valid.</p>
          </div>
        );
      case 'NOT_FOUND':
      default:
        return (
          <div className="card result-card result-not-found">
            <div className="result-icon">🔍</div>
            <h2 className="result-title">Certificate Not Found</h2>
            <p>No certificate with ID <strong>{certificateId}</strong> exists in the CertiChain network.</p>
            <p>Please check the ID and try again.</p>
          </div>
        );
    }
  };

  const renderDetails = () => {
    const cert = result?.certificate;
    if (!cert) return null;

    return (
      <div className="detail-grid">
        <div className="detail-item">
          <span className="detail-label">Certificate ID</span>
          <span className="detail-value">{cert.certificateId}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Status</span>
          <span className="detail-value">
            <span className={`badge ${cert.status === 'VALID' ? 'badge-success' : 'badge-danger'}`}>
              {cert.status}
            </span>
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Student Name</span>
          <span className="detail-value">{cert.studentName}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Course / Degree</span>
          <span className="detail-value">{cert.course}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Department</span>
          <span className="detail-value">{cert.department}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Issuing Institution</span>
          <span className="detail-value">{cert.institutionName}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Issue Date</span>
          <span className="detail-value">{new Date(cert.issueDate).toLocaleDateString()}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Certificate Type</span>
          <span className="detail-value">{cert.certificateType}</span>
        </div>
        <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
          <span className="detail-label">Integrity Status</span>
          <span className="detail-value" style={{ color: 'var(--success)' }}>
            ✓ Cryptographic Hash Verified
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="verify-container">
      {renderResultContent()}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/verify" className="btn btn-outline">Verify Another Certificate</Link>
      </div>
    </div>
  );
};

export default VerificationResultPage;
