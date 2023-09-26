let token = localStorage.getItem('token');

if(!token){
alert("Token is Not Found");
localStorage.clear();
window.location.assign('../../../Pages/Login.html');
}
else 
{
    
let imageUrl;

var user = {
    name: "",
    email: "",
    number: "",
    address: "",
    password: "",
    profileImage: "",
    title: "",
    about: "",
    exp: [],
    edu: [],
    skills: []
}




// Getting Profile Image Url
function getImage(e) {
    let selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size < 1000000) {
        let fileReader = new FileReader();
        fileReader.onload = function () {
            imageUrl = fileReader.result;
            user.profileImage = imageUrl;
            // console.log(imageUrl);
        };
        fileReader.readAsDataURL(selectedFile);
    } else {
        alert("File Size is Too Big. Upload a file with a size less than 1MB.");
    }

}

// Setting Eductation ,Experience and Skills Form Values

function setValue(val) {

    if (val === "exp") {

        let company = document.getElementById("company").value;
        let start = document.getElementById("start").value;
        let end = document.getElementById("end").value;
        let experience = {
            company,
            start,
            end
        };
        user.exp.push(experience);
        document.getElementById('company').value = "";
        document.getElementById('start').value = "";
        document.getElementById('end').value = "";
    }
    else if (val === "edu") {

        let school = document.getElementById("edu").value;
        let marks = document.getElementById("marks").value;
        let complete = document.getElementById("complete").value;
        let Degree = document.getElementById("degree").value;
        let Edu = {
            school,
            marks,
            complete,
            Degree
        };

        user.edu.push(Edu)

        document.getElementById("edu").value = "";
        document.getElementById("marks").value = "";
        document.getElementById("complete").value = "";
        document.getElementById("degree").value = "";

    } else if (val === "skill") {
        user.skills.push(document.getElementById("skill").value);
        document.getElementById("skill").value = "";
    } else {
        alert("enter right data");
    }
}



document.getElementById('addUser').addEventListener('click', async (e) => {
    e.preventDefault();


    // Setting The Values of input Fields
    user.name = document.getElementById("Name").value;
    user.email = document.getElementById("email").value;
    user.number = document.getElementById("number").value;
    user.password = document.getElementById("password").value;
    user.about = document.getElementById("about").value;
    user.address = document.getElementById("address").value;
    user.title = document.getElementById("title").value;


    if (user.name === "" || user.email === "" || user.number === "" || user.password === "" || user.address === "") {
        alert("Please Fill all Fields");

    } else
    // SignUp File
    {
        const res = await fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token
            },
            body: JSON.stringify(user)
        });
        if(res.status === 401){
            alert("Token is Expire");
            localStorage.clear();
            window.location.assign('../../../Pages/Login.html');
        }
        else if (res.status === 201){
            window.location.href = './Users.html';
        }
        else{

        }
    }
})

}