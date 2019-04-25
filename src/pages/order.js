const React = require('react');

module.exports = class Order extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="container">
      <div className="row">
        <div className="col">
          <h2 className="text-center">Order</h2>
        </div>
      </div>
    </div>;
  }
};
