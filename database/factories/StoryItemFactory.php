<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StoryItem>
 */
class StoryItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Option: ' . fake()->sentence(2),
            'title' => fake()->sentence(),
            'slug' => fake()->slug(),
            'description' => fake()->paragraph(),
            'image' => fake()->imageUrl()
        ];
    }
}
