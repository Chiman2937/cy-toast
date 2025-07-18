import React from 'react';

type ToastContentProps = {
  id: string;
  duration: number;
  closeDuration: number;
  isClosing: boolean;
  close: () => void;
};

type ToastContent = (props: ToastContentProps) => React.ReactNode;

export interface Toast {
  content: ToastContent;
}

export interface Toasts {
  toast: Toast;
  props: ToastContentProps;
}

// type ToastKey = keyof Toast;

let toasts: Toasts[] = [];
let listeners: ((nodes: Toasts[]) => void)[] = [];

const renderToasts = () => {
  listeners.forEach((l) => l(toasts));
};

const updateProps = (id: string, updated: Partial<ToastContentProps>) => {
  toasts = toasts.map((t) =>
    t.props.id === id ? { ...t, props: { ...t.props, ...updated } } : t
  );
  renderToasts();
};

export const toast = {
  run(
    content: ToastContent,
    options?: { duration?: number; closeDuration?: number }
  ) {
    const id = `T-${Math.ceil(Math.random() * 100000000)}`;
    const duration = options?.duration ?? 3000;
    const closeDuration = options?.closeDuration ?? 0;

    const close = () => toast.close(id);

    const toastData = {
      toast: { content },
      props: {
        id,
        duration,
        closeDuration,
        isClosing: false,
        close,
      },
    };

    toasts = [...toasts, toastData];
    renderToasts();

    setTimeout(() => {
      updateProps(id, { isClosing: true });
      setTimeout(() => {
        close();
      }, closeDuration);
    }, duration);
  },
  close(id: string) {
    toasts = toasts.filter((t) => t.props.id !== id);
    renderToasts();
  },
  _connect(setToasts: (nodes: Toasts[]) => void) {
    listeners.push(setToasts);
    setToasts(toasts);
    return () => {
      listeners = listeners.filter((l) => l !== setToasts);
    };
  },
};
