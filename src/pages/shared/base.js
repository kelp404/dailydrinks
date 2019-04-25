const classNames = require('classnames');
const React = require('react');
const {RouterView, Link} = require('capybara-router');

module.exports = class Base extends React.Component{
  constructor(props) {
    super(props);
    const router = require('../../router');
    this.state = {
      currentRouteName: ''
    };
    this.listens = [
      router.listen('ChangeSuccess', (action, toState, fromState) => {
        this.setState({currentRouteName: toState.name});
      })
    ];
  }

  componentWillUnmount() {
    this.listens.forEach(x => x());
  }

  render() {
    const classTable = {
      ordersLink: classNames([
        'nav-item',
        {active: this.state.currentRouteName === 'web.orders'}
      ]),
      newOrderLink: classNames([
        'nav-item',
        {active: this.state.currentRouteName === 'web.new-order'}
      ])
    };

    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">dailydrinks</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown">
              <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav mr-auto">
                <li className={classTable.ordersLink}>
                  <Link className="nav-link" to="/">Orders</Link>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className={classTable.newOrderLink}>
                  <Link className="nav-link" to="/new-order">New order</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="pt-3">
          <RouterView>
            <p className="text-center text-muted h3" style={{padding: '20px 0'}}>
              <i className="fa fa-spinner fa-pulse fa-fw"/> Loading...
            </p>
          </RouterView>
        </div>
      </>
    );
  }
};

