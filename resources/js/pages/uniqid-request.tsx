import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Request Uniq ID',
        href: '/uniqid-request',
    },
];

export default function UniqIdRequest({ data }: any) {
    const [uniqIds, setUniqIds] = useState<{ [key: number]: string }>({});
    const [expandedEvents, setExpandedEvents] = useState<number[]>([]);
    const { put, processing } = useForm();

    const toggleEvent = (eventId: number) => {
        setExpandedEvents((prev) => (prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]));
    };

    const handleInputChange = (eventId: number, value: string) => {
        setUniqIds((prev) => ({
            ...prev,
            [eventId]: value,
        }));
    };

    const handleSubmit = (eventId: number) => {
        if (!uniqIds[eventId]) {
            alert('Silakan masukkan Uniq ID terlebih dahulu');
            return;
        }

        router.post('/generate-uniq-id', {
            _method: 'put',
            eventId,
            uniqId: uniqIds[eventId],
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Request Uniq ID" />

            <main className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
                <div className="space-y-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Event</TableHead>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Jumlah Sertifikat</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((event) => (
                                <>
                                    <TableRow key={event.id}>
                                        <TableCell className="font-medium">{event.nama}</TableCell>
                                        <TableCell>{new Date(event.tanggal).toLocaleDateString()}</TableCell>
                                        <TableCell>{event.sertifikat_events?.length || 0}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => toggleEvent(event.id)}>
                                                {expandedEvents.includes(event.id) ? (
                                                    <ChevronDown className="h-4 w-4" />
                                                ) : (
                                                    <ChevronRight className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    {expandedEvents.includes(event.id) && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="p-0">
                                                <div className="space-y-4 bg-gray-50 p-4">
                                                    {event.sertifikat_events?.length > 0 ? (
                                                        <>
                                                            <div className="flex items-center gap-4">
                                                                <Input
                                                                    type="text"
                                                                    placeholder="Masukkan Uniq ID (contoh: SKKM/2023)"
                                                                    value={uniqIds[event.id] || ''}
                                                                    onChange={(e) => handleInputChange(event.id, e.target.value)}
                                                                    className="max-w-md"
                                                                />
                                                                <Button onClick={() => handleSubmit(event.id)} disabled={processing}>
                                                                    {processing ? 'Memproses...' : 'Generate Uniq ID'}
                                                                </Button>
                                                            </div>

                                                            <Table>
                                                                <TableHeader>
                                                                    <TableRow>
                                                                        <TableHead>No</TableHead>
                                                                        <TableHead>Nama Peserta</TableHead>
                                                                        <TableHead>Kegiatan</TableHead>
                                                                        <TableHead>Partisipasi</TableHead>
                                                                        <TableHead>SKKM</TableHead>
                                                                        <TableHead>Uniq ID</TableHead>
                                                                    </TableRow>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {event.sertifikat_events.map((sertifikat, index) => (
                                                                        <TableRow key={sertifikat.id}>
                                                                            <TableCell>{index + 1}</TableCell>
                                                                            <TableCell>{sertifikat.nama_peserta}</TableCell>
                                                                            <TableCell>{sertifikat.kegiatan}</TableCell>
                                                                            <TableCell>{sertifikat.partisipasi}</TableCell>
                                                                            <TableCell>{sertifikat.skkm}</TableCell>
                                                                            <TableCell>{sertifikat.id_uniq_sertif || 'Belum digenerate'}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </>
                                                    ) : (
                                                        <p className="py-4 text-center text-gray-500">Tidak ada data sertifikat untuk event ini</p>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </AppLayout>
    );
}
