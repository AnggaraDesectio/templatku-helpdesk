<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "helpdesk".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'helpdesk'),

    'flavors' => array (
  'helpdesk' => 
  array (
    'label' => 'Helpdesk',
    'brand_name' => 'TIKETKU',
    'brand_tagline' => 'Support ticketing',
    'brand_initials' => 'TI',
    'accent' => '#78350f',
    'category' => 'bisnis',
    'home' => 'helpdesk.index',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Helpdesk',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Dashboard',
              'to' => '/helpdesk',
              'icon' => 'LayoutDashboard',
            ),
            1 => 
            array (
              'label' => 'Tiket',
              'to' => '/helpdesk/tiket',
              'icon' => 'Ticket',
            ),
            2 => 
            array (
              'label' => 'SLA',
              'to' => '/helpdesk/sla',
              'icon' => 'Timer',
            ),
            3 => 
            array (
              'label' => 'Knowledge Base',
              'to' => '/helpdesk/knowledge',
              'icon' => 'BookOpen',
            ),
            4 => 
            array (
              'label' => 'Agen',
              'to' => '/helpdesk/agen',
              'icon' => 'Users',
            ),
            5 => 
            array (
              'label' => 'Laporan',
              'to' => '/helpdesk/laporan',
              'icon' => 'ChartLine',
            ),
          ),
        ),
        1 => 
        array (
          'label' => 'Umum',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Pengguna',
              'to' => '/users',
              'icon' => 'Users',
            ),
            1 => 
            array (
              'label' => 'Peran',
              'to' => '/roles',
              'icon' => 'ShieldCheck',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
            3 => 
            array (
              'label' => 'Profil',
              'to' => '/profile',
              'icon' => 'User',
            ),
          ),
        ),
      ),
    ),
  ),
),
];
