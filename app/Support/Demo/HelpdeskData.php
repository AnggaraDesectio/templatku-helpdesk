<?php

namespace App\Support\Demo;

/**
 * Data demo helpdesk/ticketing TIKETKU: agen, tiket, kebijakan SLA,
 * pelanggaran SLA, dan artikel knowledge base.
 * Kontrak status/prioritas: ['label' => .., 'tone' => ..] tanpa HTML,
 * tone ∈ success | warning | destructive | info.
 * Baris mentah (xxxRows) dipakai internal agar tidak ada rekursi.
 */
class HelpdeskData
{
    /** Baris mentah agen. */
    private static function agenRows(): array
    {
        return [
            ['id' => 1, 'nama' => 'Dewi Anggraini', 'spesialisasi' => 'Infrastruktur', 'email' => 'dewi.anggraini@tiketku.id',  'status' => ['label' => 'Aktif', 'tone' => 'success']],
            ['id' => 2, 'nama' => 'Budi Hartono',   'spesialisasi' => 'Aplikasi',      'email' => 'budi.hartono@tiketku.id',    'status' => ['label' => 'Aktif', 'tone' => 'success']],
            ['id' => 3, 'nama' => 'Rina Kartika',   'spesialisasi' => 'Jaringan',      'email' => 'rina.kartika@tiketku.id',    'status' => ['label' => 'Aktif', 'tone' => 'success']],
            ['id' => 4, 'nama' => 'Andi Pratama',   'spesialisasi' => 'Database',      'email' => 'andi.pratama@tiketku.id',    'status' => ['label' => 'Aktif', 'tone' => 'success']],
            ['id' => 5, 'nama' => 'Maya Safitri',   'spesialisasi' => 'Keamanan',      'email' => 'maya.safitri@tiketku.id',    'status' => ['label' => 'Aktif', 'tone' => 'success']],
            ['id' => 6, 'nama' => 'Joko Susilo',    'spesialisasi' => 'General',       'email' => 'joko.susilo@tiketku.id',     'status' => ['label' => 'Cuti',  'tone' => 'warning']],
        ];
    }

    private static function prioritas(string $key): array
    {
        return match ($key) {
            'kritis' => ['label' => 'Kritis', 'tone' => 'destructive'],
            'tinggi' => ['label' => 'Tinggi', 'tone' => 'warning'],
            'sedang' => ['label' => 'Sedang', 'tone' => 'info'],
            default  => ['label' => 'Rendah', 'tone' => 'success'],
        };
    }

    private static function statusTiket(string $key): array
    {
        return match ($key) {
            'terbuka'         => ['label' => 'Terbuka',         'tone' => 'info'],
            'dalam_proses'    => ['label' => 'Dalam Proses',    'tone' => 'warning'],
            'menunggu_vendor' => ['label' => 'Menunggu Vendor', 'tone' => 'warning'],
            default           => ['label' => 'Selesai',         'tone' => 'success'],
        };
    }

    /**
     * 12 tiket: 7 terbuka (terbuka/dalam_proses/menunggu_vendor),
     * 5 selesai. Rata-rata respon 2,4 jam.
     */
    private static function tiketRows(): array
    {
        return [
            ['id' => 1,  'no' => 'TKT-2026-1041', 'subjek' => 'Server email down',                  'pelanggan' => 'PT Nusantara Makmur',   'prioritas' => 'kritis', 'agen_id' => 1, 'status' => 'terbuka',         'dibuat' => '8 Okt 2026, 07:30', 'respon_jam' => 0.5],
            ['id' => 2,  'no' => 'TKT-2026-1040', 'subjek' => 'VPN kantor cabang tidak terhubung',  'pelanggan' => 'PT Sinar Abadi',        'prioritas' => 'tinggi', 'agen_id' => 3, 'status' => 'dalam_proses',    'dibuat' => '7 Okt 2026, 08:15', 'respon_jam' => 1.2],
            ['id' => 3,  'no' => 'TKT-2026-1039', 'subjek' => 'Aplikasi kasir error setelah update', 'pelanggan' => 'CV Berkah Jaya',         'prioritas' => 'kritis', 'agen_id' => 2, 'status' => 'dalam_proses',    'dibuat' => '7 Okt 2026, 09:40', 'respon_jam' => 0.8],
            ['id' => 4,  'no' => 'TKT-2026-1038', 'subjek' => 'Request akun karyawan baru',         'pelanggan' => 'PT Lestari Foods',      'prioritas' => 'rendah', 'agen_id' => 6, 'status' => 'selesai',         'dibuat' => '6 Okt 2026, 10:05', 'respon_jam' => 3.0],
            ['id' => 5,  'no' => 'TKT-2026-1037', 'subjek' => 'Database lambat saat jam sibuk',     'pelanggan' => 'PT Prima Cipta',        'prioritas' => 'tinggi', 'agen_id' => 4, 'status' => 'dalam_proses',    'dibuat' => '6 Okt 2026, 11:20', 'respon_jam' => 2.1],
            ['id' => 6,  'no' => 'TKT-2026-1036', 'subjek' => 'Lupa password email',                'pelanggan' => 'PT Artha Graha',        'prioritas' => 'rendah', 'agen_id' => 6, 'status' => 'selesai',         'dibuat' => '5 Okt 2026, 13:45', 'respon_jam' => 1.5],
            ['id' => 7,  'no' => 'TKT-2026-1035', 'subjek' => 'Printer jaringan tidak terdeteksi',  'pelanggan' => 'UD Maju Bersama',       'prioritas' => 'sedang', 'agen_id' => 6, 'status' => 'selesai',         'dibuat' => '5 Okt 2026, 15:10', 'respon_jam' => 2.4],
            ['id' => 8,  'no' => 'TKT-2026-1034', 'subjek' => 'Website company profile lambat',     'pelanggan' => 'PT Wira Karya Digital', 'prioritas' => 'sedang', 'agen_id' => 1, 'status' => 'dalam_proses',    'dibuat' => '4 Okt 2026, 09:00', 'respon_jam' => 5.0],
            ['id' => 9,  'no' => 'TKT-2026-1033', 'subjek' => 'Notifikasi gagal terkirim',          'pelanggan' => 'PT Sinar Abadi',        'prioritas' => 'tinggi', 'agen_id' => 2, 'status' => 'menunggu_vendor', 'dibuat' => '3 Okt 2026, 14:30', 'respon_jam' => 3.3],
            ['id' => 10, 'no' => 'TKT-2026-1032', 'subjek' => 'Upgrade RAM server',                 'pelanggan' => 'PT Nusantara Makmur',   'prioritas' => 'rendah', 'agen_id' => 4, 'status' => 'selesai',         'dibuat' => '2 Okt 2026, 10:20', 'respon_jam' => 6.0],
            ['id' => 11, 'no' => 'TKT-2026-1031', 'subjek' => 'Deteksi malware di workstation',     'pelanggan' => 'CV Berkah Jaya',         'prioritas' => 'kritis', 'agen_id' => 5, 'status' => 'selesai',         'dibuat' => '1 Okt 2026, 08:00', 'respon_jam' => 0.6],
            ['id' => 12, 'no' => 'TKT-2026-1030', 'subjek' => 'Integrasi API pembayaran timeout',   'pelanggan' => 'PT Lestari Foods',      'prioritas' => 'tinggi', 'agen_id' => 2, 'status' => 'dalam_proses',    'dibuat' => '30 Sep 2026, 16:45', 'respon_jam' => 2.8],
        ];
    }

    /** Agen beserta beban tiket terbuka. */
    public static function agens(): array
    {
        $beban = [];
        foreach (self::tiketRows() as $t) {
            if ($t['status'] !== 'selesai') {
                $beban[$t['agen_id']] = ($beban[$t['agen_id']] ?? 0) + 1;
            }
        }

        return array_map(fn ($a) => array_merge($a, [
            'tiket_open' => $beban[$a['id']] ?? 0,
        ]), self::agenRows());
    }

    /** Tiket dengan nama agen, label prioritas, dan label status. */
    public static function tikets(): array
    {
        $agens = [];
        foreach (self::agenRows() as $a) {
            $agens[$a['id']] = $a['nama'];
        }

        return array_map(function ($t) use ($agens) {
            $t['agen'] = $agens[$t['agen_id']] ?? '-';
            $t['prioritas_label'] = self::prioritas($t['prioritas']);
            $t['status_label'] = self::statusTiket($t['status']);
            return $t;
        }, self::tiketRows());
    }

    /** Kebijakan SLA per tingkat prioritas. */
    public static function slaKebijakan(): array
    {
        return [
            ['id' => 1, 'prioritas' => self::prioritas('kritis'), 'respon' => '1 jam',  'resolusi' => '4 jam',  'target' => '99%'],
            ['id' => 2, 'prioritas' => self::prioritas('tinggi'), 'respon' => '4 jam',  'resolusi' => '8 jam',  'target' => '95%'],
            ['id' => 3, 'prioritas' => self::prioritas('sedang'), 'respon' => '8 jam',  'resolusi' => '24 jam', 'target' => '90%'],
            ['id' => 4, 'prioritas' => self::prioritas('rendah'), 'respon' => '24 jam', 'resolusi' => '72 jam', 'target' => '85%'],
        ];
    }

    /** Tiket yang melewati target SLA resolusi. */
    public static function slaPelanggaran(): array
    {
        return [
            ['id' => 1, 'no' => 'TKT-2026-1033', 'subjek' => 'Notifikasi gagal terkirim',          'pelanggan' => 'PT Sinar Abadi',      'prioritas' => self::prioritas('tinggi'), 'target' => '8 jam',  'aktual' => '52 jam',  'keterangan' => 'Menunggu vendor'],
            ['id' => 2, 'no' => 'TKT-2026-1034', 'subjek' => 'Website company profile lambat',     'pelanggan' => 'PT Wira Karya Digital', 'prioritas' => self::prioritas('sedang'), 'target' => '24 jam', 'aktual' => '31 jam',  'keterangan' => 'Terlambat'],
            ['id' => 3, 'no' => 'TKT-2026-1028', 'subjek' => 'Backup server gagal',                'pelanggan' => 'PT Nusantara Makmur', 'prioritas' => self::prioritas('tinggi'), 'target' => '8 jam',  'aktual' => '11 jam',  'keterangan' => 'Terlambat'],
            ['id' => 4, 'no' => 'TKT-2026-1021', 'subjek' => 'Akses folder bersama ditolak',       'pelanggan' => 'CV Berkah Jaya',       'prioritas' => self::prioritas('kritis'), 'target' => '4 jam',  'aktual' => '6,5 jam', 'keterangan' => 'Terlambat'],
        ];
    }

    /** Artikel knowledge base. */
    public static function articles(): array
    {
        return [
            ['id' => 1, 'judul' => 'Menangani email phishing yang masuk ke inbox', 'kategori' => 'Keamanan',     'views' => 2431, 'diperbarui' => '2 Okt 2026'],
            ['id' => 2, 'judul' => 'Menghubungkan printer ke jaringan kantor',     'kategori' => 'Perangkat',     'views' => 2098, 'diperbarui' => '28 Sep 2026'],
            ['id' => 3, 'judul' => 'Cara reset password email karyawan',           'kategori' => 'Akun & Akses',  'views' => 1842, 'diperbarui' => '5 Okt 2026'],
            ['id' => 4, 'judul' => 'SOP backup harian server',                    'kategori' => 'Infrastruktur', 'views' => 1764, 'diperbarui' => '20 Sep 2026'],
            ['id' => 5, 'judul' => 'Panduan konfigurasi VPN untuk kantor cabang',  'kategori' => 'Jaringan',      'views' => 1356, 'diperbarui' => '15 Sep 2026'],
            ['id' => 6, 'judul' => 'Optimasi query database yang lambat',          'kategori' => 'Database',      'views' => 1102, 'diperbarui' => '10 Sep 2026'],
            ['id' => 7, 'judul' => 'Checklist sebelum update aplikasi kasir',      'kategori' => 'Aplikasi',      'views' => 987,  'diperbarui' => '1 Okt 2026'],
            ['id' => 8, 'judul' => 'Troubleshooting integrasi API pembayaran',     'kategori' => 'Aplikasi',      'views' => 765,  'diperbarui' => '25 Sep 2026'],
        ];
    }

    /** Ringkasan angka dashboard (dihitung dari data). */
    public static function ringkasan(): array
    {
        $rows = self::tiketRows();
        $open = array_filter($rows, fn ($t) => $t['status'] !== 'selesai');
        $avgRespon = count($rows) > 0
            ? round(array_sum(array_column($rows, 'respon_jam')) / count($rows), 1)
            : 0;

        return [
            'tiket_open'   => count($open),
            'sla_terlewat' => count(self::slaPelanggaran()),
            'avg_respon'   => str_replace('.', ',', (string) $avgRespon).' jam',
            'csat'         => 92,
        ];
    }

    /** Jumlah tiket dibuat per hari (30 Sep, 8 Okt) untuk bar chart. */
    public static function tiketPerHari(): array
    {
        return [
            'labels'   => ['30 Sep', '1 Okt', '2 Okt', '3 Okt', '4 Okt', '5 Okt', '6 Okt', '7 Okt', '8 Okt'],
            'datasets' => [['label' => 'Tiket dibuat', 'data' => [1, 1, 1, 1, 1, 2, 2, 2, 1]]],
        ];
    }

    /** Distribusi tiket per status untuk donut chart. */
    public static function distribusiStatus(): array
    {
        $keys = ['terbuka', 'dalam_proses', 'menunggu_vendor', 'selesai'];
        $labels = [];
        $data = [];
        foreach ($keys as $k) {
            $labels[] = self::statusTiket($k)['label'];
            $data[] = count(array_filter(self::tiketRows(), fn ($t) => $t['status'] === $k));
        }

        return [
            'labels'   => $labels,
            'datasets' => [['label' => 'Tiket', 'data' => $data]],
        ];
    }

    /** Distribusi tiket per prioritas untuk bar chart. */
    public static function distribusiPrioritas(): array
    {
        $keys = ['kritis', 'tinggi', 'sedang', 'rendah'];
        $labels = [];
        $data = [];
        foreach ($keys as $k) {
            $labels[] = self::prioritas($k)['label'];
            $data[] = count(array_filter(self::tiketRows(), fn ($t) => $t['prioritas'] === $k));
        }

        return [
            'labels'   => $labels,
            'datasets' => [['label' => 'Tiket', 'data' => $data]],
        ];
    }
}
