const crypto = require('crypto')

class Blockchains {
    constructor () {
        this.blocks = []
    }

    createUUID () {
        const dt = new Date().getMilliseconds()
        const uuid = ((dt + Math.random() * 16) % 16 | 0).toString
        return uuid
    }

    addBlock (user, amount) {
        const newBlock = new Block(user, amount)
        const cipherHash = crypto.createHash('sha1')
                                .update(this.createUUID() + JSON.stringify(newBlock.data))
                                .digest('hex')

        newBlock.hash = cipherHash

        // increase difficulty for every 5 blocks
        newBlock.difficulty = Math.round(newBlock.difficulty + (this.blocks.length / 5))

        this.findSolution(newBlock)

        if (this.blocks.length === 0) {
            newBlock.id = null
        } else {
            newBlock.id = this.blocks[(this.blocks.length - 1)].hash
        }

        this.blocks.push(newBlock)
    }

    findSolution (block) {
        // number of loop
        let nonce = 0

        while (true) {
            let answer = crypto.createHash('sha256')
                            .update(this.createUUID() + JSON.stringify(block.data) + nonce)
                            .digest('hex')

            // if (nonce % 5000 === 0) {
            //     console.log(nonce)
            //     console.log(answer)
            //     console.log(block.hash)
            // }

            if (answer.startsWith('0'.repeat(block.difficulty))) {
                console.log(block.hash)                
                console.log('Success')
                
                block.answer = answer
                block.nonce = nonce
                return
            }

            nonce++
        }
    }

    verifySolution () {

    }

    verifyChain () {
        for (var i = 0; i < this.blocks.length; i++) {
            if (i === (this.blocks.length - 1)) {
                console.log("Last block is verified.")
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
        this.hash = null,
        this.difficulty = 1,
        this.nonce = 0,
        this.answer = null,
        this.result = null
        this.data = {
            user,
            amount
        }
    }
}

module.exports = Blockchains

const myBlockChain = new Blockchains()
