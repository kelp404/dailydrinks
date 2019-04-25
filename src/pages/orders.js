const React = require('react');
const {Link} = require('capybara-router');

module.exports = class Orders extends React.PureComponent{
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="container">
      <div className="row">
        <div className="col">
          <h2>Orders</h2>
          <hr/>
          <table className="table">
            <thead>
            <tr>
              <th className="text-right">#</th>
              <th>Name</th>
              <th className="text-right">Price</th>
              <th>Notes</th>
            </tr>
            </thead>
            <tbody>
            {
              this.props.orders.length <= 0 ?
                <tr>
                  <td colSpan="4" className="text-center text-muted">Empty</td>
                </tr> :
                <></>
            }
            {
              this.props.orders.map((order, index) => (
                <tr key={`order-${order.id}`}>
                  <td className="text-right">
                    <Link to={{name: 'web.order', params: {orderId: order.id}}}>{index + 1}</Link>
                  </td>
                  <td>{order.name}</td>
                  <td className="text-right">{order.price}</td>
                  <td>
                    <pre>
                      <code>{order.notes}</code>
                    </pre>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>;
  }
};
