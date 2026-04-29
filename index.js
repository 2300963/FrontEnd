// Tab Switching Logic (Keep this from before)
function switchTab(type) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const btns = document.querySelectorAll('.tab-btn');

    if (type === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        btns[0].classList.add('active');
        btns[1].classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        btns[0].classList.remove('active');
        btns[1].classList.add('active');
    }
}

// Updated Login Logic - THIS IS WHERE THE REDIRECTION HAPPENS
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Capture the role selected in the dropdown
    const role = document.getElementById('login-role').value;
    
    // Redirect based on role
    if (role === 'admin') {
        window.location.href = 'admin.html';
    } else if (role === 'reader') {
        window.location.href = 'reader.html';
    } else if (role === 'bookkeeper') {
        window.location.href = 'bookkeeper.html';
    }
});

// Sign Up Logic
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Account created successfully! Now try logging in.");
    switchTab('login');
});