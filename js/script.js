(function($) {
    $.fn.menumaker = function(options) {
        var cssmenu = $(this),
            settings = $.extend({
                title: "Menu",
                format: "dropdown",
                sticky: false
            }, options);

        return this.each(function() {
            cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
            $(this).find("#menu-button").on('click', function() {
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.hide('400').removeClass('open');
                } else {
                    mainmenu.show('400').addClass('open');
                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').show();
                    }
                }
            });
            cssmenu.find('li ul').parent().addClass('has-sub');
            multiTg = function() {
                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                cssmenu.find('.submenu-button').on('click', function() {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').hide();
                    } else {
                        $(this).siblings('ul').addClass('open').show();
                    }
                });
            };

            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');

            if (settings.sticky === true) cssmenu.css('position', 'fixed');

            resizeFix = function() {
                if ($(window).width() > 768) {
                    cssmenu.find('ul').show();
                }
                if ($(window).width() <= 768) {
                    cssmenu.find('ul').hide().removeClass('open');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);

        });
    };
})(jQuery);
$(document).ready(function() {
    // Tab
    $('.tab').hide();
    $('.tab:first').show();
    $('.list-pr li:first').addClass('active');
    $('.list-pr li').click(function() {
        $('.tab').hide();
        $('.list-pr li').removeClass();
        $(this).addClass('active');
        var url = $(this).attr("data-tab");
        $(url).fadeIn();
    });
    // Menu responsive
    $("#cssmenu").menumaker({
        title: "Menu",
        format: "multitoggle"
    });
    $('#myCarousel-vacxin, #myCarousel-duocpham, #myCarousel-tpcn, #myCarousel-mypham').carousel({
	    interval: 4000
	})
});
