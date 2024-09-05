<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait Slugable
{
    /**
     * Boot the trait and automatically generate slug for the model.
     */
    protected static function bootSlugable()
    {
        static::creating(function ($model) {
            if (empty($model->slug)) {
                $model->slug = $model->generateSlug($model->{$model->getSlugSource()});
            }
        });
    }

    /**
     * Get the source attribute for generating the slug.
     * You can override this method in your model to define custom behavior.
     *
     * @return string
     */
    protected function getSlugSource()
    {
        return 'title'; // The default field to use for generating slug, can be changed per model
    }

    /**
     * Generate a unique slug for the model.
     *
     * @param string $value
     * @return string
     */
    protected function generateSlug($value)
    {
        $slug = Str::slug($value);
        $originalSlug = $slug;
        // Ensure slug is unique in the database
        while ($this->slugExists($slug)) {
            $slug = $originalSlug . '-' . Str::random(10);
        }

        return $slug;
    }

    /**
     * Check if a slug already exists in the database.
     *
     * @param string $slug
     * @return bool
     */
    protected function slugExists($slug)
    {
        return static::where('slug', $slug)->exists();
    }
}
