import { SharedData } from '@/types';
import { EventType } from '@/types/model';
import { router, usePage } from '@inertiajs/react';
import { Edit, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface EventTableProps {
    filteredEvents: any;
    handleEditEvent: (event: EventType) => void;
    handleDeleteEvent: (event: EventType) => void;
    searchTerm: string;
}

interface UploadState {
    file: File | null;
    isUploading: boolean;
    eventId: string | null;
}

export default function EventTable({ filteredEvents, handleEditEvent, handleDeleteEvent, searchTerm }: EventTableProps) {
    const { auth } = usePage<SharedData>().props;
    const [uploadStates, setUploadStates] = useState<Record<string, UploadState>>({});

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, eventId: string) => {
        if (event.target.files && event.target.files.length > 0) {
            setUploadStates((prev) => ({
                ...prev,
                [eventId]: {
                    ...prev[eventId],
                    file: event.target.files![0],
                    eventId,
                },
            }));
        }
    };

    const handleUpload = async (eventId: string) => {
        const uploadState = uploadStates[eventId];
        if (!uploadState?.file) {
            alert('Silakan pilih file terlebih dahulu');
            return;
        }

        const formData = new FormData();
        formData.append('file', uploadState.file);
        formData.append('eventId', eventId);

        setUploadStates((prev) => ({
            ...prev,
            [eventId]: {
                ...prev[eventId],
                isUploading: true,
            },
        }));

        router.post('/import-excel', formData, {
            onSuccess: () => {
                alert('File berhasil diunggah');
                setUploadStates((prev) => ({
                    ...prev,
                    [eventId]: {
                        file: null,
                        isUploading: false,
                        eventId: null,
                    },
                }));
            },
            onError: (errors) => {
                console.error('Error uploading file:', errors);
                setUploadStates((prev) => ({
                    ...prev,
                    [eventId]: {
                        ...prev[eventId],
                        isUploading: false,
                    },
                }));
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Nama Event</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredEvents.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="py-8 text-center">
                                {searchTerm ? 'Tidak ada data yang sesuai dengan pencarian' : 'Belum ada data event'}
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredEvents.map((event) => {
                            const currentUploadState = uploadStates[event.id] || { file: null, isUploading: false };
                            const hasSertifikat = event.sertifikat_events?.length > 0;

                            return (
                                <TableRow key={event.id}>
                                    <TableCell className="text-center">
                                        {event.logo && <img src={event.logo} alt={event.nama} className="h-10 w-10 rounded-full object-cover" />}
                                    </TableCell>
                                    <TableCell className="font-medium">{event.nama}</TableCell>
                                    <TableCell className="font-medium">{event.deskripsi}</TableCell>
                                    <TableCell className="font-medium">{new Date(event.tanggal).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        {auth.user.id_role != 4 ? (
                                            <div className="flex justify-end space-x-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleEditEvent(event)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ) : hasSertifikat ? (
                                            <h1>Sudah diunggah</h1>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="file"
                                                    accept=".xlsx,.xls,.csv"
                                                    onChange={(e) => handleFileChange(e, event.id)}
                                                    className="max-w-[180px]"
                                                />
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleUpload(event.id)}
                                                    disabled={!currentUploadState.file || currentUploadState.isUploading}
                                                >
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    {currentUploadState.isUploading ? 'Mengunggah...' : 'Unggah'}
                                                </Button>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
