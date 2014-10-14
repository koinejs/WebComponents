var exports = exports || undefined;

(function (Koine) {
  "use strinct";

  /**
   * Fancy Select
   * @param jQuery $source Jquery object for the source select
   * @param jQuery $destination Jquery object for the destination select
   * @param jQuery $container Jquery object for the container in which the
   * @param function the jquery function
   *  fancy select must be rendered
   */
  var FancySelect = function ($source, $destination, $container, $) {
    var self, source, destination;
    this.source      = new Koine.Decorators.Dom.SelectDecorator($source[0]);
    this.destination = new Koine.Decorators.Dom.SelectDecorator($destination[0]);
    source           = this.getSource();
    destination      = this.getDestination();
    self             = this;
    this.setContainer($container);

    source.on('options:added, options:removed', function () {
      self.render();
    });

    destination.on('options:added, options:removed', function () {
      self.render();
    });

    $container.on('click', '.option', function () {
      $(this).toggleClass('selected');
    });

    $container.on('click', '[data-add-selected]', function (e) {
      e.preventDefault();
      self._transferSelected(source, destination, $container.find('.source .option.selected'));
    });

    $container.on('click', '[data-add-all]', function (e) {
      e.preventDefault();
      self._transferSelected(source, destination, $container.find('.source .option'));
    });

    $container.on('click', '[data-remove-selected]', function (e) {
      e.preventDefault();
      self._transferSelected(destination, source, $container.find('.destination .option.selected'));
    });

    $container.on('click', '[data-remove-all]', function (e) {
      e.preventDefault();
      self._transferSelected(destination, source, $container.find('.destination .option'));
    });

  };

  FancySelect.prototype = {

    /**
     * Get the source select decorator
     * @return Koine.Decorators.Dom.SelectDecorator
     */
    getSource: function () {
      return this.source;
    },

    /**
     * Get the destination select decorator
     * @return Koine.Decorators.Dom.SelectDecorator
     */
    getDestination: function () {
      return this.destination;
    },

    /**
     * Sets the container of the rendering
     * @param jQuery $container the jQuery
     * @return self
     */
    setContainer: function ($container) {
      this.$container = $container;
    },

    /**
     * @return jQuery
     */
    getContainer: function () {
      return this.$container;
    },

    /**
     * Append the proper html to the $container
     */
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

    /**
     * Transfers elements from the origin select decorator to
     * destination select decorator
     *
     * @param Koine.Decorators.Dom.SelectDecorator origin
     * @param Koine.Decorators.Dom.SelectDecorator destination
     * @param jQuery $selected
     */
    _transferSelected: function (origin, destination, $selected) {
      var values = [], options = [];

      $selected.each(function () {
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
    },

    /**
     * Get the html for the options
     * @return String
     */
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

    /**
     * Get the buttons html
     * @return String
     */
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

    /**
     * Acts as a template engine
     * @param String string
     * @param object vars
     * @return String
     */
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
