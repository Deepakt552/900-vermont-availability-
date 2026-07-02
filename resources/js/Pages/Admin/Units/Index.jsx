import React, { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InteractiveFloorPlan from '@/Components/InteractiveFloorPlan';
import ImageUpload from '@/Components/ImageUpload';
import toast, { Toaster } from 'react-hot-toast';
import { Dialog, DialogTitle } from '@headlessui/react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function Index({ auth, units = [] }) {
    const [filter, setFilter] = useState('all');
    const [view, setView] = useState('table'); // 'table' or 'floorplan'
    const [floorFilter, setFloorFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUnitForImages, setSelectedUnitForImages] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [editingUnits, setEditingUnits] = useState({});
    const [hasChanges, setHasChanges] = useState(false);
    const [selectedUnits, setSelectedUnits] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUnit, setEditingUnit] = useState(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    // Get unique floors for filter dropdown
    const availableFloors = useMemo(() => {
        const floors = [...new Set(units.map(unit => unit.floor?.floor_number).filter(Boolean))];
        return floors.sort((a, b) => a - b);
    }, [units]);

    const filteredUnits = useMemo(() => {
        return units.filter(unit => {
            // Status filter
            if (filter !== 'all' && unit.status !== filter) return false;

            // Floor filter
            if (floorFilter !== 'all' && unit.floor?.floor_number !== parseInt(floorFilter)) return false;

            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return (
                    unit.unit_number?.toLowerCase().includes(query) ||
                    unit.unit_type?.name?.toLowerCase().includes(query) ||
                    unit.floor?.name?.toLowerCase().includes(query)
                );
            }

            return true;
        });
    }, [units, filter, floorFilter, searchQuery]);

    const updateUnitField = (unitId, field, value) => {
        setEditingUnits(prev => ({
            ...prev,
            [unitId]: {
                ...prev[unitId],
                [field]: value
            }
        }));
        setHasChanges(true);
    };

    const saveChanges = () => {
        if (!hasChanges) return;
        const loadingToast = toast.loading('Saving changes...');

        router.patch('/admin/units/bulk-update', {
            updates: editingUnits
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.dismiss(loadingToast);
                toast.success('All unit updates saved successfully!', {
                    icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
                });
                setEditingUnits({});
                setHasChanges(false);
            },
            onError: (err) => {
                toast.dismiss(loadingToast);
                triggerErrorModal(err);
            }
        });
    };

    const triggerErrorModal = (errors) => {
        const msgs = Object.values(errors).flat();
        setErrorMessages(msgs.length > 0 ? msgs : ['An unexpected error occurred. Please verify inputs.']);
        setIsErrorModalOpen(true);
    };

    const openEditModal = (unit) => {
        setEditingUnit(unit);
        setIsEditModalOpen(true);
    };

    const updateStatus = (unitId, newStatus, unitNumber) => {
        const loadingToast = toast.loading(`Updating unit ${unitNumber}...`);

        router.patch(`/admin/units/${unitId}/status`, {
            status: newStatus
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.dismiss(loadingToast);
                toast.success(`Unit ${unitNumber} status updated to ${newStatus}!`, {
                    duration: 3000,
                    icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
                });
            },
            onError: (errors) => {
                toast.dismiss(loadingToast);
                toast.error(`Failed to update unit ${unitNumber}`, {
                    duration: 4000,
                    icon: <XCircle className="w-5 h-5 text-red-500" />,
                });
            }
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'available':
                return 'bg-green-100 text-green-800';
            case 'occupied':
                return 'bg-red-100 text-red-800';
            case 'maintenance':
                return 'bg-yellow-100 text-yellow-800';
            case 'reserved':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Unit Management</h2>}
        >
            <Head title="Unit Management" />

            {/* Toast Container */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '500',
                    },
                    success: {
                        style: {
                            background: '#10b981',
                        },
                    },
                    error: {
                        style: {
                            background: '#ef4444',
                        },
                    },
                }}
            />

            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Professional Header */}
                    <div className="mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                            <div className="mb-6 lg:mb-0">
                                <h1 className="text-4xl font-bold text-black">
                                    Unit Management
                                </h1>
                                <p className="text-lg text-gray-600 mt-2">
                                    Manage apartment units and availability across all floors
                                </p>
                                <div className="flex items-center mt-3 space-x-6 text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
                                        {units.filter(u => u.status === 'available').length} Available
                                    </span>
                                    <span className="flex items-center">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                                        {units.filter(u => u.status === 'occupied').length} Occupied
                                    </span>
                                    <span className="flex items-center">
                                        <div className="w-2 h-2 bg-gray-600 rounded-full mr-2"></div>
                                        {units.filter(u => u.status === 'maintenance').length} Maintenance
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                                {/* View Toggle */}
                                <div className="flex bg-white rounded-lg border border-gray-300 overflow-hidden">
                                    <button
                                        onClick={() => setView('table')}
                                        className={`px-6 py-3 text-sm font-semibold transition-all duration-200 flex items-center ${view === 'table'
                                            ? 'bg-black text-white'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0V4a1 1 0 011-1h3M3 20h18a1 1 0 001-1V4a1 1 0 00-1-1H3a1 1 0 00-1 1v16a1 1 0 001 1z" />
                                        </svg>
                                        Table View
                                    </button>
                                    <button
                                        onClick={() => setView('floorplan')}
                                        className={`px-6 py-3 text-sm font-semibold transition-all duration-200 flex items-center border-l border-gray-300 ${view === 'floorplan'
                                            ? 'bg-black text-white'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0H7m5 0v-5a2 2 0 00-2-2H8a2 2 0 00-2 2v5m6 0V9a2 2 0 00-2-2H8a2 2 0 00-2 2v8" />
                                        </svg>
                                        Floor Plan
                                    </button>
                                </div>

                                {/* Save Changes Button */}
                                {hasChanges && (
                                    <button
                                        onClick={saveChanges}
                                        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 flex items-center justify-center animate-pulse"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Save Changes
                                    </button>
                                )}

                                <Link
                                    href="/admin/units/create"
                                    className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add New Unit
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Professional Filters & Search */}
                    <div className="bg-white rounded-lg border border-gray-300 p-6 mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                            {/* Search Bar */}
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search units, types, or floors..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                {/* Floor Filter */}
                                <div className="min-w-[140px]">
                                    <select
                                        value={floorFilter}
                                        onChange={(e) => setFloorFilter(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="all">All Floors</option>
                                        {availableFloors.map((floor) => (
                                            <option key={floor} value={floor}>
                                                Floor {floor}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Status Filter Pills */}
                                <div className="flex flex-wrap gap-2">
                                    {['all', 'available', 'occupied', 'maintenance', 'reserved'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => setFilter(status)}
                                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${filter === status
                                                ? 'bg-black text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                            {status !== 'all' && (
                                                <span className="ml-2 px-2 py-0.5 bg-white bg-opacity-20 rounded-full text-xs">
                                                    {units.filter(u => u.status === status).length}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Results Summary */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-semibold text-black">{filteredUnits.length}</span> of <span className="font-semibold text-black">{units.length}</span> units
                                {searchQuery && (
                                    <span> matching "<span className="font-semibold text-black">{searchQuery}</span>"</span>
                                )}
                                {floorFilter !== 'all' && (
                                    <span> on <span className="font-semibold text-black">Floor {floorFilter}</span></span>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Content based on view */}
                    {view === 'table' ? (
                        /* Professional Units Table */
                        <div className="bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                                                Unit
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                                                Floor
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                                                Beds/Baths
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                                                Area
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                                                Rent
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredUnits.map((unit) => (
                                            <tr key={unit.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="text-sm font-bold text-black">
                                                            Unit {unit.unit_number}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        Floor {unit.floor?.floor_number || 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {unit.unit_type?.name || 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {unit.unit_type?.bedrooms || 0} / {unit.unit_type?.bathrooms || 0}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {unit.unit_type?.area_sqft ? `${unit.unit_type.area_sqft} sq ft` : 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="number"
                                                        value={editingUnits[unit.id]?.price ?? unit.price ?? ''}
                                                        onChange={(e) => updateUnitField(unit.id, 'price', e.target.value)}
                                                        className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                                        placeholder="0"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select
                                                        value={editingUnits[unit.id]?.status ?? unit.status}
                                                        onChange={(e) => updateUnitField(unit.id, 'status', e.target.value)}
                                                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                                    >
                                                        <option value="available">Available</option>
                                                        <option value="occupied">Occupied</option>
                                                        <option value="maintenance">Maintenance</option>
                                                        <option value="reserved">Reserved</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => openEditModal(unit)}
                                                            className="bg-black text-white px-3 py-1 rounded text-xs font-semibold hover:bg-gray-800 transition-colors duration-150"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedUnitForImages(unit);
                                                                setIsImageModalOpen(true);
                                                            }}
                                                            className="bg-gray-100 text-black px-3 py-1 rounded text-xs font-semibold hover:bg-gray-200 transition-colors duration-150 relative"
                                                        >
                                                            Images
                                                            {unit.images && unit.images.length > 0 && (
                                                                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-xs">
                                                                    {unit.images.length}
                                                                </span>
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        /* Interactive Floor Plan */
                        <div className="w-full">
                            <InteractiveFloorPlan
                                units={filteredUnits}
                                onUnitClick={(unit, unitNumber) => {
                                    if (unit) {
                                        router.visit(`/admin/units/${unit.id}`);
                                    }
                                }}
                                showLegend={true}
                                className="w-full"
                            />
                        </div>
                    )}

                    {filteredUnits.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0H7m5 0v-5a2 2 0 00-2-2H8a2 2 0 00-2 2v5m6 0V9a2 2 0 00-2-2H8a2 2 0 00-2 2v8" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No units found
                            </h3>
                            <p className="text-gray-500">
                                {filter === 'all'
                                    ? 'No units have been created yet.'
                                    : `No units with status "${filter}" found.`
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Unit Modal */}
            <Dialog
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                        {/* Modal Header */}
                        <div className="bg-black p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <DialogTitle className="text-xl font-bold text-white">
                                            Edit Unit {editingUnit?.unit_number}
                                        </DialogTitle>
                                        <p className="text-sm text-gray-300">
                                            Update unit details and information
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                                >
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 max-h-96 overflow-y-auto">
                            {editingUnit && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-black mb-2">Unit Number</label>
                                            <input
                                                type="text"
                                                value={editingUnit.unit_number}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-gray-50"
                                                readOnly
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-black mb-2">Monthly Rent ($)</label>
                                            <input
                                                type="number"
                                                value={editingUnit.price || ''}
                                                onChange={(e) => setEditingUnit({ ...editingUnit, price: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                                placeholder="Enter monthly rent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-black mb-2">Status</label>
                                            <select
                                                value={editingUnit.status}
                                                onChange={(e) => setEditingUnit({ ...editingUnit, status: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                            >
                                                <option value="available">Available</option>
                                                <option value="occupied">Occupied</option>
                                                <option value="maintenance">Maintenance</option>
                                                <option value="reserved">Reserved</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-black mb-2">Description</label>
                                            <textarea
                                                value={editingUnit.description || ''}
                                                onChange={(e) => setEditingUnit({ ...editingUnit, description: e.target.value })}
                                                rows={4}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                                placeholder="Enter unit description..."
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-black mb-2">Floor</label>
                                            <input
                                                type="text"
                                                value={`Floor ${editingUnit.floor?.floor_number || 'N/A'}`}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                                                readOnly
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-black mb-2">Unit Type</label>
                                            <input
                                                type="text"
                                                value={editingUnit.unit_type?.name || 'N/A'}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                                                readOnly
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-black mb-2">Bedrooms</label>
                                                <input
                                                    type="text"
                                                    value={editingUnit.unit_type?.bedrooms || 'N/A'}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                                                    readOnly
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-black mb-2">Bathrooms</label>
                                                <input
                                                    type="text"
                                                    value={editingUnit.unit_type?.bathrooms || 'N/A'}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                                                    readOnly
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-black mb-2">Area (sq ft)</label>
                                            <input
                                                type="text"
                                                value={editingUnit.unit_type?.area_sqft || 'N/A'}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                                                readOnly
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-black mb-2">Features</label>
                                            <textarea
                                                value={editingUnit.features || ''}
                                                onChange={(e) => setEditingUnit({ ...editingUnit, features: e.target.value })}
                                                rows={4}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                                placeholder="Enter unit features (e.g., Balcony, In-unit laundry, etc.)"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (!editingUnit) return;

                                    const loadingToast = toast.loading(`Updating unit ${editingUnit.unit_number}...`);

                                    router.patch(`/admin/units/${editingUnit.id}`, {
                                        price: editingUnit.price,
                                        status: editingUnit.status,
                                        description: editingUnit.description,
                                        features: editingUnit.features,
                                        // Include required fields
                                        floor_id: editingUnit.floor?.id,
                                        unit_number: editingUnit.unit_number,
                                        unit_type_id: editingUnit.unit_type?.id,
                                    }, {
                                        preserveScroll: true,
                                        onSuccess: () => {
                                            toast.dismiss(loadingToast);
                                            toast.success(`Unit ${editingUnit.unit_number} updated successfully!`, {
                                                duration: 3000,
                                                icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
                                            });
                                            setIsEditModalOpen(false);
                                            setEditingUnit(null);
                                        },
                                        onError: (errors) => {
                                             toast.dismiss(loadingToast);
                                             triggerErrorModal(errors);
                                             console.error('Update errors:', errors);
                                         }
                                    });
                                }}
                                className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
                            >
                                Save Changes
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

            {/* Image Upload Modal */}
            <Dialog
                open={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                        {/* Modal Header */}
                        <div className="bg-black p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <DialogTitle className="text-xl font-bold text-white">
                                            Unit {selectedUnitForImages?.unit_number} Images
                                        </DialogTitle>
                                        <p className="text-sm text-gray-300">
                                            Upload and manage images for this unit
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsImageModalOpen(false)}
                                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                                >
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 max-h-96 overflow-y-auto">
                            {selectedUnitForImages && (
                                <ImageUpload
                                    unit={selectedUnitForImages}
                                    onImagesUpdated={() => {
                                        // Refresh the page data to show updated images
                                        router.reload({ only: ['units'] });
                                    }}
                                />
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-500">
                                    Supported formats: JPG, PNG, GIF • Max size: 10MB per image
                                </p>
                                <button
                                    onClick={() => setIsImageModalOpen(false)}
                                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-medium"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
            {/* Reusable Error Modal */}
            <Dialog open={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)} className="relative z-[60]">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-red-100">
                        <div className="bg-red-50 p-6 flex items-center space-x-3 border-b border-red-100">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-650">
                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <DialogTitle className="text-lg font-bold text-red-950">Action Failed</DialogTitle>
                                <p className="text-xs text-red-600">Please review the details below</p>
                            </div>
                        </div>

                        <div className="p-6 space-y-3 max-h-60 overflow-y-auto">
                            {errorMessages.map((msg, index) => (
                                <p key={index} className="text-sm text-gray-700 leading-relaxed pl-2.5 border-l-2 border-red-500">
                                    {msg}
                                </p>
                            ))}
                        </div>

                        <div className="bg-gray-50 px-6 py-4 flex justify-end">
                            <button
                                onClick={() => setIsErrorModalOpen(false)}
                                className="px-5 py-2.5 bg-black text-white hover:bg-neutral-850 rounded-xl text-sm font-bold transition-colors"
                            >
                                Close Window
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </AuthenticatedLayout>
    );
}