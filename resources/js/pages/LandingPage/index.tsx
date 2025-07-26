import EventsGridSection from '@/components/landing/EventGridSection';
import GuestLayout from '@/layouts/guest-layout';
import { Head, Link } from '@inertiajs/react';

// Definisikan tipe data untuk event sesuai dengan struktur JSON dari controller
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

// Definisikan tipe untuk props halaman
interface LandingPageProps {
    events: Event[];
}

export default function LandingPage({ events }: LandingPageProps) {
    return (
        <GuestLayout>
            <Head>
                <title>SISKA - Sistem Informasi SKKM Akademik</title>
                <meta name="description" content="Sistem Informasi SKKM Akademik untuk mahasiswa, ormawa, BEM, dan kemahasiswaan." />
                <meta property="og:title" content="SISKA - Sistem Informasi SKKM Akademik" />
                <meta property="og:description" content="Kelola event dan SKKM Anda dengan mudah." />
                <meta property="og:image" content="/images/og-image.jpg" />
                <meta property="og:url" content={route('landing')} />
            </Head>

            {/* Bagian Hero Section */}
            <section className="container mx-auto my-16 px-4 py-8 text-center">
                <h2 className="mb-4 text-4xl font-bold text-gray-900">Kelola SKKM & Event Anda dengan Mudah</h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-700">
                    Platform terpadu untuk mahasiswa, organisasi, dan administrasi dalam mengelola poin SKKM dan aktivitas kampus.
                </p>
                <div className="mt-8">
                    <Link
                        href={route('register')}
                        className="rounded-md bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition duration-150 hover:bg-blue-700"
                    >
                        Daftar Sekarang
                    </Link>
                </div>
            </section>

            {/* Implementasi EventsGridSection, sekarang dengan data dari props */}
            <EventsGridSection events={events} />
        </GuestLayout>
    );
}
