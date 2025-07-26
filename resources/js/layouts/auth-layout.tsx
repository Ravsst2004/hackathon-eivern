// resources/js/layouts/auth-layout.tsx

import { Head, Link } from '@inertiajs/react';
import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string; // Untuk judul Head tag
    pageTitle?: string; // Untuk judul yang ditampilkan di atas form (e.g., "Login")
}

export default function AuthLayout({ children, title, pageTitle = 'Login', ...props }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 sm:p-6 lg:p-8">
            <Head title={title || pageTitle} />

            {/* Icon Buku dan Garis */}
            {/* Sesuaikan mb-8 (margin-bottom) untuk jarak antara ikon dan kotak form */}
            <div className="mb-10 flex flex-col items-center">
                {' '}
                {/* <-- Sesuaikan mb-10 (misal: 40px) */}
                {/* Icon Buku (SVG placeholder) - Ukuran tetap h-10 w-10 */}
                {/* Sesuaikan padding p-4 (16px) untuk jarak di dalam lingkaran ikon */}
                <div className="mb-4 flex items-center justify-center rounded-full bg-gray-800 p-4">
                    <Link href={route('landing')}>
                        <img src="/images/logo-siska.png" alt="SISKA Icon" className="mr-3 h-8 w-8" />
                    </Link>
                </div>
                {/* Garis di bawah ikon (Placeholder) */}
                {/* Sesuaikan mb-1 (margin-bottom) antara dua garis */}
                <div className="mb-2 h-1.5 w-24 rounded-full bg-gray-400"></div> {/* <-- Sesuaikan mb-2 (misal: 8px) */}
                <div className="h-1.5 w-20 rounded-full bg-gray-300"></div>
            </div>

            {/* Kotak Form Utama */}
            {/* Sesuaikan padding p-8 (32px) untuk jarak di dalam kotak putih */}
            {/* Sesuaikan max-w-sm (24rem / 384px) untuk lebar maksimum kotak form */}
            <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-8 pb-5 shadow-xl">
                {' '}
                {/* <-- p-8 sudah cukup bagus */}
                {/* Judul Halaman Form (e.g., "Login") */}
                {/* Sesuaikan mb-6 (margin-bottom) untuk jarak antara judul dan input pertama */}
                <h2 className="pt-5 pb-8 text-center text-3xl font-bold text-gray-800">
                    {' '}
                    {/* <-- Sesuaikan mb-8 (misal: 32px) */}
                    {pageTitle}
                </h2>
                {children} {/* Di sinilah konten form dari Login.tsx akan dirender */}
            </div>
        </div>
    );
}
