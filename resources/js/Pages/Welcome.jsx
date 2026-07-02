import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState, useEffect } from 'react';
import { Building, MapPin, Star, ArrowRight, ExternalLink, Calendar, Users, Shield, Phone, Mail } from 'lucide-react';

export default function Welcome({ canLogin, canRegister }) {
    const [isVisible, setIsVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const heroImages = [
        '/home_hero1.jpg',
        '/apt 211.jpg',
        '/apt-204.jpg',
        '/Apt-323.jpg'
    ];

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <GuestLayout>
            <Head title="Essential Living Expressed - The 900" />

            {/* Ultra Modern Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Dynamic Background Images */}
                <div className="absolute inset-0 z-0">
                    {heroImages.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <img
                                src={image}
                                alt={`The 900 Building ${index + 1}`}
                                className="w-full h-full object-cover scale-110 animate-slow-zoom"
                            />
                        </div>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
                    
                    {/* Animated Overlay Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 z-5">
                    <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse opacity-60"></div>
                    <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-ping opacity-40"></div>
                    <div className="absolute bottom-40 left-20 w-3 h-3 bg-white rounded-full animate-bounce opacity-30"></div>
                    <div className="absolute bottom-60 right-10 w-1 h-1 bg-white rounded-full animate-pulse opacity-50"></div>
                </div>

                {/* Main Content */}
                <div className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {/* Logo with Animation */}
                    <div className="mb-12 transform hover:scale-110 transition-transform duration-500">
                        <img
                            src="/logo.svg"
                            alt="The 900 Logo"
                            className="h-24 mx-auto mb-8 filter drop-shadow-2xl"
                        />
                    </div>

                    {/* Main Heading with Gradient */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter">
                        <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-gradient-x">
                            THE 900
                        </span>
                    </h1>

                    {/* Tagline with Typewriter Effect */}
                    <div className="mb-12">
                        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-widest mb-4">
                            Essential Living
                        </p>
                        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-widest">
                            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Expressed
                            </span>
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-xl md:text-2xl text-gray-200 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
                        Where modern luxury meets urban sophistication. Experience downtown living 
                        <span className="text-white font-medium"> redefined</span>.
                    </p>

                    {/* Modern CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                        <Link
                            href="/floor-plans/dynamic"
                            className="group relative bg-white text-black px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-white/20 overflow-hidden flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                            aria-label="Explore available floor plans"
                        >
                            <Building className="w-6 h-6" aria-hidden="true" />
                            <span className="relative z-10">Check Availability</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </Link>
                        <a
                            href="https://www.rentcafe.com/residentservices/apartmentsforrent/userregistration.aspx?source=property_search&propertyid=MTQwODgwMQ%3d%3d-yrB0DUVwqt0%3d"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative border-3 border-white text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white hover:text-black transition-all duration-500 transform hover:scale-110 backdrop-blur-sm bg-white/10 overflow-hidden flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                            aria-label="Apply now for apartment rental - opens in new window"
                        >
                            <ExternalLink className="w-6 h-6" aria-hidden="true" />
                            <span className="relative z-10">Apply Now</span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </a>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">200+</div>
                            <div className="text-sm text-gray-300 uppercase tracking-wide">Units</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">95</div>
                            <div className="text-sm text-gray-300 uppercase tracking-wide">Walk Score</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">24/7</div>
                            <div className="text-sm text-gray-300 uppercase tracking-wide">Concierge</div>
                        </div>
                    </div>

                    {/* Auth Links */}
                    {canLogin && (
                        <div className="flex justify-center space-x-6">
                            <Link
                                href="/login"
                                className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium tracking-wide"
                            >
                                Admin Portal
                            </Link>
                            {canRegister && (
                                <Link
                                    href="/register"
                                    className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium tracking-wide"
                                >
                                    Register
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                {/* Modern Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="flex flex-col items-center animate-bounce">
                        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
                        </div>
                        <div className="text-white text-xs mt-2 tracking-widest">SCROLL</div>
                    </div>
                </div>

                {/* Image Indicators */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Ultra Modern Features Section */}
            <div className="relative bg-white py-32 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-20">
                        <div className="inline-block mb-6">
                            <span className="text-sm font-bold text-black tracking-[0.3em] uppercase">Why Choose</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-black mb-8 tracking-tight">
                            THE 900
                        </h2>
                        <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                            Where every detail is designed for the modern urbanite
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Feature 1 */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
                            <div className="relative bg-white border border-gray-100 rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2">
                                <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                    <Building className="w-10 h-10 text-white" aria-hidden="true" />
                                </div>
                                <h3 className="text-3xl font-bold text-black mb-6">Architectural Excellence</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Award-winning contemporary design with floor-to-ceiling windows, premium finishes, and thoughtfully curated living spaces.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
                            <div className="relative bg-white border border-gray-100 rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2">
                                <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                    <MapPin className="w-10 h-10 text-white" aria-hidden="true" />
                                </div>
                                <h3 className="text-3xl font-bold text-black mb-6">Downtown Epicenter</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Walk Score 95 location in the heart of downtown LA. Steps from world-class dining, entertainment, and cultural attractions.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
                            <div className="relative bg-white border border-gray-100 rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2">
                                <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                    <Star className="w-10 h-10 text-white" aria-hidden="true" />
                                </div>
                                <h3 className="text-3xl font-bold text-black mb-6">Luxury Redefined</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Rooftop infinity pool, state-of-the-art fitness center, 24/7 concierge, and exclusive resident lounges with city views.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stunning Gallery Preview */}
            <div className="relative bg-black py-32 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black animate-gradient-x"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
                            Experience
                            <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                The Difference
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
                            Step inside and discover spaces designed for the way you live
                        </p>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                        {['/home_hero1.jpg', '/apt 211.jpg', '/apt-204.jpg', '/Apt-323.jpg'].map((image, index) => (
                            <div key={index} className="group relative overflow-hidden rounded-2xl aspect-square">
                                <img
                                    src={image}
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        <ArrowRight className="w-6 h-6 text-white" aria-hidden="true" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            href="/gallery"
                            className="inline-flex items-center bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-500 transform hover:scale-110 shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                            aria-label="View full gallery of The 900 apartments"
                        >
                            View Full Gallery
                            <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Ultra Modern CTA Section */}
            <div className="relative bg-white py-32 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-black/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-black/3 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <span className="text-sm font-bold text-black tracking-[0.3em] uppercase mb-6 block">Ready to Begin</span>
                        <h2 className="text-5xl md:text-7xl font-black text-black mb-8 tracking-tight leading-none">
                            Your Story
                            <span className="block text-4xl md:text-5xl font-light text-gray-600 mt-4">
                                Starts Here
                            </span>
                        </h2>
                    </div>

                    <p className="text-2xl text-gray-600 mb-16 max-w-4xl mx-auto font-light leading-relaxed">
                        Join the select few who call The 900 home. Schedule your private tour today.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
                        <a
                            href="https://www.rentcafe.com/residentservices/apartmentsforrent/userregistration.aspx?source=property_search&propertyid=MTQwODgwMQ%3d%3d-yrB0DUVwqt0%3d"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-black text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-gray-900 transition-all duration-500 transform hover:scale-110 shadow-2xl overflow-hidden flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                            aria-label="Apply now for apartment rental - opens in new window"
                        >
                            <ExternalLink className="w-6 h-6" aria-hidden="true" />
                            <span className="relative z-10">Apply Now</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </a>
                        <Link
                            href="/floor-plans/dynamic"
                            className="group relative border-3 border-black text-black px-12 py-6 rounded-2xl font-bold text-xl hover:bg-black hover:text-white transition-all duration-500 transform hover:scale-110 overflow-hidden flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                            aria-label="Check apartment availability and floor plans"
                        >
                            <Building className="w-6 h-6" aria-hidden="true" />
                            <span className="relative z-10">Check Availability</span>
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </Link>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-12 text-gray-600">
                        <div className="flex items-center">
                            <Phone className="w-5 h-5 mr-3" aria-hidden="true" />
                            <span className="font-medium">213-900-0900</span>
                        </div>
                        <div className="flex items-center">
                            <Mail className="w-5 h-5 mr-3" aria-hidden="true" />
                            <span className="font-medium">leasing@the900apts.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}