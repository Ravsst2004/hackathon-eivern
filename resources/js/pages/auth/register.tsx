// resources/js/pages/Auth/Login.tsx

import AuthLayout from '@/layouts/auth-layout';
import { useForm } from '@inertiajs/react';
import React, { FormEvent, useEffect, useState } from 'react'; // Import useState

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nim: '',
        email: '',
        remember: false,
    });

    // State baru untuk mengontrol tampilan form atau pesan sukses
    const [verificationSent, setVerificationSent] = useState(false);

    useEffect(() => {
        return () => {
            reset('email');
            // Pastikan state kembali ke false saat komponen di-unmount atau direset
            setVerificationSent(false);
        };
    }, []);

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(event.target.name as 'nim' | 'email', event.target.value);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        // Mengubah state menjadi true untuk menampilkan pesan sukses dan menyembunyikan form
        // Ini akan dilakukan langsung setelah tombol diklik, terlepas dari hasil backend
        setVerificationSent(true);

        // Lakukan post ke route login
        post(route('login'), {
            // Kita tidak perlu melakukan apapun di onSuccess, karena tampilan sudah berubah
            onSuccess: () => {
                // Anda bisa menambahkan logika tambahan di sini jika diperlukan setelah sukses,
                // misalnya menampilkan notifikasi sukses spesifik jika ada dari backend.
            },
            // Hapus atau kosongkan onError jika Anda tidak ingin kembali ke form pada error
            onError: () => {
                // Saat ini, jika ada error, tampilan akan tetap pada pesan "Menunggu verifikasi..."
                // Jika Anda ingin menampilkan pesan error di dalam tampilan ini, Anda perlu state tambahan
                // untuk pesan error dan menampilkannya di bawah h2.
                console.error('Verifikasi email gagal dikirim:', errors);
                // setVerificationSent(false); // <--- Baris ini dihapus/dinonaktifkan
            },
            // onFinish juga tidak perlu mengubah state verificationSent lagi
            onFinish: () => {
                // Logika yang dijalankan setelah permintaan selesai (baik sukses atau gagal)
                // Jika Anda hanya ingin tampilan berubah satu arah (dari form ke pesan),
                // maka tidak perlu ada setVerificationSent(false) di sini.
            },
        });
    };

    return (
        <AuthLayout title="Buat Akun Mahasiswa" pageTitle="Register">
            {/* Wrapper untuk menjaga ukuran form agar tidak berubah drastis */}
            <div className="flex min-h-[280px] flex-col items-center justify-center pb-4">
                {verificationSent ? (
                    // Tampilkan pesan sukses jika verifikasi telah diminta
                    <h2 className="text-center text-xl font-semibold text-gray-800">Meminta verifikasi akun berhasil, menunggu verifikasi.</h2>
                ) : (
                    // Tampilkan form jika verifikasi belum diminta
                    <form onSubmit={submit} className="w-full pb-7">
                        {/* Tambahkan w-full agar form mengisi container */}
                        {/* Input NIM */}
                        <div className="mb-8">
                            <label htmlFor="nim" className="mb-3 block text-[18px] font-bold text-gray-700">
                                NIM
                            </label>
                            <input
                                type="text"
                                name="nim"
                                id="nim"
                                value={data.nim}
                                className="focus:ring-opacity-50 border-gray-00 mt-1 block h-11 w-full rounded-md border-[1px] border-gray-300 pl-3 text-[18px] text-black shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                                autoComplete="username"
                                onChange={onHandleChange}
                                required
                                autoFocus
                            />
                            {errors.nim && <div className="mt-3 text-sm text-red-500">{errors.nim}</div>}
                        </div>
                        {/* Input Email */}
                        <div className="mb-6">
                            <label htmlFor="email" className="mb-3 block text-[18px] font-bold text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={data.email}
                                className="focus:ring-opacity-50 focus:ring-ring-indigo-200 mt-1 block h-11 w-full rounded-md border-[1px] border-gray-300 pr-4 pl-3 text-[18px] text-black shadow-md focus:border-indigo-300 focus:ring"
                                autoComplete="email"
                                onChange={onHandleChange}
                                required
                            />
                            {errors.email && <div className="mt-1 text-sm text-red-500">{errors.email}</div>}
                        </div>
                        {/* Tombol Minta Verifikasi Akun */}
                        <button
                            type="submit"
                            className="w-full rounded-md border border-transparent bg-gray-800 px-4 py-2 text-lg font-medium text-white shadow-sm hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                            disabled={processing}
                        >
                            Minta Verifikasi Akun
                        </button>
                    </form>
                )}

                {/* Link "Sudah punya akun?" tetap ada di luar conditional rendering form */}
                {!verificationSent && ( // Hanya tampilkan jika form masih terlihat
                    <a href={route('register')} className="mt-4 text-gray-500 hover:text-gray-700">
                        Sudah punya akun?
                    </a>
                )}
            </div>
        </AuthLayout>
    );
}
