import http from 'http';


// css styles
const gridStyleO = {
  // container holds all items
  // argument number of columns (m)
  // containerStyle :: Integer => String
  containerStyle: (m) => `.grid-container {
      display: grid;
      grid-template-columns: ${'auto '.repeat(m)};
      grid-auto-flow: row dense;
      background-color: #2196F3;
      padding: 10px;
      grid-gap: 20px;
    }`,
  // css style for first row of grid
  // itemHeadStyle :: String
  itemHeadStyle: `.grid-item0 {
      background-color: rgba(255, 255, 255, 0.9);
      grid-row: 1;
      padding: 10px;
    }`,
  // css style for consecutive rows, restricting column to m
  // itemBodyStyle :: Integer -> String
  itemBodyStyle: (m) => `.grid-item${m} {
      grid-column: ${m};
      background-color: rgba(255, 255, 255, 0.7);
      padding: 10px;
    }`,
};
Object.freeze(gridStyleO);

const gridItemsO = {
  // gridItem :: String -> String
  gridItem: (m) => (s) => `<div class="grid-item${m}">${s}</div>`,
  // makeContainerStr :: String -> String
  makeContainerStr: (s) => `<div class="grid-container">${s}</div>`,
};
Object.freeze(gridItemsO);

// methods to generate a css m*n grid
// .Grid :: Integer -> Object
function Grid(dimM, styleO, itemsO) {
  // strings and functions to set css style
  const {
    containerStyle,
    itemHeadStyle,
    itemBodyStyle,
  } = styleO;

  const { gridItem, makeContainerStr } = itemsO;
  const zeroToM = [...Array(dimM + 1).keys()];
  this.container = makeContainerStr;

  // .items :: Integer -> [String] -> String
  this.items = (n, a) => a.map(gridItem(n)).join('\n');

  // itemStyle :: Integer -> ( Integer -> Function )
  const itemStyle = (m) => (m === 0 ? itemHeadStyle : itemBodyStyle(m));

  // Put elements of css grid style together, create itemStyle elements up
  // to bigN elements
  // .style :: String -> String
  this.style = `<style>
      ${containerStyle(dimM)}
      ${zeroToM.flatMap(itemStyle).join('\n')}
    </style>`;
}


// creating the server with one page
function makeView(content) {
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(content);
    res.end();
  }).listen(8080);
}

export {
  Grid,
  makeView,
  gridStyleO,
  gridItemsO,
};
