
document.addEventListener("DOMContentLoaded", () => {

let token = localStorage.getItem('token');
    let headers = {
        "Content-Type":"application/json",
        "Authorization":token
    }
    
    // Displayin Project List

    var parent = document.getElementById("projectList");
    var projects =[];

    let User = localStorage.getItem('user');
    User = JSON.parse(User)

    fetch("http://localhost:8000/projects").then((resp) => {

        resp.json().then((res) => {
             res.filter((i)=>{
                if(i.UserId == User.id){
                    projects.push(i)
                }
            })
            if(projects.length === 0){
                let message = document.createElement("p");
                message.className = "message";
                message.appendChild(document.createTextNode("No Project"));
                parent.appendChild(message);
            }else{
        
                projects.map((item, key) => {
                    
                    // projects.push(item);
        
                    let container = document.createElement("div");
                    container.id = `myProjects${item.id}`;
                    container.className = "myproject";
                    parent.appendChild(container);
        
                    let Title = document.createElement("h3");
                    Title.id = "projectTitle";
                    let TitleText = document.createTextNode(item.title);
                    Title.appendChild(TitleText);
                    container.appendChild(Title);
        
                    let TitleDes = document.createElement("p");
                    TitleDes.id = "projectDescription";
                    TitleDes.append(document.createTextNode(item.des));
                    container.appendChild(TitleDes);
        
                    let section = document.createElement("section");
                    container.appendChild(section);

        
                    // Edit Button
                    let edit = document.createElement("i");
                    edit.className = "fa fa-edit";
                    edit.id = `edit${key}`;
                    edit.setAttribute('onclick', `updateProject(${item.id})`)
                    section.appendChild(edit);
        
        
                    // Delete
                    let del = document.createElement("i");
                    del.className = "fa fa-trash";
                    del.id = "del";
                    let id = item.id;
                    del.addEventListener("click", () => {
                        console.log(headers)
                        alert()
                        fetch(`http://localhost:8000/projects/${id}`,
                         { method: "DELETE",
                            headers:headers
                        }).then((resp) => {
                            if(resp.status === 401){
                                alert("Token is Expire Please LogIn Again");
                                window.location.href ='http://127.0.0.1:5501/clientSide/Pages/Login.html';
                            }
                        });

                    });
                    section.appendChild(del);
                
        
            })
                
            }
            }
        );
    });

    // Hide Update Project PopUp
    let updateCloser = document.getElementById("updateClose");
    updateCloser.addEventListener("click", () => {
        document.getElementById("updateProject").style.display = "none";
    });

});

// console.log(imageUrl); // Use the imageUrl here, it's guaranteed to be set



// UPDATE PROJECT

function updateProject(id) {

    var globalId;
    let imageUrl;
    let UserId;
    fetch('http://localhost:8000/projects').then((resp) => {

        resp.json().then((r) => {
            r.forEach((i) => {
                if (id == i.id) {
                    globalId = i.id;
                    imageUrl = i.imageUrl;
                    UserId = i.UserId

                            // PreFill The Update Project PopUp
                    document.getElementById("title").value = i.title;
                    document.getElementById("description").value = i.des;
                    document.getElementById("code").value = i.code;
                    document.getElementById("tags").value = i.tags;
                    document.getElementById("lang").value = i.lang;
                    document.getElementById("frame").value = i.frame;
                    document.getElementById("live").value = i.live;
                }

            });    
        });
    })


    // Display Update Project popUp 
    let updatePage = document.getElementById("updateProject");
    updatePage.style.display = "flex";

    // Update PRoject
    let update = document.getElementById("update");
    update.addEventListener("click", (e) => {
        e.preventDefault();
        let title = document.getElementById("title").value;
        let des = document.getElementById("description").value;
        let code = document.getElementById("code").value;
        let live = document.getElementById("live").value;
        let tags = document.getElementById("tags").value;
        let lang = document.getElementById("lang").value;
        let frame = document.getElementById("frame").value;

        let updateData = {
            title,
            des,
            code,
            live,
            tags,
            lang,
            frame,
            imageUrl,
            UserId
            
        };

        //Put Api For Update Projects 
        fetch(`http://localhost:8000/projects/${globalId}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updateData)
        }).then((resp) => {
            resp.json().then((res) => {
                console.log(res);
            });
        });
        // window.location.assign('../../Pages/index.html');
    });


}






