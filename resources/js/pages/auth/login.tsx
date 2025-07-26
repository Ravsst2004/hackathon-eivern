// Lokasi file: resources/js/pages/Auth/Login.tsx

import AuthLayout from '@/layouts/auth-layout'; // Pastikan path ke AuthLayout Anda sudah benar
import { useForm } from '@inertiajs/react';
import React, { FormEvent, useEffect } from 'react';

export default function Login() {
    // Hook `useForm` dari Inertia untuk mengelola state form,
    // status `processing` (loading), dan objek `errors` dari backend.
    const { data, setData, post, processing, errors, reset } = useForm({
        nim: '',
        password: '',
        remember: false, // Opsi "remember me"
    });

    // `useEffect` ini akan berjalan ketika komponen dilepas dari DOM (misal, pindah halaman).
    // Tujuannya adalah untuk membersihkan field password agar tidak tersimpan.
    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    // Fungsi ini akan dipanggil setiap kali ada perubahan pada input NIM atau password.
    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        // Memperbarui state `data` sesuai dengan nama dan nilai input yang berubah.
        setData(target.name as 'nim' | 'password', target.value);
    };

    // Fungsi yang akan dieksekusi saat form di-submit.
    const submit = (e: FormEvent) => {
        e.preventDefault(); // Mencegah reload halaman standar dari form submission
        // Mengirim data form ke route 'login' di backend menggunakan metode POST.
        // Inertia akan menangani request-response secara otomatis.
        post(route('login'));
    };

    return (
        // Menggunakan AuthLayout sebagai pembungkus utama halaman.
        // `title` untuk judul tab browser, `pageTitle` untuk judul di dalam kartu form.
        <AuthLayout title="Login Mahasiswa" pageTitle="Login">
            <div className="items-center justify-center pb-4">
                <form onSubmit={submit} className="pb-7">
                    {/* Input untuk NIM */}
                    <div className="mb-8">
                        <label htmlFor="nim" className="mb-3 block text-[18px] font-bold text-gray-700">
                            NIM
                        </label>
                        <input
                            type="text"
                            name="nim"
                            id="nim"
                            value={data.nim}
                            className="focus:ring-opacity-50 border-gray-00 mt-1 block h-11 w-full rounded-md border-[1px] border-gray-300 pl-3 text-[18px] text-black shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                            autoComplete="username"
                            onChange={onHandleChange}
                            required
                            autoFocus
                        />
                        {/* Menampilkan pesan error untuk 'nim' jika ada */}
                        {errors.nim && <div className="mt-3 text-sm text-red-500">{errors.nim}</div>}
                    </div>

                    {/* Input untuk Password */}
                    <div className="mb-6">
                        <label htmlFor="password" className="mb-3 block text-[18px] font-bold text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={data.password}
                            className="focus:ring-opacity-50 mt-1 block h-11 w-full rounded-md border-[1px] border-gray-300 pr-4 pl-3 text-[18px] text-black shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                            autoComplete="current-password"
                            onChange={onHandleChange}
                            required
                        />
                        {/* Menampilkan pesan error untuk 'password' jika ada */}
                        {errors.password && <div className="mt-1 text-sm text-red-500">{errors.password}</div>}
                    </div>

                    {/* Tombol Sign In */}
                    <button
                        type="submit"
                        className="w-full rounded-md border border-transparent bg-gray-800 px-4 py-2 text-lg font-medium text-white shadow-sm hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                        disabled={processing} // Tombol dinonaktifkan saat request sedang diproses
                    >
                        {processing ? 'Memproses...' : 'Sign In'}
                    </button>
                </form>

                {/* Link ke halaman registrasi */}
                <a href={route('register')} className="text-gray-500 hover:text-gray-700">
                    Belum punya akun? Daftar sekarang
                </a>
            </div>
        </AuthLayout>
    );
}
