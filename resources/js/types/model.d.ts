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
    id: number | null | undefined;
    nama: string;
    logo: string | File;
    deskripsi: string;
    nameUser: string;
    nim: string;
    email: string;
    idJurusan: number;
}

export interface EventType {
    id: string | undefined;
    name: string;
    logo: string;
    description: string;
    date: string;
}
