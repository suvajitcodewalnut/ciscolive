// CAROUSEL
document.addEventListener("DOMContentLoaded", () => {
  const view = document.querySelector(".speakers__view");
  const dots = document.querySelectorAll(".speakers__toggle--dots .dot");
  let activeIndex = 0;
  const cards = Array.from(view.querySelectorAll(".speakers__card"));
  const n = cards.length;
  let shift = 0;
  let isAnimating = false;

  // REMOVING ANY NATIVE ANIAMTIONS
  cards.forEach((card, index) => {
    card.dataset.initialOrder = index;
    card.style.order = index;
    card.style.animation = "none";
  });

  // VISIBLE ZONE OF THE CAROUSEL 
  const updateVisibleCards = () => {
    cards.forEach((card) => {
      const initialOrder = parseInt(card.dataset.initialOrder, 10);
      const computedOrder = (initialOrder - shift + n) % n;
      card.style.order = computedOrder;
      card.style.display = computedOrder < 3 ? "" : "none";
      card.style.transition = "none";
      card.style.transform = "none";
    });
  };

  // DOTS UPDATE
  const updateDots = () => {
    dots.forEach((dot, index) => {
      dot.style.transition =
        "opacity 0.3s ease-in-out, transform 0.3s ease-in-out";
      if (index === activeIndex) {
        dot.classList.add("active");
        dot.classList.remove("inactive");
        dot.style.opacity = "1";
        dot.style.transform = "scale(1.2)";
      } else {
        dot.classList.add("inactive");
        dot.classList.remove("active");
        dot.style.opacity = "0.5";
        dot.style.transform = "scale(1)";
      }
    });
  };

  // CAROUSEL VIEW
  updateVisibleCards();

  // SPRING ANIMATION FUNCTION
  function springAnimate(
    element,
    fromX,
    toX,
    fromOpacity,
    toOpacity,
    callback
  ) {
    let currentX = fromX;
    let currentOpacity = fromOpacity;
    let velocityX = 0,
      velocityOpacity = 0;
    const stiffness = 0.1,
      damping = 0.8;
    function animate() {
      const deltaX = toX - currentX;
      const deltaOpacity = toOpacity - currentOpacity;
      const accelX = stiffness * deltaX - damping * velocityX;
      const accelOpacity = stiffness * deltaOpacity - damping * velocityOpacity;
      velocityX += accelX;
      velocityOpacity += accelOpacity;
      currentX += velocityX;
      currentOpacity += velocityOpacity;
      element.style.transform = `translateX(${currentX}%)`;
      element.style.opacity = currentOpacity;
      if (Math.abs(deltaX) > 0.5 || Math.abs(deltaOpacity) > 0.05) {
        requestAnimationFrame(animate);
      } else {
        element.style.transform = `translateX(${toX}%)`;
        element.style.opacity = toOpacity;
        if (callback) callback();
      }
    }
    requestAnimationFrame(animate);
  }

  // HELPER FUNCTION
  const slideFadeOutLeft = (element, callback) => {
    springAnimate(element, 0, -100, 1, 0, callback);
  };

  const fadeInFromRight = (element, callback) => {
    element.style.transform = "translateX(100%)";
    element.style.opacity = 0;
    springAnimate(element, 100, 0, 0, 1, callback);
  };

  const slideFadeOutRight = (element, callback) => {
    springAnimate(element, 0, 100, 1, 0, callback);
  };

  const fadeInFromLeft = (element, callback) => {
    element.style.transform = "translateX(-100%)";
    element.style.opacity = 0;
    springAnimate(element, -100, 0, 0, 1, callback);
  };

  function getCardByComputedOrder(orderValue) {
    return cards.find((card) => {
      const initialOrder = parseInt(card.dataset.initialOrder, 10);
      return (initialOrder - shift + n) % n === orderValue;
    });
  }

  // RIGHT ARROW CLICK HANDLER
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
      const cardOut = visibleCards[0];
      const card1 = visibleCards[1];
      const card2 = visibleCards[2];

      slideFadeOutLeft(cardOut, () => {
        shift = (shift + 1) % n;
        updateVisibleCards();
        updateDots();
        const cardIn = getCardByComputedOrder(2);
        fadeInFromRight(cardIn, () => {
          activeIndex = (activeIndex + 1) % dots.length;
          isAnimating = false;
        });
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
    });

  // LEFT ARROW CLICK HANDLER
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
      const cardOut = visibleCards[2];
      const card0 = visibleCards[0];
      const card1 = visibleCards[1];

      slideFadeOutRight(cardOut, () => {
        shift = (shift - 1 + n) % n;
        updateVisibleCards();
        updateDots();
        const cardIn = getCardByComputedOrder(0);
        fadeInFromLeft(cardIn, () => {
          activeIndex = (activeIndex - 1 + dots.length) % dots.length;
          isAnimating = false;
        });
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
    });
});