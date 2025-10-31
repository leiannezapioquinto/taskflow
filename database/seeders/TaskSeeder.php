<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use App\Models\Category;
use Carbon\Carbon;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();

        $tasks = [
            ['title' => 'Finish project report', 'description' => 'Complete and submit the final project report.', 'priority' => 'high'],
            ['title' => 'Workout session', 'description' => 'Attend the gym for a 1-hour cardio workout.', 'priority' => 'medium'],
            ['title' => 'Buy groceries', 'description' => 'Milk, eggs, bread, fruits, and vegetables.', 'priority' => 'low'],
            ['title' => 'Call Mom', 'description' => 'Catch up with Mom this weekend.', 'priority' => 'medium'],
            ['title' => 'Team meeting', 'description' => 'Weekly update meeting with team members.', 'priority' => 'high'],
            ['title' => 'Read a book', 'description' => 'Read at least 30 pages of a new book.', 'priority' => 'low'],
            ['title' => 'Learn React basics', 'description' => 'Go through tutorials and practice components.', 'priority' => 'medium'],
            ['title' => 'Doctor appointment', 'description' => 'Annual check-up at the clinic.', 'priority' => 'high'],
            ['title' => 'Plan weekend trip', 'description' => 'Research places and make bookings.', 'priority' => 'low'],
            ['title' => 'Organize workspace', 'description' => 'Clean up desk and files for a fresh start.', 'priority' => 'medium'],
        ];

        foreach ($tasks as $task) {
            Task::create([
                'title' => $task['title'],
                'description' => $task['description'],
                'priority' => $task['priority'],
                'due_date' => Carbon::now()->addDays(rand(1, 14)),
                'category_id' => $categories->random()->id,
            ]);
        }
    }
}
