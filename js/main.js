$("document").ready(function() {

  $(".trigger").click(function(e) {
    e.preventDefault();
    $("#email").removeClass("closed");
  });

  $("#email").click(function(e) {
    e.preventDefault();
    $("#email").addClass("closed");
  });

});