function getUtmParamByName(utmname, valueForOrganic) {
    var utmname = utmname.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + utmname + "=([^&#]*)");
    var results = regex.exec(location.search);
    var value  = results === null ? valueForOrganic : decodeURIComponent(results[1].replace(/\+/g, " "));
    return value ? value : valueForOrganic;
}

if (window.localStorage) {
    window.__practo__insta_utm = JSON.parse(localStorage.getItem("__practo__insta_utm"));
    if (!window.__practo__insta_utm) {
        window.__practo__insta_utm = {
            "utm_source" : getUtmParamByName("utm_source", "organic"),
            "utm_medium" : getUtmParamByName("utm_medium", "organic"),
            "utm_campaign" : getUtmParamByName("utm_campaign", ""),
            "utm_content" : getUtmParamByName("utm_content", ""),
            "utm_term" : getUtmParamByName("utm_term", ""),
        }
        localStorage.setItem("__practo__insta_utm", JSON.stringify(window.__practo__insta_utm));
    }
} else {
    window.__practo__insta_utm = {
        "utm_source" : getUtmParamByName("utm_source", "organic"),
        "utm_medium" : getUtmParamByName("utm_medium", "organic"),
        "utm_campaign" : getUtmParamByName("utm_campaign", ""),
        "utm_content" : getUtmParamByName("utm_content", ""),
        "utm_term" : getUtmParamByName("utm_term", ""),
    }
}

$(function() {

    $('body').on('click', '.requestademo_link', function(e) {
        e.preventDefault();
        window.location.replace('contact_us.html?req=Free Demo');
    });
    $('body').on('click', '.businessenquiry_link', function(e) {
        e.preventDefault();
        window.location.replace('contact_us.html?req=Business Enquiry');
    });

    $(window).scroll(function() {
        if ($(window).scrollTop() >= 100) {
            $("header").addClass("fixed");
            $(".top_header").addClass("fixed");
            $(".wrapper").addClass("fixed");
        } else {
            $("header").removeClass("fixed");
            $(".top_header").removeClass("fixed");
            $(".wrapper").removeClass("fixed");
        }
    });

    $('.banner_slider').bxSlider({
        auto: true,
        pause: 5000
    });

    $('.clients_sider').bxSlider({
        pager: false,
        minSlides: 1,
        maxSlides: 5,
        slideWidth: 230,
        slideMargin: 0
    });

    $('.testimonials_slider').bxSlider({
        pager: false,
        minSlides: 1,
        maxSlides: 2,
        slideWidth: 570,
        slideMargin: 0
    });

    /*$("#location_india").click(function(){
			$(".firsttab").show();
			$(".secondtab").hide();			
   		 $("#location_india").addClass('active');
   		 $("#location_international").removeClass('active');
	});
	
	$("#location_international").click(function(){
			$(".firsttab").hide();
			$(".secondtab").show();			
   		 $("#location_india").removeClass('active');
   		 $("#location_international").addClass('active');
	});*/

    $('.interfaces_listslider').bxSlider({
        minSlides: 1,
        maxSlides: 7,
        slideWidth: 160,
        slideMargin: 0,
        moveSlides: 1,
        infiniteLoop: false
    });

    $(".loadmore_btn").click(function() {
        var thisid = $(this).attr("id");
        if (thisid != "hideless") {
            $(this).attr("id", "hideless");
            $(this).html("Less");
            $(this).parents(".loadmore_infolist").find(".loadmore_info").toggle();
        } else {
            $(this).attr("id", " ");
            $(this).html("Load More");
            $(this).parents(".loadmore_infolist").find(".loadmore_info").toggle();
        }
    });

    if (document.getElementById("clientsTab")) {
        $('#clientsTab').easyResponsiveTabs({
            type: 'default', //Types: default, vertical, accordion           
            width: 'auto', //auto or any width like 600px
            fit: true, // 100% fit in a container
            closed: 'accordion', // Start closed if in accordion view
            activate: function(event) { // Callback function if tab is switched
                var $tab = $(this);
                var $info = $('#tabInfo');
                var $name = $('span', $info);
                $name.text($tab.text());
                $info.show();
            }
        });
    }

    if (document.getElementById("horizontalTab")) {
        $('#horizontalTab').easyResponsiveTabs({
            type: 'default', //Types: default, vertical, accordion           
            width: 'auto', //auto or any width like 600px
            fit: true, // 100% fit in a container
            closed: 'accordion', // Start closed if in accordion view
            activate: function(event) { // Callback function if tab is switched
                var $tab = $(this);
                var $info = $('#tabInfo');
                var $name = $('span', $info);
                $name.text($tab.text());
                $info.show();
            }
        });
    }

    $(".faq_list h4").click(function() {
        var thisclass = $(this).attr("class");

        if (thisclass != "active") {
            $(".faq_list h4").removeClass("active");
            $(this).attr("class", "active");
            $(".faq_list .faq_cnt").hide();
            $(this).parent(".faq_list").find(".faq_cnt").slideDown();
        } else {
            $(this).removeClass("active");
            $(this).parent(".faq_list").find(".faq_cnt").slideUp();
        }
    });

    if (document.getElementById("enquire_form_wufoo")) {
        var wufoo_lead_source = [];
        Object.keys(window.__practo__insta_utm).forEach(function(key) {
            if (!window.__practo__insta_utm[key]) {
                return;
            }
            wufoo_lead_source.push(key.replace("utm_","") + " - " + window.__practo__insta_utm[key]); 
        });
        $('#enquire_form_wufoo').attr("src", "https://practoray.wufoo.com/embed/s7xriz04ilj10/def/Field23=" + encodeURIComponent(wufoo_lead_source.join(", ")));
    }
});
