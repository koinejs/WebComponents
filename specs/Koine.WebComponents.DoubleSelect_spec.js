describe("Koine.WebComponents.DoubleSelect", function () {
  var subject, source, destination, $source, $destination,
    opt1, opt2, opt3, opt4, opt5, opt6,
    Decorator = Koine.Decorators.Dom.SelectOptionDecorator,

    createOption = function (value, label) {
      var option = document.createElement('option');
      decorator = new Decorator(option);
      decorator.setValue(value).setLabel(label);

      return decorator;
    };

  afterEach(function() {
    $('#container').remove();
  });

  beforeEach(function () {
    addAll         = document.createElement('a');
    removeAll      = document.createElement('a');
    addSelected    = document.createElement('a');
    removeSelected = document.createElement('a');

    source       = document.createElement('select');
    source.setAttribute('multiple', 'multiple');
    destination  = document.createElement('select');
    destination.setAttribute('multiple', 'multiple');
    $source      = $(source);
    $destination = $(destination);

    subject = new Koine.WebComponents.DoubleSelect({
      source: $source,
      destination: $destination,
      jquery: jQuery,
      controls: {
        addAll:          $(addAll),
        removeAll:       $(removeAll),
        addSelected:     $(addSelected),
        removeSelected:  $(removeSelected)
      }
    });

    opt1 = createOption('1', 'one');
    opt2 = createOption('2', 'two');
    opt3 = createOption('3', 'three');
    opt4 = createOption('4', 'four');
    opt5 = createOption('5', 'five');
    opt6 = createOption('6', 'six');

    $source.append(opt1.getElement());
    $source.append(opt2.getElement());
    $source.append(opt3.getElement());
    $source.append(opt4.getElement());
    $destination.append(opt5.getElement());
    $destination.append(opt6.getElement());
  });

  describe("#getSource", function () {
    it("returns the source", function () {
      expect(subject.getSource()).toBe($source);
    });
  });

  describe("#getDestination", function () {
    it("returns the destination", function () {
      expect(subject.getDestination()).toBe($destination);
    });
  });

  describe("#getOptions", function () {
    it("returns the source options", function () {
      expect(subject.getOptions().length).toEqual(4);
      expect(subject.getOptions()[0]).toBe(opt1.getElement());
    });
  });

  describe("#getSelected", function () {
    it("returns the destination options", function () {
      expect(subject.getSelected().length).toEqual(2);
    });
  });

  describe("#setOptions", function () {
    it("replaces the source options", function () {
      subject.setOptions([opt1, opt2]);
      expect(subject.getOptions().length).toEqual(2);
    });
  });

  describe("#setSelected", function () {
    it("replaces the target options", function () {
      subject.setSelected([opt1]);
      expect(subject.getSelected().length).toEqual(1);
    });
  });

  describe("#select", function () {
    it("transfers option from source to destination", function () {
      subject.select(opt2.getElement());
      expect(subject.getOptions().length).toEqual(3)
      expect(subject.getSelected().length).toEqual(3)
    });
  });

  describe("#unselect", function () {
    it("transfers option from destination to source", function () {
      subject.unselect(opt5.getElement());
      expect(subject.getOptions().length).toEqual(5)
      expect(subject.getSelected().length).toEqual(1)
    });
  });

  describe("#clearOptions", function () {
    it("resets options", function () {
      subject.clearOptions();
      expect(subject.getOptions().length).toEqual(0)
    });
  });

  describe("#addOptions", function () {
    it("resets options", function () {
      subject.clearOptions();
      subject.addOptions([opt1.getElement()])
      expect(subject.getOptions().length).toEqual(1)
    });
  });

  describe("#getSourceSelected", function () {
    it("gets selected elements from source select", function () {
      opt2.select();
      opt4.select();

      expect(subject.getSourceSelected()).toEqual([
        opt2.getElement(),
        opt4.getElement()
      ]);
    });
  });

  describe("#getDestinationSelected", function () {
    it("gets selected elements from destination select", function () {
      opt5.select();

      expect(subject.getDestinationSelected()).toEqual([opt5.getElement()]);
    });
  });

  describe("source option dblclick", function () {
    it("selects that option", function () {
      $(opt2.getElement()).trigger('dblclick');

      expect(subject.getOptions().length).toEqual(3);
      expect(subject.getSelected().length).toEqual(3);
    });
  });

  describe("destination option dblclick", function () {
    it("unselects that option", function () {
      $(opt5.getElement()).trigger('dblclick');

      expect(subject.getOptions().length).toEqual(5);
      expect(subject.getSelected().length).toEqual(1);
    });
  });

  describe("click on 'addAll' controller", function () {
    it("selects all the options", function () {
      $(addAll).trigger('click');

      expect(subject.getOptions().length).toEqual(0);
      expect(subject.getSelected().length).toEqual(6);
    });
  });

  describe("click on 'remove' controller", function () {
    it("selects all the options", function () {
      $(removeAll).trigger('click');

      expect(subject.getOptions().length).toEqual(6);
      expect(subject.getSelected().length).toEqual(0);
    });
  });

  describe("click on 'addSelected' controller", function () {
    it("selects only the selected source options", function () {
      opt2.select();
      opt4.select();

      $(addSelected).trigger('click');

      expect(subject.getOptions().length).toEqual(2);
      expect(subject.getSelected().length).toEqual(4);
    });
  });

  describe("click on 'removeSelected' controller", function () {
    it("unselects only the selected destination options", function () {
      opt5.select();

      $(removeSelected).trigger('click');

      expect(subject.getOptions().length).toEqual(5);
      expect(subject.getSelected().length).toEqual(1);
    });
  });
});
