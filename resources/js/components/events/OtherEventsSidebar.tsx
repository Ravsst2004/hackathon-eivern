import { Link } from '@inertiajs/react';

// Tipe data untuk event, bisa diimpor dari file terpisah jika digunakan di banyak tempat
interface Event {
    id: number;
    title: string;
    // tambahkan properti lain jika perlu
}

interface SidebarProps {
    events: Event[];
}

export default function OtherEventsSidebar({ events }: SidebarProps) {
    if (events.length === 0) {
        return null; // Jangan render apa-apa jika tidak ada event lain
    }

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-bold text-gray-800">Acara Lainnya</h3>
            <div className="space-y-4">
                {events.map((event) => (
                    <Link
                        key={event.id}
                        href={route('events.show', event.id)}
                        className="block rounded-md bg-gray-100 p-4 transition hover:bg-gray-200"
                    >
                        <p className="font-semibold text-gray-700">{event.title}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
