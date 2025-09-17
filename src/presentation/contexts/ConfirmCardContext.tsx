import React, { createContext, ReactNode, useContext, useState } from "react";
import { ConfirmCard, ConfirmType } from "../components/common/ConfirmCard";

interface ConfirmCardState {
  visible: boolean;
  title: string;
  message: string;
  type: ConfirmType;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText: string;
  cancelText: string;
  showCancel: boolean;
}

interface ConfirmCardContextType {
  showConfirm: (config: Omit<ConfirmCardState, 'visible'>) => void;
  showError: (title: string, message: string, onConfirm?: () => void) => void;
  showSuccess: (title: string, message: string, onConfirm?: () => void) => void;
  showWarning: (title: string, message: string, onConfirm?: () => void, onCancel?: () => void) => void;
  showInfo: (title: string, message: string, onConfirm?: () => void) => void;
  showCustomConfirm: (title: string, message: string, confirmText: string, cancelText: string, onConfirm?: () => void, onCancel?: () => void) => void;
  hideConfirm: () => void;
}

const ConfirmCardContext = createContext<ConfirmCardContextType | undefined>(undefined);

interface ConfirmCardProviderProps {
  children: ReactNode;
}

export function ConfirmCardProvider({ children }: ConfirmCardProviderProps) {
  const [state, setState] = useState<ConfirmCardState>({
    visible: false,
    title: '',
    message: '',
    type: 'confirm',
    confirmText: 'OK',
    cancelText: 'Batal',
    showCancel: true,
  });

  const showConfirm = (config: Omit<ConfirmCardState, 'visible'>) => {
    setState({
      ...config,
      visible: true,
    });
  };

  const showError = (title: string, message: string, onConfirm?: () => void) => {
    setState({
      visible: true,
      title,
      message,
      type: 'error',
      onConfirm: () => {
        hideConfirm();
        onConfirm?.();
      },
      confirmText: 'OK',
      cancelText: 'Batal',
      showCancel: false,
    });
  };

  const showSuccess = (title: string, message: string, onConfirm?: () => void) => {
    setState({
      visible: true,
      title,
      message,
      type: 'success',
      onConfirm: () => {
        hideConfirm();
        onConfirm?.();
      },
      confirmText: 'OK',
      cancelText: 'Batal',
      showCancel: false,
    });
  };

  const showWarning = (title: string, message: string, onConfirm?: () => void, onCancel?: () => void) => {
    setState({
      visible: true,
      title,
      message,
      type: 'warning',
      onConfirm: () => {
        hideConfirm();
        onConfirm?.();
      },
      onCancel: () => {
        hideConfirm();
        onCancel?.();
      },
      confirmText: 'Ya',
      cancelText: 'Batal',
      showCancel: true,
    });
  };

  const showInfo = (title: string, message: string, onConfirm?: () => void) => {
    setState({
      visible: true,
      title,
      message,
      type: 'info',
      onConfirm: () => {
        hideConfirm();
        onConfirm?.();
      },
      confirmText: 'OK',
      cancelText: 'Batal',
      showCancel: false,
    });
  };

  const showCustomConfirm = (title: string, message: string, confirmText: string, cancelText: string, onConfirm?: () => void, onCancel?: () => void) => {
    setState({
      visible: true,
      title,
      message,
      type: 'confirm',
      onConfirm: () => {
        hideConfirm();
        onConfirm?.();
      },
      onCancel: () => {
        hideConfirm();
        onCancel?.();
      },
      confirmText,
      cancelText,
      showCancel: true,
    });
  };

  const hideConfirm = () => {
    setState(prev => ({ ...prev, visible: false }));
  };

  const handleConfirm = () => {
    state.onConfirm?.();
  };

  const handleCancel = () => {
    state.onCancel?.();
    hideConfirm();
  };

  return (
    <ConfirmCardContext.Provider
      value={{
        showConfirm,
        showError,
        showSuccess,
        showWarning,
        showInfo,
        showCustomConfirm,
        hideConfirm,
      }}
    >
      {children}
      <ConfirmCard
        visible={state.visible}
        title={state.title}
        message={state.message}
        type={state.type}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText={state.confirmText}
        cancelText={state.cancelText}
        showCancel={state.showCancel}
      />
    </ConfirmCardContext.Provider>
  );
}

export function useConfirmCard() {
  const context = useContext(ConfirmCardContext);
  if (context === undefined) {
    throw new Error('useConfirmCard must be used within a ConfirmCardProvider');
  }
  return context;
}