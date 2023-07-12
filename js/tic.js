const board2 = ["", "", "", "", "", "", "", "", ""];

const box = document.querySelector(".box");
let boxArray = [];
let player1 = true;
let count = 0;

for (let i = 0; i < 9; i++) {
  boxArray.push(document.getElementById(`i${i + 1}`));
}

boxArray.map((boxx) => {
  boxx.addEventListener("click", () => {
    let bId = parseInt(boxx.id.replace("i", "")) - 1;
    if (board2[bId] == "") {
      if (player1) {
        board2[bId] = "<span class='b-0'></span>";
      } else {
        board2[bId] = "<span class='b-X'>+</span>";
      }
      player1 = !player1;
      for (let i = 0; i < 9; i++) {
        if (board2[i] !== "") {
          count += 1;
        }
      }
    }

    for (let i = 0; i < 9; i++) {
      boxArray[i].innerHTML = board2[i];
    }

    setTimeout(displayResult, 200);
  });
});

const displayResult = () => {
  for (let i = 0; i < 3; i++) {
    if (
      (board2[i] === board2[i + 3] &&
        board2[i + 3] === board2[i + 6] &&
        i === (i + 3) % 3 &&
        (i + 3) % 3 === (i + 6) % 3) ||
      (board2[i % 3] === board2[(i + 1) % 3] &&
        board2[(i + 1) % 3] === board2[(i + 2) % 3]) ||
      (board2[i] === board2[i + 4] &&
        board2[i + 4] === board2[i + 8] &&
        i === (i + 4) % 4 &&
        (i + 4) % 4 === (i + 8) % 4) ||
      (board2[i] === board2[i + 2] &&
        board2[i + 2] === board2[i + 4] &&
        i % 2 === (i + 2) % 2 &&
        (i + 2) % 2 === (i + 4) % 2 &&
        i !== 8 &&
        i !== 0)
    ) {
      if (board2[i] === "<span class='b-X'>+</span>") {
        if (!alert("X won")) {
          window.location.reload();
        }
      } else if (board2[i] === "<span class='b-0'></span>") {
        if (!alert("0 won")) {
          window.location.reload();
        }
      }
    }
  }

  if (count === 45) {
    if (!alert("Draw")) {
      window.location.reload();
    }
  }
};

// for (let i = 0; i < 9; i++) {
//   boxArray[i].innerHTML = board2[i];
// }
