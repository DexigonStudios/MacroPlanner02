const searchDiv = document.querySelector(".recipesHeaderSearchDivSearch");
const searchDivTop = document.querySelector(".recipesHeaderSearchDivTop");
const searchTitle = document.querySelector(".recipesHeaderSearchTitle");
const searchButton = document.querySelector(".recipeHeaderSearchButton");

searchTitle.addEventListener("click", () => {
    if (searchTitle.classList.contains('active')) {
        searchDiv.classList.remove("active");
        searchTitle.classList.remove("active");
        setTimeout(function () {
            searchDivTop.classList.remove("active");
            searchButton.classList.remove("active");
        }, 50);
    } else {
        searchDiv.classList.toggle("active");
        searchDivTop.classList.toggle("active");
        searchTitle.classList.toggle("active");
        searchButton.classList.toggle("active");
    }
})