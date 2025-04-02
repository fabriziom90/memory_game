// funzione che fa partire il timer
function startTimer() {
    // variabili per minuti secondi ed ore
    let seconds = 0;
    let minutes = 0;

    // recupero gli elementi del dom che devono contenere queste informazioni
    let m = document.getElementById('minutes');
    let s = document.getElementById('seconds');

    let timer = setInterval(function () {
        seconds++;

        if (seconds < 9) {
            s.innerHTML = `0${seconds}`;
        }
        else {
            s.innerHTML = `${seconds}`
        }

        if (seconds > 59) {
            minutes++;
            m.innerHTML = `0${seconds}`;
            seconds = 0;
            s.innerHTML = `00`;

            if (minutes > 9) {
                m.innerHTML = `0${minutes}`;
            }
            else {
                m.innerHTML = `${minutes}`;
            }
        }

    }, 1000)

    return timer;
}

// funzione che crea la grafica delle carte di gioco
function createGraphicCard(film, num) {
    const card = document.createElement('div');

    let { name, img } = film;

    card.classList.add('game-card');
    card.style.width = `calc(100% / ${num} - 20px)`;

    if (num === 4) {
        card.style.height = '400px'
    }
    else {
        card.style.height = '300px';
    }

    card.style.margin = '10px';
    // funzione che mi definisce il data attribute name da assegnare al div card
    card.dataset.name = name;
    card.innerHTML += `<img src="./img/card-back-black.png" class="card-face-back">`;
    card.innerHTML += `<img src="./img/${img}" class="card-face-front">`;

    return card;
}

//FUNZIONE CHE CREA LA NUOVA PARTITA: DETERMINA IL LIVELLO DI DIFFICOLTA' (OVVERO IL NUMERO DI CARTE SUL TAVOLO), GENERA L'ARRAY DELLE CARTE SUL TAVOLO E LE CREA VISIVAMENTE
function createNewGame(films) {
    // rimuovo la classe d-none dal timer per visualizzarlo
    document.getElementById('time').classList.remove('d-none');

    // ogni volta che premo il pulsante per avviare una nuova partita, imposto i minuti ed i secondi a 0
    document.getElementById('minutes').innerHTML = '00';
    document.getElementById('seconds').innerHTML = '00';

    //RECUPERO LA GRIGLIA DAL DOM
    const grid = document.getElementById('grid');
    //RECUPERO IL VALORE SELEZIONATO CON LA SELECT
    const select_value = parseInt(document.getElementById('difficulty').value);

    //SVUOTO LA GRIGLAI ATTUALE PER INIZIARNE RIEMPIRLA NUOVAMENTE
    grid.innerHTML = '';

    //DICHIARO LA VARIABILE CHE CONTERRA' IL NUMERO TOTALE DI CARTE NONCHE' INDICATRICE DEL LIVELLO DI DIFFICOLTA'
    let difficulty;

    //DETERMINO CON UNO SWITCH IL LIVELLO DI DIFFICOLTA' DELLA PARTITA
    switch (select_value) {
        case 1:
            difficulty = 16;
            break;
        case 2:
            difficulty = 36;
            break;
        default:
            alert('Seleziona prima un livello di difficoltà');
    }

    //GENERARE L'ARRAY DELLE CARTE CHE DEVONO ESSERE RANDOM, IN BASE AL LIVELLO DI DIFFICOLTA' SELEZIONATO
    //variabile array contenente le carte
    let arrayCards = createArrayCards(films, difficulty);

    //CREO L'ARRAY DELLE CARTE DA GIOCO (DA GIOCO) A PARTIRE DA QUELLO PRECEDENTE E RANDOMICIZZANDONE L'ORDINE
    let totalCards = [...arrayCards, ...arrayCards].sort(() => 0.5 - Math.random());

    //RICHIAMO LA FUNZIONE CHE MI GENERA LE CARTE DA GIOCO NELLA GRIGLIA E MI IDENTIFICA LA LOGICA DI GIOCO
    createCards(totalCards, difficulty);

}

//DEFINIZIONE DELLA FUNZIONE CHE GENERA UN ARRAY DI CARTE CASUALI
function createArrayCards(array_films, difficulty) {
    return shuffled = array_films.sort(() => 0.5 - Math.random()).slice(0, difficulty / 2);
}

//DEFINIZIONE DELLA FUNZIONE CHE MI GENERA LE CARTE DA GIOCO SULLA GRIGLIA E MI IDENTIFICA LA LOGICA DEL GIOCO STESSO
function createCards(arrayCards, total_cards) {
    //DEFINIRE QUANTE CARTE CI SONO PER RIGA
    let cardsPerRow = Math.sqrt(total_cards);

    let flipped = []; //ARRAY CHE CONTIENE LE CARTE GIRATE PER CONTROLLARE SE SONO UGUALI
    let guessed = []; //ARRAY CHE CONTIENE LE CARTE INDOVINATE

    // faccio partire il timer attraverso la funzione startTimer e lo restituisco in una variabile
    let timer = startTimer();

    //RECUPERO LA GRIGLA
    const grid = document.getElementById('grid');

    //CICLO L'ARRAY DELLE CARTE PER GENERARLE GRAFICAMENTE UNA PER UNA
    arrayCards.forEach((elem) => {
        //RICHIAMO LA FUNZIONE CHE CREA VISIVAMENTE LE CARTE UNA PER UNA
        const card = createGraphicCard(elem, cardsPerRow);

        card.addEventListener('click', function () {
            this.classList.add('flipped'); //AGGIUNGO LA CLASSE FLIPPED ALL'ELEMENTO CLICCATO

            //RECUPERO TUTTI GLI ELEMENTI CON LA CLASSE FLIPPED
            const flippedCards = document.querySelectorAll('.flipped');

            flipped.push(this.dataset.name);
            console.log(flipped);
            //SE L'ARRAY FLIPPED CONTIENE DUE ELEMENTI, LI CONFRONTO
            if (flipped.length === 2) {
                //VERIFICO SE I DUE ELEMENTI SONO UGUALI
                if (flipped[0] == flipped[1]) {

                    console.log(flipped);
                    //SE HO INDOVINATO VADO A PUSHARE IL NOME DEL FILM ALL'INTERNO DELL'ARRAY GUESSED
                    guessed.push(flipped[0]);

                    //L'ARRAY FLIPPED DEVE ESSERE SVUOTATO
                    flipped = [];
                    console.log(flipped);

                    console.log(guessed);

                    //VERIFICO SE LA LUNGHEZZA DELL'ARRAY GUESSED E' UGUALE ALLA LUNGHEZZA DELL'ARRAY CHE STO CICLANDO (CARTE TOTALI) DIVISO DUE, ALLORA HO VINTO
                    if (guessed.length === arrayCards.length / 2) {
                        setTimeout(() => {
                            alert('Hai vinto!');
                            clearInterval(timer);

                            document.getElementById('start').classList.remove('disabled');
                            document.getElementById('start').removeAttribute('disabled');
                        }, 2000);
                    }

                }
                else {

                    flippedCards.forEach((elem) => {
                        setTimeout(() => elem.classList.remove('flipped'), 1000);
                    })

                    flipped = [];
                    guessed = [];
                    console.log(guessed);
                }
            }
        });


        grid.appendChild(card);
    });

}

//RECUPERO IL PULSANTE DI INIZIO PARTITA
const button = document.getElementById('start');
button.addEventListener('click', function () {
    let films;
    axios.get('https://gist.githubusercontent.com/fabriziom90/c7772608f797e0f1a7cd171288798be1/raw/fd3e992a30908db6fbf6830ce2131b97e0e67fff/films.json').then((resp) => {
        films = resp.data;
        
        createNewGame(films);
    
        this.classList.add('disabled');
        this.setAttribute('disabled', true);
    })


});
