// CAROUSEL
document.addEventListener("DOMContentLoaded", () => {
  const view = document.querySelector(".speakers__view");
  let dots = Array.from(
    document.querySelectorAll(".speakers__toggle--dots .dot")
  );
  let cards = Array.from(view.querySelectorAll(".speakers__card"));

  // ENSURE THE NUMBER OF DOTS MATCHES THE NUMBER OF CARDS
  if (dots.length < cards.length) {
    const dotsContainer = document.querySelector(".speakers__toggle--dots");
    for (let i = dots.length; i < cards.length; i++) {
      const dot = document.createElement("div");
      dot.className = "dot inactive";
      dotsContainer.appendChild(dot);
    }
    dots = Array.from(
      document.querySelectorAll(".speakers__toggle--dots .dot")
    );
  } else if (dots.length > cards.length) {
    const dotsContainer = document.querySelector(".speakers__toggle--dots");
    dots.slice(cards.length).forEach((dot) => {
      dotsContainer.removeChild(dot);
    });
    dots = Array.from(
      document.querySelectorAll(".speakers__toggle--dots .dot")
    );
  }

  const n = cards.length;
  let shift = 0;
  let isAnimating = false;

  // REMOVING ANY NATIVE ANIMATIONS
  cards.forEach((card, index) => {
    card.dataset.initialOrder = index;
    card.style.order = index;
    card.style.animation = "none";
  });

  // VISIBLE ZONE OF THE CAROUSEL (UPDATED)
  const updateVisibleCards = () => {
    cards.forEach((card) => {
      const initialOrder = parseInt(card.dataset.initialOrder, 10);
      const computedOrder = (initialOrder - shift + n) % n;
      card.style.order = computedOrder;
      card.style.display = computedOrder < 3 ? "" : "none"; 
      // card.style.visibility = computedOrder < 3 ? "visible" : "hidden";
      card.style.transition = "none";
      card.style.transform = "none";
    });
    const allCards = Array.from(view.querySelectorAll(".speakers__card"));
    allCards.forEach((card) => {
      if (!cards.includes(card)) {
        card.style.visibility = "hidden";
      }
    });
  };

  // UPDATE THE DOTS
  const updateDots = () => {
    const activeDotIndex = cards.findIndex((card) => {
      const initialOrder = parseInt(card.dataset.initialOrder, 10);
      return (initialOrder - shift + n) % n === 0;
    });
    dots.forEach((dot, index) => {
      if (index === activeDotIndex) {
        dot.classList.add("active");
        dot.classList.remove("inactive");
      } else {
        dot.classList.add("inactive");
        dot.classList.remove("active");
      }
    });
  };

  // CAROUSEL VIEW
  updateVisibleCards();
  updateDots();

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

  // HELPER FUNCTIONS FOR ANIMATIONS
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

  // EXTRACTED RIGHT TRANSITION
  function doRightTransition(callback) {
    isAnimating = true;
    arrowButtonRight.style.border = "1px solid #00A5E2";
    setTimeout(() => {
      arrowButtonRight.style.border = "";
    }, 100);

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
        isAnimating = false;
        if (callback) callback();
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
  }

  // EXTRACTED LEFT TRANSITION
  function doLeftTransition(callback) {
    isAnimating = true;
    arrowButtonLeft.style.border = "1px solid #00A5E2";
    setTimeout(() => {
      arrowButtonLeft.style.border = "";
    }, 100);

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
        isAnimating = false;
        if (callback) callback();
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
  }

  // ARROW BUTTON EVENT LISTENERS (now use the extracted functions)
  const arrowButtonRight = document.querySelector(
    ".speakers__toggle--arrowright"
  );
  arrowButtonRight.addEventListener("click", () => {
    if (isAnimating) return;
    doRightTransition();
  });

  const arrowButtonLeft = document.querySelector(
    ".speakers__toggle--arrowleft"
  );
  arrowButtonLeft.addEventListener("click", () => {
    if (isAnimating) return;
    doLeftTransition();
  });

  // RECURSIVELY ANIMATE TOWARDS THE TARGET DOT
  function animateToTarget(target) {
    if (shift === target) return;
    let forwardDistance = (target - shift + n) % n;
    let backwardDistance = (shift - target + n) % n;
    if (forwardDistance <= backwardDistance) {
      doRightTransition(() => {
        if (shift !== target) animateToTarget(target);
      });
    } else {
      doLeftTransition(() => {
        if (shift !== target) animateToTarget(target);
      });
    }
  }

  // DOTS CLICK HANDLER WITH ANIMATIONS
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      if (isAnimating) return;
      if (index === shift) return; // already active
      animateToTarget(index);
    });
  });
});
