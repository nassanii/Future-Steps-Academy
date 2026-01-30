import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../hooks/useAuth';
import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, label, icon: Icon, color }) => (
    <div className="bg-slate-800/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:bg-slate-800/80 transition-all duration-300 group">
        <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6" />
            </div>
            <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12%
            </span>
        </div>
        <div className="space-y-1">
            <h3 className="text-slate-400 font-medium text-sm">{title}</h3>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-slate-500 text-xs">{label}</p>
        </div>
    </div>
);

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <DashboardLayout>
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{user?.userName || 'User'}</span> 👋
                </h1>
                <p className="text-slate-400">Here's what's happening at Future Steps Academy today.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Total Students"
                    value="1,248"
                    label="Active enrollments"
                    icon={Users}
                    color="from-blue-500 to-cyan-500"
                />
                <StatCard
                    title="Total Teachers"
                    value="84"
                    label="Qualified instructors"
                    icon={GraduationCap}
                    color="from-purple-500 to-pink-500"
                />
                <StatCard
                    title="Active Courses"
                    value="42"
                    label="Across 6 departments"
                    icon={BookOpen}
                    color="from-orange-500 to-red-500"
                />
                <StatCard
                    title="Total Departments"
                    value="6"
                    label="Operating faculties"
                    icon={BookOpen}
                    color="from-emerald-500 to-teal-500"
                />
            </div>

            {/* Recent Activity Section (Placeholder) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl p-6 min-h-[300px]">
                    <h3 className="text-white font-bold text-lg mb-6">Recent Enrolments</h3>
                    <div className="space-y-4">
                        {/* Placeholder List */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-700 animate-pulse" />
                                    <div className="space-y-2">
                                        <div className="w-32 h-4 bg-slate-700 rounded animate-pulse" />
                                        <div className="w-20 h-3 bg-slate-800 rounded animate-pulse" />
                                    </div>
                                </div>
                                <div className="w-16 h-6 bg-slate-700 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl p-6 min-h-[300px]">
                    <h3 className="text-white font-bold text-lg mb-6">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all text-sm">
                            Add New Student
                        </button>
                        <button className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all text-sm">
                            Create Course
                        </button>
                        <button className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all text-sm">
                            Generate Report
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
