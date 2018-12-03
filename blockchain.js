const uuidv1 = require('uuid/v1');

class Blockchains {
    constructor () {
        this.blocks = []
    }

    addBlock (user, amount) {
        let newBlock = new Block(user, amount)
        
        if (this.blocks.length === 0) {
            newBlock.id = null
        } else {
            newBlock.id = this.blocks[(this.blocks.length - 1)].hash
        }

        this.blocks.push(newBlock)
    }

    verifyChain () {
        for (var i = 0; i < this.blocks.length; i++) {
            if (i === (this.blocks.length - 1)) {
                console.log("All blocks are verified.")
            } else if (this.blocks[i].hash === this.blocks[i + 1].id) {
                console.log(`Block ${i} is verfied`)
            } else {
                console.log(`There's an error in block ${i}`)
            }
        }
    }
}

class Block {
    constructor (user, amount) {
        this.id = null,
        this.hash = uuidv1(),
        this.data = {
            user,
            amount
        }
    }
}

module.exports = Blockchains

const myBlockChain = new Blockchains()
