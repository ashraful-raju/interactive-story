<?php

namespace App\Models;

use App\Traits\Slugable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StoryItem extends Model
{
    use HasFactory, Slugable;

    protected $fillable = [
        'story_id',
        'parent_id',
        'name',
        'title',
        'slug',
        'description',
        'image',
        'media'
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['childrens'];

    function story(): BelongsTo
    {
        return $this->belongsTo(Story::class);
    }

    function childrens(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }
}
