const {h, render} = require('ink');

const UI = require('import-jsx')('./UI.jsx')

function main() {
    const exit = render(h(UI));
    // exit();
}

main();
