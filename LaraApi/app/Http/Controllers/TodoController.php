<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return response()->json(Todo::latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Todo::create([
            'title'=>$request->title,
            'is_done'=>$request->is_done
        ]);
        return response()->json(true);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        $comments = Comment::all();

    return response()->json([
        'comments' => $comments,
    ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        //
    }
}
