const scroll = new LocomotiveScroll({
  el: document.querySelector("[scroll-container]"),
  smooth: true,
});

const intersection = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    // If the element is showing
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((element) => intersection.observe(element));
