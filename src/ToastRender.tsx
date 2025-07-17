'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from './toast';

const TOAST_CONTAINER_ID = 'CY-toast-root';

interface Toasts {
  id: string;
  content: React.ReactNode;
}

export const ToastRender = () => {
  const [rootDiv, setRootDiv] = useState<HTMLElement | null>();
  const [toasts, setToasts] = useState<Toasts[]>([]);

  const getRootDiv = () => {
    let containerElement = document.getElementById(TOAST_CONTAINER_ID);
    if (!containerElement) {
      containerElement = document.createElement('div');
      containerElement.id = TOAST_CONTAINER_ID;
      document.body.appendChild(containerElement);
    }
    return containerElement;
  };

  const removeRootDiv = () => {
    const containerElement = document.getElementById(TOAST_CONTAINER_ID);
    if (containerElement) containerElement.remove();
  };

  useEffect(() => {
    setRootDiv(getRootDiv());
    const unsubscribe = toast.subscribe(setToasts);
    return () => {
      removeRootDiv();
      unsubscribe();
    };
  }, []);

  if (!rootDiv) return null;

  return createPortal(
    <div className="absolute w-full h-full top-0 left-0 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="absolute w-full h-full top-0 left-0">
          {toast.content}
        </div>
      ))}
    </div>,
    rootDiv
  );
};
