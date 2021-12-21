const TokenType = {
  TOKEN_INTEGER: "TOKEN_INTEGER", // 1, 2...
  TOKEN_PLUS: "TOKEN_PLUS", // '+'
  TOKEN_MINUS: "TOKEN_MINUS", // '-'
  TOKEN_DIV: "TOKEN_DIV", // '/'
  TOKEN_MUL: "TOKEN_MUL", // '*'
  TOKEN_EOF: "TOKEN_EOF",
};

function Token(type, value) {
  this.type = type;
  this.value = value;
}

class Lexer {
  constructor(src) {
    this.src = src;
    this.startIndex = 0;
    this.currentIndex = 0;
    this.currentChar = null;
  }

  atEnd() {
    return this.currentChar === undefined;
  }

  peek() {
    return this.src.charAt(this.currentIndex);
  }

  move() {
    return (this.currentChar = this.src[this.currentIndex++]);
  }

  isDigit(char) {
    return char >= "0" && char <= "9";
  }

  newToken(type, value = null) {
    const val =
      value !== null
        ? value
        : this.src.slice(this.startIndex, this.currentIndex);
    return new Token(type, val);
  }

  lexInteger() {
    while (this.isDigit(this.peek())) {
      this.move();
    }
    return this.newToken(TokenType.TOKEN_INTEGER);
  }

  skipSpace() {
    while (true) {
      switch (this.peek()) {
        case " ":
        case "\t":
        case "\r":
        case "\n":
          this.move();
          break;
        default:
          return;
      }
    }
  }

  getToken() {
    this.skipSpace();
    this.startIndex = this.currentIndex;
    const ch = this.move();
    if (this.atEnd()) {
      return this.newToken(TokenType.TOKEN_EOF, "");
    }
    if (this.isDigit(ch)) {
      return this.lexInteger();
    }
    switch (ch) {
      case "+":
        return this.newToken(TokenType.TOKEN_PLUS);
      case "-":
        return this.newToken(TokenType.TOKEN_MINUS);
      case "/":
        return this.newToken(TokenType.TOKEN_DIV);
      case "*":
        return this.newToken(TokenType.TOKEN_MUL);
      default:
        throw new Error(`Unrecognized character '${ch}'`);
    }
  }
}

module.exports = {
  TokenType,
  Lexer,
};
