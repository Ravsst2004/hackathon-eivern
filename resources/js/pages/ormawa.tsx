import { Plus } from 'lucide-react';

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
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { OrmawaType } from '@/types/model';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface OrmawaData {
    id: number;
    nama: string;
    logo: string;
    deskripsi: string;
    user_id: string;
    deleted_at: string | null;
    created_at: string | null;
    updated_at: string | null;
    user: {
        nim: string;
        name: string;
        email: string;
        id_jurusan: number;
        id_role: number;
        deleted_at: string | null;
        created_at: string;
        updated_at: string;
    };
}

interface OrmawaProps {
    ormawa: {
        data: OrmawaData[];
        next_page_url: string;
        prev_page_url: string;
        current_page: number;
    };
    jurusan: {
        id: number;
        nama: string;
        deleted_at: string | null;
        created_at: string;
        updated_at: string;
    }[];
}

export default function Ormawa({ ormawa, jurusan }: OrmawaProps) {
    console.log(ormawa);

    const [ormawaList, setOrmawaList] = useState<OrmawaType[]>(ormawa.data);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingOrmawa, setEditingOrmawa] = useState<OrmawaType | undefined>();
    const [deletingOrmawa, setDeletingOrmawa] = useState<OrmawaType | undefined>();
    const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

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
        console.log(editingOrmawa);
    };

    const confirmDelete = () => {
        if (deletingOrmawa) {
            router.delete(route('ormawa.destroy', deletingOrmawa.id), {
                onError: () => {
                    console.log('error');
                },
            });
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
                            {/* Table */}
                            <OrmawaTable
                                filteredOrmawa={ormawa.data}
                                handleEditOrmawa={handleEditOrmawa}
                                handleDeleteOrmawa={handleDeleteOrmawa}
                                searchTerm={searchTerm}
                            />
                            <Pagination className="mt-4">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href={ormawa.prev_page_url} />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">{ormawa.current_page}</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href={ormawa.next_page_url} />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </CardContent>
                    </Card>

                    {/* Ormawa Form Dialog */}
                    <OrmawaForm ormawa={editingOrmawa} jurusan={jurusan} isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} mode={formMode} />

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
