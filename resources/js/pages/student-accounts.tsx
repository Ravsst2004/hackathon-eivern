import { Plus, Search } from 'lucide-react';
import { useState } from 'react';

import { StudentForm } from '@/components/students/student-form';
import StudentTable from '@/components/students/student-table';
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
import { Student } from '@/types/model';
import { Head } from '@inertiajs/react';

// Mock data
const initialStudents: Student[] = [
    {
        id: '1',
        nim: '2021001001',
        nama: 'Ahmad Wijaya',
        email: 'ahmad.wijaya@student.ac.id',
        jurusan: 'Teknik Informatika',
        angkatan: '2021',
        status: 'Aktif',
        alamat: 'Jl. Merdeka No. 123, Jakarta',
    },
    {
        id: '2',
        nim: '2021001002',
        nama: 'Siti Nurhaliza',
        email: 'siti.nurhaliza@student.ac.id',
        jurusan: 'Sistem Informasi',
        angkatan: '2021',
        status: 'Aktif',
        alamat: 'Jl. Sudirman No. 456, Bandung',
    },
    {
        id: '3',
        nim: '2020001003',
        nama: 'Budi Santoso',
        email: 'budi.santoso@student.ac.id',
        jurusan: 'Teknik Elektro',
        angkatan: '2020',
        status: 'Cuti',
        alamat: 'Jl. Gatot Subroto No. 789, Surabaya',
    },
    {
        id: '4',
        nim: '2022001004',
        nama: 'Maya Sari',
        email: 'maya.sari@student.ac.id',
        jurusan: 'Manajemen',
        angkatan: '2022',
        status: 'Aktif',
        alamat: 'Jl. Diponegoro No. 321, Yogyakarta',
    },
    {
        id: '5',
        nim: '2019001005',
        nama: 'Andi Pratama',
        email: 'andi.pratama@student.ac.id',
        jurusan: 'Teknik Informatika',
        angkatan: '2019',
        status: 'Lulus',
        alamat: 'Jl. Ahmad Yani No. 654, Medan',
    },
];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Student Accounts',
        href: '/student-accounts',
    },
];

export default function StudentAccounts() {
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | undefined>();
    const [deletingStudent, setDeletingStudent] = useState<Student | undefined>();
    const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

    const filteredStudents = students.filter(
        (student) =>
            student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.nim.includes(searchTerm) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.jurusan.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleAddStudent = () => {
        setFormMode('create');
        setEditingStudent(undefined);
        setIsFormOpen(true);
    };

    const handleEditStudent = (student: Student) => {
        setFormMode('edit');
        setEditingStudent(student);
        setIsFormOpen(true);
    };

    const handleDeleteStudent = (student: Student) => {
        setDeletingStudent(student);
    };

    const confirmDelete = () => {
        if (deletingStudent) {
            setStudents(students.filter((s) => s.id !== deletingStudent.id));
            setDeletingStudent(undefined);
        }
    };

    const handleFormSubmit = (studentData: Student) => {
        if (formMode === 'create') {
            const newStudent = {
                ...studentData,
                id: Date.now().toString(),
            };
            setStudents([...students, newStudent]);
        } else if (formMode === 'edit' && editingStudent) {
            setStudents(students.map((s) => (s.id === editingStudent.id ? { ...studentData, id: editingStudent.id } : s)));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student Accounts" />

            <main className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Akun Mahasiswa</h1>
                            <p className="text-muted-foreground">Kelola data akun mahasiswa</p>
                        </div>
                        <Button onClick={handleAddStudent}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Mahasiswa
                        </Button>
                    </div>

                    {/* Search and Stats */}
                    {/* <div className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Mahasiswa</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{students.length}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Mahasiswa Aktif</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{students.filter((s) => s.status === 'Aktif').length}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Mahasiswa Cuti</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{students.filter((s) => s.status === 'Cuti').length}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Mahasiswa Lulus</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{students.filter((s) => s.status === 'Lulus').length}</div>
                            </CardContent>
                        </Card>
                    </div> */}

                    {/* Search Bar */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Mahasiswa</CardTitle>
                            <CardDescription>Kelola dan pantau data mahasiswa</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4 flex items-center space-x-2">
                                <Search className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Cari berdasarkan nama, NIM, email, atau jurusan..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="max-w-sm"
                                />
                            </div>

                            {/* Table */}
                            <StudentTable
                                filteredStudents={filteredStudents}
                                handleEditStudent={handleEditStudent}
                                handleDeleteStudent={handleDeleteStudent}
                                searchTerm={searchTerm}
                            />
                        </CardContent>
                    </Card>

                    {/* Student Form Dialog */}
                    <StudentForm
                        student={editingStudent}
                        isOpen={isFormOpen}
                        onClose={() => setIsFormOpen(false)}
                        onSubmit={handleFormSubmit}
                        mode={formMode}
                    />

                    {/* Delete Confirmation Dialog */}
                    <AlertDialog open={!!deletingStudent} onOpenChange={() => setDeletingStudent(undefined)}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Data Mahasiswa</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Apakah Anda yakin ingin menghapus data mahasiswa <strong>{deletingStudent?.nama}</strong>? Tindakan ini tidak
                                    dapat dibatalkan.
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
