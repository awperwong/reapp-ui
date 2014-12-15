var Component = require('ui/component');
var Icon = require('./Icon');

module.exports = Component({
  name: 'Button',

  render() {
    var { iconProps, icon, children, borderless, rounded, active, ...props } = this.props;

    if (iconProps)
      iconProps.color = iconProps.color || this.getStyleVal('color');

    if (icon && iconProps)
      icon = Component.clone(icon, iconProps, true);

    if (borderless)
      this.addStyles(this.styles.borderless);

    if (rounded)
      this.addStyles(this.styles.rounded);

    if (active)
      this.addStyles(this.styles.active);

    return (
      <button {...this.componentProps()} {...props}>
        {icon || !!iconProps && <Icon {...iconProps} />}
        {children && (
          <span style={{ margin: 'auto' }}>
            {children}
          </span>
        )}
      </button>
    );
  }
});