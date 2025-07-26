export interface StudentType {
    id: string | undefined;
    nim: string;
    nama: string;
    email: string;
    jurusan: string;
    angkatan: string;
    status: string;
    alamat: string;
}

export interface OrmawaType {
    id: string | undefined;
    nama: string;
    logo: string;
    deskripsi: string;
}

export interface EventType {
    id: string | undefined;
    name: string;
    logo: string;
    description: string;
    date: string;
}
