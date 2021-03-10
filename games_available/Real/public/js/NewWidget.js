(function(node) {  // Self-executing function for encapsulation.

    // Register the widget in the widgets collection
    // (will be stored at node.widgets.widgets).
    node.widgets.register('NewWidget', NewWidget);

    // Add Meta-data.

    NewWidget.version = '0.0.1';
    NewWidget.description = 'This widget does this';

    NewWidget.texts = {
        // Texts here (more info on this later).
    };

    NewWidget.sounds = {
        // Sounds here (if any).
    };

    // Title is displayed in the header.
    NewWidget.title = '';
    // Classname is added to the widgets.
    NewWidget.className = 'newwidget';

    // Dependencies are checked when the widget is created.
    NewWidget.dependencies = { JSUS: {} };

    // Constructor taking a configuration parameter.
    // The options object is always existing.
    function NewWidget(options) {
        // You can define widget properties here,
        // but they should get assigned a value in init.
    }

    NewWidget.prototype.init = function(options) {
       // Init widget variables, but do not create
       // HTML elements, they should be created in append.

       // Furthermore, you can add internal listeners here
       // or in the listeners method. (optional)
       this.on('destroyed', function() {
           // Do something. For example, notify another player.
       });
    }

    // Implements the Widget.append method.
    NewWidget.prototype.append = function() {
        // Widgets are Bootstrap panels. The following HTML
        // elements are available at the time when
        // the `append` method is called:
        //
        //   - panelDiv:   the outer container
        //   - headingDiv: the title container
        //   - bodyDiv:    the main container
        //   - footerDiv:  the footer container
        //
        this.button = document.createElement('button');
        this.button.classList.add('btn', 'btn-lg', 'btn-primary');
        this.button.innerText = 'Button';
        this.tabs = document.createElement('div');
        this.tabs.innerHTML = 
        `<div id="tabs">
            <ul>
            <li><a href="#fragment-1">1</a></li>
            <li><a href="#fragment-2">2</a></li>
            <li><a href="#fragment-3">3</a></li>
            <li><a href="#fragment-4">4</a></li>
            <li><a href="#fragment-5">5</a></li>
            <li><a href="#fragment-6">6</a></li>
            <li class="filler"></li>
            </ul>
            <div>
            <div id="fragment-1">
                1 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh euismod tincidunt ut laoreet
                dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh euismod tincidunt ut laoreet
                dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh euismod tincidunt ut laoreet
                dolore magna aliquam erat volutpat.
            </div>
            <div id="fragment-2">
                2 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                dolore magna aliquam erat volutpat.
            </div>
            <div id="fragment-3">
                3 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                dolore magna aliquam erat volutpat.
            </div>
            <div id="fragment-4">
                4 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                dolore magna aliquam erat volutpat.
            </div>
            <div id="fragment-5">
                5 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                dolore magna aliquam erat volutpat.
            </div>
            <div id="fragment-6">
                6 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                dolore magna aliquam erat volutpat.
            </div>
            </div>
        </div>`
        this.button.onclick = function() {
          // Do something.
        };
        this.bodyDiv.appendChild(this.button);
        this.bodyDiv.appendChild(this.tabs);
    };

    // Implements the Widget.listeners method (optional).
    NewWidget.prototype.listeners = function() {
        // Listeners added here using `node.on`
        // are automatically removed when the widget
        // is destroyed.
        node.on.data('MyEvent', function() {
          // Do something.
        });
    };

    // Overwrites some default methods, for example
    // the highlight method (optional).
    NewWidget.prototype.highlight = function() {
        if (!this.panelDiv) return;
        this.panelDiv.style.background = 'red';
        this.highlighted = true;
        // Do not forget to emit the event.
        this.emit('highlighted');
    };

    // Overwrites some default methods, for example
    // the unhighlight method (optional).
    NewWidget.prototype.unhighlight = function() {
        if (!this.panelDiv) return;
        this.panelDiv.style.background = 'white';
        this.highlighted = false;
        // Do not forget to emit the event.
        this.emit('unhighlighted');
    };

})(node);