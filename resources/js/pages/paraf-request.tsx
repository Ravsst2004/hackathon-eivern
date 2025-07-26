import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Request paraf',
        href: '/request-paraf',
    },
];

export default function ParafRequest({ sertifikat }) {
    const { auth } = usePage<SharedData>().props;

    const handleApprove = async (sertifId: string, typeParaf: 'BEM' | 'KEMAHASISWAAN') => {
        try {
            router.post('/approve-paraf', {
                _method: 'patch',
                sertifId,
                typeParaf,
            });

            toast.success(`Sertifikat berhasil di approve`);
            window.location.reload();
        } catch (error) {
            toast.error('Gagal menyetujui sertifikat');
            console.error(error);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <main className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
                {' '}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Kegiatan</TableHead>
                                <TableHead>Nama Peserta</TableHead>
                                <TableHead>Tingkat</TableHead>
                                <TableHead>Partisipasi</TableHead>
                                <TableHead>SKKM</TableHead>
                                <TableHead>ID Sertifikat</TableHead>
                                <TableHead>Paraf BEM</TableHead>
                                <TableHead>Paraf Kemahasiswaan</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sertifikat.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.kegiatan}</TableCell>
                                    <TableCell>{item.nama_peserta}</TableCell>
                                    <TableCell>{item.tingkat}</TableCell>
                                    <TableCell>{item.partisipasi}</TableCell>
                                    <TableCell>{item.skkm}</TableCell>
                                    <TableCell>{item.id_uniq_sertif}</TableCell>
                                    <TableCell>{item.paraf_bem}</TableCell>
                                    <TableCell>{item.paraf_kemahasiswaan}</TableCell>
                                    <TableCell className="space-x-2">
                                        {auth.user.id_role === 3 && item.paraf_bem === 'REQUEST' && (
                                            <Button size="sm" onClick={() => handleApprove(item.id_uniq_sertif, 'BEM')}>
                                                Approve BEM
                                            </Button>
                                        )}
                                        {auth.user.id_role === 2 && item.paraf_kemahasiswaan === 'REQUEST' && (
                                            <Button size="sm" onClick={() => handleApprove(item.id_uniq_sertif, 'KEMAHASISWAAN')}>
                                                Approve Kemahasiswaan
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </AppLayout>
    );
}
