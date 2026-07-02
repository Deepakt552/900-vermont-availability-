import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, AlertCircle, ExternalLink, Building } from 'lucide-react';

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        inquiry_type: 'general'
    });

    const [submitted, setSubmitted] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        
        post('/contact', {
            onSuccess: () => {
                reset();
                setSubmitted(true);
                setTimeout(() => setSubmitted(false), 5000);
            }
        });
    };

    const contactInfo = [
        {
            title: 'Visit Us',
            details: ['900 Main Street', 'Downtown District', 'City, State 12345'],
            icon: <MapPin className="w-6 h-6" aria-hidden="true" />
        },
        {
            title: 'Call Us',
            details: ['(555) 123-4567', 'Mon-Fri: 9AM-6PM', 'Sat-Sun: 10AM-4PM'],
            icon: <Phone className="w-6 h-6" aria-hidden="true" />
        },
        {
            title: 'Email Us',
            details: ['info@the900.com', 'leasing@the900.com', 'We respond within 24 hours'],
            icon: <Mail className="w-6 h-6" aria-hidden="true" />
        }
    ];

    return (
        <GuestLayout>
            <Head title="Contact Us - The 900" />

            {/* Hero Section */}
            <div className="bg-black py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <img 
                        src="/logo.svg" 
                        alt="The 900 Logo" 
                        className="h-16 mx-auto mb-6"
                    />
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Contact Us
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Ready to experience essential living? Get in touch with our leasing team today.
                    </p>
                </div>
            </div>

            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-3xl font-bold text-black mb-8">
                                Send us a Message
                            </h2>

                            {submitted && (
                                <div className="mb-6 p-4 bg-black text-white rounded-lg">
                                    <p className="font-semibold">Thank you for your message!</p>
                                    <p className="text-sm">We'll get back to you within 24 hours.</p>
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                            placeholder="Your full name"
                                            required
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                            placeholder="your@email.com"
                                            required
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-black mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                        placeholder="(555) 123-4567"
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-black mb-2">
                                        Inquiry Type
                                    </label>
                                    <select
                                        value={data.inquiry_type}
                                        onChange={(e) => setData('inquiry_type', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    >
                                        <option value="general">General Inquiry</option>
                                        <option value="leasing">Leasing Information</option>
                                        <option value="tour">Schedule a Tour</option>
                                        <option value="maintenance">Maintenance Request</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-black mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                        placeholder="Tell us how we can help you..."
                                        required
                                    />
                                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl font-bold text-black mb-8">
                                Get in Touch
                            </h2>

                            <div className="space-y-8">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                                            <div className="text-white">
                                                {info.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-black mb-2">
                                                {info.title}
                                            </h3>
                                            {info.details.map((detail, detailIndex) => (
                                                <p key={detailIndex} className="text-gray-600">
                                                    {detail}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Office Hours */}
                            <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
                                <h3 className="text-xl font-bold text-black mb-4">
                                    Leasing Office Hours
                                </h3>
                                <div className="space-y-2 text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Monday - Friday</span>
                                        <span>9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday</span>
                                        <span>10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday</span>
                                        <span>12:00 PM - 4:00 PM</span>
                                    </div>
                                </div>
                            </div>

                            {/* Emergency Contact */}
                            <div className="mt-8 p-6 bg-black rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-4">
                                    24/7 Emergency Maintenance
                                </h3>
                                <p className="text-gray-300 mb-2">
                                    For urgent maintenance issues outside business hours:
                                </p>
                                <p className="text-white font-bold text-lg">
                                    (555) 123-HELP
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section (Placeholder) */}
            <div className="bg-gray-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-black mb-4">
                            Visit Our Location
                        </h2>
                        <p className="text-xl text-gray-600">
                            Located in the heart of downtown with easy access to everything you need.
                        </p>
                    </div>
                    
                    {/* Map Placeholder */}
                    <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <MapPin className="w-8 h-8 text-white" aria-hidden="true" />
                        </div>
                        <h3 className="text-2xl font-bold text-black mb-2">Interactive Map</h3>
                        <p className="text-gray-600 mb-6">
                            900 Main Street, Downtown District<br />
                            City, State 12345
                        </p>
                        <button 
                            className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                            aria-label="Get directions to The 900 apartments"
                        >
                            Get Directions
                        </button>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}