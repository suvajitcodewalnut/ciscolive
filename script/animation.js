const scroll = new LocomotiveScroll({
  el: document.querySelector("[scroll-container]"),
  smooth: true,
});

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".animate-element");

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -20% 0px",
    threshold: 0.3,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("animate-element");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach((element) => observer.observe(element));
});
