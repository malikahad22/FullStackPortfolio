let imageUrl;

function handleImageUpload(callback) {
  let input_file = document.getElementById('input_file');
  input_file.addEventListener('change', (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size < 1000000) {
      let fileReader = new FileReader();
      fileReader.onload = function () {
        imageUrl = fileReader.result;
        // console.log(imageUrl)
        callback(imageUrl); // Call the callback with the imageUrl
      };
      fileReader.readAsDataURL(selectedFile);
    } else {
      alert("File Size is Too Big. Upload a file with a size less than 1MB.");
    }
  });
}

// Usage:
handleImageUpload((imageUrl) => {

  console.log(imageUrl)
});

document.addEventListener('submit',(e)=> {
    e.preventDefault();
  
    let title;
    let des;
    let code;
    let live;
    let lang;
    let frame;
    let tags;

    title = document.getElementById("title").value;
    des = document.getElementById("description").value;
    code = document.getElementById("code").value;
    live = document.getElementById("live").value;
    tags = document.getElementById("tags").value;
    frame = document.getElementById("framework").value;
    lang = document.getElementById("language").value;
    
    let data = {
        title,
        des,
        code,
        live,
        imageUrl,
        frame,
        tags,
        lang,
        
    };

    
let token = localStorage.getItem('token');
console.log(token);

    let headers = {
      "Content-Type":"application/json",
      "Authorization":token
    }
  
    if (title === "" || des === "" || code === "" || live === "" || imageUrl === "" || frame === "" || tags.length === 0 || lang === "") {
        alert("Please Enter The Required Fields");
    } else {
        fetch("http://localhost:8000/projects", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        }).then((resp) => {
           if(resp.status === 401){
              localStorage.clear();
              window.location.assign ('http://127.0.0.1:5501/clientSide/Pages/Login.html');
            }
          else {
            alert("Project added successfully!");
            window.location.assign ('http://127.0.0.1:5501/clientSide/Pages/index.html');

          }
        });
    }
}
);



// After  Adding Project USer Will Redirect to Main Page
function goHome() {
    window.location.assign("../../Pages/index.html");
}
