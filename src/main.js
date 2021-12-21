const parseMod = require("./parser");
const { Compiler } = require("./compiler");
const VM = require("./vm");

function execute(src, debug = false) {
  // The Pipeline:
  // Input -> Lexer -> Parser -> AST -> Compiler -> Bytecode Instructions -> VM -> execute
  // setup the parser
  const parser = new parseMod.Parser(src);
  const node = parser.parse();
  debug ? console.log("Source (AST) root node:", node) : void 0;
  // setup the compiler
  const comp = new Compiler(node);
  const code = comp.compile();
  debug ? console.log("Compiled code:", code) : void 0;
  // setup the vm
  const vm = new VM(code);
  vm.execute();
}

execute("1222 * 3 - 4 / 5 * 3");
