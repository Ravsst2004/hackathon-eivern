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

export default function EventTable({ filteredEvents, handleEditEvent, handleDeleteEvent, searchTerm }: EventTableProps) {
    const { auth } = usePage<SharedData>().props;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    console.log(auth);

    const handleUpload = async (eventId: string) => {
        if (!selectedFile) {
            alert('Silakan pilih file terlebih dahulu');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('eventId', eventId);

        setIsUploading(true);
        router.post('/import-excel', formData, {
            onSuccess: (page) => {
                alert('File berhasil diunggah');
                setSelectedFile(null);
            },
            onError: (errors) => {
                console.error('Error uploading file:', errors);
                // alert(errors.message || 'Gagal mengunggah file');
            },
            onFinish: () => {
                setIsUploading(false);
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
                        filteredEvents.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell className="text-center">
                                    {event.logo && <img src={event.logo} alt={event.nama} className="h-10 w-10 rounded-full object-cover" />}
                                </TableCell>
                                <TableCell className="font-medium">{event.nama}</TableCell>
                                <TableCell className="font-medium">{event.deskripsi}</TableCell>
                                <TableCell className="font-medium">{new Date(event.tanggal).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    {auth.user.id_role === 3 ? (
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEditEvent(event)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : filteredEvents[0].sertifikat_events != null ? (
                                        <h1>Sudah diunggah</h1>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} className="max-w-[180px]" />
                                            <Button size="sm" onClick={() => handleUpload(event.id)} disabled={!selectedFile || isUploading}>
                                                <Upload className="mr-2 h-4 w-4" />
                                                {isUploading ? 'Mengunggah...' : 'Unggah'}
                                            </Button>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
