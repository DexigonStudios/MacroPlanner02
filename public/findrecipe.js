window.addEventListener('load', () => {
    let parameters = new URLSearchParams(window.location.search);

    calorieMin = parameters.get("calMin");
    calorieMax = parameters.get("calMax");
    proteinMin = parameters.get("proMin");
    proteinMax = parameters.get("proMax");
    carbsMin = parameters.get("carMin");
    carbsMax = parameters.get("carMax");
    fatMin = parameters.get("fatMin");
    fatMax = parameters.get("fatMax");

    document.getElementById("calorieMin").value = calorieMin;
    document.getElementById("calorieMax").value = calorieMax;
    document.getElementById("proteinMin").value = proteinMin;
    document.getElementById("proteinMax").value = proteinMax;
    document.getElementById("carbsMin").value = carbsMin;
    document.getElementById("carbsMax").value = carbsMax;
    document.getElementById("fatMin").value = fatMin;
    document.getElementById("fatMax").value = fatMax;

    document.querySelectorAll(".recipesHeaderSearchBoxInputDiv input")[0].dispatchEvent(new Event("input"));
    document.querySelectorAll(".recipesHeaderSearchBoxInputDiv input")[1].dispatchEvent(new Event("input"));
    document.querySelectorAll(".recipesHeaderSearchBoxInputDiv.two input")[0].dispatchEvent(new Event("input"));
    document.querySelectorAll(".recipesHeaderSearchBoxInputDiv.two input")[1].dispatchEvent(new Event("input"));
    document.querySelectorAll(".recipesHeaderSearchBoxInputDiv.three input")[0].dispatchEvent(new Event("input"));
    document.querySelectorAll(".recipesHeaderSearchBoxInputDiv.three input")[1].dispatchEvent(new Event("input"));
    document.querySelectorAll(".recipesHeaderSearchBoxInputDiv.four input")[0].dispatchEvent(new Event("input"));
    document.querySelectorAll(".recipesHeaderSearchBoxInputDiv.four input")[1].dispatchEvent(new Event("input"));


    if (typeof localStorage !== 'undefined') {
        const recipeFile = localStorage.getItem('recipeFile');
        const recipeFileExpDate = localStorage.getItem('recipeFileExpDate');

        const date = new Date().setSeconds(new Date().getSeconds() + 600);

        if (recipeFile) {
            const checkExpire = (new Date()).getTime() > JSON.parse(recipeFileExpDate).expDate;
            if (checkExpire) {
                fetch('https://script.google.com/macros/s/AKfycbweBXTy56rMSExNExD0RH2kONYYDxHCNGQMOT8xvXCzScRtYXEhzVA9IhU7LN6ErozdCw/exec')
                    .then(res => res.json())
                    .then(data => {
                        let recipelist = [];
                        Object.values(data).forEach(val => recipelist.push(val));
                        localStorage.setItem('recipeFile', JSON.stringify(recipelist[0]));
                        localStorage.setItem('recipeFileExpDate', JSON.stringify({
                            expDate: date,
                        }));
                        loadIndexPage(localStorage.getItem('recipeFile'));
                    })
            } else {
                loadIndexPage(localStorage.getItem('recipeFile'));
            }

        } else {
            fetch('https://script.google.com/macros/s/AKfycbweBXTy56rMSExNExD0RH2kONYYDxHCNGQMOT8xvXCzScRtYXEhzVA9IhU7LN6ErozdCw/exec')
                .then(res => res.json())
                .then(data => {
                    let recipelist = [];
                    Object.values(data).forEach(val => recipelist.push(val));
                    localStorage.setItem('recipeFile', JSON.stringify(recipelist[0]));
                    localStorage.setItem('recipeFileExpDate', JSON.stringify({
                        expDate: date,
                    }));
                    loadIndexPage(localStorage.getItem('recipeFile'));
                })
        }
    } else {
        fetch('https://script.google.com/macros/s/AKfycbweBXTy56rMSExNExD0RH2kONYYDxHCNGQMOT8xvXCzScRtYXEhzVA9IhU7LN6ErozdCw/exec')
            .then(res => res.json())
            .then(data => {
                let recipelist = [];
                Object.values(data).forEach(val => recipelist.push(val));
                loadIndexPage(JSON.stringify(recipelist[0]));
            })
    }
})

function loadIndexPage(data) {
        let recipelist = [];

    recipelist = JSON.parse(data);

        let filteredlist = [];
        currentlyShowingSearchNum = 0;
        totalfilteredlist = [];

        let searchrange = 0.2;

        Object.values(data).forEach(val => recipelist.push(val));

        filteredlist = recipelist;

        filteredlist = filteredlist.filter((filteredlist) => {
            return (parseInt(filteredlist[4]) >= calorieMin && parseInt(filteredlist[4]) <= calorieMax);
        })
        filteredlist = filteredlist.filter((filteredlist) => {
            return (parseInt(filteredlist[5]) >= proteinMin && parseInt(filteredlist[5]) <= proteinMax);
        })
        filteredlist = filteredlist.filter((filteredlist) => {
            return (parseInt(filteredlist[6]) >= carbsMin && parseInt(filteredlist[6]) <= carbsMax);
        })
        filteredlist = filteredlist.filter((filteredlist) => {
            return (parseInt(filteredlist[7]) >= fatMin && parseInt(filteredlist[7]) <= fatMax);
        })

        totalfilteredlist = shuffle(filteredlist);


        document.getElementById("resultsfoundtext").innerHTML = "Results (" + totalfilteredlist.length + ")";




        document.getElementById("recipeSearchLoadMoreButton").style.display = "block";

        loadSearchCards();

        // filteredlist = shuffle(filteredlist);

        // for (var i = 1; i <= filteredlist.length; i++) {
        //     document.getElementById(i + "i").src = filteredlist[i - 1][8];
        //     document.getElementById(i + "t").innerHTML = filteredlist[i - 1][1];
        //     document.getElementById(i + "temp").id = filteredlist[i - 1][0];
        //     document.getElementById(i + "cal").innerHTML = filteredlist[i - 1][4] + " Calories";
        //     document.getElementById(i + "pro").innerHTML = filteredlist[i - 1][5] + "g Protein";
        //     document.getElementById(i + "car").innerHTML = filteredlist[i - 1][6] + "g Carbs";
        //     document.getElementById(i + "fat").innerHTML = filteredlist[i - 1][7] + "g Fat";
        // }


    }



function loadSearchCards() {
    for (var i = 0; i < 6; i++) {
        if (currentlyShowingSearchNum < totalfilteredlist.length) {
            let recipeSearchCardContainer = document.createElement('div');
            recipeSearchCardContainer.classList.add('recipeSearchCardContainer');
            recipeSearchCardContainer.id = totalfilteredlist[currentlyShowingSearchNum][0];
            document.getElementById("recipeSearchResultDivTop").append(recipeSearchCardContainer);

            let recipeSearchCardBackImg = document.createElement('img');
            recipeSearchCardBackImg.classList.add('recipeSearchCardBackImg');
            recipeSearchCardBackImg.src = totalfilteredlist[currentlyShowingSearchNum][8];
            recipeSearchCardContainer.append(recipeSearchCardBackImg);

            let recipeSearchCard = document.createElement('div');
            recipeSearchCard.classList.add('recipeSearchCard');
            recipeSearchCardContainer.append(recipeSearchCard);

            let recipeSearchCardImg = document.createElement('img');
            recipeSearchCardImg.src = totalfilteredlist[currentlyShowingSearchNum][8];
            recipeSearchCard.append(recipeSearchCardImg);

            let recipeSearchCardText = document.createElement('div');
            recipeSearchCardText.classList.add('recipeSearchCardText');
            recipeSearchCard.append(recipeSearchCardText);

            let recipeSearchCardRecipe = document.createElement('p');
            recipeSearchCardRecipe.classList.add('recipeSearchCardRecipe');
            recipeSearchCardRecipe.innerHTML = totalfilteredlist[currentlyShowingSearchNum][1];
            recipeSearchCardText.append(recipeSearchCardRecipe);

            let recipeSearchCardInfo = document.createElement('div');
            recipeSearchCardInfo.classList.add('recipeSearchCardInfo');
            recipeSearchCardText.append(recipeSearchCardInfo);

            let recipeSearchCardInfoPart1 = document.createElement('div');
            recipeSearchCardInfoPart1.classList.add('recipeSearchCardInfoPart');
            recipeSearchCardInfo.append(recipeSearchCardInfoPart1);

            let recipeSearchCardInfoPartp1 = document.createElement('p');
            recipeSearchCardInfoPartp1.innerHTML = totalfilteredlist[currentlyShowingSearchNum][2] + " Servings";
            recipeSearchCardInfoPart1.append(recipeSearchCardInfoPartp1);

            let recipeSearchCardInfoPartp2 = document.createElement('p');
            recipeSearchCardInfoPartp2.innerHTML = totalfilteredlist[currentlyShowingSearchNum][3] + " Minutes";
            recipeSearchCardInfoPart1.append(recipeSearchCardInfoPartp2);

            let recipeSearchCardInfoDivider = document.createElement('div');
            recipeSearchCardInfoDivider.classList.add('recipeSearchCardInfoDivider');
            recipeSearchCardInfo.append(recipeSearchCardInfoDivider);

            let recipeSearchCardInfoPart2 = document.createElement('div');
            recipeSearchCardInfoPart2.classList.add('recipeSearchCardInfoPart');
            recipeSearchCardInfo.append(recipeSearchCardInfoPart2);

            let recipeSearchCardInfoPartp3 = document.createElement('p');
            recipeSearchCardInfoPartp3.innerHTML = totalfilteredlist[currentlyShowingSearchNum][4] + " Calories";
            recipeSearchCardInfoPart2.append(recipeSearchCardInfoPartp3);

            let recipeSearchCardInfoPartp4 = document.createElement('p');
            recipeSearchCardInfoPartp4.innerHTML = totalfilteredlist[currentlyShowingSearchNum][5] + "g Protein";
            recipeSearchCardInfoPart2.append(recipeSearchCardInfoPartp4);

            let recipeSearchCardInfoPart3 = document.createElement('div');
            recipeSearchCardInfoPart3.classList.add('recipeSearchCardInfoPart');
            recipeSearchCardInfo.append(recipeSearchCardInfoPart3);

            let recipeSearchCardInfoPartp5 = document.createElement('p');
            recipeSearchCardInfoPartp5.innerHTML = totalfilteredlist[currentlyShowingSearchNum][6] + "g Carbs";
            recipeSearchCardInfoPart3.append(recipeSearchCardInfoPartp5);

            let recipeSearchCardInfoPartp6 = document.createElement('p');
            recipeSearchCardInfoPartp6.innerHTML = totalfilteredlist[currentlyShowingSearchNum][7] + "g Fat";
            recipeSearchCardInfoPart3.append(recipeSearchCardInfoPartp6);

            recipeSearchCardContainer.animate([
                { scale: '85%', opacity: '40%' },
                { scale: '100%', opacity: '100%' }
                // {transform: "translateX(-50px)", opacity: '0%'},
                // {transform: "translateX(0px)", opacity: '100%'}
            ], {
                duration: 300,
                fill: 'forwards'
            });

            currentlyShowingSearchNum++;
        }
        if (currentlyShowingSearchNum >= totalfilteredlist.length) {
            document.getElementById("recipeSearchLoadMoreButton").style.display = "none";
        }
    }

    let recipeCards = document.querySelectorAll(".recipeSearchCardContainer");
    for (let i = 0; i < recipeCards.length; i++) {
        recipeCards[i].addEventListener("click", function () {
            sessionStorage.setItem("recipe", this.id);
            // temploadrecipe.innerHTML = this.id;
            location.href = "/recipepage?recipe=" + this.id;
        });
    }
}


function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function searchrecipe() {
    var calorieMin = Math.max(document.getElementById("calorieMin").value, 0);
    var calorieMax = Math.min(document.getElementById("calorieMax").value, 2000);
    var proteinMin = Math.max(document.getElementById("proteinMin").value, 0);
    var proteinMax = Math.min(document.getElementById("proteinMax").value, 200);
    var carbsMin = Math.max(document.getElementById("carbsMin").value, 0);
    var carbsMax = Math.min(document.getElementById("carbsMax").value, 200);
    var fatMin = Math.max(document.getElementById("fatMin").value, 0);
    var fatMax = Math.min(document.getElementById("fatMax").value, 200);


    location.href = "/recipesearch?calMin=" + calorieMin + "&calMax=" + calorieMax + "&proMin=" + proteinMin + "&proMax=" + proteinMax + "&carMin=" + carbsMin + "&carMax=" + carbsMax + "&fatMin=" + fatMin + "&fatMax=" + fatMax;
}
