let plateau = Array.from({ length: 8 }, () => Array(8).fill(0));
let taille_case;
let plateau_y;
const nbLignes = plateau.length;
const nbColonnes = plateau[0].length;
let pieces = [];
let cases_occupees = Array.from({ length: plateau.length }, () =>
    Array(plateau[0].length).fill(false)
);


let roi_b_Image;
let roi_n_Image;
let reine_b_Image;
let reine_n_Image;
let fou_b_Image;
let fou_n_Image;
let cavalier_b_Image;
let cavalier_n_Image;
let tour_b_Image;
let tour_n_Image;
let Pion_b_Image;
let Pion_n_Image;

let selectedPiece = null;

let upgrade = false;
let pion_a_upgrade = null;

// ------------------------------------------------------------------//

function preload() {
    Pion_n_Image = loadImage("./photo/echiquier/pion_n.png");
    roi_n_Image = loadImage("./photo/echiquier/roi_n.png");
    reine_n_Image = loadImage("./photo/echiquier/reine_n.png");
    fou_n_Image = loadImage("./photo/echiquier/fou_n.png");
    cavalier_n_Image = loadImage("./photo/echiquier/cavalier_n.png");
    tour_n_Image = loadImage("./photo/echiquier/tour_n.png");

    Pion_b_Image = loadImage("./photo/echiquier/pion_b.png");
    roi_b_Image = loadImage("./photo/echiquier/roi_b.png");
    reine_b_Image = loadImage("./photo/echiquier/reine_b.png");
    fou_b_Image = loadImage("./photo/echiquier/fou_b.png");
    cavalier_b_Image = loadImage("./photo/echiquier/cavalier_b.png");
    tour_b_Image = loadImage("./photo/echiquier/tour_b.png");
}

function getTailleCase() {
    if (window.innerWidth < 480) {
        return 50;
    }
    return 70;
}

function getPlateauY() {
    return taille_case / 2;
  }
  


function setup() {
    taille_case = getTailleCase(); // Affecte la bonne taille au bon moment

    const largeur = taille_case * nbColonnes;
    const hauteur = taille_case * nbLignes;

    const canvas = createCanvas(largeur, hauteur);
    canvas.parent("sketch-container");

    taille_case = getTailleCase();

    initialiserPieces();
    // noLoop();
}


function initialiserPieces() {
    pieces = [];

    // Noirs
    for (let x = 0; x < 8; x++) {
        pieces.push(new Piece("Pion", false, 1, x));
    }
    pieces.push(new Piece("Roi", false, 0, 4));
    pieces.push(new Piece("Reine", false, 0, 3));
    pieces.push(new Piece("Fou", false, 0, 2));
    pieces.push(new Piece("Fou", false, 0, 5));
    pieces.push(new Piece("Cavalier", false, 0, 1));
    pieces.push(new Piece("Cavalier", false, 0, 6));
    pieces.push(new Piece("Tour", false, 0, 0));
    pieces.push(new Piece("Tour", false, 0, 7));

    // Blancs
    for (let x = 0; x < 8; x++) {
        pieces.push(new Piece("Pion", true, 6, x));
    }
    pieces.push(new Piece("Roi", true, 7, 4));
    pieces.push(new Piece("Reine", true, 7, 3));
    pieces.push(new Piece("Fou", true, 7, 2));
    pieces.push(new Piece("Fou", true, 7, 5));
    pieces.push(new Piece("Cavalier", true, 7, 1));
    pieces.push(new Piece("Cavalier", true, 7, 6));
    pieces.push(new Piece("Tour", true, 7, 0));
    pieces.push(new Piece("Tour", true, 7, 7));
}


function draw() {


    for (let y = 0; y < plateau.length; y++) {
        for (let x = 0; x < plateau[y].length; x++) {
            if ((x + y) % 2 === 0) {
                fill(234, 218, 248);
            } else {
                fill(84, 15, 18);
            }
            rect(x * taille_case, y * taille_case, taille_case, taille_case);
        }
    }
    affichage_piece();


    if (selectedPiece != null) {
        let zoom = 1.3;
        imageMode(CENTER);

        //noir

        if (selectedPiece.Type === "Roi" && selectedPiece.Couleur === false) {
            image(roi_n_Image, mouseX, mouseY, taille_case * zoom, taille_case * zoom);
        }

        if (selectedPiece.Type === "Reine" && selectedPiece.Couleur === false) {
            image(reine_n_Image, mouseX, mouseY, taille_case * zoom, taille_case * zoom);
        }

        if (selectedPiece.Type === "Pion" && selectedPiece.Couleur === false) {
            image(Pion_n_Image, mouseX, mouseY, taille_case * zoom, taille_case * zoom);
        }

        if (selectedPiece.Type === "Fou" && selectedPiece.Couleur === false) {
            image(fou_n_Image, mouseX, mouseY, taille_case * zoom, taille_case * zoom);
        }

        if (selectedPiece.Type === "Cavalier" && selectedPiece.Couleur === false) {
            image(cavalier_n_Image, mouseX, mouseY, taille_case * zoom, taille_case * zoom);
        }

        if (selectedPiece.Type === "Tour" && selectedPiece.Couleur === false) {
            image(tour_n_Image, mouseX, mouseY, taille_case * zoom, taille_case * zoom);
        }


        //blanc

        if (selectedPiece.Type === "Roi" && selectedPiece.Couleur === true) {
            image(roi_b_Image, mouseX, mouseY, taille_case * zoom, taille_case * zoom);
        }

        if (selectedPiece.Type === "Reine" && selectedPiece.Couleur === true) {
            image(reine_b_Image, mouseX, mouseY, taille_case * zoom, taille_case * zoom);
        }

        if (selectedPiece.Type === "Pion" && selectedPiece.Couleur === true) {
            image(Pion_b_Image, mouseX, mouseY, taille_case * zoom, taille_case * zoom);
        }

        if (selectedPiece.Type === "Fou" && selectedPiece.Couleur === true) {
            image(fou_b_Image, mouseX, mouseY, taille_case * zoom, taille_case * zoom);
        }

        if (selectedPiece.Type === "Cavalier" && selectedPiece.Couleur === true) {
            image(cavalier_b_Image, mouseX, mouseY, taille_case * zoom, taille_case * zoom);
        }

        if (selectedPiece.Type === "Tour" && selectedPiece.Couleur === true) {
            image(tour_b_Image, mouseX, mouseY, taille_case * zoom, taille_case * zoom);
        }
    }

    if (upgrade && pion_a_upgrade != null) {
        fill(255);
        stroke(0);
        rect(width / 2 - 100, height / 2 - 80, 200, 200);
        textAlign(CENTER, CENTER);
        fill(0);
        text("Upgrade :", width / 2, height / 2 - 50);
        fill(255);
        let choix = ["Reine", "Tour", "Fou", "Cavalier"];
        for (let i = 0; i < choix.length; i++) {
            rect(width / 2 - 80, height / 2 - 30 + i * 35, 160, 30);
            fill(0);
            text(choix[i], width / 2, height / 2 - 15 + i * 35);
            fill(255);
        }
    }

    console.log("taille_case:", taille_case, "| plateau_y:", getPlateauY());

}


// check si il ya une piece ou pas
function piece_presente() {
    let piece_presente = false;
    for (let x = 0; x < plateau.length; x++) {
        for (let y = 0; y < plateau[x].length; y++) {
            if (cases_occupees[x][y]) {
                piece_presente = true;
                break;
            }
        }
        if (piece_presente) {
            break;
        }
    }
}


// définir si cases occupés ou non
function maj_cases() {


    for (let x = 0; x < plateau.length; x++) {
        for (let y = 0; y < plateau[x].length; y++) {

            cases_occupees[x][y] = false;
        }
    }
    for (let p of pieces) {
        cases_occupees[p.x][p.y] = true;
    }
}


function affichage_piece() {
    for (let p of pieces) {

        let pieceX = p.x * taille_case + taille_case / 2; // Position X centrée
        let pieceY = p.y * taille_case + taille_case / 2; // Position Y centrée
        imageMode(CENTER);
        if (p == selectedPiece) {
            continue;
        }
        // noir

        if (p.Type === "Roi" && p.Couleur === false) {
            image(roi_n_Image, pieceX, pieceY, taille_case / 1.5, taille_case / 1.5);
        }
        if (p.Type === "Reine" && p.Couleur === false) {
            image(reine_n_Image, pieceX, pieceY, taille_case, taille_case);
        }

        if (p.Type === "Pion" && p.Couleur === false) {
            image(Pion_n_Image, pieceX, pieceY, taille_case / 1.5, taille_case / 1.5);
        }

        if (p.Type === "Fou" && p.Couleur === false) {
            image(fou_n_Image, pieceX, pieceY, taille_case / 1.5, taille_case / 1.5);
        }

        if (p.Type === "Cavalier" && p.Couleur === false) {
            image(cavalier_n_Image, pieceX, pieceY, taille_case, taille_case);
        }
        if (p.Type === "Tour" && p.Couleur === false) {
            image(tour_n_Image, pieceX, pieceY, taille_case, taille_case);
        }


        // blanc

        if (p.Type === "Roi" && p.Couleur === true) {
            image(roi_b_Image, pieceX, pieceY, taille_case / 1.5, taille_case / 1.5);
        }

        if (p.Type === "Reine" && p.Couleur === true) {
            image(reine_b_Image, pieceX, pieceY, taille_case / 1.5, taille_case / 1.5);
        }

        if (p.Type === "Pion" && p.Couleur === true) {
            image(Pion_b_Image, pieceX, pieceY, taille_case / 1.5, taille_case / 1.5);
        }

        if (p.Type === "Fou" && p.Couleur === true) {
            image(fou_b_Image, pieceX, pieceY, taille_case / 1.5, taille_case / 1.5);
        }

        if (p.Type === "Cavalier" && p.Couleur === true) {
            image(cavalier_b_Image, pieceX, pieceY, taille_case / 1.5, taille_case / 1.5);
        }
        if (p.Type === "Tour" && p.Couleur === true) {
            image(tour_b_Image, pieceX, pieceY, taille_case / 1.5, taille_case / 1.5);
        }
    }
}

function MangerPiece(x, y) {

    for (let i = 0; i < pieces.length; i++) {
        let p = pieces[i];
        if (p.x == x && p.y == y) {
            pieces.splice(i, 1);
            cases_occupees[x][y] = false;
            break;
        }
    }
}

class Piece {

    constructor(Type_piece, Couleur_piece, lignes, colonnes) {
        this.Type = Type_piece;
        this.Couleur = Couleur_piece;
        this.x = colonnes;
        this.y = lignes;
    }
}

function mouseClicked() {
    let x = Math.floor(mouseX / taille_case);
    let y = Math.floor(mouseY / taille_case);

    piece_presente();

    if (selectedPiece == null) {
        for (let i = 0; i < pieces.length; i++) {
            let p = pieces[i];
            if (p.x == x && p.y == y) {
                selectedPiece = p;
                break;
            }
        }
    } else {
        if (x != selectedPiece.x || y != selectedPiece.y) {

            for (let p of pieces) {
                if (p.x == x && p.y == y) {
                    if (p.Couleur == selectedPiece.Couleur) {
                        selectedPiece = null;
                        return;
                    }
                }
            }

            MangerPiece(x, y);
            selectedPiece.x = x;
            selectedPiece.y = y;


            if (selectedPiece.Type === "Pion") {
                if ((selectedPiece.y === 0) || (selectedPiece.y === 7)) {
                    upgrade = true;
                    pion_a_upgrade = selectedPiece;
                }
            }
        }

        selectedPiece = null;
    }
}

function mousePressed() {
    if (upgrade && pion_a_upgrade != null) {
        let px = width / 2 - 80;
        let py = height / 2 - 30;
        for (let i = 0; i < 4; i++) {
            if (mouseX > px && mouseX < px + 160 && mouseY > py + i * 35 && mouseY < py + i * 35 + 30) {
                let choix = ["Reine", "Tour", "Fou", "Cavalier"];
                pion_a_upgrade.Type = choix[i];
                upgrade = false;
                pion_a_upgrade = null;
                break;
            }
        }
    }
}

// -----------------------Démarrer partie----------------------------//

document.getElementById("startBtn").addEventListener("click", () => {
    // Réinitialisation complète
    selectedPiece = null;
    upgrade = false;
    pion_a_upgrade = null;
    pieces = [];
    cases_occupees = Array.from({ length: plateau.length }, () =>
        Array(plateau[0].length).fill(false)
    );

    taille_case = getTailleCase(); // re-adapte taille
    resizeCanvas(taille_case * nbColonnes, taille_case * nbLignes);

    // Réinitialise les pièces et relance l'affichage
    initialiserPieces();
    redraw(); // Appelle une fois draw() 
});

