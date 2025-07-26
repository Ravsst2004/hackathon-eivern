'use client';

import { OrmawaType } from '@/types/model';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface OrmawaTableProps {
    filteredOrmawa: OrmawaType[];
    handleEditOrmawa: (ormawa: OrmawaType) => void;
    handleDeleteOrmawa: (ormawa: OrmawaType) => void;
    searchTerm: string;
}

export default function OrmawaTable({ filteredOrmawa, handleEditOrmawa, handleDeleteOrmawa, searchTerm }: OrmawaTableProps) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Nama Ormawa</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredOrmawa.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="py-8 text-center">
                                {searchTerm ? 'Tidak ada data yang sesuai dengan pencarian' : 'Belum ada data ormawa'}
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredOrmawa.map((ormawa) => (
                            <TableRow key={ormawa.id}>
                                <TableCell className="text-center">
                                    {ormawa.logo && <img src={ormawa.logo} alt={ormawa.nama} className="h-10 w-10 rounded-full object-cover" />}
                                </TableCell>
                                <TableCell className="font-medium">{ormawa.nama}</TableCell>
                                <TableCell className="font-medium">{ormawa.deskripsi}</TableCell>

                                <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleEditOrmawa(ormawa)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteOrmawa(ormawa)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
