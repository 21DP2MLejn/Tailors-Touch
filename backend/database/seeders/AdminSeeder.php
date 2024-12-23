<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'lastname' => 'Admin',
            'email' => 'admin@admin.ad',
            'password' => Hash::make('password'),
            'is_admin' => true, 
        ]);
    }
}
