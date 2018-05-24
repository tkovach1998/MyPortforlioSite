
/**
 * Mobile Nav Controls
 * -------------------
 */

(function ($) {
  $.fn.notificationInit = function() {
    return this.each(function () {
      var $parent = $(this).parent();
      
      $parent.on('click', function () {
        return false;
      });
    });
  };
})(jQuery);
