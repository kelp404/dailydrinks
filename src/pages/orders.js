const React = require('react');

module.exports = class Orders extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="container">
      <div className="row">
        <div className="col">
          <h2 className="text-center">Orders</h2>
        </div>
      </div>
    </div>;
  }
};
