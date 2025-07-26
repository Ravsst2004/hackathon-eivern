import { Plus, Search } from 'lucide-react';

import { OrmawaForm } from '@/components/ormawa/ormawa-form';
import OrmawaTable from '@/components/ormawa/ormawa-table';
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
import { OrmawaType } from '@/types/model';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Mock data for Ormawa
const initialOrmawa: OrmawaType[] = [
    {
        id: '1',
        nama: 'BEM Universitas',
        logo: '/logos/bem-univ.png',
        deskripsi: 'Badan Eksekutif Mahasiswa tingkat universitas',
    },
    {
        id: '2',
        nama: 'HIMATIK',
        logo: '/logos/himatik.png',
        deskripsi: 'Himpunan Mahasiswa Teknik Informatika',
    },
    {
        id: '3',
        nama: 'HMJ Manajemen',
        logo: '/logos/hmj-manajemen.png',
        deskripsi: 'Himpunan Mahasiswa Jurusan Manajemen',
    },
];

export default function Ormawa() {
    const [ormawaList, setOrmawaList] = useState<OrmawaType[]>(initialOrmawa);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingOrmawa, setEditingOrmawa] = useState<OrmawaType | undefined>();
    const [deletingOrmawa, setDeletingOrmawa] = useState<OrmawaType | undefined>();
    const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

    const filteredOrmawa = ormawaList.filter(
        (ormawa) => ormawa.nama.toLowerCase().includes(searchTerm.toLowerCase()) || ormawa.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleAddOrmawa = () => {
        setFormMode('create');
        setEditingOrmawa(undefined);
        setIsFormOpen(true);
    };

    const handleEditOrmawa = (ormawa: OrmawaType) => {
        setFormMode('edit');
        setEditingOrmawa(ormawa);
        setIsFormOpen(true);
    };

    const handleDeleteOrmawa = (ormawa: OrmawaType) => {
        setDeletingOrmawa(ormawa);
    };

    const confirmDelete = () => {
        if (deletingOrmawa) {
            setOrmawaList(ormawaList.filter((o) => o.id !== deletingOrmawa.id));
            setDeletingOrmawa(undefined);
        }
    };

    const handleFormSubmit = (ormawaData: OrmawaType) => {
        if (formMode === 'create') {
            const newOrmawa = {
                ...ormawaData,
                id: Date.now().toString(),
            };
            setOrmawaList([...ormawaList, newOrmawa]);
        } else if (formMode === 'edit' && editingOrmawa) {
            setOrmawaList(ormawaList.map((o) => (o.id === editingOrmawa.id ? { ...ormawaData, id: editingOrmawa.id } : o)));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Organisasi Mahasiswa" />

            <main className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Organisasi Mahasiswa</h1>
                            <p className="text-muted-foreground">Kelola data organisasi mahasiswa</p>
                        </div>
                        <Button onClick={handleAddOrmawa}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Ormawa
                        </Button>
                    </div>

                    {/* Search Bar */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Organisasi Mahasiswa</CardTitle>
                            <CardDescription>Kelola dan pantau data ormawa</CardDescription>
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
                            <OrmawaTable
                                filteredOrmawa={filteredOrmawa}
                                handleEditOrmawa={handleEditOrmawa}
                                handleDeleteOrmawa={handleDeleteOrmawa}
                                searchTerm={searchTerm}
                            />
                        </CardContent>
                    </Card>

                    {/* Ormawa Form Dialog */}
                    <OrmawaForm
                        ormawa={editingOrmawa}
                        isOpen={isFormOpen}
                        onClose={() => setIsFormOpen(false)}
                        onSubmit={handleFormSubmit}
                        mode={formMode}
                    />

                    {/* Delete Confirmation Dialog */}
                    <AlertDialog open={!!deletingOrmawa} onOpenChange={() => setDeletingOrmawa(undefined)}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Data Ormawa</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Apakah Anda yakin ingin menghapus data ormawa <strong>{deletingOrmawa?.nama}</strong>? Tindakan ini tidak dapat
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
