<?php

namespace App\Models;

use App\Traits\Slugable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    use HasFactory, Slugable;

    protected $fillable = [
        'author_id',
        'title',
        'slug',
        'description',
        'status',
        'begin_story',
        'cover'
    ];

    function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    function startStory()
    {
        return $this->hasOne(StoryItem::class, 'begin_story');
    }

    function storyItems()
    {
        return $this->hasMany(StoryItem::class);
    }
}
