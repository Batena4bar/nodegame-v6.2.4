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
  }

  InfoBar.prototype.init = function (options) {
    // Init widget variables, but do not create
    // HTML elements, they should be created in append.

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

    var tabs = [
      {
        id: 1,
        icon: '',
        title: 'Text 1',
        text:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      },
      {
        id: 2,
        icon: '',
        title: 'Text 2',
        text:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      },
      {
        id: 3,
        icon: '',
        title: 'Text 3',
        text:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      },
      {
        id: 4,
        icon: '',
        title: 'Text 4',
        text:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      },
      {
        id: 5,
        icon: '',
        title: 'Text 5',
        text:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      },
      {
        id: 6,
        icon: '',
        title: 'Text 6',
        text:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      },
    ];

    var widget = this;
    // Get jQuery from the host window
    var $ = parent.$;
    var $bodyDiv = $(this.bodyDiv);

    var $ul = $('<ul>');
    tabs.forEach(function(tab) {
      var $button = $('<button>').prop('type', 'button').addClass('btn btn-lg btn-primary').text(tab.id);
      $ul.append($('<li>').append($button));
    });

    var $bubble = $('<div>').addClass('bubble');
    tabs.forEach(function(tab) {
      var $title = $('<h2>').text(tab.title);
      $title.click(function() {
        console.log(tab);
      });
      var $panel = $('<div>').prop('id', 'panel-' + tab.id).append($title).append($('<p>').text(tab.text));
      $bubble.append($panel);
    });

    $bodyDiv.append($ul).append($bubble);

    // this.tabs = document.createElement('div');
    // this.tabs.innerHTML = `<div id="tabs">
    //     <ul>
    //     <li><a href="#fragment-1">1</a></li>
    //     <li><a href="#fragment-2">2</a></li>
    //     <li><a href="#fragment-3">3</a></li>
    //     <li><a href="#fragment-4">4</a></li>
    //     <li><a href="#fragment-5">5</a></li>
    //     <li><a href="#fragment-6">6</a></li>
    //     <li class="filler"></li>
    //     </ul>
    //     <div>
    //     <div id="fragment-1">
    //         1 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
    //         dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
    //         nibh euismod tincidunt ut laoreet
    //         dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
    //         nibh euismod tincidunt ut laoreet
    //         dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
    //         nibh euismod tincidunt ut laoreet
    //         dolore magna aliquam erat volutpat.
    //     </div>
    //     <div id="fragment-2">
    //         2 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
    //         dolore magna aliquam erat volutpat.
    //     </div>
    //     <div id="fragment-3">
    //         3 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
    //         dolore magna aliquam erat volutpat.
    //     </div>
    //     <div id="fragment-4">
    //         4 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
    //         dolore magna aliquam erat volutpat.
    //     </div>
    //     <div id="fragment-5">
    //         5 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
    //         dolore magna aliquam erat volutpat.
    //     </div>
    //     <div id="fragment-6">
    //         6 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
    //         dolore magna aliquam erat volutpat.
    //     </div>
    //     </div>
    // </div>`;
    // this.bodyDiv.appendChild(this.tabs);

    // var bodyDiv = this.bodyDiv;
    // var aTags = this.bodyDiv.querySelectorAll('#tabs>ul>li>a');
    // var fragments = this.bodyDiv.querySelectorAll('[id^="fragment-"]');

    // var closeAllTabs = function () {
    //   fragments.forEach(function (item) {
    //     item.style.display = 'none';
    //   });
    //   aTags.forEach(function (item) {
    //     item.classList.remove('selected');
    //   });
    // };

    // var doClick = function (event) {
    //   var tab = event.currentTarget;
    //   if (tab.classList.contains('selected')) {
    //     closeAllTabs();
    //   } else {
    //     closeAllTabs();
    //     tab.classList.add('selected');
    //     var elementId = event.currentTarget.href.split('#').pop();
    //     var element = bodyDiv.querySelector('#' + elementId);
    //     element.style.display = 'block';
    //     event.stopImmediatePropagation();
    //   }
    // };

    // aTags.forEach(function (item) {
    //   item.addEventListener('click', doClick);
    // });

    // // Need to work out a better way of closing the info panel
    // this.panelDiv.addEventListener('click', closeAllTabs, true);
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
