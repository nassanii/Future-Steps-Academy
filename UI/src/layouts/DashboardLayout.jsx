import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

const DashboardLayout = ({ children }) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="min-h-screen w-full bg-black text-white flex overflow-hidden relative">
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-purple-600/10 blur-[120px]" />
            </div>

            {/* Sidebar */}
            <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

            {/* Main Content */}
            <main className="flex-1 md:ml-64 h-screen overflow-y-auto relative z-10 w-full transition-all duration-300">
                {/* Mobile Header with Hamburger */}
                <div className="md:hidden p-4 flex items-center gap-3 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-30">
                    <button
                        onClick={() => setIsMobileOpen(true)}
                        className="p-2 text-slate-300 hover:text-white bg-white/5 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-lg">Future Steps Academy</span>
                </div>

                <div className="p-4 md:p-8 w-full">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
