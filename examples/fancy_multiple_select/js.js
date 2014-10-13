var fancySelect, source, destination, container;
var Koine = Koine || {};

$(document).ready(function () {
  container   = $("#fancy_select");
  source      = new Koine.Decorators.Dom.SelectDecorator($("#source")[0]);
  destination = new Koine.Decorators.Dom.SelectDecorator($("#destination")[0]);

  [
    ['1', 'one'],
    ['2', 'two'],
    ['3', 'three'],
    ['4', 'four'],
  ].forEach(function (value) {
    var option = source.createOption(value[0], value[1], true);
    source.addOption(option);
  });

  [
    ['5', 'five'],
    ['6', 'six'],
  ].forEach(function (value) {
    var option = destination.createOption(value[0], value[1], true);
    destination.addOption(option);
  });

  fancySelect = new Koine.WebComponents.FancySelect(source, destination, container, $);
  fancySelect.render();
});
