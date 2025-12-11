$user = App\Models\User::where('email', 'admin@example.com')->first();
if (!$user) {
    $user = new App\Models\User();
    $user->name = 'Admin';
    $user->email = 'admin@example.com';
}
$user->password = bcrypt('password');
$user->email_verified_at = now();
$user->save();
echo "CREDENTIALS_RESET_SUCCESS";
exit;
