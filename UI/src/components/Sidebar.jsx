import React from 'react';
import { LayoutDashboard, Users, GraduationCap, Building2, BookOpen, LogOut, Settings, X, GraduationCap as CapIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, user } = useAuth();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Users, label: 'Students', path: '/students' },
        { icon: GraduationCap, label: 'Teachers', path: '/teachers' },
        { icon: Building2, label: 'Departments', path: '/departments' },
        { icon: BookOpen, label: 'Courses', path: '/courses' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleClick = (path) => {
        navigate(path);
        if (setIsMobileOpen) setIsMobileOpen(false); // Close drawer on mobile click
    };

    return (
        <>
            {/* Mobile Backdrop */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <aside className={`fixed left-0 top-0 h-screen w-64 bg-black/90 backdrop-blur-xl border-r border-white/10 flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Close Button Mobile */}
                <button
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                >
                    <X size={24} />
                </button>

                {/* Logo Area */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <CapIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-white font-bold text-lg leading-tight">Future Steps</h1>
                            <p className="text-blue-200/60 text-xs font-medium">Academy</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => handleClick(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* User & Logout */}
                <div className="p-4 border-t border-white/10 bg-black/40">
                    <div className="mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                            {user?.role?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-white text-sm font-semibold truncate">{user?.userName || 'User'}</p>
                            <p className="text-slate-400 text-xs truncate">{user?.email}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
