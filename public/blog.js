window.addEventListener('load', () => {
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

    document.getElementById("blogSection").style.display = "block";
    document.getElementById("emptySection").style.display = "none";

    document.getElementById("mainBlogTitle").innerHTML = bloglist[blogCount-1][1];
    document.getElementById("mainBlogDate").innerHTML = bloglist[blogCount-1][2];
    
    document.getElementById("mainBlogDiv").id = bloglist[blogCount-1][0];
    document.getElementById("mainBlogImg").src = bloglist[blogCount-1][4];

    var mainBloglist = bloglist[blogCount - 1][3].split('@@');

    if(mainBloglist.length > 1){
        document.getElementById("mainBlogText").innerHTML = mainBloglist[1];
    } else {
        document.getElementById("mainBlogText").innerHTML = mainBloglist[0];
    }




    for (var i = 0; i <= blogCount-1; i++) {
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

    if(3-blogCount%3 == 1){
        let blogCardContainer = document.createElement('div');
        blogCardContainer.classList.add('blogCardContainer');
        let blogTitle = document.createElement('span');
        blogTitle.classList.add('blogTitle');
        blogTitle.innerHTML = "";
        blogCardContainer.append(blogTitle);
        document.getElementById("allBlogsDiv").append(blogCardContainer);
    }




    let blogCards = document.querySelectorAll(".mainBlogDiv");
    for (let i = 0; i < blogCards.length; i++) {
        blogCards[i].addEventListener("click", function () {
            sessionStorage.setItem("blog", this.id);
            location.href = "/blogpage?blog=" + this.id;
        });
    }

    let blogCards2 = document.querySelectorAll(".blogCardContainer");
    for (let i = 0; i < blogCards2.length; i++) {
        blogCards2[i].addEventListener("click", function () {
            sessionStorage.setItem("blog", this.id);
            location.href = "/blogpage?blog=" + this.id;
        });
    }
}