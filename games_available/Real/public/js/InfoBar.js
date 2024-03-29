(function (node) {
  // Self-executing function for encapsulation.

  // Register the widget in the widgets collection
  // (will be stored at node.widgets.widgets).
  node.widgets.register('InfoBar', InfoBar);

  // Add Meta-data.

  InfoBar.version = '0.0.1';
  InfoBar.description = 'This widget does this';

  InfoBar.texts = {
    // Texts here (more info on this later).
  };

  InfoBar.sounds = {
    // Sounds here (if any).
  };

  // Title is displayed in the header.
  InfoBar.title = '';
  // Classname is added to the widgets.
  InfoBar.className = 'info-bar';

  // Dependencies are checked when the widget is created.
  InfoBar.dependencies = { JSUS: {} };

  // Constructor taking a configuration parameter.
  // The options object is always existing.
  function InfoBar(options) {
    // You can define widget properties here,
    // but they should get assigned a value in init.
    this.data = null;
    this.messageButton = false;
  }

  InfoBar.prototype.init = function (options) {
    // Init widget variables, but do not create
    // HTML elements, they should be created in append.

    if (options.data && 'object' === typeof options.data) {
      this.data = options.data;
      this.messageButton = options.messageButton || false;
    } else {
      throw new TypeError(
        'InfoBar.init: data must be an object. Found: ' + options.data
      );
    }
    // Furthermore, you can add internal listeners here
    // or in the listeners method. (optional)
    this.on('destroyed', function () {
      // Do something. For example, notify another player.
    });
  };

  // Implements the Widget.append method.
  InfoBar.prototype.append = function () {
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

    var bubble = document.createElement('div');
    bubble.classList.add('bubble');

    var pointer = document.createElement('div');
    pointer.innerHTML = `<svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 20 20"
      style="enable-background: new 0 0 20 20"
      xml:space="preserve"
    >
      <style type="text/css">
        .st0 {
          fill: #ffffff;
        }
        .st1 {
          fill: none;
          stroke: #808080;
          stroke-miterlimit: 10;
        }
      </style>
      <g>
        <g>
          <polygon class="st0" points="0,10 20,20 20,0" />
        </g>
        <polyline class="st1" points="20,20 0,10 20,0" />
      </g>
    </svg>`;

    pointer.classList.add('pointer');
    bubble.appendChild(pointer);

    var panel;
    var closeBubble = function () {
      if (panel && panel.parentNode) {
        panel.parentNode.removeChild(panel);
        bubble.parentNode.removeChild(bubble);
      }
    };

    var closeButton = document.createElement('i');
    closeButton.classList.add('close', 'fas', 'fa-times', 'fa-2x');
    closeButton.onclick = closeBubble;
    bubble.appendChild(closeButton);

    var makeColumn = function (data, bubbleOffset, title) {
      var ul = document.createElement('ul');
      var columnTitle = document.createElement('li');
      columnTitle.classList.add('column-title');
      columnTitle.textContent = title;
      ul.appendChild(columnTitle);

      data.forEach(function (tab, index) {
        var button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.classList.add('btn', 'btn-lg', 'btn-outline-secondary');
        button.innerHTML = tab.icon;

        button.onclick = function (event) {
          closeBubble();

          pointer.setAttribute('style', 'top: ' + (64 * index + 54) + 'px')

          var title = document.createElement('h2');
          title.innerText = tab.topic;

          if (widget.messageButton) {
            var messageButton = document.createElement('button');
            messageButton.setAttribute('type', 'button');
            messageButton.classList.add('btn', 'btn-light');
            messageButton.innerHTML = '<span class="far fa-comment"></span> Message';
            messageButton.onclick = function () {
              node.emit('BUBBLE_DATA', tab, index);
              closeBubble();
            };
            title.appendChild(messageButton);
          }

          panel = document.createElement('div');
          panel.classList.add('panel');
          panel.appendChild(title);
          var p = document.createElement('p');
          p.innerHTML = tab.html;
          panel.appendChild(p);
          bubble.appendChild(panel);
          bubble.style.left = bubbleOffset + 'px';

          widget.bodyDiv.appendChild(bubble);
        };

        var li = document.createElement('li');
        li.appendChild(button);
        ul.appendChild(li);
      });
      widget.bodyDiv.appendChild(ul);
    }
    var index = 0;
    var columnTitles = ['Sam', 'Alex', 'Jamie'];
    for (var x = 0; x <= 10; x = x + 5) {
      makeColumn(this.data.slice(x, x + 5), 76 + (67 * index), columnTitles[index]);
      index++;
    }
  };

  // Implements the Widget.listeners method (optional).
  InfoBar.prototype.listeners = function () {
    // Listeners added here using `node.on`
    // are automatically removed when the widget
    // is destroyed.
    node.on.data('MyEvent', function () {
      // Do something.
    });
  };

  // Overwrites some default methods, for example
  // the highlight method (optional).
  InfoBar.prototype.highlight = function () {
    if (!this.panelDiv) return;
    this.panelDiv.style.background = 'red';
    this.highlighted = true;
    // Do not forget to emit the event.
    this.emit('highlighted');
  };

  // Overwrites some default methods, for example
  // the unhighlight method (optional).
  InfoBar.prototype.unhighlight = function () {
    if (!this.panelDiv) return;
    this.panelDiv.style.background = 'white';
    this.highlighted = false;
    // Do not forget to emit the event.
    this.emit('unhighlighted');
  };
})(node);
