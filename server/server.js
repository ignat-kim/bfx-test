'use strict'

const { PeerRPCServer }  = require('grenache-nodejs-http');
const Link = require('grenache-nodejs-link');
const OrderGetter = require('./serverOrderGetter')();
const { REQUESTS, } = require('../config/config');
const {logger, response,} = require('../utils/utils');


const requestHandler = (type, handler, orderGetter, payload) => {
  switch (type) {
    case REQUESTS.GET_ORDERS:
      handler.reply(null, {
        ...response(200,'Successfully completed the request'),
        data: orderGetter.getOrders(),
      });
      break;
    case REQUESTS.BUY_ORDER:
    case REQUESTS.SELL_ORDER:
      transactionProcessor(orderGetter, payload);
      handler.reply(null, {
        ...response(200, 'Successfully completed the request'),
        data: orderGetter.getOrders(),
      });
      break;
    default:
      logger(400, 'Invalid Request key');
  }
};

const transactionProcessor = (orderGetter, payload) => {
  const orders = orderGetter.getOrders();
  const updatedBooks = orders.map((order) => {

    if(!order && !payload) return;

    if (order.clientId === payload.clientId) return order;

    if (payload.curr !== order.curr || payload.type === order.type) return order;

    if (payload.price === order.price) {
      if(order.type==='sell' && payload.type === 'buy' ){
        const sell = order.amount;
        const buy = payload.amount;
        const leftOver = (sell * 1000 - buy * 1000) / 1000
        order.amount = leftOver >= 0 ? leftOver: 0
        order.total = order.amount * order.price;
        payload.amount = leftOver >= 0 ? 0 : -leftOver
        payload.total = payload.amount * payload.price;
        return order;
      } else {
        const sell = payload.amount;
        const buy = order.amount;
        const leftOver = (sell * 1000 - buy * 1000) / 1000
        payload.amount = leftOver >= 0 ? leftOver: 0
        payload.total = payload.amount * order.price;
        order.amount = leftOver >= 0 ? 0 : -leftOver
        order.total = order.amount * payload.price;
        return order;
      }
    }
    return order;
  });

  orderGetter.syncOrder(updatedBooks);
  orderGetter.saveOrder(payload);
};

const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()

const peer = new PeerRPCServer(link, {
  timeout: 300000
})
peer.init()

const port = 1024 + Math.floor(Math.random() * 1000)
const service = peer.transport('server')
service.listen(port)

setInterval(() => {
  Object.keys(REQUESTS).forEach(key => {
    link.announce(REQUESTS[key], service.port, {})
  })
}, 1000)

service.on('request', (rid, key, payload, handler) => {
  requestHandler(key, handler, OrderGetter, payload);
})
