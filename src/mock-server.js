const Pretender = require('pretender').default;

const STORAGE_PREFIX = 'dailydrinks_';

const read = (key) => {
  /*
  Read data from the local storage.
  @param key {String}
  @return {Any}
   */
  try {
    return JSON.parse(localStorage[key]);
  } catch (_) {
    return null;
  }
};

const write = (key, value) => {
  /*
  Write data to the local storage.
  @param key {String}
  @param value {Any}
   */
  localStorage[key] = JSON.stringify(value);
};

module.exports = new Pretender(function() {
  this.get('/api/orders', () => {
    const orders = read(`${STORAGE_PREFIX}orders`) || [];
    return [200, {'Content-Type': 'application/json'}, JSON.stringify(orders)];
  });

  this.post('/api/orders', request => {
    const order = JSON.parse(request.requestBody);
    order.id = Math.random().toString(36).substr(2);
    const orders = read(`${STORAGE_PREFIX}orders`) || [];
    orders.push(order);
    write(`${STORAGE_PREFIX}orders`, orders);
    return [201, {'Content-Type': 'application/json'}, JSON.stringify(order)];
  });

  this.get('/api/orders/:orderId', request => {
    const orders = read(`${STORAGE_PREFIX}orders`) || [];
    const order = orders.find(x => x.id === request.params.orderId);
    if (order) {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify(order)];
    }
    return [404, {'Content-Type': 'application/json'}, JSON.stringify({message: 'not found'})];
  });

  this.put('/api/orders/:orderId', request => {
    const form = JSON.parse(request.requestBody);
    delete form.id;
    const orders = read(`${STORAGE_PREFIX}orders`) || [];
    const order = orders.find(x => x.id === request.params.orderId);
    if (order) {
      Object.assign(order, form);
      write(`${STORAGE_PREFIX}orders`, orders);
      return [200, {'Content-Type': 'application/json'}, JSON.stringify(order)];
    }
    return [404, {'Content-Type': 'application/json'}, JSON.stringify({message: 'not found'})];
  });

  this.delete('/api/orders/:orderId', request => {
    const orders = read(`${STORAGE_PREFIX}orders`) || [];
    const orderIndex = orders.findIndex(x => x.id === request.params.orderId);
    if (orderIndex >= 0) {
      orders.splice(orderIndex, 1);
      write(`${STORAGE_PREFIX}orders`, orders);
      return [204];
    }
    return [404, {'Content-Type': 'application/json'}, JSON.stringify({message: 'not found'})];
  })
});
