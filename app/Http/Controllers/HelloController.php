<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HelloController extends Controller
{
    public function show()
    {
        // Send data to the view
        return view('hello', ['message' => 'Hello World!']);
    }
}
