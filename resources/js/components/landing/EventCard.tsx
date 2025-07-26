import { Link } from '@inertiajs/react';

interface EventCardProps {
    imageUrl: string;
    title: string;
    description: string;
    detailLink: string;
}

export default function EventCard({ imageUrl, title, description, detailLink }: EventCardProps) {
    return (
        <div className="transform overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105">
            {/* Gambar Event */}
            <div className="flex h-64 w-full items-center justify-center bg-gray-200 text-gray-500">
                {imageUrl ? (
                    <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
                ) : (
                    <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 3h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2zm0 16h16V5H4v14zM15 9l-3 3-2-2-4 4v2h12v-2l-5-5-2 2-2-2z" />
                    </svg>
                )}
            </div>

            <div className="p-4">
                <h3 className="mb-2 truncate text-lg font-semibold text-gray-800">{title}</h3>
                <p className="mb-4 line-clamp-3 text-sm text-gray-600">{description}</p>
                <Link
                    href={detailLink}
                    className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-blue-500"
                >
                    Detail
                </Link>
            </div>
        </div>
    );
}
