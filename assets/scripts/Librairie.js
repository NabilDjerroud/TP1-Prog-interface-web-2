import { livres } from "./livres.js";
import { Tuile } from "./Tuile.js";

export class Librairie {
  constructor() {
    this.grilleLivres = document.querySelector("[data-js-livres]");
    this.filtres = document.querySelector("[data-js-filtres]");
    this.modal = document.querySelector("[data-js-modal]");
    this.modalContent = document.querySelector("[data-js-modal-content]");
    this.btnCloseModal = document.querySelector("[data-js-close-modal]");
    this.init();
  }

  init() {
    this.afficherLivres(12);
    this.ecouterFiltres();
    this.ecouterFermetureModal();
    this.ecouterPanier();
  }

  genererLivreHTML(livre, index) {
    return `
      <div class="livre" data-js-tuile="${index}">
        <img src="${livre.image}" alt="${livre.titre}">
        <h2>${livre.titre}</h2>
        <p><strong>Auteur:</strong> ${livre.auteur}</p>
        <p><strong>Prix:</strong> ${livre.prix}$</p>
        <p><strong>Catégorie:</strong> ${livre.categorie}</p>
        <button data-js-ajouter-panier >Ajouter</button>
      </div>`;
  }

  afficherLivres(limite = livres.length, livresAFiltrer = livres) {
    this.viderGrilleLivres();

    for (let i = 0; i < limite; i++) {
      const livreHTML = this.genererLivreHTML(livresAFiltrer[i], i);
      this.grilleLivres.insertAdjacentHTML("beforeend", livreHTML);
      new Tuile(
        this.grilleLivres.lastElementChild,
        this.modal,
        this.modalContent
      );
    }
  }

  viderGrilleLivres() {
    this.grilleLivres.innerHTML = "";
  }

  ecouterFiltres() {
    this.filtres.addEventListener(
      "click",
      function (e) {
        if (e.target.dataset.jsFiltre) {
          const categorie = e.target.dataset.jsFiltre;

          const filtres = this.filtres.querySelectorAll("li");
          filtres.forEach(function (filtre) {
            filtre.classList.remove("selected");
          });

          e.target.classList.add("selected");
          this.filtrerLivresParCategorie(categorie);
        }
      }.bind(this)
    );
  }

  filtrerLivresParCategorie(categorie) {
    const livresFiltres = livres.filter(function (livre) {
      if (categorie === "Tous") {
        return true;
      } else if (categorie === "Nouveautés") {
        return livre.nouveaute === true;
      } else {
        return livre.categorie === categorie;
      }
    });

    this.viderGrilleLivres();
    this.afficherLivres(livresFiltres.length, livresFiltres);
  }

  ecouterFermetureModal() {
    // j'ai ajouté un bouton X pour que lorsqu'on clique sur X le modal se ferme
    /*
      this.btnCloseModal.addEventListener("click", function () {
            this.modal.style.display = "none";
            this.retablirScrollY(); 
        }.bind(this));*/

    this.modal.addEventListener(
      "click",
      function () {
        this.modal.style.display = "none";
        this.retablirScrollY();
      }.bind(this)
    );
  }

  ouvrirModal() {
    this.modal.style.display = "block";
    this.desactiverScrollY();
  }

  desactiverScrollY() {
    document.body.classList.add("disable-scroll-y");
  }

  retablirScrollY() {
    document.body.classList.remove("disable-scroll-y");
  }

  afficherContenuPanier() {
    //je recupére les valeurs depuis le localStorage qui a le nom 'panier'
    const panier = JSON.parse(localStorage.getItem("panier"));

    if (panier && panier.length > 0) {
      let tableContent = "<table >";
      tableContent += "<thead><tr align=left><th>Livre";
      if (panier.length > 1) {
        tableContent += "s";
      }
      tableContent += "</th><th align=right>Prix</th></tr></thead>";
      tableContent += "<tbody padding = 10px>";

      let prixTotal = 0;

      panier.forEach(function (livres) {
        tableContent += `<tr><td>${livres.titre}</td><td ><strong>${livres.prix}$</strong></td></tr><br>`;
        prixTotal += parseFloat(livres.prix);
      });

      this.modalContent.innerHTML =
        tableContent +
        `<tr><td>Total</td><td><strong>${prixTotal}$</strong></td></tr>`;
      tableContent += "</tbody>";
      tableContent += "</table>";
    } else {
      this.modalContent.innerHTML =
        "<p>Il n'y a aucun livre dans votre panier.</p>";
    }

    this.modal.style.display = "block";
  }

  ecouterPanier() {
    const panierIcon = document.querySelector("[data-js-panier-icon]");
    panierIcon.addEventListener(
      "click",
      function () {
        this.afficherContenuPanier();
      }.bind(this)
    );
  }
}
