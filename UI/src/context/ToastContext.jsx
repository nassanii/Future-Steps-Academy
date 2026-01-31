import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/Toast';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', onConfirm = null) => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, message, type, onConfirm }]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    // Helper functions for common types
    const success = (message) => addToast(message, 'success');
    const error = (message) => addToast(message, 'error');
    const info = (message) => addToast(message, 'info');
    const confirm = (message, onConfirm) => addToast(message, 'confirm', onConfirm);

    const confirmToasts = toasts.filter(t => t.type === 'confirm');
    const standardToasts = toasts.filter(t => t.type !== 'confirm');

    return (
        <ToastContext.Provider value={{ addToast, removeToast, success, error, info, confirm }}>
            {children}

            {/* Standard Toasts (Bottom Right) */}
            <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
                {standardToasts.map(toast => (
                    <div key={toast.id} className="pointer-events-auto">
                        <Toast
                            id={toast.id}
                            message={toast.message}
                            type={toast.type}
                            onClose={removeToast}
                            onConfirm={toast.onConfirm}
                        />
                    </div>
                ))}
            </div>

            {/* Confirmation Toasts (Center Modal) */}
            {confirmToasts.length > 0 && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="flex flex-col gap-4">
                        {confirmToasts.map(toast => (
                            <div key={toast.id} className="animate-in zoom-in-95 duration-200">
                                <Toast
                                    id={toast.id}
                                    message={toast.message}
                                    type={toast.type}
                                    onClose={removeToast}
                                    onConfirm={toast.onConfirm}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
