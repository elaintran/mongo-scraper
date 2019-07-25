//bookmark button on click
//change the fontawesome icon to filled
//change boolean to saved

$(".fa-heart").on("click", function() {
    if ($(this).attr("class") === "far fa-heart") {
        $(this).removeClass().addClass("fas fa-heart");
    } else {
        $(this).removeClass().addClass("far fa-heart");
    }
})