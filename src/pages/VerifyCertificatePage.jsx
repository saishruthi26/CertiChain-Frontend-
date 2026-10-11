import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyCertificatePage = () => {
  const [activeTab, setActiveTab] = useState('id');
  const [certificateId, setCertificateId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    if (!certificateId.trim()) return;
    
    setIsLoading(true);
    // Simulate slight delay for UX
    setTimeout(() => {
      navigate(`/verify/${certificateId.trim()}`);
    }, 500);
  };

  return (
    <div className="verify-container">
      <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>Verify Certificate</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Check the authenticity of any digital certificate issued through CertiChain.
      </p>

      <div className="card">
        <div className="verify-tabs">
          <button 
            className={`verify-tab ${activeTab === 'id' ? 'active' : ''}`}
            onClick={() => setActiveTab('id')}
          >
            Enter Certificate ID
          </button>
          <button 
            className={`verify-tab ${activeTab === 'qr' ? 'active' : ''}`}
            onClick={() => setActiveTab('qr')}
          >
            Scan QR Code
          </button>
        </div>

        <div className="card-body">
          {activeTab === 'id' ? (
            <form onSubmit={handleVerify}>
              <div className="verify-input-group">
                <label className="form-label" htmlFor="certificateId">Certificate ID</label>
                <input
                  id="certificateId"
                  type="text"
                  className="form-control verify-input-large"
                  placeholder="e.g., CERT-2026-000001"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  required
                />
                <button 
                  type="submit" 
                  className="btn btn-primary btn-block" 
                  style={{ padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }}
                  disabled={isLoading || !certificateId.trim()}
                >
                  {isLoading ? 'Verifying...' : 'Verify Now'}
                </button>
              </div>
            </form>
          ) : (
            <div className="qr-scanner-box">
              <div className="qr-icon">📱</div>
              <h3>Scan with your phone</h3>
              <p style={{ marginTop: '1rem' }}>
                Open your smartphone camera and point it at the QR code on the certificate.
                It will automatically open the verification page.
              </p>
              <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                <p>Alternatively, enter the ID manually:</p>
                <button 
                  className="btn btn-outline" 
                  onClick={() => setActiveTab('id')}
                  style={{ marginTop: '0.5rem' }}
                >
                  Switch to ID Entry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificatePage;
