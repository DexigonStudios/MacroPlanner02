// window.addEventListener('load', () => {
//     // var _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
//     if (typeof localStorage !== 'undefined') {
//         const recipeFile = localStorage.getItem('recipeFile');
//         const recipeFileExpDate = localStorage.getItem('recipeFileExpDate');

//         const date = new Date().setSeconds(new Date().getSeconds() + 600);

//         if (recipeFile) {
//             const checkExpire = (new Date()).getTime() > JSON.parse(recipeFileExpDate).expDate;
//             if (checkExpire) {
//                 fetch('https://script.google.com/macros/s/AKfycbweBXTy56rMSExNExD0RH2kONYYDxHCNGQMOT8xvXCzScRtYXEhzVA9IhU7LN6ErozdCw/exec')
//                     .then(res => res.json())
//                     .then(data => {
//                         let recipelist = [];
//                         Object.values(data).forEach(val => recipelist.push(val));
//                         localStorage.setItem('recipeFile', JSON.stringify(recipelist[0]));
//                         localStorage.setItem('recipeFileExpDate', JSON.stringify({
//                             expDate: date,
//                         }));
//                         loadIndexPage(localStorage.getItem('recipeFile'));
//                     })
//             } else {
//                 loadIndexPage(localStorage.getItem('recipeFile'));
//             }

//         } else {
//             fetch('https://script.google.com/macros/s/AKfycbweBXTy56rMSExNExD0RH2kONYYDxHCNGQMOT8xvXCzScRtYXEhzVA9IhU7LN6ErozdCw/exec')
//                 .then(res => res.json())
//                 .then(data => {
//                     let recipelist = [];
//                     Object.values(data).forEach(val => recipelist.push(val));
//                     localStorage.setItem('recipeFile', JSON.stringify(recipelist[0]));
//                     localStorage.setItem('recipeFileExpDate', JSON.stringify({
//                         expDate: date,
//                     }));
//                     loadIndexPage(localStorage.getItem('recipeFile'));
//                 })
//         }
//     } else {
//         fetch('https://script.google.com/macros/s/AKfycbweBXTy56rMSExNExD0RH2kONYYDxHCNGQMOT8xvXCzScRtYXEhzVA9IhU7LN6ErozdCw/exec')
//             .then(res => res.json())
//             .then(data => {
//                 let recipelist = [];
//                 Object.values(data).forEach(val => recipelist.push(val));
//                 loadIndexPage(JSON.stringify(recipelist[0]));
//             })
//     }
// })






// fetch('https://script.google.com/macros/s/AKfycbweBXTy56rMSExNExD0RH2kONYYDxHCNGQMOT8xvXCzScRtYXEhzVA9IhU7LN6ErozdCw/exec')
//     .then(res => res.json())
//     .then(data => {


fetch('recipes.json')
    .then(res => res.json())
    .then(data => {
      loadIndexPage(data);
    })

function loadIndexPage(data) {
    let recipelist = [];

    recipelist = data;

    var recipeCount = recipelist.length;

    var holdNumList = [];
    var usedNumList = [];



    let homeRecipeScrollerTrack = document.createElement('div');
    homeRecipeScrollerTrack.classList.add('homeRecipeScrollerTrack');
    for (var i = 0; i < 10; i++) {
        let tempRand = generateRandom(1, usedNumList, recipeCount)[0];
        usedNumList.push(tempRand);
        holdNumList.push(tempRand);
        let homeRecipeScrollerSlide = document.createElement('div');
        let homeRecipeScrollerSlideImg = document.createElement('img');
        homeRecipeScrollerSlide.classList.add('homeRecipeScrollerSlide');
        homeRecipeScrollerSlide.id = recipelist[tempRand]["_id"];
        homeRecipeScrollerSlideImg.src = recipelist[tempRand]["image"];
        homeRecipeScrollerSlide.append(homeRecipeScrollerSlideImg);
        homeRecipeScrollerTrack.append(homeRecipeScrollerSlide);
    }
    for (var i = 0; i < 10; i++) {
        tempRand = holdNumList[i];
        let homeRecipeScrollerSlide = document.createElement('div');
        let homeRecipeScrollerSlideImg = document.createElement('img');
        homeRecipeScrollerSlide.classList.add('homeRecipeScrollerSlide');
        homeRecipeScrollerSlide.id = recipelist[tempRand]["_id"];
        homeRecipeScrollerSlideImg.src = recipelist[tempRand]["image"];
        homeRecipeScrollerSlide.append(homeRecipeScrollerSlideImg);
        homeRecipeScrollerTrack.append(homeRecipeScrollerSlide);
    }
    document.getElementById("homeRecipeScroller").append(homeRecipeScrollerTrack);
    holdNumList = [];


    let homeRecipeScrollerTrack2 = document.createElement('div');
    homeRecipeScrollerTrack2.classList.add('homeRecipeScrollerTrack');
    for (var i = 0; i < 10; i++) {
        let tempRand = generateRandom(1, usedNumList, recipeCount)[0];
        usedNumList.push(tempRand);
        holdNumList.push(tempRand);
        let homeRecipeScrollerSlide = document.createElement('div');
        let homeRecipeScrollerSlideImg = document.createElement('img');
        homeRecipeScrollerSlide.classList.add('homeRecipeScrollerSlide');
        homeRecipeScrollerSlide.classList.add('two');
        homeRecipeScrollerSlide.id = recipelist[tempRand]["_id"];
        homeRecipeScrollerSlideImg.src = recipelist[tempRand]["image"];
        homeRecipeScrollerSlide.append(homeRecipeScrollerSlideImg);
        homeRecipeScrollerTrack2.append(homeRecipeScrollerSlide);
    }
    for (var i = 0; i < 10; i++) {
        tempRand = holdNumList[i];
        let homeRecipeScrollerSlide = document.createElement('div');
        let homeRecipeScrollerSlideImg = document.createElement('img');
        homeRecipeScrollerSlide.classList.add('homeRecipeScrollerSlide');
        homeRecipeScrollerSlide.classList.add('two');
        homeRecipeScrollerSlide.id = recipelist[tempRand]["_id"];
        homeRecipeScrollerSlideImg.src = recipelist[tempRand]["image"];
        homeRecipeScrollerSlide.append(homeRecipeScrollerSlideImg);
        homeRecipeScrollerTrack2.append(homeRecipeScrollerSlide);
    }
    document.getElementById("homeRecipeScroller").append(homeRecipeScrollerTrack2);
    holdNumList = [];

    let homeRecipeScrollerTrack3 = document.createElement('div');
    homeRecipeScrollerTrack3.classList.add('homeRecipeScrollerTrack');
    for (var i = 0; i < 10; i++) {
        let tempRand = generateRandom(1, usedNumList, recipeCount)[0];
        usedNumList.push(tempRand);
        holdNumList.push(tempRand);
        let homeRecipeScrollerSlide = document.createElement('div');
        let homeRecipeScrollerSlideImg = document.createElement('img');
        homeRecipeScrollerSlide.classList.add('homeRecipeScrollerSlide');
        homeRecipeScrollerSlide.classList.add('three');
        homeRecipeScrollerSlide.id = recipelist[tempRand]["_id"];
        homeRecipeScrollerSlideImg.src = recipelist[tempRand]["image"];
        homeRecipeScrollerSlide.append(homeRecipeScrollerSlideImg);
        homeRecipeScrollerTrack3.append(homeRecipeScrollerSlide);
    }
    for (var i = 0; i < 10; i++) {
        tempRand = holdNumList[i];
        let homeRecipeScrollerSlide = document.createElement('div');
        let homeRecipeScrollerSlideImg = document.createElement('img');
        homeRecipeScrollerSlide.classList.add('homeRecipeScrollerSlide');
        homeRecipeScrollerSlide.classList.add('three');
        homeRecipeScrollerSlide.id = recipelist[tempRand]["_id"];
        homeRecipeScrollerSlideImg.src = recipelist[tempRand]["image"];
        homeRecipeScrollerSlide.append(homeRecipeScrollerSlideImg);
        homeRecipeScrollerTrack3.append(homeRecipeScrollerSlide);
    }
    document.getElementById("homeRecipeScroller").append(homeRecipeScrollerTrack3);
    holdNumList = [];


    let homeRecipeScrollerTrack4 = document.createElement('div');
    homeRecipeScrollerTrack4.classList.add('homeRecipeScrollerTrack');
    for (var i = 0; i < 10; i++) {
        let tempRand = generateRandom(1, usedNumList, recipeCount)[0];
        usedNumList.push(tempRand);
        holdNumList.push(tempRand);
        let homeRecipeScrollerSlide = document.createElement('div');
        let homeRecipeScrollerSlideImg = document.createElement('img');
        homeRecipeScrollerSlide.classList.add('homeRecipeScrollerSlide');
        homeRecipeScrollerSlide.classList.add('four');
        homeRecipeScrollerSlide.id = recipelist[tempRand]["_id"];
        homeRecipeScrollerSlideImg.src = recipelist[tempRand]["image"];
        homeRecipeScrollerSlide.append(homeRecipeScrollerSlideImg);
        homeRecipeScrollerTrack4.append(homeRecipeScrollerSlide);
    }
    for (var i = 0; i < 10; i++) {
        tempRand = holdNumList[i];
        let homeRecipeScrollerSlide = document.createElement('div');
        let homeRecipeScrollerSlideImg = document.createElement('img');
        homeRecipeScrollerSlide.classList.add('homeRecipeScrollerSlide');
        homeRecipeScrollerSlide.classList.add('four');
        homeRecipeScrollerSlide.id = recipelist[tempRand]["_id"];
        homeRecipeScrollerSlideImg.src = recipelist[tempRand]["image"];
        homeRecipeScrollerSlide.append(homeRecipeScrollerSlideImg);
        homeRecipeScrollerTrack4.append(homeRecipeScrollerSlide);
    }
    document.getElementById("homeRecipeScroller").append(homeRecipeScrollerTrack4);
    holdNumList = [];


    let homeRecipeScrollerTrack5 = document.createElement('div');
    homeRecipeScrollerTrack5.classList.add('homeRecipeScrollerTrack');
    for (var i = 0; i < 10; i++) {
        let tempRand = generateRandom(1, usedNumList, recipeCount)[0];
        usedNumList.push(tempRand);
        holdNumList.push(tempRand);
        let homeRecipeScrollerSlide = document.createElement('div');
        let homeRecipeScrollerSlideImg = document.createElement('img');
        homeRecipeScrollerSlide.classList.add('homeRecipeScrollerSlide');
        homeRecipeScrollerSlide.classList.add('five');
        homeRecipeScrollerSlide.id = recipelist[tempRand]["_id"];
        homeRecipeScrollerSlideImg.src = recipelist[tempRand]["image"];
        homeRecipeScrollerSlide.append(homeRecipeScrollerSlideImg);
        homeRecipeScrollerTrack5.append(homeRecipeScrollerSlide);
    }
    for (var i = 0; i < 10; i++) {
        tempRand = holdNumList[i];
        let homeRecipeScrollerSlide = document.createElement('div');
        let homeRecipeScrollerSlideImg = document.createElement('img');
        homeRecipeScrollerSlide.classList.add('homeRecipeScrollerSlide');
        homeRecipeScrollerSlide.classList.add('five');
        homeRecipeScrollerSlide.id = recipelist[tempRand]["_id"];
        homeRecipeScrollerSlideImg.src = recipelist[tempRand]["image"];
        homeRecipeScrollerSlide.append(homeRecipeScrollerSlideImg);
        homeRecipeScrollerTrack5.append(homeRecipeScrollerSlide);
    }
    document.getElementById("homeRecipeScroller").append(homeRecipeScrollerTrack5);
    holdNumList = [];

    let recipeCards = document.querySelectorAll(".homeRecipeScrollerSlide");
    for (let i = 0; i < recipeCards.length; i++) {
        recipeCards[i].addEventListener("click", function () {
            sessionStorage.setItem("recipe", this.id);
            // temploadrecipe.innerHTML = this.id;
            location.href = "/recipepage?recipe=" + this.id;
        });
    }

}



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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