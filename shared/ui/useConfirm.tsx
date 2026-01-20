import React, { useState } from 'react';

import { ConfirmDialog } from './ConfirmDialog';

export interface ConfirmOptions {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  style?: 'success' | 'danger';
}

export function useConfirm() {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({
    title: '',
    style: 'danger',
  });
  const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void) | null>(null);

  const confirm = (opts: ConfirmOptions, onConfirm: () => void) => {
    setOptions(opts);
    setOnConfirmCallback(() => onConfirm);
    setVisible(true);
  };

  const handleConfirm = () => {
    setVisible(false);
    onConfirmCallback?.();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const dialog = (
    <ConfirmDialog
      visible={visible}
      title={options.title}
      message={options.message}
      confirmText={options.confirmText}
      cancelText={options.cancelText}
      style={options.style}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );

  return { confirm, dialog };
}
