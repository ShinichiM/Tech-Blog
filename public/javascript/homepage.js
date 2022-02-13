async function loginRedirect (event) {
    event.preventDefault();

    const response = await fetch('/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/login/');
    } else {
        alert(response.statusText);
    }
};

async function homeRedirect (event) {
    event.preventDefault();

    const response = await fetch('/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

// document.querySelector('#login').addEventListener('click', loginRedirect);
// document.querySelector('#home').addEventListener('click', homeRedirect);