// examples/token-sim.js
// Simple Tokenomics simulation for Endless Protocol

class Token {
  constructor(name, totalSupply) {
    this.name = name;
    this.totalSupply = totalSupply;
    this.balances = {};
  }

  // mint tokens to an address
  mint(address, amount) {
    if (!this.balances[address]) this.balances[address] = 0;
    this.balances[address] += amount;
    return this.balances[address];
  }

  // transfer tokens
  transfer(from, to, amount) {
    if ((this.balances[from] || 0) < amount) {
      throw new Error("Insufficient balance");
    }
    this.balances[from] -= amount;
    if (!this.balances[to]) this.balances[to] = 0;
    this.balances[to] += amount;
    return true;
  }

  // staking simulation: lock tokens and earn reward
  stake(address, amount, rewardRate = 0.1) {
    if ((this.balances[address] || 0) < amount) {
      throw new Error("Insufficient balance to stake");
    }
    this.balances[address] -= amount;
    const reward = amount * rewardRate;
    this.balances[address] += amount + reward;
    return reward;
  }
}

// Demo run
const token = new Token("ENDL", 1000000);
token.mint("Alice", 1000);
token.mint("Bob", 500);

console.log("Balances after minting:", token.balances);

token.transfer("Alice", "Bob", 200);
console.log("Balances after transfer:", token.balances);

const reward = token.stake("Bob", 300);
console.log("Bob staked 300 tokens, earned reward:", reward);
console.log("Final balances:", token.balances);
