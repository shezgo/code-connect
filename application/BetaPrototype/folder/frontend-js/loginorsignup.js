document.getElementById('forgotPasswordForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    try {
        const response = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });
        const result = await response.text();
        alert(result);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending the password reset email.');
    }
});
async function signinUser() {
    // Get password and email values from their html element
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;

    // Make a post request to backend /api/auth/login with json body email and password
    try {
        const requestOptions = {
            method: "POST",
            headers: {
                // Content Type must be application/json so the middleware will parese it
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        };
        const response = await fetch("/api/auth/login", requestOptions);
        // If fetch response code is not successfull
        if (!response.ok) {
            const error = response.json().error;
            console.log(error);
            return false;
        }
        console.log("login in successful");
        // if login successfull redirect to /about
        window.location.href = '/application/BetaPrototype/folder/frontend-html/home/homepage.html';
        return true;
    }
    catch (error) {
        console.error("Failed at signing in user, Error: ", error);
    }

    return true;
}
document.getElementById('reset-password-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    try {
        const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token, password: password })
        });
        const result = await response.text();
        alert(result);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while resetting the password.');
    }
});