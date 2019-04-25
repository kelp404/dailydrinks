const {Router} = require('capybara-router');
const history = require('history');
const api = require('./api');

module.exports = new Router({
  history: history.createBrowserHistory(),
  routes: [
    {
      isAbstract: true,
      name: 'web',
      uri: '/',
      component: require('./pages/shared/base')
    },
    {
      name: 'web.orders',
      uri: '',
      onEnter: () => {document.title = 'Orders - dailydrinks'},
      resolve: {
        orders: () => api.order.getOrders().then(response => response.data)
      },
      component: require('./pages/orders')
    },
    {
      name: 'web.new-order',
      uri: 'new-order',
      onEnter: () => {document.title = 'New order - dailydrinks'},
      resolve: {
        orders: () => null
      },
      component: require('./pages/order')
    },
    {
      name: 'web.order',
      uri: 'orders/{orderId:[\\w\\d]{1,20}}',
      onEnter: () => {document.title = 'Order - dailydrinks'},
      resolve: {
        order: params => api.order.getOrder(params.orderId).then(response => response.data)
      },
      component: require('./pages/order')
    },
    {
      name: 'error',
      uri: '/error?error',
      component: require('./pages/shared/error-page')
    },
    {
      name: 'not-found',
      uri: '.*',
      onEnter: () => {document.title = 'Not found - dailydrinks'},
      component: require('./pages/shared/not-found')
    }
  ],
  errorComponent: require('./pages/shared/error-page')
});
