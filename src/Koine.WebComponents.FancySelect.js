var exports = exports || undefined;

(function (Koine) {
  "use strinct";

  var FancySelect = function ($source, $destination, container, $) {
    var self, source, destination;
    this.source      = new Koine.Decorators.Dom.SelectDecorator($source[0]);
    this.destination = new Koine.Decorators.Dom.SelectDecorator($destination[0]);
    this.$           = $;
    source           = this.getSource();
    destination      = this.getDestination();
    self             = this;
    this.setContainer(container);

    container.on('click', '.option', function () {
      $(this).toggleClass('selected');
    });

    container.on('click', '[data-add-selected]', function (e) {
      e.preventDefault();
      self.transferSelected(source, destination, container.find('.source .option.selected'));
    });

    container.on('click', '[data-add-all]', function (e) {
      e.preventDefault();
      self.transferSelected(source, destination, container.find('.source .option'));
    });

    container.on('click', '[data-remove-selected]', function (e) {
      e.preventDefault();
      self.transferSelected(destination, source, container.find('.destination .option.selected'));
    });

    container.on('click', '[data-remove-all]', function (e) {
      e.preventDefault();
      self.transferSelected(destination, source, container.find('.destination .option'));
    });

  };

  FancySelect.prototype = {
    getSource: function () {
      return this.source;
    },

    getDestination: function () {
      return this.destination;
    },

    setContainer: function (container) {
      this.container = container;
    },

    getContainer: function () {
      return this.container;
    },

    transferSelected: function (origin, destination, selected) {
      var values = [], options = [];

      selected.each(function () {
        values.push($(this).data('value'));
      });

      values.forEach(function (value) {
        origin.getOptions().forEach(function (option) {
          if (value == option.getValue()) {
            options.push(option);
          }
        });
      });

      origin.removeOptions(options);
      destination.addOptions(options);

      this.render();
    },

    render: function () {
      var sourceOptions    = this._getOptionsHtml(this.getSource()),
        destinationOptions = this._getOptionsHtml(this.getDestination()),
        buttons = this._getButtonsHtml();

      var html = this.template(
        [
          '<div class="fancy-select">',
          '<div class="source">{{sourceOptions}}</div>',
          '{{buttons}}',
          '<div class="destination">{{destinationOptions}}</div>',
          '</div>'
        ].join(''),
        {
          sourceOptions: sourceOptions,
          destinationOptions: destinationOptions,
          buttons: buttons
        }
      );

      this.getContainer().html(html);
    },

    _getOptionsHtml: function (select) {
      var html = [],
        template = this.template;

      select.getOptions().forEach(function (option) {
        html.push(template('<div class="option" data-value="{{value}}">{{label}}</div>', {
          value: option.getValue(),
          label: option.getLabel(),
        }));
      });

      return html.join('');
    },

    _getButtonsHtml: function () {
      return [
        '<div class="actions">',
        '<a href="#" data-add-all>&gt;&gt;</a>',
        '<a href="#" data-add-selected>&gt;</a>',
        '<a href="#" data-remove-selected>&lt;</a>',
        '<a href="#" data-remove-all>&lt;&lt;</a>',
        '</div>'
      ].join('');
    },

    template: function (template, vars) {
      var search;
      vars = vars || {};

      for (var prop in vars) {
        search = new RegExp("{{" + prop + "}}", 'g');
        template = template.replace(search, vars[prop]);
      }

      return template;
    }
  };

  Koine.WebComponents             = Koine.WebComponents             || {};
  Koine.WebComponents.FancySelect = Koine.WebComponents.FancySelect || FancySelect;
})(typeof(exports) === "undefined" ? (this.Koine || (this.Koine = {})) : exports);
