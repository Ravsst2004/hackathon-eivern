'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SharedData } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import type React from 'react';
import { useEffect } from 'react';
import InputError from '../input-error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface OrmawaFormProps {
    ormawa?: {
        id: number | undefined | null;
        nama: string;
        logo: string | File;
        deskripsi: string;
        nameUser: string;
        nim: string;
        email: string;
        idJurusan: number;
    };
    jurusan:
        | {
              id: number;
              nama: string;
              deleted_at: string | null;
              created_at: string;
              updated_at: string;
          }[]
        | undefined;
    isOpen: boolean;
    onClose: () => void;
    mode: 'create' | 'edit';
}

export function OrmawaForm({ ormawa, jurusan, isOpen, onClose, mode }: OrmawaFormProps) {
    const { errors: errorsFromEdit } = usePage<SharedData>().props;
    const { data, setData, post, errors } = useForm({
        name: ormawa?.nama || '',
        logo: '',
        deskripsi: ormawa?.deskripsi || '',
        nameUser: ormawa?.nameUser || '',
        nim: ormawa?.nim || '',
        email: ormawa?.email || '',
        idJurusan: ormawa?.idJurusan || '',
    });

    console.log(ormawa);

    console.log('Edit: ', data);

    useEffect(() => {
        if (mode === 'edit') {
            setData({
                name: ormawa?.nama || '',
                logo: '',
                deskripsi: ormawa?.deskripsi || '',
                nameUser: ormawa?.user.name || '',
                nim: ormawa?.user.nim || '',
                email: ormawa?.user.email || '',
                idJurusan: ormawa?.user.id_jurusan || '',
            });
        }
    }, [ormawa]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(data);

        if (mode === 'create') {
            post(route('ormawa.store'), {
                onError: (errors) => {
                    console.log(errors);
                },
                onSuccess: () => {
                    onClose();
                    console.log('SUKSES');
                },
            });
        } else if (mode === 'edit') {
            router.post(
                route('ormawa.update', ormawa.id),
                {
                    _method: 'put',
                    id: ormawa?.id,
                    name: data.name,
                    logo: data.logo ?? null,
                    deskripsi: data.deskripsi,
                    nameUser: data.nameUser,
                    nim: data.nim,
                    email: data.email,
                    idJurusan: data.idJurusan,
                },
                {
                    onSuccess: () => {
                        onClose();
                    },
                    onError: (errors) => {
                        console.log(errors);
                    },
                },
            );
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{mode === 'create' ? 'Tambah Ormawa Baru' : 'Edit Data Ormawa'}</DialogTitle>
                    <DialogDescription>
                        {mode === 'create' ? 'Masukkan data ormawa baru ke dalam sistem.' : 'Ubah data ormawa yang sudah ada.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Informasi Ormawa */}
                        <div className="space-y-4">
                            <h3 className="font-medium">Informasi Ormawa</h3>
                            <div>
                                <Label htmlFor="nama" className="text-right">
                                    Nama Ormawa
                                </Label>
                                <Input
                                    id="nama"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="col-span-3"
                                    placeholder="Masukkan nama ormawa"
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div>
                                <Label htmlFor="logo">Logo</Label>
                                <Input
                                    id="logo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setData('logo', file);
                                        }
                                    }}
                                />
                                <InputError message={errors.logo} />
                            </div>

                            <div>
                                <Label htmlFor="deskripsi" className="text-right">
                                    Deskripsi
                                </Label>
                                <Textarea
                                    id="deskripsi"
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    className="col-span-3"
                                    placeholder="Masukkan deskripsi ormawa"
                                    rows={3}
                                    required
                                />
                                <InputError message={errors.deskripsi} />
                            </div>
                        </div>

                        {/* Informasi Pendaftar */}
                        <div className="space-y-4">
                            <h3 className="font-medium">Informasi Pendaftar</h3>
                            <div>
                                <Label htmlFor="nameUser" className="text-right">
                                    Nama Pendaftar
                                </Label>
                                <Input
                                    id="nameUser"
                                    value={data.nameUser}
                                    onChange={(e) => setData('nameUser', e.target.value)}
                                    className="col-span-3"
                                    placeholder="Masukkan nama pendaftar"
                                    required
                                />
                                <InputError message={errors.nameUser} />
                            </div>
                            <div>
                                <Label htmlFor="nim" className="text-right">
                                    NIM
                                </Label>
                                <Input
                                    id="nim"
                                    value={data.nim}
                                    onChange={(e) => setData('nim', e.target.value)}
                                    className="col-span-3"
                                    placeholder="Masukkan NIM"
                                    required
                                />
                                <InputError message={errors.nim} />
                            </div>
                            <div>
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="col-span-3"
                                    placeholder="Masukkan email"
                                    required
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div>
                                <Label htmlFor="idJurusan" className="text-right">
                                    Jurusan
                                </Label>
                                <Select
                                    value={data.idJurusan ? data.idJurusan.toString() : ''}
                                    onValueChange={(value) => setData('idJurusan', parseInt(value))}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih jurusan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {jurusan?.map((j) => (
                                            <SelectItem key={j.id} value={j.id.toString()}>
                                                {j.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.idJurusan} />
                            </div>
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
