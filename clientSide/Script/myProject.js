
document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token');
    let headers = {
        "Content-Type": "application/json",
        "Authorization": token
    }

    // Displaying Project List

    var parent = document.getElementById("projectList");
    var projects;

    fetch(`http://localhost:8000/projects/myprojects`, {
        method: "GET",
        headers: headers
    }).then(async (resp) => {
        if(resp.status === 401){
            alert("Token is Expire");
      localStorage.clear();
      window.location.href = "http://127.0.0.1:5501/clientSide/Pages/Login.html";
        }
        else if (resp.status === 200) {
            projects = await resp.json();
        }
        if (projects.length === 0) {
            let message = document.createElement("p");
            message.className = "message";
            message.appendChild(document.createTextNode("No Project"));
            parent.appendChild(message);
        } else {

            projects.map((item, key) => {


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

                edit.addEventListener('click', () => {
                    var globalId;
                    let imageUrl;
                    let userId;

                    globalId = item.id;
                    imageUrl = item.imageUrl;
                    userId = item.userId

                    // PreFill The Update Project PopUp
                    document.getElementById("title").value = item.title;
                    document.getElementById("description").value = item.des;
                    document.getElementById("code").value = item.code;
                    document.getElementById("tags").value = item.tags;
                    document.getElementById("lang").value = item.lang;
                    document.getElementById("frame").value = item.frame;
                    document.getElementById("live").value = item.live;

                    // Display Update Project popUp 
                    let updatePage = document.getElementById("updateProject");
                    updatePage.style.display = "flex";

                    // Update PRoject
                    let update = document.getElementById("update");
                    update.addEventListener("click", () => {
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
                            userId

                        };

                        //Put Api For Update Projects 
                        fetch(`http://localhost:8000/projects/${globalId}`, {
                            method: "PUT",
                            headers: headers,
                            body: JSON.stringify(updateData)
                        }).then((resp) => {
                            resp.json().then((res) => {
                                console.log(res);
                            });
                        });
                        // window.location.assign('../../Pages/index.html');
                    });
                })
                section.appendChild(edit);


                // Delete
                let del = document.createElement("i");
                del.className = "fa fa-trash";
                del.id = "del";
                let id = item.id;
                del.addEventListener("click", () => {
                    fetch(`http://localhost:8000/projects/${id}`,
                        {
                            method: "DELETE",
                            headers: headers
                        }).then((resp) => {

                            if (resp.status === 401) {
                                alert("Token is Expire Please LogIn Again");
                                window.location.href = 'http://127.0.0.1:5501/clientSide/Pages/Login.html';
                            }
                        });
                        location.reload();

                });
                section.appendChild(del);


            })

        }
    }
    );

    // Hide Update Project PopUp
    let updateCloser = document.getElementById("updateClose");
    updateCloser.addEventListener("click", () => {
        document.getElementById("updateProject").style.display = "none";
    });


});




