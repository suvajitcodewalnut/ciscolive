// LOADING THE FULL DOM
document.addEventListener("DOMContentLoaded", () => {
  const view = document.querySelector(".speakers__view");
  const dots = document.querySelectorAll(".speakers__toggle--dots .dot");
  let activeIndex = 0;
  const cards = Array.from(view.querySelectorAll(".speakers__card"));
  const n = cards.length;
  let shift = 0;
  let isAnimating = false;

  cards.forEach((card, index) => {
    card.dataset.initialOrder = index;
    card.style.order = index;
  });

  // ONLY THE FIRST THREE CARDS ARE VISIBLE IN THE VIEWPORT
  const updateVisibleCards = () => {
    cards.forEach((card) => {
      const initialOrder = parseInt(card.dataset.initialOrder, 10);
      const computedOrder = (initialOrder - shift + n) % n;
      card.style.order = computedOrder;
      card.style.display = computedOrder < 3 ? "" : "none";
      card.style.transition = "transform 0.3s ease";
      card.style.transform = "none";
      setTimeout(() => {
        card.style.transition = "";
      }, 300);
    });
  };

  const updateDots = () => {
    dots.forEach((dot, index) => {
      dot.style.transition = "all 0.3s ease";
      if (index === activeIndex) {
        dot.classList.add("active");
        dot.classList.remove("inactive");
      } else {
        dot.classList.add("inactive");
        dot.classList.remove("active");
      }
    });
  };

  // Fade out to left.
  const slideFadeOutLeft = (element, callback) => {
    element.style.transition = "transform 0.5s, opacity 0.5s";
    element.style.transform = "translateX(-100%)";
    element.style.opacity = 0;
    setTimeout(() => {
      callback();
    }, 500);
  };

  // Fade in from right.
  const fadeInFromRight = (element) => {
    element.style.transform = "translateX(100%)";
    element.style.opacity = 0;
    element.offsetHeight;

    element.style.transition = "transform 0.5s, opacity 0.5s";
    element.style.transform = "translateX(0)";
    element.style.opacity = 1;

    setTimeout(() => {
      element.style.transition = "";
    }, 510);
  };

  // Fade out to right.
  const slideFadeOutRight = (element, callback) => {
    element.style.transition = "transform 0.5s, opacity 0.5s";
    element.style.transform = "translateX(100%)";
    element.style.opacity = 0;
    setTimeout(() => {
      callback();
    }, 500);
  };

  // Fade in from left.
  const fadeInFromLeft = (element) => {
    element.style.transform = "translateX(-100%)";
    element.style.opacity = 0;
    element.style.display = "";
    element.offsetHeight;

    element.style.transition = "transform 0.5s, opacity 0.5s";
    element.style.transform = "translateX(0)";
    element.style.opacity = 1;
    setTimeout(() => {
      element.style.transition = "";
    }, 510);
  };

  // INITIAL VISIBILITY
  updateVisibleCards();

  // CLICK EVENT LISTENER : LEFT ARROW
  document
    .querySelector(".speakers__toggle--arrowleft")
    .addEventListener("click", () => {
      if (isAnimating) return;
      isAnimating = true;

      const visibleCards = cards
        .filter((card) => {
          const computedOrder =
            (parseInt(card.dataset.initialOrder, 10) - shift + n) % n;
          return computedOrder < 3;
        })
        .sort((a, b) => {
          const aOrder = (parseInt(a.dataset.initialOrder, 10) - shift + n) % n;
          const bOrder = (parseInt(b.dataset.initialOrder, 10) - shift + n) % n;
          return aOrder - bOrder;
        });

      const recycledCard = visibleCards[0];
      const card1 = visibleCards[1];
      const card2 = visibleCards[2];

      slideFadeOutLeft(recycledCard, () => {
        shift = (shift + 1) % n;
        const newOrder =
          (parseInt(recycledCard.dataset.initialOrder, 10) - shift + n) % n;
        cards.forEach((card) => {
          if (card !== recycledCard) {
            const initialOrder = parseInt(card.dataset.initialOrder, 10);
            const computedOrder = (initialOrder - shift + n) % n;
            card.style.order = computedOrder;
            card.style.display = computedOrder < 3 ? "" : "none";
          }
        });
        recycledCard.style.order = newOrder;
        fadeInFromRight(recycledCard);
      });

      setTimeout(() => {
        card1.style.transition = "transform 0.5s ease";
        card1.style.transform = "translateX(-100%)";
        setTimeout(() => {
          card1.style.transition = "";
          card1.style.transform = "";
        }, 500);
      }, 100);

      setTimeout(() => {
        card2.style.transition = "transform 0.5s ease";
        card2.style.transform = "translateX(-100%)";
        setTimeout(() => {
          card2.style.transition = "";
          card2.style.transform = "";
        }, 500);
      }, 200);

      activeIndex = (activeIndex + 1) % dots.length;
      updateDots();
      setTimeout(() => {
        isAnimating = false;
      }, 1250);
    });

  // CLICK EVENT LISTENER : RIGHT ARROW
  document
    .querySelector(".speakers__toggle--arrowright")
    .addEventListener("click", () => {
      if (isAnimating) return;
      isAnimating = true;
      const visibleCards = cards
        .filter((card) => {
          const computedOrder =
            (parseInt(card.dataset.initialOrder, 10) - shift + n) % n;
          return computedOrder < 3;
        })
        .sort((a, b) => {
          const aOrder = (parseInt(a.dataset.initialOrder, 10) - shift + n) % n;
          const bOrder = (parseInt(b.dataset.initialOrder, 10) - shift + n) % n;
          return aOrder - bOrder;
        });

      const recycledCard = visibleCards[2];
      const card0 = visibleCards[0];
      const card1 = visibleCards[1];

      slideFadeOutRight(recycledCard, () => {
        shift = (shift - 1 + n) % n;

        const newOrder =
          (parseInt(recycledCard.dataset.initialOrder, 10) - shift + n) % n;
        cards.forEach((card) => {
          if (card !== recycledCard) {
            const initialOrder = parseInt(card.dataset.initialOrder, 10);
            const computedOrder = (initialOrder - shift + n) % n;
            card.style.order = computedOrder;
            card.style.display = computedOrder < 3 ? "" : "none";
          }
        });
        recycledCard.style.order = newOrder;
        fadeInFromLeft(recycledCard);
      });

      setTimeout(() => {
        card0.style.transition = "transform 0.5s ease";
        card0.style.transform = "translateX(100%)";
        setTimeout(() => {
          card0.style.transition = "";
          card0.style.transform = "";
        }, 500);
      }, 100);

      setTimeout(() => {
        card1.style.transition = "transform 0.5s ease";
        card1.style.transform = "translateX(100%)";
        setTimeout(() => {
          card1.style.transition = "";
          card1.style.transform = "";
        }, 500);
      }, 200);

      activeIndex = (activeIndex - 1 + dots.length) % dots.length;
      updateDots();

      setTimeout(() => {
        isAnimating = false;
      }, 1250);
    });
});
