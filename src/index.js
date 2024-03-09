/* eslint-disable consistent-return */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { cwd } from 'node:process';
import { program } from 'commander';
import getParsedData from './parsers.js';

function getFile(filePath) {
  return fs.readFileSync(path.resolve(cwd(), filePath));
}

const TYPES = {
  OVER: 'OVER',
  EXIST: 'EXIST',
  COLLISION: 'COLLISION',
};

const getFormat = (filePath) => path.extname(filePath).slice(1);

export function getDiffString(firstFilePath, secondFilePath) {
  const firstFile = getFile(firstFilePath);
  const secondFile = getFile(secondFilePath);

  if (JSON.stringify(firstFile) === JSON.stringify(secondFile)) return firstFile;

  const firstDataParced = getParsedData(firstFile, getFormat(firstFilePath));
  const secondDataParced = getParsedData(secondFile, getFormat(secondFilePath));

  const unionKeys = Object.keys({ ...firstDataParced, ...secondDataParced }).sort((a, b) => a.localeCompare(b));

  const result = unionKeys.map((key) => {
    if (!Object.hasOwn(firstDataParced, key)) {
      return { type: TYPES.OVER, element: { key, value: secondDataParced[key] } };
    }
    if (!Object.hasOwn(secondDataParced, key)) {
      return { type: TYPES.EXIST, element: { key, value: firstDataParced[key] } };
    }
    if (firstDataParced[key] && secondDataParced[key]) {
      return { type: TYPES.COLLISION, element: { key, value: [firstDataParced[key], secondDataParced[key]] } };
    }
  });

  const diffString = result.reduce((diffAccum, { type, element }) => {
    if (type === TYPES.OVER) {
      return `${diffAccum}\n + ${element.key}: ${element.value}`;
    }
    if (type === TYPES.EXIST) {
      return `${diffAccum}\n - ${element.key}: ${element.value}`;
    }
    if (type === TYPES.COLLISION) {
      if (element.value[0] !== element.value[1]) {
        return `${diffAccum}\n - ${element.key}: ${element.value[0]};\n + ${element.key}: ${element.value[1]}`;
      }
      return `${diffAccum}\n   ${element.key}: ${element.value[0]}`;
    }
  }, '');

  console.log('{}'.split('').join(`${diffString}\n`));

  return '{}'.split('').join(`${diffString}\n`);
}
const initialCommander = () => {
  program
    .version('1.0.0')
    .option('-f, --format <type>', 'output format')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .action(() => {
      getDiffString(process.argv[2], process.argv[3]);
    });
  program.parse();
};

export default initialCommander;
