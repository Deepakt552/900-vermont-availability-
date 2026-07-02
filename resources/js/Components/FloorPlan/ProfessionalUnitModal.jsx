import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

export default function ProfessionalUnitModal({ unit, onClose }) {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <Dialog open={true} onClose={onClose} className="relative z-50">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
            
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all">
                    {/* Header */}
                    <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8">
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex items-start justify-between pr-16">
                            <div className="flex items-center space-x-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <span className="text-2xl font-bold">{unit.unit_number}</span>
                                </div>
                                <div>
                                    <Dialog.Title className="text-3xl font-bold mb-2">
                                        Unit {unit.unit_number}
                                    </Dialog.Title>
                                    <div className="flex items-center space-x-4 text-slate-300">
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0H7m5 0v-5a2 2 0 00-2-2H8a2 2 0 00-2 2v5m6 0V9a2 2 0 00-2-2H8a2 2 0 00-2 2v8" />
                                            </svg>
                                            Floor {unit.floor?.floor_number}
                                        </span>
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            James M Wood Boulevard
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="text-right">
                                <div className="text-4xl font-bold mb-1">
                                    ${unit.price?.toLocaleString()}
                                </div>
                                <div className="text-slate-300 text-sm">per month</div>
                                <div className="mt-3">
                                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-emerald-500 text-white shadow-lg">
                                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Available Now
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200 bg-gray-50">
                        <nav className="flex px-8">
                            {[
                                { id: 'overview', label: 'Overview', icon: '🏠' },
                                { id: 'details', label: 'Details', icon: '📋' },
                                { id: 'amenities', label: 'Amenities', icon: '✨' },
                                { id: 'pricing', label: 'Pricing', icon: '💰' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 py-4 px-6 border-b-3 font-semibold text-sm transition-all ${
                                        activeTab === tab.id
                                            ? 'border-emerald-500 text-emerald-600 bg-white'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/50'
                                    }`}
                                >
                                    <span className="text-base">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="p-8 max-h-96 overflow-y-auto bg-white">
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                {/* Quick Stats */}
                                <div className="grid grid-cols-4 gap-6">
                                    {[
                                        { label: 'Bedrooms', value: unit.unit_type?.bedrooms === 0 ? 'Studio' : unit.unit_type?.bedrooms, icon: '🛏️', color: 'bg-blue-50 text-blue-700' },
                                        { label: 'Bathrooms', value: unit.unit_type?.bathrooms, icon: '🚿', color: 'bg-purple-50 text-purple-700' },
                                        { label: 'Square Feet', value: `${unit.unit_type?.area_sqft}`, icon: '📐', color: 'bg-green-50 text-green-700' },
                                        { label: 'Available', value: unit.available_date ? new Date(unit.available_date).toLocaleDateString() : 'Now', icon: '📅', color: 'bg-orange-50 text-orange-700' }
                                    ].map((item, index) => (
                                        <div key={index} className={`${item.color} rounded-xl p-6 text-center hover:shadow-md transition-shadow`}>
                                            <div className="text-2xl mb-2">{item.icon}</div>
                                            <div className="text-2xl font-bold mb-1">{item.value}</div>
                                            <div className="text-sm font-medium opacity-80">{item.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Unit Type Description */}
                                <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-6 border border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                        <span className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0H7m5 0v-5a2 2 0 00-2-2H8a2 2 0 00-2 2v5m6 0V9a2 2 0 00-2-2H8a2 2 0 00-2 2v8" />
                                            </svg>
                                        </span>
                                        {unit.unit_type?.name} Layout
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        This beautifully designed {unit.unit_type?.name.toLowerCase()} offers {unit.unit_type?.area_sqft} square feet of modern living space. 
                                        Located on floor {unit.floor?.floor_number} with premium finishes and thoughtful layouts that maximize both comfort and functionality.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'details' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { label: 'Unit Number', value: unit.unit_number },
                                        { label: 'Unit Type', value: unit.unit_type?.name },
                                        { label: 'Floor', value: unit.floor?.floor_number },
                                        { label: 'Square Footage', value: `${unit.unit_type?.area_sqft} sq ft` },
                                        { label: 'Bedrooms', value: unit.unit_type?.bedrooms === 0 ? 'Studio' : unit.unit_type?.bedrooms },
                                        { label: 'Bathrooms', value: unit.unit_type?.bathrooms },
                                        { label: 'Lease Term', value: unit.lease_term || '12 months' },
                                        { label: 'Pet Policy', value: 'Pet-friendly' }
                                    ].map((item, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <div className="text-sm font-medium text-gray-500 mb-1">{item.label}</div>
                                            <div className="text-lg font-semibold text-gray-900">{item.value}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-200">
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                                        <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0H7m5 0v-5a2 2 0 00-2-2H8a2 2 0 00-2 2v5m6 0V9a2 2 0 00-2-2H8a2 2 0 00-2 2v8" />
                                            </svg>
                                        </span>
                                        Building Features
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        {[
                                            '24/7 Concierge Service',
                                            'Elevator Access',
                                            'Secure Entry System',
                                            'On-site Management',
                                            'Package Receiving',
                                            'Emergency Maintenance',
                                            'Fitness Center Access',
                                            'Rooftop Terrace'
                                        ].map((feature, index) => (
                                            <div key={index} className="flex items-center text-gray-700">
                                                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'amenities' && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                                    <span className="mr-3">✨</span>
                                    Unit Amenities
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {unit.unit_type?.amenities?.map((amenity, index) => (
                                        <div key={index} className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100 hover:shadow-md transition-all">
                                            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center mr-4 shadow-sm">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-800 font-semibold text-lg">{amenity}</span>
                                        </div>
                                    )) || (
                                        <div className="text-center py-12 text-gray-500">
                                            <div className="text-6xl mb-4">🏠</div>
                                            <p className="text-lg">Amenity details will be available soon</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'pricing' && (
                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl p-6">
                                    <h3 className="text-xl font-bold mb-4">Monthly Rent Breakdown</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span>Base Rent</span>
                                            <span className="text-2xl font-bold">${unit.price?.toLocaleString()}</span>
                                        </div>
                                        <div className="border-t border-slate-600 pt-3">
                                            <div className="flex justify-between items-center text-slate-300">
                                                <span>Utilities (estimated)</span>
                                                <span>$150 - $200</span>
                                            </div>
                                            <div className="flex justify-between items-center text-slate-300">
                                                <span>Parking (optional)</span>
                                                <span>$100</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                                        <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                            </svg>
                                            Move-in Costs
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>First Month</span>
                                                <span className="font-semibold">${unit.price?.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Security Deposit</span>
                                                <span className="font-semibold">${unit.price?.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Application Fee</span>
                                                <span className="font-semibold">$100</span>
                                            </div>
                                            <div className="border-t border-blue-200 pt-2 flex justify-between font-bold">
                                                <span>Total</span>
                                                <span>${((unit.price || 0) * 2 + 100).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                                        <h4 className="font-bold text-green-900 mb-3 flex items-center">
                                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Lease Options
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>12 Month Lease</span>
                                                <span className="font-semibold text-green-600">Standard Rate</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>6 Month Lease</span>
                                                <span className="font-semibold">+$200/month</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Month-to-Month</span>
                                                <span className="font-semibold">+$400/month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-200">
                        <div className="text-sm text-gray-500 text-center sm:text-left">
                            <p>All information subject to change. Photos and renderings are for reference only.</p>
                            <p className="mt-1">Contact leasing office for current availability and pricing.</p>
                        </div>
                        <div className="flex space-x-4">
                            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-all font-semibold shadow-sm hover:shadow-md">
                                Share Unit
                            </button>
                            <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all font-semibold shadow-sm hover:shadow-md">
                                Schedule Tour
                            </button>
                        </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}