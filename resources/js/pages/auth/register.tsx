// resources/js/pages/Auth/Login.tsx

import AuthLayout from '@/layouts/auth-layout';
import { useForm } from '@inertiajs/react';
import React, { FormEvent, useEffect, useState } from 'react';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nim: '',
        email: '',
        remember: false,
    });

    // State untuk mengontrol apakah form sudah disubmit (dan diganti dengan pesan)
    const [submissionInitiated, setSubmissionInitiated] = useState(false);

    useEffect(() => {
        return () => {
            reset('email');
            // Pastikan state kembali ke false saat komponen di-unmount atau direset
            setSubmissionInitiated(false);
        };
    }, []);

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(event.target.name as 'nim' | 'email', event.target.value);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        // Segera ubah tampilan setelah tombol diklik
        setSubmissionInitiated(true);

        // Lakukan post ke route login
        post(route('login'), {
            onSuccess: () => {
                // Tidak perlu mengubah state backendSuccess di sini lagi
                // karena tombol akan selalu muncul setelah submissionInitiated
            },
            onError: () => {
                // Tampilan tetap pada pesan "menunggu verifikasi" bahkan jika ada error.
                // Anda bisa menambahkan log error untuk debugging, tetapi tidak mengubah UI.
                console.error('Verifikasi email gagal dikirim:', errors);
            },
            onFinish: () => {
                // Logika yang dijalankan setelah permintaan selesai (baik sukses atau gagal)
                // Tidak ada perubahan state UI di sini.
            },
        });
    };

    return (
        <AuthLayout title="Buat Akun Mahasiswa" pageTitle="Register">
            {/* Wrapper untuk menjaga ukuran form agar tidak berubah drastis */}
            <div className="min-h-[280px] pb-4">
                {submissionInitiated ? (
                    // Tampilkan pesan verifikasi setelah submit
                    <div className="text-center">
                        <h2 className="f mb-4 text-xl text-gray-800">Meminta verifikasi akun berhasil, menunggu verifikasi.</h2>
                        {/* Tombol "Kembali ke Landing Page" akan selalu tampil jika submissionInitiated true */}
                        <a
                            href={route('landing-page')} // Pastikan 'landing' adalah nama route landing page Anda
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-lg font-bold tracking-widest text-white ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 focus:border-gray-900 focus:ring focus:outline-none active:bg-gray-900 disabled:opacity-25"
                        >
                            Kembali ke Landing Page
                        </a>
                    </div>
                ) : (
                    // Tampilkan form jika belum disubmit
                    <form onSubmit={submit} className="w-full pb-7">
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
                            className="w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-lg font-medium text-white shadow-sm hover:bg-blue-400 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                            disabled={processing}
                        >
                            Minta Verifikasi Akun
                        </button>
                    </form>
                )}

                {/* Link "Sudah punya akun?" hanya tampil jika form masih terlihat */}
                {!submissionInitiated && (
                    <a href={route('login')} className="mt-4 text-gray-500 hover:text-gray-700">
                        Sudah punya akun?
                    </a>
                )}
            </div>
        </AuthLayout>
    );
}
