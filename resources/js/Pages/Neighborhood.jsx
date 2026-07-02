import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Neighborhood() {
    const nearbyLocations = [
        {
            category: 'Dining',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            places: [
                { name: 'Grand Central Market', distance: '0.2 miles', description: 'Historic food hall with diverse vendors' },
                { name: 'Bottega Louie', distance: '0.3 miles', description: 'Upscale French bistro and patisserie' },
                { name: 'Bestia', distance: '0.5 miles', description: 'Popular Italian restaurant' },
                { name: 'Republique', distance: '0.7 miles', description: 'French-inspired bistro' }
            ]
        },
        {
            category: 'Shopping',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                </svg>
            ),
            places: [
                { name: 'The Bloc', distance: '0.1 miles', description: 'Modern shopping center' },
                { name: 'Fashion District', distance: '0.4 miles', description: 'Wholesale fashion hub' },
                { name: 'The Grove', distance: '2.5 miles', description: 'Outdoor shopping and entertainment' },
                { name: 'Beverly Center', distance: '3.2 miles', description: 'Luxury shopping mall' }
            ]
        },
        {
            category: 'Entertainment',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                </svg>
            ),
            places: [
                { name: 'Walt Disney Concert Hall', distance: '0.3 miles', description: 'Iconic concert venue' },
                { name: 'The Broad Museum', distance: '0.4 miles', description: 'Contemporary art museum' },
                { name: 'MOCA', distance: '0.5 miles', description: 'Museum of Contemporary Art' },
                { name: 'Staples Center', distance: '0.8 miles', description: 'Sports and entertainment arena' }
            ]
        },
        {
            category: 'Transportation',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            ),
            places: [
                { name: 'Pershing Square Metro', distance: '0.2 miles', description: 'Red/Purple Line station' },
                { name: '7th Street Metro Center', distance: '0.3 miles', description: 'Major transit hub' },
                { name: 'Union Station', distance: '1.2 miles', description: 'Main railway station' },
                { name: 'LAX Airport', distance: '18 miles', description: 'Los Angeles International Airport' }
            ]
        },
        {
            category: 'Parks & Recreation',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
            places: [
                { name: 'Grand Park', distance: '0.4 miles', description: 'Downtown urban park' },
                { name: 'Griffith Observatory', distance: '8 miles', description: 'Iconic observatory and park' },
                { name: 'Echo Park Lake', distance: '3.5 miles', description: 'Scenic lake and park' },
                { name: 'Exposition Park', distance: '4.2 miles', description: 'Museums and gardens' }
            ]
        },
        {
            category: 'Business & Finance',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0H7m5 0v-5a2 2 0 00-2-2H8a2 2 0 00-2 2v5m6 0V9a2 2 0 00-2-2H8a2 2 0 00-2 2v8" />
                </svg>
            ),
            places: [
                { name: 'Financial District', distance: '0.1 miles', description: 'Major business center' },
                { name: 'City Hall', distance: '0.5 miles', description: 'Government offices' },
                { name: 'Wells Fargo Center', distance: '0.2 miles', description: 'Office complex' },
                { name: 'Gas Company Tower', distance: '0.3 miles', description: 'Commercial high-rise' }
            ]
        }
    ];

    return (
        <GuestLayout>
            <Head title="Neighborhood - The 900" />

            {/* Hero Section */}
            <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/home_hero1.jpg" 
                        alt="Downtown Los Angeles" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70"></div>
                </div>

                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <img 
                        src="/logo.svg" 
                        alt="The 900 Logo" 
                        className="h-16 mx-auto mb-6"
                    />
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Your Neighborhood
                    </h1>
                    <p className="text-xl text-gray-200 mb-8">
                        Located in the heart of downtown Los Angeles, The 900 puts you at the center of it all
                    </p>
                </div>
            </div>

            {/* Location Overview */}
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-black mb-6">
                            Prime Downtown Location
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Experience the vibrant energy of downtown LA with world-class dining, shopping, 
                            entertainment, and cultural attractions just steps from your door.
                        </p>
                    </div>

                    {/* Address Card */}
                    <div className="bg-black rounded-2xl p-8 text-center mb-16 max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">The 900</h3>
                        <p className="text-gray-300 text-lg">
                            900 Main Street<br />
                            Downtown Los Angeles, CA 90015
                        </p>
                    </div>

                    {/* Nearby Locations */}
                    <div className="space-y-12">
                        {nearbyLocations.map((category, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-8">
                                <div className="flex items-center mb-8">
                                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mr-4">
                                        <div className="text-white">
                                            {category.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-black">{category.category}</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {category.places.map((place, placeIndex) => (
                                        <div key={placeIndex} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                                            <h4 className="text-lg font-bold text-black mb-2">{place.name}</h4>
                                            <p className="text-sm text-gray-500 mb-3">{place.distance}</p>
                                            <p className="text-gray-600 text-sm">{place.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Transportation Section */}
            <div className="bg-black py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Connected to Everything
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            With multiple Metro lines and major freeways nearby, getting around LA has never been easier.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Metro Access</h3>
                            <p className="text-gray-300">
                                Multiple Metro stations within walking distance including Red, Purple, and Blue lines.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Freeway Access</h3>
                            <p className="text-gray-300">
                                Quick access to I-10, I-110, and US-101 for easy commuting throughout LA.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Walk Score 95</h3>
                            <p className="text-gray-300">
                                Walker's Paradise - daily errands do not require a car with excellent walkability.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white py-20">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-black mb-6">
                        Experience Downtown Living
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Discover why The 900 is the perfect place to call home in the heart of Los Angeles.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                        >
                            Schedule a Tour
                        </Link>
                        <Link
                            href="/gallery"
                            className="border-2 border-black text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105"
                        >
                            View Gallery
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}