import EventCard from '@/components/landing/EventCard';
import { Link } from '@inertiajs/react';

// Definisikan tipe data agar sesuai dengan data yang diterima
interface Ormawa {
    id: number;
    nama: string;
    logo: string;
}

interface Event {
    id: number;
    nama: string;
    logo: string;
    deskripsi: string;
    tanggal: string;
    ormawa: Ormawa;
}

interface EventsGridProps {
    events: Event[];
}

export default function EventsGridSection({ events }: EventsGridProps) {
    return (
        <section className="container mx-auto px-4 py-12">
            {/* Judul Bagian */}
            <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Acara & Kegiatan Terbaru</h2>
                <p className="mx-auto max-w-xl text-lg text-gray-700">
                    Jangan lewatkan berbagai acara menarik yang akan datang untuk menambah wawasan dan pengalaman Anda.
                </p>
            </div>

            {/* Grid Acara */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Loop data 'events' dari props, bukan lagi dummy data */}
                {/* Batasi hanya 6 event yang tampil di landing page */}
                {events.slice(0, 6).map((event) => (
                    <EventCard
                        key={event.id}
                        // Mapping data dari controller ke props EventCard
                        title={event.nama}
                        description={event.deskripsi}
                        // Pastikan path ke gambar benar, contoh: /storage/logos/namafile.jpg
                        imageUrl={`/storage/logos/${event.logo}`}
                        // Buat link detail menggunakan route helper dari Ziggy
                        detailLink={route('events.show', event.id)}
                    />
                ))}
            </div>

            {/* Tombol Lihat Semua Acara */}
            <div className="mt-12 text-center">
                <Link
                    href=""
                    className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition duration-150 ease-in-out hover:bg-blue-500 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                    Lihat semua acara
                    <svg className="-mr-0.5 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>
            </div>
        </section>
    );
}
