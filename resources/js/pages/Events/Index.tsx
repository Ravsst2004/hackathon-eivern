import OtherEventsSidebar from '@/components/events/OtherEventsSidebar';
import GuestLayout from '@/layouts/guest-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

// --- Tipe Data Disesuaikan dengan Controller ---
interface Ormawa {
    id: number;
    nama: string;
}

interface Pembicara {
    id: number;
    nama: string;
    jabatan?: string;
    deskripsi?: string;
}

interface Event {
    id: number;
    nama: string;
    deskripsi: string;
    logo: string;
    tanggal: string;
    ormawa?: Ormawa;
    pembicara_events?: Pembicara[];
}

interface PageProps {
    event: Event;
    otherEvents: Event[];
}

export default function EventShow({ event, otherEvents }: PageProps) {
    // Ambil status otentikasi dari shared props
    const { auth } = usePage().props;
    const [activeTab, setActiveTab] = useState('overview');

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Tanggal tidak tersedia';
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // Fungsi ini hanya akan dipanggil jika pengguna sudah login
    const renderTabContent = () => {
        switch (activeTab) {
            case 'pembicara':
                return (
                    <div>
                        <h3 className="mb-4 text-xl font-semibold text-black">Informasi Pembicara</h3>
                        {event.pembicara_events && event.pembicara_events.length > 0 ? (
                            <ul className="space-y-3">
                                {event.pembicara_events.map((pembicara) => (
                                    <li key={pembicara.id} className="rounded-md border bg-gray-50 p-3">
                                        <p className="font-semibold text-gray-800">{pembicara.nama}</p>
                                        <p className="text-sm text-gray-600">{pembicara.deskripsi || 'Informasi tambahan tidak tersedia'}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">Informasi pembicara untuk acara ini belum tersedia.</p>
                        )}
                    </div>
                );
            case 'sertifikat':
                return (
                    <div>
                        <h3 className="mb-3 text-xl font-semibold text-black">Informasi Sertifikat</h3>
                        <p className="text-gray-600">Informasi mengenai sertifikat akan diumumkan lebih lanjut oleh penyelenggara acara.</p>
                    </div>
                );
            case 'overview':
            default:
                return (
                    <div>
                        <h3 className="mb-3 text-xl font-semibold text-black">Deskripsi Acara</h3>
                        <p className="whitespace-pre-wrap text-gray-600">{event.deskripsi}</p>
                    </div>
                );
        }
    };

    if (!event) {
        return (
            <GuestLayout>
                <div>Memuat data event...</div>
            </GuestLayout>
        );
    }

    return (
        <GuestLayout>
            <Head title={event.nama} />

            <div className="container mx-auto my-8 px-4 lg:my-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <main className="lg:col-span-2">
                        <div className="mb-6 h-80 w-full overflow-hidden rounded-lg bg-gray-200">
                            {event.logo ? (
                                <img src={`/storage/logos/${event.logo}`} alt={event.nama} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1-1a2 2 0 010-2.828l1-1"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>

                        <h1 className="mb-2 text-4xl font-bold text-gray-900">{event.nama}</h1>
                        <div className="mb-6 flex items-center space-x-4 text-gray-600">
                            {event.ormawa && (
                                <span>
                                    Diselenggarakan oleh <strong>{event.ormawa.nama}</strong>
                                </span>
                            )}
                            {event.ormawa && <span>•</span>}
                            <span>{formatDate(event.tanggal)}</span>
                        </div>

                        {/* --- KONDISI UNTUK MENAMPILKAN KONTEN --- */}
                        <div className="mt-8">
                            {/* Jika user login, tampilkan sistem tab */}
                            {auth.user ? (
                                <>
                                    <div className="border-b border-gray-200">
                                        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                                            <button
                                                onClick={() => setActiveTab('overview')}
                                                className={`border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                                            >
                                                Overview
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('pembicara')}
                                                className={`border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap ${activeTab === 'pembicara' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                                            >
                                                Pembicara
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('sertifikat')}
                                                className={`border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap ${activeTab === 'sertifikat' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                                            >
                                                Sertifikat
                                            </button>
                                        </nav>
                                    </div>
                                    <div className="py-6">{renderTabContent()}</div>
                                </>
                            ) : (
                                // Jika user belum login, tampilkan pesan ini
                                <div className="rounded-lg border-2 border-dashed bg-gray-50 p-8 text-center">
                                    <h3 className="text-xl font-semibold text-gray-800">Detail Acara Terbatas</h3>
                                    <p className="mt-2 mb-4 text-gray-600">
                                        Silakan login untuk melihat informasi lengkap seperti deskripsi, pembicara, dan detail sertifikat.
                                    </p>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-md bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-500"
                                    >
                                        Login untuk Melihat Detail
                                    </Link>
                                </div>
                            )}
                        </div>
                    </main>

                    <aside>
                        <OtherEventsSidebar events={otherEvents} />
                    </aside>
                </div>
            </div>
        </GuestLayout>
    );
}
