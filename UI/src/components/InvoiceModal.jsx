import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { getAllStudents } from '../services/studentService';

const InvoiceModal = ({ isOpen, onClose, onSave }) => {
    const [students, setStudents] = useState([]);
    const [loadingStudents, setLoadingStudents] = useState(false);

    const [formData, setFormData] = useState({
        studentId: '',
        invoiceNo: '',
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: '',
        items: [{ description: '', amount: '' }],
        addPayment: false,
        paymentAmount: '',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: 'Cash',
        paymentDescription: ''
    });

    useEffect(() => {
        if (isOpen) {
            fetchStudents();
            // Generate a random invoice number if empty
            if (!formData.invoiceNo) {
                setFormData(prev => ({ ...prev, invoiceNo: `INV-${Date.now().toString().slice(-6)}` }));
            }
        }
    }, [isOpen]);

    const fetchStudents = async () => {
        setLoadingStudents(true);
        try {
            const data = await getAllStudents();
            setStudents(data || []);
        } catch (error) {
            console.error("Failed to load students", error);
        } finally {
            setLoadingStudents(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;
        setFormData({ ...formData, items: newItems });
    };

    const addItem = () => {
        setFormData({ ...formData, items: [...formData.items, { description: '', amount: '' }] });
    };

    const removeItem = (index) => {
        if (formData.items.length > 1) {
            const newItems = formData.items.filter((_, i) => i !== index);
            setFormData({ ...formData, items: newItems });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.studentId || formData.studentId === '') {
            alert('Please select a student');
            return;
        }

        if (!formData.invoiceNo || formData.invoiceNo.trim() === '') {
            alert('Please enter an invoice number');
            return;
        }

        // Parse and validate studentId
        const studentId = parseInt(formData.studentId);
        if (isNaN(studentId)) {
            alert('Invalid student selected');
            return;
        }

        // Filter and validate items
        const validItems = formData.items
            .filter(item => item.description && item.amount && parseFloat(item.amount) > 0)
            .map(item => ({
                Description: item.description.trim(),
                Amount: parseFloat(item.amount)
            }));

        if (validItems.length === 0) {
            alert('Please add at least one valid item with description and amount greater than 0');
            return;
        }

        // Calculate total amount for validation and payment type
        const currentTotal = validItems.reduce((sum, item) => sum + item.Amount, 0);

        // Format payload
        const payload = {
            StudentId: studentId,
            InvoiceNo: formData.invoiceNo.trim(),
            IssueDate: formData.issueDate || new Date().toISOString().split('T')[0],
            DueDate: formData.dueDate || null,
            Items: validItems,
            paymant: formData.addPayment && formData.paymentAmount ? [{
                Amount: parseFloat(formData.paymentAmount),
                PaymentDate: formData.paymentDate,
                Description: formData.paymentDescription || 'Initial Payment',
                PaymentType: parseFloat(formData.paymentAmount) >= currentTotal ? 'Full' : 'Partial',
                Method: formData.paymentMethod
            }] : []
        };

        console.log('Invoice Payload:', JSON.stringify(payload, null, 2));
        onSave(payload);
    };

    if (!isOpen) return null;

    const totalAmount = formData.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-slate-900 z-10">
                    <h2 className="text-xl font-bold text-white">Create New Invoice</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Header Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Student</label>
                            <select
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                                required
                            >
                                <option value="">Select Student</option>
                                {students.map(student => (
                                    <option key={student.studentID} value={student.studentID}>
                                        {student.firstName} {student.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Invoice No</label>
                            <input
                                type="text"
                                name="invoiceNo"
                                value={formData.invoiceNo}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Issue Date</label>
                            <input
                                type="date"
                                name="issueDate"
                                value={formData.issueDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Due Date</label>
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Items Section */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-medium text-slate-300">Invoice Items</h3>
                            <button
                                type="button"
                                onClick={addItem}
                                className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                            >
                                <Plus className="w-4 h-4" /> Add Item
                            </button>
                        </div>
                        <div className="space-y-3">
                            {formData.items.map((item, index) => (
                                <div key={index} className="flex gap-3 items-start">
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        value={item.description}
                                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                        className="flex-[2] px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Amount"
                                        value={item.amount}
                                        onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                                        className="flex-1 px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeItem(index)}
                                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                        disabled={formData.items.length === 1}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <div className="text-right">
                                <span className="text-slate-400 text-sm">Total:</span>
                                <span className="ml-2 text-xl font-bold text-white">${totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Initial Payment Section */}
                    <div className="pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 mb-4">
                            <input
                                type="checkbox"
                                name="addPayment"
                                id="addPayment"
                                checked={formData.addPayment}
                                onChange={(e) => setFormData({ ...formData, addPayment: e.target.checked })}
                                className="w-4 h-4 rounded border-white/10 bg-black/20 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="addPayment" className="text-sm font-medium text-slate-300">
                                Add Initial Payment
                            </label>
                        </div>

                        {formData.addPayment && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Payment Amount</label>
                                    <input
                                        type="number"
                                        name="paymentAmount"
                                        value={formData.paymentAmount}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        required={formData.addPayment}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Payment Date</label>
                                    <input
                                        type="date"
                                        name="paymentDate"
                                        value={formData.paymentDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                                        required={formData.addPayment}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Payment Method</label>
                                    <select
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="Cash">Cash</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Card">Card</option>
                                        <option value="Cheque">Cheque</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                                    <input
                                        type="text"
                                        name="paymentDescription"
                                        value={formData.paymentDescription}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                                        placeholder="Optional"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10 sticky bottom-0 bg-slate-900">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-slate-300 hover:text-white font-medium hover:bg-white/5 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all"
                        >
                            Create Invoice
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InvoiceModal;
