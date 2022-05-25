'use strict'

const Link = require("grenache-nodejs-link");
const { PeerRPCClient } = require("grenache-nodejs-http");
const readline = require('readline');
const crypto = require("crypto");

const { grapes, clientConfig, REQUESTS, } = require('../config/config');
const { logger, } = require('../utils/utils');
const OrderGetter = require('./clientOrderGetter')()


const [ , ,order] = process.argv

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const waitForUserInput = () => {
  rl.question("Command: ", async (answer)=> {
    if (answer === "exit"){
      rl.close();
    } else {
      await makeRequest(answer)
      waitForUserInput();
    }
  });
}

const grapeHost = grapes[Math.floor(Math.random() * grapes.length)].host

if (!grapeHost) {
  logger(500,'Cannot find grapes')
  process.exit(1)
}
const grapeUrl = clientConfig.protocol + grapeHost + ':' + grapes[0].api_port

const clientId = crypto.randomBytes(8).toString('hex')

const link = new Link({
  grape: grapeUrl
})
link.start()

const peer = new PeerRPCClient(link, {})
peer.init()

peer.request(REQUESTS.GET_ORDERS, { timeout: 5000 }, async (err, data) => {
  if (err) {
    logger(500, err);
    process.exit(-1);
  }
  logger(data.code, data);
  OrderGetter.syncOrder(data);
  if(order) await makeRequest(order)
})

const makeRequest = async (data) =>{
  const [type, amount, curr, price] = data.split('/')
  if(type && amount && curr && price){
    const total = amount * price;
    await peer.request(REQUESTS[`${type.toUpperCase()}_ORDER`], {clientId, type, amount, curr, price, total}, { timeout: 10000 }, (err, res) => {
      if (err) {
        logger(500, err);
      } else {
        const {code, message, data } = res
        logger(code, message);
        OrderGetter.syncOrder(data);
      }
    })
  } else {
    peer.request(data, { timeout: 10000 }, async (err, data) => {
      if (err) {
        logger(500, err);
      }
      logger(200, data);
      OrderGetter.syncOrder(data);
    })
  }
}

waitForUserInput();


