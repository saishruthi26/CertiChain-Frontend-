import React, { useState, useEffect } from 'react';
import { getMe } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getMe();
        setUser(response.data);
      } catch (err) {
        setError('Failed to load profile details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <LoadingSpinner fullPage />;

  if (error) return <div className="alert alert-danger">{error}</div>;

  if (!user) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Institution Profile</h1>

      <div className="card">
        <div className="card-body" style={{ padding: '2.5rem' }}>
          
          <div className="profile-header">
            <div className="profile-avatar">
              {user.institutionName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ marginBottom: '0.25rem' }}>{user.institutionName}</h2>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                Registered CertiChain Issuer
              </p>
            </div>
          </div>

          <div style={{ margin: '2rem 0' }}>
            <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
              Account Information
            </h3>
            
            <div className="detail-grid" style={{ background: 'none', border: 'none', padding: 0, marginTop: 0 }}>
              <div className="detail-item">
                <span className="detail-label">Institution Code</span>
                <span className="detail-value">{user.institutionCode}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email Address</span>
                <span className="detail-value">{user.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone Number</span>
                <span className="detail-value">{user.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Member Since</span>
                <span className="detail-value">
                  {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
          
          <div className="alert alert-info" style={{ backgroundColor: 'var(--info-bg)', color: 'var(--info-text)', borderColor: '#bfdbfe' }}>
            <h4 style={{ color: 'var(--info-text)', marginBottom: '0.5rem' }}>Read-only View</h4>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              Your institution details are currently managed by system administrators. 
              To request changes to your profile information, please contact CertiChain support.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
