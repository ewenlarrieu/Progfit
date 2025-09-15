// Carousel infini avec duplication des cartes - RESPONSIVE
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("carousel");
  const btnGauche = document.querySelector(".btn-gauche");
  const btnDroite = document.querySelector(".btn-droite");

  // Paramètres dynamiques du carousel
  let carteWidth, gap, totalWidth;
  let currentIndex = 0;
  let isTransitioning = false;

  // Fonction pour calculer les dimensions selon la taille d'écran
  function calculerDimensions() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 320) {
      carteWidth = 120;
      gap = 6; // 0.4rem
    } else if (screenWidth <= 357) {
      carteWidth = 140;
      gap = 8; // 0.5rem
    } else if (screenWidth <= 480) {
      carteWidth = 160;
      gap = 13; // 0.8rem
    } else if (screenWidth <= 768) {
      carteWidth = 200;
      gap = 16; // 1rem
    } else if (screenWidth <= 968) {
      carteWidth = 250;
      gap = 24; // 1.5rem
    } else if (screenWidth <= 1193) {
      carteWidth = 280;
      gap = 32; // 2rem
    } else {
      carteWidth = 320;
      gap = 40; // 2.5rem
    }

    totalWidth = carteWidth + gap;
  }

  // Initialiser les dimensions
  calculerDimensions();

  // Récupérer les cartes originales
  const cartesOriginales = [...carousel.querySelectorAll(".carte")];
  const nombreCartes = cartesOriginales.length; // 6 cartes

  // Créer le carousel infini en dupliquant les cartes
  function creerCarouselInfini() {
    // Vider le carousel
    carousel.innerHTML = "";

    // Ajouter les cartes dupliquées au début (pour l'effet infini vers la gauche)
    cartesOriginales.forEach((carte) => {
      const clone = carte.cloneNode(true);
      carousel.appendChild(clone);
    });

    // Ajouter les cartes originales
    cartesOriginales.forEach((carte) => {
      const clone = carte.cloneNode(true);
      carousel.appendChild(clone);
    });

    // Ajouter les cartes dupliquées à la fin (pour l'effet infini vers la droite)
    cartesOriginales.forEach((carte) => {
      const clone = carte.cloneNode(true);
      carousel.appendChild(clone);
    });

    // Positionner le carousel au centre (sur les cartes originales)
    currentIndex = nombreCartes;
    mettreAJourPosition(false);
  }

  // Mettre à jour la position du carousel
  function mettreAJourPosition(avecTransition = true) {
    const translateX = -(currentIndex * totalWidth);

    if (avecTransition) {
      carousel.style.transition = "transform 0.5s ease";
    } else {
      carousel.style.transition = "none";
    }

    carousel.style.transform = `translateX(${translateX}px)`;

    // Mettre à jour les indicateurs
    mettreAJourIndicateurs();
  }

  // Mettre à jour les indicateurs de pagination
  function mettreAJourIndicateurs() {
    const indicators = document.querySelectorAll(".indicator");

    // Calculer l'index réel (entre 0 et 5)
    let indexReel = currentIndex - nombreCartes;
    if (indexReel < 0) indexReel = nombreCartes + indexReel;
    if (indexReel >= nombreCartes) indexReel = indexReel - nombreCartes;

    // Mettre à jour l'apparence des indicateurs
    indicators.forEach((indicator, index) => {
      if (index === indexReel) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  // Navigation vers la droite
  function allerADroite() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex++;
    mettreAJourPosition();

    // Si on arrive à la fin des cartes dupliquées, revenir au début
    if (currentIndex >= nombreCartes * 2) {
      setTimeout(() => {
        currentIndex = nombreCartes;
        mettreAJourPosition(false);
        isTransitioning = false;
      }, 500);
    } else {
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }
  }

  // Navigation vers la gauche
  function allerAGauche() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex--;
    mettreAJourPosition();

    // Si on arrive au début des cartes dupliquées, aller à la fin
    if (currentIndex < nombreCartes) {
      setTimeout(() => {
        currentIndex = nombreCartes * 2 - 1;
        mettreAJourPosition(false);
        isTransitioning = false;
      }, 500);
    } else {
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }
  }

  // Événements des boutons
  btnDroite.addEventListener("click", allerADroite);
  btnGauche.addEventListener("click", allerAGauche);

  // Support tactile
  let startX = 0;
  let isDragging = false;

  carousel.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  carousel.addEventListener("touchmove", function (e) {
    if (!isDragging) return;
    e.preventDefault();
  });

  carousel.addEventListener("touchend", function (e) {
    if (!isDragging) return;
    isDragging = false;

    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        allerADroite();
      } else {
        allerAGauche();
      }
    }
  });

  // Gestion des clics sur les indicateurs
  function ajouterEvenementsIndicateurs() {
    const indicators = document.querySelectorAll(".indicator");
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        if (isTransitioning) return;

        // Calculer l'index cible
        const indexCible = nombreCartes + index;

        if (indexCible !== currentIndex) {
          currentIndex = indexCible;
          mettreAJourPosition();
        }
      });
    });
  }

  // Gestion du redimensionnement de la fenêtre
  window.addEventListener("resize", function () {
    calculerDimensions();
    mettreAJourPosition(false);
  });

  // Initialiser le carousel
  creerCarouselInfini();
  ajouterEvenementsIndicateurs();
});
