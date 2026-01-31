import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({ id, message, type = 'info', onClose, onConfirm }) => {
    useEffect(() => {
        if (onConfirm) return; // Don't auto-close confirmation toasts

        const timer = setTimeout(() => {
            onClose(id);
        }, 5000);

        return () => clearTimeout(timer);
    }, [id, onClose, onConfirm]);

    const icons = {
        success: <CheckCircle size={20} className="text-emerald-400" />,
        error: <AlertCircle size={20} className="text-red-400" />,
        info: <Info size={20} className="text-blue-400" />,
        confirm: <AlertCircle size={20} className="text-amber-400" />
    };

    const styles = {
        success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-100",
        error: "bg-red-500/10 border-red-500/20 text-red-100",
        info: "bg-blue-500/10 border-blue-500/20 text-blue-100",
        confirm: "bg-amber-500/10 border-amber-500/20 text-amber-100"
    };

    return (
        <div className={`flex flex-col gap-3 p-4 rounded-xl border backdrop-blur-md shadow-xl min-w-[320px] max-w-md animate-in slide-in-from-right fade-in duration-300 ${styles[type] || styles.info}`}>
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                    {icons[type] || icons.info}
                </div>
                <div className="flex-1 text-sm font-medium">
                    {message}
                </div>
                {!onConfirm && (
                    <button
                        onClick={() => onClose(id)}
                        className="flex-shrink-0 text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
            {onConfirm && (
                <div className="flex justify-end gap-2 mt-1">
                    <button
                        onClick={() => onClose(id)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose(id);
                        }}
                        className="px-3 py-1.5 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors shadow-lg shadow-red-500/20"
                    >
                        Confirm
                    </button>
                </div>
            )}
        </div>
    );
};

export default Toast;
