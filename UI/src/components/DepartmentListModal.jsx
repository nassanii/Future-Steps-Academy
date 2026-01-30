import React from 'react';
import { X, Building2 } from 'lucide-react';

const DepartmentListModal = ({ isOpen, onClose, title = "Departments", subtitle, departments }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">{title}</h2>
                            {subtitle && <p className="text-slate-400 text-xs">{subtitle}</p>}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
                    {/* Departments Section */}
                    <div className="space-y-2">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Building2 className="w-3 h-3" /> Assigned Departments
                        </h3>
                        {departments && departments.length > 0 ? (
                            <div className="space-y-3">
                                {departments.map((dept, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl">
                                        <span className="text-slate-200 font-medium">
                                            {dept.departmentName || dept.name || `Department ${index + 1}`}
                                        </span>
                                        {dept.department_Code && (
                                            <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded font-mono">
                                                {dept.department_Code}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6 bg-white/5 rounded-xl border border-white/5 border-dashed">
                                <p className="text-slate-500 text-sm">No departments assigned.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-zinc-900/50 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DepartmentListModal;
