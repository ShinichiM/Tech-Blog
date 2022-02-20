async function postClickHandler(event) {
    event.preventDefault();

    console.log('Yo you clicked me');
    const state = document.querySelector('#comment').getAttribute('state');
    if (state === 'off') {
        document.querySelector('#comment').setAttribute('class', 'visible');
        document.querySelector('#comment').setAttribute('state', 'on');
    } else {
        document.querySelector('#comment').setAttribute('class', 'hidden'); 
        document.querySelector('#comment').setAttribute('state', 'off');
    }
}

document.querySelectorAll('#post').forEach(item => {
    item.addEventListener('click', postClickHandler) 
});