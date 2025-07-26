'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { router, useForm } from '@inertiajs/react';
import type React from 'react';
import { useEffect } from 'react';
import InputError from '../input-error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface EventFormProps {
    event?: {
        id: number | undefined | null;
        nama: string;
        logo: string | File;
        deskripsi: string;
        tanggal: string;
        ormawa: number;
    };
    ormawaList: {
        id: number;
        nama: string;
    }[];
    isOpen: boolean;
    onClose: () => void;
    mode: 'create' | 'edit';
}

export function EventForm({ event, ormawaList, isOpen, onClose, mode }: EventFormProps) {
    const { data, setData, post, errors, reset } = useForm({
        nama: event?.nama || '',
        logo: '',
        deskripsi: event?.deskripsi || '',
        tanggal: event?.tanggal || new Date().toISOString().split('T')[0],
        ormawa: event?.ormawa_id || '',
    });

    useEffect(() => {
        if (mode === 'edit' && event) {
            setData({
                nama: event.nama,
                logo: '',
                deskripsi: event.deskripsi,
                tanggal: event.tanggal,
                ormawa: event.ormawa_id,
            });
        }
    }, [event, mode]);

    console.log('Edit: ', event);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === 'create') {
            post(route('events.store'), {
                onError: (errors) => {
                    console.log(errors);
                },
                onSuccess: () => {
                    onClose();
                    reset();
                },
                onFinish: () => {
                    console.log(data);
                },
                forceFormData: true,
            });
        } else if (mode === 'edit' && event?.id) {
            router.post(
                route('events.update', event.id),
                {
                    _method: 'put',
                    nama: data.nama,
                    logo: data.logo ?? null,
                    deskripsi: data.deskripsi,
                    tanggal: data.tanggal,
                    ormawa: data.ormawa,
                },
                {
                    onSuccess: () => {
                        onClose();
                        reset();
                    },
                    onError: (errors) => {
                        console.log(errors);
                    },
                    forceFormData: true,
                },
            );
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{mode === 'create' ? 'Tambah Event Baru' : 'Edit Data Event'}</DialogTitle>
                    <DialogDescription>
                        {mode === 'create' ? 'Masukkan data event baru ke dalam sistem.' : 'Ubah data event yang sudah ada.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Informasi Event */}
                        <div className="space-y-4">
                            <h3 className="font-medium">Informasi Event</h3>
                            <div>
                                <Label htmlFor="nama">Nama Event</Label>
                                <Input
                                    id="nama"
                                    value={data.nama}
                                    onChange={(e) => setData('nama', e.target.value)}
                                    placeholder="Masukkan nama event"
                                    required
                                />
                                <InputError message={errors.nama} />
                            </div>
                            <div>
                                <Label htmlFor="logo">Logo</Label>
                                <Input
                                    id="logo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        setData('logo', file || '');
                                    }}
                                    required={mode === 'create'}
                                />
                                <InputError message={errors.logo} />
                            </div>
                            <div>
                                <Label htmlFor="tanggal">Tanggal</Label>
                                <Input id="tanggal" type="date" value={data.tanggal} onChange={(e) => setData('tanggal', e.target.value)} required />
                                <InputError message={errors.tanggal} />
                            </div>
                            <div>
                                <Label htmlFor="deskripsi">Deskripsi</Label>
                                <Textarea
                                    id="deskripsi"
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    placeholder="Masukkan deskripsi event"
                                    rows={3}
                                    required
                                />
                                <InputError message={errors.deskripsi} />
                            </div>
                            <div>
                                <Label htmlFor="ormawa">Organisasi Mahasiswa</Label>
                                <Select value={data.ormawa.toString()} onValueChange={(value) => setData('ormawa', parseInt(value))} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Organisasi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ormawaList.map((ormawa) => (
                                            <SelectItem key={ormawa.id} value={ormawa.id.toString()}>
                                                {ormawa.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.ormawa} />
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
