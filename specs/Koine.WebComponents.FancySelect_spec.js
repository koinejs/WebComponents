describe("Koine.WebComponents.FancySelect", function () {
  var subject, source, destination, sourceElement, destinationElement, container;

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
    )
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
    beforeEach(function () {
      source.addOptions([
        source.createOption('1', 'one'),
        source.createOption('2', 'two')
      ]);

      destination.addOptions([
        source.createOption('3', 'three')
      ]);

      subject.render();
    });

    it("adds source items to the container", function () {
      var sourceContainer = container.find('.fancy_select.source');
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
      var sourceContainer = container.find('.fancy_select.destination');
      expect(sourceContainer.length).toEqual(1);
      expect(sourceContainer.find('.option').length).toEqual(1);

      var first = sourceContainer.find('.option:first');

      expect(first.data('value')).toEqual(3);
      expect(first.html()).toEqual('three');
    });

    it("renders action buttons", function () {
      expect(container.find('a[data-add-selected]').length).toEqual(1);
      expect(container.find('a[data-add-all]').length).toEqual(1);
      expect(container.find('a[data-remove-selected]').length).toEqual(1);
      expect(container.find('a[data-remove-all]').length).toEqual(1);
    });
  });
});

