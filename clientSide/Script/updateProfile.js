var updateUser;

let imageUrl;

var exp;
var edu;

var data = localStorage.getItem("user");
let token  = localStorage.getItem('token');

data = JSON.parse(data);
var id = data.id;

// PreFill Update Profile Form Data
fetch("http://localhost:8000/users").then((resp) => {

    resp.json().then((res) => {
        res.forEach((element) => {
            if (data.id == element.id) {
                document.getElementById("name").value = element.name;
                document.getElementById("email").value = element.email;
                document.getElementById("number").value = element.number;
                document.getElementById("address").value = element.address;
                document.getElementById("password").value = element.password;
                document.getElementById("title").value = element.title;
                document.getElementById("skill").value = element.skills;
                document.getElementById("about").value = element.about;
                edu = element.edu;
                exp = element.exp;
            }
        });
    });
});

// Getting Profile Image Url
function getImage(e){
    let selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size < 1000000) {
      let fileReader = new FileReader();
      fileReader.onload = function () {
        imageUrl = fileReader.result;
        console.log(imageUrl);
      };
      fileReader.readAsDataURL(selectedFile);
    } else {
      alert("File Size is Too Big. Upload a file with a size less than 1MB.");
    }

  }
// Updating Profile Data

let updateProfile = document.getElementById("updateProfile");

updateProfile.addEventListener("click",async (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let title = document.getElementById("title").value;
    let email = document.getElementById("email").value;
    let number = document.getElementById("number").value;
    let address = document.getElementById("address").value;
    let password = document.getElementById("password").value;
    let about = document.getElementById("about").value;
    let skills = document.getElementById("skill").value;
    let profileImage = imageUrl;

    let headers = {
      "Content-Type":"application/json",
      "Authorization":token
    }
    updateUser = {
        name,
        title,
        email,
        number,
        address,
        password,
        about,
        skills,
        profileImage,
        edu,
        exp,
       
    };
    fetch(`http://localhost:8000/users/${id}`, {

        method: "PUT",
        headers:headers,
        body: JSON.stringify(updateUser),
    }).then( (resp) => {

     console.log(resp)
     alert()

    });
 
});
