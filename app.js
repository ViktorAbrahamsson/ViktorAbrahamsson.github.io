const navBurger = document.querySelector(".burger");
const landingSection = document.querySelector(".landing-section");
const projectSection = document.querySelector(".projects-section");

const toggleNav = (e) => {
  if (!e.target.classList.contains("active")) {
    // Open Nav
    e.target.classList.add("active");
    // Hide rest of body
    document.body.classList.add("hide");
    // GSAP Animations
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
    gsap.to("#logo", 1, { color: "black" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(1500px at 100% -10%)" });
    projectSection.style.pointerEvents = "none";
  } else {
    e.target.classList.remove("active");
    document.body.classList.remove("hide");
    // GSAP Animations
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to("#logo", 1, { color: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    projectSection.style.pointerEvents = "all";
  }
};

// Event Listeners
navBurger.addEventListener("click", toggleNav);
