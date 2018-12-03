const Blockchains = require('./blockchain.js')

let myBC = new Blockchains()

// addBlock takes 2 arguments
myBC.addBlock("Nick", 1000)
myBC.addBlock("Bryan", 2000)
myBC.addBlock("Sarah", 3000)

// checks hash of previous block to current block id
myBC.verifyChain()
