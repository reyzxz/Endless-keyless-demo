// examples/zk-demo.js
// Pro-style Zero-Knowledge Proof simulation for Endless Protocol

const crypto = require("crypto");

class ZKAgent {
  constructor(secret) {
    this.secret = secret;
  }

  // generate "commitment" without revealing secret
  commit() {
    this.nonce = crypto.randomBytes(16).toString("hex");
    const data = this.secret + this.nonce;
    this.commitment = crypto.createHash("sha256").update(data).digest("hex");
    return this.commitment;
  }

  // verifier sends a challenge (just a dummy here)
  prove(challenge) {
    // proof combines secret + nonce + challenge
    return crypto.createHash("sha256")
      .update(this.secret + this.nonce + challenge)
      .digest("hex");
  }

  // simple verification function
  static verify(commitment, proof, challenge, secret, nonce) {
    const recomputeCommitment = crypto.createHash("sha256")
      .update(secret + nonce)
      .digest("hex");
    const recomputeProof = crypto.createHash("sha256")
      .update(secret + nonce + challenge)
      .digest("hex");
    return recomputeCommitment === commitment && recomputeProof === proof;
  }
}

// Demo run
const agent = new ZKAgent("EndlessSecret");
const commit = agent.commit();
const challenge = "verify123";
const proof = agent.prove(challenge);

console.log("Commitment:", commit);
console.log("Proof:", proof);
console.log("Verification:", ZKAgent.verify(commit, proof, challenge, "EndlessSecret", agent.nonce));
