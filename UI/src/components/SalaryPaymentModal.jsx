import React, { useState } from 'react';
import { X, DollarSign, Calendar, User, CreditCard } from 'lucide-react';

const SalaryPaymentModal = ({ isOpen, onClose, onSave, teacher, month, year }) => {
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
    const [notes, setNotes] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');

    if (!isOpen || !teacher) return null;

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            teacherId: teacher.teacherId,
            month,
            year,
            paymentDate: new Date(paymentDate).toISOString(),
            notes: notes || `Salary for ${monthNames[month - 1]} ${year}`,
            paymentMethod
        });
    };

    const handleClose = () => {
        setPaymentDate(new Date().toISOString().split('T')[0]);
        setNotes('');
        setPaymentMethod('Bank Transfer');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Pay Salary</h2>
                    </div>
                    <button onClick={handleClose} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-6">
                        {/* Teacher Info */}
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <User className="w-5 h-5 text-blue-400" />
                                <span className="text-sm text-slate-400">Teacher</span>
                            </div>
                            <p className="text-white font-semibold text-lg">{teacher.teacherName}</p>
                        </div>

                        {/* Payment Details */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                <p className="text-slate-400 text-xs uppercase mb-1">Period</p>
                                <p className="text-white font-semibold">{monthNames[month - 1]} {year}</p>
                            </div>
                            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                <p className="text-slate-400 text-xs uppercase mb-1">Amount</p>
                                <p className="text-green-400 font-bold text-lg">${teacher.monthlySalary.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Payment Date */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                <Calendar className="w-4 h-4 inline mr-2" />
                                Payment Date
                            </label>
                            <input
                                type="date"
                                value={paymentDate}
                                onChange={(e) => setPaymentDate(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
                            />
                        </div>

                        {/* Payment Method */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                <CreditCard className="w-4 h-4 inline mr-2" />
                                Payment Method
                            </label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
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
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Notes (Optional)
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder={`Salary for ${monthNames[month - 1]} ${year}`}
                                rows="3"
                                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all resize-none placeholder:text-slate-500"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 p-6 border-t border-white/10 bg-black/20">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-green-500/20 transition-all"
                        >
                            Confirm Payment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SalaryPaymentModal;
