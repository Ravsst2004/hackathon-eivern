import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Request Account',
        href: '/account-request',
    },
];

interface RequestAkses {
    id: string;
    nim: string;
    email: string;
    created_at: string;
}

export default function AccountRequest({ account }: { account: RequestAkses[] }) {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<RequestAkses | null>(null);
    const [isApproving, setIsApproving] = useState(false);
    const [approvingId, setApprovingId] = useState<string | null>(null);

    const handleApproveClick = (request: RequestAkses) => {
        setSelectedRequest(request);
        setIsConfirmOpen(true);
    };

    const handleConfirmApprove = () => {
        if (!selectedRequest) return;

        setIsApproving(true);
        setApprovingId(selectedRequest.id);

        router.post(
            `/account-request/${selectedRequest.id}`,
            {},
            {
                onSuccess: () => {
                    setIsConfirmOpen(false);
                    setIsApproving(false);
                    setApprovingId(null);
                    // You can add a toast notification here if needed
                    console.log('Account approved successfully');
                },
                onError: (errors) => {
                    console.error(errors);
                    setIsApproving(false);
                    setApprovingId(null);
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Account Request" />
            <div className="space-y-4">
                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="mb-4 text-lg font-medium text-gray-900">Account Requests</h2>

                    <div className="overflow-hidden rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>NIM</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Request Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {account.length > 0 ? (
                                    account.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell>{request.nim}</TableCell>
                                            <TableCell>{request.email}</TableCell>
                                            <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleApproveClick(request)}
                                                    disabled={isApproving && approvingId === request.id}
                                                >
                                                    {isApproving && approvingId === request.id ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Approving...
                                                        </>
                                                    ) : (
                                                        'Approve'
                                                    )}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="py-4 text-center">
                                            No account requests found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* Confirmation Dialog */}
            <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Approval</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to approve this account request for {selectedRequest?.nim}? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsConfirmOpen(false)} disabled={isApproving}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmApprove} className="bg-green-600 hover:bg-green-700" disabled={isApproving}>
                            {isApproving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Approving...
                                </>
                            ) : (
                                'Confirm Approval'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
