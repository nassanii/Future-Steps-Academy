import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getAllExpenses, createExpense, updateExpense, deleteExpense, getAllExpenseCategories, createExpenseCategory, deleteExpenseCategory } from '../services/expenseService';
import { getAllInvoices, createInvoice, deleteInvoice, addPayment } from '../services/invoiceService';
import { getMonthlySalaries, paySalary, getPaymentHistory, bulkPaySalaries } from '../services/salaryService';
import { Plus, Search, Filter, Trash2, Edit2, DollarSign, Tag, Calendar, FileText, Settings, CreditCard, MoreVertical, Eye, Users, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import ExpenseModal from '../components/ExpenseModal';
import InvoiceModal from '../components/InvoiceModal';
import PaymentModal from '../components/PaymentModal';
import InvoiceDetailsModal from '../components/InvoiceDetailsModal';
import SalaryPaymentModal from '../components/SalaryPaymentModal';
import SalaryHistoryModal from '../components/SalaryHistoryModal';
import BulkPaymentModal from '../components/BulkPaymentModal';

const Expenses = () => {
    const [activeTab, setActiveTab] = useState('expenses'); // expenses, categories
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Expenses State
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(null);

    // Categories State (for management)
    const [newCategoryName, setNewCategoryName] = useState('');

    // Invoices State
    const [invoices, setInvoices] = useState([]);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    // Salaries State
    const [salaries, setSalaries] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [isSalaryPaymentModalOpen, setIsSalaryPaymentModalOpen] = useState(false);
    const [isSalaryHistoryModalOpen, setIsSalaryHistoryModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [isBulkPaymentModalOpen, setIsBulkPaymentModalOpen] = useState(false);


    const toast = useToast();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [expensesData, categoriesData, invoicesData] = await Promise.all([
                getAllExpenses(),
                getAllExpenseCategories(),
                getAllInvoices()
            ]);
            setExpenses(expensesData || []);
            setCategories(categoriesData || []);
            setInvoices(invoicesData || []);
        } catch (error) {
            console.error("Failed to fetch finance data:", error);
            toast.error("Failed to load finance data");
        } finally {
            setLoading(false);
        }
    };

    const fetchSalaries = async () => {
        try {
            const data = await getMonthlySalaries(selectedMonth, selectedYear);
            setSalaries(data || []);
        } catch (error) {
            console.error("Failed to fetch salaries:", error);
            toast.error("Failed to load salary data");
        }
    };

    // --- Expense Operations ---
    const handleSaveExpense = async (data) => {
        try {
            if (currentExpense) {
                await updateExpense(currentExpense.id, data);
                toast.success("Expense updated successfully");
            } else {
                await createExpense(data);
                toast.success("Expense recorded successfully");
            }
            setIsExpenseModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Expense error:", error);
            toast.error("Failed to save expense");
        }
    };

    const handleDeleteExpense = async (id) => {
        toast.confirm("Delete this expense record?", async () => {
            try {
                await deleteExpense(id);
                toast.success("Expense deleted");
                fetchData();
            } catch (error) {
                toast.error("Failed to delete expense");
            }
        });
    };

    const openCreateExpense = () => {
        setCurrentExpense(null);
        setIsExpenseModalOpen(true);
    };

    const openEditExpense = (expense) => {
        setCurrentExpense(expense);
        setIsExpenseModalOpen(true);
    };

    // --- Category Operations ---
    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;
        try {
            await createExpenseCategory({ name: newCategoryName });
            setNewCategoryName('');
            toast.success("Category added");
            fetchData();
        } catch (error) {
            toast.error("Failed to add category");
        }
    };

    const handleDeleteCategory = async (id) => {
        toast.confirm("Delete this category? This might affect existing expenses.", async () => {
            try {
                await deleteExpenseCategory(id);
                toast.success("Category deleted");
                fetchData();
            } catch (error) {
                toast.error("Failed to delete category");
            }
        });
    };

    const filteredExpenses = expenses.filter(exp =>
        (exp.description && exp.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (categories.find(c => c.id === exp.categoryId)?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredInvoices = invoices.filter(inv =>
        (inv.invoiceNo && inv.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (inv.studentName && inv.studentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (inv.studentId && inv.studentId.toString().includes(searchTerm))
    );

    const getCategoryName = (id) => categories.find(c => c.id === id)?.name || 'Unknown';

    // --- Invoice Operations ---
    const handleSaveInvoice = async (data) => {
        try {
            await createInvoice(data);
            toast.success("Invoice created successfully");
            setIsInvoiceModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Invoice Error:", error);
            // Show the actual error message from backend
            const errorMessage = typeof error === 'string' ? error : error.message || "Failed to create invoice";
            toast.error(errorMessage);
        }
    };

    const handleDeleteInvoice = async (id) => {
        toast.confirm("Delete this invoice?", async () => {
            try {
                await deleteInvoice(id);
                toast.success("Invoice deleted");
                fetchData();
            } catch (error) {
                toast.error("Failed to delete invoice");
            }
        });
    };

    const openPaymentModal = (invoice) => {
        setSelectedInvoice(invoice);
        setIsPaymentModalOpen(true);
    };

    const openDetailsModal = (invoice) => {
        setSelectedInvoice(invoice);
        setIsDetailsModalOpen(true);
    };

    const handleSavePayment = async (data) => {
        try {
            await addPayment(data);
            toast.success("Payment recorded successfully");
            setIsPaymentModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Payment Error:", error);
            toast.error("Failed to record payment");
        }
    };

    // --- Salary Operations ---
    useEffect(() => {
        if (activeTab === 'salaries') {
            fetchSalaries();
        }
    }, [selectedMonth, selectedYear, activeTab]);

    const handlePaySalary = async (data) => {
        try {
            await paySalary(data);
            toast.success("Salary payment recorded successfully");
            setIsSalaryPaymentModalOpen(false);
            fetchSalaries();
            fetchData(); // Refresh expenses
        } catch (error) {
            console.error("Salary Payment Error:", error);
            toast.error(error.response?.data || "Failed to record salary payment");
        }
    };

    const openSalaryPaymentModal = (teacher) => {
        setSelectedTeacher(teacher);
        setIsSalaryPaymentModalOpen(true);
    };

    const openSalaryHistoryModal = async (teacher) => {
        try {
            const history = await getPaymentHistory(teacher.teacherId);
            setPaymentHistory(history);
            setSelectedTeacher(teacher);
            setIsSalaryHistoryModalOpen(true);
        } catch (error) {
            console.error("Error fetching payment history:", error);
            toast.error("Failed to load payment history");
        }
    };

    const handleBulkPayment = async (data) => {
        try {
            const result = await bulkPaySalaries(data);
            setIsBulkPaymentModalOpen(false);

            // Show detailed success message
            if (result.successCount > 0) {
                toast.success(`Successfully paid ${result.successCount} teacher(s). ${result.skippedCount} already paid.`);
            } else {
                toast.info(`All teachers have already been paid for this month.`);
            }

            if (result.failedCount > 0) {
                toast.error(`Failed to pay ${result.failedCount} teacher(s)`);
            }

            fetchSalaries();
            fetchData(); // Refresh expenses
        } catch (error) {
            console.error("Bulk Payment Error:", error);
            toast.error(error.response?.data || "Failed to process bulk payment");
        }
    };


    // Calculate totals
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Financials</h1>
                    <p className="text-slate-400">Manage expenses, track payments, and review reports.</p>
                </div>
                <div className="flex gap-2">
                    {activeTab === 'expenses' && (
                        <button
                            onClick={openCreateExpense}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Record Expense
                        </button>
                    )}
                    {activeTab === 'invoices' && (
                        <button
                            onClick={() => setIsInvoiceModalOpen(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Create Invoice
                        </button>
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-800/30 backdrop-blur-md border border-white/5 p-6 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Total Expenses</p>
                            <h3 className="text-2xl font-bold text-white">${totalExpenses.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-800/30 backdrop-blur-md border border-white/5 p-6 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                            <Tag className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Active Categories</p>
                            <h3 className="text-2xl font-bold text-white">{categories.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-800/30 backdrop-blur-md border border-white/5 p-6 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Total Transactions</p>
                            <h3 className="text-2xl font-bold text-white">${invoices.reduce((sum, inv) => sum + inv.totalAmount, 0).toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-white/10 mb-6 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('expenses')}
                    className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'expenses' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    Expenses List
                    {activeTab === 'expenses' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('invoices')}
                    className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'invoices' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    Invoices & Payments
                    {activeTab === 'invoices' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('salaries')}
                    className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'salaries' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    Teacher Salaries
                    {activeTab === 'salaries' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('categories')}
                    className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'categories' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    Manage Categories
                    {activeTab === 'categories' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full"></div>}
                </button>
            </div>

            {activeTab === 'expenses' && (
                <>
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search expenses by description or category..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-500"
                            />
                        </div>
                    </div>

                    {/* Table - Invoice Look */}
                    {/* Desktop Table View */}
                    <div className="hidden md:block bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                                        <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</th>
                                        <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                                        <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Amount</th>
                                        <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {loading ? (
                                        <tr><td colSpan="5" className="p-8 text-center text-slate-400">Loading records...</td></tr>
                                    ) : filteredExpenses.length === 0 ? (
                                        <tr><td colSpan="5" className="p-8 text-center text-slate-400">No expenses found matching your search.</td></tr>
                                    ) : (
                                        filteredExpenses.map((expense) => (
                                            <tr key={expense.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="p-5 text-slate-300 font-medium whitespace-nowrap">
                                                    {new Date(expense.expenseDate).toLocaleDateString()}
                                                </td>
                                                <td className="p-5 text-white max-w-xs truncate" title={expense.description}>
                                                    {expense.description || '-'}
                                                </td>
                                                <td className="p-5">
                                                    <span className="px-3 py-1 bg-white/5 text-slate-300 rounded-full text-xs border border-white/10">
                                                        {getCategoryName(expense.categoryId)}
                                                    </span>
                                                </td>
                                                <td className="p-5 text-right font-bold text-red-400">
                                                    -${expense.amount.toFixed(2)}
                                                </td>
                                                <td className="p-5 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => openEditExpense(expense)}
                                                            className="p-2 hover:bg-blue-500/20 rounded-lg text-slate-400 hover:text-blue-400 transition-colors"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteExpense(expense.id)}
                                                            className="p-2 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile Cards View */}
                    <div className="md:hidden space-y-4">
                        {loading ? (
                            <div className="p-8 text-center text-slate-400">Loading records...</div>
                        ) : filteredExpenses.length === 0 ? (
                            <div className="p-8 text-center text-slate-400">No expenses found matching your search.</div>
                        ) : (
                            filteredExpenses.map((expense) => (
                                <div key={expense.id} className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl p-5 shadow-lg relative group">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <span className="text-xs font-medium text-slate-400 mb-1 block">
                                                {new Date(expense.expenseDate).toLocaleDateString()}
                                            </span>
                                            <h3 className="text-white font-semibold text-lg line-clamp-1" title={expense.description}>
                                                {expense.description || 'No Description'}
                                            </h3>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-xl font-bold text-red-400">
                                                -${expense.amount.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                        <span className="px-3 py-1 bg-white/5 text-slate-300 rounded-full text-xs border border-white/10">
                                            {getCategoryName(expense.categoryId)}
                                        </span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEditExpense(expense)}
                                                className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg text-blue-400 transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteExpense(expense.id)}
                                                className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}

            {activeTab === 'invoices' && (
                <>
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by Student Name, Invoice No, or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-500"
                            />
                        </div>
                    </div>

                    {/* Invoices Table */}
                    <div className="hidden md:block bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                        <table className="w-full text-left">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Invoice #</th>
                                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Student</th>
                                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Amount</th>
                                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Balance</th>
                                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Status</th>
                                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredInvoices.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-5 text-white font-mono text-sm">{inv.invoiceNo}</td>
                                        <td className="p-5 text-slate-300">{inv.studentName}</td>
                                        <td className="p-5 text-slate-400 text-sm">{new Date(inv.issueDate).toLocaleDateString()}</td>
                                        <td className="p-5 text-right font-bold text-white">${inv.totalAmount.toFixed(2)}</td>
                                        <td className="p-5 text-right font-medium text-red-300">${inv.balance.toFixed(2)}</td>
                                        <td className="p-5 text-center">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${inv.status === 'Paid' ? 'bg-green-500/20 text-green-400' :
                                                inv.status === 'PartiallyPaid' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-red-500/20 text-red-400'
                                                }`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="p-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openDetailsModal(inv)}
                                                    className="p-2 hover:bg-blue-500/20 rounded-lg text-slate-400 hover:text-blue-400 transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => openPaymentModal(inv)}
                                                    className="p-2 hover:bg-green-500/20 rounded-lg text-slate-400 hover:text-green-400 transition-colors"
                                                    title="Record Payment"
                                                >
                                                    <DollarSign className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteInvoice(inv.id)}
                                                    className="p-2 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredInvoices.length === 0 && (
                                    <tr><td colSpan="7" className="p-8 text-center text-slate-500">No invoices found matching your search.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards for Invoices */}
                    <div className="md:hidden space-y-4">
                        {filteredInvoices.map((inv) => (
                            <div key={inv.id} className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl p-5 shadow-lg relative">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <span className="text-xs font-mono text-slate-500 block mb-1">{inv.invoiceNo}</span>
                                        <h3 className="text-white font-semibold">{inv.studentName}</h3>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${inv.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                        }`}>
                                        {inv.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-t border-white/5 border-b mb-3">
                                    <div className="text-center">
                                        <p className="text-xs text-slate-500">Total</p>
                                        <p className="text-white font-bold">${inv.totalAmount.toFixed(2)}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-slate-500">Balance</p>
                                        <p className="text-red-300 font-bold">${inv.balance.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 justify-end">
                                    <button
                                        onClick={() => openPaymentModal(inv)}
                                        className="flex-1 py-2 bg-green-500/10 hover:bg-green-500/20 rounded-lg text-green-400 font-medium text-sm transition-colors flex items-center justify-center gap-2"
                                    >
                                        <DollarSign className="w-4 h-4" /> Pay
                                    </button>
                                    <button
                                        onClick={() => openDetailsModal(inv)}
                                        className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg text-blue-400 transition-colors"
                                        title="View Details"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteInvoice(inv.id)}
                                        className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {activeTab === 'categories' && (
                <div className="w-full mx-auto">
                    <div className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl p-6 mb-8">
                        <h3 className="text-lg font-bold text-white mb-4">Add New Category</h3>
                        <form onSubmit={handleAddCategory} className="flex gap-3">
                            <input
                                type="text"
                                placeholder="e.g., Utilities, Salaries, Maintenance"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                className="flex-1 px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                            />
                            <button
                                type="submit"
                                disabled={!newCategoryName.trim()}
                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Add
                            </button>
                        </form>
                    </div>

                    <div className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-white/5 bg-white/5">
                            <h3 className="font-semibold text-slate-300">Existing Categories</h3>
                        </div>
                        <div className="divide-y divide-white/5">
                            {categories.map((cat) => (
                                <div key={cat.id} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
                                    <span className="text-white font-medium">{cat.name}</span>
                                    <button
                                        onClick={() => handleDeleteCategory(cat.id)}
                                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {categories.length === 0 && (
                                <div className="p-8 text-center text-slate-500">No categories defined yet.</div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'salaries' && (
                <>
                    {/* Month/Year Selector */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex gap-3 flex-1">
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                                className="px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
                            >
                                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, idx) => (
                                    <option key={idx} value={idx + 1}>{month}</option>
                                ))}
                            </select>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                className="px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
                            >
                                {[2024, 2025, 2026, 2027].map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        {salaries.filter(s => !s.isPaid).length > 0 && (
                            <button
                                onClick={() => setIsBulkPaymentModalOpen(true)}
                                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-green-500/30 transition-all whitespace-nowrap"
                            >
                                <Users className="w-5 h-5" />
                                Pay All ({salaries.filter(s => !s.isPaid).length})
                            </button>
                        )}
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                        <table className="w-full text-left">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Teacher</th>
                                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Monthly Salary</th>
                                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Status</th>
                                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Paid On</th>
                                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {salaries.map((teacher) => (
                                    <tr key={teacher.teacherId} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-5 text-white font-medium">{teacher.teacherName}</td>
                                        <td className="p-5 text-right font-bold text-white">${teacher.monthlySalary.toLocaleString()}</td>
                                        <td className="p-5 text-center">
                                            {teacher.isPaid ? (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">
                                                    <CheckCircle className="w-3 h-3" /> Paid
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold">
                                                    <XCircle className="w-3 h-3" /> Unpaid
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-5 text-center text-slate-400 text-sm">
                                            {teacher.paymentDate ? new Date(teacher.paymentDate).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="p-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openSalaryHistoryModal(teacher)}
                                                    className="p-2 hover:bg-blue-500/20 rounded-lg text-slate-400 hover:text-blue-400 transition-colors"
                                                    title="View History"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                {!teacher.isPaid && (
                                                    <button
                                                        onClick={() => openSalaryPaymentModal(teacher)}
                                                        className="p-2 hover:bg-green-500/20 rounded-lg text-slate-400 hover:text-green-400 transition-colors"
                                                        title="Mark as Paid"
                                                    >
                                                        <DollarSign className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {salaries.length === 0 && (
                                    <tr><td colSpan="5" className="p-8 text-center text-slate-500">No teachers found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">
                        {salaries.map((teacher) => (
                            <div key={teacher.teacherId} className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl p-5 shadow-lg">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-white font-semibold text-lg">{teacher.teacherName}</h3>
                                        <p className="text-slate-400 text-sm mt-1">${teacher.monthlySalary.toLocaleString()}/month</p>
                                    </div>
                                    {teacher.isPaid ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">
                                            <CheckCircle className="w-3 h-3" /> Paid
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold">
                                            <XCircle className="w-3 h-3" /> Unpaid
                                        </span>
                                    )}
                                </div>
                                {teacher.paymentDate && (
                                    <p className="text-slate-400 text-sm mb-3 pb-3 border-b border-white/5">
                                        Paid on {new Date(teacher.paymentDate).toLocaleDateString()}
                                    </p>
                                )}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openSalaryHistoryModal(teacher)}
                                        className="flex-1 py-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg text-blue-400 font-medium text-sm transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Eye className="w-4 h-4" /> History
                                    </button>
                                    {!teacher.isPaid && (
                                        <button
                                            onClick={() => openSalaryPaymentModal(teacher)}
                                            className="flex-1 py-2 bg-green-500/10 hover:bg-green-500/20 rounded-lg text-green-400 font-medium text-sm transition-colors flex items-center justify-center gap-2"
                                        >
                                            <DollarSign className="w-4 h-4" /> Pay
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <ExpenseModal
                isOpen={isExpenseModalOpen}
                onClose={() => setIsExpenseModalOpen(false)}
                onSave={handleSaveExpense}
                initialData={currentExpense}
                categories={categories}
            />

            <InvoiceModal
                isOpen={isInvoiceModalOpen}
                onClose={() => setIsInvoiceModalOpen(false)}
                onSave={handleSaveInvoice}
            />

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onSave={handleSavePayment}
                invoice={selectedInvoice}
            />

            <InvoiceDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                invoice={selectedInvoice}
            />

            <SalaryPaymentModal
                isOpen={isSalaryPaymentModalOpen}
                onClose={() => setIsSalaryPaymentModalOpen(false)}
                onSave={handlePaySalary}
                teacher={selectedTeacher}
                month={selectedMonth}
                year={selectedYear}
            />

            <SalaryHistoryModal
                isOpen={isSalaryHistoryModalOpen}
                onClose={() => setIsSalaryHistoryModalOpen(false)}
                teacher={selectedTeacher}
                history={paymentHistory}
            />

            <BulkPaymentModal
                isOpen={isBulkPaymentModalOpen}
                onClose={() => setIsBulkPaymentModalOpen(false)}
                onSave={handleBulkPayment}
                month={selectedMonth}
                year={selectedYear}
                unpaidCount={salaries.filter(s => !s.isPaid).length}
            />
        </DashboardLayout>
    );
};

export default Expenses;
