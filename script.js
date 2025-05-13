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

let conteneur = document.getElementById('cards-api');
let mode = "complet";
let nbAffiche = 16;
if (!conteneur) {
    conteneur = document.getElementById('cards-images');
    mode = "images";
}


fetch(`https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=${pageAleatoire}`, options)
    .then(res => res.json())
    .then(data => {
        const films = data.results;
        afficherCartesFilms(films, nbAffiche, conteneur, mode);
        chargerImagesCarrousel(films, 3, document.querySelector('.carousel-inner'));
    })


    .catch(err => console.error(err));
console.log(`Vous êtes page: ${pageAleatoire}`);



function afficherCartesFilms(films, nbCarte, conteneurCarte, mode = "complet") {
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
        carte.appendChild(headerCarte);



        const imageCarte = document.createElement('img');
        imageCarte.src = image;
        imageCarte.alt = `Affiche du film ${titre}`;
        carte.appendChild(imageCarte);


        if (mode === "complet") {
            const contenuCarte = document.createElement('div');
            contenuCarte.classList.add('content');

            const resumeCarte = document.createElement('p');
            resumeCarte.textContent = description;
            contenuCarte.appendChild(resumeCarte);
            carte.appendChild(contenuCarte);

            const footerCarte = document.createElement('footer');
            const sortieCarte = document.createElement('h2');
            sortieCarte.textContent = dateSortie;
            footerCarte.appendChild(sortieCarte);
            carte.appendChild(footerCarte);
        }

        conteneurCarte.appendChild(carte);
    }
}



const boutonRandom = document.querySelector('.button-random');

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
            afficherCartesFilms(films, nbAffiche, conteneur);
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

// ------------------------Recuperer info formulaire-------------------------\\

const filmAjouter = [];

const formFilm = document.querySelector("#form-film");
if (formFilm) {
    formFilm.addEventListener("submit", function (event) {
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

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('close-btn');

        // Ajouter l'icône SVG de fermeture
        const svgIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="icon">
            <path fill="currentColor" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"/>
        </svg>
    `;
        closeBtn.innerHTML = svgIcon; // Insérer l'icône dans le bouton

        closeBtn.addEventListener('click', function () {
            carte.remove(); // Supprimer la carte
        });

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

        headerCarte.appendChild(closeBtn);
        carte.appendChild(headerCarte);
        carte.appendChild(imageCarte);
        carte.appendChild(contenuCarte);
        carte.appendChild(footerCarte);

        document.getElementById("cards-persos").appendChild(carte);
    }
}

//-----------------------------------GALERIE-----------------------------------\\

const imageAjouter = [];

const formImage = document.querySelector("#form-galerie");
if (formImage) {
    formImage.addEventListener("submit", function (event) {
        event.preventDefault();


        const nomImg = document.getElementById("tImage").value;
        const urlImg = document.getElementById("poster").value;
        const fichierImg = document.getElementById("posterFile").files[0];


        if (!nomImg) {
            alert("Veuillez entrer un nom pour l'image.");
            return;
        }

        // pour vérifier qu'au moins un des champs pour l'image est utilisé
        if (!urlImg && !fichierImg) {
            alert("Veuillez fournir un lien vers une image ou importer un fichier.");
            return;
        }

        let Img;
        if (fichierImg) {
            Img = URL.createObjectURL(fichierImg);
        } else {
            Img = urlImg;
        }

        ajoutImagePerso(nomImg, Img);

        formContainer.style.display = "none";
        overlay.style.display = "none";

        // Nettoyage des champs
        document.getElementById("tImage").value = "";
        document.getElementById("poster").value = "";
        document.getElementById("posterFile").value = "";
    });



    function ajoutImagePerso(titre, image) {

        const carte = document.createElement('article');
        carte.classList.add('card');

        const headerCarte = document.createElement('header');
        const titreCarte = document.createElement('h2');
        titreCarte.textContent = titre;
        headerCarte.appendChild(titreCarte);

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('close-btn');

        // Ajouter l'icône SVG de fermeture
        const svgIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="icon">
            <path fill="currentColor" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"/>
        </svg>
    `;
        closeBtn.innerHTML = svgIcon; // Insérer l'icône dans le bouton

        closeBtn.addEventListener('click', function () {
            carte.remove(); // Supprimer la carte
        });

        const imageCarte = document.createElement('img');
        imageCarte.src = image;
        imageCarte.alt = `Image ${titre}`;

        headerCarte.appendChild(closeBtn);
        carte.appendChild(headerCarte);
        carte.appendChild(imageCarte);

        document.getElementById("cards-images-perso").appendChild(carte);
    }
}

// ------------------------------- TRI ------------------------------- \\.

const btnTrie = document.getElementById("trier");


btnTrie.addEventListener("click", () => {
    conteneur.classList.toggle("mode-colonne");
});


// ------------------------------------ CARROUSSEL ------------------------------------ \\

// Ceci est une fonction auto - exécutable.Les fonctions auto - exécutables sont des fonctions qui s'exécutent immédiatement après leur déclaration, sans avoir besoin d'être appelées.Les accolades immédiatement après la déclaration de la fonction et les parenthèses à la fin de la déclaration définissent la fonction et permettent de l'exécuter immédiatement.
(function () {
    // Déclare la constante pour la durée de chaque slide
    const slideTimeout = 5000;
    // Récupère les boutons de navigation
    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');
    // Récupère tous les éléments de type "slide"
    const $slides = document.querySelectorAll('.slide');
    // Initialisation de la variable pour les "dots"
    let $dots;
    // Initialisation de la variable pour l'intervalle d'affichage des slides
    let intervalId;
    // Initialisation du slide courant à 1
    let currentSlide = 1;
    // Fonction pour afficher un slide spécifique en utilisant un index
    function slideTo(index) {
        // Vérifie si l'index est valide (compris entre 0 et le nombre de slides - 1)
        currentSlide = index >= $slides.length || index < 1 ? 0 : index;
        // Boucle sur tous les éléments de type "slide" pour les déplacer
        $slides.forEach($elt => $elt.style.transform = `translateX(-${currentSlide * 100}%)`);
        // Boucle sur tous les "dots" pour mettre à jour la couleur par la classe "active" ou "inactive"
        $dots.forEach(($elt, key) => $elt.classList = `dot ${key === currentSlide ? 'active' : 'inactive'}`);
    }
    // Fonction pour afficher le prochain slide
    function showSlide() {
        slideTo(currentSlide);
        currentSlide++;
    }
    // Boucle pour créer les "dots" en fonction du nombre de slides
    for (let i = 1; i <= $slides.length; i++) {
        let dotClass = i == currentSlide ? 'active' : 'inactive';
        let $dot = `<span data-slidId="${i}" class="dot ${dotClass}"></span>`;
        document.querySelector('.carousel-dots').innerHTML += $dot;
    }
    // Récupère tous les "dots"
    $dots = document.querySelectorAll('.dot');
    // Boucle pour ajouter des écouteurs d'événement "click" sur chaque "dot"
    $dots.forEach(($elt, key) => $elt.addEventListener('click', () => slideTo(key)));
    // Ajout d'un écouteur d'événement "click" sur le bouton "prev" pour afficher le slide précédent
    prev.addEventListener('click', () => slideTo(--currentSlide))
    // Ajout d'un écouteur d'événement "click" sur le bouton "next" pour afficher le slide suivant
    next.addEventListener('click', () => slideTo(++currentSlide))
    // Initialisation de l'intervalle pour afficher les slides
    intervalId = setInterval(showSlide, slideTimeout)
    // Boucle sur tous les éléments de type "slide" pour ajouter des écouteurs d'événement pour les interactions avec la souris et le toucher
    $slides.forEach($elt => {
        let startX;
        let endX;
        // Efface l'intervalle d'affichage des slides lorsque la souris passe sur un slide
        $elt.addEventListener('mouseover', () => {
            clearInterval(intervalId);
        }, false)
        // Réinitialise l'intervalle d'affichage des slides lorsque la souris sort d'un slide
        $elt.addEventListener('mouseout', () => {
            intervalId = setInterval(showSlide, slideTimeout);
        }, false);
    })
})()


// -------------------------------- IMAGE CARROUSEL ----------------------------- \\

function chargerImagesCarrousel(films, nbImages, conteneurCarousel) {
    const max = Math.min(nbImages, films.length);

    // Vider le conteneur du carrousel
    conteneurCarousel.innerHTML = '';

    for (let i = 0; i < max; i++) {
        const film = films[i];
        const imageUrl = 'https://image.tmdb.org/t/p/w500' + film.poster_path;

        // Création de la slide
        const slide = document.createElement('div');
        slide.classList.add('slide');

        // Création de l'image
        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = `Affiche du film ${film.title}`;

        // Ajout de l'image à la slide
        slide.appendChild(image);

        // Ajout de la slide au carrousel
        conteneurCarousel.appendChild(slide);
    }

    // Réinitialiser les points de navigation
    const dotsContainer = document.querySelector('.carousel-dots');
    dotsContainer.innerHTML = '';
    const slides = document.querySelectorAll('.slide');
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot', index === 0 ? 'active' : 'inactive');
        dot.dataset.slidId = index;
        dotsContainer.appendChild(dot);
    });

    // Réinitialiser le comportement du carrousel
    initialiserCarrousel();
}

function initialiserCarrousel() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function slideTo(index) {
        currentSlide = index >= slides.length ? 0 : index < 0 ? slides.length - 1 : index;
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(-${currentSlide * 100}%)`;
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
            dot.classList.toggle('inactive', i !== currentSlide);
        });
    }

    document.querySelector('#prev').onclick = () => slideTo(currentSlide - 1);
    document.querySelector('#next').onclick = () => slideTo(currentSlide + 1);
    dots.forEach((dot, i) => {
        dot.onclick = () => slideTo(i);
    });

    // Auto défilement
    clearInterval(window.carouselInterval);
    window.carouselInterval = setInterval(() => slideTo(currentSlide + 1), 5000);
}
