$(document).ready((event) => {
  $("*#post").click(function () {
    var id = "comment-" + $(this).attr("post-id");
    // console.log(id);
    var state = $(`#${id}`).attr("state");
    if (state === "off") {
      $(`#${id}`).removeClass("hidden").addClass("visible");
      $(`#${id}`).attr("state", "on");
    } else {
      $(`#${id}`).removeClass("visible").addClass("hidden");
      $(`#${id}`).attr("state", "off");
    }

    $("*#comment-form").submit(function (event) {
      event.preventDefault();
      console.log("--------------", $(this).children());
      var commentText = $(this).children()[1].value;
      var userId = $(this).children()[2].value;
      var postId = $(this).children()[3].value;

      fetch("/api/comments", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment_text: commentText,
          user_id: userId,
          post_id: postId,
        }),
      })
        .then(() => {
        window.location.href = window.location.origin + "/";
      })
        .catch(err => console.log(err));
    });
  });
});

$(document).ready((event) => {
  $("*#login-comment").click(function () {
    document.location.replace("/login");
  });
});
