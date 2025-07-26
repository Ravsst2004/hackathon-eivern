// resources/js/components/Shared/Footer.tsx

import { Link } from '@inertiajs/react';

export default function Footer() {
    // Menyesuaikan tahun copyright secara dinamis
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 px-4 py-8 text-white sm:px-6 lg:px-8">
            <div className="container mx-auto flex flex-col items-center justify-between text-sm sm:flex-row sm:items-start">
                {/* Kiri: Logo dan Copyright */}
                <div className="mb-6 flex flex-col items-center sm:mb-0 sm:items-start">
                    {/* Placeholder Logo */}
                    <Link
                        href={route('landing-page')}
                        className="mb-4 inline-block rounded bg-gray-700 px-6 py-3 text-lg font-bold transition duration-150 hover:bg-gray-600"
                    >
                        Logo
                    </Link>
                    {/* Teks Copyright */}
                    <p className="text-gray-400">Copyright &copy; {currentYear} SISKA. All rights reserved.</p>
                </div>

                {/* Kanan: Navigasi Tautan */}
                <div className="flex flex-col gap-4 text-gray-400 sm:flex-row sm:items-start sm:justify-end sm:gap-6">
                    <Link href="#" className="transition duration-150 hover:text-white">
                        Privacy Policy
                    </Link>
                    <Link href="#" className="transition duration-150 hover:text-white">
                        Terms & Conditions
                    </Link>
                    <Link href="#" className="transition duration-150 hover:text-white">
                        Cookie Policy
                    </Link>
                    <Link href="#" className="transition duration-150 hover:text-white">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    );
}
