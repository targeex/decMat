import readYmlData from './data.js';
import DecisionMatrixO from './core.js';
import { makeView, Grid, gridStyleO } from './view.js';

console.log(gridStyleO);

// define yaml input file
const inFilePath = './example.yaml';

// create object with data from yaml input and methods
const doc = new DecisionMatrixO(readYmlData(inFilePath));

console.log(doc);

// create object with methods to format css grid
const grid = new Grid(doc.dimM, gridStyleO);

// put content strings together
const contentHeaders = grid.items(0, doc.cats);
const contentColumns = doc.zeroToM.flatMap((i) => grid.items(i + 1, doc.valsByColumn(i))).join('');
const content = `${contentHeaders}\n${contentColumns}`;

const outputString = `${grid.style}\n${grid.container(content)}`;

// start server and output html
makeView(outputString);