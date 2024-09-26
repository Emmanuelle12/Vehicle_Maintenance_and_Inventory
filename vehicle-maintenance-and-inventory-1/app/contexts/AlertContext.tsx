// context/AlertContext.tsx
'use client'; // Required for client-side context

import React, { createContext, useContext, useState } from 'react';
import Alert from '../components/Alert';

type AlertContextType = {
  triggerAlert: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('info');

  const triggerAlert = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000); // Hide the alert after 3 seconds
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  return (
    <AlertContext.Provider value={{ triggerAlert }}>
      {children}
      {alertVisible && (
        <Alert message={alertMessage} type={alertType} onClose={handleCloseAlert} />
      )}
    </AlertContext.Provider>
  );
};
