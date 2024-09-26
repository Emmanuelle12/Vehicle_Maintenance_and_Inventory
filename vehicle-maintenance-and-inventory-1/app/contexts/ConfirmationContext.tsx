// context/ConfirmationContext.tsx
'use client'; // Required for client-side context

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ConfirmationOptions = {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

type ConfirmationContextType = {
  confirm: (options: ConfirmationOptions) => void;
};

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined);

export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error('useConfirmation must be used within a ConfirmationProvider');
  }
  return context;
};

export const ConfirmationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});
  const [onCancel, setOnCancel] = useState<() => void>(() => {});

  const confirm = (options: ConfirmationOptions) => {
    setMessage(options.message);
    setOnConfirm(() => options.onConfirm);
    setOnCancel(() => options.onCancel || (() => {}));
    setIsOpen(true);
  };

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  const handleCancel = () => {
    onCancel();
    setIsOpen(false);
  };

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}
      {isOpen && (
        <div className="confirmation-dialog">
          <div className="confirmation-content">
            <p>{message}</p>
            <div className="confirmation-actions">
              <button onClick={handleConfirm}>Confirm</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </ConfirmationContext.Provider>
  );
};
