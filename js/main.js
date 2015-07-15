(function () {

  /* Smooth Scroll */

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

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

  /* Contact Form */

  var $contactForm = $('#contact-form');

  $contactForm.submit(function(e) {

    e.preventDefault();

    var errorcount = 0;

    $('input[type="text"], input[type="email"]').each(function() {
        iValue = $(this).val();
        if(iValue == '') {
            $(this).addClass('error');
            errorcount++;
        }
    });

    if(errorcount == 0) {

      $.ajax({
        url: '//formspree.io/bk@bryankveton.com',
        method: 'POST',
        data: $(this).serialize(),
        dataType: 'json',
        beforeSend: function() {
          $contactForm.append('<div class="alert alert--loading">Sending message…</div>');
        },
        success: function(data) {
          $contactForm.find('.alert--loading').hide();
          $contactForm.append('<div class="alert alert--success">Sent! I\'ll be in touch soon.</div>');
        },
        error: function(err) {
          $contactForm.find('.alert--loading').hide();
          $contactForm.append('<div class="alert alert--error">Oops, there was an error.</div>');
        }
      });

    }

  });

  $('input[type="text"], input[type="email"]').focus(function() {
     if ($(this).hasClass('error')) {
         $(this).keyup(function() {
             $(this).removeClass('error');
         });
     }
  });

})();