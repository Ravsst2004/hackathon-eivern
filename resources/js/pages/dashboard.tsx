import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const requestData = {
    paraf: {
        total: 156,
        pending: 23,
        approved: 120,
        rejected: 13,
        trend: '+12%',
    },
    pembuatanAkun: {
        total: 89,
        pending: 15,
        approved: 68,
        rejected: 6,
        trend: '+8%',
    },
    idUnik: {
        total: 234,
        pending: 5,
        generated: 229,
        failed: 0,
        trend: '+15%',
    },
};

const recentRequests = [
    {
        id: 'REQ-001',
        type: 'Paraf',
        user: 'Ahmad Wijaya',
        status: 'Pending',
        time: '2 jam yang lalu',
    },
    {
        id: 'REQ-002',
        type: 'Pembuatan Akun',
        user: 'Siti Nurhaliza',
        status: 'Approved',
        time: '3 jam yang lalu',
    },
    {
        id: 'REQ-003',
        type: 'ID Unik',
        user: 'Budi Santoso',
        status: 'Generated',
        time: '5 jam yang lalu',
    },
    {
        id: 'REQ-004',
        type: 'Paraf',
        user: 'Maya Sari',
        status: 'Approved',
        time: '1 hari yang lalu',
    },
];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <h1 className="text-center">Selamat Datang DI Dashboard</h1>
        </AppLayout>
    );
}
