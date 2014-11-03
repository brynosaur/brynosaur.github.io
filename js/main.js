(function () {
  var THRESHOLD_BOTTOM = 150;
  var THRESHOLD_TOP = 150;

  var setActive = function($els, height) {
    $els.each(function() {
      var $el = $(this);
      var offset = $el.offset().top - $(window).scrollTop();

      $el.addClass('active', (offset + THRESHOLD_BOTTOM < height &&
        offset - THRESHOLD_TOP > 0));
    });
  };

  $(function() {
    var $els = $('.project');
    var height = $(window).height();

    setActive($els, height);

    $(document).on('scroll', _.throttle(function(e) {
      setActive($els, height);
    }, 100));
  });

})();