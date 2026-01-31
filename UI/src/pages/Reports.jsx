import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getAllExpenses, getAllExpenseCategories } from '../services/expenseService';
import { getMonthlySalaries } from '../services/salaryService';
import { generateReport, getAllReports } from '../services/reportService';
import { getAllInvoices } from '../services/invoiceService';
import { BarChart3, TrendingUp, DollarSign, Calendar, Users, PieChart, Download, Filter, FileText, TrendingDown } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Reports = () => {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [salaries, setSalaries] = useState([]);
    const [invoices, setInvoices] = useState([]);

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(true);

    const toast = useToast();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        fetchData();
    }, [selectedMonth, selectedYear]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [expensesData, categoriesData, salariesData, invoicesData] = await Promise.all([
                getAllExpenses(),
                getAllExpenseCategories(),
                getMonthlySalaries(selectedMonth, selectedYear),
                getAllInvoices()
            ]);
            setExpenses(expensesData);
            setCategories(categoriesData);
            setSalaries(salariesData);
            setInvoices(invoicesData);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to load report data');
        } finally {
            setLoading(false);
        }
    };


    // Filter invoices by selected month/year
    const filteredInvoices = invoices.filter(inv => {
        const invDate = new Date(inv.issueDate);
        return invDate.getMonth() + 1 === selectedMonth && invDate.getFullYear() === selectedYear;
    });

    // Filter expenses by selected month/year
    const filteredExpenses = expenses.filter(exp => {
        const expDate = new Date(exp.expenseDate);
        return expDate.getMonth() + 1 === selectedMonth && expDate.getFullYear() === selectedYear;
    });

    // Calculate totals
    const totalDebt = filteredInvoices.reduce((sum, inv) => sum + (inv.balance || 0), 0);
    // Total Income should be the amount PAID (Total Amount - Balance)
    const totalIncome = filteredInvoices.reduce((sum, inv) => sum + (inv.totalAmount - (inv.balance || 0)), 0);
    const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const netProfit = totalIncome - totalExpenses;

    const totalSalaryPaid = filteredExpenses
        .filter(exp => {
            const category = categories.find(c => c.id === exp.categoryId);
            return category?.name.toLowerCase() === 'salary';
        })
        .reduce((sum, exp) => sum + exp.amount, 0);

    // Expenses by category
    const expensesByCategory = categories.map(category => {
        const categoryExpenses = filteredExpenses.filter(exp => exp.categoryId === category.id);
        const total = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        return {
            name: category.name,
            total,
            count: categoryExpenses.length
        };
    }).filter(cat => cat.total > 0).sort((a, b) => b.total - a.total);

    // Income by payment method
    const allPayments = invoices.flatMap(inv => inv.payments || []);
    const filteredPayments = allPayments.filter(p => {
        const pDate = new Date(p.paymentDate);
        return pDate.getMonth() + 1 === selectedMonth && pDate.getFullYear() === selectedYear;
    });

    const incomeByPaymentMethod = filteredPayments.reduce((acc, p) => {
        const method = p.method || 'Other';
        if (!acc[method]) {
            acc[method] = { total: 0, count: 0 };
        }
        acc[method].total += p.amount;
        acc[method].count += 1;
        return acc;
    }, {});

    const incomeMethodData = Object.entries(incomeByPaymentMethod).map(([method, data]) => ({
        method,
        ...data
    })).sort((a, b) => b.total - a.total);

    const totalIncomePayments = filteredPayments.reduce((sum, p) => sum + p.amount, 0);

    // Expenses by payment method
    const expensesByPaymentMethod = filteredExpenses.reduce((acc, exp) => {
        const method = exp.paymentMethod || 'Not Specified';
        if (!acc[method]) {
            acc[method] = { total: 0, count: 0 };
        }
        acc[method].total += exp.amount;
        acc[method].count += 1;
        return acc;
    }, {});

    const paymentMethodData = Object.entries(expensesByPaymentMethod).map(([method, data]) => ({
        method,
        ...data
    })).sort((a, b) => b.total - a.total);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Financial Reports</h1>
                        <p className="text-slate-400">Comprehensive analytics and insights</p>
                    </div>
                    <div className="flex gap-3">
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                            className="px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
                        >
                            {monthNames.map((month, idx) => (
                                <option key={idx} value={idx + 1}>{month}</option>
                            ))}
                        </select>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                            className="px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
                        >
                            {[2024, 2025, 2026, 2027].map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>



                {/* LIVE Detailed Report (Always Visible) */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <FileText className="w-6 h-6 text-blue-400" />
                            Detailed Profit & Loss
                        </h2>
                        <span className="text-sm text-slate-400">
                            {monthNames[selectedMonth - 1]} {selectedYear}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <TrendingUp className="w-5 h-5 text-blue-400" />
                                <span className="text-slate-400 text-sm">Total Income (Paid)</span>
                            </div>
                            <p className="text-3xl font-bold text-blue-400">
                                ${totalIncome.toLocaleString()}
                            </p>
                        </div>

                        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <TrendingDown className="w-5 h-5 text-orange-400" />
                                <span className="text-slate-400 text-sm">Outstanding Debt</span>
                            </div>
                            <p className="text-3xl font-bold text-orange-400">
                                ${totalDebt.toLocaleString()}
                            </p>
                        </div>

                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <TrendingDown className="w-5 h-5 text-red-400" />
                                <span className="text-slate-400 text-sm">Total Expenses</span>
                            </div>
                            <p className="text-3xl font-bold text-red-400">
                                ${totalExpenses.toLocaleString()}
                            </p>
                        </div>

                        <div className={`${netProfit >= 0 ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'} border rounded-xl p-6`}>
                            <div className="flex items-center gap-3 mb-2">
                                {netProfit >= 0 ? (
                                    <TrendingUp className="w-5 h-5 text-green-400" />
                                ) : (
                                    <TrendingDown className="w-5 h-5 text-red-400" />
                                )}
                                <span className="text-slate-400 text-sm">Net Profit / Loss</span>
                            </div>
                            <p className={`text-3xl font-bold ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                ${Math.abs(netProfit).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Expenses Breakdown */}
                    {expensesByCategory.length > 0 && (
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Expense Breakdown by Category</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {expensesByCategory.map((cat, idx) => (
                                    <div key={idx} className="bg-slate-700/30 border border-white/5 rounded-xl p-4">
                                        <p className="text-slate-300 font-medium mb-1">{cat.name}</p>
                                        <p className="text-2xl font-bold text-white">${cat.total.toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>


                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Expenses by Category */}
                    <div className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <PieChart className="w-5 h-5 text-blue-400" />
                                Expenses by Category
                            </h2>
                        </div>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                            {expensesByCategory.length > 0 ? (
                                expensesByCategory.map((category, idx) => {
                                    const percentage = (category.total / totalExpenses) * 100;
                                    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-cyan-500'];
                                    return (
                                        <div key={idx}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-slate-300 font-medium">{category.name}</span>
                                                <span className="text-white font-bold">${category.total.toLocaleString()}</span>
                                            </div>
                                            <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                                                <div
                                                    className={`${colors[idx % colors.length]} h-full rounded-full transition-all duration-500`}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-slate-400 mt-1">{percentage.toFixed(1)}% • {category.count} transaction(s)</p>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-slate-400 text-center py-8">No expenses for this period</p>
                            )}
                        </div>
                    </div>

                    {/* Income Payment Methods (NEW) */}
                    <div className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-green-400" />
                                Income by Payment Method
                            </h2>
                        </div>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                            {incomeMethodData.length > 0 ? (
                                incomeMethodData.map((method, idx) => {
                                    const percentage = (method.total / totalIncomePayments) * 100;
                                    const colors = ['bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'];
                                    return (
                                        <div key={idx}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-slate-300 font-medium">{method.method}</span>
                                                <span className="text-white font-bold">${method.total.toLocaleString()}</span>
                                            </div>
                                            <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                                                <div
                                                    className={`${colors[idx % colors.length]} h-full rounded-full transition-all duration-500`}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-slate-400 mt-1">{percentage.toFixed(1)}% • {method.count} transaction(s)</p>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-slate-400 text-center py-8">No income data available</p>
                            )}
                        </div>
                    </div>


                </div>

                {/* Recent Transactions */}
                {/* Compact Tables Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Expenses Table */}
                    <div className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-white/5">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <TrendingDown className="w-5 h-5 text-red-400" />
                                Recent Expenses
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Date</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Category</th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {expenses
                                        .sort((a, b) => new Date(b.expenseDate) - new Date(a.expenseDate))
                                        .slice(0, 5)
                                        .map((expense) => {
                                            const category = categories.find(c => c.id === expense.categoryId);
                                            return (
                                                <tr key={expense.id} className="hover:bg-white/5 transition-colors">
                                                    <td className="px-4 py-3 text-slate-300 text-sm">
                                                        {new Date(expense.expenseDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-3 text-slate-300 text-sm truncate max-w-[100px]">
                                                        {category?.name || 'Unknown'}
                                                    </td>
                                                    <td className="px-4 py-3 text-right font-medium text-red-400 text-sm">
                                                        -${expense.amount.toLocaleString()}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    {expenses.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4 text-slate-500 text-sm">No expenses</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Invoices Table */}
                    <div className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-white/5">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-400" />
                                Recent Invoices
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Date</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Student</th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {invoices
                                        .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))
                                        .slice(0, 5)
                                        .map((inv) => (
                                            <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                                                <td className="px-4 py-3 text-slate-300 text-sm">
                                                    {new Date(inv.issueDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3 text-slate-300 text-sm truncate max-w-[100px]">
                                                    {inv.studentName || 'Unknown'}
                                                </td>
                                                <td className="px-4 py-3 text-right font-medium text-white text-sm">
                                                    ${inv.totalAmount.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    {invoices.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4 text-slate-500 text-sm">No invoices</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Payments Table (New) */}
                    <div className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-white/5">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-green-400" />
                                Recent Payments
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Date</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">From</th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {(() => {
                                        // Extract payments from invoices and flatten
                                        const payments = invoices.flatMap(inv =>
                                            (inv.payments || []).map(p => ({
                                                ...p,
                                                studentName: inv.studentName || 'Unknown',
                                                paymentDate: p.paymentDate // Ensure date exists
                                            }))
                                        )
                                            .sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate))
                                            .slice(0, 5);

                                        if (payments.length === 0) {
                                            return (
                                                <tr>
                                                    <td colSpan="3" className="text-center py-4 text-slate-500 text-sm">No payments</td>
                                                </tr>
                                            );
                                        }

                                        return payments.map((payment, idx) => (
                                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                                                <td className="px-4 py-3 text-slate-300 text-sm">
                                                    {new Date(payment.paymentDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3 text-slate-300 text-sm truncate max-w-[100px]">
                                                    {payment.studentName}
                                                </td>
                                                <td className="px-4 py-3 text-right font-medium text-green-400 text-sm">
                                                    +${payment.amount.toLocaleString()}
                                                </td>
                                            </tr>
                                        ));
                                    })()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Reports;
