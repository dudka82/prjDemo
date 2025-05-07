<?php
namespace App\Policies;

use App\Models\User;
use App\Models\Meeting;
use Illuminate\Auth\Access\HandlesAuthorization;

class MeetingPolicy
{
    public function create(User $user)
    {
        return $user->role === 'admin';
    }

    public function update(User $user, Meeting $meeting)
    {
        return $user->role === 'admin';
    }

    public function delete(User $user, Meeting $meeting)
    {
        return $user->role === 'admin';
    }
}