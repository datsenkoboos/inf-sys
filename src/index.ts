import readline from 'readline';
import fs from 'fs';
import { createModelInstance, parseInputString } from './logic';

function handleCreateInstance(input: string) {
  const data = parseInputString(input);
  const instance = createModelInstance(data);
  console.log('\n Instance created:', instance);
}

function handleFileInput(input: string) {
  const filePath = input.slice(5);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const objectInputs = data.split('\n').map(input => input.trim()).filter(Boolean);
    objectInputs.forEach(handleCreateInstance);
  });
}

function handleMultiObjectInput(input: string) {
  const objectInputs = input.split(';').map(properties => properties.trim()).filter(Boolean);
  objectInputs.forEach(handleCreateInstance);
}

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function handleConsoleIO() {
    console.log('Type object properties to create an instance, with set of properties of each object separated with ";"');
    console.log('Type "File FILEPATH" to read object properties from a file ');
    console.log('Type "\\q" to exit');

    rl.question('\n', (input: string) => {
      if (input === '\\q') {
        rl.close();
        return;
      };

      if (input.slice(0, 4) === 'File') {
        handleFileInput(input);
      } else if (input.includes(';')) {
        handleMultiObjectInput(input);
      } else {
        handleCreateInstance(input);
      }

      handleConsoleIO();
    });
  };

  handleConsoleIO();
}

main();
