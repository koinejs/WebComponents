var fancySelect, source, destination, container;
var Koine = Koine || {};

$(document).ready(function () {
  container   = $("#fancy_select");
  source      = $("#source");
  destination = $("#destination");
  fancySelect = new Koine.WebComponents.FancySelect(source, destination, container, $);

  [
    ['1', 'one'],
    ['2', 'two'],
    ['3', 'three'],
    ['4', 'four'],
  ].forEach(function (value) {
    var source = fancySelect.getSource();
    var option = source.createOption(value[0], value[1], true);
    source.addOption(option);
  });

  [
    ['5', 'five'],
    ['6', 'six'],
  ].forEach(function (value) {
    var destination = fancySelect.getDestination();
    var option = destination.createOption(value[0], value[1], true);
    destination.addOption(option);
  });

  fancySelect.render();
});
