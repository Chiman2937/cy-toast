'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast, Toasts } from './toast';

const TOAST_CONTAINER_ID = 'CY-toast-root';

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
    const disconnect = toast._connect(setToasts);
    return () => {
      removeRootDiv();
      disconnect();
    };
  }, []);

  if (!rootDiv) return null;
  return createPortal(
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        pointerEvents: 'none',
      }}
    >
      {toasts.map((t) => (
        <div key={t.props.id} style={{ pointerEvents: 'auto' }}>
          {t.toast.content(t.props)}
        </div>
      ))}
    </div>,
    rootDiv
  );
};
