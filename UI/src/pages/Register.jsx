import React, { useState, useEffect } from 'react';
import { User, Lock, Eye, EyeOff, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
    const [role, setRole] = useState('student');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [animateHeader, setAnimateHeader] = useState(false);

    const { register, loading, error } = useAuth();

    useEffect(() => {
        setAnimateHeader(true);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    // Theme helpers for form elements
    const getThemeStyles = (r) => {
        switch (r) {
            case 'student': return { text: 'text-black', border: 'border-gray-200 focus:border-black', ring: 'focus:ring-gray-100', primary: 'bg-black hover:bg-gray-800' };
            case 'teacher': return { text: 'text-zinc-900', border: 'border-zinc-200 focus:border-zinc-900', ring: 'focus:ring-zinc-100', primary: 'bg-zinc-900 hover:bg-zinc-800' };
            case 'admin': return { text: 'text-slate-900', border: 'border-slate-200 focus:border-slate-900', ring: 'focus:ring-slate-100', primary: 'bg-slate-900 hover:bg-slate-800' };
            default: return { text: 'text-black', border: 'border-gray-200 focus:border-black', ring: 'focus:ring-gray-100', primary: 'bg-black hover:bg-gray-800' };
        }
    };

    const theme = getThemeStyles(role);

    const handleSubmit = (e) => {
        e.preventDefault();
        register(formData.firstName, formData.lastName, formData.email, formData.password);
    };

    return (
        <AuthLayout role={role} setRole={setRole} animateHeader={animateHeader}>
            <div className="mb-8 text-center md:text-left">
                <h1 className="text-3xl font-extrabold text-neutral-900 mb-2 tracking-tighter">Create Account</h1>
                <p className="text-neutral-500 font-medium">Join Future Steps Academy today.</p>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 ml-1">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className={`block w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 transition-all duration-300 outline-none focus:ring-2 focus:ring-offset-0 ${theme.border} ${theme.ring}`}
                            placeholder="John"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 ml-1">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className={`block w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 transition-all duration-300 outline-none focus:ring-2 focus:ring-offset-0 ${theme.border} ${theme.ring}`}
                            placeholder="Doe"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 ml-1">
                        Email Address
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className={`h-5 w-5 transition-colors duration-300 ${theme.text}`} />
                        </div>
                        <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={`block w-full pl-11 pr-4 py-3 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 transition-all duration-300 outline-none focus:ring-2 focus:ring-offset-0 ${theme.border} ${theme.ring}`}
                            placeholder="name@school.edu"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 ml-1">
                        Password
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className={`h-5 w-5 transition-colors duration-300 ${theme.text}`} />
                        </div>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className={`block w-full pl-11 pr-12 py-3 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 transition-all duration-300 outline-none focus:ring-2 focus:ring-offset-0 ${theme.border} ${theme.ring}`}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ${theme.primary} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <>
                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Creating Account...</span>
                        </>
                    ) : (
                        <>
                            <span>Sign Up</span>
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>

            </form>

            <p className="mt-8 text-center text-sm text-neutral-500 font-medium">
                Already have an account? <Link to="/login" className={`font-bold hover:underline ${theme.text}`}>Sign In</Link>
            </p>
        </AuthLayout>
    );
};

export default Register;
