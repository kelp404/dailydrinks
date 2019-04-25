const axios = require('axios');

module.exports = {
  order: {
    getOrders: () => axios.get('/api/orders'),
    addOrder: order => axios.post('/api/orders', order),
    getOrder: orderId => axios.get(`/api/orders/${orderId}`),
    updateOrder: order => axios.put(`/api/orders/${order.id}`, order),
    deleteOrder: orderId => axios.delete(`/api/orders/${orderId}`)
  }
};
