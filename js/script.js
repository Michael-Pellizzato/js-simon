/**Descrizione:**
Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

**NOTA**: non è importante l'ordine con cui l'utente inserisce i numeri, basta che ne indovini il più possibile.

**BONUS:**
- Inseriamo la validazione: se l'utente mette due numeri uguali o inserisce cose diverse da numeri lo blocchiamo in qualche modo.
- Se l’utente ha inserito qualcosa di non valido, segnaliamolo visivamente nel form.

Consigli del giorno:
> - Pensate prima in italiano.
> - Dividete in piccoli problemi la consegna.
> - Individuate gli elementi di cui avete bisogno per realizzare il programma.
> - Immaginate la logica come fosse uno snack: "Dati 2 array di numeri, indica quali e quanti numeri ci sono in comune tra i due array"*/


const countdownElement = document.getElementById("countdown");
const numbersList = document.getElementById("numbers-list");
const form = document.getElementById("answers-form");
const inputGroup = document.getElementById("input-group");
const messageElement = document.getElementById("message");


let randomNumbers = [];
let timer;


const generateRandomNumbers = (count, min, max) => {
  const numbers = new Set();
  while (numbers.size < count) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(randomNum);
  }
  return Array.from(numbers);
};


const startCountdown = (duration, onComplete) => {
  let timeRemaining = duration;
  countdownElement.textContent = timeRemaining;

  timer = setInterval(() => {
    timeRemaining -= 1;
    countdownElement.textContent = timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(timer);
      onComplete();
    }
  }, 1000);
};


const startGame = () => {
  
  randomNumbers = generateRandomNumbers(5, 1, 50);

 
  numbersList.innerHTML = randomNumbers.map(num => `<li class="fs-3">${num}</li>`).join("");

  
  startCountdown(30, () => {
    
    numbersList.innerHTML = "";
    form.classList.remove("d-none");
    countdownElement.textContent = "Inserisci i numeri che ricordi!";
  });
};


form.addEventListener("submit", event => {
  event.preventDefault();

  
  const userNumbers = Array.from(inputGroup.querySelectorAll("input")).map(input => parseInt(input.value, 10));

  
  const correctNumbers = userNumbers.filter(num => randomNumbers.includes(num));

  
  messageElement.textContent = `Hai indovinato ${correctNumbers.length} numeri: ${correctNumbers.join(", ")}`;
});


startGame();

//!!!!!!!!!!HO DOVUTO CHIEDERE IL RAGIONAMENTO A CHATGPT E PRENDERE SPUNTO DA CHATGPT E VIDEO YOUTUBE, DA SOLO NON CI SAREI MAI ARRIVATO!!!!!!!!!
