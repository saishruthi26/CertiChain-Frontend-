import React from 'react';
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiSearch } from 'react-icons/fi';

const StatusBadge = ({ status }) => {
  let colorClass = '';
  let icon = null;
  let text = '';

  switch (status) {
    case 'VALID':
      colorClass = 'badge-valid';
      icon = <FiCheckCircle />;
      text = 'Valid';
      break;
    case 'REVOKED':
      colorClass = 'badge-revoked';
      icon = <FiXCircle />;
      text = 'Revoked';
      break;
    case 'TAMPERED':
      colorClass = 'badge-tampered';
      icon = <FiAlertTriangle />;
      text = 'Tampered';
      break;
    case 'NOT_FOUND':
    default:
      colorClass = 'badge-not-found';
      icon = <FiSearch />;
      text = 'Not Found';
      break;
  }

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const colors = {
    'badge-valid': { bg: 'var(--success-light)', color: 'var(--success)' },
    'badge-revoked': { bg: 'var(--danger-light)', color: 'var(--danger)' },
    'badge-tampered': { bg: 'var(--warning-light)', color: 'var(--warning)' },
    'badge-not-found': { bg: '#f1f5f9', color: '#64748b' }
  };

  const style = { ...badgeStyle, backgroundColor: colors[colorClass].bg, color: colors[colorClass].color };

  return (
    <span style={style}>
      {icon}
      {text}
    </span>
  );
};

export default StatusBadge;
