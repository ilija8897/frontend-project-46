#!/usr/bin/env node

import { program } from 'commander';

program
.arguments('<filepath1> <filepath2>')
.version('1.0.0')
.option('-f, --format <type>', 'output format')
.description('Compares two configuration files and shows a difference.');

program.parse();