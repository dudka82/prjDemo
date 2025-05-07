<?php
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ThemesController;
use App\Http\Controllers\MeetingsController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\SearchController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\CheckPermission;
use App\Models\User;
use App\Models\Meeting;
use App\Models\Theme;
use App\Models\AddedMeeting;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'users' => User::all(),
        'stats' => [
            'total_users' => User::count(),
            'latest_users' => User::orderBy('created_at', 'desc')->take(5)->get()
        ]
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/categories', function () {
    return Inertia::render('Categories');
})->middleware(['auth', 'verified'])->name('categories');


Route::get('/search', function () {
    return Inertia::render('Search');
})->middleware(['auth', 'verified'])->name('search');



// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });
// // Route::get('/users', function() {
// //     return User::select('id', 'name', 'email')->get();
// // });



Route::resource('themes',ThemesController::class);
Route::resource('meetings',MeetingsController::class);
Route::resource('welcome', WelcomeController::class);
Route::resource('category', CategoriesController::class);
Route::resource('searches', SearchController::class);


Route::middleware('auth')->group(function () {
    Route::post('/meetings/book', [MeetingsController::class, 'book'])->name('meetings.book');
    Route::post('/meetings/cancel', [MeetingsController::class, 'cancel'])->name('meetings.cancel');
});


// Route::middleware(['auth.check'])->group(function () {
//     Route::get('/profile', [ProfileController::class, 'show']);
// });

Route::prefix('admin')->middleware(['auth', AdminMiddleware::class])->group(function () {
    Route::resource('meetings', MeetingsController::class);
});

Route::middleware(['auth.check', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
});


//для управления meetings, для админа 

Route::middleware(['auth', 'can:admin'])->group(function () {
    Route::get('/meetings/create', [MeetingsController::class, 'create']);
    Route::post('/meetings', [MeetingsController::class, 'store']);
    Route::get('/meetings/{meeting}/edit', [MeetingsController::class, 'edit']);
    Route::put('/meetings/{meeting}', [MeetingsController::class, 'update']);
    Route::delete('/meetings/{meeting}', [MeetingsController::class, 'destroy']);
});

Route::get('/meetings', [MeetingsController::class, 'index']);
Route::get('/meetings/{meeting}', [MeetingsController::class, 'show']);



//для управления themes, для админа 

Route::middleware(['auth'])->group(function () {
    // Для администраторов
    Route::middleware(['admin'])->group(function () {
        Route::resource('themes', ThemesController::class)->except(['index', 'show']);
    });
    
    // Общедоступные маршруты
    Route::get('/themes', [ThemesController::class, 'index'])->name('themes.index');
    Route::get('/themes/{theme}', [ThemesController::class, 'show'])->name('themes.show');
});

//добавление в таблиццу added_meetings
// Route::post('/get-user-meetings', function (Request $request) {
//     // Валидация входных данных
//     $validated = $request->validate([
//         'user_id' => 'required|integer|exists:users,id'
//     ]);

//     try {
//         // Получаем мероприятия пользователя
//         $meetings = DB::table('added_meetings')
//             ->join('meetings', 'added_meetings.meetings_id', '=', 'meetings.id')
//             ->where('added_meetings.users_id', $validated['user_id'])
//             ->select(
//                 'meetings.id',
//                 'meetings.name',
//                 'meetings.place',
//                 'meetings.date',
//                 'meetings.time',
//                 'meetings.description',
//                 'meetings.available_seats'
//             )
//             ->orderBy('meetings.date')
//             ->orderBy('meetings.time')
//             ->get();

//         return response()->json([
//             'success' => true,
//             'meetings' => $meetings
//         ]);

//     } catch (\Exception $e) {
//         return response()->json([
//             'success' => false,
//             'message' => 'Ошибка при получении мероприятий: ' . $e->getMessage()
//         ], 500);
// //     }
// })->middleware('web');



//проверка работоспособности
// Route::get('/test-meetings', function() {
//     return response()->json([
//         'success' => true,
//         'meetings' => [
//             [
//                 'id' => 1,
//                 'name' => 'Тестовое мероприятие',
//                 'place' => 'Тестовая локация',
//                 'date' => now()->format('Y-m-d'),
//                 'time' => '14:00',
//                 'description' => 'Пример описания'
//             ]
//         ]
//     ]);
// });

require __DIR__.'/auth.php';
