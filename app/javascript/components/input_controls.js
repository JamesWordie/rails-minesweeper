
function handleChange() {
  let GRID = 10;
  let MINE_FREQUENCY = 0.15;
  if (this.name === 'grid_size') {
    GRID = this.value;
  }
  if (this.name === 'mine_frequency') {
    MINE_FREQUENCY = this.value/10;
  }
  makeGrid(GRID, MINE_FREQUENCY);
};

const controls = document.querySelectorAll('.controls input');

controls.forEach((input) => {
  input.addEventListener('change', handleChange);
});



const buttons = document.querySelectorAll('buttons button');

const pageAction = () => {
  console.log(this.name);
  if (this.name === 'start') {
    makeGrid();
  } if (this.name === 'reset') {
    window.location.reload();
  }
};

buttons.forEach((button) => {
  button.addEventListener('click', pageAction);
});
