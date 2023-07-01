let board;
let score = 0;
const rows = 4;
const cols = 4;

window.onload = function() {
  setGame();
}

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let tile = document.createElement('div');
      tile.id = `${r.toString()}-${c.toString()}`;
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById('board').append(tile);
    }
  }

  setTwo();
  setTwo();
}

function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 0) {
        return true;
      }
    }
  }

  return false;
}

function setTwo() {
  if (!hasEmptyTile()) {
    return;
  }

  let found = false;

  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * cols);

    if (board[r][c] === 0) {
      board[r][c] = 2;
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      tile.innerText = '2';
      tile.classList.add('tile__2');
      found = true;
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = '';
  tile.classList.value = '';
  tile.classList.add('tile');

  if (num > 0) {
    tile.innerText = num;

    if (num <= 4096) {
      tile.classList.add(`tile__${num.toString()}`);
    } else {
      tile.classList.add('tile__8192');
    }
  }
}

const handleKeyPress = (event) => {
  if (event.code === 'ArrowLeft') {
    slideLeft();
    setTwo();
    checkTheEnd();
    console.log('l')
  }

  if (event.code === 'ArrowRight') {
    slideRight();
    setTwo();
    checkTheEnd();
    console.log('r')
  }

  if (event.code === 'ArrowUp') {
    slideUp();
    setTwo();
    checkTheEnd();
    console.log('u')
  }

  if (event.code === 'ArrowDown') {
    slideDown();
    setTwo();
    checkTheEnd();
    console.log('d')
  }
};

document.addEventListener('keyup', handleKeyPress);

function filterZero(row) {
  return row.filter(el => el !== 0);
}

function slide(row) {
  row = filterZero(row);

  for (let i = 0; i < row.length; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    }
  }

  row = filterZero(row);

  while (row.length < cols) {
    row.push(0);
  }

  return row;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;

    for (let c = 0; c < cols; c++) {
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;

    for (let c = 0; c < cols; c++) {
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < cols; c++) {
    let column = [board[0][c], board[1][c], board[2][c], board[3][c]];
    column = slide(column);
    board[0][c] = column[0];
    board[1][c] = column[1];
    board[2][c] = column[2];
    board[3][c] = column[3];

    for (let r = 0; r < rows; r++) {
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < cols; c++) {
    let column = [board[0][c], board[1][c], board[2][c], board[3][c]];
    column.reverse();
    column = slide(column);
    column.reverse();
    board[0][c] = column[0];
    board[1][c] = column[1];
    board[2][c] = column[2];
    board[3][c] = column[3];

    for (let r = 0; r < rows; r++) {
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function checkTheEnd() {
  let hasEmptyTile = false;

  // Check if there are any empty tiles
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 0) {
        hasEmptyTile = true;
        break;
      }
    }
    if (hasEmptyTile) {
      break;
    }
  }

  // If there are empty tiles, the game can continue
  if (hasEmptyTile) {
    return;
  }

  // Check for possible merges
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Check left
      if (c > 0 && board[r][c] === board[r][c - 1]) {
        return;
      }
      // Check right
      if (c < cols - 1 && board[r][c] === board[r][c + 1]) {
        return;
      }
      // Check up
      if (r > 0 && board[r][c] === board[r - 1][c]) {
        return;
      }
      // Check down
      if (r < rows - 1 && board[r][c] === board[r + 1][c]) {
        return;
      }
    }
  }
  // No possible moves left
  document.removeEventListener('keyup', handleKeyPress);
  alert('Game over! No more moves.');
}
