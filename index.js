const input1 = document.getElementById("input1");
const output = document.getElementById("output");
const button = document.getElementById("change");
const change1 = document.getElementById("asciToBinary");
const change2 = document.getElementById("binaryToAsci");
const mask = document.getElementById("mask");
let table;

fetch("asci.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    table = myJson;
  });

function asciToBin() {
  let asci = input1.value;
  let newString = "";
  for (let i = 0; i < asci.length; i++) {
    for (let j = 0; j < table.length; j++) {
      if (asci[i] == table[j].asci) {
        newString += table[j].bin + " ";
      }
    }
  }
  output.value = newString;
}

function binToAsci() {
  let bin = Array.from(input1.value);
  let newString = "";
  let binTable = [];
  for (var i = 0; i < bin.length; i++) {
    if (bin[i] === " ") {
      bin.splice(i, 1);
      i--;
    }
  }
  bin = bin.join("");
  binTable = bin.match(/.{1,8}/g);

  for (let i = 0; i < binTable.length; i++) {
    for (let j = 0; j < table.length; j++) {
      if (binTable[i] == table[j].bin) {
        newString += table[j].asci;
      }
    }
  }
  output.value = newString;
}

button.addEventListener("click", asciToBin);
input1.placeholder = "Wpisz kod który chciałbyś zamienić...";
change1.addEventListener("click", changeToAsci);
change2.addEventListener("click", changeToBin);

function changeToAsci() {
  button.removeEventListener("click", binToAsci);
  button.addEventListener("click", asciToBin);
  input1.value = "";
  output.value = "";
  input1.placeholder = "Wpisz text który chciałbyś zamienić...";
  maskBin();
}

function changeToBin() {
  button.removeEventListener("click", asciToBin);
  button.addEventListener("click", binToAsci);
  input1.value = "";
  output.value = "";
  input1.placeholder = "Wpisz kod który chciałbyś zamienić...";
  maskAsci();
}
function maskAsci() {
  let pos = 0;
  setInterval(() => {
    if (pos == 50) {
      clearInterval();
    } else {
      pos++;
      mask.style.left = pos + "%";
    }
  }, 1);
  change2.style.color = "#fff";
  change1.style.color = "#000";
}
function maskBin() {
  let pos = 50;
  setInterval(() => {
    if (pos == 0) {
      clearInterval();
    } else {
      pos--;
      mask.style.left = pos + "%";
    }
  }, 1);
  change1.style.color = "#fff";
  change2.style.color = "#000";
}
