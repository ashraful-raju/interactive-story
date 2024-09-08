<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Story;
use App\Models\StoryItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoryController extends Controller
{
    function index()
    {
        $stories = Story::published()->latest()->get();

        return Inertia::render('Web/Index', [
            'stories' => $stories
        ]);
    }

    function show(Story $story)
    {
        $story->load('startingItems', 'author');

        return Inertia::render('Web/Show', compact('story'));
    }

    function browse(Story $story, $item)
    {
        $item = StoryItem::where(['slug' => $item])->firstOrFail();
        $item->load(['childrens', 'parent']);
        return Inertia::render('Web/Chapter', compact('story', 'item'));
    }
}
