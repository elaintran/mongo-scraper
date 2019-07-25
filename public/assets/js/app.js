//scrapes the webpage for the newest article and displays on the page
$(".scrape").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function() {
        //might change this since if one favorites page and clicked on scrape,
        //need to go back to index
        location.reload();
    });
});

//toggle between favorite and unfavorite
$(".fa-heart").on("click", function() {
    var savedState = {};
    var id = $(this).attr("data-id");
    //changes between filled heart and empty heart
    if ($(this).attr("class") === "far fa-heart") {
        $(this).removeClass().addClass("fas fa-heart colored-heart");
        savedState.saved = true;
    } else {
        $(this).removeClass().addClass("far fa-heart");
        savedState.saved = false;
    }
    //updates new saved state in database
    $.ajax({
        method: "PUT",
        url: "/articles/" + id,
        data: savedState
    }).then(function() {
        location.reload();
    });
});

//pointer-event for comment icon and comment number is set to false to prevent misclicking
$(".comments").on("click", function() {
    var articleId = $(this).attr("data-id");
    $(".comment-form").attr("data-id", articleId);
    
    $.ajax({
        method: "GET",
        url: "/articles/" + articleId
    }).then(function(data) {
        for (var i = 0; i < data.comment.length; i++) {
            //appends all comments from a specific article onto modal
            if (data.comment.length > 0) {
                var name = $("<p>").addClass("poster-name").text(data.comment[i].name);
                var comment = $("<p>").addClass("poster-comment").text(data.comment[i].body);
                $(".comment-list").append(name).append(comment);
            //if no comments available
            } else {
                $(".comment-list").append("No comments available.");
            }
        }
    });
});

//add new comment to the database
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