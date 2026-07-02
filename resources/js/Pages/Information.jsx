import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Information() {
    const informationSections = [
        {
            title: 'Leasing Office',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0H7m5 0v-5a2 2 0 00-2-2H8a2 2 0 00-2 2v5m6 0V9a2 2 0 00-2-2H8a2 2 0 00-2 2v8" />
                </svg>
            ),
            content: [
                { label: 'Phone', value: '213-900-0900' },
                { label: 'Email', value: 'leasing@the900apts.com' }
            ]
        },
        {
            title: 'General Fees',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            ),
            content: [
                { 
                    label: 'Deposit', 
                    value: 'Equal to One Month Rent',
                    note: '(On approved credit. Certain terms and conditions may apply. Subject to change.)'
                },
                { 
                    label: 'Application Fee', 
                    value: '$48 per adult applicant',
                    note: 'Subject to change.'
                }
            ]
        },
        {
            title: 'Pet Information',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            content: [
                { label: 'Maximum pets (per apartment)', value: '2' },
                { label: 'Maximum weight (per pet)', value: '35 lbs. and under' },
                { label: 'Monthly rent (per pet)', value: '$50.00' },
                { label: 'Deposit (per pet; refundable)', value: '$500.00' }
            ],
            note: 'Please contact the leasing office for more details.'
        }
    ];

    return (
        <GuestLayout>
            <Head title="Information - The 900" />

            {/* Hero Section */}
            <div className="bg-black py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <img 
                        src="/logo.svg" 
                        alt="The 900 Logo" 
                        className="h-16 mx-auto mb-6"
                    />
                    <h1 className="text-5xl font-bold text-white mb-6">
                        General Information
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Everything you need to know about living at The 900
                    </p>
                </div>
            </div>

            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Information Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        {informationSections.map((section, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mr-4">
                                        <div className="text-white">
                                            {section.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-black">{section.title}</h3>
                                </div>

                                <div className="space-y-4">
                                    {section.content.map((item, itemIndex) => (
                                        <div key={itemIndex} className="border-b border-gray-200 pb-3 last:border-b-0">
                                            <div className="flex justify-between items-start">
                                                <span className="text-gray-600 font-medium">{item.label}:</span>
                                                <span className="text-black font-semibold text-right ml-4">{item.value}</span>
                                            </div>
                                            {item.note && (
                                                <p className="text-xs text-gray-500 mt-1 italic">{item.note}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {section.note && (
                                    <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                                        <p className="text-sm text-gray-600 italic">{section.note}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Specials Section */}
                    <div className="bg-black rounded-2xl p-8 mb-16">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-6">Current Specials</h3>
                            <p className="text-xl text-gray-300 mb-8">
                                Don't miss out on our limited-time leasing offers
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="mailto:leasing@the900apts.com"
                                    className="bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Email for Specials
                                </a>
                                <a
                                    href="tel:213-900-0900"
                                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Call 213-900-0900
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Resident Portal Section */}
                    <div className="bg-gray-50 rounded-2xl p-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold text-black mb-6">Resident Portal</h3>
                            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                                Access the resident portal below to submit online payments and maintenance requests.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
                                <div className="bg-white rounded-xl p-6 border border-gray-200">
                                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-bold text-black mb-2">Online Payments</h4>
                                    <p className="text-gray-600 text-sm">Pay rent and fees securely online with automatic payment options</p>
                                </div>

                                <div className="bg-white rounded-xl p-6 border border-gray-200">
                                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-bold text-black mb-2">Maintenance Requests</h4>
                                    <p className="text-gray-600 text-sm">Submit and track maintenance requests 24/7 through the portal</p>
                                </div>
                            </div>

                            <button className="bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                                Access Resident Portal
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact CTA Section */}
            <div className="bg-black py-20">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Have Questions?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Our leasing team is here to help you find your perfect home at The 900.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                        >
                            Contact Us
                        </Link>
                        <a
                            href="tel:213-900-0900"
                            className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
                        >
                            Call Now
                        </a>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}