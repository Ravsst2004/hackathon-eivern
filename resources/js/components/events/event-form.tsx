import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EventType } from '@/types/model';
import type React from 'react';
import { useState } from 'react';
import { Textarea } from '../ui/textarea';

interface EventFormProps {
    event?: EventType;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (event: EventType) => void;
    mode: 'create' | 'edit';
}

export function EventForm({ event, isOpen, onClose, onSubmit, mode }: EventFormProps) {
    const [formData, setFormData] = useState<EventType>({
        id: event?.id || '',
        name: event?.name || '',
        logo: event?.logo || '',
        description: event?.description || '',
        date: event?.date || new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...formData, id: event?.id });
        onClose();
        // Reset form
        setFormData({
            id: '',
            name: '',
            logo: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
        });
    };

    const handleChange = (field: keyof EventType, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nama Event
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="col-span-3"
                                placeholder="Masukkan nama event"
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
                            <Label htmlFor="date" className="text-right">
                                Tanggal
                            </Label>
                            <Input
                                id="date"
                                type="date"
                                value={formData.date}
                                onChange={(e) => handleChange('date', e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Deskripsi
                            </Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                className="col-span-3"
                                placeholder="Masukkan deskripsi event"
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
