const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navMenu");
const navBlocker = document.querySelector(".navBlocker");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    navBlocker.classList.toggle("active");
})

document.querySelectorAll(".navLink").forEach(n => n.
    addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active")
        navBlocker.classList.remove("active");
    }))

document.querySelectorAll(".navHeaderLogo").forEach(n => n.
    addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active")
        navBlocker.classList.remove("active");
    }))

document.querySelectorAll(".navBlocker").forEach(n => n.
    addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active")
        navBlocker.classList.remove("active");
    }))