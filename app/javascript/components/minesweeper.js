// defining the grid size and frequency of mines
// add the option once working for user input to choose frequnecy and size (number or slider - js30 tutorial)
const GRID = 10;
const MINE_FREQUENCY = 0.2;

// make the grid using javascript, inputted into the table html
const makeGrid = () => {
  const minesweeper = document.querySelector('#minesweeper');
  for (let x = 0; x < GRID; x += 1) {
    const row = document.createElement('tr');
    row.dataset.row = x;
    for (let y = 0; y < GRID; y += 1) {
      row.insertAdjacentHTML('beforeend', `<td class="unopened" data-column="${y}"></td>`);
    }
    minesweeper.append(row);
  }
}

export { makeGrid }
