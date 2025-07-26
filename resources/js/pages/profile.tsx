import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import GuestLayout from '@/layouts/guest-layout';
import { Calendar, FileSignature, Mail, MapPin, Phone, User } from 'lucide-react';

export default function Profile({ user, utility, totalSkkm }: any) {
    const maxSkkm = utility?.[0]?.max_skkm || 100;
    const percentage = Math.min((totalSkkm / maxSkkm) * 100, 100).toFixed(0);
    const angkatan = user.nim?.substring(0, 4);

    return (
        <GuestLayout>
            <section className="container mx-auto my-16 space-y-10 px-4">
                {/* Header */}
                <div className="flex flex-col items-center text-center">
                    <div className="relative">
                        <Avatar className="h-28 w-28 shadow-md ring-4 ring-white">
                            <AvatarImage src="/placeholder.svg" alt="Profile" />
                            <AvatarFallback className="text-3xl font-semibold">{user.name?.charAt(0) ?? 'U'}</AvatarFallback>
                        </Avatar>
                        {utility?.[0]?.logo && (
                            <img
                                src={`/storage/${utility[0].logo}`}
                                alt="Logo Universitas"
                                className="absolute -right-2 -bottom-2 h-10 w-10 rounded-full border border-white shadow-md"
                            />
                        )}
                    </div>
                    <h1 className="mt-4 text-2xl font-bold">{user.name}</h1>
                    <p className="text-gray-500">Mahasiswa Aktif</p>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Info Card */}
                    <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-900">
                        <SectionTitle title="Informasi Pribadi" />
                        <InfoRow icon={<Mail className="icon" />} label="Email" value={user.email} />
                        <InfoRow icon={<Phone className="icon" />} label="Telepon" value="Belum tersedia" />
                        <InfoRow icon={<User className="icon" />} label="NIM" value={user.nim} />
                        <InfoRow icon={<Calendar className="icon" />} label="Angkatan" value={angkatan} />
                        <InfoRow icon={<MapPin className="icon" />} label="Alamat" value="Belum tersedia" />
                    </div>

                    {/* SKKM Card */}
                    <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-900">
                        <SectionTitle title="Progress SKKM" />
                        <div className="space-y-2">
                            <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                <div className="h-4 rounded-full bg-blue-500 transition-all duration-300" style={{ width: `${percentage}%` }}></div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {totalSkkm} dari {maxSkkm} SKKM ({percentage}%)
                            </p>
                        </div>
                        <Button className="w-full gap-2 py-6 text-base font-semibold" size="lg">
                            <FileSignature className="h-5 w-5" />
                            Request Paraf Sertifikat
                        </Button>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}

function SectionTitle({ title }: { title: string }) {
    return <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2>;
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className="text-gray-500">{icon}</div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-medium text-gray-800 dark:text-white">{value || 'Belum tersedia'}</p>
            </div>
        </div>
    );
}
