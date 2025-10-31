<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Work', 'description' => 'Tasks related to work and career.'],
            ['name' => 'Personal', 'description' => 'Personal errands or goals.'],
            ['name' => 'Health', 'description' => 'Wellness, fitness, and health-related tasks.'],
            ['name' => 'Learning', 'description' => 'Study and self-improvement goals.'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
