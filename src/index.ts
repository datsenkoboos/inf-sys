import readline from 'readline';
import fs from 'fs/promises';
import { createModelInstance, parseInputString } from './logic';

function handleCreateInstance(input: string) {
  try {
    const data = parseInputString(input);
    const instance = createModelInstance(data);
    console.log('\nInstance created:', instance);
  } catch (e) {
    const error = e as Error;
    logError(error.message);
  }
}

function logError(text: string) {
  console.log(`\nERROR: ${text}\n`);
}

async function handleFileInput(input: string) {
  const filePath = input.slice(4).trim();
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const objectInputs = data.split('\n').map(input => input.trim()).filter(Boolean);
    if (objectInputs.length === 0) {
      logError('Empty file');
    } else {
      objectInputs.forEach(handleCreateInstance);
    }
  } catch (e) {
    const error = e as NodeJS.ErrnoException;
    if (error.code === 'ENOENT') {
      logError('File was not found');
    } else {
      logError(error.message);
    }
  }
}

function handleMultiObjectInput(input: string) {
  const objectInputs = input.split(';').map(properties => properties.trim()).filter(Boolean);
  if (objectInputs.length === 0) {
    logError('Invalid input');
  } else {
    objectInputs.forEach(handleCreateInstance);
  }
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

    rl.question('\n', async (input: string) => {
      if (input === '\\q') {
        rl.close();
        return;
      };

      if (input.slice(0, 4).toLowerCase() === 'file') {
        await handleFileInput(input);
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
