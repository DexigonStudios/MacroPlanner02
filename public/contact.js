let contactSendButton = document.getElementById("contactsendbutton");
const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;


contactSendButton.addEventListener('click', function (e) {
    e.preventDefault();

    if (document.getElementById("contactname").value == '' || !document.getElementById("contactemail").value.match(pattern)) {
        if(document.getElementById("contactname").value == ''){
            document.getElementById("contactnameerror").style.display = "block";
        } else {
            document.getElementById("contactnameerror").style.display = "none";
        }
        if(!document.getElementById("contactemail").value.match(pattern)){
            document.getElementById("contactemailerror").style.display = "block";
        } else {
            document.getElementById("contactemailerror").style.display = "none";
        }
    } else {
        document.getElementById("contactnameerror").style.display = "none";
        document.getElementById("contactemailerror").style.display = "none";
        var params = {
            name: document.getElementById("contactname").value,
            email: document.getElementById("contactemail").value,
            subject: document.getElementById("contactsubject").value,
            message: document.getElementById("contactmessage").value,
        };

        const serviceID = "service_1nhseqj";
        const templateID = "template_ca5gvpv";

        emailjs
            .send(serviceID, templateID, params)
            .then((res) => {
                document.getElementById("contactname").value = "";
                document.getElementById("contactemail").value = "";
                document.getElementById("contactsubject").value = "";
                document.getElementById("contactmessage").value = "";
                console.log(res);
                alert("Your message was sent successfully");
            })
            .catch((err) => console.log(err));
    }

})