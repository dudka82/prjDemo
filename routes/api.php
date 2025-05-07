<?php
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
Route::get('/user/{id}', [UserController::class, 'show']);
Route::post('/user', [UserController::class, 'store']);




// // Создать пользователя
// Route::post('/users', function(Request $request) {
//     return User::create($request->validate([
//         'name' => 'required',
//         'email' => 'required|email|unique:users',
//         'phone' => 'nullable'
//     ]));
// });

// // Обновить пользователя
// Route::put('/users/{id}', function(Request $request, $id) {
//     $user = User::findOrFail($id);
//     $user->update($request->validate([
//         'name' => 'sometimes|required',
//         'email' => 'sometimes|required|email|unique:users,email,'.$id,
//         'phone' => 'nullable'
//     ]));
//     return $user;
// });

// // Удалить пользователя
// Route::delete('/users/{id}', function($id) {
//     User::findOrFail($id)->delete();
//     return response()->json(['message' => 'User deleted']);
// });

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/dashboardA', [AdminController::class, 'dashboardA']);
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/searchA', [ReportController::class, 'searchA']);
});
Route::middleware(['auth.check'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
});

Route::middleware(['auth.check', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
});

Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::apiResource('users', AdminController::class);
    Route::get('roles', [AdminController::class, 'roles']);
    Route::patch('users/{user}/toggle-block', [AdminController::class, 'toggleBlock']);
});




Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    // Темы
    Route::get('/themes', [AdminController::class, 'getThemes']);
    Route::post('/themes', [AdminController::class, 'createTheme']);
    Route::put('/themes/{id}', [AdminController::class, 'updateTheme']);
    Route::delete('/themes/{id}', [AdminController::class, 'deleteTheme']);
    
    // Мероприятия
    Route::get('/meetings', [AdminController::class, 'getMeetings']);
    Route::post('/meetings', [AdminController::class, 'createMeeting']);
    Route::put('/meetings/{id}', [AdminController::class, 'updateMeeting']);
    Route::delete('/meetings/{id}', [AdminController::class, 'deleteMeeting']);
});




Route::get('/users', function () {
    return response()->json([
        'users' => User::all() // Или User::paginate(10)
    ]);
});