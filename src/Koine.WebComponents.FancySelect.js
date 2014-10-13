var exports = exports || undefined;

(function (Koine) {
  "use strinct";

  var FancySelect = function (source, destination, container, $) {
    this.source      = source;
    this.destination = destination;
    this.$ = $;
    this.setContainer(container);
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

    render: function () {
      var sourceOptions    = this._getOptionsHtml(this.getSource()),
        destinationOptions = this._getOptionsHtml(this.getDestination()),
        buttons = this._getButtonsHtml();

      var html = this.template(
        [
          '<div class="fancy_select source">{{sourceOptions}}</div>',
          '{{buttons}}',
          '<div class="fancy_select destination">{{destinationOptions}}</div>'
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
        '<a href="#" data-add-all>&gt;&gt;</a>',
        '<a href="#" data-add-selected>&gt;</a>',
        '<a href="#" data-remove-selected>&lt;</a>',
        '<a href="#" data-remove-all>&lt;&lt;</a>',
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
