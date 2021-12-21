const lexMod = require("./lexer");

/*
term           →  	factor ( ( "-" | "+" ) factor )*
factor         → 	integer ( ( "/" | "*" ) integer)*
integer       → 	[0-9]+
 */

class AST {
  constructor() {
    if (new.target === AST) {
      throw new Error("Cannot instantiate class directly.");
    }
  }

  visit(node) {
    throw new Error("NotImplemented");
  }
}

class Visitor extends AST {
  visit(node) {
    const prop = `visit${node.constructor.name}`;
    this[prop].call(this, node);
  }
}

class IntegerNode extends AST {
  constructor(value) {
    super();
    this.integer = value;
  }
}

class BinaryOpNode extends AST {
  /**
   * @param {AST} left
   * @param {AST} right
   * @param {TokenType} op
   */
  constructor(left, right, op) {
    super();
    this.op = op;
    this.leftNode = left;
    this.rightNode = right;
  }
}

class Parser {
  constructor(src) {
    this.lexer = new lexMod.Lexer(src);
    this.currentToken = null;
  }

  assert(condition, msg) {
    if (!condition) {
      throw new Error(msg);
    }
  }

  term() {
    let node = this.factor(),
      op = null;
    const types = [lexMod.TokenType.TOKEN_MINUS, lexMod.TokenType.TOKEN_PLUS];
    while (types.includes(this.currentToken.type)) {
      op = this.currentToken.type;
      this.advance();
      node = new BinaryOpNode(node, this.factor(), op);
    }
    return node;
  }

  factor() {
    let node = this.integer(),
      op = null;
    const types = [lexMod.TokenType.TOKEN_DIV, lexMod.TokenType.TOKEN_MUL];
    while (types.includes(this.currentToken.type)) {
      op = this.currentToken.type;
      this.advance();
      node = new BinaryOpNode(node, this.integer(), op);
    }
    return node;
  }

  integer() {
    const token = this.currentToken;
    this.assert(
      token.type === lexMod.TokenType.TOKEN_INTEGER,
      "Expected integer token"
    );
    this.advance();
    return new IntegerNode(Number.parseInt(token.value));
  }

  advance() {
    this.currentToken = this.lexer.getToken();
  }

  parse() {
    this.advance();
    return this.term();
  }
}

module.exports = {
  Parser,
  Visitor,
  TokenType: lexMod.TokenType,
};
