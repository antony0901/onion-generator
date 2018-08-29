#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const CURR_DIR = process.cwd();

function createDirectoryContents(templatePath, projectName, newProjectPath) {
  const cleanedProjectName = projectName.replace('-', '_');
  const filesToCreate = fs.readdirSync(templatePath);
  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    const stats = fs.lstatSync(origFilePath);
    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, 'utf8');
      const replaceContent = contents.replace('PROJECT_NAME', cleanedProjectName);
      if (file === '.npmignore') file = '.gitignore';
      if(file === 'PROJECT_NAME.csproj') file = `${cleanedProjectName}.csproj`;

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, replaceContent, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
      createDirectoryContents(`${templatePath}/${file}`, projectName, `${newProjectPath}/${file}`);
    }
  });
}

module.exports.generate = () => {
  clear();
  console.log(
    chalk.yellow(
      figlet.textSync('Onion generator', {
        horizontalLayout: 'full'
      })
    )
  );

  const PROJECT_TYPES = [
    'nodejs',
    'angular2'
  ];

  const QUESTIONS = [{
      name: 'project-choice',
      type: 'list',
      message: 'What project template would you like to generate?',
      choices: PROJECT_TYPES
    },
    {
      name: 'project-name',
      type: 'input',
      message: 'Project name',
      validate: (input) => {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        else return 'Project name may only include letters, numbers, underscores and hashes.';
      }
    }
  ];

  inquirer.prompt(QUESTIONS).then(answers => {
    const projectChoice = answers['project-choice'];
    const projectName = answers['project-name'];
    const templatePath = `${__dirname}/templates/${projectChoice}`;

    fs.mkdirSync(`${CURR_DIR}/${projectName}`);
    createDirectoryContents(templatePath, projectName, projectName);
  });
};