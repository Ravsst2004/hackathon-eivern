// resources/js/components/Shared/Footer.tsx

import { Link } from '@inertiajs/react';

export default function Footer() {
    // Menyesuaikan tahun copyright secara dinamis
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-blue-600 px-4 py-8 text-white sm:px-6 lg:px-8">
            <div className="container mx-auto flex flex-col items-center justify-between text-sm sm:flex-row sm:items-start">
                {/* Kiri: Logo dan Copyright */}
                <div className="mb-6 flex flex-col items-center sm:mb-0 sm:items-start">
                    {/* Placeholder Logo */}
                    <Link
                        href={route('landing')}
                        className="mb-4 inline-block rounded bg-blue-400 px-6 py-3 text-lg font-bold transition duration-150 hover:bg-gray-600"
                    >
                        Logo
                    </Link>
                    {/* Teks Copyright */}
                    <p className="text-white hover:text-blue-300">Copyright &copy; {currentYear} SISKA. All rights reserved.</p>
                </div>

                {/* Kanan: Navigasi Tautan */}
                <div className="flex flex-col gap-4 text-white sm:flex-row sm:items-start sm:justify-end sm:gap-6">
                    <Link href="#" className="transition duration-150 hover:text-blue-300">
                        Privacy Policy
                    </Link>
                    <Link href="#" className="transition duration-150 hover:text-blue-300">
                        Terms & Conditions
                    </Link>
                    <Link href="#" className="transition duration-150 hover:text-blue-300">
                        Cookie Policy
                    </Link>
                    <Link href="#" className="transition duration-150 hover:text-blue-300">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    );
}
