// defining the grid size and frequency of mines
// add the option once working for user input to choose frequnecy and size (number or slider - js30 tutorial)
const GRID = 10;
const MINE_FREQUENCY = 0.2;

const surrounding = (td, offsetX, offsetY) => {
  const column = td.cellIndex;
  const row = td.parentElement.rowIndex;
  return document.querySelector(`[data-column="${column + offsetX}"][data-row="${row + offsetY}"]`);
}

const increaseAdjacent = (td, offsetX, offsetY) => {
  const n = surrounding(td, offsetX, offsetY);
  if (n && n.classList.contains('has-mine')) {
    return 1;
  }

  return 0;
}

const open = (square) => {
  let mines = 0;

  for (let i = -1; i <= 1; i += 1) {
    for (let j = -1; j <= 1; j += 1) {
      if (i !== 0 || j !== 0) {
        mines += increaseAdjacent(square, i, j);
      }
    }
  }

  if (mines === 0) {
    square.classList.add('opened');
  } else {
    square.classList.add(`mine-neighbour-${mines}`);
  }
  square.classList.remove('unopened');

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

export { makeGrid }
