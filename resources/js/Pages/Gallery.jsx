import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState } from 'react';
import { Search, X, Building, ExternalLink, Calendar, Image } from 'lucide-react';

export default function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);

    // Sample gallery images - you can replace with actual images
    const galleryImages = [
        {
            id: 1,
            src: '/home_hero1.jpg',
            alt: 'Building Exterior',
            category: 'building',
            title: 'The 900 Building Exterior'
        },
        {
            id: 2,
            src: '/apt 211.jpg',
            alt: 'Apartment 211',
            category: 'apartments',
            title: 'Modern Apartment Interior'
        },
        {
            id: 3,
            src: '/apt-204.jpg',
            alt: 'Apartment 204',
            category: 'apartments',
            title: 'Spacious Living Area'
        },
        {
            id: 4,
            src: '/Apt-323.jpg',
            alt: 'Apartment 323',
            category: 'apartments',
            title: 'Contemporary Design'
        },
        // Add more sample images
        {
            id: 5,
            src: '/home_hero1.jpg',
            alt: 'Lobby Area',
            category: 'amenities',
            title: 'Modern Lobby'
        },
        {
            id: 6,
            src: '/home_hero1.jpg',
            alt: 'Fitness Center',
            category: 'amenities',
            title: 'State-of-the-Art Fitness Center'
        },
        {
            id: 7,
            src: '/home_hero1.jpg',
            alt: 'Rooftop Terrace',
            category: 'amenities',
            title: 'Rooftop Terrace with City Views'
        },
        {
            id: 8,
            src: '/home_hero1.jpg',
            alt: 'Community Room',
            category: 'amenities',
            title: 'Community Lounge'
        }
    ];

    const categories = [
        { id: 'all', name: 'All Photos', count: galleryImages.length },
        { id: 'building', name: 'Building', count: galleryImages.filter(img => img.category === 'building').length },
        { id: 'apartments', name: 'Apartments', count: galleryImages.filter(img => img.category === 'apartments').length },
        { id: 'amenities', name: 'Amenities', count: galleryImages.filter(img => img.category === 'amenities').length }
    ];

    const filteredImages = selectedCategory === 'all' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === selectedCategory);

    return (
        <GuestLayout>
            <Head title="Gallery - The 900" />

            {/* Hero Section */}
            <div className="bg-black py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <img 
                        src="/logo.svg" 
                        alt="The 900 Logo" 
                        className="h-16 mx-auto mb-6"
                    />
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Gallery
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Explore our modern apartments, premium amenities, and stunning building features
                    </p>
                </div>
            </div>

            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                                    selectedCategory === category.id
                                        ? 'bg-black text-white shadow-lg'
                                        : 'bg-gray-100 text-black hover:bg-gray-200'
                                }`}
                            >
                                {category.name}
                                <span className="ml-2 px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs">
                                    {category.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredImages.map((image) => (
                            <div
                                key={image.id}
                                className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-square cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-end">
                                    <div className="p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-lg font-bold mb-2">{image.title}</h3>
                                        <p className="text-sm opacity-90">Click to view larger</p>
                                    </div>
                                </div>
                                {/* Zoom Icon */}
                                <div className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Search className="w-5 h-5 text-white" aria-hidden="true" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredImages.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <Image className="mx-auto h-12 w-12" aria-hidden="true" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No images found
                            </h3>
                            <p className="text-gray-500">
                                Try selecting a different category.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-4xl max-h-full">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                            aria-label="Close image modal"
                        >
                            <X className="w-8 h-8" aria-hidden="true" />
                        </button>
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="max-w-full max-h-full object-contain rounded-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-6 rounded-b-lg">
                            <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
                            <p className="text-gray-300 capitalize">{selectedImage.category}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <div className="bg-black py-20">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Experience The 900?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Schedule a personal tour to see our beautiful apartments and amenities in person.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://www.rentcafe.com/residentservices/apartmentsforrent/userregistration.aspx?source=property_search&propertyid=MTQwODgwMQ%3d%3d-yrB0DUVwqt0%3d"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                            aria-label="Apply now for apartment rental - opens in new window"
                        >
                            <ExternalLink className="w-5 h-5" aria-hidden="true" />
                            <span>Apply Now</span>
                        </a>
                        <Link
                            href="/floor-plans/dynamic"
                            className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                            aria-label="Check apartment availability and floor plans"
                        >
                            <Building className="w-5 h-5" aria-hidden="true" />
                            <span>Check Availability</span>
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}