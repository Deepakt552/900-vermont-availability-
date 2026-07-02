import { Head, Link, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState, useEffect } from 'react';
import { Building } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <GuestLayout>
            <Head title="Real-Time Floor Availability" />

            {/* Ultra Modern Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
                
                {/* ── Stunning Abstract CSS Grid & Radial Mesh Background ── */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {/* Animated color gradient backdrop */}
                    <div 
                        className="absolute inset-0 opacity-[0.25]" 
                        style={{
                            background: 'radial-gradient(circle at 20% 30%, #1e1e24 0%, transparent 50%), radial-gradient(circle at 80% 70%, #111115 0%, transparent 50%), #000000',
                            filter: 'blur(40px)',
                        }}
                    />
                    
                    {/* Blueprint architectural grid layer */}
                    <div 
                        className="absolute inset-0 opacity-[0.05]"
                        style={{
                            backgroundImage: `
                                radial-gradient(circle, #ffffff 1px, transparent 1px), 
                                linear-gradient(to right, #ffffff 1px, transparent 1px), 
                                linear-gradient(to bottom, #ffffff 1px, transparent 1px)
                            `,
                            backgroundSize: '40px 40px, 80px 80px, 80px 80px',
                            backgroundPosition: 'center center',
                        }}
                    />
                    
                    {/* Ambient subtle light lines */}
                    <div 
                        className="absolute inset-x-0 top-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" 
                        style={{ animationDuration: '4s' }}
                    />
                    <div 
                        className="absolute inset-x-0 bottom-1/3 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" 
                        style={{ animationDuration: '6s' }}
                    />
                    
                    {/* Linear gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black"></div>
                </div>

                {/* Main Content */}
                <div className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    
                    {/* Header Text */}
                    <div className="mb-4">
                        <span className="text-xs font-bold text-white tracking-[0.4em] uppercase block mb-3">
                            Real-Time
                        </span>
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter uppercase leading-none">
                            Floor Availability
                        </h1>
                    </div>

                    {/* Properties Subtitle */}
                    <p className="text-lg md:text-2xl text-gray-300 font-light tracking-wide max-w-3xl mx-auto mb-12">
                        Interactive blueprints for <span className="font-semibold text-white">The 900 Apartments</span> & <span className="font-semibold text-white">Northridge Nexus</span>
                    </p>

                    {/* Split Availability Check Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                        <Link
                            href="/floor-plans/dynamic"
                            className="group relative bg-white text-black px-8 py-4 rounded-xl font-bold text-base hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-auto justify-center"
                            aria-label="Explore available floor plans in The 900"
                        >
                            <Building className="w-4.5 h-4.5 text-black" aria-hidden="true" />
                            <span>Check Availability in 900</span>
                        </Link>
                        <Link
                            href="/floor-plans/nexus"
                            className="group relative border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 backdrop-blur-xs bg-white/5 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-auto justify-center"
                            aria-label="Explore available floor plans in Northridge Nexus"
                        >
                            <Building className="w-4.5 h-4.5" aria-hidden="true" />
                            <span>Check Availability in Nexus</span>
                        </Link>
                    </div>

                    {/* Quick Info Bar */}
                    <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-12 border-t border-white/10 pt-8 text-white">
                        <div className="text-center">
                            <div className="text-xl font-bold">260+</div>
                            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Total Listings</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-bold">100%</div>
                            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Live Sync</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-bold">24/7</div>
                            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Digital Access</div>
                        </div>
                    </div>

                    {/* Admin Portal / Dashboard Link */}
                    <div className="flex justify-center border-t border-white/5 pt-6">
                        {user ? (
                            <Link
                                href="/dashboard"
                                className="text-white/35 hover:text-white transition-colors duration-300 text-xs font-bold uppercase tracking-widest"
                            >
                                Enter Dashboard Portal
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="text-white/35 hover:text-white transition-colors duration-300 text-xs font-bold uppercase tracking-widest"
                            >
                                Admin Login Portal
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}