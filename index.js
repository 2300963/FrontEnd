// Tab Switching Logic
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

// Login Logic - Role Redirection
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const role = document.getElementById('login-role').value;
    
    if (role === 'admin') {
        window.location.href = 'admin.html';
    } else if (role === 'reader') {
        window.location.href = 'reader.html';
    } else if (role === 'bookkeeper') {
        window.location.href = 'bookkeeper.html';
    }
});

// Sign Up Logic - Password Validation
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const pass = document.getElementById('signup-password').value;
    const confirmPass = document.getElementById('signup-confirm-password').value;
    
    if (pass !== confirmPass) {
        alert("❌ Passwords do not match! Please try again.");
        return; 
    }

    alert("Account created successfully! Now try logging in.");
    switchTab('login');
});