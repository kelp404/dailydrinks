const axios = require('axios');
const {Router} = require('capybara-router');
const history = require('history');

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
      resolve: {
        orders: () => axios({method: 'GET', url: '/api/orders'}).then(response => response.data)
      },
      component: require('./pages/orders')
    },
    {
      name: 'web.new-order',
      uri: 'new-order',
      resolve: {
        orders: () => null
      },
      component: require('./pages/order')
    },
    {
      name: 'not-found',
      uri: '.*',
      component: require('./pages/shared/not-found')
    }
  ],
  errorComponent: require('./pages/shared/error-page')
});
