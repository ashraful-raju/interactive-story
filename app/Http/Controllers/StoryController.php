<?php

namespace App\Http\Controllers;

use App\Enums\StatusEnum;
use App\Models\Story;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Story/Index', [
            'stories' => Story::query()->author()->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Story/Create', [
            'story' => new Story(['status' => StatusEnum::DRAFT])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string'],
            'slug' => ['required', 'string', 'unique:stories'],
            'description' => ['string', 'nullable'],
            'status' => ['string', 'in:draft,published'],
            'cover' => ['image', 'nullable']
        ]);

        $data['cover'] = $request->hasFile('cover') ?
            $request->file('cover')->storePublicly() :
            null;

        $story = Story::create($data);

        return redirect()->route('stories.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Story $story)
    {
        $story->load(['startingItems', 'author']);
        return Inertia::render('Story/View', [
            'story' => $story
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Story $story)
    {
        return Inertia::render('Story/Create', [
            'story' => $story
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Story $story)
    {
        $data = $request->validate([
            'title' => ['required', 'string'],
            'slug' => ['required', 'string', "unique:stories,slug,{$story->id}"],
            'description' => ['string', 'nullable'],
            'status' => ['string', 'in:draft,published'],
            'cover' => ['image', 'nullable']
        ]);

        $data['cover'] = $request->hasFile('cover') ?
            $request->file('cover')->storePublicly() :
            $story->cover;

        $story->update($data);

        return back()->with('message', 'Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Story $story)
    {
        $story->delete();

        return back()->with('message', 'Story deleted!');
    }
}
