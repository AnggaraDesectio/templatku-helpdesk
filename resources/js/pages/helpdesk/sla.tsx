import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Kebijakan {
    id: number;
    prioritas: ToneLabel;
    respon: string;
    resolusi: string;
    target: string;
}

interface Pelanggaran {
    id: number;
    no: string;
    subjek: string;
    pelanggan: string;
    prioritas: ToneLabel;
    target: string;
    aktual: string;
    keterangan: string;
}

export default function HelpdeskSla({
    kebijakan,
    pelanggaran,
}: {
    kebijakan: Record<string, any>[];
    pelanggaran: Record<string, any>[];
}) {
    const kbRows: Kebijakan[] = kebijakan.map((k) => ({
        id: Number(k.id),
        prioritas: k.prioritas as ToneLabel,
        respon: String(k.respon),
        resolusi: String(k.resolusi),
        target: String(k.target),
    }));

    const kbColumns: Column<Kebijakan>[] = [
        {
            key: 'prioritas',
            header: 'Prioritas',
            render: (r) => <ToneBadge label={r.prioritas.label} tone={r.prioritas.tone} />,
        },
        { key: 'respon', header: 'Target Respon Pertama', sortValue: (r) => r.respon },
        { key: 'resolusi', header: 'Target Resolusi', sortValue: (r) => r.resolusi },
        { key: 'target', header: 'Target Kepatuhan', sortValue: (r) => r.target },
    ];

    const pgRows: Pelanggaran[] = pelanggaran.map((p) => ({
        id: Number(p.id),
        no: String(p.no),
        subjek: String(p.subjek),
        pelanggan: String(p.pelanggan),
        prioritas: p.prioritas as ToneLabel,
        target: String(p.target),
        aktual: String(p.aktual),
        keterangan: String(p.keterangan),
    }));

    const pgColumns: Column<Pelanggaran>[] = [
        { key: 'no', header: 'No. Tiket', sortValue: (r) => r.no },
        { key: 'subjek', header: 'Subjek', sortValue: (r) => r.subjek },
        { key: 'pelanggan', header: 'Pelanggan', mobileHidden: true, sortValue: (r) => r.pelanggan },
        {
            key: 'prioritas',
            header: 'Prioritas',
            render: (r) => <ToneBadge label={r.prioritas.label} tone={r.prioritas.tone} />,
        },
        { key: 'target', header: 'Target', mobileHidden: true },
        {
            key: 'aktual',
            header: 'Aktual',
            render: (r) => <span className="text-destructive tnum font-medium">{r.aktual}</span>,
            sortValue: (r) => r.aktual,
        },
        { key: 'keterangan', header: 'Keterangan', mobileHidden: true },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="SLA"
                description="Kebijakan service level agreement dan tiket yang melewati target."
                breadcrumbs={[{ label: 'Helpdesk', href: '/helpdesk' }, { label: 'SLA' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Kebijakan SLA</CardTitle>
                    <p className="text-muted-foreground text-sm">Target respon dan resolusi per tingkat prioritas.</p>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={kbColumns}
                        rows={kbRows}
                        emptyTitle="Belum ada kebijakan"
                        emptyDescription="Kebijakan SLA akan tampil di sini."
                    />
                </CardContent>
            </Card>
            <Card className="mt-4 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Pelanggaran SLA</CardTitle>
                    <p className="text-muted-foreground text-sm">Tiket yang resolusinya melewati target, {pgRows.length} kejadian.</p>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={pgColumns}
                        rows={pgRows}
                        searchKeys={['no', 'subjek', 'pelanggan']}
                        emptyTitle="Tidak ada pelanggaran"
                        emptyDescription="Semua tiket memenuhi target SLA."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
