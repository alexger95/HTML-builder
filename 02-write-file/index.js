const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { stdin: input, stdout: output } = require("process");


const outStream = fs.createWriteStream(path.join(__dirname, 'notes.json'));

const rl = readline.createInterface({ input, output });

const rLine = () => {
  rl.question("Hello Node how are you? \n", (data) => {
    if (data === "exit") {
      return rl.close();
    }
    outStream.write(`\n ${data}`);
    rLine();
  });
};

rLine();


process.on("SIGINT", () => {
  console.log("Bye bye!");
});

process.on("exit", () => {
  console.log("Bye bye!");
});
