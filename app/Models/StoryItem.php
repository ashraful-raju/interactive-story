<?php

namespace App\Models;

use App\Traits\Slugable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoryItem extends Model
{
    use HasFactory, Slugable;

    protected $fillable = [
        'story_id',
        'parent_id',
        'title',
        'slug',
        'description',
        'image',
        'media'
    ];

    function story()
    {
        return $this->belongsTo(Story::class);
    }

    function childrens()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }
}
