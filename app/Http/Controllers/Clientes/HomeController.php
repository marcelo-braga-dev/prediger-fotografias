<?php

namespace App\Http\Controllers\Clientes;

use App\Http\Controllers\Controller;
use App\Models\Galerias;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $galerias = (new Galerias())->get();

        return Inertia::render('Cliente/Home/Index', compact('galerias'));
    }
}
