$(".scrape").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function() {
        location.reload();
    });
});

$(".fa-heart").on("click", function() {
    var savedState = {};
    var id = $(this).attr("data-id");
    if ($(this).attr("class") === "far fa-heart") {
        $(this).removeClass().addClass("fas fa-heart colored-heart");
        savedState.saved = true;
    } else {
        $(this).removeClass().addClass("far fa-heart");
        savedState.saved = false;
    }
    $.ajax({
        method: "PUT",
        url: "/articles/" + id,
        data: savedState
    }).then(function() {
        location.reload();
    });
});

$(".comments").on("click", function() {
    var articleId = $(this).attr("data-id");
    $(".comment-form").attr("data-id", articleId);
    $.ajax({
        method: "GET",
        url: "/articles/" + articleId
    }).then(function(data) {
        for (var i = 0; i < data.comment.length; i++) {
            var name = $("<p>").addClass("poster-name").text(data.comment[i].name);
            var comment = $("<p>").addClass("poster-comment").text(data.comment[i].body);
            $(".comment-list").append(name).append(comment);
        }
    });
})

$(".comment-form").on("submit", function() {
    var id = $(this).attr("data-id");
    var comments = {};
    comments.name = $(".name").val().trim();
    comments.body = $(".comment-box").val().trim();

    $.ajax({
        method: "POST",
        url: "/articles/" + id,
        data: comments
    }).then(function() {
        location.reload();
    });
});