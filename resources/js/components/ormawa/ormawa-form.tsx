'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OrmawaType } from '@/types/model';
import type React from 'react';
import { useState } from 'react';
import { Textarea } from '../ui/textarea';

interface OrmawaFormProps {
    ormawa?: OrmawaType;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (ormawa: OrmawaType) => void;
    mode: 'create' | 'edit';
}

export function OrmawaForm({ ormawa, isOpen, onClose, onSubmit, mode }: OrmawaFormProps) {
    const [formData, setFormData] = useState<OrmawaType>({
        id: ormawa?.id || '',
        nama: ormawa?.nama || '',
        logo: ormawa?.logo || '',
        deskripsi: ormawa?.deskripsi || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...formData, id: ormawa?.id });
        onClose();
        // Reset form
        setFormData({
            id: '',
            nama: '',
            logo: '',
            deskripsi: '',
        });
    };

    const handleChange = (field: keyof OrmawaType, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nama" className="text-right">
                                Nama Ormawa
                            </Label>
                            <Input
                                id="nama"
                                value={formData.nama}
                                onChange={(e) => handleChange('nama', e.target.value)}
                                className="col-span-3"
                                placeholder="Masukkan nama ormawa"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="logo" className="text-right">
                                URL Logo
                            </Label>
                            <Input
                                id="logo"
                                value={formData.logo}
                                onChange={(e) => handleChange('logo', e.target.value)}
                                className="col-span-3"
                                placeholder="Masukkan URL logo"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="deskripsi" className="text-right">
                                Deskripsi
                            </Label>
                            <Textarea
                                id="deskripsi"
                                value={formData.deskripsi}
                                onChange={(e) => handleChange('deskripsi', e.target.value)}
                                className="col-span-3"
                                placeholder="Masukkan deskripsi ormawa"
                                rows={3}
                                required
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
