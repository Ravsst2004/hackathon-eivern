import EventCard from '@/components/landing/EventCard';
import Pagination from '@/components/shared/Pagination'; // 1. Impor komponen Pagination
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';

// 2. Definisikan tipe data agar sesuai dengan data dari Controller
interface Event {
    id: number;
    nama: string;
    deskripsi: string;
    logo: string;
    // tambahkan properti lain jika perlu
}

// Tipe untuk objek paginator dari Laravel
interface Paginator<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    // Anda bisa menambahkan properti paginator lain jika perlu
}

interface PageProps {
    events: Paginator<Event>;
}

export default function EventIndex({ events }: PageProps) {
    // 3. Hapus semua data dummy dan state management (useState, useMemo, handlePageChange)

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

                {/* 4. Grid Acara sekarang menggunakan data asli */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {events.data.map((event) => (
                        <EventCard
                            key={event.id}
                            title={event.nama} // Gunakan 'nama'
                            description={event.deskripsi} // Gunakan 'deskripsi'
                            imageUrl={`/storage/logos/${event.logo}`} // Sesuaikan path gambar
                            detailLink={route('events.show', event.id)} // Gunakan link dinamis
                        />
                    ))}
                </div>

                {/* 5. Tampilkan komponen Pagination dengan data 'links' dari controller */}
                <Pagination links={events.links} />
            </div>
        </GuestLayout>
    );
}
