$(document).ready(function () {
    var loading = false;
    var viewedUrls = [];
    var upcomingUrls = [];
  
    $(".post-body .cis_link").each(function() {
        let url = $(this).attr("href");
        if((jQuery.inArray( url, upcomingUrls ) < 0) && (jQuery.inArray( url, viewedUrls ) < 0)){
            upcomingUrls.push(url);
        }
    });

    var data = $(".cis_script").text();
        data = eval(data);
    jQuery.each(data, function (key, value) {
        let url = value['url'].split('amp');
            url = url[url.length-2];
        upcomingUrls.push(url);
    });
    
    $('.post').append('<a class="currentHash d-none" href="'+window.location.href+'"></a>');
    viewedUrls.push(window.location.href);

    $(window).scroll(function () {
        if (!loading && ($(window).scrollTop() + $(window).height() > ($(document).height()) * 0.75)) {
            loading=true;
  
            // console.log('viewedUrls '+viewedUrls);
            // console.log('upcomingUrls '+upcomingUrls);
  
            // take the next upcoming URL and show
            let nextUrl = upcomingUrls.shift();
  
            if (nextUrl) {
                $.get((nextUrl),
                function (content) {
                    $('.posts-section').append($(content).find('.post').append('<a class="currentHash d-none" href="'+nextUrl+'"></a>'));
                    loading=false;
                    $('.post-footer').hide();
                    
                    $(content).find(".cis_link").each(function() {
                        let url = $(this).attr("href");
                        if((jQuery.inArray( url, upcomingUrls ) < 0) && (jQuery.inArray( url, viewedUrls ) < 0)){
                            upcomingUrls.push(url);
                        }
                    });

                    let data1 = $(content).find(".cis_script").text();
                        data1 = eval(data1);

                    jQuery.each(data1, function (key, value) {
                        let url = value['url'].split('amp');
                            url = url[url.length-2];
                        if((jQuery.inArray( url, upcomingUrls ) < 0) && (jQuery.inArray( url, viewedUrls ) < 0)){
                            upcomingUrls.push(url);
                        }
                    });
    
                    tocbot.init({
                        tocSelector: '.posts-section article:last-of-type .toc',
                        contentSelector: '.posts-section article:last-of-type .post-wrap',
                        hasInnerContainers: true
                    });
                });
    
                if(jQuery.inArray( nextUrl, viewedUrls ) < 0){
                    viewedUrls.push(nextUrl);
                }
            }
        }
    });
});

$(function () {
    var currentHash = "";
    $(document).scroll(function () {
        $('.currentHash').each(function () {
            var parent = $(this).parent();
            var top = window.pageYOffset;
            var distance = top - parent.offset().top;
            var hash = $(this).attr('href');
            
            // console.log('hash_link '+hash);
            
            if (distance < 30 && distance > -30 && currentHash != hash) {
                // alert(hash);
                // window.location.hash = (hash);
                window.history.pushState("data","Title",hash);
                document.title = parent.find('.post-title').text();
                currentHash = hash;
            }
        });
    });
});



// $(document).ready(function () {
//     var loading = false;
//     var page = $('footer.post-footer a:last').attr('href');
//     var urlblog = window.location.origin;
//     $(window).scroll(function () {
//         if (!loading && ($(window).scrollTop() + $(window).height() > ($(document).height()) * 0.75)) {
//             loading=true;
//             var nextPage = urlblog + page;
//             $.get((nextPage),
//                 function (content) {
//                     if (page) {
//                         $('.posts-section').append($(content).find(".post"));
//                         page = $('footer.post-footer:last a:last').attr('href');
//                         loading=false;
//                         $('footer .prev-next').hide();
//                     }
//                 });
//         }
//     });
// });