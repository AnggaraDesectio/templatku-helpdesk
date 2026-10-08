import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { BarChartCard, DonutChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Inbox, TimerOff, Timer, ThumbsUp, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Tiket {
    id: number;
    no: string;
    subjek: string;
    pelanggan: string;
    prioritas_label: ToneLabel;
    status_label: ToneLabel;
    agen: string;
}

interface Ringkasan {
    tiket_open: number;
    sla_terlewat: number;
    avg_respon: string;
    csat: number;
}

export default function HelpdeskIndex({
    ringkasan,
    perHari,
    distribusi,
    tikets,
}: {
    ringkasan: Ringkasan;
    perHari: ChartData;
    distribusi: ChartData;
    tikets: Record<string, any>[];
}) {
    const rows: Tiket[] = tikets.map((t) => ({
        id: Number(t.id),
        no: String(t.no),
        subjek: String(t.subjek),
        pelanggan: String(t.pelanggan),
        prioritas_label: t.prioritas_label as ToneLabel,
        status_label: t.status_label as ToneLabel,
        agen: String(t.agen),
    }));

    const columns: Column<Tiket>[] = [
        { key: 'no', header: 'No. Tiket', sortValue: (r) => r.no },
        { key: 'subjek', header: 'Subjek', sortValue: (r) => r.subjek },
        { key: 'pelanggan', header: 'Pelanggan', mobileHidden: true, sortValue: (r) => r.pelanggan },
        {
            key: 'prioritas_label',
            header: 'Prioritas',
            render: (r) => <ToneBadge label={r.prioritas_label.label} tone={r.prioritas_label.tone} />,
        },
        {
            key: 'status_label',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status_label.label} tone={r.status_label.tone} />,
        },
        { key: 'agen', header: 'Agen', mobileHidden: true, sortValue: (r) => r.agen },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Helpdesk"
                description="Ringkasan operasional support TIKETKU: tiket terbuka, SLA, dan kepuasan pelanggan."
                breadcrumbs={[{ label: 'Helpdesk' }]}
                actions={
                    <Button size="sm" asChild>
                        <Link href="/helpdesk/tiket">
                            <PlusCircle className="mr-2 h-4 w-4" /> Tiket Baru
                        </Link>
                    </Button>
                }
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Tiket Terbuka"
                    value={String(ringkasan.tiket_open)}
                    delta="butuh penanganan"
                    trend="flat"
                    icon={Inbox}
                    hint="Tiket yang belum ditutup, prioritaskan yang SLA-nya mepet."
                />
                <StatCard
                    label="SLA Terlewat"
                    value={String(ringkasan.sla_terlewat)}
                    delta="resolusi melewati target"
                    trend="down"
                    icon={TimerOff}
                    hint="Tiket yang resolusinya melewati target waktu."
                />
                <StatCard
                    label="Rata-rata Respon"
                    value={ringkasan.avg_respon}
                    delta="respon pertama ke pelanggan"
                    trend="up"
                    icon={Timer}
                    hint="Rata-rata waktu balasan pertama ke pelanggan."
                />
                <StatCard
                    label="CSAT"
                    value={`${ringkasan.csat}%`}
                    delta="kepuasan pelanggan"
                    trend="up"
                    icon={ThumbsUp}
                    hint="Skor kepuasan dari survei setelah tiket ditutup."
                />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Tiket Dibuat per Hari</CardTitle>
                        <p className="text-muted-foreground text-sm">30 September, 8 Oktober 2026.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={perHari} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Distribusi Status Tiket</CardTitle>
                        <p className="text-muted-foreground text-sm">Komposisi status seluruh tiket.</p>
                    </CardHeader>
                    <CardContent>
                        <DonutChartCard data={distribusi} />
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    rows={rows}
                    searchKeys={['no', 'subjek', 'pelanggan']}
                    emptyTitle="Belum ada tiket"
                    emptyDescription="Tiket terbaru akan tampil di sini."
                />
            </div>
        </AuthenticatedLayout>
    );
}
