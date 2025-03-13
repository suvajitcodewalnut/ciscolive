// CAROUSEL LOGIC 
const emblaNode = document.querySelector(".speakers__right");
const options = { loop: true, align: "start" };
const emblaApi = EmblaCarousel(emblaNode, options);

const nextButton = document.querySelector(".speakers__toggle--arrowright");
const prevButton = document.querySelector(".speakers__toggle--arrowleft");

nextButton.addEventListener("click", () => {
  emblaApi.scrollNext();
});

prevButton.addEventListener("click", () => {
  emblaApi.scrollPrev();
});

const addDotBtnsAndClickHandlers = (emblaApi, dotsNode) => {
  let dotNodes = [];

  const addDotBtnsWithClickHandlers = () => {
    dotsNode.innerHTML = emblaApi
      .scrollSnapList()
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
