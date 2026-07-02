import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    Building2,
    Map,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Sidebar navigation config (Dashboard hidden/disabled per user request)
    const navItems = [
        { name: '900 Units', href: '/admin/units', icon: Building2, activeRule: route().current('admin.units.*') },
        { name: 'Nexus Units', href: '/admin/nexus-units', icon: Building2, activeRule: route().current('admin.nexus-units.*'), nexusStyle: true },

    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* ── DESKTOP SIDEBAR ── */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed inset-y-0 left-0 z-40">
                {/* Sidebar Header */}
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center group-hover:scale-105 transition-all">
                            <span className="text-white font-black text-base">9</span>
                        </div>
                        <div>
                            <h1 className="text-sm font-black text-gray-900 tracking-tight">THE 900</h1>
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Property Admin</p>
                        </div>
                    </Link>
                </div>

                {/* Sidebar Menu Links */}
                <nav className="flex-1 px-4 py-6 space-y-1.5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${item.activeRule
                                        ? 'bg-black text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 mr-3 ${item.nexusStyle && !item.activeRule ? 'text-indigo-550' : ''}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section / Sign Out */}
                <div className="p-4 border-t border-gray-200">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="w-full flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-colors">
                                <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="text-left flex-1 min-w-0">
                                    <p className="text-xs font-bold text-gray-900 truncate">{user.name}</p>
                                    <p className="text-[10px] text-gray-500 font-medium">Administrator</p>
                                </div>
                                <span className="text-[9px] text-gray-400">▲</span>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content className="w-56 bg-white border border-gray-200 rounded-xl shadow-xl mb-2 origin-bottom-left">
                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="text-xs font-bold text-gray-900">{user.name}</p>
                                <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                            </div>
                            <Dropdown.Link href={route('profile.edit')} className="flex items-center px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 font-semibold">
                                <Settings className="w-3.5 h-3.5 mr-2.5 text-gray-400" />
                                Account Settings
                            </Dropdown.Link>
                            <div className="border-t border-gray-100 my-1"></div>
                            <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center w-full px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 font-semibold text-red-600">
                                <LogOut className="w-3.5 h-3.5 mr-2.5 text-red-400" />
                                Sign Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </aside>

            {/* ── MAIN WORKSPACE ── */}
            <div className="flex-1 flex flex-col md:pl-64 min-w-0">
                {/* Top header utilities */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shrink-0">
                    {/* Page header title */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 rounded-lg text-gray-500 hover:text-gray-955 hover:bg-gray-100 md:hidden"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        {header && <div className="text-sm font-bold text-gray-800">{header}</div>}
                    </div>

                    <div className="flex items-center space-x-3">
                        {/* Status label / Quick Links */}
                        <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 bg-green-50 rounded-full border border-green-200">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Systems Active</span>
                        </div>
                    </div>
                </header>

                {/* Sub-view Area */}
                <main className="flex-1">
                    {children}
                </main>
            </div>

            {/* ── MOBILE MENU DRAWER ── */}
            <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                {/* Backdrop */}
                <div onClick={() => setIsMobileMenuOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-xs" />

                {/* Slide out Panel */}
                <div className={`absolute left-0 top-0 bottom-0 w-72 bg-white flex flex-col justify-between transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div>
                        {/* Mobile Header */}
                        <div className="h-16 flex items-center justify-between px-5 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                                    <span className="text-white font-black text-sm">9</span>
                                </div>
                                <span className="font-black text-sm text-gray-900 tracking-tight">THE 900</span>
                            </div>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Mobile Menu Links */}
                        <nav className="p-4 space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${item.activeRule
                                                ? 'bg-black text-white'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4 mr-3" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Mobile Footer / sign out */}
                    <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-gray-900 truncate">{user.name}</p>
                                <p className="text-[9px] text-gray-450">Admin</p>
                            </div>
                        </div>
                        <Link href={route('logout')} method="post" as="button" className="p-2 text-red-650 hover:bg-red-50 rounded-lg transition-colors">
                            <LogOut className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}