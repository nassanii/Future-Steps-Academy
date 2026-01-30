import React, { useState, useEffect } from 'react';
import { X, Building2, Save } from 'lucide-react';

const DepartmentModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        departmentName: '',
        department_Code: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                departmentName: initialData.departmentName || '',
                department_Code: initialData.department_Code || ''
            });
        } else {
            setFormData({
                departmentName: '',
                department_Code: ''
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">
                                {initialData ? 'Edit Department' : 'Add New Department'}
                            </h2>
                            <p className="text-slate-400 text-xs">
                                {initialData ? 'Update department details' : 'Create a new department'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Department Name</label>
                        <input
                            type="text"
                            required
                            value={formData.departmentName}
                            onChange={(e) => setFormData({ ...formData, departmentName: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600"
                            placeholder="e.g. Computer Science"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Department Code</label>
                        <input
                            type="text"
                            required
                            value={formData.department_Code}
                            onChange={(e) => setFormData({ ...formData, department_Code: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600"
                            placeholder="e.g. CS"
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white font-medium transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {initialData ? 'Save Changes' : 'Create Department'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DepartmentModal;
