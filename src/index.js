/* eslint-disable consistent-return */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { cwd } from 'node:process';
import { program } from 'commander';
import getParsedData from './parsers.js';
import getStructure from './tree.js';
import format from './formatters/index.js';

function getFile(filePath) {
  return fs.readFileSync(path.resolve(cwd(), filePath));
}

const getFormat = (filePath) => path.extname(filePath).slice(1);

const getFormatedData = (dataStructure, fileFormat) => dataStructure.reduce((diffAccum, { type, element }) => `${diffAccum}${format(fileFormat)(type, element)}`, '');

export function getDiffString(firstFilePath, secondFilePath, fileFormat = 'stylish') {
  const firstFile = getFile(firstFilePath);
  const secondFile = getFile(secondFilePath);

  if (JSON.stringify(firstFile) === JSON.stringify(secondFile)) return firstFile;
  const firstDataParced = getParsedData(firstFile, getFormat(firstFilePath));
  const secondDataParced = getParsedData(secondFile, getFormat(secondFilePath));

  const dataStructure = getStructure(firstDataParced, secondDataParced);

  const diffString = getFormatedData(dataStructure, fileFormat);
  console.log('{}'.split('').join(`${diffString}\n`));

  return '{}'.split('').join(`${diffString}\n`);
}
const initialCommander = () => {
  program
    .version('1.0.0')
    .option('-f, --fileFormat <type>', 'output format', 'stylish')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .action((filePath1, filePath2) => {
      getDiffString(filePath1, filePath2, program.opts().fileFormat);
    });
  program.parse();
};

export default initialCommander;
