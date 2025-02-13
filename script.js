document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // Simpan data login di localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);

    // Redirect ke dashboard
    window.location.href = 'dashboard.html';
});