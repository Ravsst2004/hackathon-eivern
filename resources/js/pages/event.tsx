import { Plus, Search } from 'lucide-react';

import { EventForm } from '@/components/events/event-form';
import EventTable from '@/components/events/event-table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { EventType } from '@/types/model';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Mock data for Event
const initialEvents: EventType[] = [
    {
        id: '1',
        name: 'Tech Conference 2023',
        logo: '/logos/tech-conf.png',
        description: 'Annual technology conference for developers',
        date: '2023-11-15',
    },
    {
        id: '2',
        name: 'Campus Festival',
        logo: '/logos/campus-fest.png',
        description: 'Yearly university cultural festival',
        date: '2023-12-20',
    },
    {
        id: '3',
        name: 'Startup Pitch Competition',
        logo: '/logos/startup-pitch.png',
        description: 'Competition for student startups',
        date: '2024-02-10',
    },
];

export default function Event() {
    const [eventList, setEventList] = useState<EventType[]>(initialEvents);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<EventType | undefined>();
    const [deletingEvent, setDeletingEvent] = useState<EventType | undefined>();
    const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

    const filteredEvents = eventList.filter(
        (event) => event.name.toLowerCase().includes(searchTerm.toLowerCase()) || event.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleAddEvent = () => {
        setFormMode('create');
        setEditingEvent(undefined);
        setIsFormOpen(true);
    };

    const handleEditEvent = (event: EventType) => {
        setFormMode('edit');
        setEditingEvent(event);
        setIsFormOpen(true);
    };

    const handleDeleteEvent = (event: EventType) => {
        setDeletingEvent(event);
    };

    const confirmDelete = () => {
        if (deletingEvent) {
            setEventList(eventList.filter((e) => e.id !== deletingEvent.id));
            setDeletingEvent(undefined);
        }
    };

    const handleFormSubmit = (eventData: EventType) => {
        if (formMode === 'create') {
            const newEvent = {
                ...eventData,
                id: Date.now().toString(),
            };
            setEventList([...eventList, newEvent]);
        } else if (formMode === 'edit' && editingEvent) {
            setEventList(eventList.map((e) => (e.id === editingEvent.id ? { ...eventData, id: editingEvent.id } : e)));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Event Management" />

            <main className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Event Management</h1>
                            <p className="text-muted-foreground">Kelola data event kampus</p>
                        </div>
                        <Button onClick={handleAddEvent}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Event
                        </Button>
                    </div>

                    {/* Search Bar */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Event</CardTitle>
                            <CardDescription>Kelola dan pantau data event kampus</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4 flex items-center space-x-2">
                                <Search className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Cari berdasarkan nama atau deskripsi..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="max-w-sm"
                                />
                            </div>

                            {/* Table */}
                            <EventTable
                                filteredEvents={filteredEvents}
                                handleEditEvent={handleEditEvent}
                                handleDeleteEvent={handleDeleteEvent}
                                searchTerm={searchTerm}
                            />
                        </CardContent>
                    </Card>

                    {/* Event Form Dialog */}
                    <EventForm
                        event={editingEvent}
                        isOpen={isFormOpen}
                        onClose={() => setIsFormOpen(false)}
                        onSubmit={handleFormSubmit}
                        mode={formMode}
                    />

                    {/* Delete Confirmation Dialog */}
                    <AlertDialog open={!!deletingEvent} onOpenChange={() => setDeletingEvent(undefined)}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Data Event</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Apakah Anda yakin ingin menghapus data event <strong>{deletingEvent?.name}</strong>? Tindakan ini tidak dapat
                                    dibatalkan.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={confirmDelete}>Hapus</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </main>
        </AppLayout>
    );
}
