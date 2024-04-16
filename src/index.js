/* eslint-disable consistent-return */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { cwd } from 'node:process';
import getParsedData from './parsers.js';
import getStructure from './tree.js';
import format from './formatters/index.js';

function getFile(filePath) {
  return fs.readFileSync(path.resolve(cwd(), filePath));
}

const getFormat = (filePath) => path.extname(filePath).slice(1);

export function getDiffString(firstFilePath, secondFilePath, fileFormat = 'stylish') {
  const firstFile = getFile(firstFilePath);
  const secondFile = getFile(secondFilePath);

  if (JSON.stringify(firstFile) === JSON.stringify(secondFile)) return firstFile;
  const firstDataParced = getParsedData(firstFile, getFormat(firstFilePath));
  const secondDataParced = getParsedData(secondFile, getFormat(secondFilePath));

  const dataStructure = getStructure(firstDataParced, secondDataParced);

  const diffString = format(dataStructure, fileFormat);

  return diffString.trim();
}

export default getDiffString;
