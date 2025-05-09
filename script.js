const maxPages = 500;
const pageAleatoire = Math.floor(Math.random() * maxPages) + 1;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzc5M2U3YzlmNTdiMzg1MGQ2ZTdlZGM2NTdmYjRkZCIsIm5iZiI6MTc0NTg0ODY2Mi44MTMsInN1YiI6IjY4MGY4OTU2MGMxMjVhOTU1MzBmOTY3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j_pnpZKmaJ_nl6T_S0HVZBNf18wsvCD5g2FUKbGHY7M'
    }
};

//--------------------------------Appel API-----------------------------\\
fetch(`https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=${pageAleatoire}`, options)
    .then(res => res.json())
    .then(data => {
        const films = data.results;
        const conteneur = document.getElementById('cards-api');
        afficherCartesFilms(films, 16, conteneur);
    })


    .catch(err => console.error(err));
console.log(`Vous êtes page: ${pageAleatoire}`);



function afficherCartesFilms(films, nbCarte, conteneurCarte) {
    // pour limiter si on a moins de films que ce qu'on en demande
    const max = Math.min(nbCarte, films.length);

    for (let i = 0; i < max; i++) {
        const film = films[i];
        const titre = film.title;
        const description = film.overview;
        const image = 'https://image.tmdb.org/t/p/w500' + film.poster_path;
        const dateSortie = film.release_date;


        const carte = document.createElement('article');
        carte.classList.add('card');

        const headerCarte = document.createElement('header');
        const titreCarte = document.createElement('h2');
        titreCarte.textContent = titre;
        headerCarte.appendChild(titreCarte);

        const footerCarte = document.createElement('footer');
        const sortieCarte = document.createElement('h2');
        sortieCarte.textContent = dateSortie;
        footerCarte.appendChild(sortieCarte);


        const imageCarte = document.createElement('img');
        imageCarte.src = image;
        imageCarte.alt = `Affiche du film ${titre}`;

        const contenuCarte = document.createElement('div');
        contenuCarte.classList.add('content');

        const resumeCarte = document.createElement('p');
        resumeCarte.textContent = description;
        contenuCarte.appendChild(resumeCarte);


        carte.appendChild(headerCarte);
        carte.appendChild(imageCarte);
        carte.appendChild(contenuCarte);
        carte.appendChild(footerCarte);


        conteneurCarte.appendChild(carte);
    }
}

const boutonRandom = document.querySelector('.button');

function FilmRandom() {
    const maxPages = 500;
    const pageAleatoire = Math.floor(Math.random() * maxPages) + 1;
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=${pageAleatoire}`;

    console.log(`Vous êtes sur la page : ${pageAleatoire}`);

    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            const films = data.results;
            const conteneur = document.getElementById('cards-api');
            conteneur.innerHTML = ''; // on vide avant d'ajouter les nouvelles cartes
            afficherCartesFilms(films, 20, conteneur);
        })
        .catch(err => console.error(err));
}

boutonRandom.addEventListener('click', FilmRandom);

//--------------dropdown------------------\\

function navigate(select) {
    const url = select.value;
    if (url) {
        window.location.href = url;
    }
}

// --------------------------Afficher formulaire------------------------------\\

const btnAjout = document.getElementById("ajout-film");
const formContainer = document.getElementById("form-container");
const overlay = document.getElementById("overlay");

btnAjout.addEventListener("click", () => {
    formContainer.style.display = "block";
    overlay.style.display = "block";
});

// pour quitter le formulaire si on clic a côté
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        formContainer.style.display = "none";
        overlay.style.display = "none";
        document.getElementById("tfilm").value = "";
        document.getElementById("poster").value = "";
        document.getElementById("syno").value = "";
        document.getElementById("annee").value = "";
    }
});

// -----------------------Recuperer info formulaire-------------------------\\

const filmAjouter = [];

document.querySelector(".form").addEventListener("submit", function (event) {
    event.preventDefault();

    const filmTitle = document.getElementById("tfilm").value;
    const urlImg = document.getElementById("poster").value;
    const fichierImg = document.getElementById("posterFile").files[0];
    const filmSyno = document.getElementById("syno").value;
    const filmAnnee = document.getElementById("annee").value;

    // pour vérifier qu'au moins un des champs pour l'image est utilisé
    if (!urlImg && !fichierImg) {
        alert("Veuillez fournir un lien vers une image ou importer un fichier.");
        return; 
    }

    let filmImg;
    if (fichierImg) {
        filmImg = URL.createObjectURL(fichierImg);
    } else {
        filmImg = urlImg;
    }

    creerCartePerso(filmTitle, filmSyno, filmImg, filmAnnee);

    formContainer.style.display = "none";
    overlay.style.display = "none";

    // Nettoyage des champs
    document.getElementById("tfilm").value = "";
    document.getElementById("poster").value = "";
    document.getElementById("posterFile").value = "";
    document.getElementById("syno").value = "";
    document.getElementById("annee").value = "";
});



function creerCartePerso(titre, synopsis, image, annee) {

    const carte = document.createElement('article');
    carte.classList.add('card');

    const headerCarte = document.createElement('header');
    const titreCarte = document.createElement('h2');
    titreCarte.textContent = titre;
    headerCarte.appendChild(titreCarte);

    const imageCarte = document.createElement('img');
    imageCarte.src = image;
    imageCarte.alt = `Affiche du film ${titre}`;

    const contenuCarte = document.createElement('div');
    contenuCarte.classList.add('content');

    const resumeCarte = document.createElement('p');
    resumeCarte.textContent = synopsis;
    contenuCarte.appendChild(resumeCarte);

    const footerCarte = document.createElement('footer');
    const sortieCarte = document.createElement('h2');
    sortieCarte.textContent = annee;
    footerCarte.appendChild(sortieCarte);

    carte.appendChild(headerCarte);
    carte.appendChild(imageCarte);
    carte.appendChild(contenuCarte);
    carte.appendChild(footerCarte);

    document.getElementById("cards-persos").appendChild(carte);
}


