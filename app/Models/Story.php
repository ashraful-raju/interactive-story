<?php

namespace App\Models;

use App\Enums\StatusEnum;
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
        'cover'
    ];

    function scopePublished($query)
    {
        $query->where('status', StatusEnum::PUBLISHED);
    }

    function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    function startingItems()
    {
        return $this->storyItems()->whereNull('parent_id');
    }

    function storyItems()
    {
        return $this->hasMany(StoryItem::class);
    }
}
