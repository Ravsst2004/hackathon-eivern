// resources/js/layouts/guest-layout.tsx

import Footer from '@/components/shared/Footer'; // Sesuaikan path jika berbeda
import Navbar from '@/components/shared/Navbar'; // Sesuaikan path jika berbeda
import React from 'react';
// Asumsi Navbar berada di components/Shared

interface GuestLayoutProps {
    children: React.ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-100">
            {/* Navbar akan selalu ada di GuestLayout */}
            <Navbar />

            {/* Konten halaman akan dirender di sini */}
            <main className="flex-grow">{children}</main>

            <Footer />
        </div>
    );
}
