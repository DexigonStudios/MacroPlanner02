window.addEventListener('load', () => {
    let parameters = new URLSearchParams(window.location.search);
    blog = parameters.get("blog");

    // var _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
    if (typeof localStorage !== 'undefined') {
        const blogFile = localStorage.getItem('blogFile');
        const blogFileExpDate = localStorage.getItem('blogFileExpDate');

        const date = new Date().setSeconds(new Date().getSeconds() + 600);

        if (blogFile) {
            const checkExpire = (new Date()).getTime() > JSON.parse(blogFileExpDate).expDate;
            if (checkExpire) {
                fetch('https://script.google.com/macros/s/AKfycbz__Njw4rbCfpHOy542wq_4wOUqTtsSHfeTVEeCWo6iuRfncuQSrEzN7FivurN8R4my/exec')
                    .then(res => res.json())
                    .then(data => {
                        let bloglist = [];
                        Object.values(data).forEach(val => bloglist.push(val));
                        localStorage.setItem('blogFile', JSON.stringify(bloglist[0]));
                        localStorage.setItem('blogFileExpDate', JSON.stringify({
                            expDate: date,
                        }));
                        loadBlogPage(localStorage.getItem('blogFile'));
                    })
            } else {
                loadBlogPage(localStorage.getItem('blogFile'));
            }

        } else {
            fetch('https://script.google.com/macros/s/AKfycbz__Njw4rbCfpHOy542wq_4wOUqTtsSHfeTVEeCWo6iuRfncuQSrEzN7FivurN8R4my/exec')
                .then(res => res.json())
                .then(data => {
                    let bloglist = [];
                    Object.values(data).forEach(val => bloglist.push(val));
                    localStorage.setItem('blogFile', JSON.stringify(bloglist[0]));
                    localStorage.setItem('blogFileExpDate', JSON.stringify({
                        expDate: date,
                    }));
                    loadBlogPage(localStorage.getItem('blogFile'));
                })
        }
    } else {
        fetch('https://script.google.com/macros/s/AKfycbz__Njw4rbCfpHOy542wq_4wOUqTtsSHfeTVEeCWo6iuRfncuQSrEzN7FivurN8R4my/exec')
            .then(res => res.json())
            .then(data => {
                let bloglist = [];
                Object.values(data).forEach(val => bloglist.push(val));
                loadBlogPage(JSON.stringify(bloglist[0]));
            })
    }

})


function loadBlogPage(data) {
    let bloglist = [];

    bloglist = JSON.parse(data);

    bloglist.shift();

    var blogCount = bloglist.length;

    document.getElementById("blogSectionTitle").innerHTML = bloglist[blog - 1][1];
    document.getElementById("blogSectionDate").innerHTML = bloglist[blog - 1][2];
    document.getElementById("blogSectionImg").src = bloglist[blog - 1][4];

    var currentbloglist = bloglist[blog - 1][3].split('@@');


    if (currentbloglist.length > 1) {
        for (let i = 0; i < currentbloglist.length; i += 2) {
            let blogSectionTextHeading = document.createElement('p');
            blogSectionTextHeading.classList.add('blogSectionTextHeading');
            blogSectionTextHeading.innerHTML = currentbloglist[i];
            document.getElementById("blogSectionText").append(blogSectionTextHeading);
            var currentbloglist2 = currentbloglist[i + 1];
            currentbloglist2 = currentbloglist2.split('@');

            for (let j = 0; j < currentbloglist2.length; j++) {
                var currentbloglist3 = currentbloglist2[j];
                currentbloglist3 = currentbloglist3.split('++');

                if (currentbloglist3.length > 1) {
                    for (let j = 0; j < currentbloglist3.length; j++) {
                        let blogSectionTextBullet = document.createElement('p');
                        blogSectionTextBullet.classList.add('blogSectionTextBullet');
                        blogSectionTextBullet.innerHTML = currentbloglist3[j];
                        document.getElementById("blogSectionText").append(blogSectionTextBullet);
                    }
                } else {
                    let blogSectionTextPara = document.createElement('p');
                    blogSectionTextPara.classList.add('blogSectionTextPara');
                    blogSectionTextPara.innerHTML = currentbloglist2[j];
                    document.getElementById("blogSectionText").append(blogSectionTextPara);
                }
            }


        }
    } else {
        var currentbloglist2 = currentbloglist[0];
        currentbloglist2 = currentbloglist2.split('@');

        for (let j = 0; j < currentbloglist2.length; j++) {
            var currentbloglist3 = currentbloglist2[j];
            currentbloglist3 = currentbloglist3.split('++');

            if (currentbloglist3.length > 1) {
                for (let j = 0; j < currentbloglist3.length; j++) {
                    let blogSectionTextBullet = document.createElement('p');
                    blogSectionTextBullet.classList.add('blogSectionTextBullet');
                    blogSectionTextBullet.innerHTML = currentbloglist3[j];
                    document.getElementById("blogSectionText").append(blogSectionTextBullet);
                }
            } else {
                let blogSectionTextPara = document.createElement('p');
                blogSectionTextPara.classList.add('blogSectionTextPara');
                blogSectionTextPara.innerHTML = currentbloglist2[j];
                document.getElementById("blogSectionText").append(blogSectionTextPara);
            }
        }
    }

    var blogBottomSubtractNum = 3;
    if (blogCount - 3 <= blog - 1 && blogCount - 1 >= blog - 1) {
        blogBottomSubtractNum = 4;
    }


    for (var i = blogCount - blogBottomSubtractNum; i <= blogCount - 1; i++) {
        if (i != blog - 1) {
            let blogCardContainer = document.createElement('div');
            blogCardContainer.classList.add('blogCardContainer');
            blogCardContainer.id = bloglist[i][0];
            let blogCardImgContainer = document.createElement('div');
            blogCardImgContainer.classList.add('blogCardImgContainer');
            let blogImg = document.createElement('img');
            blogImg.classList.add('blogCardImg');
            blogImg.src = bloglist[i][4];
            let p = document.createElement('p');
            blogCardImgContainer.append(blogImg);
            blogCardContainer.append(blogCardImgContainer);
            let blogTitle = document.createElement('span');
            blogTitle.classList.add('blogTitle');
            blogTitle.innerHTML = bloglist[i][1];
            let blogDate = document.createElement('span');
            blogDate.classList.add('blogDate');
            blogDate.innerHTML = bloglist[i][2];
            let blogReadMore = document.createElement('span');
            blogReadMore.classList.add('blogReadMore');
            blogReadMore.innerHTML = "Read More";
            blogReadMore.id = bloglist[i][0];
            p.append(blogTitle);
            p.append(document.createElement('br'));
            p.append(blogDate);
            // p.append(document.createElement('br'));
            // p.append(blogReadMore);
            // p.append(document.createElement('br'));
            blogCardContainer.append(p);
            document.getElementById("allBlogsDiv").append(blogCardContainer);
        }
    }

    let relatedbloglist = shuffle(bloglist);
    var addNumRelatdBlog = 0;

    console.log(relatedbloglist);

    for (var i = 1; i < Math.min(6 + addNumRelatdBlog, bloglist.length + 1); i++) {
        if (relatedbloglist[i - 1][0] != blog) {
            document.getElementById(i - addNumRelatdBlog + "w").id = relatedbloglist[i - 1][0];
            document.getElementById(i - addNumRelatdBlog + "blogWideCardContainerImgb").src = relatedbloglist[i - 1][4];
            document.getElementById(i - addNumRelatdBlog + "blogWideCardContainerImg").src = relatedbloglist[i - 1][4];
            document.getElementById(i - addNumRelatdBlog + "blogWideCardContainerRecipe").innerHTML = relatedbloglist[i - 1][1];
        } else {
            addNumRelatdBlog++;
        }
    }




    let blogCards2 = document.querySelectorAll(".blogCardContainer");
    for (let i = 0; i < blogCards2.length; i++) {
        blogCards2[i].addEventListener("click", function () {
            sessionStorage.setItem("blog", this.id);
            location.href = "/blogpage?blog=" + this.id;
        });
    }

    let recipeCards2 = document.querySelectorAll(".blogWideCardContainer");
    for (let i = 0; i < recipeCards2.length; i++) {
        recipeCards2[i].addEventListener("click", function () {
            sessionStorage.setItem("blog", this.id);
            // temploadrecipe.innerHTML = this.id;
            location.href = "/blogpage?blog=" + this.id;
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