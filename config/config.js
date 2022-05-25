
module.exports = {
  grapes:[
    {
      host: '127.0.0.1',
      dht_port: 20001,
      api_port: 30001,
      dht_bootstrap: [
        '127.0.0.1:20002'
      ],
    },
    {
      host: '127.0.0.1',
      dht_port: 20002,
      api_port: 30002,
      dht_bootstrap: [
        '127.0.0.1:20001'
      ],
    },
  ],
  clientConfig: {
    announceInterval: 5000,
    protocol: 'http://'
  },
  REQUESTS: {
    GET_ORDERS: "get_orders",
    SYNC_ORDERS: "sync_orders",
    BUY_ORDER: "create_buy_order",
    SELL_ORDER: "create_sell_order",
  },
}
