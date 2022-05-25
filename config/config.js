
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
}
