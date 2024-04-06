import { describe } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getDiffString } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getFilePath(fileName) {
  return path.join(__dirname, `../__fixtures__/${fileName}`);
}

const formats = [
  'json',
  'yml',
  'yaml',
];

describe('getDiff', () => {
  test.each(formats)('Возвращает различия в JSON или YML файлах', () => {
    const difference = getDiffString('__fixtures__/file1.json', '__fixtures__/file2.json');
    expect(difference).toEqual(fs.readFileSync(getFilePath('stylish-result.txt'), 'utf-8'));
  });
});
