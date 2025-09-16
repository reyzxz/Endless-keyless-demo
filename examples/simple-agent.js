// examples/simple-agent.js
// A simple demo agent for Endless Protocol contributions

class SimpleAgent {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, I am ${this.name}, an Endless demo agent 🤖`;
  }

  think(input) {
    if (input.toLowerCase().includes("endless")) {
      return "Endless is about decentralized AI & Web3 infra 🌌";
    } else {
      return `I received your message: "${input}"`;
    }
  }
}

// Demo run
const agent = new SimpleAgent("Luffa");
console.log(agent.greet());
console.log(agent.think("Tell me about Endless"));
console.log(agent.think("Ping test!"));
