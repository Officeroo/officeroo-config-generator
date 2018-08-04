const {h, render} = require('ink');

const UI = require('import-jsx')('./UI.jsx')

function main() {
    console.error('\x1Bc'); // Clear Screen
    const exit = render(h(UI));
    // exit();
}

main();
