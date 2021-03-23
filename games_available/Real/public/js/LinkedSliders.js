(function (node) {
  // Self-executing function for encapsulation.

  // Register the widget in the widgets collection
  // (will be stored at node.widgets.widgets).
  node.widgets.register('LinkedSliders', LinkedSliders);

  // Add Meta-data.

  LinkedSliders.version = '0.0.1';
  LinkedSliders.description = 'This widget does this';

  LinkedSliders.texts = {
    // Texts here (more info on this later).
  };

  LinkedSliders.sounds = {
    // Sounds here (if any).
  };

  // Title is displayed in the header.
  LinkedSliders.title = '';
  // Classname is added to the widgets.
  LinkedSliders.className = 'linked-sliders';

  // Dependencies are checked when the widget is created.
  LinkedSliders.dependencies = { JSUS: {} };

  // Constructor taking a configuration parameter.
  // The options object is always existing.
  function LinkedSliders() {
    // You can define widget properties here,
    // but they should get assigned a value in init.
    this.sliders = null;
  }

  LinkedSliders.prototype.init = function (options) {
    // Init widget variables, but do not create
    // HTML elements, they should be created in append.

    var widget = this;

    if (Array.isArray(options.labels) && options.labels.length > 0) {
      widget.sliders = [];
      options.labels.forEach(function(label, index) {
        widget.sliders.push({ id: 'slider_' + index, label: label, value: 0 });
      });
    }

    // Furthermore, you can add internal listeners here
    // or in the listeners method. (optional)
    this.on('destroyed', function () {
      // Do something. For example, notify another player.
    });
  };

  // Implements the Widget.append method.
  LinkedSliders.prototype.append = function () {
    // Widgets are Bootstrap panels. The following HTML
    // elements are available at the time when
    // the `append` method is called:
    //
    //   - panelDiv:   the outer container
    //   - headingDiv: the title container
    //   - bodyDiv:    the main container
    //   - footerDiv:  the footer container
    //
    
    var widget = this;
    // Get jQuery from the host window
    var $ = parent.$;
    var $bodyDiv = $(this.bodyDiv);

    widget.sliders.forEach(function (slider, index) {
      var sliderHtml =
      `<label class="slidecontainer">
          ${slider.label}
          <input id="${slider.id}_${index}" class="slider" type="range" min="0" max="12" value="0">
        </label>
        <div class="slider-scale">
          <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
        </div>`;
        $bodyDiv.append(sliderHtml);
    });
    $bodyDiv.append(`<div>Total purchases: <span id="total-purchases">0</span></div>`);
    var $total = $bodyDiv.find('#total-purchases');

    var sliderSum = function() {
      var sum = 0;
      for (var index = 0; index < widget.sliders.length; index++) {
        sum += widget.sliders[index].value;
      }
      return sum;
    }

    var previousTotal = 0;

    $bodyDiv.find('.slider').on('input', function() {
      var sliderIndex = this.id.split('_')[1];
      widget.sliders[sliderIndex].value = parseInt(this.value);
      var total;
      while ((total = sliderSum()) > 12) {
        widget.sliders[sliderIndex].value--;
        this.value = widget.sliders[sliderIndex].value;
      }
      $total.text(total);
      if (total !== previousTotal) {
        if (total === 12) {
          node.emit('complete');
        } else {
          node.emit('incomplete');
        }
        previousTotal = total;
      }
    });
  };

  LinkedSliders.prototype.getValues = function() {
    return this.sliders.map(function(slider) {
      return slider.value;
    })
  }

  // Implements the Widget.listeners method (optional).
  LinkedSliders.prototype.listeners = function() {
    // Listeners added here using `node.on`
    // are automatically removed when the widget
    // is destroyed.

    node.on.data('HELLO', function(msg) {
      console.log('Hello', msg.data);
    });
  };
})(node);
