#!/usr/bin/env node

const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const program     = require('commander');

const fs          = require('fs');
const path        = require('path');
const exec        = require('child-process-promise').exec;

const currentDir  = process.cwd();
const cliDir      = path.dirname(require.main.filename || process.mainModule.filename);

clear();
console.log(
    chalk.blue(
        figlet.textSync('Rogue CLI', { horizontalLayout: 'full' })
    )
);

program
    .version('1.0.0')
    .option('init', 'Initialize a Rogue project')
    .parse(process.argv);

if (program.init) {

    console.log(chalk.white("\nCreating directories:"));
    const directories = [
        '/config',
        '/controllers',
        '/modules',
        '/routes',
        '/schemas',
        '/logs',
        '/utils'
    ];

    const files = [
        { from: 'config.dist.js',       to: 'config/config.dist.js'},
        { from: 'config.dist.js',       to: 'config/config.js'},
        { from: 'index.js',             to: 'index.js'},
        { from: 'default_route.js',     to: 'routes/default.js'},
        { from: 'main_controller.js',   to: 'controllers/main.js'},
        { from: 'example_schema.js',    to: 'schemas/example.js'}
    ];

    directories.forEach((directory) => {
        const current = path.join(currentDir, directory);
        let log = "\tDirectory " + chalk.bold(directory) + ": ";
        if (!fs.existsSync(current)) {
            fs.mkdirSync(current);
            log += chalk.green.bold("OK");
        } else {
            log += chalk.green.yellow("Exists");
        }
        console.log(log);
    });
    console.log("\n");
    console.log(chalk.white("\nExporting files:"));

    files.forEach((file) => {
        const current       = path.join(cliDir, 'templates', file.from);
        const destination   = path.join(currentDir, file.to);

        let log = "\tFile " + chalk.bold(file.to) + ": ";
        if (!fs.existsSync(destination)) {
            fs.createReadStream(current).pipe(fs.createWriteStream(destination));
            log += chalk.green.bold("OK");
        } else {
            log += chalk.green.yellow("Exists");
        }
        console.log(log);
    });

    console.log(chalk.white("\nInstalling ") + chalk.blue.bold("Rogue") + "...");
    exec('npm --save --prefix ' + currentDir + ' install rogue-framework').then(function(results) {
        if (fs.existsSync(path.join(currentDir, 'etc'))) {
            fs.rmdirSync(path.join(currentDir, 'etc'));
        }
        console.log(chalk.blue.bold("DONE"));
    })
    .catch(function (err) {
        console.error('ERROR: ', err);
    });
}

