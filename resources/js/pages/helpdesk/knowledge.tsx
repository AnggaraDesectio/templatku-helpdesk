import { useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Plus } from 'lucide-react';
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

interface Article {
    id: number;
    judul: string;
    kategori: string;
    views: number;
    diperbarui: string;
}

export default function HelpdeskKnowledge({ articles }: { articles: Record<string, any>[] }) {
    const [rows, setRows] = useState<Article[]>(
        articles.map((a) => ({
            id: Number(a.id),
            judul: String(a.judul),
            kategori: String(a.kategori),
            views: Number(a.views),
            diperbarui: String(a.diperbarui),
        })),
    );
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Article | null>(null);
    const [judul, setJudul] = useState('');
    const [kategori, setKategori] = useState('');
    const [isi, setIsi] = useState('');

    const kategoris = Array.from(new Set(rows.map((r) => r.kategori)));

    const openAdd = () => {
        setEditing(null);
        setJudul('');
        setKategori(kategoris[0] ?? '');
        setIsi('');
        setOpen(true);
    };

    const openEdit = (row: Article) => {
        setEditing(row);
        setJudul(row.judul);
        setKategori(row.kategori);
        setIsi('');
        setOpen(true);
    };

    const simpan = () => {
        if (!judul.trim()) {
            toast.error('Isi judul artikel dulu.');
            return;
        }
        const now = new Date();
        const tgl = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
        if (editing) {
            setRows((rs) =>
                rs.map((r) =>
                    r.id === editing.id ? { ...r, judul: judul.trim(), kategori: kategori.trim() || r.kategori, diperbarui: tgl } : r,
                ),
            );
            toast.success('Artikel diperbarui.');
        } else {
            const id = Math.max(0, ...rows.map((r) => r.id)) + 1;
            setRows((rs) => [
                { id, judul: judul.trim(), kategori: kategori.trim() || 'Umum', views: 0, diperbarui: tgl },
                ...rs,
            ]);
            toast.success(`Artikel "${judul.trim()}" diterbitkan.`);
        }
        setOpen(false);
    };

    const columns: Column<Article>[] = [
        { key: 'judul', header: 'Judul Artikel', sortValue: (r) => r.judul },
        {
            key: 'kategori',
            header: 'Kategori',
            render: (r) => <Badge variant="secondary">{r.kategori}</Badge>,
            sortValue: (r) => r.kategori,
        },
        {
            key: 'views',
            header: 'Dibaca',
            render: (r) => (
                <span className="tnum inline-flex items-center gap-1.5 font-medium">
                    <Eye className="text-muted-foreground h-3.5 w-3.5" />
                    {r.views.toLocaleString('id-ID')}
                </span>
            ),
            sortValue: (r) => r.views,
        },
        { key: 'diperbarui', header: 'Diperbarui', mobileHidden: true, sortValue: (r) => r.diperbarui },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Knowledge Base"
                description="Jawaban siap pakai, tulis sekali, pakai berkali-kali buat jawab pelanggan."
                breadcrumbs={[{ label: 'Helpdesk', href: '/helpdesk' }, { label: 'Knowledge Base' }]}
                actions={
                    <Button size="sm" onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Tulis Artikel
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Artikel</CardTitle>
                    <p className="text-muted-foreground text-sm">{rows.length} artikel diterbitkan.</p>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['judul', 'kategori']}
                        pageSize={10}
                        onEdit={openEdit}
                        emptyTitle="Belum ada artikel"
                        emptyDescription="Tulis artikel pertama lewat tombol Tulis Artikel."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Ubah Artikel' : 'Tulis Artikel Baru'}</DialogTitle>
                        <DialogDescription>
                            Dokumentasikan jawaban agar agen lain bisa memakainya.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="kb-judul">Judul</Label>
                            <Input
                                id="kb-judul"
                                value={judul}
                                onChange={(e) => setJudul(e.target.value)}
                                placeholder="cth. Cara reset password akun"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="kb-kat">Kategori</Label>
                            <Select value={kategori} onValueChange={setKategori}>
                                <SelectTrigger id="kb-kat">
                                    <SelectValue placeholder="Pilih kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    {kategoris.map((k) => (
                                        <SelectItem key={k} value={k}>
                                            {k}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="kb-isi">Isi artikel</Label>
                            <Textarea
                                id="kb-isi"
                                value={isi}
                                onChange={(e) => setIsi(e.target.value)}
                                placeholder="Tulis langkah-langkah penyelesaiannya…"
                                rows={4}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={simpan}>{editing ? 'Simpan Perubahan' : 'Terbitkan Artikel'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
