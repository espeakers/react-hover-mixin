var dd = require("react-dd");
var React = require("react");
var xtend = require("xtend");
var HoverMixin = require("./");

var css_question_mark = {
  display: "inline-block",
  cursor: "pointer",
  textAlign: "center",
  color: "white",
  background: "#0078CD",
  width: 20,
  fontSize: 20,
  fontWeight: "bold",
  borderRadius: 10
};

var Basic = dd.createClass({
  mixins: [HoverMixin],
  render: function(){
    return dd.div(null,
      dd.div({
          onMouseEnter: this.hoverable_onMouseEnter,
          onMouseLeave: this.hoverable_onMouseLeave,

          style: css_question_mark
        },
        "?"
      ),
      this.state.hover ? "I'm being hovered over!" : null
    );
  }
});

var Advanced = dd.createClass({
  mixins: [HoverMixin],
  hoverable_onUserLeftHoverable: function(){
    console.log("user left");
  },
  render: function(){
    return dd.div(null,
      dd.div({
          ref: "hoverable",
          onMouseEnter: this.hoverable_onMouseEnter,
          onMouseLeave: this.hoverable_onMouseLeave,

          style: xtend(css_question_mark, {background: "#CD7800"})
        },
        "?"
      ),
      dd.pre(null, "this.state\n" + JSON.stringify(this.state, false, 2))
    );
  }
});

React.render(dd.createClass({
  render: function(){
    return dd.div(null,
      dd.h1(null, "HoverMixin example"),
      dd.h2(null, "Basic"),
      Basic(),
      dd.h2(null, "Advanced"),
      Advanced()
    );
  }
})(), document.body);
