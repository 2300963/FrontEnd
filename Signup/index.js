// 1. Tab Switching Logic
function switchTab(tab) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginBtn = document.getElementById('login-tab-btn');
    const signupBtn = document.getElementById('signup-tab-btn');

    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        loginBtn.classList.remove('active');
        signupBtn.classList.add('active');
    }
}

// 2. Login Redirect Logic
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const role = document.getElementById('login-role').value;

    // Path logic: Go UP one level (../) then into the specific folder
    if (role === 'admin') {
        window.location.href = "../Admin/admin.html";
    } else if (role === 'bookkeeper') {
        window.location.href = "../Book Keeper/bookkeeper.html";
    } else {
        window.location.href = "../reader.html"; // reader.html is in the root
    }
});