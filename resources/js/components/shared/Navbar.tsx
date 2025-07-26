import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    // 1. Gunakan hook usePage() untuk mengakses shared props.
    // 'auth' secara default berisi informasi user yang login.
    const { auth } = usePage().props;

    return (
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
            <div className="flex items-center">
                <img src="/images/document-icon.svg" alt="SISKA Icon" className="mr-3 h-8 w-8" />
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">SISKA</h1>
                    <p className="text-sm text-gray-600">Sistem Informasi SKKM Akademik</p>
                </div>
            </div>

            <div className="mr-10">
                {/* 2. Gunakan conditional (ternary) operator untuk menampilkan tombol yang berbeda. */}
                {auth.user ? (
                    // Jika auth.user ada (user sudah login), tampilkan tombol "Dashboard".
                    <Link
                        href={route('dashboard')}
                        className="rounded-md bg-blue-600 px-6 py-4 font-medium text-white transition duration-150 ease-in-out hover:bg-blue-400 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                    >
                        DASHBOARD
                    </Link>
                ) : (
                    // Jika auth.user tidak ada (user belum login), tampilkan tombol "LOGIN".
                    <Link
                        href={route('login')}
                        className="rounded-md bg-blue-600 px-6 py-4 font-medium text-white transition duration-150 ease-in-out hover:bg-blue-500 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                    >
                        LOGIN
                    </Link>
                )}
            </div>
        </header>
    );
}
