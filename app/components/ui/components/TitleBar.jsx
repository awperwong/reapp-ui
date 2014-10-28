var React = require('react/addons');
var ReactStyle = require('react-style');
var DocumentTitle = require('react-document-title');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var ReactDescriptor = require('react/lib/ReactDescriptor');
var Transforms = require('../animations/Transforms');

require('./TitleBar.styl');

var TOOLBAR_HEIGHT = 44;

var TitleBar = React.createClass({
  styles: (height) => ReactStyle({
    fontSize: '16px',
    backgroundColor: '#fff',
    textAlign: 'center',
    borderBottom: '1px solid #ccc',
    zIndex: 100,
    position: 'fixed',
    top: 0,
    left: 100,
    width: '100%',
    height: height || TOOLBAR_HEIGHT
  }),

  componentWillReceiveProps(nextProps) {
    this.animate(nextProps.step);
  },

  componentDidMount() {
    var node = this.getDOMNode();

    if (node) {
      var total = node.querySelectorAll('[data-transform]').length + Number(node.hasAttribute('data-transform'));
      this.getElementsWithTransforms([], total, node, this.props.index, nodes => {
        this.transformElements = nodes;
        this.animate(0);
      });
    }
  },

  getElementsWithTransforms(nodes, total, node, index, cb) {
    if (node.hasAttribute('data-transform')) {
      total = total - 1;
      nodes.push({
        el: node,
        transform: node.getAttribute('data-transform'),
        index: node.getAttribute('data-transform-index') || index
      });
    }

    if (total === 0)
      cb(nodes);
    else {
      var children = Array.prototype.slice.call(node.children);
      children.forEach(child => {
        this.getElementsWithTransforms(nodes, total, child, node.getAttribute('data-transform-index') || index, cb);
      });
    }
  },

  animate(step) {
    if (!this.transformElements) return;
    this.transformElements.forEach(transformElement => {
      var { el, transform, index } = transformElement;
      Transforms[transform](el, index, step);
    });
  },

  addIconTransform(component) {
    return ReactDescriptor.isValidDescriptor(component) ?
      React.addons.cloneWithProps(component, { iconTransforms: 'MOVE_TO_RIGHT' }) :
      component;
  },

  render() {
    if (!this.props.title) return null;

    var [ left, mid, right ] = this.props.title;
    var styles = this.styles(this.props.height);

    // add icon transitions for left and right
    left = this.addIconTransform(left);
    right = this.addIconTransform(right);

    return (
      <div className="TitleBar" data-transform="FADE_TO_LEFT" data-transform-index={this.props.index} styles={styles}>
        <div className="TitleBar--left">{left}</div>
        <div className="TitleBar--mid">{mid}</div>
        <div className="TitleBar--right">{right}</div>
      </div>
    );
  }
});

module.exports = TitleBar;