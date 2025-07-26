// resources/js/components/LandingPage/EventsGridSection.tsx

import { Link } from '@inertiajs/react';
// Pastikan path import ini benar berdasarkan lokasi EventCard.tsx Anda
import EventCard from '@/components/landing/EventCard'; // Atau '@/components/LandingPage/EventCard' jika itu lokasinya

interface Event {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
    detailLink: string; // URL untuk melihat detail acara
}

const dummyEvents: Event[] = [
    {
        id: 1,
        imageUrl: '',
        title: 'Workshop Pemrograman Web Lanjut',
        description: 'Pelajari framework terbaru dalam pengembangan web. Ikuti workshop intensif ini!',
        detailLink: '#',
    }, // Ganti dengan '#'
    {
        id: 2,
        imageUrl: '',
        title: 'Seminar Karir Digital Marketing',
        description: 'Dapatkan insight dari ahli digital marketing. Persiapkan karir Anda di era digital.',
        detailLink: '#',
    }, // Ganti dengan '#'
    {
        id: 3,
        imageUrl: '',
        title: 'Kompetisi Ide Bisnis Inovatif',
        description: 'Adu ide brilian Anda dan menangkan hadiah menarik. Terbuka untuk semua jurusan.',
        detailLink: '#',
    }, // Ganti dengan '#'
    {
        id: 4,
        imageUrl: '',
        title: 'Diskusi Panel: Masa Depan AI',
        description:
            'Ikuti diskusi mendalam tentang perkembangan dan dampak Artificial Intelligence.Ikuti diskusi mendalam tentang perkembangan dan dampak Artificial Intelligence.Ikuti diskusi mendalam tentang perkembangan dan dampak Artificial Intelligence.',
        detailLink: '#',
    }, // Ganti dengan '#'
    {
        id: 5,
        imageUrl: '',
        title: 'Pelatihan Desain Grafis Dasar',
        description: 'Pelajari dasar-dasar desain grafis menggunakan tools populer. Cocok untuk pemula.',
        detailLink: '#',
    }, // Ganti dengan '#'
    {
        id: 6,
        imageUrl: '',
        title: 'Webinar Produktivitas Mahasiswa',
        description: 'Tips dan trik untuk meningkatkan produktivitas dan manajemen waktu selama kuliah.',
        detailLink: '#',
    }, // Ganti dengan '#'
];

export default function EventsGridSection() {
    return (
        <section className="container mx-auto px-4 py-12">
            {/* Judul Bagian */}
            <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                    <div className="mx-auto h-8 w-1/2 rounded bg-gray-300"></div> {/* Placeholder Judul 1 */}
                </h2>
                <p className="mx-auto max-w-xl text-lg text-gray-700">
                    <div className="mx-auto mb-2 h-5 w-3/4 rounded bg-gray-200"></div> {/* Placeholder Deskripsi 1 */}
                    <div className="mx-auto h-5 w-1/2 rounded bg-gray-200"></div> {/* Placeholder Deskripsi 2 */}
                </p>
            </div>

            {/* Grid Acara */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {dummyEvents.map((event) => (
                    <EventCard
                        key={event.id}
                        imageUrl={event.imageUrl}
                        title={event.title}
                        description={event.description}
                        detailLink={event.detailLink} // Ini akan menggunakan '#'
                    />
                ))}
            </div>

            {/* Tombol Lihat Semua Acara */}
            <div className="mt-12 text-center">
                <Link
                    href={route('all-events')} // Ganti route('all-events') dengan '#'
                    className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition duration-150 ease-in-out hover:bg-blue-400 focus:ring-2 focus:ring-offset-2 focus:outline-none"
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
