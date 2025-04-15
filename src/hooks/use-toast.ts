
import * as React from "react"
import { useState, useCallback } from "react"

type Toast = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
  open: boolean;
}

type ToastActionType = (props: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
}) => { 
  id: string; 
  dismiss: () => void; 
  update: (props: Partial<Toast>) => void 
};

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 1000000;

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast: ToastActionType = useCallback((props) => {
    const id = generateId();

    const newToast: Toast = {
      id,
      open: true,
      ...props
    };

    setToasts((currentToasts) => 
      [newToast, ...currentToasts].slice(0, TOAST_LIMIT)
    );

    const dismiss = () => {
      setToasts((currentToasts) => 
        currentToasts.filter(t => t.id !== id)
      );
    };

    const update = (updateProps: Partial<Toast>) => {
      setToasts((currentToasts) => 
        currentToasts.map(t => 
          t.id === id ? { ...t, ...updateProps } : t
        )
      );
    };

    return { id, dismiss, update };
  }, []);

  const dismiss = useCallback((toastId?: string) => {
    if (toastId) {
      setToasts((currentToasts) => 
        currentToasts.filter(t => t.id !== toastId)
      );
    } else {
      setToasts([]);
    }
  }, []);

  return { toasts, toast, dismiss };
}

export const toast: ToastActionType = (props) => {
  const id = generateId();
  console.warn('Global toast called', props);
  return { 
    id, 
    dismiss: () => {}, 
    update: () => {} 
  };
};

