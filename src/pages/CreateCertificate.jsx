import React, { useState } from 'react';
import { createCertificate } from '../services/api';
import CertificateDisplay from '../components/CertificateDisplay';

const CreateCertificate = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    email: '',
    course: '',
    department: '',
    graduationYear: new Date().getFullYear(),
    certificateType: 'Degree',
    issueDate: new Date().toISOString().split('T')[0],
    description: ''
  });
  
  const [createdCertificate, setCreatedCertificate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await createCertificate(formData);
      setCreatedCertificate(response.data.certificate);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create certificate.');
      window.scrollTo(0, 0);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCreatedCertificate(null);
    setFormData({
      ...formData,
      studentName: '',
      studentId: '',
      email: '',
    });
  };

  if (createdCertificate) {
    return (
      <div>
        <div className="alert alert-success" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h3>🎉 Certificate Created Successfully!</h3>
          <p>The certificate has been secured on the database with ID: <strong>{createdCertificate.certificateId}</strong></p>
        </div>
        
        <CertificateDisplay certificate={createdCertificate} />
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button className="btn btn-primary" onClick={resetForm}>
            Issue Another Certificate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Issue New Certificate</h1>
        <p>Fill in the details below to generate a new cryptographically secured digital certificate.</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            
            <h3 style={{ marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              Student Information
            </h3>
            
            <div className="detail-grid" style={{ background: 'none', border: 'none', padding: 0, marginTop: 0 }}>
              <div className="form-group">
                <label className="form-label" htmlFor="studentName">Full Name</label>
                <input
                  id="studentName"
                  name="studentName"
                  type="text"
                  className="form-control"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="studentId">Student ID / Roll Number</label>
                <input
                  id="studentId"
                  name="studentId"
                  type="text"
                  className="form-control"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  placeholder="STU-2026-001"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john.doe@example.com"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="graduationYear">Graduation Year</label>
                <input
                  id="graduationYear"
                  name="graduationYear"
                  type="number"
                  className="form-control"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  required
                  min="1900"
                  max="2100"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="course">Course / Degree</label>
                <input
                  id="course"
                  name="course"
                  type="text"
                  className="form-control"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="department">Department</label>
                <input
                  id="department"
                  name="department"
                  type="text"
                  className="form-control"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  placeholder="Computer Science"
                />
              </div>
            </div>

            <h3 style={{ margin: '2rem 0 1.5rem 0', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              Certificate Information
            </h3>

            <div className="detail-grid" style={{ background: 'none', border: 'none', padding: 0, marginTop: 0 }}>
              <div className="form-group">
                <label className="form-label" htmlFor="certificateType">Certificate Type</label>
                <select
                  id="certificateType"
                  name="certificateType"
                  className="form-control"
                  value={formData.certificateType}
                  onChange={handleChange}
                  required
                >
                  <option value="Degree">Degree</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Merit">Merit Certificate</option>
                  <option value="Completion">Certificate of Completion</option>
                  <option value="Achievement">Certificate of Achievement</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="issueDate">Issue Date</label>
                <input
                  id="issueDate"
                  name="issueDate"
                  type="date"
                  className="form-control"
                  value={formData.issueDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">Additional Description / Honors (Optional)</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="e.g., Summa Cum Laude, Valedictorian"
              ></textarea>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button 
                type="submit" 
                className="btn btn-primary btn-block" 
                disabled={isLoading}
                style={{ padding: '1rem', fontSize: '1.1rem' }}
              >
                {isLoading ? 'Issuing Certificate...' : 'Issue Certificate'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCertificate;
