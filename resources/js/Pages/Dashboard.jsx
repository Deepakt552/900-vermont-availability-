import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Building2, 
    CheckCircle2, 
    XCircle, 
    TrendingUp, 
    PlusCircle, 
    Map, 
    Activity, 
    DollarSign, 
    Percent 
} from 'lucide-react';

export default function Dashboard({ auth, stats = {} }) {
    const {
        totalUnits = 0,
        availableUnits = 0,
        occupiedUnits = 0,
        maintenanceUnits = 0,
        reservedUnits = 0,
        totalRevenue = 0,
        occupancyRate = 0
    } = stats;

    const quickStats = [
        {
            title: 'Total Units',
            value: totalUnits,
            icon: Building2,
            color: 'bg-white text-black border border-gray-200',
            iconColor: 'text-black'
        },
        {
            title: 'Available',
            value: availableUnits,
            icon: CheckCircle2,
            color: 'bg-white text-green-700 border border-gray-200',
            iconColor: 'text-green-600'
        },
        {
            title: 'Occupied',
            value: occupiedUnits,
            icon: XCircle,
            color: 'bg-white text-red-700 border border-gray-200',
            iconColor: 'text-red-600'
        },
        {
            title: 'Occupancy Rate',
            value: `${occupancyRate}%`,
            icon: Percent,
            color: 'bg-white text-indigo-700 border border-gray-200',
            iconColor: 'text-indigo-600'
        }
    ];

    const quickActions = [
        {
            title: 'Manage 900 Units',
            description: 'View and edit units, pricing, and availability in The 900 Building',
            href: '/admin/units',
            icon: Building2,
        },
        {
            title: 'Manage Nexus Units',
            description: 'View and edit units, pricing, and availability in Northridge Nexus',
            href: '/admin/nexus-units',
            icon: Building2,
        },
        {
            title: 'Floor Plans',
            description: 'View interactive floor plans and unit layouts',
            href: '/floor-plans/dynamic',
            icon: Map,
        }
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Admin Dashboard" />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Modern Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-black tracking-tight mb-2">
                            Dashboard
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Welcome back, <strong className="text-black font-semibold">{auth.user.name}</strong>. Here's the current state of your properties.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {quickStats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className={`${stat.color} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                {stat.title}
                                            </p>
                                            <p className="text-3xl font-black text-black mt-2">
                                                {stat.value}
                                            </p>
                                        </div>
                                        <div className={`p-3 bg-gray-50 rounded-xl ${stat.iconColor}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-10">
                        <h2 className="text-lg font-bold text-black mb-5 uppercase tracking-wider">Quick Portals</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {quickActions.map((action, index) => {
                                const Icon = action.icon;
                                return (
                                    <Link
                                        key={index}
                                        href={action.href}
                                        className="bg-white border border-gray-250 rounded-2xl p-6 hover:shadow-md hover:border-black transition-all duration-300 group flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 group-hover:bg-black group-hover:text-white transition-all duration-300 mb-4">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-base font-bold text-black mb-2 group-hover:text-black">
                                                {action.title}
                                            </h3>
                                            <p className="text-gray-500 text-xs leading-relaxed">
                                                {action.description}
                                            </p>
                                        </div>
                                        <span className="text-xs font-bold text-black mt-4 flex items-center group-hover:translate-x-1 transition-transform">
                                            Open Portal →
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white border border-gray-250 rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-black mb-5 uppercase tracking-wider flex items-center gap-2">
                            <Activity className="w-4 h-4 text-gray-500" />
                            <span>Recent Portfolio Activity</span>
                        </h2>
                        <div className="space-y-4">
                            {[
                                { title: 'Unit 204 status updated', desc: 'Changed from Available to Occupied', time: '2 hours ago', bg: 'bg-black text-white' },
                                { title: 'Unit 315 rent updated', desc: 'Price changed to $2,800/month', time: '5 hours ago', bg: 'bg-neutral-800 text-white' },
                                { title: 'New images uploaded', desc: 'Unit 108 received 3 new photos', time: '1 day ago', bg: 'bg-black text-white' }
                            ].map((activity, idx) => (
                                <div key={idx} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100/70 transition-colors">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${activity.bg}`}>
                                        ✓
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-black">{activity.title}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{activity.desc} • {activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}