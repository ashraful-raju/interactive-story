<?php

namespace App\Models;

use App\Enums\StatusEnum;
use App\Traits\Slugable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->author_id) {
                $model->author_id = Auth::id();
            }
        });
    }

    function scopePublished($query)
    {
        $query->where('status', StatusEnum::PUBLISHED);
    }

    function scopeAuthor($query)
    {
        $query->where('author_id', Auth::id());
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

    function getCoverAttribute($value)
    {
        if (str($value)->startsWith('http')) {
            return $value;
        }
        return Storage::url($value);
    }
}
