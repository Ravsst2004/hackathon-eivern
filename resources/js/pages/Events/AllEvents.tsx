import EventCard from '@/components/landing/EventCard';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

// Definisikan tipe data untuk Event
interface Event {
    id: number;
    title: string;
    description: string;
    image_url: string;
}

// --- DATA DUMMY ---
// Kita buat 25 data dummy untuk mensimulasikan 3 halaman (12 + 12 + 1)
const dummyEvents: Event[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Workshop Keren #${i + 1}: Topik Menarik`,
    description: `Ini adalah deskripsi singkat untuk workshop #${i + 1}. Pelajari hal-hal baru dan tingkatkan skill Anda bersama kami.`,
    image_url: '', // Kosongkan agar menampilkan placeholder
}));
// --- END OF DATA DUMMY ---

export default function EventIndex() {
    // State untuk melacak halaman yang sedang aktif
    const [currentPage, setCurrentPage] = useState(1);
    // Menetapkan jumlah item per halaman menjadi 12
    const itemsPerPage = 12;

    // Gunakan useMemo untuk menghitung data yang akan ditampilkan dan link paginasi
    // Ini akan dihitung ulang hanya jika `currentPage` berubah, sehingga lebih efisien.
    const paginatedData = useMemo(() => {
        const totalPages = Math.ceil(dummyEvents.length / itemsPerPage);

        // Hitung index awal dan akhir untuk memotong array data
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentData = dummyEvents.slice(startIndex, endIndex);

        // Buat struktur link paginasi secara dinamis
        const links = [];
        links.push({ url: currentPage > 1 ? '#' : null, label: '&laquo; Previous', active: false });

        for (let i = 1; i <= totalPages; i++) {
            links.push({ url: '#', label: i.toString(), active: i === currentPage });
        }

        links.push({ url: currentPage < totalPages ? '#' : null, label: 'Next &raquo;', active: false });

        return {
            data: currentData,
            links: links,
        };
    }, [currentPage]);

    // Fungsi untuk menangani klik pada tombol pagination
    const handlePageChange = (label: string) => {
        if (label.includes('Previous')) {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
        } else if (label.includes('Next')) {
            const totalPages = Math.ceil(dummyEvents.length / itemsPerPage);
            setCurrentPage((prev) => Math.min(prev + 1, totalPages));
        } else {
            const pageNumber = parseInt(label, 10);
            if (!isNaN(pageNumber)) {
                setCurrentPage(pageNumber);
            }
        }
    };

    return (
        <GuestLayout>
            <Head title="Semua Acara" />

            <div className="container mx-auto my-8 px-4 lg:my-12">
                {/* Header Halaman */}
                <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Semua Acara</h1>
                        <p className="mt-1 text-gray-600">Temukan acara dan kegiatan menarik di sini.</p>
                    </div>
                    <div className="relative text-black">
                        <select className="appearance-none rounded-md border border-gray-300 bg-white py-2 pr-10 pl-3 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none">
                            <option>Terbaru</option>
                            <option>Terlama</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Grid Acara */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {paginatedData.data.map((event) => (
                        <EventCard key={event.id} imageUrl={event.image_url} title={event.title} description={event.description} detailLink={'#'} />
                    ))}
                </div>

                {/* --- PAGINATION LOGIC & JSX --- */}
                <nav className="mt-12 flex items-center justify-center">
                    <div className="flex flex-wrap">
                        {paginatedData.links.map((link, index) => {
                            // Render tombol yang tidak bisa diklik (untuk Previous di hal 1, atau Next di hal terakhir)
                            if (link.url === null) {
                                return (
                                    <span
                                        key={`disabled-${index}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className="mx-1 flex h-9 min-w-[36px] cursor-not-allowed items-center justify-center rounded-md border border-gray-200 bg-gray-100 px-3 py-1 text-sm text-gray-400"
                                    />
                                );
                            }
                            // Render tombol yang bisa diklik
                            return (
                                <a
                                    key={link.label}
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(link.label);
                                    }}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`mx-1 flex h-9 min-w-[36px] items-center justify-center rounded-md border px-3 py-1 text-sm transition ${
                                        link.active
                                            ? 'border-blue-500 bg-blue-500 text-white'
                                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                />
                            );
                        })}
                    </div>
                </nav>
                {/* --- END OF PAGINATION --- */}
            </div>
        </GuestLayout>
    );
}
