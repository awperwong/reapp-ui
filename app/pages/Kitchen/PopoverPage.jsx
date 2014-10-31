var React = require('react');
var DrawerView = require('ui/views/DrawerView');

var PopoverPage = React.createClass({
  render() {
    return (
      <DrawerView id="PopoverPage" title="PopoverPage">
        PopoverPage View
      </DrawerView>
    );
  }
});

module.exports = PopoverPage;