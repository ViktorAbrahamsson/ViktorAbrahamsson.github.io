const navBurger = document.querySelector(".burger");
const navLink1 = document.querySelector(".link1");
const navLink2 = document.querySelector(".link2");
const navLink3 = document.querySelector(".link3");

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
    gsap.to(".nav-header", 0, { background: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2300px at 100% -10%)" });
    projectSection.style.pointerEvents = "none";
  } else {
    e.target.classList.remove("active");
    document.body.classList.remove("hide");
    // GSAP Animations
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to("#logo", 1, { color: "white" });

    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    gsap.to(".nav-header", 0.4, { background: "#04040e" });
    projectSection.style.pointerEvents = "all";
  }
};

const toggleWithLink = () => {
  navBurger.classList.remove("active");
  document.body.classList.remove("hide");
  // GSAP Animations
  gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
  gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
  gsap.to("#logo", 1, { color: "white" });
  gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
  gsap.to(".nav-header", 0.4, { background: "#04040e" });
  projectSection.style.pointerEvents = "all";
};

// ScrollMagic
var controller = new ScrollMagic.Controller();

// Scene 1 - Project 1
let tween1 = new TimelineMax();
let project1Start = TweenMax.from("#project1", 1, {
  autoAlpha: 0,
  x: -40,
});
let project1End = TweenMax.to("#project1", 1, {
  autoAlpha: 1,
  x: 0,
});
tween1.add(project1Start).add(project1End);
new ScrollMagic.Scene({
  triggerElement: "#project1",
})
  .setTween(tween1)
  .duration(400)
  // .addIndicators()
  .addTo(controller);

// Scene 2 - Project 2
let tween2 = new TimelineMax();
let tweenProject2Start = TweenMax.from("#project2", 1, {
  autoAlpha: 0,
  x: -40,
});
let tweenProject2End = TweenMax.to("#project2", 1, {
  autoAlpha: 1,
  x: 0,
});
tween2.add(tweenProject2Start).add(tweenProject2End);
new ScrollMagic.Scene({
  triggerElement: "#project2",
})
  .setTween(tween2)
  .duration(400)
  // .addIndicators()
  .addTo(controller);

// Scene 3 - Project 3
let tween3 = new TimelineMax();
let tweenProject3Start = TweenMax.from("#project3", 1, {
  autoAlpha: 0,
  x: -40,
});
let tweenProject3End = TweenMax.to("#project3", 1, {
  autoAlpha: 1,
  x: 0,
});
tween3.add(tweenProject3Start).add(tweenProject3End);
new ScrollMagic.Scene({
  triggerElement: "#project3",
})
  .setTween(tween3)
  .duration(400)
  // .addIndicators()
  .addTo(controller);

// Scene 4 - About
let tween4 = new TimelineMax();
let tweenAboutStart = TweenMax.from(".about", 1, {
  autoAlpha: 0,
  x: -40,
});
let tweenAboutEnd = TweenMax.to(".about", 1, {
  autoAlpha: 1,
  x: 0,
});
tween3.add(tweenAboutStart).add(tweenAboutEnd);
new ScrollMagic.Scene({
  triggerElement: ".about",
})
  .setTween(tween4)
  .duration(400)
  // .addIndicators()
  .addTo(controller);

// Event Listeners
navBurger.addEventListener("click", toggleNav);
navLink1.addEventListener("click", toggleWithLink);
navLink2.addEventListener("click", toggleWithLink);
navLink3.addEventListener("click", toggleWithLink);

// Hide/reveal menu - https://codepen.io/Mhmdhasan/pen/mAdaQE
$(document).ready(function () {
  "use strict";

  var c,
    currentScrollTop = 0,
    navbar = $(".nav-header");

  $(window).scroll(function () {
    var a = $(window).scrollTop();
    var b = navbar.height();

    currentScrollTop = a;

    if (c < currentScrollTop && a > b + b) {
      navbar.addClass("scrollUp");
    } else if (c > currentScrollTop && !(a <= b)) {
      navbar.removeClass("scrollUp");
    }
    c = currentScrollTop;
  });
});
