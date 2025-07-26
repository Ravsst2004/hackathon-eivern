import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GuestLayout from '@/layouts/guest-layout';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Calendar, FileSignature, Mail, MapPin, Phone, User } from 'lucide-react';

export default function Profile() {
    const { auth } = usePage<SharedData>().props;
    console.log(auth.user);

    return (
        <GuestLayout>
            <section className="container mx-auto my-16 px-4 py-8 text-center">
                <Card className="w-full shadow-lg">
                    <CardHeader className="items-center pb-6">
                        <div className="mb-4">
                            <Avatar className="h-28 w-28 border-4 border-white shadow-md">
                                <AvatarImage src="/placeholder.svg" alt="Profile" />
                                <AvatarFallback className="text-3xl font-medium">JD</AvatarFallback>
                            </Avatar>
                        </div>
                        <CardTitle className="text-2xl font-bold">John Doe</CardTitle>
                        <p className="text-sm text-gray-500">Mahasiswa Teknik Informatika</p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Profile Information */}
                        <div className="space-y-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                            <div className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">john.doe@company.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Telepon</p>
                                    <p className="font-medium">+62 812-3456-7890</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <User className="h-5 w-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">NIM</p>
                                    <p className="font-medium">123456789</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Calendar className="h-5 w-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Angkatan</p>
                                    <p className="font-medium">2022</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Alamat</p>
                                    <p className="font-medium">Jl. Contoh No. 123, Kota</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            <Button className="w-full gap-2 py-6 text-base font-semibold" size="lg">
                                <FileSignature className="h-5 w-5" />
                                Request Paraf Sertifikat
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </GuestLayout>
    );
}
