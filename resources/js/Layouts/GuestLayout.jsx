import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Menu, X, Home, Building, Camera, MapPin, Info, Phone, ExternalLink } from 'lucide-react';

export default function GuestLayout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigation = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Availability', href: '/floor-plans/dynamic', icon: Building },
        { name: 'Gallery', href: '/gallery', icon: Camera },
        { name: 'Neighborhood', href: '/neighborhood', icon: MapPin },
        { name: 'Information', href: '/information', icon: Info },
        { name: 'Contact', href: '/contact', icon: Phone },
    ];

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('.menu-container')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

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
        <div className="min-h-screen bg-white">
            {/* Sleek Black Header */}
            <nav className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-3 group">
                                <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <span className="text-black font-black text-lg">9</span>
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="text-2xl font-black text-white tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        THE 900
                                    </h1>
                                    <p className="text-xs text-gray-400 font-medium tracking-wide">
                                        ESSENTIAL LIVING EXPRESSED
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* CTA Buttons and Menu - Desktop & Mobile */}
                        <div className="flex items-center space-x-3 md:space-x-4">
                            {/* Apply Now Button */}
                            <a
                                href="https://www.rentcafe.com/residentservices/apartmentsforrent/userregistration.aspx?source=property_search&propertyid=MTQwODgwMQ%3d%3d-yrB0DUVwqt0%3d"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-white to-gray-100 text-black px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold hover:from-gray-100 hover:to-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-2 text-sm md:text-base border border-gray-200/20"
                                aria-label="Apply now for apartment rental - opens in new window"
                            >
                                <span>Apply Now</span>
                                <ExternalLink className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" />
                            </a>

                            {/* Availability Button */}
                            <Link
                                href="/floor-plans/dynamic"
                                className="bg-gray-800/80 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-2 text-sm md:text-base border border-gray-600/50"
                                aria-label="Check apartment availability and floor plans"
                            >
                                <Building className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" />
                                <span className="hidden sm:inline">Availability</span>
                                <span className="sm:hidden">Units</span>
                            </Link>

                            {/* Sleek Animated Hamburger Menu Button */}
                            <div className="menu-container">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="relative p-3 rounded-xl bg-gray-800/60 hover:bg-gray-700/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black group backdrop-blur-sm border border-gray-600/30"
                                    aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                                    aria-expanded={isMenuOpen}
                                    aria-controls="navigation-menu"
                                >
                                    <div className="w-6 h-6 flex flex-col justify-center items-center">
                                        <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-out ${
                                            isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                                        }`}></span>
                                        <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-out ${
                                            isMenuOpen ? 'opacity-0' : 'opacity-100'
                                        }`}></span>
                                        <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-out ${
                                            isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                                        }`}></span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            {/* Sleek Black Full-Screen Navigation Overlay */}
            <div 
                id="navigation-menu"
                className={`fixed inset-0 z-50 transition-all duration-500 ease-in-out ${
                    isMenuOpen 
                        ? 'opacity-100 visible' 
                        : 'opacity-0 invisible'
                }`}
                role="menu"
                aria-orientation="vertical"
            >
                {/* Enhanced Backdrop with Blur */}
                <div 
                    className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500 ${
                        isMenuOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                ></div>
                
                {/* Sleek Black Menu Panel */}
                <div 
                    className={`menu-container absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-black via-gray-900 to-black shadow-2xl transform transition-transform duration-500 ease-in-out border-l border-gray-800/50 ${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    {/* Sleek Menu Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-800/50 bg-black/50 backdrop-blur-sm">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center shadow-lg">
                                <span className="text-black font-black text-sm">9</span>
                            </div>
                            <div>
                                <h2 className="text-lg font-black text-white tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    THE 900
                                </h2>
                                <p className="text-xs text-gray-400 font-medium tracking-wide">
                                    ESSENTIAL LIVING EXPRESSED
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 rounded-xl bg-gray-800/60 hover:bg-gray-700/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black border border-gray-600/30"
                            aria-label="Close navigation menu"
                        >
                            <X className="w-6 h-6 text-gray-300" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Enhanced Navigation Links */}
                    <div className="px-6 py-8 space-y-2 overflow-y-auto bg-black">
                        {navigation.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center space-x-4 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/50 font-semibold py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black group border border-transparent hover:border-gray-600/30 ${
                                        isMenuOpen ? 'animate-slide-in' : ''
                                    }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                    onClick={() => setIsMenuOpen(false)}
                                    role="menuitem"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center group-hover:from-white group-hover:to-gray-100 group-hover:text-black transition-all duration-300 shadow-lg border border-gray-700/50 group-hover:border-transparent">
                                        <IconComponent className="w-6 h-6" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <span className="text-lg">{item.name}</span>
                                        <p className="text-sm text-gray-500 group-hover:text-gray-400">
                                            {item.name === 'Home' && 'Welcome to The 900'}
                                            {item.name === 'Availability' && 'Check floor plans'}
                                            {item.name === 'Gallery' && 'View our spaces'}
                                            {item.name === 'Neighborhood' && 'Explore the area'}
                                            {item.name === 'Information' && 'Learn more'}
                                            {item.name === 'Contact' && 'Get in touch'}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Enhanced CTA Buttons in Menu */}
                    <div className="px-6 py-6 border-t border-gray-800/50 space-y-4 bg-black/30 backdrop-blur-sm">
                        <a
                            href="https://www.rentcafe.com/residentservices/apartmentsforrent/userregistration.aspx?source=property_search&propertyid=MTQwODgwMQ%3d%3d-yrB0DUVwqt0%3d"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-white to-gray-100 text-black px-6 py-4 rounded-xl font-bold hover:from-gray-100 hover:to-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Apply now for apartment rental - opens in new window"
                        >
                            <ExternalLink className="w-5 h-5" aria-hidden="true" />
                            <span>Apply Now</span>
                        </a>
                        
                        <Link
                            href="/floor-plans/dynamic"
                            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white px-6 py-4 rounded-xl font-bold hover:from-gray-700 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black border border-gray-600/30"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Check apartment availability and floor plans"
                        >
                            <Building className="w-5 h-5" aria-hidden="true" />
                            <span>Check Availability</span>
                        </Link>
                    </div>

                    {/* Enhanced Contact Info in Menu */}
                    <div className="px-6 py-6 bg-gradient-to-r from-gray-900/50 to-black/50 mt-auto border-t border-gray-800/30">
                        <h3 className="text-sm font-bold text-white mb-3 flex items-center space-x-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span>Contact Info</span>
                        </h3>
                        <div className="space-y-3 text-sm text-gray-400">
                            <p className="flex items-center space-x-3 hover:text-white transition-colors duration-200">
                                <div className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center">
                                    <Phone className="w-4 h-4" aria-hidden="true" />
                                </div>
                                <span>(555) 123-4567</span>
                            </p>
                            <p className="flex items-center space-x-3 hover:text-white transition-colors duration-200">
                                <div className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-4 h-4" aria-hidden="true" />
                                </div>
                                <span>900 Main Street, Downtown</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </nav>

            {/* Main Content */}
            <main className="pt-20">
                {children}
            </main>

            {/* Modern Footer */}
            <footer className="bg-black text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Logo and Description */}
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center shadow-lg">
                                    <span className="text-black font-black text-xl">9</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        THE 900
                                    </h3>
                                    <p className="text-xs text-gray-400 font-medium tracking-wide">
                                        ESSENTIAL LIVING EXPRESSED
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-6 max-w-md">
                                Experience modern luxury living in the heart of the city. Our thoughtfully designed 
                                apartments offer the perfect blend of comfort, style, and convenience.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/floor-plans/dynamic" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        Floor Plans
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        Gallery
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/neighborhood" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        Neighborhood
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/information" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        Information
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/login" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        Admin Login
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
                            <div className="space-y-3 text-gray-300">
                                <p>900 Main Street<br />Downtown District<br />City, State 12345</p>
                                <p>(555) 123-4567</p>
                                <p>info@the900.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © 2024 The 900. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                                Privacy Policy
                            </Link>
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}