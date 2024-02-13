import { livres } from "./livres.js";

export class Panier {
  constructor() {
    this.localStorageKey = "panier";
    this.init();
  }

  init() {
    const buttonsAjouter = document.querySelectorAll(
      "[data-js-ajouter-panier]"
    );
    buttonsAjouter.forEach(
      function (button) {
        button.addEventListener("click", this.ajouterAuPanier.bind(this));
      }.bind(this)
    );
  }

  ajouterAuPanier(event) {
    const button = event.target;
    const livreElement = button.closest(".livre");
    const titre = livreElement.querySelector("h2").textContent;

    const livre = {
      titre: titre,
      prix: null,
    };

    let panier = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];

    // Vérifier si le livre n'est pas déjà dans le panier
    let livreExiste = false;
    for (let i = 0; i < panier.length; i++) {
        if (panier[i].titre === titre) {
            livreExiste = true;
            break;
        }
    }
    
    if (!livreExiste) {
      // Trouver le livre dans le tableau livres en fonction du titre
      livres.forEach(
        function (l) {
          if (l.titre === titre) {
            livre.prix = l.prix;
            panier.push(livre);
            localStorage.setItem(this.localStorageKey, JSON.stringify(panier));
            console.log("Livre ajouté au panier !");
          }
        }.bind(this)
      );
    } else {
      console.log("Ce livre est déjà dans votre panier.");
    }
  }
}
