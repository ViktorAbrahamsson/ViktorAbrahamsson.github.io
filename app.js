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

// ScrollMagic
var controller = new ScrollMagic.Controller();
let fromLeftTimeline = new TimelineMax();
let fromLeftFrom = TweenMax.from(".project", 1, {
  autoAlpha: 0,
  x: -40,
});
let fromLeftTo = TweenMax.to(".project", 1, {
  autoAlpha: 1,
  x: 0,
});
fromLeftTimeline.add(fromLeftFrom).add(fromLeftTo);
new ScrollMagic.Scene({
  triggerElement: ".projects",
})
  .setTween(fromLeftTimeline)
  .duration(400)
  .addIndicators()
  .addTo(controller);

// Event Listeners
navBurger.addEventListener("click", toggleNav);
