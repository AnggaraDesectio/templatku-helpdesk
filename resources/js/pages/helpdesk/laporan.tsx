import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { AreaChartCard, BarChartCard, DonutChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Inbox, TimerOff, Timer, ThumbsUp } from 'lucide-react';

interface Ringkasan {
    tiket_open: number;
    sla_terlewat: number;
    avg_respon: string;
    csat: number;
}

interface Agen {
    id: number;
    nama: string;
    spesialisasi: string;
    tiket_open: number;
}

export default function HelpdeskLaporan({
    ringkasan,
    perHari,
    prioritas,
    distribusi,
    agens,
}: {
    ringkasan: Ringkasan;
    perHari: ChartData;
    prioritas: ChartData;
    distribusi: ChartData;
    agens: Record<string, any>[];
}) {
    const rows: Agen[] = agens.map((a) => ({
        id: Number(a.id),
        nama: String(a.nama),
        spesialisasi: String(a.spesialisasi),
        tiket_open: Number(a.tiket_open),
    }));

    const columns: Column<Agen>[] = [
        { key: 'nama', header: 'Agen', sortValue: (r) => r.nama },
        { key: 'spesialisasi', header: 'Spesialisasi', sortValue: (r) => r.spesialisasi },
        {
            key: 'tiket_open',
            header: 'Tiket Terbuka',
            render: (r) => <span className="tnum font-medium">{r.tiket_open}</span>,
            sortValue: (r) => r.tiket_open,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Laporan"
                description="Kinerja support: volume tiket, prioritas, SLA, dan beban agen."
                breadcrumbs={[{ label: 'Helpdesk', href: '/helpdesk' }, { label: 'Laporan' }]}
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
                        <AreaChartCard data={perHari} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Tiket per Prioritas</CardTitle>
                        <p className="text-muted-foreground text-sm">Jumlah tiket di tiap tingkat prioritas.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={prioritas} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Distribusi Status</CardTitle>
                        <p className="text-muted-foreground text-sm">Komposisi status seluruh tiket.</p>
                    </CardHeader>
                    <CardContent>
                        <DonutChartCard data={distribusi} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Beban Tiket per Agen</CardTitle>
                        <p className="text-muted-foreground text-sm">Tiket terbuka yang ditangani tiap agen.</p>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            rows={rows}
                            emptyTitle="Belum ada data"
                            emptyDescription="Beban agen akan tampil di sini."
                        />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
