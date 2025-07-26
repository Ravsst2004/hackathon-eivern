// resources/js/pages/Auth/Login.tsx

import AuthLayout from '@/layouts/auth-layout'; // Pastikan path ke AuthLayout benar
import { useForm } from '@inertiajs/react'; // Head tidak perlu diimpor lagi di sini, karena sudah di AuthLayout
import React, { FormEvent, useEffect } from 'react';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nim: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(event.target.name as 'nim' | 'password', event.target.value);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        // Gunakan AuthLayout sebagai wrapper untuk halaman login
        // Anda bisa meneruskan title ke AuthLayout untuk judul di browser tab
        // dan pageTitle untuk judul di dalam kotak form
        <AuthLayout title="Login Mahasiswa" pageTitle="Login">
            {' '}
            {/* Contoh: "Login Mahasiswa" di tab, "Login" di form */}
            <div className="pb-4">
                <form onSubmit={submit} className="pb-7">
                    {/* Input NIM */}
                    <div className="mb-8">
                        <label htmlFor="nim" className="mb-3 block text-[18px] font-bold text-gray-700">
                            NIM
                        </label>
                        <input
                            type="text"
                            name="nim"
                            id="nim"
                            value={data.nim}
                            className="focus:ring-opacity-50 mt-1 block h-11 w-full rounded-md border-gray-300 pl-3 text-[18px] text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                            autoComplete="username"
                            onChange={onHandleChange}
                            required
                            autoFocus
                        />
                        {errors.nim && <div className="mt-3 text-sm text-red-500">{errors.nim}</div>}
                    </div>

                    {/* Input Password */}
                    <div className="mb-6">
                        <label htmlFor="password" className="mb-3 block text-[18px] font-bold text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={data.password}
                            className="focus:ring-opacity-50 mt-1 block h-11 w-full rounded-md border-gray-300 pl-3 text-[18px] text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                            autoComplete="current-password"
                            onChange={onHandleChange}
                            required
                        />
                        {errors.password && <div className="mt-1 text-sm text-red-500">{errors.password}</div>}
                    </div>

                    {/* Tombol Sign In */}
                    <button
                        type="submit"
                        className="w-full rounded-md border border-transparent bg-gray-800 px-4 py-2 text-lg font-medium text-white shadow-sm hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                        disabled={processing}
                    >
                        Sign In
                    </button>
                </form>

                <a href="register" className="text-gray-500 hover:text-gray-700">
                    Belum punya akun? Daftar sekarang
                </a>
            </div>
        </AuthLayout>
    );
}
