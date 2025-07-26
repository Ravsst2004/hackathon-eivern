import { Student } from '@/types/model';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface StudentTableProps {
    filteredStudents: Student[];
    handleEditStudent: (student: Student) => void;
    handleDeleteStudent: (student: Student) => void;
    searchTerm: string;
}

export default function StudentTable({ filteredStudents, handleEditStudent, handleDeleteStudent, searchTerm }: StudentTableProps) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>NIM</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Jurusan</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredStudents.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="py-8 text-center">
                                {searchTerm ? 'Tidak ada data yang sesuai dengan pencarian' : 'Belum ada data mahasiswa'}
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredStudents.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell className="font-mono">{student.nim}</TableCell>
                                <TableCell className="font-medium">{student.nama}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{student.jurusan}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleEditStudent(student)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteStudent(student)}>
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
