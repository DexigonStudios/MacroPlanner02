window.addEventListener('load', () => {
    let parameters = new URLSearchParams(window.location.search);
    recipe = parameters.get("recipe");

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
        var usedNumList = [0];

        recipelist = [JSON.parse(data), 0];

        document.getElementById("recipePageSection").style.display = "block";
        document.getElementById("recipePageEmptySection").style.display = "none";

        document.getElementById("ingredientmaintitle").innerHTML = "Ingredients";
        document.getElementById("stepmaintitle").innerHTML = "Steps";

        document.getElementById("recipename").innerHTML = recipelist[0][recipe][1];
        document.getElementById("recipeserving").innerHTML = recipelist[0][recipe][2] + " Servings";
        document.getElementById("recipetime").innerHTML = recipelist[0][recipe][3] + " Minutes";
        document.getElementById("recipecalorie").innerHTML = recipelist[0][recipe][4] + " Calories";
        document.getElementById("recipeprotein").innerHTML = recipelist[0][recipe][5] + "g Protein";
        document.getElementById("recipecarb").innerHTML = recipelist[0][recipe][6] + "g Carbs";
        document.getElementById("recipefat").innerHTML = recipelist[0][recipe][7] + "g Fat";
        document.getElementById("imagetest").src = recipelist[0][recipe][8];

        let alsotrylist = recipelist[0].slice();
        alsotrylist.splice(recipe, 1);
        alsotrylist = shuffle(alsotrylist.slice(1));

        for (var i = 1; i < 9; i++) {
            document.getElementById(i + "w").id = alsotrylist[i][0];
            document.getElementById(i + "recipeWideCardContainerImg").src = alsotrylist[i][8];
            document.getElementById(i + "recipeWideCardContainerRecipe").innerHTML = alsotrylist[i][1];
            document.getElementById(i + "calw").innerHTML = alsotrylist[i][4] + " Calories";
            document.getElementById(i + "prow").innerHTML = alsotrylist[i][5] + "g Protein";
            document.getElementById(i + "carw").innerHTML = alsotrylist[i][6] + "g Carbs";
            document.getElementById(i + "fatw").innerHTML = alsotrylist[i][7] + "g Fat";
        }




        var ingredientlist = recipelist[0][recipe][10].split('@@');

        if (ingredientlist.length > 1) {
            for (let i = 0; i < ingredientlist.length; i += 2) {
                document.getElementById("ingredientstitle" + i / 2).innerHTML = ingredientlist[i];
                document.getElementById("ingredientstitle" + i / 2).style.display = "block";
                document.getElementById("ingredients" + i / 2).style.display = "block";
                var ingredientlist2 = ingredientlist[i + 1];

                ingredientlist2 = ingredientlist2.split('@');

                for (let j = 0; j < ingredientlist2.length; j++) {
                    let ibox = document.createElement('tr');
                    document.getElementById("ingredients" + i / 2).append(ibox);
                    ibox.innerHTML = ingredientlist2[j];
                }
            }
        } else {
            document.getElementById("ingredientstitle0").style.display = "block";
            document.getElementById("ingredients0").style.display = "block";
            ingredientlist2 = recipelist[0][recipe][10].split('@');
            for (let j = 0; j < ingredientlist2.length; j++) {
                let ibox = document.createElement('tr');
                document.getElementById("ingredients0").append(ibox);
                ibox.innerHTML = ingredientlist2[j];
            }
        }


        var stepslist = recipelist[0][recipe][11].split('@@');

        if (stepslist.length > 1) {
            for (let i = 0; i < stepslist.length; i += 2) {
                document.getElementById("stepstitle" + i / 2).innerHTML = stepslist[i];
                document.getElementById("stepstitle" + i / 2).style.display = "block";
                document.getElementById("steps" + i / 2).style.display = "block";
                var stepslist2 = stepslist[i + 1];

                stepslist2 = stepslist2.split('@');

                for (let j = 0; j < stepslist2.length; j++) {
                    let ibox = document.createElement('tr');
                    let iboxnum = document.createElement('div');
                    document.getElementById("steps" + i / 2).append(iboxnum);
                    iboxnum.innerHTML = j + 1;
                    document.getElementById("steps" + i / 2).append(ibox);
                    ibox.innerHTML = stepslist2[j];
                }
            }
        } else {
            document.getElementById("stepstitle0").style.display = "block";
            document.getElementById("steps0").style.display = "block";
            stepslist2 = recipelist[0][recipe][11].split('@');
            for (let j = 0; j < stepslist2.length; j++) {
                let ibox = document.createElement('tr');
                let iboxnum = document.createElement('div');
                document.getElementById("steps0").append(iboxnum);
                iboxnum.innerHTML = j + 1;
                document.getElementById("steps0").append(ibox);
                ibox.innerHTML = stepslist2[j];
            }
        }


        document.getElementById("recipePageSection").animate([
            { transform: "translateY(30px)", opacity: '0%' },
            { transform: "translateY(0px)", opacity: '100%' }
        ], {
            duration: 200,
            fill: 'forwards'
        });


        for(let i = 1; i<=10; i++){
            let tempRand = generateRandom(1, usedNumList, recipelist[0].length)[0];
            usedNumList.push(tempRand);
            document.getElementById(i+"linke").id = recipelist[0][tempRand][0];
            document.getElementById(i+"ie").src = recipelist[0][tempRand][8];
            document.getElementById(i+"te").innerHTML = recipelist[0][tempRand][1];
            document.getElementById(i+"cale").innerHTML = recipelist[0][tempRand][4] + " Calories";
            document.getElementById(i+"proe").innerHTML = recipelist[0][tempRand][5] + "g Protein";
            document.getElementById(i+"care").innerHTML = recipelist[0][tempRand][6] + "g Carbs";
            document.getElementById(i+"fate").innerHTML = recipelist[0][tempRand][7] + "g Fat";
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

function deleteRow(arr, row) {
    arr = arr.slice(0); // make copy
    arr.splice(row - 1, 1);
    return arr;
}

let recipeCards = document.querySelectorAll(".recipeSmallCardContainer");
for (let i = 0; i < recipeCards.length; i++) {
    recipeCards[i].addEventListener("click", function () {
        sessionStorage.setItem("recipe", this.id);
        // temploadrecipe.innerHTML = this.id;
        location.href = "/recipepage?recipe=" + this.id;
    });
}

let recipeCards2 = document.querySelectorAll(".recipeWideCardContainer");
for (let i = 0; i < recipeCards2.length; i++) {
    recipeCards2[i].addEventListener("click", function () {
        sessionStorage.setItem("recipe", this.id);
        // temploadrecipe.innerHTML = this.id;
        location.href = "/recipepage?recipe=" + this.id;
    });
}


const generateRandom = (len, absentArray, range) => {
    const randomArray = [];
    for(let i = 0; i < len; ){
       const random = Math.floor(Math.random() * range);
    if(!absentArray.includes(random) &&
       !randomArray.includes(random)){
          randomArray.push(random);
          i++;
       }
    };
    return randomArray;
 }