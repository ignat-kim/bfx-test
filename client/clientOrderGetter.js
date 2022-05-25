
module.exports = () => {

  let orders = [];

  getSavedOrders = () => {
    return orders;
  }

  syncOrder = (orderBook) => {
    orders = orderBook;
  }

  return {
    getSavedOrders,
    syncOrder
  }
}
