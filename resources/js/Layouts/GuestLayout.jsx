import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Menu, X, Building, Home } from 'lucide-react';

export default function GuestLayout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <div className="min-h-screen bg-white flex flex-col justify-between">
            {/* Sleek Minimalist Header */}
            <nav className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-neutral-900 shadow-2xl z-55">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Title replaces Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-2 group">
                                <span className="text-xl font-black text-white tracking-tight uppercase group-hover:text-gray-200 transition-colors">
                                    Floor Availability
                                </span>
                            </Link>
                        </div>

                        {/* Navigation - Desktop (No Hamburger, direct buttons) */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Link
                                href="/floor-plans/dynamic"
                                className="bg-white text-black px-5 py-2.5 rounded-xl font-bold hover:bg-gray-100 transition-all text-sm flex items-center space-x-2 shadow-lg"
                            >
                                <Building className="w-4 h-4" />
                                <span>900 Availability</span>
                            </Link>
                            <Link
                                href="/floor-plans/nexus"
                                className="bg-neutral-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-neutral-850 transition-all text-sm border border-neutral-855 flex items-center space-x-2 shadow-lg"
                            >
                                <Building className="w-4 h-4" />
                                <span>Nexus Availability</span>
                            </Link>
                        </div>

                        {/* Navigation - Mobile Hamburger Trigger */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-850 transition-all duration-300 border border-neutral-800"
                                aria-label="Toggle navigation menu"
                            >
                                <Menu className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Drawer (Only lists the two availability buttons) */}
                <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    {/* Backdrop */}
                    <div onClick={() => setIsMenuOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                    
                    {/* Panel */}
                    <div className={`absolute right-0 top-0 bottom-0 w-72 bg-neutral-950 border-l border-neutral-900 p-6 flex flex-col justify-between transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div>
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between pb-6 border-b border-neutral-900 mb-8">
                                <span className="text-base font-black text-white tracking-tight uppercase">Floor Availability</span>
                                <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg">
                                    <X className="w-4 h-4 text-white" />
                                </button>
                            </div>

                            {/* Options */}
                            <div className="space-y-4">
                                <Link
                                    href="/"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center space-x-3 text-gray-300 hover:text-white font-semibold py-3 px-4 rounded-xl hover:bg-neutral-900 transition-all border border-transparent hover:border-neutral-900"
                                >
                                    <Home className="w-5 h-5 text-gray-400" />
                                    <span>Home</span>
                                </Link>
                                <Link
                                    href="/floor-plans/dynamic"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center space-x-3 text-gray-300 hover:text-white font-semibold py-3 px-4 rounded-xl hover:bg-neutral-900 transition-all border border-transparent hover:border-neutral-900"
                                >
                                    <Building className="w-5 h-5 text-gray-400" />
                                    <span>900 Availability</span>
                                </Link>
                                <Link
                                    href="/floor-plans/nexus"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center space-x-3 text-gray-300 hover:text-white font-semibold py-3 px-4 rounded-xl hover:bg-neutral-900 transition-all border border-transparent hover:border-neutral-900"
                                >
                                    <Building className="w-5 h-5 text-gray-400" />
                                    <span>Nexus Availability</span>
                                </Link>
                            </div>
                        </div>

                        {/* Drawer Footer */}
                        <div className="text-center text-xs text-gray-600">
                            © 2026 Floor Availability.
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content Container */}
            <main className="pt-20 flex-1">
                {children}
            </main>

            {/* Redesigned Footer (Only brand and copyright per user request) */}
            <footer className="bg-black text-white py-12 border-t border-neutral-900 shrink-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="text-lg font-black tracking-tight uppercase text-white">
                        Floor Availability
                    </span>
                    <p className="text-neutral-500 text-xs font-medium tracking-wide">
                        © 2026 Floor Availability. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}