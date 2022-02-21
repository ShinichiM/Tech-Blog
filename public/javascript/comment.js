
$(document).ready((event) => {
  $("*#post").click(function () {
    var state = $(this).find("#comment").attr("state");
    console.log(state);
    if (state === "off") {
      $(this).find("#comment").removeClass("hidden").addClass("visible");
      $(this).find("#comment").attr("state", "on");
    } else {
      $(this).find("#comment").removeClass("visible").addClass("hidden");
      $(this).find("#comment").attr("state", "off");
    }
  });
});