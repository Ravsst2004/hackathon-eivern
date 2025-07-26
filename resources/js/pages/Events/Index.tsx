import OtherEventsSidebar from '@/components/events/OtherEventsSidebar';
import GuestLayout from '@/layouts/guest-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

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
    const { auth } = usePage().props;
    const [activeTab, setActiveTab] = useState('overview');

    // DIUBAH: Gunakan 'post' dan tambahkan '_method: "put"' untuk method spoofing
    const { data, setData, post, processing, errors, progress } = useForm({
        img: null as File | null,
        uniqId: '',
        event_id: event.id,
        _method: 'put', // Baris ini memberitahu Laravel untuk menangani request ini sebagai PUT
    });

    const handleCertificateSubmit = (e: FormEvent) => {
        e.preventDefault();
        // DIUBAH: Panggil 'post' dengan nama route yang benar ('sertifikat.upload')
        // Inertia akan secara otomatis mengirim data dari useForm, termasuk _method: 'put'
        post(route('sertifikat.upload'));
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Tanggal tidak tersedia';
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
                        <div className="mb-4 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2 h-6 w-6 text-gray-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <h3 className="text-xl font-semibold text-black">Upload Sertifikat</h3>
                        </div>
                        <form onSubmit={handleCertificateSubmit}>
                            <div className="mb-4">
                                <label htmlFor="img" className="mb-1 block text-sm font-medium text-gray-700">
                                    Upload Gambar Sertifikat
                                </label>
                                <div className="mt-1 flex rounded-md border border-gray-300">
                                    <span className="inline-flex items-center rounded-l-md border-r bg-gray-50 px-3 text-sm text-gray-500">
                                        Pilih File
                                    </span>
                                    <input
                                        type="file"
                                        id="img"
                                        onChange={(e) => setData('img', e.target.files ? e.target.files[0] : null)}
                                        className="block w-full cursor-pointer rounded-r-md border-0 bg-white p-2 text-sm text-gray-900 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                </div>
                                {errors.img && <p className="mt-1 text-sm text-red-600">{errors.img}</p>}
                            </div>
                            <div className="mb-6">
                                <label htmlFor="uniqId" className="mb-1 block text-sm font-medium text-gray-700">
                                    ID Unik Sertifikat
                                </label>
                                <input
                                    type="text"
                                    id="uniqId"
                                    value={data.uniqId}
                                    onChange={(e) => setData('uniqId', e.target.value)}
                                    className="block w-full rounded-md border-gray-300 bg-white p-2 text-black shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    placeholder="Masukkan ID yang tertera pada sertifikat Anda"
                                />
                                {errors.uniqId && <p className="mt-1 text-sm text-red-600">{errors.uniqId}</p>}
                            </div>
                            {progress && (
                                <div className="mb-4 w-full rounded-full bg-gray-200">
                                    <div
                                        className="rounded-full bg-blue-600 p-0.5 text-center text-xs leading-none font-medium text-blue-100"
                                        style={{ width: `${progress.percentage}%` }}
                                    >
                                        {progress.percentage}%
                                    </div>
                                </div>
                            )}
                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                                >
                                    Upload Sertifikat
                                </button>
                            </div>
                        </form>
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
                                    {' '}
                                    Diselenggarakan oleh <strong>{event.ormawa.nama}</strong>{' '}
                                </span>
                            )}
                            {event.ormawa && <span>•</span>}
                            <span>{formatDate(event.tanggal)}</span>
                        </div>
                        <div className="mt-8">
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
                                <div className="rounded-lg border-2 border-dashed bg-gray-50 p-8 text-center">
                                    <h3 className="text-xl font-semibold text-gray-800">Detail Acara Terbatas</h3>
                                    <p className="mt-2 mb-4 text-gray-600">
                                        {' '}
                                        Silakan login untuk melihat informasi lengkap seperti deskripsi, pembicara, dan detail sertifikat.{' '}
                                    </p>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-md bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-500"
                                    >
                                        {' '}
                                        Login untuk Melihat Detail{' '}
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
