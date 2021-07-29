const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");

//declaro las opciones para usar en las constrasenas
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

function obtenerMinusculas() {
  //Math.floor: Devuelve el máximo entero menor o igual a un número.
  //La función Math.random() retorna un punto flotante, un número pseudo-aleatorio dentro del rango [0, 1).
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function obtenerMayusculas() {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function obtenerNumeros() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function obtenerSimbolos() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generarConstrasena() {
  //que tan larga va a ser la contrasena segun lo que se marque en el input
  const len = lenEl.value;

  let password = "";

  //checked es para el click sobre el espacio
  if (upperEl.checked) {
    password += obtenerMayusculas();
  }
  if (lowerEl.checked) {
    password += obtenerMinusculas();
  }
  if (numberEl.checked) {
    password += obtenerNumeros();
  }
  if (symbolEl.checked) {
    password += obtenerSimbolos();
  }

  for (let i = password.length; i < len; i++) {
    const x = generarX();
    password += x;
  }

  pwEl.innerText = password;
}

function generarX() {
  const x = [];
  if (upperEl.checked) {
    x.push(obtenerMayusculas());
  }
  if (lowerEl.checked) {
    x.push(obtenerMinusculas());
  }
  if (numberEl.checked) {
    x.push(obtenerNumeros());
  }
  if (symbolEl.checked) {
    x.push(obtenerSimbolos());
  }

  if (x.length === 0) return "";
  return x[Math.floor(Math.random() * x.length)];
}

generateEl.addEventListener("click", generarConstrasena);

//boton de copiar contrasena
copyEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = pwEl.innerText;

  if (!password) {
    return;
  }

  //El valor del textarea que va a copiar el usuario = password
  //Luego creamos el textarea y lo seleccionamos
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();

  //El método execCommand () ejecuta lo especificado dentro de los parentesis (copy, cut paste) para la parte seleccionada. Es decir, se le dice cuando se toque el boton "copyEl" vas a copiar lo seleccionado en el textarea.
  document.execCommand("copy");
  textarea.remove();
  // alert("Password copied to clipboard");
  $("#mensajeCopiado").show(300);
  setTimeout(() => {
    $("#mensajeCopiado").hide("slow");
  }, 2500);
});
