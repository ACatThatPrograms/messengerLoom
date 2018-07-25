var exports = module.exports = {};

const {
  NonceTxMiddleware, SignedTxMiddleware, Client,
  Contract, Address, LocalAddress, CryptoUtils
} = require('loom-js')

exports.message = function message(msg){
  console.log(msg);
}

exports.getContract = async function getContract(privateKey, publicKey) {
  const client = new Client(
    'default',
    'ws://192.168.1.220:46657/websocket',
    'ws://192.168.1.220:9999/queryws'
  )
  // required middleware
  client.txMiddleware = [
    new NonceTxMiddleware(publicKey, client),
    new SignedTxMiddleware(privateKey)
  ]
  const contractAddr = await client.getContractAddressAsync('BluePrint')
  const callerAddr = new Address(client.chainId, LocalAddress.fromPublicKey(publicKey))
  return new Contract({
    contractAddr,
    callerAddr,
    client
  })
}
