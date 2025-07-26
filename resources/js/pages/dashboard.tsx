import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FileText, Plus, TrendingUp, Users } from 'lucide-react';

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

            <main className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
                {/* Stats Cards */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Request Paraf Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Request Paraf</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{requestData.paraf.total}</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">{requestData.paraf.trend}</span> dari bulan lalu
                            </p>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Pending</span>
                                    <span className="text-yellow-600">{requestData.paraf.pending}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Approved</span>
                                    <span className="text-green-600">{requestData.paraf.approved}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Rejected</span>
                                    <span className="text-red-600">{requestData.paraf.rejected}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Request Pembuatan Akun Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Request Pembuatan Akun</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{requestData.pembuatanAkun.total}</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">{requestData.pembuatanAkun.trend}</span> dari bulan lalu
                            </p>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Pending</span>
                                    <span className="text-yellow-600">{requestData.pembuatanAkun.pending}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Approved</span>
                                    <span className="text-green-600">{requestData.pembuatanAkun.approved}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Rejected</span>
                                    <span className="text-red-600">{requestData.pembuatanAkun.rejected}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Request ID Unik Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Request ID Unik</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{requestData.idUnik.total}</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">{requestData.idUnik.trend}</span> dari bulan lalu
                            </p>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Pending</span>
                                    <span className="text-yellow-600">{requestData.idUnik.pending}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Generated</span>
                                    <span className="text-green-600">{requestData.idUnik.generated}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Failed</span>
                                    <span className="text-red-600">{requestData.idUnik.failed}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Progress Overview */}
                <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Status Overview</CardTitle>
                            <CardDescription>Persentase status untuk semua request</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="mb-1 flex justify-between text-sm">
                                    <span>Request Paraf</span>
                                    <span>{Math.round((requestData.paraf.approved / requestData.paraf.total) * 100)}% Approved</span>
                                </div>
                                <Progress value={(requestData.paraf.approved / requestData.paraf.total) * 100} className="h-2" />
                            </div>
                            <div>
                                <div className="mb-1 flex justify-between text-sm">
                                    <span>Request Pembuatan Akun</span>
                                    <span>{Math.round((requestData.pembuatanAkun.approved / requestData.pembuatanAkun.total) * 100)}% Approved</span>
                                </div>
                                <Progress value={(requestData.pembuatanAkun.approved / requestData.pembuatanAkun.total) * 100} className="h-2" />
                            </div>
                            <div>
                                <div className="mb-1 flex justify-between text-sm">
                                    <span>Request ID Unik</span>
                                    <span>{Math.round((requestData.idUnik.generated / requestData.idUnik.total) * 100)}% Generated</span>
                                </div>
                                <Progress value={(requestData.idUnik.generated / requestData.idUnik.total) * 100} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Aksi cepat untuk mengelola request</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full justify-start bg-transparent" variant="outline">
                                <Plus className="mr-2 h-4 w-4" />
                                Buat Request Baru
                            </Button>
                            <Button className="w-full justify-start bg-transparent" variant="outline">
                                <FileText className="mr-2 h-4 w-4" />
                                Review Pending Requests
                            </Button>
                            <Button className="w-full justify-start bg-transparent" variant="outline">
                                <Users className="mr-2 h-4 w-4" />
                                Kelola User Accounts
                            </Button>
                            <Button className="w-full justify-start bg-transparent" variant="outline">
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Generate Report
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Requests Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Request Terbaru</CardTitle>
                        <CardDescription>Daftar request yang baru masuk</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-3 text-left font-medium">ID Request</th>
                                        <th className="px-4 py-3 text-left font-medium">Jenis</th>
                                        <th className="px-4 py-3 text-left font-medium">User</th>
                                        <th className="px-4 py-3 text-left font-medium">Status</th>
                                        <th className="px-4 py-3 text-left font-medium">Waktu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentRequests.map((request) => (
                                        <tr key={request.id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-3 font-mono text-sm">{request.id}</td>
                                            <td className="px-4 py-3">{request.type}</td>
                                            <td className="px-4 py-3">{request.user}</td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                        request.status === 'Pending'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : request.status === 'Approved' || request.status === 'Generated'
                                                              ? 'bg-green-100 text-green-800'
                                                              : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{request.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Button variant="outline">Lihat Semua Request</Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </AppLayout>
    );
}
