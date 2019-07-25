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
    if ($(this).attr("class") === "far fa-heart") {
        $(this).removeClass().addClass("fas fa-heart colored-heart");
    } else {
        $(this).removeClass().addClass("far fa-heart");
    }
})