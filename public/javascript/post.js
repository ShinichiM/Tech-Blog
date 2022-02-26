async function createPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#post-content').value;
    const userId = document.querySelector('#user_id').getAttribute('value');

    const response = await fetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            content: content,
            user_id: userId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
};


document.querySelector('#create-form').addEventListener('submit', createPostHandler);