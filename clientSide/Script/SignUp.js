var imageUrl;

var user = {
  name: "",
  email: "",
  mobile: "",
  address: "",
  password: "",
  github :"",
  linkedin:"",
  twitter:"",
  profileImage: "",
  title: "",
  role:"",
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


document.getElementById('profilePopUp').addEventListener('click', (e) => {
  e.preventDefault()
  document.getElementById('profileform').style.display = 'flex';
})


document.getElementById('close').addEventListener('click', () => {
  document.getElementById('profileform').style.display = 'none';
});

document.getElementById('submitbtn').addEventListener('click', async () => {



  // Setting The Values of input Fields
  user.name = document.getElementById("name").value;
  user.email = document.getElementById("email").value;
  user.mobile = document.getElementById("number").value;
  user.password = document.getElementById("password").value;
  user.about = document.getElementById("about").value;
  user.address = document.getElementById("address").value;
  user.title = document.getElementById("title").value;
  user.role = document.getElementById("role").value;
  user.linkedin = document.getElementById("linkedin").value;
  user.twitter = document.getElementById("twitter").value;
  user.github = document.getElementById("github").value;




  if (user.name === "" || user.email === "" || user.mobile === "" || user.password === "" || user.address === "") {
    alert("Please Fill all Fields");
  } else
  // SignUp File
  {

    const res = await fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if(res.status === 400){
      alert("Email Already in Use");
    }
    window.location.assign("./Login.html");
  }

})
