//ARRAY DI FILM
const films = [
    {
        'name': 'Il grande Lebowsky',
        'img': 'il-grande-lebowsky.jpg'
    },
    {
        'name': 'Il signore degli anelli: il ritorno del re',
        'img': 'il-ritorno-del-re.jpg'
    },
    {
        'name': 'Star wars: l\'impero colpisce ancora',
        'img': 'impero-colpisce-ancora.jpg'
    },
    {
        'name': 'Inception',
        'img': 'inception.jpg'
    },
    {
        'name': 'Il signore degli anelli: la compagnia dell\'anello',
        'img': 'la-compagnia-dellanello.jpg'
    },
    {
        'name': 'Il signore degli anelli: le due torri',
        'img': 'le-due-torri.jpg'
    },
    {
        'name': 'Shutter Island',
        'img': 'shutter-island.jpg'
    },
    {
        'name': 'The departed',
        'img': 'the-departed.jpg'
    },
    {
        'name': 'V per Vendetta',
        'img': 'v-per-vendetta.jpg'
    },
    {
        'name': 'Star wars: la vendetta dei sith',
        'img': 'la-vendetta-dei-sith.jpg'
    },
    {
        'name': 'Il mistero di Sleepy Hollow',
        'img': 'il-mistero-di-sleepy-hollow.jpg'
    },
    {
        'name': 'Non è un paese per vecchi',
        'img': 'non-e-un-paese-per-vecchi.jpg'
    },
    {
        'name': 'The hateful eight',
        'img': 'the-hateful-eight.jpg'
    },
    {
        'name': 'Pulp fiction',
        'img': 'pulp-fiction.jpg'
    },
    {
        'name': 'Matrix',
        'img': 'matrix.jpg'
    },
    {
        'name': 'Il caso spotlight',
        'img': 'il-caso-spotlight.jpg'
    },
    {
        'name': 'The founder',
        'img': 'the-founder.jpg'
    },
    {
        'name': 'Django: unchained',
        'img': 'django-unchained.jpg'
    },
    {
        'name': 'The wolf of wall street',
        'img': 'the-wolf-of-wall-street.jpg'
    },
    {
        'name': 'Constantine',
        'img': 'constantine.jpg'
    },
    {
        'name': 'Interstellar',
        'img': 'interstellar.jpg'
    },
    {
        'name': 'Full metal jacket',
        'img': 'full-metal-jacket.jpg'
    },
    {
        'name': 'Arancia meccanica',
        'img': 'arancia-meccanica.jpg'
    },
    {
        'name': 'Eyes wide shut',
        'img': 'eyes-wide-shut.jpg'
    },
    {
        'name': 'John Wick',
        'img': 'john-wick.jpg'
    },
    {
        'name': 'Matrix: Reloaded',
        'img': 'matrix-reloaded.jpg'
    },
    {
        'name': 'Matrix: Revolutions',
        'img': 'matrix-revolutions.jpg'
    },
    {
        'name': 'Il grande gatsby',
        'img': 'il-grande-gatsby.jpg'
    },
    {
        'name': 'La maledizione della prima luna',
        'img': 'la-maledizione-della-prima-luna.jpg'
    },
    {
        'name': 'Scarface',
        'img': 'scarface.jpg'
    },
    {
        'name': 'Mad Max: Fury road',
        'img': 'mad-max.jpg'
    },
    {
        'name': 'Ready Player One',
        'img': 'ready-player-one.jpg'
    },
    {
        'name': 'Jurassic Park',
        'img': 'jurassic-park.jpg'
    },
    {
        'name': 'Alien',
        'img': 'alien.jpg'
    },

];

function createGraphicCard(film, num) {
    const card = document.createElement('div');
    card.classList.add('game-card');

    card.style.width = `calc(100% / ${num} - 20px)`;



    if (num === 4) {
        card.style.height = '400px'
    }
    else {
        card.style.height = '300px';
    }

    card.style.margin = '10px';
    card.dataset.name = film.name;
    card.innerHTML += `<img src="./img/card-back-black.png" class="card-face-back">`;
    card.innerHTML += `<img src="./img/${film.img}" class="card-face-front">`;

    return card;
}

//FUNZIONE CHE CREA LA NUOVA PARTITA: DETERMINA IL LIVELLO DI DIFFICOLTA' (OVVERO IL NUMERO DI CARTE SUL TAVOLO), GENERA L'ARRAY DELLE CARTE SUL TAVOLO E LE CREA VISIVAMENTE
function createNewGame(films) {
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

        //
        document.querySelectorAll('.game-card').forEach((card) => {
            let width = card.offsetWidth;

            height = (width * 1.7);
            card.style.height = height + 'px'
        });
    });

}

//RECUPERO IL PULSANTE DI INIZIO PARTITA
const button = document.getElementById('start');
button.addEventListener('click', function () {
    createNewGame(films);
});

