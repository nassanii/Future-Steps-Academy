import React, { useState, useEffect } from 'react';
import { User, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const [role, setRole] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [animateHeader, setAnimateHeader] = useState(false);

    const { login, loading, error } = useAuth();

    // Trigger entrance animation
    useEffect(() => {
        setAnimateHeader(true);
    }, []);

    // Theme helpers for form elements (specific to inputs)
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
        login(email, password);
    };

    return (
        <AuthLayout role={role} setRole={setRole} animateHeader={animateHeader}>
            <div className="mb-8 text-center md:text-left">
                <h1 className="text-3xl font-extrabold text-neutral-900 mb-2 tracking-tighter">Welcome Back</h1>
                <p className="text-neutral-500 font-medium">Please enter your details to sign in.</p>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Email Field */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 ml-1">
                        Email Address
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className={`h-5 w-5 transition-colors duration-300 ${theme.text}`} />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={`block w-full pl-11 pr-4 py-3 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 transition-all duration-300 outline-none focus:ring-2 focus:ring-offset-0 ${theme.border} ${theme.ring}`}
                            placeholder="name@school.edu"
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                            Password
                        </label>
                        <a href="#" className={`text-xs font-bold hover:underline ${theme.text}`}>
                            Forgot Password?
                        </a>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className={`h-5 w-5 transition-colors duration-300 ${theme.text}`} />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                {/* Remember Me */}
                <div className="flex items-center ml-1">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className={`h-4 w-4 rounded border-neutral-300 text-black focus:ring-black cursor-pointer accent-black`}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-neutral-600 cursor-pointer select-none">
                        Remember me on this device
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ${theme.primary} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <>
                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Signing in...</span>
                        </>
                    ) : (
                        <>
                            <span>Sign In</span>
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>

            </form>

            <p className="mt-8 text-center text-sm text-neutral-500 font-medium">
                Don't have an account? <Link to="/register" className={`font-bold hover:underline ${theme.text}`}>Create Account</Link>
            </p>
        </AuthLayout>
    );
};

export default Login;
