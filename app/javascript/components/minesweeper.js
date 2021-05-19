// defining the grid size and frequency of mines
// add the option once working for user input to choose frequnecy and size (number or slider - js30 tutorial)
let GRID = 15;
let MINE_FREQUENCY = 0.2;

// function that returns the result of the querySelecotr for all adjacent cells
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

const buttons = document.querySelectorAll('.buttons button');

function pageAction() {
  if (this.name === 'start') {
    this.classList.add('disabled');

  } if (this.name === 'reset') {
    window.location.reload();
  }
};

buttons.forEach((button) => {
  button.addEventListener('click', pageAction);
});

function handleChange() {
  let GRID = 10;
  let MINE_FREQUENCY = 0.15;
  if (this.name === 'grid_size') {
    GRID = this.value;
  }
  if (this.name === 'mine_frequency') {
    MINE_FREQUENCY = this.value/10;
  }
  alert(`grid size = ${GRID}, mine frequency = ${MINE_FREQUENCY}`);
};

const controls = document.querySelectorAll('.controls input');

controls.forEach((input) => {
  input.addEventListener('change', handleChange);
});

export { makeGrid }
