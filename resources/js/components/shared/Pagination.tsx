import { Link } from '@inertiajs/react';

// Tipe untuk setiap link dari paginator Laravel
interface PaginatorLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginatorLink[];
}

export default function Pagination({ links }: PaginationProps) {
    if (links.length <= 3) {
        return null; // Jangan render jika tidak ada halaman lain
    }

    return (
        <nav className="mt-12 flex items-center justify-center">
            <div className="flex flex-wrap">
                {links.map((link, index) => {
                    // Jika URL null, itu adalah separator "..." atau tombol yang dinonaktifkan
                    if (link.url === null) {
                        return (
                            <span
                                key={`disabled-${index}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className="mx-1 flex h-9 min-w-[36px] cursor-not-allowed items-center justify-center rounded-md border border-gray-200 bg-gray-100 px-3 py-1 text-sm text-gray-400"
                            />
                        );
                    }

                    // Render tombol link menggunakan <Link> dari Inertia
                    return (
                        <Link
                            key={`link-${index}`}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`mx-1 flex h-9 min-w-[36px] items-center justify-center rounded-md border px-3 py-1 text-sm transition ${
                                link.active ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                            } `}
                        />
                    );
                })}
            </div>
        </nav>
    );
}
