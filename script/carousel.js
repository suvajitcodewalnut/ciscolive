// CAROUSEL LOGIC
const emblaNode = document.querySelector(".speakers__right");
const options = { loop: false, align: "start", inViewThreshold: 0.2 };
const emblaApi = EmblaCarousel(emblaNode, options);

const nextButton = document.querySelector(".speakers__toggle--arrowright");
const prevButton = document.querySelector(".speakers__toggle--arrowleft");

const addDotBtnsAndClickHandlers = (emblaApi, dotsNode) => {
  let dotNodes = [];

  const addDotBtnsWithClickHandlers = () => {
    dotsNode.innerHTML = Array.from({
      length: emblaApi.slideNodes().length - 2,
    })
      .fill(9)
      .map(() => '<div role="button" class="dot" type="button"></div>')
      .join("");

    const scrollTo = (index) => {
      emblaApi.scrollTo(index);
    };

    dotNodes = Array.from(dotsNode.querySelectorAll(".dot"));
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener("click", () => scrollTo(index), false);
    });
  };

  const toggleDotBtnsActive = () => {
    const previous = emblaApi.previousScrollSnap();
    const selected = emblaApi.selectedScrollSnap();
    dotNodes[previous].classList.remove("active");
    dotNodes[selected].classList.add("active");
  };

  emblaApi
    .on("init", addDotBtnsWithClickHandlers)
    .on("reInit", addDotBtnsWithClickHandlers)
    .on("init", toggleDotBtnsActive)
    .on("reInit", toggleDotBtnsActive)
    .on("select", toggleDotBtnsActive);

  return () => {
    dotsNode.innerHTML = "";
  };
};

addDotBtnsAndClickHandlers(
  emblaApi,
  document.querySelector(".speakers__toggle--dots")
);

nextButton.addEventListener("click", () => {
  if (window.innerWidth <= 544) {
    emblaApi.scrollNext();
    return;
  }
  const slidesInView = emblaApi.slidesInView();
  const allSlideNodes = emblaApi.slideNodes();

  const firstSlideIndex = slidesInView.at(0);
  const lastSlideIndex = slidesInView.at(-1);

  const currentFirstSlide = allSlideNodes[firstSlideIndex];
  const nextSlides = allSlideNodes.slice(
    firstSlideIndex + 1,
    lastSlideIndex + 2
  );

  if (lastSlideIndex === allSlideNodes.length - 1) {
    // emblaApi.scrollTo(0);
    return;
  }

  const allSlides = [currentFirstSlide, ...nextSlides];

  currentFirstSlide.setAttribute("data-animating", "true");
  currentFirstSlide.style.opacity = "0";
  currentFirstSlide.style.transform = "translateX(calc(-100% - 24px))";

  currentFirstSlide.addEventListener(
    "transitionend",
    () => {
      nextSlides.forEach((slide, index) => {
        slide.setAttribute("data-animating", "true");
        slide.style.transform = "translateX(calc(-100% - 24px))";
        slide.style.transitionDelay = `${index * 0.2}s`;
      });
    },
    { once: true }
  );

  const lastVisibleElem = nextSlides.at(-1);

  lastVisibleElem.addEventListener(
    "transitionend",
    () => {
      allSlides.forEach((slide) => {
        slide.setAttribute("data-animating", "false");
        slide.style = "null";
      });
      emblaApi.scrollNext(true);
    },
    { once: true }
  );
});

prevButton.addEventListener("click", () => {
  if (window.innerWidth <= 544) {
    emblaApi.scrollPrev();
    return;
  }
  const slidesInView = emblaApi.slidesInView();
  const allSlideNodes = emblaApi.slideNodes();

  const firstSlideIndex = slidesInView.at(0);
  const lastSlideIndex = slidesInView.at(-1);

  const currentLastSlide = allSlideNodes[lastSlideIndex];
  const prevSlides = allSlideNodes
    .slice(firstSlideIndex - 1, lastSlideIndex)
    .reverse();

  if (firstSlideIndex === 0) {
    // emblaApi.scrollTo(emblaApi.slideNodes().length - 1);
    return;
  }

  const allSlides = [currentLastSlide, ...prevSlides];

  currentLastSlide.setAttribute("data-animating", "true");
  currentLastSlide.style.opacity = "0";
  currentLastSlide.style.transform = "translateX(calc(100% + 24px))";

  currentLastSlide.addEventListener(
    "transitionend",
    () => {
      prevSlides.forEach((slide, index) => {
        slide.setAttribute("data-animating", "true");
        slide.style.transform = "translateX(calc(100% + 24px))";
        slide.style.transitionDelay = `${index * 0.2}s`;
      });
    },
    { once: true }
  );

  const firstVisibleElem = prevSlides.at(-1);
  console.log(firstVisibleElem);

  firstVisibleElem.addEventListener(
    "transitionend",
    () => {
      allSlides.forEach((slide) => {
        slide.setAttribute("data-animating", "false");
        slide.style = "null";
        // slide.style.opacity = "1";
        // slide.style.transform = "translateX(0)";
      });
      emblaApi.scrollPrev(true);
    },
    { once: true }
  );
});

function appendExtraCard() {
  const parent = document.querySelector(".speakers__view");

  if (window.innerWidth >= 544 && window.innerWidth <= 1024) {
    const extraCard = document.getElementById("extraCard");

    if (!extraCard) {
      parent.innerHTML =
        parent.innerHTML +
        `<div id="extraCard" class="speakers__card extra__card">
              <div class="speakers__card--image">
                <img src="./assets/speaker_three.png" alt="" class="speakers__image ">
              </div>
              <div class="speakers__card--wrapper">
                <div class="speakers__card--description">
                  <h3>Chuck Robbins</h3>
                  <hr class="horizontalrule">
                  <p>Chair and Chief Executive Officer of Cisco Systems</p>
                </div>
              </div>
            </div>`;
    }
  } else {
    const extraCard = document.getElementById("extraCard");
    extraCard.remove();
  }
}

appendExtraCard();

window.addEventListener("resize", () => {
  appendExtraCard();
  emblaApi.scrollTo(0);
});
