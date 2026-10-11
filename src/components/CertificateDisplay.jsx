import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const CertificateDisplay = ({ certificate }) => {
  const certRef = useRef(null);

  if (!certificate) return null;

  const handleDownload = async () => {
    if (certRef.current) {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        backgroundColor: '#ffffff'
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `certificate_${certificate.certificateId}.png`;
      link.click();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleVerify = () => {
    window.open(`/verify/${certificate.certificateId}`, '_blank');
  };

  const formattedDate = new Date(certificate.issueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div>
      <div className="certificate-wrapper" ref={certRef}>
        <div className="certificate-border">
          <div className="certificate-inner-border">
            <div className="cert-header">
              <div className="cert-logo">🔗 CERTICHAIN</div>
              <h1 className="cert-title-main">Certificate of {certificate.certificateType}</h1>
              <div className="cert-subtitle">This is to certify that</div>
            </div>

            <div className="cert-body">
              <h2 className="cert-student-name">{certificate.studentName}</h2>
              <div className="cert-text">has successfully completed the requirements for</div>
              <div className="cert-course">{certificate.course}</div>
              <div className="cert-department">Department of {certificate.department}</div>
            </div>

            <div className="cert-footer-grid">
              <div className="cert-signature">
                <div className="cert-signature-line"></div>
                <div style={{ fontWeight: 600 }}>{certificate.institutionName}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Authorized Signatory</div>
              </div>

              <div className="cert-qr">
                {certificate.qrData && (
                  <img src={certificate.qrData} alt="Certificate QR Code" />
                )}
                <div className="cert-qr-text">Scan to verify</div>
              </div>

              <div className="cert-signature">
                <div className="cert-date">{formattedDate}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Date of Issue</div>
              </div>
            </div>

            <div className="cert-id-stamp">
              ID: {certificate.certificateId} | Status: {certificate.status}
            </div>
            
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '0.8rem', color: '#94a3b8' }}>
              Verify at: {window.location.origin}/verify/{certificate.certificateId}
            </div>
          </div>
        </div>
      </div>

      <div className="cert-actions">
        <button className="btn btn-primary" onClick={handleDownload}>
          Download PNG
        </button>
        <button className="btn btn-secondary" onClick={handlePrint}>
          Print Certificate
        </button>
        <button className="btn btn-outline" onClick={handleVerify}>
          Verify Certificate
        </button>
        <button className="btn btn-outline" onClick={() => window.history.back()}>
          Back
        </button>
      </div>
    </div>
  );
};

export default CertificateDisplay;
