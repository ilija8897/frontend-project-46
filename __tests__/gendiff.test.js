import { describe } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getFilePath(fileName) {
  return path.join(__dirname, `../__fixtures__/${fileName}`);
}

describe('getDiff', () => {
  it('Возвращает различия в JSON данных', () => {
    const difference = getDiff(getFilePath('test-file-1.json'), getFilePath('test-file-1.json'));
    expect(difference).toEqual(fs.readFileSync(getFilePath('result.txt'), 'utf-8'));
  });
});
