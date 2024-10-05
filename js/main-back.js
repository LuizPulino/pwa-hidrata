$("main").load("../pages/home.html");

const mobile = navigator.userAgent.includes("Mobile");

if(mobile){
    $("nav ul").css("position", "absolute");
    $("nav ul").css("top", "0");
    $("nav ul").css("background", "#DDD");
    $("nav ul").css("z-index",2);
    $("nav ul").css("padding",".5em");
}

$("nav ul li a").each(function(){
    $(this).on("click", function(){
        $("nav ul li a").removeClass("active");
        $(this).addClass("active");
        $("main").load("../pages/" + $(this).data("page") + ".html");
        if(mobile){
            $("nav ul").toggle();
        }
    })
});

$("#menu").on("click", function(){
    $("nav ul").toggle();
});