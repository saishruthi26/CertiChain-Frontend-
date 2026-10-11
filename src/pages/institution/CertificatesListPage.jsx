import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import { FiEye, FiSearch, FiFilter } from 'react-icons/fi';

const CertificatesListPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await api.get('/certificates');
        setCertificates(response.data.data || []);
      } catch (error) {
        console.error('Error fetching certificates', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const filteredCerts = certificates.filter(cert => {
    const matchesSearch =
      cert.certificate_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.course?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'ALL' || cert.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--text-main)' }}>Certificates</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage all certificates issued by your institution.</p>
        </div>
        <Link to="/institution/certificates/create" className="btn-primary">Issue New Certificate</Link>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <FiSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search by ID or Student Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
          <div style={{ position: 'relative' }}>
             <FiFilter style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
             <select 
               className="form-input" 
               value={filter} 
               onChange={(e) => setFilter(e.target.value)}
               style={{ paddingLeft: '2.5rem', appearance: 'none', minWidth: '150px' }}
             >
               <option value="ALL">All Status</option>
               <option value="VALID">Valid</option>
               <option value="REVOKED">Revoked</option>
             </select>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}><LoadingSpinner /></div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Certificate ID</th>
                  <th>Student Name</th>
                  <th>Course</th>
                  <th>Issue Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCerts.length > 0 ? (
                  filteredCerts.map((cert) => (
                    <tr key={cert.certificate_id}>
                      <td style={{ fontFamily: 'monospace', fontWeight: '500' }}>{cert.certificate_id}</td>
                      <td>{cert.student_name}</td>
                      <td>{cert.course}</td>
                      <td>{cert.issue_date ? new Date(cert.issue_date).toLocaleDateString('en-IN') : '-'}</td>
                      <td><StatusBadge status={cert.status} /></td>
                      <td>
                        <Link to={`/institution/certificates/${cert.certificate_id}`} className="btn-ghost" style={{ padding: '0.5rem' }} title="View">
                          <FiEye />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      No certificates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatesListPage;
