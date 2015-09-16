var now = Date.now || function(){
  return new Date().getTime();
};

module.exports = {
  getInitialState: function(){
    this.__HoverMixin_fast_state = {
      hover: false,
      last_time: now(),
      interval: 100,
      timeout_handle: null,
      on_user_left_waitfor: 500,
      on_user_left_debounce_handler: null
    };
    return {hover: false, hoverable_top: 0, hoverable_left: 0};
  },
  ___fastStateChangeHover: function(){
    var diff = now() - this.__HoverMixin_fast_state.last_time;
    if(diff >= this.__HoverMixin_fast_state.interval){
      var self = this;

      this.setState({hover: this.__HoverMixin_fast_state.hover}, function(){
        if(self.hoverable_onUserLeftHoverable && !self.__HoverMixin_fast_state.hover){
          clearTimeout(self.__HoverMixin_fast_state.on_user_left_debounce_handler);
          self.__HoverMixin_fast_state.on_user_left_debounce_handler = setTimeout(function(){
            if(!self.state.hover){//only if still not hovering after the time has passed
              self.hoverable_onUserLeftHoverable();
            }
          }, self.__HoverMixin_fast_state.on_user_left_waitfor);
        }
      });
      this.__HoverMixin_fast_state.last_time = now();
    }else{
      clearTimeout(this.__HoverMixin_fast_state.timeout_handle);
      this.__HoverMixin_fast_state.timeout_handle = setTimeout(this.___fastStateChangeHover, diff);
    }
  },
  hoverable_onMouseEnter: function(){
    this.__HoverMixin_fast_state.hover = true;
    this.___fastStateChangeHover();
  },
  hoverable_onMouseLeave: function(){
    this.__HoverMixin_fast_state.hover = false;
    this.___fastStateChangeHover();
  },
  componentDidUpdate: function(){
    var dom_node = this.refs.hoverable && this.refs.hoverable.getDOMNode && this.refs.hoverable.getDOMNode();
    if(!dom_node || !this.state.hover){
      return;
    }
    var parentNode = dom_node.parentNode;
    var rect = parentNode.getBoundingClientRect();
    var parent_width = Math.max(0, parentNode.offsetWidth);
    if(this.not_relative_to_parent_bounding_rect){
      rect = {top: 0, left: 0};
    }
    var top = parseInt(rect.top - Math.max(0, dom_node.offsetHeight), 10) || 0;
    var left = parseInt(rect.left - (dom_node.offsetWidth / 2) + (parent_width / 2), 10) || 0;

    var new_state = {};
    if(Math.abs(top - this.state.hoverable_top) > 5){
      new_state.hoverable_top = top;
    }
    if(Math.abs(left - this.state.hoverable_left) > 5){
      new_state.hoverable_left = left;
    }
    if(Object.keys(new_state).length > 0){
      //only make changes when needed so we don't get into a loop (some loops are over a few pixels difference)
      this.setState(new_state);
    }
  }
};
