const filename = window.location.pathname.split('/').pop();
document.getElementById('page-title').textContent = filename || 'Accueil';



// loop articles : article (title, content, picture)
const containeurCarte = document.getElementById('cards');

const nbCarte = 5; // Choisir combien de cartes créer

for (let i = 0; i < nbCarte; i++) {
    const carte = document.createElement('article');
    carte.classList.add('card'); // Ajoute une classe "card" à l'élément créé

    const headerCarte = document.createElement('header'); // créer un header
    const titreCarte = document.createElement('h2'); // avec un titre h2
    titreCarte.textContent = `Titre film ${i + 1}`;  // rajoute le nombre i+1 pour avoir le numéro du film (temporaire)
    headerCarte.appendChild(titreCarte); 


    const imageCarte = document.createElement('img');
    imageCarte.src = './photo/chien.jpg';  
    imageCarte.alt = `Affiche du film ${i + 1}`;


    const contenuCarte = document.createElement('div');
    contenuCarte.classList.add('content');

    const resumeCarte = document.createElement('p');
    resumeCarte.textContent = 'Denique Antiochensis ordinis vertices sub uno elogio iussit occidi ideo efferatus...'; 
    contenuCarte.appendChild(resumeCarte);


    carte.appendChild(headerCarte);
    carte.appendChild(imageCarte);
    carte.appendChild(contenuCarte);

    containeurCarte.appendChild(carte);

}



// end_loop
