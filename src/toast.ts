interface Toast {
  id: string;
  content: React.ReactNode;
  duration: number;
  closing?: boolean;
}

let toasts: Toast[] = [];
let listeners: ((toasts: Toast[]) => void)[] = [];

const notify = () => listeners.forEach((fn) => fn(toasts));

export const toast = {
  run(
    content: React.ReactNode,
    options?: { duration?: number; closeTrigger?: boolean }
  ) {
    const id = `T-${Math.ceil(Math.random() * 100000000)}`;
    const newToast = { id, content, duration: options?.duration ?? 0 };
    toasts = [...toasts, newToast];
    notify();

    setTimeout(() => {
      toasts = toasts.filter((t) => t.id !== id);
      notify();
    }, newToast.duration);
  },
  subscribe(fn: (toasts: Toast[]) => void) {
    listeners.push(fn);
    fn(toasts);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  },
};
