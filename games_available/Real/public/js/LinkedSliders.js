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
      options.labels.forEach(function (label, index) {
        widget.sliders.push({ id: 'slider_' + index, label: label, value: 0 });
      });
      widget.participants = options.participants ? options.participants.map(function (participant, index) {
        return { id: participant.sender, name: participant.name, index: index };
      }) : null;
    }

    widget.ownId = options.ownId;
    widget.choices = options.choices;

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

    var sliderSum = function () {
      var sum = 0;
      for (var index = 0; index < widget.sliders.length; index++) {
        sum += widget.sliders[index].value;
      }
      return sum;
    }

    if (widget.participants) {
      var gameParticipants = document.createElement('div');
      gameParticipants.classList.add('participants');
      var gameParticipant = document.createElement('span');
      gameParticipant.innerHTML = '<span>You: </span><span class="square"></span>';
      gameParticipants.appendChild(gameParticipant);
      widget.participants.forEach(function (participant) {
        gameParticipant = document.createElement('span');
        gameParticipant.innerHTML = `<span>${participant.name}: </span><img src="shapes/${participant.index === 0 ? 'left_arrow' : 'right_arrow'}.svg" alt="indicator">`;
        gameParticipants.appendChild(gameParticipant);
      });
      widget.bodyDiv.appendChild(gameParticipants);
    }

    var previousTotal = 0;

    var fragment = document.createDocumentFragment();
    var totalDiv = document.createElement('div');
    totalDiv.classList.add('totalcontainer');
    totalDiv.innerHTML = `<span>Total kitchens: <span id="total-purchases">0</span></span><span id="warning">Must equal 12</span>`;
    fragment.appendChild(totalDiv);
    var totalValue = fragment.getElementById('total-purchases');
    var warning = fragment.getElementById('warning');

    widget.sliders.forEach(function (slider, index) {
      var sliderLabel = document.createElement('label');
      sliderLabel.classList.add('slidecontainer');
      sliderLabel.innerText = slider.label;
      if (widget.participants) {
        var otherChoices = document.createElement('div');
        otherChoices.classList.add('other-choices');
        var leftArrow = document.createElement('img');
        leftArrow.setAttribute('src', 'shapes/left_arrow.svg');
        leftArrow.setAttribute('alt', 'left');
        otherChoices.appendChild(leftArrow);
        var rightArrow = document.createElement('img');
        rightArrow.setAttribute('src', 'shapes/right_arrow.svg');
        rightArrow.setAttribute('alt', 'right');
        otherChoices.appendChild(rightArrow);
        sliderLabel.appendChild(otherChoices);
        slider.leftArrow = leftArrow;
        slider.rightArrow = rightArrow;
      }
      var sliderInput = document.createElement('input');
      sliderInput.setAttribute('id', slider.id);
      sliderInput.classList.add('slider');
      sliderInput.setAttribute('type', 'range');
      sliderInput.setAttribute('min', '0');
      sliderInput.setAttribute('max', '12');
      sliderInput.setAttribute('value', '0');
      sliderInput.oninput = function () {
        var sliderIndex = this.id.split('_')[1];
        widget.sliders[sliderIndex].value = parseInt(this.value);
        // var total;
        // while ((total = sliderSum()) > 12) {
        //   widget.sliders[sliderIndex].value--;
        //   this.value = widget.sliders[sliderIndex].value;
        // }
        // totalValue.innerText = total;
        var total = sliderSum();
        totalValue.innerText = total;
        if (total !== previousTotal) {
          if (total === 12) {
            node.emit('complete');
            warning.classList.remove('show');
          } else {
            node.emit('incomplete');
            warning.classList.add('show');
          }
          previousTotal = total;
        }
      };
      sliderLabel.appendChild(sliderInput);
      var sliderScale = document.createElement('div');
      sliderScale.classList.add('slider-scale');
      sliderScale.innerHTML = `<span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>`;
      widget.bodyDiv.appendChild(sliderLabel);
      widget.bodyDiv.appendChild(sliderScale);
    });

    widget.bodyDiv.appendChild(fragment);
    if (widget.participants) {
      widget.bodyDiv.classList.add('group-choice');
    }

    if (widget.choices) {
      widget.setOtherChoices(widget.choices);
      // Set own choices
      if (widget.ownId) {
        var suggestions = widget.choices[widget.ownId];
        if (suggestions) {
          suggestions.forEach(function (suggestion, index) {
            var slider = widget.sliders[index];
            var sliderEl = widget.bodyDiv.querySelector(`#${slider.id}`);
            slider.value = suggestion;
            sliderEl.value = suggestion;
          })
        }
        totalValue.innerText = sliderSum();
      }
    }

  };

  LinkedSliders.prototype.getValues = function () {
    return this.sliders.map(function (slider) {
      return slider.value;
    })
  };

  LinkedSliders.prototype.setOtherChoices = function (choices) {
    var widget = this;

    widget.participants.forEach(function (participant) {
      var suggestions = choices[participant.id];
      if (suggestions) {
        suggestions.forEach(function (suggestion, index) {
          var slider = widget.sliders[index];
          var arrow = participant.index === 0 ? slider.leftArrow : slider.rightArrow;
          arrow.style.left = (suggestion * (widget.bodyDiv.offsetWidth / 13)) + 'px';
        })
      }
    })
  };

  // Implements the Widget.listeners method (optional).
  LinkedSliders.prototype.listeners = function () {
    // Listeners added here using `node.on`
    // are automatically removed when the widget
    // is destroyed.

    node.on.data('HELLO', function (msg) {
      console.log('Hello', msg.data);
    });
  };
})(node);
