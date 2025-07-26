import { EventType } from '@/types/model';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface EventTableProps {
    filteredEvents: any; // fuct u type
    handleEditEvent: (event: EventType) => void;
    handleDeleteEvent: (event: EventType) => void;
    searchTerm: string;
}

export default function EventTable({ filteredEvents, handleEditEvent, handleDeleteEvent, searchTerm }: EventTableProps) {
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
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleEditEvent(event)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
