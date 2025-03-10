document.addEventListener("DOMContentLoaded", () => {
  const view = document.querySelector(".speakers__view");
  const dots = document.querySelectorAll(".speakers__toggle--dots .dot");
  let activeIndex = 0;

  // Update dots with a smooth transition.
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

  // Ripple effect of the cards
  const applyRippleEffect = (excludedCard, direction) => {
    const cards = Array.from(view.querySelectorAll(".speakers__card")).filter(
      (card) => card !== excludedCard
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
          card.style.transfrom = "translateX(0px)"
        }
        setTimeout(() => {
          card.style.transform = "translateX(0)";
        }, 300);
      }, delay);
    });
  };

  // Animate card sliding left and fading out.
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

  // Animate card sliding right and fading out.
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

  // Animate fade in from the right.
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

  // Animate fade in from the left.
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

  // Right arrow click: move the first card to the end.
  document
    .querySelector(".speakers__toggle--arrowright")
    .addEventListener("click", () => {
      const firstCard = view.querySelector(".speakers__card");
      slideFadeOutLeft(firstCard, () => {
        view.appendChild(firstCard);
        fadeInFromRight(firstCard);

        applyRippleEffect(firstCard, "left");
      });
      activeIndex = (activeIndex + 1) % dots.length;
      updateDots();
    });

  // Left arrow click: move the last card to the beginning.
  document
    .querySelector(".speakers__toggle--arrowleft")
    .addEventListener("click", () => {
      const cards = view.querySelectorAll(".speakers__card");
      const lastCard = cards[cards.length - 1];
      slideFadeOutRight(lastCard, () => {
        view.insertBefore(lastCard, view.firstChild);
        fadeInFromLeft(lastCard); 

        applyRippleEffect(lastCard, "right");
      });
      activeIndex = (activeIndex - 1 + dots.length) % dots.length;
      updateDots();
    });
});
