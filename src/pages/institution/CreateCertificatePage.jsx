import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const CreateCertificatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    studentEmail: '',
    course: '',
    department: '',
    graduationYear: new Date().getFullYear(),
    certificateType: 'Degree Certificate',
    issueDate: new Date().toISOString().split('T')[0],
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!formData.studentName || !formData.studentId || !formData.course || !formData.certificateType || !formData.issueDate) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/certificates', formData);
      const cert = response.data.data;
      navigate(`/institution/certificates/${cert.certificate_id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to issue certificate. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--text-main)' }}>Issue Certificate</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Create a new digitally verifiable certificate with SHA-256 tamper-evident hashing.
        </p>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#fef2f2', color: '#dc2626', padding: '1rem',
          borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid #fecaca',
          display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Student Information */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{
            fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem',
            paddingBottom: '1rem', borderBottom: '1px solid var(--border)',
            color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            👤 Student Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Student Full Name *</label>
              <input
                type="text"
                name="studentName"
                className="form-input"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="e.g. Rahul Kumar"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Student ID / Roll Number *</label>
              <input
                type="text"
                name="studentId"
                className="form-input"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="e.g. STU2026001"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="studentEmail"
                className="form-input"
                value={formData.studentEmail}
                onChange={handleChange}
                placeholder="student@example.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Course / Degree *</label>
              <input
                type="text"
                name="course"
                className="form-input"
                value={formData.course}
                onChange={handleChange}
                placeholder="e.g. B.Tech Computer Science"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <input
                type="text"
                name="department"
                className="form-input"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. Computer Science & Engineering"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Graduation Year</label>
              <input
                type="number"
                name="graduationYear"
                className="form-input"
                value={formData.graduationYear}
                onChange={handleChange}
                min="2000"
                max="2100"
              />
            </div>
          </div>
        </div>

        {/* Certificate Information */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{
            fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem',
            paddingBottom: '1rem', borderBottom: '1px solid var(--border)',
            color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            📜 Certificate Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Certificate Type *</label>
              <select
                name="certificateType"
                className="form-input"
                value={formData.certificateType}
                onChange={handleChange}
                required
              >
                <option value="Degree Certificate">Degree Certificate</option>
                <option value="Diploma">Diploma</option>
                <option value="Merit Certificate">Merit Certificate</option>
                <option value="Course Completion">Course Completion</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Issue Date *</label>
              <input
                type="date"
                name="issueDate"
                className="form-input"
                value={formData.issueDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Additional Description (Optional)</label>
            <textarea
              name="description"
              className="form-input"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              placeholder="Any specific achievements, honors, CGPA, etc."
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button
            type="button"
            onClick={() => navigate('/institution/certificates')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ minWidth: '180px' }}
          >
            {loading ? '⏳ Issuing Certificate...' : '🎓 Issue Certificate'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCertificatePage;
