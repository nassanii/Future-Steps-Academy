import React from 'react';
import { X, Calendar, DollarSign, FileText } from 'lucide-react';

const SalaryHistoryModal = ({ isOpen, onClose, teacher, history }) => {
    if (!isOpen || !teacher) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-900 sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Payment History</h2>
                            <p className="text-sm text-slate-400">{teacher.teacherName}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    {history && history.length > 0 ? (
                        <div className="space-y-4 relative pl-4 border-l-2 border-white/10 ml-2">
                            {history.map((payment, idx) => (
                                <div key={payment.expenseId} className="relative mb-6 last:mb-0">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-green-500 ring-4 ring-slate-900"></div>
                                    <div className="bg-slate-800/30 border border-white/5 p-4 rounded-xl hover:bg-slate-800/50 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-white font-bold text-lg">{payment.monthYear}</h3>
                                                <p className="text-slate-400 text-sm flex items-center gap-1 mt-1">
                                                    <Calendar className="w-3 h-3" />
                                                    Paid on {new Date(payment.paymentDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-green-400 font-bold text-xl">${payment.amount.toLocaleString()}</p>
                                            </div>
                                        </div>
                                        {payment.description && (
                                            <p className="text-slate-300 text-sm mt-2 italic border-t border-white/5 pt-2">
                                                {payment.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                            <DollarSign className="w-16 h-16 mb-4 opacity-50" />
                            <p className="text-lg font-medium">No payment history</p>
                            <p className="text-sm">This teacher hasn't received any salary payments yet.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-black/20 flex justify-between items-center">
                    <div className="text-slate-400 text-sm">
                        Total Payments: <span className="text-white font-bold">{history?.length || 0}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SalaryHistoryModal;
