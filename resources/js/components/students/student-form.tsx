'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { Textarea } from '../ui/textarea';

interface Student {
    id?: string;
    nim: string;
    nama: string;
    email: string;
    jurusan: string;
    angkatan: string;
    status: string;
    alamat: string;
}

interface StudentFormProps {
    student?: Student;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (student: Student) => void;
    mode: 'create' | 'edit';
}

export function StudentForm({ student, isOpen, onClose, onSubmit, mode }: StudentFormProps) {
    const [formData, setFormData] = useState<Student>({
        nim: student?.nim || '',
        nama: student?.nama || '',
        email: student?.email || '',
        jurusan: student?.jurusan || '',
        angkatan: student?.angkatan || '',
        status: student?.status || 'Aktif',
        alamat: student?.alamat || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...formData, id: student?.id });
        onClose();
        // Reset form
        setFormData({
            nim: '',
            nama: '',
            email: '',
            jurusan: '',
            angkatan: '',
            status: 'Aktif',
            alamat: '',
        });
    };

    const handleChange = (field: keyof Student, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{mode === 'create' ? 'Tambah Mahasiswa Baru' : 'Edit Data Mahasiswa'}</DialogTitle>
                    <DialogDescription>
                        {mode === 'create' ? 'Masukkan data mahasiswa baru ke dalam sistem.' : 'Ubah data mahasiswa yang sudah ada.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nim" className="text-right">
                                NIM
                            </Label>
                            <Input
                                id="nim"
                                value={formData.nim}
                                onChange={(e) => handleChange('nim', e.target.value)}
                                className="col-span-3"
                                placeholder="Masukkan NIM"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nama" className="text-right">
                                Nama
                            </Label>
                            <Input
                                id="nama"
                                value={formData.nama}
                                onChange={(e) => handleChange('nama', e.target.value)}
                                className="col-span-3"
                                placeholder="Masukkan nama lengkap"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="col-span-3"
                                placeholder="Masukkan email"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="jurusan" className="text-right">
                                Jurusan
                            </Label>
                            <Select value={formData.jurusan} onValueChange={(value) => handleChange('jurusan', value)}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Pilih jurusan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Teknik Informatika">Teknik Informatika</SelectItem>
                                    <SelectItem value="Sistem Informasi">Sistem Informasi</SelectItem>
                                    <SelectItem value="Teknik Elektro">Teknik Elektro</SelectItem>
                                    <SelectItem value="Teknik Mesin">Teknik Mesin</SelectItem>
                                    <SelectItem value="Teknik Sipil">Teknik Sipil</SelectItem>
                                    <SelectItem value="Manajemen">Manajemen</SelectItem>
                                    <SelectItem value="Akuntansi">Akuntansi</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="angkatan" className="text-right">
                                Angkatan
                            </Label>
                            <Select value={formData.angkatan} onValueChange={(value) => handleChange('angkatan', value)}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Pilih angkatan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2020">2020</SelectItem>
                                    <SelectItem value="2021">2021</SelectItem>
                                    <SelectItem value="2022">2022</SelectItem>
                                    <SelectItem value="2023">2023</SelectItem>
                                    <SelectItem value="2024">2024</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Aktif">Aktif</SelectItem>
                                    <SelectItem value="Cuti">Cuti</SelectItem>
                                    <SelectItem value="Lulus">Lulus</SelectItem>
                                    <SelectItem value="Drop Out">Drop Out</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="alamat" className="text-right">
                                Alamat
                            </Label>
                            <Textarea
                                id="alamat"
                                value={formData.alamat}
                                onChange={(e) => handleChange('alamat', e.target.value)}
                                className="col-span-3"
                                placeholder="Masukkan alamat lengkap"
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Batal
                        </Button>
                        <Button type="submit">{mode === 'create' ? 'Tambah' : 'Simpan'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
