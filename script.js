const filename = window.location.pathname.split('/').pop();
document.getElementById('page-title').textContent = filename || 'Accueil';



const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzc5M2U3YzlmNTdiMzg1MGQ2ZTdlZGM2NTdmYjRkZCIsIm5iZiI6MTc0NTg0ODY2Mi44MTMsInN1YiI6IjY4MGY4OTU2MGMxMjVhOTU1MzBmOTY3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j_pnpZKmaJ_nl6T_S0HVZBNf18wsvCD5g2FUKbGHY7M'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=fr-FR', options)
    .then(res => res.json())
    .then(data => {
        const films = data.results;
        const conteneur = document.getElementById('cards');
        afficherCartesFilms(films, 20, conteneur); 
    })

.catch(err => console.error(err));





function afficherCartesFilms(films, nbCarte, conteneurCarte) {
    // pour limiter si on a moins de films que ce qu'on en demande
     const max = Math.min(nbCarte, films.length);

    for (let i = 0; i < max; i++) {
        const film = films[i];
        const titre = film.title;
        const description = film.overview;
        const image = 'https://image.tmdb.org/t/p/w500' + film.poster_path;

        
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
        resumeCarte.textContent = description;
        contenuCarte.appendChild(resumeCarte);

        
        carte.appendChild(headerCarte);
        carte.appendChild(imageCarte);
        carte.appendChild(contenuCarte);

        
        conteneurCarte.appendChild(carte);
    }
}



// loop articles : article (title, content, picture)
// const containeurCarte = document.getElementById('cards');

// const nbCarte = 5; // Choisir combien de cartes créer

// for (let i = 0; i < nbCarte; i++) {
//     const carte = document.createElement('article');
//     carte.classList.add('card'); // Ajoute une classe "card" à l'élément créé

//     const headerCarte = document.createElement('header'); // créer un header
//     const titreCarte = document.createElement('h2'); // avec un titre h2
//     titreCarte.textContent = `Titre film ${i + 1}`;  // rajoute le nombre i+1 pour avoir le numéro du film (temporaire)
//     headerCarte.appendChild(titreCarte);


//     const imageCarte = document.createElement('img');
//     imageCarte.src = './photo/chien.jpg';
//     imageCarte.alt = `Affiche du film ${i + 1}`;


//     const contenuCarte = document.createElement('div');
//     contenuCarte.classList.add('content');

//     const resumeCarte = document.createElement('p');
//     resumeCarte.textContent = 'Denique Antiochensis ordinis vertices sub uno elogio iussit occidi ideo efferatus...';
//     contenuCarte.appendChild(resumeCarte);


//     carte.appendChild(headerCarte);
//     carte.appendChild(imageCarte);
//     carte.appendChild(contenuCarte);

//     containeurCarte.appendChild(carte);

// }


