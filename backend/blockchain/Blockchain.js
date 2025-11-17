import SHA256 from "crypto-js/sha256.js";

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
      this.timestamp +
      JSON.stringify(this.data) +
      this.previousHash +
      this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

export default class Blockchain {
  constructor(name = "chain") {
    this.name = name;
    this.chain = [];
    this.difficulty = 2;
  }

  createGenesisBlock(parentHash = "0") {
    const genesis = new Block(0, Date.now(), "GENESIS BLOCK", parentHash);
    genesis.hash = genesis.calculateHash();
    this.chain.push(genesis);
    return genesis;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const latest = this.getLatestBlock();

    const newBlock = new Block(
      this.chain.length,
      Date.now(),
      data,
      latest.hash
    );

    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
  for (let i = 1; i < this.chain.length; i++) {
    const current = this.chain[i];
    const previous = this.chain[i - 1];

    // ✔ Recalculate hash manually (JSON-safe)
    const recalculatedHash = SHA256(
      current.index +
      current.timestamp +
      JSON.stringify(current.data) +
      current.previousHash +
      current.nonce
    ).toString();

    // ❌ If stored hash doesn't match computed hash
    if (current.hash !== recalculatedHash) {
      return false;
    }

    // ❌ If previousHash pointer is broken
    if (current.previousHash !== previous.hash) {
      return false;
    }
  }

  return true;
}

}
