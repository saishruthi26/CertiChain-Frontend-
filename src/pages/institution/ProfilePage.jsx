import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FiLogOut, FiEdit3 } from 'react-icons/fi';

const ProfilePage = () => {
  const { institution, logout } = useAuth();

  if (!institution) return null;

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--text-main)' }}>Institution Profile</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your institution details and account settings.</p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
           <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
             <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: '700' }}>
               {institution.name.charAt(0)}
             </div>
             <div>
               <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{institution.name}</h2>
               <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 Code: <span style={{ fontFamily: 'monospace', fontWeight: '600', color: 'var(--text-main)' }}>{institution.code}</span>
               </p>
             </div>
           </div>
           <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
             <FiEdit3 /> Edit
           </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Contact Information</h3>
            <div style={{ padding: '1rem', backgroundColor: 'var(--background)', borderRadius: '0.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Email Address</div>
                <div style={{ fontWeight: '500' }}>{institution.email}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Phone Number</div>
                <div style={{ fontWeight: '500' }}>{institution.phone || 'Not provided'}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Account Details</h3>
            <div style={{ padding: '1rem', backgroundColor: 'var(--background)', borderRadius: '0.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Member Since</div>
                <div style={{ fontWeight: '500' }}>{new Date(institution.createdAt || Date.now()).toLocaleDateString()}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Plan</div>
                <div style={{ display: 'inline-block', padding: '0.25rem 0.5rem', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: '600' }}>
                  Enterprise Plus
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ border: '1px solid var(--danger-light)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--danger)', marginBottom: '1rem' }}>Danger Zone</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="btn-danger" style={{ backgroundColor: 'transparent', color: 'var(--danger)', border: '1px solid var(--danger)' }}>
          Delete Account
        </button>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
         <button onClick={logout} className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
           <FiLogOut /> Sign Out
         </button>
      </div>
    </div>
  );
};

export default ProfilePage;
