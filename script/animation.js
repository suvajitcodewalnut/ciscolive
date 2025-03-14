// ANIMATE ON SCROLL
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".animation-onscroll-paused");

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -20% 0px",
    threshold: 0.3,
  };

  // const observer = new IntersectionObserver((entries, observer) => {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       entry.target.classList.remove("animation-onscroll-paused");
  //       observer.unobserve(entry.target);
  //     }
  //   });
  // }, observerOptions);

  // elements.forEach((element) => observer.observe(element));

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (window.innerWidth <= 400) {
          entry.target.classList.remove("animation-onscroll-paused");
        } else {
          entry.target.classList.remove("animation-onscroll-paused");
          observer.unobserve(entry.target);
        }
      }
    }, observerOptions);
  });
  elements.forEach((element) => observer.observe(element));
});
