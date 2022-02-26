// $(document).ready((event) => {
//     $('*#post').click(function() {
//         // console.log('test')
//         var id = "comment-" + $(this).attr("post-id");
//         var state =$(`#${id}`).attr('state');
//         if (state === 'off') {
//             $(`#${id}`).removeClass('hidden').addClass('visible');
//             $(`#${id}`).attr('state', 'on')
//         } else {
//             $(`#${id}`).removeClass('visible').addClass('hidden');
//             $(`#${id}`).attr('state', 'off')
//         }
//     })
// })

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
    });
    $('*#edit-form').submit(function(event) {
        event.preventDefault();

        // console.log($(this).children());
        const postId = $(this).children()[4].value;
        const title = $(this).children()[1].value;
        const content = $(this).children()[3].value;
        console.log(postId, title, content);

        fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: title,
                content: content
            }),
            headers: {
                'Content-Type':'application/json'
            }
        })
            .then(() => {
                document.location.reload();
            })
            .catch(err => res.status(500).json(err)); 
    });

    $('*#post-delete').click(function(event) {
        event.preventDefault();
        const postId = $(this)[0].value;
        fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((dbResponse) => {
                document.location.reload();
                res.json(dbResponse);
            })
            .catch(err => res.status(500).json(err));
    });

    // $('#create-post').click(function(event) {

    // })
})
