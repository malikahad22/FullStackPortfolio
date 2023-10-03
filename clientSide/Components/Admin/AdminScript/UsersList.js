document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault()

  let token = localStorage.getItem('token');

  let headers = {
    "ContentType": "application/json",
    "Authorization": token
  }
  // --------------------------------------------USER LIST------------------------------------------------>

  async function displayUser(searchValue) {
    let parentElement = document.getElementById("userList");
    // Clear previous search results
    parentElement.innerHTML = "";

    var filterData;
    let resp = await fetch(`http://localhost:8000/admin/users/${searchValue}`, {
      method: "GET",
      headers: headers
    });

    if (resp.status === 401) {
      alert("Token is Expire");
      localStorage.clear();
      window.location.href = "http://127.0.0.1:5501/clientSide/Pages/Login.html";
    }

    filterData = await resp.json();
 
    if (filterData.length === 0) {
      let message = document.createElement("p");
      message.className = "message";
      message.appendChild(document.createTextNode("No User Record"));
      parentElement.appendChild(message);
    } else {
      for (let a = 0; a < filterData.length; a++) {
        // if (!filterData[a].admin==="admin") {


        //Targeting UserList ID TO Display USers
        let parentElement = document.getElementById("userList");

        // Create Wrrapper of User Info
        let wrapper = document.createElement("div");
        wrapper.id = "wrapper";
        parentElement.appendChild(wrapper);

        // Left Side of the wrapper

        let leftWrapper = document.createElement("section");
        leftWrapper.id = "left-wrapper";
        wrapper.appendChild(leftWrapper);

        //Applying Image
        let img = document.createElement("img");
        img.setAttribute("src", filterData[a].profileImage);
        leftWrapper.appendChild(img);

        // User Contact Info

        let contact = document.createElement("section");
        contact.id = "contact";
        leftWrapper.appendChild(contact);

        // Email:
        let emailhead = document.createElement("p");
        emailhead.id = "heading";
        emailhead.appendChild(document.createTextNode("Email:"));
        contact.appendChild(emailhead);
        let email = document.createElement("p");
        email.id = "email";
        email.appendChild(document.createTextNode(filterData[a].email));
        contact.appendChild(email);

        // Number

        let numberhead = document.createElement("p");
        numberhead.id = "heading";
        numberhead.appendChild(document.createTextNode("Phone No:"));
        contact.appendChild(numberhead);
        let number = document.createElement("p");
        number.id = "num";
        number.appendChild(document.createTextNode(filterData[a].mobile));
        contact.appendChild(number);

        // Address:
        let addhead = document.createElement("p");
        addhead.id = "heading";
        addhead.appendChild(document.createTextNode("Address:"));
        contact.appendChild(addhead);
        let address = document.createElement("p");
        address.id = "address";
        address.appendChild(document.createTextNode(filterData[a].address));
        contact.appendChild(address);

        // Right Side of The Rapper
        let rightWrapper = document.createElement("section");
        rightWrapper.id = "right-wrapper";
        wrapper.appendChild(rightWrapper);

        // Section for Name and Title
        let section = document.createElement("section");
        section.id = "upper";
        rightWrapper.appendChild(section);

        //Users Name
        let name = document.createElement("p");
        name.id = "name";
        name.appendChild(document.createTextNode(filterData[a].name));
        section.appendChild(name);

        //User Titles
        let title = document.createElement("p");
        title.id = "title";
        title.appendChild(document.createTextNode(filterData[a].title));
        section.appendChild(title);

        // Users Descriptions
        let about = document.createElement('p');
        about.id = 'about';
        about.appendChild(document.createTextNode('About'));
        rightWrapper.appendChild(about)
        let des = document.createElement("p");
        des.id = "des";
        des.appendChild(document.createTextNode(filterData[a].about));
        rightWrapper.appendChild(des);

        // Profile Section for Experience Skills  projects Education
        let profile = document.createElement("section");
        profile.id = "profile";
        rightWrapper.appendChild(profile);

        // Experience
        // let exphead = document.createElement("p");
        // exphead.id = "heading";
        // exphead.appendChild(document.createTextNode("Experience:"));
        // profile.appendChild(exphead);
        // let exp = document.createElement("p");
        // exp.id = "exp";
        // let Exp = filterData[a].exp;
        // Exp.forEach((item) => {
        //   for (let a in item) {
        //     exp.appendChild(document.createTextNode(item[a]));
        //   }
        // })
        // profile.appendChild(exp);

        // Skills
        let skillhead = document.createElement("p");
        skillhead.id = "heading";
        skillhead.appendChild(document.createTextNode("Skills:"));
        profile.appendChild(skillhead);
        let skill = document.createElement("p");
        skill.id = "skill";
        skill.appendChild(document.createTextNode(filterData[a].skills));
        profile.appendChild(skill);


        // User Edit Button
        let edit = document.createElement("i");
        edit.className = "fa fa-edit";
        edit.id = `edit${a}`;
        rightWrapper.appendChild(edit);

        // }



        // CONTROLING UPDATE FROM POPUP................................................

        let token = localStorage.getItem('token');

        let update = document.getElementById("update");
        let i = document.getElementById(`edit${a}`);
        i.addEventListener("click", () => {

          if (!token) {
            alert("Token is not found");
            localStorage.clear();
            window.location.assign('../../../Pages/Login.html');

          } else {
            update.style.display = "flex";

            // Fetching Data Accorrding To User ID
           
  
                filterData.forEach((element) => {
                  // console.log(element)
                  if (id === element.id) {
                    document.getElementById("username").value = element.name;
                    document.getElementById("useremail").value = element.email;
                    document.getElementById("usernumber").value = element.mobile;
                    document.getElementById("useraddress").value = element.address;
                    document.getElementById("userpassword").value = element.password;
                    document.getElementById("usertitle").value = element.title;
                    document.getElementById("userskill").value = element.skills;
                    document.getElementById("userabout").value = element.about;
                    document.getElementById("role").value = element.userStatus;
                    document.getElementById("linkedin").value = element.linkedin;
                    document.getElementById("twitter").value = element.twitter;
                    document.getElementById("github").value = element.github;
                  }
                });
            
            

          }


          // let imageUrl;
          let userImage = document.getElementById('userprofileImage');
          userImage.addEventListener('change', (e) => {
            let selectedFile = e.target.files[0];
            if (selectedFile && selectedFile.size < 1000000) {
              let fileReader = new FileReader();
              fileReader.onload = function () {
                filterData[a].profileImage = fileReader.result;
                // console.log(imageUrl);
              };
              fileReader.readAsDataURL(selectedFile);
            } else {
              alert("File Size is Too Big. Upload a file with a size less than 1MB.");
            }

          });

          // Updating Profile Data
          let updateProfile = document.getElementById("updateProfile");
          updateProfile.addEventListener("click", () => {

            filterData[a].name = document.getElementById("username").value;
            filterData[a].title = document.getElementById("usertitle").value;
            filterData[a].email = document.getElementById("useremail").value;
            filterData[a].mobile = document.getElementById("usernumber").value;
            filterData[a].address = document.getElementById("useraddress").value;
            filterData[a].password = document.getElementById("userpassword").value;
            filterData[a].about = document.getElementById("userabout").value;
            filterData[a].userStatus = document.getElementById("role").value;
            filterData[a].linkedin = document.getElementById("linkedin").value;
            filterData[a].github = document.getElementById("github").value;
            filterData[a].twitter = document.getElementById("twitter").value;
            filterData[a].skills = document.getElementById("userskill").value;

            User = {
              ...filterData[a]
            };

            fetch(`http://localhost:8000/users/${id}`, {
              method: "PUT",
              headers: headers,
              body: JSON.stringify(User),
            }).then(async (resp) => {
              let result = await resp.json();
            });
          });
        });

        //Close Button For PopUp
        let close = document.getElementById("close");
        close.addEventListener("click", () => {
          update.style.display = "none";
        });

        // Delete USer Button

        let del = document.createElement("i");
        del.className = "fa fa-trash";
        del.id = "del";
        rightWrapper.appendChild(del);

        // Delete User API
        let id = filterData[a].id; // Getting User Id which  I want To delete
        del.addEventListener("click", (e) => {
          e.preventDefault();
          fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE",
            headers: headers
          }).then((resp) => {
            resp.json().then((r) => { });
          });
          location.reload();
        });
      }
    }

  }

  // Search button click event listener
  let searchIcon = document.getElementById("User");
  searchIcon.addEventListener("change", () => {
    let searchValue = document.getElementById("User").value;
    displayUser(searchValue);
  });

  // Initial display of all projects
  displayUser("");
});
