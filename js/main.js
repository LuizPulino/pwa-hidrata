let page = getPageCookie();
function getPageCookie(){
    let cookies = document.cookie.split(";");
    for(let i = 0; i < cookies.length; i++){
        let cookie = cookies[i].split("=");
        if(cookie[0] === "page"){
            return cookie[1];
        }
    }
    return "home";
}
function setPageCookie(page){
    let content = "page=" + page;
    let date = new Date();
    date.setMonth(date.getMonth() + 1);
    let expires = "expires=" + date.toUTCString();
    document.cookie = content + ";" + expires;
}

loadPage(page);

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
        let page = $(this).data("page");
        loadPage(page);
        setPageCookie(page);        
        if(mobile){
            $("nav ul").toggle();
        }
    })
});

function loadPage(page){
    $("nav ul li a").removeClass("active");
    $("[data-page=" + page + "]").addClass("active");
    $("main").load("../pages/" + page + ".html");
    
}

$("#menu").on("click", function(){
    $("nav ul").toggle();
});