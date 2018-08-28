#!/usr/bin/env node

const program = require('commander');

let actionHandler = () => {

}

program
  .version('0.1.3')
  .option('-v, --version', 'output the version number')
  .option('-n, --new', 'new project')
  .parse(process.argv);

if (program.new) {
  const generator = require('./generator');
  generator.generate();
} else {
  program.help();
}