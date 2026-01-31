import React from 'react';
import { X, FileText, Calendar, CreditCard, DollarSign } from 'lucide-react';

const InvoiceDetailsModal = ({ isOpen, onClose, invoice }) => {
    if (!isOpen || !invoice) return null;

    const totalPaid = invoice.payments?.reduce((sum, p) => sum + p.amount, 0) || 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-900 sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Invoice Details</h2>
                            <p className="text-sm text-slate-400 font-mono">{invoice.invoiceNo}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Invoice Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                            <p className="text-slate-400 text-xs uppercase mb-1">Student</p>
                            <p className="text-white font-semibold text-lg">{invoice.studentName}</p>
                        </div>
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                            <p className="text-slate-400 text-xs uppercase mb-1">Status</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${invoice.status === 'Paid' ? 'bg-green-500/20 text-green-400' :
                                    invoice.status === 'PartiallyPaid' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-red-500/20 text-red-400'
                                }`}>
                                {invoice.status}
                            </span>
                        </div>
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                            <p className="text-slate-400 text-xs uppercase mb-1">Due Balance</p>
                            <p className="text-red-400 font-bold text-lg">${invoice.balance.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Timeline Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Invoice Items */}
                        <div>
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-blue-400" /> Bill Items
                            </h3>
                            <div className="bg-slate-800/30 rounded-xl border border-white/5 overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-white/5 text-slate-400">
                                        <tr>
                                            <th className="p-3">Description</th>
                                            <th className="p-3 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-slate-300">
                                        {invoice.items?.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="p-3">{item.description}</td>
                                                <td className="p-3 text-right font-medium text-white">${item.amount.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                        <tr className="bg-white/5 font-bold text-white">
                                            <td className="p-3 text-right">Total</td>
                                            <td className="p-3 text-right">${invoice.totalAmount.toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Payment History */}
                        <div className="flex flex-col h-full">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-green-400" /> Payment History
                            </h3>

                            {invoice.payments && invoice.payments.length > 0 ? (
                                <div className="space-y-4 relative pl-4 border-l-2 border-white/10 ml-2">
                                    {invoice.payments.map((payment, idx) => (
                                        <div key={idx} className="relative mb-6 last:mb-0">
                                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-green-500 ring-4 ring-slate-900"></div>
                                            <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-green-400 font-bold text-lg">+${payment.amount.toFixed(2)}</span>
                                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(payment.paymentDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-slate-300 flex justify-between">
                                                    <span>{payment.method}</span>
                                                    <span className="text-slate-500 italic">{payment.description || 'No notes'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="pt-2 mt-4 border-t border-white/10 text-right">
                                        <span className="text-slate-400 text-sm mr-2">Total Paid:</span>
                                        <span className="text-green-400 font-bold">${totalPaid.toFixed(2)}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center bg-slate-800/20 rounded-xl border border-white/5 p-6 text-slate-500 text-sm border-dashed">
                                    <CreditCard className="w-8 h-8 mb-2 opacity-50" />
                                    No payments recorded yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-black/20 flex justify-end">
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

export default InvoiceDetailsModal;
