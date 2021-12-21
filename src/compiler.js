const { Visitor, TokenType } = require("./parser");

// we support only 7 instructions
const OPCODES = {
  ADD: 0,
  MUL: 1,
  SUB: 2,
  DIV: 3,
  LOAD: 4,
  PUSH: 5,
  RET: 6,
};

class Compiler extends Visitor {
  constructor(node) {
    super();
    this.root = node;
    this.code = [];
  }

  visitIntegerNode(node) {
    this.code.push(OPCODES.PUSH);
    this.code.push(node.integer);
  }

  visitBinaryOpNode(node) {
    this.visit(node.leftNode);
    this.visit(node.rightNode);
    switch (node.op) {
      case TokenType.TOKEN_MUL:
        this.code.push(OPCODES.MUL);
        break;
      case TokenType.TOKEN_DIV:
        this.code.push(OPCODES.DIV);
        break;
      case TokenType.TOKEN_PLUS:
        this.code.push(OPCODES.ADD);
        break;
      case TokenType.TOKEN_MINUS:
        this.code.push(OPCODES.SUB);
        break;
    }
  }

  compile() {
    this.visit(this.root);
    this.code.push(OPCODES.RET);
    return this.code;
  }
}

module.exports = { Compiler, OPCODES };
