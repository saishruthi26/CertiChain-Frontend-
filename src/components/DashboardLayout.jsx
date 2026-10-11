import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiHome, FiFileText, FiPlusSquare, FiList, FiUser, FiLogOut } from 'react-icons/fi';

const DashboardLayout = () => {
  const { institution, logout } = useAuth();

  const sidebarStyle = {
    width: '260px',
    backgroundColor: 'var(--sidebar-bg)',
    color: 'white',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 40
  };

  const navLinkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1.5rem',
    color: isActive ? 'white' : '#94a3b8',
    backgroundColor: isActive ? 'var(--sidebar-hover)' : 'transparent',
    borderLeft: isActive ? '4px solid var(--accent)' : '4px solid transparent',
    transition: 'all 0.2s'
  });

  const mainContentStyle = {
    marginLeft: '260px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <div className="no-print">
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: '800', borderBottom: '1px solid #1e293b' }}>
          <span>🎓</span>
          <span>CertiChain</span>
        </div>
        
        <div style={{ padding: '1.5rem 1.5rem 0.5rem' }}>
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: '600', letterSpacing: '0.05em' }}>Logged in as</p>
          <p style={{ fontWeight: '600', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {institution?.institution_name || 'Institution'}
          </p>
        </div>

        <nav style={{ flex: 1, marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <NavLink to="/institution/dashboard" style={navLinkStyle}>
            <FiHome /> Dashboard
          </NavLink>
          <NavLink to="/institution/certificates/create" style={navLinkStyle}>
            <FiPlusSquare /> Create Certificate
          </NavLink>
          <NavLink to="/institution/certificates" style={navLinkStyle} end>
            <FiFileText /> Certificates
          </NavLink>
          <NavLink to="/institution/verification-logs" style={navLinkStyle}>
            <FiList /> Verification Logs
          </NavLink>
          <NavLink to="/institution/profile" style={navLinkStyle}>
            <FiUser /> Profile
          </NavLink>
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid #1e293b' }}>
          <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94a3b8', width: '100%', padding: '0.5rem 0', transition: 'color 0.2s' }}>
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={mainContentStyle}>
        <div style={{ padding: '2rem', flex: 1, backgroundColor: 'var(--background)' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
