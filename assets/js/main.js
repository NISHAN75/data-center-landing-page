(function ($) {
	$(document).ready(function () {
		
		// offcanvas humbarger
        let offcanvasElement = $('.header-offcanvas');
        offcanvasElement.on('show.bs.offcanvas', function () {
            $('.humbarger-btn').addClass('open');
            $('.btn-close span:nth-child(1)').css({
                transform: 'rotate(45deg)',
                marginBottom: '0'
            });
            $('.btn-close span:nth-child(2)').css({
                transform: 'rotate(-45deg)',
                marginTop: '-5px'
            });
        });
        offcanvasElement.on('hide.bs.offcanvas', function () {
            $('.humbarger-btn').removeClass('open');
            $('.btn-close span:nth-child(1)').css({
                transform: '',
                marginBottom: ''
            });
            $('.btn-close span:nth-child(2)').css({
                transform: '',
                marginTop: ''
            });
        });

		// Magnific popup
        $(document).on('click', '.trigger-popup', function (e) {
            e.preventDefault();
            $.magnificPopup.open({
                items: {
                    src: $(this).attr('href')
                },
                type: 'iframe',
                iframe: {
                    markup: '<div class="mfp-iframe-scaler">' +
                        '<div class="mfp-close"></div>' +
                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen allow="autoplay *; fullscreen *"></iframe>' +
                        '</div>',
                    patterns: {
                        youtube: {
                            index: 'youtube.com/',
                            id: function (url) {
                                var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                                if (!m || !m[1]) return null;
                                return m[1];
                            },
                            src: '//www.youtube.com/embed/%id%?autoplay=1&iframe=true'
                        },
                        vimeo: {
                            index: 'vimeo.com/',
                            id: function (url) {
                                var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                                if (!m || !m[5]) return null;
                                return m[5];
                            },
                            src: '//player.vimeo.com/video/%id%?autoplay=1'
                        }
                    }
                },
                callbacks: {
                    open: function () {
                        let iframe = jQuery('.mfp-content iframe');
                        let player = new Vimeo.Player(iframe);

                        player.on('ended', function () {
                            jQuery.magnificPopup.close();
                        });
                    },
                    close: function () {
                        let video = document.getElementById("placeholder-video");
                        if (video) {
                            video.play();
                        }
                    }
                }
            });
        });
        // nice select
        $('select').niceSelect();


	});
})(jQuery);