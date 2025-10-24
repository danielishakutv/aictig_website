import { createContext, useContext, useState, ReactNode } from 'react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface UiContextType {
  toasts: Toast[];
  addToast: (type: Toast['type'], message: string) => void;
  removeToast: (id: string) => void;
  showToast: (message: string, type?: Toast['type']) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export function UiProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const addToast = (type: Toast['type'], message: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };
  
  const showToast = (message: string, type: Toast['type'] = 'info') => {
    addToast(type, message);
  };
  
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };
  
  return (
    <UiContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        showToast,
        mobileMenuOpen,
        setMobileMenuOpen,
      }}
    >
      {children}
    </UiContext.Provider>
  );
}

export function useUi() {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error('useUi must be used within UiProvider');
  }
  return context;
}

// Convenience hook for toast
export function useToast() {
  const { showToast } = useUi();
  return { showToast };
}
