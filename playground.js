const Blockchains = require('./blockchain.js')

const myBC = new Blockchains()

// addBlock takes 2 arguments
// checks hash of previous block to current block id

myBC.verifyChain()

for (let i = 0; i < 10; i++) {
    myBC.addBlock('Nick', 1000 * i)
}

console.log(myBC.blocks)
