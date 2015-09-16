# react-hover-mixin
A react mixin that will update the components state on mouse hover. Designed for tooltips, popovers, and dropdowns.

```js
var HoverMixin = require("react-hover-mixin");
...
... React.createClass({
  mixins: [HoverMixin],
  render: function(){
    return React.createElement("div", null,

      React.createElement("b", {
          onMouseEnter: this.hoverable_onMouseEnter,
          onMouseLeave: this.hoverable_onMouseLeave,
        },
        "[hover over me]"
      ),

      this.state.hover ? "I'm being hovered over!" : null

    );
  }
});
```

## Example
```sh
$ git clone https://github.com/espeakers/react-hover-mixin.git
$ cd react-hover-mixin/
$ npm i
$ npm start
```
Then it will tell you which port it's hosted on so you can open it in your browser.

## API

### this.state.hover
`true` or `false` depending on if it's currently being hovered over.

### this.hoverable\_onMouseEnter and this.hoverable\_onMouseLeave
These are event handlers provided by the mixin. Simply attach them to the element you wish to observe the hover state of.

For example:
```js
...
React.createElement("div", {
    onMouseEnter: this.hoverable_onMouseEnter,
    onMouseLeave: this.hoverable_onMouseLeave,
  },
  ...
),
...
```

### child method: hoverable\_onUserLeftHoverable()
This is called when the component is not hovered over anymore. (after a 500ms wait to ensure the user isn't going to just hover right over it again)

### ref: "hoverable"
Set the ref to "hoverable" on the element if you want to get it's top and left position.

For example:
```js
...
React.createElement("div", {
    ref: "hoverable",
    onMouseEnter: this.hoverable_onMouseEnter,
    onMouseLeave: this.hoverable_onMouseLeave,
  },
  ...
),
...
```

### this.state.hoverable\_top and this.state.hoverable\_left
The top and left position of the "hoverable" element. These are handy when trying to absolute position a tooltip or dropdown.

## Installing
```sh
$ npm install --save react-hover-mixin
```

## FYI
This project follows [semantic versioning](http://semver.org/) for releases.

## License
MIT
