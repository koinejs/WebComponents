describe("Koine.WebComponents.FancySelect", function () {
  var subject, source, destination, sourceElement, destinationElement, container;

  var initialize = function () {
    source.addOptions([
      source.createOption('1', 'one'),
      source.createOption('2', 'two')
    ]);

    destination.addOptions([
      source.createOption('3', 'three'),
      source.createOption('4', 'four'),
    ]);

    subject.render();
  };

  afterEach(function() {
    $('#container').remove();
  });

  beforeEach(function () {
    container = $('<div  id="container" />');
    sourceElement = document.createElement('select');
    destinationElement = document.createElement('select');

    $('body').append(container).append(sourceElement).append(destinationElement);
    container = $('#container');

    source      = new Koine.Decorators.Dom.SelectDecorator(sourceElement);
    destination = new Koine.Decorators.Dom.SelectDecorator(destinationElement);

    subject = new Koine.WebComponents.FancySelect(
      source,
      destination,
      container,
      jQuery
    );
  });

  it("initializes with a source decorator", function () {
    expect(subject.getSource()).toBe(source);
  });

  it("initializes with a destination select decorator", function () {
    expect(subject.getDestination()).toBe(destination);
  });

  it("initializes with a container", function () {
    expect(subject.getContainer().selector).toEqual('#container');
  });

  describe("#render", function () {
    beforeEach(initialize);

    it("adds source items to the container", function () {
      var sourceContainer = container.find('.fancy-select .source');
      expect(sourceContainer.length).toEqual(1);
      expect(sourceContainer.find('.option').length).toEqual(2);

      var first = sourceContainer.find('.option:first');
      var last = sourceContainer.find('.option:last');

      expect(first.data('value')).toEqual(1);
      expect(first.html()).toEqual('one');

      expect(last.data('value')).toEqual(2);
      expect(last.html()).toEqual('two');
    });

    it("adds destination items to the container", function () {
      var sourceContainer = container.find('.fancy-select .destination');
      expect(sourceContainer.length).toEqual(1);
      expect(sourceContainer.find('.option').length).toEqual(2);

      var first = sourceContainer.find('.option:first');

      expect(first.data('value')).toEqual(3);
      expect(first.html()).toEqual('three');
    });

    it("renders action buttons", function () {
      container = container.find('.actions');
      expect(container.find('a[data-add-selected]').length).toEqual(1);
      expect(container.find('a[data-add-all]').length).toEqual(1);
      expect(container.find('a[data-remove-selected]').length).toEqual(1);
      expect(container.find('a[data-remove-all]').length).toEqual(1);
    });
  });

  describe("option.click()", function () {
    var sourceOption, destinationOption;

    beforeEach(function () {
      initialize();
      sourceOption      = container.find('.source .option:first');
      destinationOption = container.find('.destination .option:first');

      sourceOption.click();
      destinationOption.click();
    });

    it("toggles class of div", function () {
      expect(sourceOption.hasClass('selected')).toBeTruthy();
      expect(destinationOption.hasClass('selected')).toBeTruthy();

      destinationOption.click();
      sourceOption.click();

      expect(sourceOption.hasClass('selected')).toBeFalsy();
      expect(destinationOption.hasClass('selected')).toBeFalsy();
    });
  });

  describe("[data-add-selected].click()", function () {
    var option;

    beforeEach(function () {
      initialize();
      option = container.find('.source .option:last');
      option.addClass('selected');
      container.find('[data-add-selected]').click();
    });

    it("transfers option from source to destination", function () {
      expect(source.getOptions().length).toEqual(1);
      expect(destination.getOptions().length).toEqual(3);
    });

    it("re-renders the compoment", function () {
      expect(container.find('.source .option').length).toEqual(1);
      expect(container.find('.destination .option').length).toEqual(3);
    });
  });

  describe("[data-remove-selected].click()", function () {
    var option;

    beforeEach(function () {
      initialize();
      option = container.find('.destination .option:last');
      option.addClass('selected');
      container.find('[data-remove-selected]').click();
    });

    it("transfers option from destination to source", function () {
      expect(source.getOptions().length).toEqual(3);
      expect(destination.getOptions().length).toEqual(1);
    });

    it("re-renders the compoment", function () {
      expect(container.find('.source .option').length).toEqual(3);
      expect(container.find('.destination .option').length).toEqual(1);
    });
  });
});

