async function loginFormHandler (event) {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log('logged in');
        } else {
            alert(response.statusText);
        }
    }
};

async function signupFormHandler(event) {

};

document.querySelector('#loginForm').addEventListener('submit', loginFormHandler);