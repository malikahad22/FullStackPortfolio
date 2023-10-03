document.addEventListener("DOMContentLoaded", () => {
    // --------------------------------------------Projects LIST----------------------------------------->
    let token = localStorage.getItem('token');

    let headers = {
      "ContentType":"application/json",
      "Authorization":token
    }
  async  function displayProjects(searchValue) {
        let parentElement = document.getElementById("p1");

        // Clear previous search results
        parentElement.innerHTML = "";
        var filterData;
        let resp = await fetch(`http://localhost:8000/admin/projects/${searchValue}`,{
            method:"GET",
            headers:headers
        });
        
        if(resp.status === 401){
            alert("Token is Expire");
            localStorage.clear();
            window.location.href = "http://127.0.0.1:5501/clientSide/Pages/Login.html";
        }
         filterData =await resp.json();
             
                if (filterData.length === 0) {
                    let message = document.createElement("p");
                    message.className = "message";
                    message.appendChild(document.createTextNode("No Project"));
                    parentElement.appendChild(message);
                } else {
                    for (let a = 0; a < filterData.length; a++) {
                        // Create left side of the project
                        let leftNode = document.createElement("div");
                        leftNode.id = `left-side${a}`;
                        leftNode.className = "left";
                        parentElement.appendChild(leftNode);
                        let leftParent = document.getElementById(`left-side${a}`);

                        // project Title Node
                        let head = document.createElement("h3");
                        head.className = "title";
                        let headText = document.createTextNode(filterData[a].title);
                        head.appendChild(headText);
                        leftParent.appendChild(head);

                        // paragraph Node
                        let para = document.createElement("p");
                        let description = document.createTextNode(filterData[a].des);
                        para.className = "text";
                        para.appendChild(description);
                        leftParent.appendChild(para);

                        // Add Link For See Live
                        let live = document.createElement("a");
                        let liveTitle = document.createTextNode("See Live");
                        live.appendChild(liveTitle);
                        live.className = "btn3";
                        live.setAttribute("href", filterData[a].live);
                        leftParent.appendChild(live);

                        // Add Link For Source Code
                        let source = document.createElement("a");
                        let sourceTitle = document.createTextNode("Source Code");
                        source.appendChild(sourceTitle);
                        source.className = "src";
                        source.setAttribute("href", filterData[a].code);
                        leftParent.appendChild(source);

                        // Right Side of the Project
                        let rightNode = document.createElement("div");
                        rightNode.id = `right-side${a}`;
                        rightNode.className = "right";
                        let image = document.createElement("img");
                        image.className = "projectImage";
                        image.setAttribute("src", filterData[a].imageUrl);
                        rightNode.appendChild(image);
                        parentElement.appendChild(rightNode);
                    }
                }
    }

    let search = document.getElementById("search");
    search.addEventListener("change", () => {
        let searchValue = document.getElementById("search").value;
        displayProjects(searchValue);
    });
    // Initial display of all projects
    displayProjects("");
});
