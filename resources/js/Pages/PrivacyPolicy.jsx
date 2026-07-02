import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState, useEffect } from 'react';
import {
    FileText, Database, Settings, Share2, Shield, Scale,
    Lock, Phone, Mail, MapPin, ExternalLink, User,
    Building, Globe, Eye, Trash2, X, CheckCircle,
    ArrowRight, Star, Calendar, Users
} from 'lucide-react';

export default function PrivacyPolicy() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        setIsVisible(true);

        // Handle scroll spy for navigation
        const handleScroll = () => {
            const sections = document.querySelectorAll('[data-section]');
            const scrollPosition = window.scrollY + 100;

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('data-section');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActiveSection(sectionId);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.querySelector(`[data-section="${sectionId}"]`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const sections = [
        { id: 'overview', title: 'Overview', icon: FileText },
        { id: 'collection', title: 'Information Collection', icon: Database },
        { id: 'usage', title: 'How We Use Information', icon: Settings },
        { id: 'sharing', title: 'Information Sharing', icon: Share2 },
        { id: 'choices', title: 'Your Choices', icon: Shield },
        { id: 'california', title: 'California Rights', icon: Scale },
        { id: 'security', title: 'Security & Storage', icon: Lock },
        { id: 'contact', title: 'Contact Us', icon: Phone }
    ];

    return (
        <GuestLayout>
            <Head title="Privacy Policy - The 900" />

            {/* Modern Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-spin-slow"></div>
                </div>

                {/* Property Image Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/home_hero1.jpg"
                        alt="The 900 Building"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-purple-900/80 to-slate-900/90"></div>
                </div>

                <div className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Modern Badge */}
                    <div className="mb-8">
                        <span className="inline-flex items-center bg-white/10 backdrop-blur-xl text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide mb-8 border border-white/20">
                            <Shield className="w-4 h-4 mr-2" />
                            Legal Information
                        </span>
                        
                        {/* Main Title with Gradient */}
                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight">
                            <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                                Privacy
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-white bg-clip-text text-transparent">
                                Policy
                            </span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-8">
                            Your privacy matters to us. Learn how we protect and use your information with complete transparency.
                        </p>

                        {/* Modern Stats */}
                        <div className="flex flex-wrap justify-center gap-8 mb-12">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-1">100%</div>
                                <div className="text-sm text-gray-400">Transparent</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-1">GDPR</div>
                                <div className="text-sm text-gray-400">Compliant</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                                <div className="text-sm text-gray-400">Protected</div>
                            </div>
                        </div>
                    </div>

                    {/* Last Updated with Modern Design */}
                    <div className="inline-flex items-center bg-black/30 backdrop-blur-xl text-gray-300 px-4 py-2 rounded-full text-sm border border-white/10">
                        <Calendar className="w-4 h-4 mr-2" />
                        Last Updated: August 10, 2021
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Floating Navigation */}
            {/* <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden xl:block">
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-2 border border-gray-200/50">
                    <div className="space-y-1">
                        {sections.map((section) => {
                            const IconComponent = section.icon;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`group flex items-center space-x-3 w-full text-left px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                                        activeSection === section.id
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-black hover:scale-105'
                                    }`}
                                    aria-label={`Navigate to ${section.title} section`}
                                >
                                    <IconComponent className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                                    <span className="font-medium text-sm whitespace-nowrap">{section.title}</span>
                                    {activeSection === section.id && (
                                        <ArrowRight className="w-4 h-4 ml-auto" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div> */}

            {/* Main Content with Modern Design */}
            <div className="relative bg-gradient-to-b from-gray-50 to-white py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Overview Section */}
                    <section data-section="overview" className="mb-24">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl mb-6 shadow-2xl">
                                <FileText className="w-10 h-10 text-white" aria-hidden="true" />
                            </div>
                            <h2 className="text-5xl font-black text-gray-900 mb-4">Overview</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Understanding our commitment to your privacy</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full -translate-y-20 translate-x-20 opacity-50"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full translate-y-16 -translate-x-16 opacity-50"></div>
                            
                            <div className="relative z-10">
                                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                    This Privacy Policy describes how <strong className="text-purple-600">900 Vermont, LLC</strong> collects, uses, and discloses your personal information both offline and on our websites, apps, and services where this Privacy Policy appears or is referenced.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                                        <div className="flex items-center mb-4">
                                            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                                            <h4 className="font-bold text-gray-900">This Policy Applies To:</h4>
                                        </div>
                                        <ul className="space-y-3 text-gray-700">
                                            <li className="flex items-start">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                The 900 Vermont, LLC website
                                            </li>
                                            <li className="flex items-start">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                Other websites and online services we operate
                                            </li>
                                            <li className="flex items-start">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                General inquiries (mail, email, phone, in-person)
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                                        <div className="flex items-center mb-4">
                                            <X className="w-6 h-6 text-red-600 mr-3" />
                                            <h4 className="font-bold text-gray-900">Does Not Apply To:</h4>
                                        </div>
                                        <ul className="space-y-3 text-gray-700">
                                            <li className="flex items-start">
                                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                Employee and contractor information
                                            </li>
                                            <li className="flex items-start">
                                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                Third-party websites we link to
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
                                    <div className="flex items-start">
                                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                                            <Shield className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2">Important Notice</h4>
                                            <p className="text-gray-700">
                                                By accessing our website, you confirm that you have read, understand, and acknowledge the terms of this Privacy Policy. This Privacy Policy is not a contract and does not create any legal rights or obligations.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Information Collection Section */}
                    <section data-section="collection" className="mb-24">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl mb-6 shadow-2xl">
                                <Database className="w-10 h-10 text-white" aria-hidden="true" />
                            </div>
                            <h2 className="text-5xl font-black text-gray-900 mb-4">Information We Collect</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Types of personal information we gather</p>
                        </div>

                        <div className="grid gap-8">
                            {/* Contact Information */}
                            <div className="group bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                                            <User className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Contact Information</h3>
                                            <p className="text-gray-600">Basic details for communication</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mb-6">We collect basic contact details to communicate with you effectively:</p>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <ul className="space-y-3 text-gray-600">
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                                Name and email address
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                                Phone number and mailing address
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                                Account username and password
                                            </li>
                                        </ul>
                                        <ul className="space-y-3 text-gray-600">
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                                Social media account handles
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                                Correspondence records
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                                Contact preferences
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Commercial Information */}
                            <div className="group bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                                            <Building className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Commercial & Preference Information</h3>
                                            <p className="text-gray-600">Housing needs and preferences</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mb-6">Information related to your housing needs and preferences:</p>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <ul className="space-y-3 text-gray-600">
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                                Purchase and rental history
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                                Leasing details and preferences
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                                Financial and employment information
                                            </li>
                                        </ul>
                                        <ul className="space-y-3 text-gray-600">
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                                Government-issued identification
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                                Survey responses and comments
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                                Vehicle and license plate information
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Technical Information */}
                            <div className="group bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                                            <Globe className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Internet & Network Activity</h3>
                                            <p className="text-gray-600">Technical data from digital interactions</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mb-6">Technical data from your interactions with our digital services:</p>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <ul className="space-y-3 text-gray-600">
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                                Browser type and IP address
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                                Device identifiers and information
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                                Wi-Fi network usage data
                                            </li>
                                        </ul>
                                        <ul className="space-y-3 text-gray-600">
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                                Page interaction information
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                                Search terms and browsing patterns
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                                Referral and exit page data
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Property Showcase */}
                    <div className="mb-24">
                        <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                            {/* Animated Background */}
                            <div className="absolute inset-0">
                                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                            </div>
                            
                            <div className="relative z-10">
                                <div className="text-center mb-8">
                                    <h3 className="text-4xl font-bold mb-4">Experience The 900</h3>
                                    <p className="text-xl text-gray-300">Your privacy is protected while you explore our luxury living spaces</p>
                                </div>
                                
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                    {['/apt 211.jpg', '/apt-204.jpg', '/Apt-323.jpg', '/images/home_hero1.jpg'].map((image, index) => (
                                        <div key={index} className="group relative overflow-hidden rounded-2xl aspect-square">
                                            <img
                                                src={image}
                                                alt={`The 900 Property ${index + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition-all duration-500"></div>
                                            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                    <Eye className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="text-center">
                                    <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                                        <Shield className="w-5 h-5 mr-2" />
                                        <span className="text-sm font-medium">Privacy Protected • Secure Browsing • GDPR Compliant</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>      
              {/* How We Use Information Section */}
                    <section data-section="usage" className="mb-24">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl mb-6 shadow-2xl">
                                <Settings className="w-10 h-10 text-white" aria-hidden="true" />
                            </div>
                            <h2 className="text-5xl font-black text-gray-900 mb-4">How We Use Your Information</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">The purposes for which we process your data</p>
                        </div>

                        <div className="grid gap-6">
                            {[
                                {
                                    title: "Service Delivery & Transactions",
                                    icon: Building,
                                    color: "from-blue-500 to-cyan-500",
                                    bgColor: "from-blue-50 to-cyan-50",
                                    description: "We use your information to provide services, fulfill transactions, and manage your residential or commercial lease agreements."
                                },
                                {
                                    title: "Marketing & Communications",
                                    icon: Mail,
                                    color: "from-green-500 to-emerald-500",
                                    bgColor: "from-green-50 to-emerald-50",
                                    description: "To inform you about special promotions, retailer discounts, purchase incentives, and new features or services. You can opt-in to receive newsletters and text messages."
                                },
                                {
                                    title: "Customer Support",
                                    icon: Users,
                                    color: "from-purple-500 to-pink-500",
                                    bgColor: "from-purple-50 to-pink-50",
                                    description: "We respond to your requests, questions, and feedback related to our relationship with you, including matters about this Privacy Policy or Terms of Use."
                                },
                                {
                                    title: "Analysis & Improvement",
                                    icon: Eye,
                                    color: "from-orange-500 to-red-500",
                                    bgColor: "from-orange-50 to-red-50",
                                    description: "To analyze and improve our products, services, and websites. We customize your experience and conduct research and analysis."
                                },
                                {
                                    title: "Security & Compliance",
                                    icon: Shield,
                                    color: "from-red-500 to-pink-500",
                                    bgColor: "from-red-50 to-pink-50",
                                    description: "For security purposes, legal compliance, website administration, and to detect and investigate illegal or prohibited activities."
                                },
                                {
                                    title: "Verification",
                                    icon: CheckCircle,
                                    color: "from-teal-500 to-cyan-500",
                                    bgColor: "from-teal-50 to-cyan-50",
                                    description: "To verify your identity when you make requests pursuant to this Privacy Policy. Verification steps may vary based on request sensitivity."
                                }
                            ].map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <div key={index} className={`group bg-gradient-to-br ${item.bgColor} rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden`}>
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/30 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
                                        
                                        <div className="relative z-10 flex items-start">
                                            <div className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mr-6 flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <IconComponent className="w-7 h-7 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                                <p className="text-gray-700 leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Information Sharing Section */}
                    <section data-section="sharing" className="mb-24">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl mb-6 shadow-2xl">
                                <Share2 className="w-10 h-10 text-white" aria-hidden="true" />
                            </div>
                            <h2 className="text-5xl font-black text-gray-900 mb-4">Information Sharing</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">When and how we share your personal information</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -translate-y-20 translate-x-20 opacity-50"></div>
                            
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">We Share Information With:</h3>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[
                                        {
                                            title: "900 Vermont Family",
                                            icon: Building,
                                            color: "blue",
                                            description: "Parent companies, subsidiaries, affiliates, and business units"
                                        },
                                        {
                                            title: "Service Providers",
                                            icon: Settings,
                                            color: "green",
                                            description: "Email services, website management, property management, payment processing"
                                        },
                                        {
                                            title: "Business Partners",
                                            icon: Users,
                                            color: "purple",
                                            description: "Marketing companies, promotion co-sponsors, social media platforms"
                                        },
                                        {
                                            title: "Legal Compliance",
                                            icon: Scale,
                                            color: "red",
                                            description: "Court orders, subpoenas, government agencies, fraud investigation"
                                        },
                                        {
                                            title: "Business Transactions",
                                            icon: ExternalLink,
                                            color: "orange",
                                            description: "Mergers, acquisitions, financing, due diligence processes"
                                        },
                                        {
                                            title: "Business Successors",
                                            icon: ArrowRight,
                                            color: "teal",
                                            description: "Acquirers of our business or assets, corporate structure changes"
                                        }
                                    ].map((item, index) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <div key={index} className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                                <div className={`w-12 h-12 bg-${item.color}-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                </div>
                                                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                                                <p className="text-sm text-gray-600">{item.description}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Your Choices Section */}
                    <section data-section="choices" className="mb-24">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl mb-6 shadow-2xl">
                                <Shield className="w-10 h-10 text-white" aria-hidden="true" />
                            </div>
                            <h2 className="text-5xl font-black text-gray-900 mb-4">Your Choices</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Control how we use your personal information</p>
                        </div>

                        <div className="grid gap-8">
                            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-6">
                                            <Mail className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Marketing Communications</h3>
                                            <p className="text-gray-600">Control your communication preferences</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-gray-700">You can opt out of receiving our marketing emails and text messages:</p>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
                                                <h4 className="font-semibold text-gray-900 mb-2">Email Marketing</h4>
                                                <ul className="space-y-2 text-sm text-gray-600">
                                                    <li>• Click "unsubscribe" in any email</li>
                                                    <li>• Contact us directly</li>
                                                    <li>• Update preferences in your account</li>
                                                </ul>
                                            </div>
                                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                                                <h4 className="font-semibold text-gray-900 mb-2">Text Messages</h4>
                                                <ul className="space-y-2 text-sm text-gray-600">
                                                    <li>• Reply "STOP" to any text</li>
                                                    <li>• Contact customer service</li>
                                                    <li>• Manage in account settings</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-6">
                                            <Eye className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Cookies & Tracking</h3>
                                            <p className="text-gray-600">Manage your browsing preferences</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-gray-700">You can control cookies and tracking technologies:</p>
                                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                <li>• Adjust browser settings to block cookies</li>
                                                <li>• Use private/incognito browsing mode</li>
                                                <li>• Install ad-blocking extensions</li>
                                                <li>• Opt out of interest-based advertising</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* California Rights Section */}
                    <section data-section="california" className="mb-24">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-3xl mb-6 shadow-2xl">
                                <Scale className="w-10 h-10 text-white" aria-hidden="true" />
                            </div>
                            <h2 className="text-5xl font-black text-gray-900 mb-4">California Rights</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Special rights for California residents</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full -translate-y-20 translate-x-20 opacity-50"></div>
                            
                            <div className="relative z-10">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">CCPA Rights</h3>
                                    <p className="text-gray-700 mb-6">Under the California Consumer Privacy Act, you have the right to:</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        {
                                            title: "Know",
                                            icon: Eye,
                                            description: "Request information about personal data we collect, use, and share"
                                        },
                                        {
                                            title: "Delete",
                                            icon: Trash2,
                                            description: "Request deletion of your personal information"
                                        },
                                        {
                                            title: "Opt-Out",
                                            icon: X,
                                            description: "Opt out of the sale of your personal information"
                                        },
                                        {
                                            title: "Non-Discrimination",
                                            icon: Shield,
                                            description: "Not be discriminated against for exercising your rights"
                                        }
                                    ].map((right, index) => {
                                        const IconComponent = right.icon;
                                        return (
                                            <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
                                                <div className="flex items-start">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                                                        <IconComponent className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 mb-2">{right.title}</h4>
                                                        <p className="text-gray-700 text-sm">{right.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6">
                                    <h4 className="font-bold text-gray-900 mb-3">How to Exercise Your Rights</h4>
                                    <p className="text-gray-700 mb-4">To exercise these rights, please contact us using the information in the Contact section below. We may need to verify your identity before processing your request.</p>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="inline-flex items-center bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700">
                                            <Phone className="w-4 h-4 mr-2" />
                                            Call Us
                                        </div>
                                        <div className="inline-flex items-center bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700">
                                            <Mail className="w-4 h-4 mr-2" />
                                            Email Us
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Security Section */}
                    <section data-section="security" className="mb-24">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl mb-6 shadow-2xl">
                                <Lock className="w-10 h-10 text-white" aria-hidden="true" />
                            </div>
                            <h2 className="text-5xl font-black text-gray-900 mb-4">Security & Storage</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">How we protect your information</p>
                        </div>

                        <div className="grid gap-8">
                            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-pink-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mr-6">
                                            <Shield className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Data Protection</h3>
                                            <p className="text-gray-600">Industry-standard security measures</p>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <p className="text-gray-700">We implement appropriate technical and organizational measures to protect your personal information:</p>
                                        
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 text-center">
                                                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                                                    <Lock className="w-6 h-6 text-white" />
                                                </div>
                                                <h4 className="font-semibold text-gray-900 mb-2">Encryption</h4>
                                                <p className="text-sm text-gray-600">Data encrypted in transit and at rest</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 text-center">
                                                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                                                    <Shield className="w-6 h-6 text-white" />
                                                </div>
                                                <h4 className="font-semibold text-gray-900 mb-2">Access Control</h4>
                                                <p className="text-sm text-gray-600">Limited access on need-to-know basis</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 text-center">
                                                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                                                    <Eye className="w-6 h-6 text-white" />
                                                </div>
                                                <h4 className="font-semibold text-gray-900 mb-2">Monitoring</h4>
                                                <p className="text-sm text-gray-600">Continuous security monitoring</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold mb-2">Data Retention</h3>
                                    <p className="text-gray-300">We retain your information only as long as necessary</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                                        <h4 className="font-semibold mb-3">Active Accounts</h4>
                                        <p className="text-gray-300 text-sm">Information retained while your account is active and for legitimate business purposes</p>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                                        <h4 className="font-semibold mb-3">Inactive Accounts</h4>
                                        <p className="text-gray-300 text-sm">Data may be retained for legal compliance or deleted according to our retention schedule</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section data-section="contact" className="mb-24">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl mb-6 shadow-2xl">
                                <Phone className="w-10 h-10 text-white" aria-hidden="true" />
                            </div>
                            <h2 className="text-5xl font-black text-gray-900 mb-4">Contact Us</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get in touch about privacy matters</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full -translate-y-20 translate-x-20 opacity-50"></div>
                            
                            <div className="relative z-10">
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions About This Policy?</h3>
                                    <p className="text-gray-700">If you have questions about this Privacy Policy or our privacy practices, please contact us:</p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6 mb-8">
                                    <div className="text-center bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <Phone className="w-8 h-8 text-white" />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">Phone</h4>
                                        <p className="text-gray-600">Call us during business hours</p>
                                        <p className="text-sm text-gray-500 mt-2">Mon-Fri 9AM-6PM</p>
                                    </div>
                                    <div className="text-center bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <Mail className="w-8 h-8 text-white" />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">Email</h4>
                                        <p className="text-gray-600">Send us your privacy questions</p>
                                        <p className="text-sm text-gray-500 mt-2">Response within 24 hours</p>
                                    </div>
                                    <div className="text-center bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <MapPin className="w-8 h-8 text-white" />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">Visit</h4>
                                        <p className="text-gray-600">Stop by our office</p>
                                        <p className="text-sm text-gray-500 mt-2">By appointment</p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
                                    <h4 className="font-bold text-gray-900 mb-4 text-center">900 Vermont, LLC</h4>
                                    <div className="grid md:grid-cols-2 gap-6 text-center">
                                        <div>
                                            <p className="text-gray-700 font-medium">Mailing Address</p>
                                            <p className="text-gray-600 text-sm mt-1">
                                                900 James M Wood Boulevard<br />
                                                Los Angeles, CA 90015
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-700 font-medium">Business Hours</p>
                                            <p className="text-gray-600 text-sm mt-1">
                                                Monday - Friday: 9:00 AM - 6:00 PM<br />
                                                Saturday - Sunday: By Appointment
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Call to Action */}
                    <div className="text-center mb-16">
                        <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                            {/* Animated Background */}
                            <div className="absolute inset-0">
                                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                            </div>
                            
                            <div className="relative z-10">
                                <h3 className="text-4xl font-bold mb-6">Ready to Experience The 900?</h3>
                                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                    Your privacy is protected every step of the way. Explore our luxury apartments with confidence.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href="/contact"
                                        className="group bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                                    >
                                        <Phone className="w-5 h-5" />
                                        <span>Schedule Tour</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                    <a
                                        href="/floor-plans/dynamic"
                                        className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                                    >
                                        <Building className="w-5 h-5" />
                                        <span>View Floor Plans</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
            `}</style>
        </GuestLayout>
    );
}