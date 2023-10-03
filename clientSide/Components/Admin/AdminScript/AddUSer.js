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
    mobile: "",
    address: "",
    password: "",
    profileImage: "",
    title: "",
    about: "",
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

    
if (val === "skill") {
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
    user.mobile = document.getElementById("number").value;
    user.password = document.getElementById("password").value;
    user.about = document.getElementById("about").value;
    user.address = document.getElementById("address").value;
    user.title = document.getElementById("title").value;


    if (user.name === "" || user.email === "" || user.mobile === "" || user.password === "" || user.address === "") {
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