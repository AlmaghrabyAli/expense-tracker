import React from 'react';
import { Toaster as HotToaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export function Toaster() {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <HotToaster
      position={isRtl ? 'top-left' : 'top-right'}
      toastOptions={{
        duration: 3500,
        style: {
          background: '#FFFFFF',
          color: '#0F172A',
          boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '12px 16px',
          fontSize: '13px',
          fontWeight: 600,
        },
        success: {
          iconTheme: {
            primary: '#047857',
            secondary: '#FFFFFF',
          },
        },
        error: {
          iconTheme: {
            primary: '#E11D48',
            secondary: '#FFFFFF',
          },
        },
      }}
    />
  );
}

export default Toaster;
