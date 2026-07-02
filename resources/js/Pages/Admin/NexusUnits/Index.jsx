import React, { useState, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NexusFloorPlanViewer from '@/Components/FloorPlan/NexusFloorPlanViewer';
import NexusImageUpload from '@/Components/NexusImageUpload';
import toast, { Toaster } from 'react-hot-toast';
import { Dialog, DialogTitle } from '@headlessui/react';
import { Building2, Settings, LogOut, Menu, X, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function Index({ auth, units = [] }) {
    const [filter, setFilter]           = useState('all');
    const [view, setView]               = useState('floorplan');
    const [floorFilter, setFloorFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [editingUnits, setEditingUnits]   = useState({});
    const [hasChanges, setHasChanges]       = useState(false);
    const [isEditModalOpen, setIsEditModalOpen]   = useState(false);
    const [editingUnit, setEditingUnit]           = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedUnitForImages, setSelectedUnitForImages] = useState(null);

    // Error Modal states
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const availableFloors = [1, 2, 3, 4];
    const activePlanFloor = floorFilter === 'all' ? 1 : parseInt(floorFilter);

    const counts = useMemo(() => ({
        available:   units.filter(u => u.status === 'available').length,
        occupied:    units.filter(u => u.status === 'occupied').length,
        maintenance: units.filter(u => u.status === 'maintenance').length,
        reserved:    units.filter(u => u.status === 'reserved').length,
    }), [units]);

    const filteredUnits = useMemo(() => {
        return units.filter(unit => {
            if (filter !== 'all' && unit.status !== filter) return false;
            if (floorFilter !== 'all' && unit.floor?.floor_number !== parseInt(floorFilter)) return false;
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                return (
                    unit.unit_number?.toLowerCase().includes(q) ||
                    unit.unit_type?.name?.toLowerCase().includes(q) ||
                    unit.floor?.name?.toLowerCase().includes(q)
                );
            }
            return true;
        });
    }, [units, filter, floorFilter, searchQuery]);

    const updateUnitField = (unitId, field, value) => {
        setEditingUnits(prev => ({ ...prev, [unitId]: { ...prev[unitId], [field]: value } }));
        setHasChanges(true);
    };

    const triggerErrorModal = (errors) => {
        const msgs = Object.values(errors).flat();
        setErrorMessages(msgs.length > 0 ? msgs : ['An unexpected error occurred. Please verify inputs.']);
        setIsErrorModalOpen(true);
    };

    const saveChanges = () => {
        if (!hasChanges) return;
        const loadingToast = toast.loading('Saving changes...');

        router.patch('/admin/nexus-units/bulk-update', {
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

    const openEditModal = (unit) => { setEditingUnit({ ...unit }); setIsEditModalOpen(true); };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nexus Unit Management</h2>}
        >
            <Head title="Nexus Unit Management" />

            <Toaster position="top-right" toastOptions={{ duration: 4000, style: { background: '#363636', color: '#fff', borderRadius: '10px', fontSize: '14px', fontWeight: '500' }, success: { style: { background: '#10b981' } }, error: { style: { background: '#ef4444' } } }} />

            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                    {/* Filter bar */}
                    <div className="bg-white border border-gray-200 rounded-lg px-5 py-3 mb-5 flex flex-wrap items-center gap-3">
                        <div className="relative flex-1 min-w-[200px] max-w-xs">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search units, types, or floors..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                        </div>

                        <select
                            value={floorFilter}
                            onChange={e => setFloorFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        >
                            <option value="all">All Floors</option>
                            {availableFloors.map(f => (
                                <option key={f} value={f}>Level {f}</option>
                            ))}
                        </select>

                        <div className="flex items-center gap-1.5 flex-wrap">
                            {[
                                { key: 'all',         label: 'All',         count: null              },
                                { key: 'available',   label: 'Available',   count: counts.available   },
                                { key: 'occupied',    label: 'Occupied',    count: counts.occupied    },
                                { key: 'maintenance', label: 'Maintenance', count: counts.maintenance },
                                { key: 'reserved',    label: 'Reserved',    count: counts.reserved    },
                            ].map(({ key, label, count }) => (
                                <button
                                    key={key}
                                    onClick={() => setFilter(key)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                                        filter === key
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {label}
                                    {count !== null && (
                                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                                            filter === key ? 'bg-white/20 text-white' : 'bg-white text-gray-600'
                                        }`}>
                                            {count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1" />

                        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setView('table')}
                                className={`px-4 py-2 text-sm font-semibold transition-all flex items-center gap-1.5 ${view === 'table' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                Table
                            </button>
                            <button
                                onClick={() => setView('floorplan')}
                                className={`px-4 py-2 text-sm font-semibold transition-all flex items-center gap-1.5 border-l border-gray-300 ${view === 'floorplan' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0H7" />
                                </svg>
                                Floor Plan
                            </button>
                        </div>

                        {hasChanges && (
                            <button
                                onClick={saveChanges}
                                className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-all animate-pulse flex items-center gap-1.5"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Save Changes
                            </button>
                        )}
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                        Showing <strong className="text-black">{filteredUnits.length}</strong> of <strong className="text-black">{units.length}</strong> units
                        {searchQuery && <> matching "<strong className="text-black">{searchQuery}</strong>"</>}
                        {floorFilter !== 'all' && <> on <strong className="text-black">Level {floorFilter}</strong></>}
                    </p>

                    {/* Floor Plan View */}
                    {view === 'floorplan' && (
                        <div className="w-full">
                            <div className="flex items-center gap-6 mb-3">
                                {[
                                    { color: 'bg-green-500',  label: 'Available Units' },
                                    { color: 'bg-red-500',    label: 'Occupied Units'  },
                                    { color: 'bg-yellow-400', label: 'Maintenance'     },
                                    { color: 'bg-purple-500', label: 'Reserved'        },
                                    { color: 'bg-gray-300',   label: 'Common Areas'    },
                                ].map(({ color, label }) => (
                                    <div key={label} className="flex items-center gap-1.5">
                                        <div className={`w-4 h-4 rounded ${color}`} />
                                        <span className="text-sm text-gray-600">{label}</span>
                                    </div>
                                ))}
                                <span className="ml-auto text-sm text-gray-500">Click on units to view details</span>
                            </div>

                            <div className="flex gap-2 mb-4">
                                {availableFloors.map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFloorFilter(f.toString())}
                                        className={`px-5 py-2 rounded-lg text-sm font-bold border transition-all ${
                                            activePlanFloor === f
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                                        }`}
                                    >
                                        Level {f}
                                    </button>
                                ))}
                            </div>

                            <NexusFloorPlanViewer
                                selectedFloor={activePlanFloor}
                                units={units}
                                onUnitClick={openEditModal}
                                searchTerm={searchQuery}
                                filters={{ status: filter }}
                            />
                        </div>
                    )}

                    {/* Table View */}
                    {view === 'table' && (
                        <div className="bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {['Unit', 'Level', 'Type', 'Beds/Baths', 'Area', 'Rent', 'Status', 'Actions'].map(h => (
                                                <th key={h} className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredUnits.map(unit => (
                                            <tr key={unit.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-black">Unit {unit.unit_number}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Level {unit.floor?.floor_number}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{unit.unit_type?.name || 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{unit.unit_type?.bedrooms || 0} / {unit.unit_type?.bathrooms || 0}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{unit.unit_type?.area_sqft ? `${unit.unit_type.area_sqft} sq ft` : 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="number"
                                                        value={editingUnits[unit.id]?.price ?? parseFloat(unit.price) ?? ''}
                                                        onChange={e => updateUnitField(unit.id, 'price', e.target.value)}
                                                        className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select
                                                        value={editingUnits[unit.id]?.status ?? unit.status}
                                                        onChange={e => updateUnitField(unit.id, 'status', e.target.value)}
                                                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                                    >
                                                        <option value="available">Available</option>
                                                        <option value="occupied">Occupied</option>
                                                        <option value="maintenance">Maintenance</option>
                                                        <option value="reserved">Reserved</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => openEditModal(unit)}
                                                            className="bg-black text-white px-3 py-1 rounded text-xs font-semibold hover:bg-gray-800 transition-colors"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => { setSelectedUnitForImages(unit); setIsImageModalOpen(true); }}
                                                            className="bg-gray-100 text-black px-3 py-1 rounded text-xs font-semibold hover:bg-gray-200 transition-colors relative"
                                                        >
                                                            Images
                                                            {unit.images?.length > 0 && (
                                                                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
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

                            {filteredUnits.length === 0 && (
                                <div className="text-center py-16">
                                    <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0H7" />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">No units found</h3>
                                    <p className="text-gray-500 text-sm">
                                        {filter === 'all' ? 'No units have been created yet.' : `No units with status "${filter}" found.`}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* EDIT UNIT MODAL */}
            <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="bg-black p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                                    <Building2 className="w-6 h-6 text-black" />
                                </div>
                                <div>
                                    <DialogTitle className="text-xl font-bold text-white">Edit Unit {editingUnit?.unit_number}</DialogTitle>
                                    <p className="text-sm text-gray-300">Update unit details and information</p>
                                </div>
                            </div>
                            <button onClick={() => setIsEditModalOpen(false)} className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            {editingUnit && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-black mb-2">Unit Number</label>
                                            <input readOnly value={editingUnit.unit_number} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-black mb-2">Monthly Rent ($)</label>
                                            <input
                                                type="number"
                                                value={editingUnit.price || ''}
                                                onChange={e => setEditingUnit({ ...editingUnit, price: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                                                placeholder="Enter monthly rent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-black mb-2">Status</label>
                                            <select
                                                value={editingUnit.status}
                                                onChange={e => setEditingUnit({ ...editingUnit, status: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                                            >
                                                <option value="available">Available</option>
                                                <option value="occupied">Occupied</option>
                                                <option value="maintenance">Maintenance</option>
                                                <option value="reserved">Reserved</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-black mb-2">Admin Notes</label>
                                            <textarea
                                                value={editingUnit.notes || ''}
                                                onChange={e => setEditingUnit({ ...editingUnit, notes: e.target.value })}
                                                rows={4}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                                                placeholder="Enter internal notes..."
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-black mb-2">Floor</label>
                                            <input readOnly value={`Level ${editingUnit.floor?.floor_number || 'N/A'}`} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-black mb-2">Unit Type</label>
                                            <input readOnly value={editingUnit.unit_type?.name || 'N/A'} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-black mb-2">Bedrooms</label>
                                                <input readOnly value={editingUnit.unit_type?.bedrooms || '0'} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-black mb-2">Bathrooms</label>
                                                <input readOnly value={editingUnit.unit_type?.bathrooms || '0'} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-black mb-2">Area (sq ft)</label>
                                            <input readOnly value={editingUnit.unit_type?.area_sqft || 'N/A'} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-black mb-2">Images</label>
                                            <button
                                                onClick={() => { setIsEditModalOpen(false); setSelectedUnitForImages(editingUnit); setIsImageModalOpen(true); }}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-55 transition-colors flex items-center gap-2"
                                            >
                                                🎨 Manage Images ({editingUnit.images?.length || 0} uploaded)
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                            <button onClick={() => setIsEditModalOpen(false)} className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors text-sm">
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (!editingUnit) return;
                                    const t = toast.loading(`Updating unit ${editingUnit.unit_number}…`);
                                    router.patch(`/admin/nexus-units/${editingUnit.id}`, {
                                        price: editingUnit.price,
                                        status: editingUnit.status,
                                        notes: editingUnit.notes,
                                        floor_id: editingUnit.floor?.id,
                                        unit_number: editingUnit.unit_number,
                                        unit_type_id: editingUnit.unit_type?.id,
                                    }, {
                                        preserveScroll: true,
                                        onSuccess: () => { toast.dismiss(t); toast.success(`Unit ${editingUnit.unit_number} updated!`, { icon: <CheckCircle className="w-5 h-5 text-emerald-500" /> }); setIsEditModalOpen(false); },
                                        onError: (err) => { toast.dismiss(t); triggerErrorModal(err); },
                                    });
                                }}
                                className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm"
                            >
                                Save Changes
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

            {/* IMAGE UPLOAD MODAL */}
            <Dialog open={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="bg-black p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                                    🔑
                                </div>
                                <div>
                                    <DialogTitle className="text-xl font-bold text-white">Unit {selectedUnitForImages?.unit_number} Images</DialogTitle>
                                    <p className="text-sm text-gray-300">Upload and manage images for this unit</p>
                                </div>
                            </div>
                            <button onClick={() => setIsImageModalOpen(false)} className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        <div className="p-6 max-h-96 overflow-y-auto">
                            {selectedUnitForImages && (
                                <NexusImageUpload
                                    unit={selectedUnitForImages}
                                    onImagesUpdated={() => router.reload({ only: ['units'] })}
                                />
                            )}
                        </div>

                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                            <p className="text-xs text-gray-500">Supported formats: JPG, PNG, GIF • Max size: 10MB per image</p>
                            <button onClick={() => setIsImageModalOpen(false)} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-medium">
                                Close
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

            {/* Reusable Error Modal (exactly as requested: Toast for Success, Modal for Error) */}
            <Dialog open={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)} className="relative z-[60]">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-red-100">
                        <div className="bg-red-50 p-6 flex items-center space-x-3 border-b border-red-100">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-650">
                                <AlertTriangle className="w-5 h-5" />
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
