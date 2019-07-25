//bookmark button on click
//change the fontawesome icon to filled
//change boolean to saved

$(".scrape").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function() {
        location.reload();
    })
})

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
    })
})

$(".comments").on("click", function() {
    var articleId = $(this).attr("data-id");
    $(".submit-comment").attr("data-id", articleId);
})

document.documentElement.addEventListener("click", function(e) {
    console.log(e.target);
  });