<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Support\Demo\HelpdeskData;
use Inertia\Inertia;
use Inertia\Response;

/** Halaman-halaman helpdesk/ticketing TIKETKU (Inertia). */
class HelpdeskController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('helpdesk/index', [
            'ringkasan' => HelpdeskData::ringkasan(),
            'perHari'   => HelpdeskData::tiketPerHari(),
            'distribusi'=> HelpdeskData::distribusiStatus(),
            'tikets'    => array_slice(HelpdeskData::tikets(), 0, 6),
        ]);
    }

    public function tiket(): Response
    {
        return Inertia::render('helpdesk/tiket', [
            'tikets' => HelpdeskData::tikets(),
        ]);
    }

    public function sla(): Response
    {
        return Inertia::render('helpdesk/sla', [
            'kebijakan'   => HelpdeskData::slaKebijakan(),
            'pelanggaran' => HelpdeskData::slaPelanggaran(),
        ]);
    }

    public function knowledge(): Response
    {
        return Inertia::render('helpdesk/knowledge', [
            'articles' => HelpdeskData::articles(),
        ]);
    }

    public function agen(): Response
    {
        return Inertia::render('helpdesk/agen', [
            'agens' => HelpdeskData::agens(),
        ]);
    }

    public function laporan(): Response
    {
        return Inertia::render('helpdesk/laporan', [
            'ringkasan'  => HelpdeskData::ringkasan(),
            'perHari'    => HelpdeskData::tiketPerHari(),
            'prioritas'  => HelpdeskData::distribusiPrioritas(),
            'distribusi' => HelpdeskData::distribusiStatus(),
            'agens'      => HelpdeskData::agens(),
        ]);
    }
}
