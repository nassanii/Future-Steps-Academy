import React, { useState } from 'react';
import { X, DollarSign } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, onSave, invoice }) => {
    const [formData, setFormData] = useState({
        amount: '',
        paymentDate: new Date().toISOString().split('T')[0],
        method: 'Cash',
        description: '',
        paymentType: 'Payment'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation
        if (!formData.amount || parseFloat(formData.amount) <= 0) return;

        const payload = {
            InvoiceId: invoice.id,
            Amount: parseFloat(formData.amount),
            PaymentDate: formData.paymentDate,
            Description: formData.description,
            Method: formData.method,
            PaymentType: formData.paymentType
        };

        onSave(payload);
    };

    if (!isOpen || !invoice) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div>
                        <h2 className="text-xl font-bold text-white">Record Payment</h2>
                        <p className="text-xs text-slate-400">For Invoice #{invoice.invoiceNo}</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Amount</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="w-full pl-10 pr-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-green-500 focus:outline-none"
                                min="0.01"
                                step="0.01"
                                max={invoice.balance} // Optional: limit to balance
                                required
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Outstanding Balance: ${invoice.balance?.toFixed(2)}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Payment Date</label>
                        <input
                            type="date"
                            name="paymentDate"
                            value={formData.paymentDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-green-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Payment Method</label>
                        <select
                            name="method"
                            value={formData.method}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-green-500 focus:outline-none"
                        >
                            <option value="Cash">Cash</option>
                            <option value="Card">Credit/Debit Card</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Check">Check</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Description (Optional)</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="2"
                            className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-green-500 focus:outline-none resize-none"
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-slate-300 hover:text-white font-medium hover:bg-white/5 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 transition-all"
                        >
                            Confirm Payment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentModal;
