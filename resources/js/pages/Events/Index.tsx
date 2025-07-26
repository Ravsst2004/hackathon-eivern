import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

// --- Tipe Data Disesuaikan dengan Controller ---
interface Ormawa {
    id: number;
    nama: string;
}

interface Pembicara {
    id: number;
    nama: string;
    jabatan: string; // Asumsi ada field 'jabatan'
}

interface PembicaraEvent {
    id: number;
    pembicara: Pembicara;
}

interface Event {
    id: number;
    nama: string; // DIUBAH: dari title
    deskripsi: string; // DIUBAH: dari description
    logo: string; // DIUBAH: dari image_url
    tanggal: string;
    ormawa: Ormawa;
    pembicara_events: PembicaraEvent[]; // DIUBAH: nama relasi dari Eloquent
    // Asumsi 'certificate_info' tidak ada di database, kita akan beri fallback
}

interface PageProps {
    event: Event;
    otherEvents: Event[];
}

export default function EventShow({ event, otherEvents }: PageProps) {
    const [activeTab, setActiveTab] = useState('overview');

    // Fungsi untuk memformat tanggal
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'pembicara':
                return (
                    <div>
                        <h3 className="mb-4 text-xl font-semibold text-black">Informasi Pembicara</h3>
                        {event.pembicara_events && event.pembicara_events.length > 0 ? (
                            <ul className="space-y-3">
                                {event.pembicara_events.map(({ pembicara }) => (
                                    <li key={pembicara.id} className="rounded-md border bg-gray-50 p-3">
                                        <p className="font-semibold text-gray-800">{pembicara.nama}</p>
                                        <p className="text-sm text-gray-600">{pembicara.jabatan || 'Informasi jabatan tidak tersedia'}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">Informasi pembicara belum tersedia.</p>
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

    return (
        <GuestLayout>
            <Head title={event.nama} />

            <div className="container mx-auto my-8 px-4 lg:my-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Kolom Kiri - Konten Utama */}
                    <main className="lg:col-span-2">
                        {/* Gambar Event */}
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

                        {/* Judul dan Info Tambahan */}
                        <h1 className="mb-2 text-4xl font-bold text-gray-900">{event.nama}</h1>
                        <div className="mb-6 flex items-center space-x-4 text-gray-600">
                            <span>{/* Diselenggarakan oleh <strong>{event.ormawa.nama}</strong> */}</span>
                            <span>•</span>
                            <span>{formatDate(event.tanggal)}</span>
                        </div>

                        {/* Kontainer Tab */}
                        <div className="mt-8">
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
                        </div>
                    </main>

                    {/* Kolom Kanan - Sidebar */}
                    <aside>{/* <OtherEventsSidebar /> */}</aside>
                </div>
            </div>
        </GuestLayout>
    );
}
