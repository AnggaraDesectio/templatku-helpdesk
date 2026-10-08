import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Agen {
    id: number;
    nama: string;
    spesialisasi: string;
    email: string;
    status: ToneLabel;
    tiket_open: number;
}

export default function HelpdeskAgen({ agens }: { agens: Record<string, any>[] }) {
    const rows: Agen[] = agens.map((a) => ({
        id: Number(a.id),
        nama: String(a.nama),
        spesialisasi: String(a.spesialisasi),
        email: String(a.email),
        status: a.status as ToneLabel,
        tiket_open: Number(a.tiket_open),
    }));

    const columns: Column<Agen>[] = [
        {
            key: 'nama',
            header: 'Agen',
            render: (r) => (
                <span className="inline-flex items-center gap-2.5">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {r.nama.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{r.nama}</span>
                </span>
            ),
            sortValue: (r) => r.nama,
        },
        { key: 'spesialisasi', header: 'Spesialisasi', sortValue: (r) => r.spesialisasi },
        { key: 'email', header: 'Email', mobileHidden: true },
        {
            key: 'tiket_open',
            header: 'Tiket Terbuka',
            render: (r) => <span className="tnum font-medium">{r.tiket_open}</span>,
            sortValue: (r) => r.tiket_open,
        },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Agen"
                description="Tim support beserta beban tiket terbuka masing-masing."
                breadcrumbs={[{ label: 'Helpdesk', href: '/helpdesk' }, { label: 'Agen' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Agen</CardTitle>
                    <p className="text-muted-foreground text-sm">{rows.length} agen terdaftar.</p>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'spesialisasi', 'email']}
                        pageSize={10}
                        emptyTitle="Belum ada agen"
                        emptyDescription="Agen support akan tampil di sini."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
