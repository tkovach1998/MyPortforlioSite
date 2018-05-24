(function ($) {
  /**
   * Initialize Accordion
   */

  var $accordions = $('.js-accordion');
  $accordions.accordionInit();

  /**
   * Primary Nav
   */

  $('.nav--primary').meanmenu({
    meanScreenWidth: "748.8",
    meanMenuContainer: '.mobile-nav-container'
  });

  $('.js-mobile-nav, .c-hamburger').each(function () {
    var mobileExpand = $(this).data('mobile-control');
    $( '.' + mobileExpand ).addClass('mobile-expandable');
  });

  $('.js-mobile-nav, .c-hamburger').on('click', function () {

    var mobileExpand = $(this).data('mobile-control');
    var $this_expandable = $( '.' + mobileExpand );
    var $all_expandables = $('.mobile-expandable');

    this.classList.toggle('is-active');

    if($(this).hasClass('c-hamburger')) {
      if ($(".js-mobile-nav").hasClass('is-active') && $(".utility-search").is(":visible")) {
        $(".js-mobile-nav").removeClass("is-active");
      }
    }

    if($(this).hasClass('js-mobile-nav')) {
      if ($(".c-hamburger").hasClass('is-active') && $(".mean-nav").is(":visible")) {
        $(".c-hamburger").removeClass("is-active");
      }
    }

    $all_expandables.slideUp();

    if ( ! $this_expandable.is( ':visible' )) {
      $this_expandable.slideDown();
    } else {
      $this_expandable.slideUp();
    }
  });



  /*
   * Initializing Video Popup
   *
   */

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });


  //Smooth Scrolling
  // Select all links with hashes
var page = $("html, body");
$('.main-nav-item')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }

      page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
        page.stop();
      });

    }
    return false;
  });
// to top right away
if ( window.location.hash ) scroll(0,0);
// void some browsers issue
setTimeout( function() { scroll(0,0); }, 1);
if(window.location.hash) {

  // smooth scroll to the anchor id
  $('html, body').animate({
      scrollTop: $(window.location.hash).offset().top-75
  }, 1000);
}


  /**
   * Universal Function
   * Google Tag Manager to push to dataLayer
   * If virtualPage is true (is one page site section) then push information
   * If virtualPage is false (is not one page site) then push location
   * Most is explicitly set in Google Tag Manager
   */
  function googleTagManager(url, title, location, virtualPage) {
    if (virtualPage) {
        dataLayer.push(
            {
                event: 'VirtualPageview',
                virtualPageURL: url,
                virtualPageTitle: title,
                virtualPageLocation: location
            },
            {
                event: location
            }
        );
    } else {
        dataLayer.push(
            {
                event: location
            }
        );
    }
  }

  /* Equal Height Controls */
  var equalheight = function(container){
    var currentTallest = 0,
       currentRowStart = 0,
       rowDivs = new Array(),
       $el,
       topPosition = 0;
    $(container).each(function() {

      $el = $(this);
      $($el).height('auto')
      topPostion = $el.position().top;

      if (currentRowStart != topPostion) {
       for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
         rowDivs[currentDiv].height(currentTallest);
       }
       rowDivs.length = 0; // empty the array
       currentRowStart = topPostion;
       currentTallest = $el.height();
       rowDivs.push($el);
      } else {
       rowDivs.push($el);
       currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
      }
      for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
        rowDivs[currentDiv].height(currentTallest);
      }
    });
  }



/**
* Contact Form Modal 
*
*/



/**
 * Form Submission 
 *
 */




})(jQuery);
/*
$(window).load(function() {
});

$(window).resize(function(){
});
*/
