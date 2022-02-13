async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
    
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        console.log('User created')
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#loginForm').addEventListener('submit', signupFormHandler);