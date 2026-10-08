import { useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Tiket {
    id: number;
    no: string;
    subjek: string;
    pelanggan: string;
    prioritas_label: ToneLabel;
    status_label: ToneLabel;
    agen: string;
    dibuat: string;
}

const PRIORITAS = ['Rendah', 'Sedang', 'Tinggi', 'Kritis'];

const prioritasTone = (p: string): ToneLabel['tone'] =>
    p === 'Kritis' ? 'destructive' : p === 'Tinggi' ? 'warning' : p === 'Sedang' ? 'info' : 'info';

const ALUR = ['Terbuka', 'Dalam Proses', 'Selesai'];

const statusTone = (s: string): ToneLabel['tone'] =>
    s === 'Selesai' ? 'success' : s === 'Dalam Proses' ? 'info' : 'warning';

export default function HelpdeskTiket({ tikets }: { tikets: Record<string, any>[] }) {
    const [rows, setRows] = useState<Tiket[]>(
        tikets.map((t) => ({
            id: Number(t.id),
            no: String(t.no),
            subjek: String(t.subjek),
            pelanggan: String(t.pelanggan),
            prioritas_label: t.prioritas_label as ToneLabel,
            status_label: t.status_label as ToneLabel,
            agen: String(t.agen),
            dibuat: String(t.dibuat),
        })),
    );
    const [open, setOpen] = useState(false);
    const [subjek, setSubjek] = useState('');
    const [pelanggan, setPelanggan] = useState('');
    const [prioritas, setPrioritas] = useState('Sedang');
    const [deskripsi, setDeskripsi] = useState('');

    const openAdd = () => {
        setSubjek('');
        setPelanggan('');
        setPrioritas('Sedang');
        setDeskripsi('');
        setOpen(true);
    };

    const simpan = () => {
        if (!subjek.trim() || !pelanggan.trim()) {
            toast.error('Lengkapi subjek dan nama pelanggan.');
            return;
        }
        const id = Math.max(0, ...rows.map((r) => r.id)) + 1;
        const no = `TKT-${String(id).padStart(4, '0')}`;
        const now = new Date();
        setRows((rs) => [
            {
                id,
                no,
                subjek: subjek.trim(),
                pelanggan: pelanggan.trim(),
                prioritas_label: { label: prioritas, tone: prioritasTone(prioritas) } as ToneLabel,
                status_label: { label: 'Terbuka', tone: 'warning' } as ToneLabel,
                agen: 'Belum ditugaskan',
                dibuat: `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`,
            },
            ...rs,
        ]);
        toast.success(`${no} dibuat, segera tugaskan ke agen.`);
        setOpen(false);
    };

    // Majukan status tiket satu tahap: Terbuka -> Dalam Proses -> Selesai.
    const majukan = (row: Tiket) => {
        const idx = ALUR.indexOf(row.status_label.label);
        if (idx < 0 || idx === ALUR.length - 1) return;
        const next = ALUR[idx + 1];
        setRows((rs) =>
            rs.map((r) =>
                r.id === row.id ? { ...r, status_label: { label: next, tone: statusTone(next) } } : r,
            ),
        );
        toast.success(`${row.no} → ${next}.`);
    };

    const columns: Column<Tiket>[] = [
        { key: 'no', header: 'No. Tiket', sortValue: (r) => r.no },
        { key: 'subjek', header: 'Subjek', sortValue: (r) => r.subjek },
        { key: 'pelanggan', header: 'Pelanggan', sortValue: (r) => r.pelanggan },
        {
            key: 'prioritas_label',
            header: 'Prioritas',
            render: (r) => <ToneBadge label={r.prioritas_label.label} tone={r.prioritas_label.tone} />,
        },
        { key: 'agen', header: 'Agen', mobileHidden: true, sortValue: (r) => r.agen },
        {
            key: 'status_label',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status_label.label} tone={r.status_label.tone} />,
        },
        { key: 'dibuat', header: 'Dibuat', mobileHidden: true, sortValue: (r) => r.dibuat },
    ];

    const filters: FilterOption[] = [
        {
            key: 'status_label',
            label: 'Status',
            options: [
                { value: 'Terbuka', label: 'Terbuka' },
                { value: 'Dalam Proses', label: 'Dalam Proses' },
                { value: 'Menunggu Vendor', label: 'Menunggu Vendor' },
                { value: 'Selesai', label: 'Selesai' },
            ],
            match: (row: any, value: string) => row.status_label.label === value,
        },
        {
            key: 'prioritas_label',
            label: 'Prioritas',
            options: [
                { value: 'Kritis', label: 'Kritis' },
                { value: 'Tinggi', label: 'Tinggi' },
                { value: 'Sedang', label: 'Sedang' },
                { value: 'Rendah', label: 'Rendah' },
            ],
            match: (row: any, value: string) => row.prioritas_label.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Tiket"
                description="Keluhan pelanggan masuk sini, tugaskan, kerjakan, tutup."
                breadcrumbs={[{ label: 'Helpdesk', href: '/helpdesk' }, { label: 'Tiket' }]}
                actions={
                    <Button size="sm" onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Buat Tiket
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Daftar Tiket</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['no', 'subjek', 'pelanggan', 'agen']}
                        filters={filters}
                        pageSize={10}
                        extraRowActions={(row) =>
                            ALUR.indexOf(row.status_label.label) < ALUR.length - 1 ? (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => majukan(row)}
                                    title="Majukan status"
                                >
                                    Lanjut <ArrowRight className="ml-1 h-3.5 w-3.5" />
                                </Button>
                            ) : undefined
                        }
                        emptyTitle="Belum ada tiket"
                        emptyDescription="Buat tiket pertama lewat tombol Buat Tiket, nomor tiket dibuat otomatis."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Buat Tiket Baru</DialogTitle>
                        <DialogDescription>
                            Catat keluhan pelanggan, tiket baru berstatus Terbuka.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="tkt-subjek">Subjek</Label>
                            <Input
                                id="tkt-subjek"
                                value={subjek}
                                onChange={(e) => setSubjek(e.target.value)}
                                placeholder="cth. Internet putus sejak pagi"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="tkt-pel">Pelanggan</Label>
                                <Input
                                    id="tkt-pel"
                                    value={pelanggan}
                                    onChange={(e) => setPelanggan(e.target.value)}
                                    placeholder="Nama pelanggan"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tkt-prio">Prioritas</Label>
                                <Select value={prioritas} onValueChange={setPrioritas}>
                                    <SelectTrigger id="tkt-prio">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PRIORITAS.map((pr) => (
                                            <SelectItem key={pr} value={pr}>
                                                {pr}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tkt-desk">Detail keluhan</Label>
                            <Textarea
                                id="tkt-desk"
                                value={deskripsi}
                                onChange={(e) => setDeskripsi(e.target.value)}
                                placeholder="Ceritakan keluhannya…"
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={simpan}>Buat Tiket</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
