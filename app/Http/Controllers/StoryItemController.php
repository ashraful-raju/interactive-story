<?php

namespace App\Http\Controllers;

use App\Enums\StatusEnum;
use App\Models\Story;
use App\Models\StoryItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoryItemController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Story $story)
    {
        return Inertia::render('StoryItem/Create', [
            'story' => $story,
            'items' => $story->storyItems->map(fn($item) => [
                'label' => "$item->name - $item->title",
                'id' => $item->id
            ])->pluck('label', 'id'),
            'story_item' => new StoryItem()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Story $story, Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string'],
            'name' => ['required', 'string'],
            'slug' => ['required', 'string', 'unique:story_items'],
            'description' => ['string', 'nullable'],
            'image' => ['image', 'nullable'],
            'media' => ['nullable', 'max:1024'],
            'parent_id' => ['nullable']
        ]);

        $data['image'] = $request->hasFile('image') ?
            $request->file('image')->storePublicly() :
            null;
        $data['media'] = $request->hasFile('media') ?
            $request->file('media')->storePublicly() :
            null;

        $item = $story->storyItems()->create($data);

        if ($item->parent_id) {
            return redirect()->route('stories.items.show', [
                'story' => $story,
                'item' => $item->parent_id
            ]);
        }
        return redirect()->route('stories.show', $story->id)->with('message', 'Created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Story $story, StoryItem $item)
    {
        $item->load(['childrens', 'childrens.parent']);

        return Inertia::render('StoryItem/View', [
            'story_item' => $item,
            'story' => $story
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Story $story, StoryItem $item)
    {
        return Inertia::render('StoryItem/Create', [
            'story_item' => $item,
            'story' => $story,
            'items' => $story->storyItems->map(fn($item) => [
                'label' => "$item->name - $item->title",
                'id' => $item->id
            ])->pluck('label', 'id'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Story $story, Request $request, StoryItem $item)
    {
        $data = $request->validate([
            'title' => ['required', 'string'],
            'slug' => ['required', 'string', "unique:story_items,slug,{$item->id}"],
            'description' => ['string', 'nullable'],
            'image' => ['image', 'nullable'],
            'media' => ['nullable', 'max:1024'],
            'parent_id' => ['nullable']
        ]);

        $data['image'] = $request->hasFile('image') ?
            $request->file('image')->storePublicly() :
            null;
        $data['media'] = $request->hasFile('media') ?
            $request->file('media')->storePublicly() :
            null;

        $item->update($data);

        return back()->with('message', 'Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Story $story, StoryItem $item)
    {
        $item->delete();

        return back()->with('message', 'Story item deleted!');
    }
}
