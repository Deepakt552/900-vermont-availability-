import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Create Admin Account - The 900" />
            
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-lg mb-6">
                        <span className="text-white font-black text-xl">9</span>
                    </div>
                    <h2 className="text-3xl font-black text-black tracking-tight">
                        CREATE ADMIN ACCOUNT
                    </h2>
                    <p className="mt-2 text-sm text-gray-550">
                        Register a new admin portal profile
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-150"
                                placeholder="John Doe"
                                required
                            />
                            {errors.name && <p className="mt-2 text-xs text-red-650 font-medium">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-150"
                                placeholder="name@example.com"
                                required
                            />
                            {errors.email && <p className="mt-2 text-xs text-red-650 font-medium">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-150"
                                placeholder="••••••••"
                                required
                            />
                            {errors.password && <p className="mt-2 text-xs text-red-650 font-medium">{errors.password}</p>}
                        </div>

                        {/* Password Confirmation */}
                        <div>
                            <label htmlFor="password_confirmation" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                id="password_confirmation"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-150"
                                placeholder="••••••••"
                                required
                            />
                            {errors.password_confirmation && <p className="mt-2 text-xs text-red-650 font-medium">{errors.password_confirmation}</p>}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-black text-white py-3 px-4 rounded-xl font-bold hover:bg-neutral-800 transition-all text-sm uppercase tracking-wider disabled:opacity-50"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
