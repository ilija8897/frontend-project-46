#!/usr/bin/env node
import { program } from 'commander';
import getDiffString from '../src/index.js';

program
  .version('1.0.0')
  .option('-f, --fileFormat <type>', 'output format', 'stylish')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filePath1, filePath2) => {
    console.log(getDiffString(filePath1, filePath2, program.opts().fileFormat));
  });
program.parse();
