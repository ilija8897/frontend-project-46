import * as fs from "node:fs";
import * as path from "node:path";
import { cwd } from "node:process";
import { program } from 'commander';

export const initialCommander = () => {
    program
    .version('1.0.0')
    .option('-f, --format <type>', 'output format')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .action(() => {
        const firstFile = fs.readFileSync(path.resolve(cwd(), process.argv[2]));
        const secondFile = fs.readFileSync(path.resolve(cwd(), process.argv[3]));
    })
    program.parse();
}

function getFormat(path) {
    return path.split('.').pop();
};
