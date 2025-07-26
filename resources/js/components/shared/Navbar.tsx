// resources/js/Components/Shared/Navbar.jsx
import { Link } from '@inertiajs/react';

export default function Navbar() {
    return (
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
            <div className="flex items-center">
                {/* Asumsi ikon ini adalah SVG atau gambar. Letakkan di public/images/ */}
                <img src="/images/document-icon.svg" alt="SISKA Icon" className="mr-3 h-8 w-8" />
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">SISKA</h1>
                    <p className="text-sm text-gray-600">Sistem Informasi SKKM Akademik</p>
                </div>
            </div>
            {/* Tambahkan margin-right ke div yang membungkus Link */}
            {/* Misalnya, mr-4 akan menggeser 16px ke kiri (jika p-4 di header adalah 16px) */}
            <div className="mr-10">
                {' '}
                {/* <--- TAMBAHKAN INI */}
                {/* Menggunakan Link dari Inertia untuk navigasi yang mulus */}
                <Link
                    href={route('login')} // Menggunakan fungsi route() dari Laravel (Ziggy)
                    className="rounded-md bg-gray-800 px-6 py-4 font-medium text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                >
                    LOGIN
                </Link>
            </div>
        </header>
    );
}
