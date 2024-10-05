$("nav ul li a").each(function(){
    $(this).on("click", function(){
        $("nav ul li a").removeClass("active");
        $(this).addClass("active");
        $("main").load("../pages/" + $(this).data("page") + ".html");
        $("nav ul").toggle();
    })
});

$("#menu").on("click", function(){
    $("nav ul").toggle();
});