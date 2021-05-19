const gridSlider = document.querySelector('.controls #grid_size');
const mineSlider = document.querySelector('.controls #mine_frequency');

// function that returns the result of the querySelector for all adjacent cells
const surrounding = (td, offsetX, offsetY) => {
  const column = td.cellIndex;
  const row = td.parentElement.rowIndex;
  return document.querySelector(`[data-column="${column + offsetX}"][data-row="${row + offsetY}"]`);
}

// function to search the surrounding cells for mines
// only returns 1 if n exists and n has the class of has mine
const increaseAdjacent = (td, offsetX, offsetY) => {
  const n = surrounding(td, offsetX, offsetY);
  if (n && n.classList.contains('has-mine')) {
    return 1;
  }
  return 0;
}

// iterates over every adjacent cell, incrementing mines if a mine is found adjacent
const open = (square) => {
  let mines = 0;

  for (let i = -1; i <= 1; i += 1) {
    for (let j = -1; j <= 1; j += 1) {
      if (i !== 0 || j !== 0) {
        mines += increaseAdjacent(square, i, j);
      }
    }
  }
  // depending on the number of mines found it either opens the cell/ add a class or remove unopened
  if (mines === 0) {
    square.classList.add('opened');
  } else {
    square.classList.add(`mine-neighbour-${mines}`);
    square.innerText = mines
  }
  square.classList.remove('unopened');

  // iterating over adjacent cells to find if any near mines and this is where the multiple cells can be opneded at once
  if (mines === 0) {
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        if (i !== 0 || j !== 0) {
          const n = surrounding(square, i, j);
          if (n && n.classList.contains('unopened')) {
            open(n);
          }
        }
      }
    }
  }

  return mines;
};

// function to open a square either returning you hit a mine or you open the tile
const openSquare = () => {
  const square = event.currentTarget;
  if (square.classList.contains('has-mine')) {
    document.querySelectorAll('.has-mine').forEach((cell) => {
      cell.classList.remove('has-mine', 'unopened');
      cell.classList.add('mine');
    });
    alert('You Lost ☹️!');
  } else {
    open(square);
  };
};

// add the class of flagged to a cell which applies the classlist 'flagged'
const flagSquare = (event) => {
  event.preventDefault();
  const square = event.currentTarget;
  if (square.classList.contains('unopened')) {
    square.classList.add('flagged');
  };
};

// make the grid using javascript, inputted into the table html
const makeGrid = () => {
  let GRID = gridSlider.value;

  const minesweeper = document.querySelector('#minesweeper');
  for (let x = 0; x < GRID; x += 1) {
    const row = document.createElement('tr');
    row.dataset.row = x;
    for (let y = 0; y < GRID; y += 1) {
      row.insertAdjacentHTML('beforeend', `<td class="unopened" data-column="${y}"></td>`);
    };
    minesweeper.append(row);
  };
  events();
}

// function to set the dataset row and column of each cell, also has event listeners for click and flagging
const events = () => {
  let MINE_FREQUENCY = (mineSlider.value/10);

  document.querySelectorAll('#minesweeper td').forEach((td) => {
    td.dataset.column = td.cellIndex;
    td.dataset.row = td.parentElement.rowIndex;

    if (Math.random() <= MINE_FREQUENCY) {
      td.classList.add('has-mine');
    };

    td.addEventListener('click', openSquare);
    td.addEventListener('contextmenu', flagSquare);
  });
}

function setGridSize() {
  let GRID = this.value;
  document.querySelector('.grid_counter').innerText = GRID;
  return GRID;
};

function setMineFrequency() {
  let MINE_FREQUENCY = (this.value / 10);
  document.querySelector('.mine_counter').innerText = MINE_FREQUENCY;
  return MINE_FREQUENCY;
};

//event listener on the slider inputs to set the grid size and mine frequency
gridSlider.addEventListener('change', setGridSize);

mineSlider.addEventListener('change', setMineFrequency);

export { makeGrid }
