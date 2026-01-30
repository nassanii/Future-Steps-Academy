import React, { useEffect, useState } from 'react';
import { BookOpen, GraduationCap, School, ShieldCheck } from 'lucide-react';

const AuthLayout = ({ role, setRole, children, animateHeader }) => {

    // Theme configuration
    const themes = {
        student: {
            primary: 'bg-black hover:bg-gray-800',
            text: 'text-black',
            border: 'border-gray-200 focus:border-black',
            ring: 'focus:ring-gray-100',
            bg: 'bg-gray-50',
            icon: <GraduationCap size={24} />,
            label: 'Student Portal',
            quote: "Education is the passport to the future.",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000"
        },
        teacher: {
            primary: 'bg-zinc-900 hover:bg-zinc-800',
            text: 'text-zinc-900',
            border: 'border-zinc-200 focus:border-zinc-900',
            ring: 'focus:ring-zinc-100',
            bg: 'bg-zinc-50',
            icon: <School size={24} />,
            label: 'Staff Access',
            quote: "To teach is to learn twice.",
            image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000"
        },
        admin: {
            primary: 'bg-slate-900 hover:bg-slate-800',
            text: 'text-slate-900',
            border: 'border-slate-200 focus:border-slate-900',
            ring: 'focus:ring-slate-100',
            bg: 'bg-slate-50',
            icon: <ShieldCheck size={24} />,
            label: 'Admin Console',
            quote: "Leadership is about making others better.",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
        }
    };

    const currentTheme = themes[role];

    const getOverlayColor = (r) => {
        switch (r) {
            case 'student': return 'bg-black';
            case 'teacher': return 'bg-zinc-900';
            case 'admin': return 'bg-slate-900';
            default: return 'bg-black';
        }
    };

    return (
        <div className="min-h-screen w-full bg-neutral-200 flex items-center justify-center p-4 font-sans text-slate-800">

            {/* Main Card Container - Ultra Maximized */}
            <div className="w-[98vw] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[95vh] transition-all duration-500">

                {/* Left Side - Visual & Branding */}
                <div className="flex w-full h-64 md:h-auto md:w-1/2 relative flex-col justify-between p-6 md:p-12 text-white transition-all duration-500 ease-in-out">

                    <div className="absolute inset-0 z-0">
                        {/* Smooth Image Transition */}
                        {Object.keys(themes).map((themeKey) => (
                            <img
                                key={themeKey}
                                src={themes[themeKey].image}
                                alt={`${themeKey} background`}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out grayscale-[20%] ${role === themeKey ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            />
                        ))}
                        <div className={`absolute inset-0 z-20 opacity-80 transition-colors duration-500 ${getOverlayColor(role)}`}></div>
                        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 to-transparent opacity-90"></div>
                    </div>

                    <div className="relative z-10 flex items-center gap-3">
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-md border border-white/10">
                            <BookOpen size={24} className="text-white" />
                        </div>
                        <span className="text-xl md:text-2xl font-bold tracking-tight text-white">Future Steps Academy</span>
                    </div>

                    <div className="hidden md:block relative z-10 mb-8">
                        <div className={`w-12 h-1 bg-white/50 mb-6 rounded-full transition-all duration-500 ${animateHeader ? 'w-12 opacity-100' : 'w-0 opacity-0'}`}></div>
                        <h2 className="text-4xl font-bold leading-tight mb-4 transition-all duration-300 tracking-tight">
                            {currentTheme.label}
                        </h2>
                        <p className="text-lg text-white/80 font-medium italic">
                            "{currentTheme.quote}"
                        </p>
                    </div>

                    <div className="hidden md:flex relative z-10 text-sm text-white/50 justify-between items-center font-medium">
                        <span>© 2024 Future Steps Academy</span>
                        <span>v2.4.0</span>
                    </div>
                </div>

                {/* Right Side - Content Area */}
                <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-white relative">

                    <div className={`max-w-sm mx-auto w-full transition-opacity duration-700 ${animateHeader ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {/* Role Switcher */}
                        <div className="bg-white p-1 rounded-lg flex mb-8 border border-neutral-200 shadow-sm">
                            {Object.keys(themes).map((r) => (
                                <button
                                    key={r}
                                    onClick={() => setRole(r)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-md transition-all duration-300 ${role === r
                                        ? 'bg-neutral-900 text-white shadow-md'
                                        : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                                        }`}
                                    type="button"
                                >
                                    <span className={role === r ? 'text-white' : ''}>
                                        {r === 'student' && <GraduationCap size={16} />}
                                        {r === 'teacher' && <School size={16} />}
                                        {r === 'admin' && <ShieldCheck size={16} />}
                                    </span>
                                    <span className="capitalize hidden sm:inline">{r}</span>
                                </button>
                            ))}
                        </div>

                        {/* Child Content (Form) */}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
