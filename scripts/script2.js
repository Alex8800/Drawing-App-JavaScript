import { imageUrls } from "./img+matrix.js";
import { matrixA } from "./img+matrix.js";
import { matrixB } from "./img+matrix.js";
import { matrixC } from "./img+matrix.js";
import { matrixD } from "./img+matrix.js";
import { matrixE } from "./img+matrix.js";
import { matrixF } from "./img+matrix.js";
import { matrixG } from "./img+matrix.js";
import { matrixH } from "./img+matrix.js";
import { matrixI } from "./img+matrix.js";
import { matrixJ } from "./img+matrix.js";
import { matrixK } from "./img+matrix.js";
import { matrixL } from "./img+matrix.js";
import { matrixM } from "./img+matrix.js";
import { matrixN } from "./img+matrix.js";
import { matrixO } from "./img+matrix.js";
import { matrixP } from "./img+matrix.js";
import { matrixQ } from "./img+matrix.js";
import { matrixR } from "./img+matrix.js";
import { matrixS } from "./img+matrix.js";
import { matrixT } from "./img+matrix.js";
import { matrixU } from "./img+matrix.js";
import { matrixV } from "./img+matrix.js";
import { matrixW } from "./img+matrix.js";
import { matrixX } from "./img+matrix.js";
import { matrixY } from "./img+matrix.js";
import { matrixZ } from "./img+matrix.js";

function drawA(matrix) {
  // Dimensiunile patratelor
  const squareSize = 10;

  // Pozitia initiala a desenului
  let x = 50;
  let y = 50;

  // Parcurgem matricea si desenam fiecare patrat unde este 1
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 1) {
        ctx.fillRect(x, y, squareSize, squareSize);
      }
      x += squareSize;
    }
    x = 50;
    y += squareSize;
  }
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const randomLetterInput = document.getElementById("random-letter");
const generateBtn = document.getElementById("generate-btn");

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
canvas2.width = 450; // sau orice altă valoare de lățime dorită
canvas2.height = 450; // sau orice altă valoare de înălțime dorită

// Create an array of image URLs

// Create an array of Image objects
const images = imageUrls.map((url) => {
  const img = new Image();
  img.src = url;
  return img;
});

let usedImageIndices = [];
generateBtn.addEventListener("click", function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  const randomLetter = alphabet[randomIndex];
  randomLetterInput.value = randomLetter;

  // Calculate the width and height of each quadrant
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  const quadrantWidth = canvas2.width / 2;
  const quadrantHeight = canvas2.height / 2;

  let randomImageIndex1;
  do {
    randomImageIndex1 = Math.floor(Math.random() * images.length);
  } while (usedImageIndices.includes(randomImageIndex1));
  usedImageIndices.push(randomImageIndex1);
  const randomImage1 = images[randomImageIndex1];
  ctx2.drawImage(randomImage1, 0, 0, quadrantWidth, quadrantHeight);

  let randomImageIndex2;
  do {
    randomImageIndex2 = Math.floor(Math.random() * images.length);
  } while (usedImageIndices.includes(randomImageIndex2));
  usedImageIndices.push(randomImageIndex2);
  const randomImage2 = images[randomImageIndex2];
  ctx2.drawImage(randomImage2, quadrantWidth, 0, quadrantWidth, quadrantHeight);

  let randomImageIndex3;
  do {
    randomImageIndex3 = Math.floor(Math.random() * images.length);
  } while (usedImageIndices.includes(randomImageIndex3));
  usedImageIndices.push(randomImageIndex3);
  const randomImage3 = images[randomImageIndex3];
  ctx2.drawImage(
    randomImage3,
    0,
    quadrantHeight,
    quadrantWidth,
    quadrantHeight
  );

  let randomImageIndex4;
  do {
    randomImageIndex4 = Math.floor(Math.random() * images.length);
  } while (usedImageIndices.includes(randomImageIndex4));
  usedImageIndices.push(randomImageIndex4);
  const randomImage4 = images[randomImageIndex4];
  ctx2.drawImage(
    randomImage4,
    quadrantWidth,
    quadrantHeight,
    quadrantWidth,
    quadrantHeight
  );
  let selectedImage;

  canvas2.addEventListener("click", function (event) {
    const rect = canvas2.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Verificați în care pătrat a fost făcut clic și păstrați imaginea corespunzătoare într-o variabilă.
    if (x < canvas2.width / 2 && y < canvas2.height / 2) {
      selectedImage = randomImage1;
    } else if (x >= canvas2.width / 2 && y < canvas2.height / 2) {
      selectedImage = randomImage2;
    } else if (x < canvas2.width / 2 && y >= canvas2.height / 2) {
      selectedImage = randomImage3;
    } else {
      selectedImage = randomImage4;
    }
  });

  // Desenam litera generata pe canvas
  switch (randomLetter) {
    case "A":
      drawA(matrixA);
      break;
    case "B":
      drawA(matrixB);
      break;
    case "C":
      drawA(matrixC);
      break;
    case "D":
      drawA(matrixD);
      break;
    case "E":
      drawA(matrixE);
      break;
    case "F":
      drawA(matrixF);
      break;
    case "G":
      drawA(matrixG);
      break;
    case "H":
      drawA(matrixH);
      break;
    case "I":
      drawA(matrixI);
      break;
    case "J":
      drawA(matrixJ);
      break;
    case "K":
      drawA(matrixK);
      break;
    case "L":
      drawA(matrixL);
      break;
    case "M":
      drawA(matrixM);
      break;
    case "N":
      drawA(matrixN);
      break;
    case "O":
      drawA(matrixO);
      break;
    case "P":
      drawA(matrixP);
      break;
    case "Q":
      drawA(matrixQ);
      break;
    case "R":
      drawA(matrixR);
      break;
    case "S":
      drawA(matrixS);
      break;
    case "T":
      drawA(matrixT);
      break;
    case "U":
      drawA(matrixU);
      break;
    case "V":
      drawA(matrixV);
      break;
    case "W":
      drawA(matrixW);
      break;
    case "X":
      drawA(matrixX);
      break;
    case "Y":
      drawA(matrixY);
      break;
    case "Z":
      drawA(matrixZ);
      break;
  }
});
