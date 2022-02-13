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

async function signupRedirect(event) {
    event.preventDefault();
    console.log('clicked')
    document.location.replace('/signup');
    const response = await fetch('/signup', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/login')
    } else {
        alert(response.statusText);
    };
};

async function signupFormHandler(event) {

};

document.querySelector('#loginForm').addEventListener('submit', loginFormHandler);
document.querySelector('#signup').addEventListener('click', signupRedirect);