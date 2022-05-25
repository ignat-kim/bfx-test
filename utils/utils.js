const logger = (code, message) => {
  console.log(`${code} MESSAGE: ${JSON.stringify(message)}`);
}
const response = (code, message) => ({ code, message });


module.exports = {
  logger, response
}
