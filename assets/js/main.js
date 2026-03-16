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

        $(".top-to-button").on("click", function (e) {
            e.preventDefault();
            lenis.scrollTo(0)
        });

        

        // OverlayScrollbars
        const {
            OverlayScrollbars,
            ClickScrollPlugin
        } = OverlayScrollbarsGlobal;
        // Initialize the ClickScrollPlugin
        OverlayScrollbars.plugin(ClickScrollPlugin);
        $("body").each(function () {
            OverlayScrollbars(this, {
                scrollbars: {
                    clickScroll: true,
                    autoHide: "leave",
                    dragScrolling: true,
                    clickScrolling: true,
                },
                scrollBehavior: 'smooth',
            });
        });


    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline();
    // portfolio panel
	let otherSections = document.querySelectorAll('.industry-slider-item ')

	otherSections.forEach((section, index) => {

		gsap.set(otherSections, {
			scale: 1
		});

		tl.to(section, {
			scale: .8,
			scrollTrigger: {
				trigger: section,
				pin: section,
				scrub: 1,
				start: 'top 10%',
				end: "bottom 100%",
				endTrigger: '.industry-slider-section',
				pinSpacing: false,
				markers: false,
			},
		})
	})
    
    
    


        // lenis
        // Initialize a new Lenis instance for smooth scrolling
        const lenis = new Lenis();

        // Listen for the 'scroll' event and log the event data to the console
        // lenis.on('scroll', (e) => {
        //     console.log(e);
        // });

        // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
        // This ensures Lenis's smooth scroll animation updates on each GSAP tick
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // Convert time from seconds to milliseconds
        });

        // Disable lag smoothing in GSAP to prevent any delay in scroll animations
        gsap.ticker.lagSmoothing(0);
        // lenis


	});
})(jQuery);