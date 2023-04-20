const rangeInput = document.querySelectorAll(".sliderRangeInput input"),
    numInput = document.querySelectorAll(".recipesHeaderSearchBoxInputDiv input"),
    progress = document.querySelector(".sliderInput .progress");

let rangeGap = 100;

numInput.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(numInput[0].value),
            maxVal = parseInt(numInput[1].value);

        if (maxVal - minVal >= rangeGap && maxVal <= 2000) {
            if (e.target.className === "minInput") {
                rangeInput[0].value = minVal;
                progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            } else {
                rangeInput[1].value = maxVal;
                progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

        if (maxVal - minVal < rangeGap) {
            //Makes slider not pass the other
            if (e.target.className === "minRangeInput") {
                rangeInput[0].value = maxVal - rangeGap;
            } else {
                rangeInput[1].value = minVal + rangeGap;
            }
        } else {
            numInput[0].value = minVal;
            numInput[1].value = maxVal;
            progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});


const rangeInput2 = document.querySelectorAll(".sliderRangeInput.two input"),
    numInput2 = document.querySelectorAll(".recipesHeaderSearchBoxInputDiv.two input"),
    progress2 = document.querySelector(".sliderInput.two .progress");

let rangeGap2 = 10;

numInput2.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(numInput2[0].value),
            maxVal = parseInt(numInput2[1].value);

        if (maxVal - minVal >= rangeGap2 && maxVal <= 200) {
            if (e.target.className === "minInput") {
                rangeInput2[0].value = minVal;
                progress2.style.left = (minVal / rangeInput2[0].max) * 100 + "%";
            } else {
                rangeInput2[1].value = maxVal;
                progress2.style.right = 100 - (maxVal / rangeInput2[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput2.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(rangeInput2[0].value),
            maxVal = parseInt(rangeInput2[1].value);

        if (maxVal - minVal < rangeGap2) {
            //Makes slider not pass the other
            if (e.target.className === "minRangeInput") {
                rangeInput2[0].value = maxVal - rangeGap2;
            } else {
                rangeInput2[1].value = minVal + rangeGap2;
            }
        } else {
            numInput2[0].value = minVal;
            numInput2[1].value = maxVal;
            progress2.style.left = (minVal / rangeInput2[0].max) * 100 + "%";
            progress2.style.right = 100 - (maxVal / rangeInput2[1].max) * 100 + "%";
        }
    });
});

const rangeInput3 = document.querySelectorAll(".sliderRangeInput.three input"),
    numInput3 = document.querySelectorAll(".recipesHeaderSearchBoxInputDiv.three input"),
    progress3 = document.querySelector(".sliderInput.three .progress");

let rangeGap3 = 10;

numInput3.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(numInput3[0].value),
            maxVal = parseInt(numInput3[1].value);

        if (maxVal - minVal >= rangeGap3 && maxVal <= 200) {
            if (e.target.className === "minInput") {
                rangeInput3[0].value = minVal;
                progress3.style.left = (minVal / rangeInput3[0].max) * 100 + "%";
            } else {
                rangeInput3[1].value = maxVal;
                progress3.style.right = 100 - (maxVal / rangeInput3[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput3.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(rangeInput3[0].value),
            maxVal = parseInt(rangeInput3[1].value);

        if (maxVal - minVal < rangeGap3) {
            //Makes slider not pass the other
            if (e.target.className === "minRangeInput") {
                rangeInput3[0].value = maxVal - rangeGap3;
            } else {
                rangeInput3[1].value = minVal + rangeGap3;
            }
        } else {
            numInput3[0].value = minVal;
            numInput3[1].value = maxVal;
            progress3.style.left = (minVal / rangeInput3[0].max) * 100 + "%";
            progress3.style.right = 100 - (maxVal / rangeInput3[1].max) * 100 + "%";
        }
    });
});


const rangeInput4 = document.querySelectorAll(".sliderRangeInput.four input"),
    numInput4 = document.querySelectorAll(".recipesHeaderSearchBoxInputDiv.four input"),
    progress4 = document.querySelector(".sliderInput.four .progress");

let rangeGap4 = 10;

numInput4.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(numInput4[0].value),
            maxVal = parseInt(numInput4[1].value);

        if (maxVal - minVal >= rangeGap4 && maxVal <= 200) {
            if (e.target.className === "minInput") {
                rangeInput4[0].value = minVal;
                progress4.style.left = (minVal / rangeInput4[0].max) * 100 + "%";
            } else {
                rangeInput4[1].value = maxVal;
                progress4.style.right = 100 - (maxVal / rangeInput4[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput4.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(rangeInput4[0].value),
            maxVal = parseInt(rangeInput4[1].value);

        if (maxVal - minVal < rangeGap4) {
            //Makes slider not pass the other
            if (e.target.className === "minRangeInput") {
                rangeInput4[0].value = maxVal - rangeGap4;
            } else {
                rangeInput4[1].value = minVal + rangeGap4;
            }
        } else {
            numInput4[0].value = minVal;
            numInput4[1].value = maxVal;
            progress4.style.left = (minVal / rangeInput4[0].max) * 100 + "%";
            progress4.style.right = 100 - (maxVal / rangeInput4[1].max) * 100 + "%";
        }
    });
});