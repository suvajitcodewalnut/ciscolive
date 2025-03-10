// LOADING THE FULL DOM
document.addEventListener("DOMContentLoaded", () => {
  const view = document.querySelector(".speakers__view");
  const dots = document.querySelectorAll(".speakers__toggle--dots .dot");
  let activeIndex = 0;

  // ONLY THE FIRST THREE CARDS ARE VISIBLE IN THE VIEWPORT
  const updateVisibleCards = () => {
    const cards = Array.from(view.querySelectorAll(".speakers__card"));
    cards.forEach((card, index) => {
      card.style.display = index < 3 ? "" : "none";
    });
  };

  // UPDATING THE DOTS WITH THE ACTIVE CARD TRANSITION
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

  // STACKING EFFECT OF THE CARDS
  const applyRippleEffect = (excludedCard, direction) => {
    const cards = Array.from(view.querySelectorAll(".speakers__card")).filter(
      (card) => card !== excludedCard && card.style.display !== "none"
    );
    cards.forEach((card, i) => {
      const delay = i * 100;
      setTimeout(() => {
        card.style.transition = "transform 0.3s ease";
        if (direction === "left") {
          // card.style.transform = "translateX(-10px)";
          card.style.transform = "translateX(0px)";
        } else {
          // card.style.transform = "translateX(10px)";
          card.style.transfrom = "translateX(0px)";
        }
        setTimeout(() => {
          card.style.transform = "translateX(0)";
        }, 300);
      }, delay);
    });
  };

  // ANIMATION LEFT OR RIGHT FADE-OUT EFFECT
  const slideFadeOutLeft = (element, callback) => {
    element.style.transition = "transform 0.5s, opacity 0.5s";
    element.style.transform = "translateX(-100%)";
    element.style.opacity = 0;
    setTimeout(() => {
      callback();
      element.style.transition = "";
      element.style.transform = "";
      element.style.opacity = 1;
    }, 500);
  };
  const slideFadeOutRight = (element, callback) => {
    element.style.transition = "transform 0.5s, opacity 0.5s";
    element.style.transform = "translateX(100%)";
    element.style.opacity = 0;
    setTimeout(() => {
      callback();
      element.style.transition = "";
      element.style.transform = "";
      element.style.opacity = 1;
    }, 500);
  };

  // ANIMATION LEFT OR RIGHT FADE-IN EFFECT
  const fadeInFromRight = (element) => {
    element.style.transform = "translateX(100%)";
    element.style.opacity = 0;
    element.style.transition = "transform 0.5s, opacity 0.5s";
    setTimeout(() => {
      element.style.transform = "translateX(0)";
      element.style.opacity = 1;
    }, 10);
    setTimeout(() => {
      element.style.transition = "";
    }, 510);
  };
  const fadeInFromLeft = (element) => {
    element.style.transform = "translateX(-100%)";
    element.style.opacity = 0;
    element.style.transition = "transform 0.5s, opacity 0.5s";
    setTimeout(() => {
      element.style.transform = "translateX(0)";
      element.style.opacity = 1;
    }, 10);
    setTimeout(() => {
      element.style.transition = "";
    }, 510);
  };

  // VISIBLE CARDS CONTAINER
  updateVisibleCards();

  // CLICK EVENT LISTENER : RIGHT ARROW
  document
    .querySelector(".speakers__toggle--arrowright")
    .addEventListener("click", () => {
      const firstCard = view.querySelector(".speakers__card");
      slideFadeOutLeft(firstCard, () => {
        view.appendChild(firstCard);
        fadeInFromRight(firstCard);
        applyRippleEffect(firstCard, "left");
        updateVisibleCards();
      });
      activeIndex = (activeIndex + 1) % dots.length;
      updateDots();
    });

  // CLICK EVENT LISTENER : LEFT ARROW
  document
    .querySelector(".speakers__toggle--arrowleft")
    .addEventListener("click", () => {
      const cards = view.querySelectorAll(".speakers__card");
      const lastCard = cards[cards.length - 1];
      slideFadeOutRight(lastCard, () => {
        view.insertBefore(lastCard, view.firstChild);
        fadeInFromLeft(lastCard);
        applyRippleEffect(lastCard, "right");
        updateVisibleCards();
      });
      activeIndex = (activeIndex - 1 + dots.length) % dots.length;
      updateDots();
    });
});
