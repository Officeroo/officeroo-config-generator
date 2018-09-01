const {h, render} = require('ink');

const UI = require('import-jsx')('./UI.jsx')

function main() {
    if (process.argv.length !== 3) {
        console.error("ERROR: Expecting 1 argument - the output folder")
        process.exit(1);
    }
    const outputFolder = process.argv[2];
    console.error('\x1Bc'); // Clear Screen
    render(h(UI, {outputFolder: outputFolder}));
}

main();
