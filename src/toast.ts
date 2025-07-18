import React from 'react';

export interface ToastContext {
  isOpening: boolean;
  isClosing: boolean;
  index: number;
  close: () => void;
}

export interface Toast {
  id: string;
  isOpening: boolean;
  isClosing: boolean;
  close: () => void;
  content: (toast: ToastContext) => React.ReactNode;
}

let toasts: Toast[] = [];
let listeners: ((nodes: Toast[]) => void)[] = [];

const renderToasts = () => {
  listeners.forEach((l) => l(toasts));
};

const updateProps = (id: string, updated: Partial<Toast>) => {
  toasts = toasts.map((t) => (t.id === id ? { ...t, ...updated } : t));
  renderToasts();
};

export const toast = {
  run(
    content: (toast: ToastContext) => React.ReactNode,
    options?: {
      duration?: number;
      closeDuration?: number;
      openDuration?: number;
    }
  ) {
    const id = `T-${Math.ceil(Math.random() * 100000000)}`;
    const duration = options?.duration ?? 3000;
    const closeDuration = options?.closeDuration ?? 0;
    const openDuration = options?.openDuration ?? 0;

    const close = () => toast.close(id, closeDuration);

    const newToast: Toast = {
      id,
      isClosing: false,
      isOpening: true,
      close,
      content,
    };

    toasts = [...toasts, newToast];
    renderToasts();

    setTimeout(() => {
      updateProps(id, { isOpening: false });
    }, openDuration);

    setTimeout(() => {
      close();
    }, duration);
  },
  close(id: string, closeDuration: number) {
    updateProps(id, { isClosing: true });
    setTimeout(() => {
      toasts = toasts.filter((t) => t.id !== id);
      renderToasts();
    }, closeDuration);
  },
  _connect(setToasts: (nodes: Toast[]) => void) {
    listeners.push(setToasts);
    setToasts(toasts);
    return () => {
      listeners = listeners.filter((l) => l !== setToasts);
    };
  },
};
