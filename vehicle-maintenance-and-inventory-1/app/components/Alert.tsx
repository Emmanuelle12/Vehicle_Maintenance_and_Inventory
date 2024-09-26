// components/Alert.tsx
import React from 'react';
import styles from './Alert.module.css';

type AlertProps = {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
};

const Alert: React.FC<AlertProps> = ({ message, type = 'info', onClose }) => {
  const getAlertClass = () => {
    switch (type) {
      case 'success':
        return styles.success;
      case 'error':
        return styles.error;
      case 'warning':
        return styles.warning;
      default:
        return styles.info;
    }
  };

  return (
    <div className={`${styles.alert} ${getAlertClass()}`}>
      <span>{message}</span>
      {onClose && (
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
