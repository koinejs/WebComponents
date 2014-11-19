var exports = exports || undefined;

(function (Koine) {
  "use strinct";

  /**
   * Double Select
   * @param object options
   *  Available options:
   *    source:       the source select jQuery object
   *    destination:  the destination select jQuery object
   *    jquery:       Optional. the jquery function
   *    controls:     object
   *      addAll: the button to add all options to the destination select
   *      removeAll: the button to add all destination options back to the source select
   *      addSelected: transfers selected options from source to destination
   *      removSelected: transfers selected options from destination to source
   */
  var DoubleSelect = function (options) {
    this.source      = options.source;
    this.destination = options.destination;
    this.$           = options.jquery || jQuery;
    var that         = this;
    var controls     = options.controls || {};

    this.source.on('dblclick', 'option', function () {
      that.select(this);
    });

    this.destination.on('dblclick', 'option', function () {
      that.unselect(this);
    });

    // button to select all
    if (controls.addAll) {
      controls.addAll.on('click', function (e) {
        e.preventDefault();

        that.getOptions().forEach(function (option) {
          that.select(option);
        });
      });
    }

    // button to unslelect all
    if (controls.removeAll) {
      controls.removeAll.on('click', function (e) {
        e.preventDefault();

        that.getSelected().forEach(function (option) {
          that.unselect(option);
        });
      });
    }

    // button to add selected source options
    if (controls.addSelected) {
      controls.addSelected.on('click', function (e) {
        e.preventDefault();

        that.getSourceSelected().forEach(function (option) {
          that.select(option);
        });
      });
    }

    // button to remove selected source options
    if (controls.removeSelected) {
      controls.removeSelected.on('click', function (e) {
        e.preventDefault();

        that.getDestinationSelected().forEach(function (option) {
          that.unselect(option);
        });
      });
    }
  };

  DoubleSelect.prototype = {

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

    select: function (option) {
      return this._transferOption(this.getSource()[0], this.getDestination()[0], option);
    },

    unselect: function (option) {
      return this._transferOption(this.getDestination()[0], this.getSource()[0], option);
    },

    clearOptions: function () {
      this.getSource().html('');

      return this;
    },

    getOptions: function () {
      return this._getSelectOptions(this.getSource());
    },

    setOptions: function (options) {
      return this._setSelectOptions(this.getSource(), options);
    },

    getSelected: function () {
      return this._getSelectOptions(this.getDestination());
    },

    setSelected: function (options) {
      return this._setSelectOptions(this.getDestination(), options);
    },

    _setSelectOptions: function (select, options) {
      select = select.html('')[0];

      options.forEach(function (option) {
        select.appendChild(option);
      });

      return this;
    },

    _getSelectOptions: function (element) {
      var options = [];

      element.find('option').each(function (index, option) {
        options.push(option);
      });

      return options;
    },

    addOptions: function (options) {
      var select = this.getSource()[0];

      options.forEach(function (option) {
        select.appendChild(option);
      });

      return this;
    },

    getSourceSelected: function () {
      return this._getSelectedOptions(this.getSource());
    },

    getDestinationSelected: function () {
      return this._getSelectedOptions(this.getDestination());
    },

    _getSelectedOptions: function (select) {
      var $ = this.$, selected = [];

      select.find('option').each(function () {
        if ($(this).is(':selected')) {
          selected.push(this);
        }
      });

      return selected;
    },

    _transferOption: function (source, destination, option) {
      source.removeChild(option);
      destination.appendChild(option);

      return this;
    }
  };

  Koine.WebComponents              = Koine.WebComponents              || {};
  Koine.WebComponents.DoubleSelect = Koine.WebComponents.DoubleSelect || DoubleSelect;
})(typeof(exports) === "undefined" ? (this.Koine || (this.Koine = {})) : exports);
