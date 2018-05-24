
/**
 * Accordion Plugin
 * ----------------
 */

(function ($) {
  $.fn.accordionInit = function() {
    return this.each(function () {
      var $this_accordionGroups = $(this).find('.accordion-group');
      var $this_accordionHeadings = $(this).find( '.accordion-heading' );

      $this_accordionHeadings.on('click', function () {
        $current_group = $(this).parent();

        if ( $current_group.hasClass( 'is-active' )) {
          $current_group.removeClass('is-active');

        } else {
          $this_accordionGroups.removeClass('is-active');
          $current_group.addClass('is-active');
        }


        return false;
      });
    });
  };
})(jQuery);
