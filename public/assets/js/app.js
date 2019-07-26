$(document).ready(function() {
    function checkArticles() {
        if ($(".article-list").text().trim() === "") {
            var errorMessage = $("<h3>").addClass("error-message mt-3").text("Sorry! Looks like there's no articles available!");            
            $(".article-list").append(errorMessage);
        }
    }
    checkArticles();

    //scrapes the webpage for the newest article and displays on the page
    $(".scrape").on("click", function() {
        $.ajax({
            method: "GET",
            url: "/scrape"
        }).then(function() {
            //go back to root regardless of path location
            window.location.replace("/");
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
        $(".comment-list").empty();
        
        $.ajax({
            method: "GET",
            url: "/articles/" + articleId
        }).then(function(data) {
            if (data.comment.length > 0) {
                for (var i = 0; i < data.comment.length; i++) {
                    //appends all comments from a specific article onto modal
                        var name = $("<p>").addClass("poster-name").text(data.comment[i].name);
                        var comment = $("<p>").addClass("poster-comment").text(data.comment[i].body);
                        $(".comment-list").append(name).append(comment);
                }
            //if no comments available
            } else {
                var noComments = $("<p>").text("No comments available.");
                $(".comment-list").append(noComments);
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
});