const Pretender = require('pretender').default;

const STORAGE_PREFIX = 'dailydrinks_';

module.exports = new Pretender(function() {
  this.get('/api/orders', () => {
    const orders = JSON.parse(localStorage[`${STORAGE_PREFIX}orders`] || '[]');
    return [200, {'Content-Type': 'application/json'}, JSON.stringify(orders)]
  });

  // this.get('/photos/:id', request => {
  //   return [200, {"Content-Type": "application/json"}, JSON.stringify(PHOTOS[request.params.id])]
  // });
});
