$(document).ready((event) => {
    $('*#post').click(function() {
        // console.log('test')
        var id = "comment-" + $(this).attr("post-id");
        var state =$(`#${id}`).attr('state');
        if (state === 'off') {
            $(`#${id}`).removeClass('hidden').addClass('visible');
            $(`#${id}`).attr('state', 'on')
        } else {
            $(`#${id}`).removeClass('visible').addClass('hidden');
            $(`#${id}`).attr('state', 'off')
        }
    })
})