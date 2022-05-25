# Simplified Distributed Exchange

## Install

```sh
npm install
```

## How to start

### In separate terminal run Grenache

```sh
npm run grapes
```

### In separate terminal run Server

```sh
npm run server
```

### For every Client run the following in separate terminal

To start the client:
```sh
npm run client
```

To start the client and place the following order "Buy 0.60 bitcoin at 30,000 USD:
```sh
npm run client buy/0.60/btcusd/30000
```

To start the new client in separate terminal and place the following order "Sell 0.50 bitcoin at 30,000 USD:
```sh
npm run client sell/0.60/btcusd/30000
```
###Order composition:

| Action/     | Amount/       | Crypto/     | Price  |                   
| ----------- | --------------|-------------|---------|
| buy/        | number/       | btcusd      | 30000 |
| sell/       | number/       | dogeusd     | 0.0833 |
 


###To place another order after the client was created:
**Create client:** 
npm run client

> bfx-test@1.0.0 client
> node client/client.js
Command: 200 MESSAGE: {"code":200,"message":"Successfully completed the request","data":[]}

**Place another order after the client was created:**
buy/0.60/btcusd/30000

>Command: 200 MESSAGE: "Successfully completed the request"

###More orders can be created one after another:  

buy/0.50/btcusd/30000

sell/10000/dogeusd/0.0833

**After each order  the following confirmation is received:**

>Command: 200 MESSAGE: "Successfully completed the request"

###Orders list can be retried by:

get_orders

**and is followed by order list:**

>Command: 200 MESSAGE: {"code":200,"message":"Successfully completed the request","data":[{"clientId":"5ca3d51203f4322a","type":"buy","amount":"0.50","curr":"btcusd","price":"30000","total
":15000},{"clientId":"5ca3d51203f4322a","type":"sell","amount":"10000","curr":"dogeusd","price":"0.0833","total":833}]}

get_orders would also return actual order list if requested on the other client. The order list consists of all closed and open orders which amount equals to remainder of the initial order.


# Todo
[ ] Evaluate race conditions
