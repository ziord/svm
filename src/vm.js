const compileMod = require("./compiler");
const opcodes = compileMod.OPCODES;

class VM {
  constructor(code) {
    this.ip = 0;
    this.stack = [];
    this.code = code;
  }

  readByte() {
    return this.code[this.ip++];
  }

  readConst() {
    return this.readByte();
  }

  push(value) {
    this.stack.push(value);
  }

  pop() {
    return this.stack.pop();
  }

  execute() {
    for (;;) {
      const byte = this.readByte();
      switch (byte) {
        case opcodes.PUSH:
          this.push(this.readConst());
          break;
        case opcodes.ADD: {
          const right = this.pop();
          const left = this.pop();
          this.push(left + right);
          break;
        }
        case opcodes.SUB: {
          const right = this.pop();
          const left = this.pop();
          this.push(left - right);
          break;
        }
        case opcodes.MUL: {
          const right = this.pop();
          const left = this.pop();
          this.push(left * right);
          break;
        }
        case opcodes.DIV: {
          const right = this.pop();
          const left = this.pop();
          this.push(left / right);
          break;
        }
        case opcodes.RET: {
          console.log(this.pop());
          return;
        }
      }
    }
  }
}

module.exports = VM;
