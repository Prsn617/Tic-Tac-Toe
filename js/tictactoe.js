let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let board2 = board;
let scores = {
  X: 10,
  O: -10,
  Draw: 0,
};

// let aiTurn = false;
// localStorage.setItem("aii", aiTurn);

const ai = "<span class='b-X'>+</span>";
const human = "<span class='b-0'></span>";

const box = document.querySelector(".box");
let boxArray = [[], [], []];
let player1 = true;
let count = 0;
const btn = document.getElementById("btn");

// btn.addEventListener("click", () => {
//   aiTurn = !aiTurn;
//   localStorage.setItem("aii", aiTurn);
//   if (localStorage.getItem("aii") === true) {
//     randomMove();
//   }
// });

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    boxArray[i].push(document.getElementById(`i${i}${j}`));
  }
}

const boxArr = boxArray.flat();
boxArr.map((boxx) => {
  boxx.addEventListener("click", () => {
    let bId = boxx.id.replace("i", "");
    let ii = parseInt(bId[0]);
    let jj = parseInt(bId[1]);
    if (board[ii][jj] === "") {
      if (player1) {
        board[ii][jj] = "O";
      }
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] !== "") {
            count += 1;
          }
        }
      }
      randomMove();
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        boxArray[i][j].innerHTML =
          board[i][j] === "X" ? ai : board[i][j] === "O" ? human : "";
      }
    }
    setTimeout(displayResult, 200);
  });
});

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    boxArray[i][j].innerHTML = board[i][j];
  }
}

function checkWinner(count) {
  let res = null;
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i] &&
      board[0][i] !== ""
    ) {
      res = board[0][i];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2] &&
      board[i][0] !== ""
    ) {
      res = board[i][0];
    }
  }

  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] !== ""
  ) {
    res = board[0][0];
  }
  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[0][2] !== ""
  ) {
    res = board[0][2];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        openSpots++;
      }
    }
  }

  if (res === null && openSpots === 0) {
    return "Draw";
  } else {
    return res;
  }
}

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    boxArray[i][j].innerHTML =
      board[i][j] === "X" ? ai : board[i][j] === "O" ? human : "";
  }
}

function randomMove() {
  let bestScore = -9999;
  let move = { i: 0, j: 0 };
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        board[i][j] = "X";
        let score = miniMax(board, 0, false);
        board[i][j] = "";
        console.log(`Score: ${score}`);
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  if (board[move.i][move.j] === "") {
    board[move.i][move.j] = "X";
    boxArray[move.i][move.j].innerHTML = ai;
  }
  // displayResult();
}

function miniMax(board, depth, AI) {
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (AI) {
    let maxEval = -9999;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          board[i][j] = "X";
          let eval = miniMax(board, depth + 1, false);
          board[i][j] = "";
          maxEval = Math.max(eval, maxEval);
        }
      }
    }
    return maxEval;
  } else {
    let minEval = 9999;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          board[i][j] = "O";
          let eval = miniMax(board, depth + 1, true);
          board[i][j] = "";
          minEval = Math.min(eval, minEval);
        }
      }
    }
    return minEval;
  }
}

function displayResult() {
  let winner = checkWinner(count);
  if (winner !== null) {
    if (winner === "X") {
      if (!alert("X won")) {
        window.location.reload();
        return;
      }
    } else if (winner === "O") {
      if (!alert("0 won")) {
        window.location.reload();
        return;
      }
    } else if (winner === "Draw") {
      if (!alert("Draw")) {
        window.location.reload();
        return;
      }
    }
  }
}
