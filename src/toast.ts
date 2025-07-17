import React from 'react';

type ToastContent = React.ReactNode | ((close: () => void) => React.ReactNode);

interface Toast {
  id: string;
  content: React.ReactNode;
  duration: number;
}

let toasts: Toast[] = [];
let listeners: ((toasts: Toast[]) => void)[] = [];

export const toast = {
  run(content: ToastContent, options?: { duration?: number }) {
    const id = `T-${Math.ceil(Math.random() * 100000000)}`;
    const close = () => toast.close(id);
    const node = typeof content === 'function' ? content(close) : content;
    const newToast = { id, content: node, duration: options?.duration ?? 3000 };
    toasts = [...toasts, newToast];
    toast._update();
    setTimeout(close, newToast.duration);
  },
  close(id: string) {
    const toastIndex = toasts.findIndex((t) => t.id === id);
    if (toastIndex === -1) return;
    toasts = toasts.filter((t) => t.id !== id);
    toast._update();
  },
  _connect(setToasts: (toasts: Toast[]) => void) {
    listeners.push(setToasts);
    setToasts(toasts);
    return () => {
      listeners = listeners.filter((l) => l !== setToasts);
    };
  },
  _update() {
    listeners.forEach((setToasts) => setToasts(toasts));
  },
};
