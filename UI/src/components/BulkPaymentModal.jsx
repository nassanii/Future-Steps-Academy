import React, { useState } from 'react';
import { X, DollarSign, Calendar, Users, FileText, CreditCard } from 'lucide-react';

const BulkPaymentModal = ({ isOpen, onClose, onSave, month, year, unpaidCount }) => {
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
    const [notes, setNotes] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            month,
            year,
            paymentDate: new Date(paymentDate).toISOString(),
            notes: notes || `Bulk salary payment for ${monthNames[month - 1]} ${year}`,
            paymentMethod
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Bulk Payment</h2>
                            <p className="text-green-100 text-sm">Pay all unpaid teachers</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Summary */}
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-5 h-5 text-green-400" />
                            <span className="font-semibold text-white">Payment Summary</span>
                        </div>
                        <div className="space-y-1 text-sm">
                            <p className="text-slate-300">
                                Period: <span className="text-white font-medium">{monthNames[month - 1]} {year}</span>
                            </p>
                            <p className="text-slate-300">
                                Teachers to pay: <span className="text-green-400 font-bold">{unpaidCount}</span>
                            </p>
                            <p className="text-slate-400 text-xs mt-2">
                                Already paid teachers will be skipped automatically
                            </p>
                        </div>
                    </div>

                    {/* Payment Date */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                            <Calendar className="w-4 h-4" />
                            Payment Date
                        </label>
                        <input
                            type="date"
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors"
                        />
                    </div>

                    {/* Payment Method */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                            <CreditCard className="w-4 h-4" />
                            Payment Method
                        </label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors"
                        >
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Cash">Cash</option>
                            <option value="Check">Check</option>
                            <option value="Mobile Payment">Mobile Payment</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                            <FileText className="w-4 h-4" />
                            Notes (Optional)
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder={`Bulk salary payment for ${monthNames[month - 1]} ${year}`}
                            rows={3}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-green-500/30"
                        >
                            Pay All ({unpaidCount})
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BulkPaymentModal;
