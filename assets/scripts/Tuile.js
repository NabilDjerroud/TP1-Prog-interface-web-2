import { livres } from "./livres.js";

export class Tuile {
  constructor(el, modal, modalContent) {
    this.el = el;
    this.modal = modal;
    this.modalContent = modalContent;
    this.index = this.el.dataset.jsTuile;
    this.infos = livres[this.index];

    this.el.addEventListener("click", this.afficherModal.bind(this));
  }

  afficherModal() {
    // contenu du modal contenat les infos du livre à ajouter dans le modal
    const modalContent = `
            <img src="${this.infos.image}" alt="${this.infos.titre}">
            <h2>${this.infos.titre}</h2>
            <p><strong>Auteur:</strong> ${this.infos.auteur}</p>
            <p><strong>Editeur:</strong> ${this.infos.editeur}</p>
            <p><strong>Nombre de pages:</strong> ${this.infos.pages}</p>
            <p><strong>Description:</strong> ${this.infos.description}</p>
            <button data-js-ajouter-panier >Ajouter</button>
        `;

    // Afficher le modal
    this.modalContent.innerHTML = modalContent;
    this.modal.style.display = "block";
  }
}
