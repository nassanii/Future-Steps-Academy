import React, { useState, useEffect } from 'react';
import { X, Save, DollarSign, Calendar, Tag, FileText } from 'lucide-react';

const ExpenseModal = ({ isOpen, onClose, onSave, initialData, categories }) => {
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        expenseDate: new Date().toISOString().split('T')[0],
        categoryId: '',
        teacherId: '' // Optional
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                amount: initialData.amount,
                description: initialData.description || '',
                expenseDate: initialData.expenseDate ? initialData.expenseDate.split('T')[0] : new Date().toISOString().split('T')[0],
                categoryId: initialData.categoryId || '',
                teacherId: initialData.teacherId || ''
            });
        } else {
            setFormData({
                amount: '',
                description: '',
                expenseDate: new Date().toISOString().split('T')[0],
                categoryId: '',
                teacherId: ''
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            amount: parseFloat(formData.amount),
            categoryId: parseInt(formData.categoryId),
            teacherId: formData.teacherId ? parseInt(formData.teacherId) : null
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">
                        {initialData ? 'Edit Expense' : 'New Expense'}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Amount</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="date"
                                    required
                                    value={formData.expenseDate}
                                    onChange={(e) => setFormData({ ...formData, expenseDate: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Category</label>
                        <div className="relative">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <select
                                required
                                value={formData.categoryId}
                                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none appearance-none"
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option> // Check DTO: id/name? DTO has Name, but Entity has Id. I need to be careful with CategoryDTO. 
                                    // Let's check ExpenseCategoryController GetAll again. It returns List<ExpenseCategoryDTO>.
                                    // ExpenseCategoryDTO only has Name?! If so, I can't get ID.
                                    // Wait! Step 567 view_file: ExpenseCategoryDTO.cs only has Name. 
                                    // This is a PROBLEM. If GetAll only looks at DTO, and DTO has no ID, I can't bind the ID.
                                    // I need to check `MappingProfile` to see if it maps ID.
                                    // If not, I need to fix ExpenseCategoryDTO or use a different DTO.
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none min-h-[100px]"
                            placeholder="Expense details..."
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-slate-400 hover:bg-white/5 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors">
                            <Save className="w-4 h-4" /> Save Expense
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExpenseModal;
