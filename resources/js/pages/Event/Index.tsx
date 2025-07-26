import OtherEventsSidebar from '@/components/events/OtherEventsSidebar'; // Komponen baru untuk sidebar
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

// Definisikan tipe data untuk props agar lebih aman
interface Event {
    id: number;
    title: string;
    description: string;
    image_url: string; // sesuaikan dengan nama kolom di database Anda
    // tambahkan properti lain yang relevan
    speaker_info: string;
    certificate_info: string;
}

interface PageProps {
    event: Event;
    otherEvents: Event[];
}

export default function EventShow({ event, otherEvents }: PageProps) {
    const [activeTab, setActiveTab] = useState('overview');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'pembicara':
                return (
                    <div>
                        <h3 className="mb-3 text-xl font-semibold">Informasi Pembicara</h3>
                        <p className="text-gray-600">{event.speaker_info || 'Informasi pembicara belum tersedia.'}</p>
                    </div>
                );
            case 'sertifikat':
                return (
                    <div>
                        <h3 className="mb-3 text-xl font-semibold">Informasi Sertifikat</h3>
                        <p className="text-gray-600">{event.certificate_info || 'Informasi sertifikat belum tersedia.'}</p>
                    </div>
                );
            case 'overview':
            default:
                return (
                    <div>
                        <h3 className="mb-3 text-xl font-semibold">Deskripsi Acara</h3>
                        <p className="whitespace-pre-wrap text-gray-600">{event.description}</p>
                    </div>
                );
        }
    };

    return (
        <GuestLayout>
            <Head title={event.title} />

            <div className="container mx-auto my-8 px-4 lg:my-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Kolom Kiri - Konten Utama */}
                    <main className="lg:col-span-2">
                        {/* Gambar Event */}
                        <div className="mb-6 h-80 w-full overflow-hidden rounded-lg bg-gray-200">
                            {event.image_url ? (
                                <img src={event.image_url} alt={event.title} className="h-full w-full object-cover" />
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

                        {/* Judul dan Deskripsi Awal */}
                        <h1 className="mb-4 text-4xl font-bold text-gray-900">{event.title}</h1>

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

                            {/* Konten Tab */}
                            <div className="py-6">{renderTabContent()}</div>
                        </div>
                    </main>

                    {/* Kolom Kanan - Sidebar */}
                    <aside>
                        <OtherEventsSidebar events={otherEvents} />
                        {/* Anda bisa memanggil komponen ini dua kali jika ingin dua blok "Acara Lainnya" */}
                    </aside>
                </div>
            </div>
        </GuestLayout>
    );
}
