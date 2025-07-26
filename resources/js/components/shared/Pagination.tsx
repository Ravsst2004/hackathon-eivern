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
    // Jangan render apa-apa jika hanya ada 2 link ("Previous" dan "Next") atau kurang
    if (links.length <= 3) {
        return null;
    }

    return (
        <nav className="mt-12 flex items-center justify-center">
            <div className="flex flex-wrap">
                {links.map((link, index) => {
                    // Jika URL null, itu adalah separator "..."
                    if (link.url === null) {
                        return (
                            <span
                                key={`separator-${index}`}
                                className="mx-1 flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-1 text-sm text-gray-500"
                            >
                                {link.label}
                            </span>
                        );
                    }

                    // Render tombol link menggunakan <Link> dari Inertia
                    return (
                        <Link
                            key={link.label}
                            href={link.url}
                            // `dangerouslySetInnerHTML` digunakan karena label dari Laravel mengandung HTML entity seperti &laquo;
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
