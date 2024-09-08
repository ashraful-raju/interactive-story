<?php

namespace Database\Seeders;

use App\Models\Story;
use App\Models\StoryItem;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();
        // dd($user);

        Story::factory(10)
            ->create(['author_id' => $user->id])
            ->each(function ($item) {
                $items = StoryItem::factory(2)->create([
                    'story_id' => $item->id
                ]);

                $items->each(function ($child) use ($item) {
                    StoryItem::factory(2)->create([
                        'story_id' => $item->id,
                        'parent_id' => $child->id
                    ]);
                });
            });
    }
}
