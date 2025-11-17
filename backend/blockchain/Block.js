import { sha256 } from "../utils/hash.js";

export default class Block {
  constructor(index, timestamp, data, prev_hash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;          // transaction payload
    this.prev_hash = prev_hash;
    this.nonce = 0;
    this.hash = this.computeHash();
  }

  computeHash() {
    return sha256(
      this.index +
      this.timestamp +
      JSON.stringify(this.data) +
      this.prev_hash +
      this.nonce
    );
  }

  mineBlock() {
    while (!this.hash.startsWith("0000")) {
      this.nonce++;
      this.hash = this.computeHash();
    }
  }
}
