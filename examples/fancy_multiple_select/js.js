var fancySelect,
  Koine = Koine || {};

(document).ready(function () {
  fancySelect = new Koine.WebComponents.FancySelect(
    $("#source"),
    $("#destination"),
    $("#fancy_select"),
    jQuery
  );

  fancySelect.render();
});
