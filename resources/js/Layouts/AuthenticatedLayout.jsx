import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    LayoutDashboard,
    Building2,
    Map,
    User,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Clean Modern Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        
                        {/* Modern Logo */}
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors duration-200">
                                <span className="text-white font-bold text-lg">9</span>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-bold text-gray-900">THE 900</h1>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Property Admin</p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            <NavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
                                    route().current('dashboard')
                                        ? 'bg-black text-white'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                <LayoutDashboard className="w-4 h-4 mr-2" />
                                Dashboard
                            </NavLink>

                            <NavLink
                                href="/admin/units"
                                active={route().current('admin.units.*')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
                                    route().current('admin.units.*')
                                        ? 'bg-black text-white'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                <Building2 className="w-4 h-4 mr-2" />
                                Units
                            </NavLink>

                            <NavLink
                                href="/floor-plans/dynamic"
                                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 flex items-center"
                            >
                                <Map className="w-4 h-4 mr-2" />
                                Floor Plans
                            </NavLink>
                        </div>

                        {/* User Menu */}
                        <div className="hidden md:flex items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                        <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-semibold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="text-left">
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            <div className="text-xs text-gray-500">Admin</div>
                                        </div>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content className="w-64 bg-white border border-gray-200 rounded-xl shadow-lg mt-2">
                                    {/* Profile Section */}
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                                                <span className="text-white font-semibold">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-1">
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            <Settings className="w-4 h-4 mr-3" />
                                            Profile Settings
                                        </Dropdown.Link>
                                        
                                        <div className="border-t border-gray-100 my-1"></div>
                                        
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            <LogOut className="w-4 h-4 mr-3" />
                                            Sign Out
                                        </Dropdown.Link>
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                            >
                                {showingNavigationDropdown ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden border-t border-gray-200 bg-white transition-all duration-300 ${
                    showingNavigationDropdown ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                    <div className="px-4 py-4 space-y-2">
                        {/* Mobile Navigation */}
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                route().current('dashboard')
                                    ? 'bg-black text-white'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                        >
                            <LayoutDashboard className="w-5 h-5 mr-3" />
                            Dashboard
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href="/admin/units"
                            active={route().current('admin.units.*')}
                            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                route().current('admin.units.*')
                                    ? 'bg-black text-white'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                        >
                            <Building2 className="w-5 h-5 mr-3" />
                            Units
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href="/floor-plans/dynamic"
                            className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <Map className="w-5 h-5 mr-3" />
                            Floor Plans
                        </ResponsiveNavLink>

                        {/* Mobile User Section */}
                        <div className="pt-4 mt-4 border-t border-gray-200">
                            <div className="flex items-center space-x-3 px-3 py-2 mb-3">
                                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                            </div>

                            <ResponsiveNavLink
                                href={route('profile.edit')}
                                className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                            >
                                <Settings className="w-5 h-5 mr-3" />
                                Profile Settings
                            </ResponsiveNavLink>

                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="flex items-center w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                            >
                                <LogOut className="w-5 h-5 mr-3" />
                                Sign Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}