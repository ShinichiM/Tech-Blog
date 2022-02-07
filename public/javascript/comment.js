async function postClickHandler(event) {
    event.preventDefault();

    console.log('Yo you clicked me');
}

document.querySelectorAll('#post-title').forEach(item => {
    item.addEventListener('click', postClickHandler) 
});