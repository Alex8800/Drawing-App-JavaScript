const canvas = document.querySelector("canvas"), //- selectează canvas-ul de pe pagină și îl salvează într-o constantă numită "canvas".
  toolBtns = document.querySelectorAll(".tool"), //selectează toate butoanele pentru instrumente de desen și le salvează într-o variabilă numită "toolBtns".
  fillColor = document.querySelector("#fill-color"), //selectează butonul pentru culoarea de umplere și îl salvează într-o constantă numită "fillColor".
  sizeSlider = document.querySelector("#size-slider"), //selectează sliderul pentru dimensiunea pensulei și îl salvează într-o constantă numită "sizeSlider".
  colorBtns = document.querySelectorAll(".colors .option"), //selectează toate butoanele pentru culori și le salvează într-o variabilă numită "colorBtns".
  colorPicker = document.querySelector("#color-picker"), //selectează elementul pentru selectorul de culoare și îl salvează într-o constantă numită "colorPicker".
  clearCanvas = document.querySelector(".clear-canvas"), //electează butonul pentru ștergerea canvas-ului și îl salvează într-o constantă numită "clearCanvas".
  saveImg = document.querySelector(".save-img"), // selectează butonul pentru salvarea imaginii și îl salvează într-o constantă numită "saveImg".
  ctx = canvas.getContext("2d"); //salvează contextul 2D al canvas-ului într-o variabilă numită "ctx".

//initial code

// global variables with default value
let prevMouseX,
  prevMouseY,
  snapshot,
  isDrawing = false,
  selectedTool = "brush",
  brushWidth = 5,
  selectedColor = "#000"; //negru

var desen = [];
var ultimulDesen = [];
var offsetX, offsetY;

const setCanvasBackground = () => {
  // va fi setat fundalul intregului canvas la culoarea alba (#fff) pentru a se asigura ca imaginea descarcata va avea un fundal alb.
  ctx.fillStyle = "#fff"; //Seteaza culoarea de umplere a contextului de desenare al canvasului la alb (#fff) cu ajutorul proprietatii fillStyle a contextului de desenare.
  ctx.fillRect(0, 0, canvas.width, canvas.height); //Foloseste functia fillRect pentru a umple intregul canvas cu culoarea alba.
  ctx.fillStyle = selectedColor; // setting fillstyle back to the selectedColor, it'll be the brush color
  //Seteaza culoarea de umplere a contextului de desenare al canvasului la o alta culoare (selectedColor), care probabil a fost selectata de utilizator si va fi folosita pentru a desena cu pensula.
};

window.addEventListener("load", () => {
  // setting canvas width/height.. offsetwidth/height returns viewable width/height of an element
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  //Seteaza culoarea de umplere a contextului de desenare al canvasului la o alta culoare (selectedColor), care probabil a fost selectata de utilizator si va fi folosita pentru a desena cu pensula.
  setCanvasBackground(); //Apeleaza functia setCanvasBackground pentru a umple canvasul cu culoarea alba, astfel incat sa aiba un fundal alb pentru a se asigura ca imaginea descarcata va avea un fundal alb.
});

const drawRect = (e) => {
  // if fillColor isn't checked draw a rect with border else draw rect with background
  if (!fillColor.checked) {
    // creating circle according to the mouse pointer
    return ctx.strokeRect(
      e.offsetX,
      e.offsetY,
      prevMouseX - e.offsetX,
      prevMouseY - e.offsetY
    );
  }
  ctx.fillRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY
  );
};

const drawCircle = (e) => {
  ctx.beginPath(); // creating new path to draw circle
  // getting radius for circle according to the mouse pointer
  let radius = Math.sqrt(
    Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
  );
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // creating circle according to the mouse pointer
  fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill circle else draw border circle
};

const drawTriangle = (e) => {
  ctx.beginPath(); // creating new path to draw circle
  ctx.moveTo(prevMouseX, prevMouseY); // moving triangle to the mouse pointer
  ctx.lineTo(e.offsetX, e.offsetY); // creating first line according to the mouse pointer
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // creating bottom line of triangle
  ctx.closePath(); // closing path of a triangle so the third line draw automatically
  fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill triangle else draw border
};

//Acest cod defineste o functie numita "startDraw" care se apeleaza atunci cand utilizatorul incepe sa deseneze pe canvas-ul HTML.
const startDraw = (e) => {
  isDrawing = true; // utilizatorul a inceput sa deseneze.
  prevMouseX = e.offsetX; // passing current mouseX position as prevMouseX value
  prevMouseY = e.offsetY; // passing current mouseY position as prevMouseY value
  //Salveaza pozitia initiala a cursorului in variabilele "prevMouseX" si "prevMouseY".
  //Aceste valori vor fi folosite ulterior pentru a trasa linii continue atunci cand utilizatorul misca cursorul pe canvas.

  ctx.beginPath(); // Creeaza un nou path prin apelarea metodei "beginPath()" a contextului canvas-ului.
  ctx.lineWidth = brushWidth; // Seteaza grosimea liniei (linewidth) prin atribuirea valorii variabilei "brushWidth".
  ctx.strokeStyle = selectedColor; // Seteaza culoarea liniei (strokeStyle) prin atribuirea valorii variabilei "selectedColor".
  ctx.fillStyle = selectedColor; // Seteaza culoarea de umplere (fillStyle) prin atribuirea valorii variabilei "selectedColor".

  // Copiaza imaginea din canvas in acel moment si o stocheaza intr-o variabila numita "snapshot".
  //Acest lucru se face pentru a preveni stergerea partiala a desenului atunci cand utilizatorul trage cursorul in timp ce deseneaza
  //getImageData() este o metoda a contextului canvas-ului care ia o imagine a ceea ce se afla in momentul respectiv pe canvas. Aceasta imagine este apoi stocata in variabila "snapshot".
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

// definește o constantă numită "drawing" care este o funcție.
// Această funcție primește un parametru "e" care reprezintă evenimentul care declanșează desenarea, cum ar fi "mousedown" sau "mousemove".
const drawing = (e) => {
  if (!isDrawing) return; //verifică dacă variabila "isDrawing" este setată la false. Dacă este adevărat, atunci funcția se oprește și nu mai continuă.
  ctx.putImageData(snapshot, 0, 0);
  //utilizează metoda "putImageData" a contextului canvas (ctx) pentru a adăuga datele de imagine stocate anterior (snapshot) pe acest canvas.

  if (selectedTool === "brush" || selectedTool === "eraser") {
    // verifică dacă uneltele selectate sunt "brush" sau "eraser". Dacă uneltele selectate sunt "eraser",culoarea stilului
    // de linie (strokeStyle) este setată la alb ("#fff") pentru a desena linii albe pe canvas.
    //Dacă nu, culoarea stilului de linie este setată la culoarea selectată.
    if (selectedTool == "eraser") {
      selectedColor = "#fff";
    }
    ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
    ctx.lineTo(e.offsetX, e.offsetY); //adaugă punctele la calea de desenare a canvas-ului, folosind metoda "lineTo" și coordonatele mouse-ului de la evenimentul "e".
    ctx.stroke(); //desenează linia cu culoarea selectată folosind metoda "stroke".
  } else if (selectedTool === "rectangle") {
    drawRect(e);
  } else if (selectedTool === "circle") {
    drawCircle(e);
  } else {
    drawTriangle(e);
  }
  offsetX = e.offsetX; // salvează poziția mouse-ului curent în variabila "offsetX".
  offsetY = e.offsetY; //// salvează poziția mouse-ului curent în variabila "offsetY".
  ultimulDesen.push({
    offsetX,
    offsetY,
    selectedColor,
    selectedTool,
  }); //daugă un obiect cu proprietățile "offsetX" și "offsetY" la array-ul "puncte".
};

//acest cod schimbă clasa "active" de la butonul anterior selectat la butonul curent
//selectat și actualizează valoarea variabilei selectedTool cu id-ul noii unelte selectate.
toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // adding click event to all tool option
    // removing active class from the previous option and adding on current clicked option
    document.querySelector(".options .active").classList.remove("active");
    btn.classList.add("active");
    selectedTool = btn.id;
  });
});

sizeSlider.addEventListener("change", () => (brushWidth = sizeSlider.value)); // passing slider value as brushSize
//adaugă un eveniment de ascultare la elementul HTML cu id-ul "sizeSlider" care se declanșează atunci când valoarea sliderului se schimbă.
// Când acest eveniment este declanșat, se setează valoarea variabilei "brushWidth" cu valoarea sliderului curent.

//adaugă evenimente de ascultare la toate butoanele de culoare dintr-un grup de butoane HTML cu clasa "colorBtns". Când unul dintre aceste butoane este apăsat, evenimentul de clic se declanșează și se execută următoarele acțiuni:
colorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // adding click event to all color button
    // removing selected class from the previous option and adding on current clicked option
    document.querySelector(".options .selected").classList.remove("selected");
    btn.classList.add("selected");

    // se obține valoarea proprietății CSS "background-color" a butonului curent, folosind metoda "getComputedStyle()".
    //Aceasta returnează un obiect care conține toate proprietățile CSS calculare ale elementului HTML curent. Se obține valoarea "background-color" din acest obiect și se salvează în variabila "selectedColor".
    selectedColor = window
      .getComputedStyle(btn)
      .getPropertyValue("background-color");
  });
});

//Adaugă un eveniment de ascultare pentru schimbarea valorii în câmpul colorPicker.
colorPicker.addEventListener("change", () => {
  // passing picked color value from color picker to last color btn background
  colorPicker.parentElement.style.background = colorPicker.value;
  //În interiorul funcției anonime, codul atribuie culoarea selectată din colorPicker la proprietatea de fundal a elementului părinte al colorPicker.
  //colorPicker.parentElement accesează elementul părinte al colorPicker.
  //style.background este proprietatea CSS pentru culoarea de fundal a elementului.
  //colorPicker.value este valoarea selectată din colorPicker.
  colorPicker.parentElement.click();
  //Apasă pe elementul părinte al colorPicker folosind metoda click().
  //Acest lucru va declanșa evenimentul click pe elementul părinte, permițând ca schimbarea culorii să fie propagată la restul aplicației.
});

clearCanvas.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing whole canvas
  //clearRect() este o metodă care șterge o regiune rectangulară specificată de coordonatele de sus-stânga și jos-dreapta.
  //0, 0 sunt coordonatele pentru colțul de sus-stânga al canvas-ului, iar canvas.width, canvas.height sunt dimensiunile canvas-ului, astfel încât regiunea specificată este întreaga suprafață a canvas-ului.
  setCanvasBackground();
  desen = [];
});

saveImg.addEventListener("click", () => {
  const link = document.createElement("a"); // Se creează un element HTML <a> (link) și se stochează în variabila "link".
  link.download = `${Date.now()}.jpg`; //se setează proprietatea "download" a elementului link. Această proprietate specifică numele fișierului pentru descărcare. În acest caz, se utilizează valoarea Date.now() care este timpul curent exprimat ca număr de milisecunde de la 1 ianuarie 1970. Această valoare este concatenată cu ".jpg" pentru a crea un nume unic pentru fișierul de imagine.
  link.href = canvas.toDataURL(); //Se setează proprietatea "href" a elementului link. Această proprietate specifică locația fișierului sau a resursei asociate cu linkul. În acest caz, se utilizează metoda "toDataURL()" a elementului "canvas" pentru a obține o reprezentare sub formă de imagine a conținutului din elementul canvas. Această reprezentare este stocată sub formă de URL de date, care este apoi atribuit la proprietatea "href" a elementului link.
  link.click(); // clicking link to download image
});

// saveImg.addEventListener("click", () => {
//   var img1 = new Image();
//   img1.src = canvas.toDataURL();

//   const link = document.createElement("a"); // Se creează un element HTML <a> (link) și se stochează în variabila "link".

//   function resizeImage(img1, w, h) {
//     var result = new Image();
//     var aux_canvas = document.createElement("canvas");
//     aux_canvas.width = w;
//     aux_canvas.height = h;
//     aux_ctx = aux_canvas.getContext("2d");
//     if (img1.complete) {
//       aux_ctx.drawImage(img1, 0, 0, w, h);
//     } else {
//       img1.onload = function () {
//         aux_ctx.drawImage(img1, 0, 0, w, h);
//       };
//     }
//     //aux_canvas.getContext("2d").drawImage(img_func, 0, 0, w, h);
//     result.src = aux_canvas.toDataURL();
//     return result;
//   }

//   var img2 = resizeImage(img1, 28, 28);

//   link.download = `${Date.now()}.jpg`; //se setează proprietatea "download" a elementului link. Această proprietate specifică numele fișierului pentru descărcare. În acest caz, se utilizează valoarea Date.now() care este timpul curent exprimat ca număr de milisecunde de la 1 ianuarie 1970. Această valoare este concatenată cu ".jpg" pentru a crea un nume unic pentru fișierul de imagine.
//   link.href = img2.src; //Se setează proprietatea "href" a elementului link. Această proprietate specifică locația fișierului sau a resursei asociate cu linkul. În acest caz, se utilizează metoda "toDataURL()" a elementului "canvas" pentru a obține o reprezentare sub formă de imagine a conținutului din elementul canvas. Această reprezentare este stocată sub formă de URL de date, care este apoi atribuit la proprietatea "href" a elementului link.
//   link.click(); // clicking link to download image
// });

function strokeArrayOnCanvas(points) {
  if (points.length < 2) return; // Avem nevoie de cel putin doua puncte pentru a putea desena o linie

  ctx.strokeStyle = points[0].selectedColor;
  ctx.beginPath();
  ctx.moveTo(points[0].offsetX, points[0].offsetY);

  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].offsetX, points[i].offsetY);
  }

  ctx.stroke();
}

function straightenLine() {
  // Luam punctul de la care incepe si cel la care se sfarsete linia
  const startX = ultimulDesen[0].offsetX;
  const startY = ultimulDesen[0].offsetY;
  const endX = ultimulDesen.slice(-1)[0].offsetX;
  const endY = ultimulDesen.slice(-1)[0].offsetY;

  //calculam lungimea liniei
  const dx = endX - startX;
  const dy = endY - startY;

  const lungimeLinie = Math.sqrt(dx * dx + dy * dy);

  // calculam panta
  const slope = (endY - startY) / (endX - startX);
  const yIntercept = startY - slope * startX;

  if (pointsFitLineModel(ultimulDesen, slope, yIntercept, lungimeLinie)) {
    removeLastSrtoke();
    const startAndEndPoints = [
      ultimulDesen[0],
      ultimulDesen[ultimulDesen.length - 1],
    ];

    strokeArrayOnCanvas(startAndEndPoints);
    ultimulDesen = startAndEndPoints;
  }

  desen.push(ultimulDesen);
}

//verifica faptul ca desenul introdus este o linie
function pointsFitLineModel(points, slope, yIntercept, lungimeLinie) {
  const pragulDeDistanta = lungimeLinie / 20; // ajusteaza aceasta valoare pentru a schimba pragul

  return points.every((point) => {
    const distanta =
      Math.abs(slope * point.offsetX - point.offsetY + yIntercept) /
      Math.sqrt(slope * slope + 1);
    return distanta < pragulDeDistanta;
  });
}

//sterge ultima linie desenata
function removeLastSrtoke() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  desen.forEach((points) => {
    strokeArrayOnCanvas(points);
  });
}

canvas.addEventListener("mousedown", startDraw); //Acesta este un eveniment care se declanșează atunci când utilizatorul apasă butonul mouse-ului pe suprafața canvas. Funcția startDraw este apelată ca răspuns la acest eveniment.
canvas.addEventListener("mousemove", drawing); //Acesta este un eveniment care se declanșează atunci când utilizatorul mișcă mouse-ul pe suprafața canvas. Funcția drawing este apelată ca răspuns la acest eveniment.
canvas.addEventListener("mouseup", () =>
  //Acesta este un eveniment care se declanșează atunci când utilizatorul ridică butonul mouse-ului de pe suprafața canvas. În acest caz, o funcție anonimă este definită ca răspuns la eveniment.
  {
    isDrawing = false; //utilizatorul nu mai trasează
    if (selectedTool === "brush" || selectedTool === "eraser") {
      straightenLine();
    } else {
      desen.push(ultimulDesen);
    }
    ultimulDesen = [];
  }
);

