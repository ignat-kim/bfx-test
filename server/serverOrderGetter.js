
module.exports = () => {
  let orders = [];

  getOrders = () => {
    return orders;
  };

  saveOrder = (order) => {
    orders.push(order);
    return order;
  };

  syncOrder = (orderBook) => {
    orders = orderBook;
  };

  return {
    syncOrder,
    getOrders,
    saveOrder
  };
};
