import readline from 'node:readline';
import { createTemperatureChangeInstance, parseInput } from './logic';

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const handleInput = (input: string) => {
    if (input === '\\q') {
      rl.close();
      return;
    };

    const data = parseInput(input);
    const instance = createTemperatureChangeInstance(data);
    console.log('\n Instance created:', instance, '\n');

    handleConsoleIO();
  };
  const handleConsoleIO = () => {
    rl.question('Type in object properties to create an instance or type "\\q" to exit: \n', handleInput);
  };

  handleConsoleIO();
}

main();
