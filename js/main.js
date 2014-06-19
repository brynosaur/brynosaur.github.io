$("document").ready(function() {

  $(".trigger").click(function(e) {
    e.preventDefault();
    $(".email").removeClass("closed");
  });

  $(".close").click(function(e) {
    e.preventDefault();
    $(".email").addClass("closed");
  });

});