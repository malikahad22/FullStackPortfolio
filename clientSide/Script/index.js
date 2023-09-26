var eventId;
function leftSide(event) {
  eventId = event;
}

// getting Token from Local Storage
let token = localStorage.getItem('token');

let headers = {
  'Content-Type': 'application/json',
  'Authorization': token
}


function logout() {


 fetch("http://localhost:8000/logout",{
  method:"POST",
 headers : headers 
 }).then((resp)=>{
  if(resp.status === 200){
    localStorage.clear();
    window.location.assign('./Login.html')
  }

});

}


let user = {
  id: 0,
  name: "",
  email: "",
  number: "",
  password: "",
  address: "",
  about: "",
  title: "",
  projectNames: [],
  exp: [],
  edu: [],
  skill: [],
  projects: []
};

document.addEventListener("DOMContentLoaded", async () => {

  let UserId = localStorage.getItem('user');
  UserId = JSON.parse(UserId);


  const response = await fetch("http://localhost:8000/users");
  const result = await response.json();

  const userData = result.find((i) => i.id === UserId.id);

  // About Section

  document.getElementById("T").innerHTML = userData.title;
  document.getElementById("Name").innerHTML = userData.name;
  document.getElementById("email").innerHTML = userData.email;
  document.getElementById("address").innerHTML = userData.address;
  document.getElementById("number").innerHTML = userData.number;
  document.getElementById("aboutMe").innerHTML = userData.about;
  document.getElementById("myPofile").src = userData.profileImage;
  // document.getElementById("exp").innerHTML = userData.exp;
  document.getElementById("skill").innerHTML = userData.skills;
  // document.getElementById("edu").innerHTML = userData.edu;


  // Function to display projects based on search value
  function displayProjects(searchValue) {

    let parentElement = document.getElementById("p1");

    // Clear previous search results
    parentElement.innerHTML = "";
    var filterData;
    fetch("http://localhost:8000/projects").then((resp) => resp.json()).then((res) => {
  
      if (searchValue === "") {

        filterData = res.filter((i) => { 
          if(i.UserId == UserId.id){
            return i;
          }

        });

      } else {

        filterData = res.filter((f) => {

          if ((f.title.toLowerCase().includes(searchValue.toLowerCase()) || f.frame.toLowerCase().includes(searchValue.toLowerCase()) || f.lang.toLowerCase().includes(searchValue.toLowerCase()))) {

            return f;
          }
        });
      }
      if (filterData.length === 0) {

        let message = document.createElement("p");
        message.className = "message";
        message.appendChild(document.createTextNode("No Project"));
        parentElement.appendChild(message);

      } else { // Displaying Projects on Main Page

        for (let a = 0; a < filterData.length; a++) { // Create left side of the project
          let leftNode = document.createElement("div");
          leftNode.id = `left-side${a}`;
          leftNode.className = "left";
          parentElement.appendChild(leftNode);
          let leftParent = document.getElementById(`left-side${a}`);
          leftParent.setAttribute('onclick', `leftSide(${a})`);
          let click = document.getElementById(`left-side${a}`);

          // Setting Project POPUp Information
          click.addEventListener('click', () => {
            document.getElementById('pop-title').innerHTML = filterData[eventId].title
            // Here Event Id is the Global Id which hold id of clicked Project
            // document.getElementById('pop-dev').innerHTML = filterData[eventId].dev;
            document.getElementById('pop-desciption').innerHTML = filterData[eventId].des;
            document.getElementById('img1').src = filterData[eventId].imageUrl
            document.getElementById('pop-tags').innerHTML = filterData[eventId].tags
            document.getElementById('pop-lang').innerHTML = filterData[eventId].lang
            document.getElementById('pop-frame').innerHTML = filterData[eventId].frame
            popover.style.display = 'flex';
          })

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

        // Home Page PopUp
        let popover = document.getElementById("popover");
        let close = document.getElementById("close");
        close.addEventListener("click", () => {
          popover.style.display = "none";
        });
      }
    });
  }


  // Search button click event listener

  let search = document.getElementById("search");
  search.addEventListener("input", () => {
    displayProjects(search.value);
  });
  // Initial display of all projects
  displayProjects("");


  // Experience
  let expParent = document.getElementById('expParent');
  let Exp = userData.exp;


  for (let i = 0; i < Exp.length; i++) {

    let experience = document.createElement('div');
    experience.id = `experience${i}`;
    experience.className = 'experience'

    let companyName = document.createElement('div');
    companyName.className = 'companyName';

    let company = document.createElement('p');
    company.appendChild(document.createTextNode(Exp[i].company));
    company.className = 'company';

    companyName.appendChild(company);
    experience.appendChild(companyName);


    let dates = document.createElement('div');
    dates.className = 'dates';

    let start = document.createElement('p');
    start.appendChild(document.createTextNode("Starting Date : " + Exp[i].start));
    start.className = 'start';
    dates.appendChild(start)

    let end = document.createElement('p');
    end.appendChild(document.createTextNode("Ending Date : " + Exp[i].end));
    end.className = 'end';
    dates.appendChild(end);

    experience.appendChild(dates)

    let buttons = document.createElement('div');
    buttons.className = 'buttonss';

    // Experience Edit

    let edit = document.createElement("i");
    edit.className = "fa fa-edit";
    edit.id = "edit";
    buttons.appendChild(edit);

    let updateExpClose = document.getElementById('updateExpClose');
    let updateExp = document.getElementById('updateExp');

    // Close Button For Update Experience Form
    updateExpClose.addEventListener('click', () => {
      updateExp.style.display = 'none'
    })

    // PreFill Upate Experience Form
    edit.addEventListener('click', () => {
      document.getElementById('Company').value = Exp[i].company;
      document.getElementById('Start').value = Exp[i].start;
      document.getElementById('End').value = Exp[i].end;
      updateExp.style.display = 'flex';


      // Update Experience
      let updateExperience = document.getElementById('updateExperience');

      // getting Token from Local Storage
      // var token = localStorage.getItem('token');

      updateExperience.addEventListener('click', (e) => {
        e.preventDefault();

        let company = document.getElementById('Company').value;
        let start = document.getElementById('Start').value;
        let end = document.getElementById('End').value;

        let exp = {
          company,
          start,
          end
        };

        if (company === "" || start === "" || end === "") {
          alert("Fill All Records");
        } else { // Fetch APi For Updating Experience
          fetch(`http://localhost:8000/exp/${i}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(exp)
          }).then((resp) => {
            resp.json().then((res) => {
              console.log(res)
            })
          })

        }
      })
    });

    // Delete Api for experience
    let del = document.createElement("i");
    del.className = "fa fa-trash";
    del.id = "del";
    buttons.appendChild(del);

    del.addEventListener("click", (e) => {
      e.preventDefault();
      fetch(`http://localhost:8000/exp/${i}`, {
        method: "DELETE",
        headers: headers
      }).then((resp) => {
        resp.json().then((r) => {
          console.log(r)
        });
      });
    });

    experience.appendChild(buttons);

    expParent.appendChild(experience);

  }

  let add = document.getElementById('add');
  let expForm = document.getElementById('expForm');
  let expClose = document.getElementById('expClose');


  expForm.addEventListener('submit', (e) => { 
    e.preventDefault();
  });


  add.addEventListener('click', () => {
    expForm.style.display = 'flex';
  });

  expClose.addEventListener('click', () => {
    expForm.style.display = 'none';
  });


  // Education
  let Edu = userData.edu;

  let schoolParent = document.getElementById('schoolParent');

  for (let x = 0; x < Edu.length; x++) {

    let school = document.createElement('div');
    school.id = `school${x}`;
    school.className = 'school';


    let SchoolName = document.createElement('div');
    SchoolName.className = 'SchoolName';

    let School = document.createElement('p');
    School.appendChild(document.createTextNode(Edu[x].school));
    SchoolName.appendChild(School);

    school.appendChild(SchoolName);


    let info = document.createElement('div');
    info.className = 'info';

    let marks = document.createElement('p');
    marks.appendChild(document.createTextNode("Marks : " + Edu[x].marks));
    marks.className = 'marks';
    info.appendChild(marks)

    let degree = document.createElement('p');
    degree.appendChild(document.createTextNode("Degree : " + Edu[x].Degree));
    degree.className = 'degree';
    info.appendChild(degree);

    let completion = document.createElement('p');
    completion.appendChild(document.createTextNode("Completion: " + Edu[x].complete));
    completion.className = 'complete';
    info.appendChild(completion);

    school.appendChild(info);

    // Education Buutons

    let buttons = document.createElement('div');

    // Eduction Edit Button
    let Eduedit = document.createElement("i");
    Eduedit.className = "fa fa-edit";
    Eduedit.id = "eduEdit";
    buttons.appendChild(Eduedit);

    let EduUpdate = document.getElementById('updateEdu');

    //

    Eduedit.addEventListener('click', () => {
      console.log(document.getElementById('school'))
      document.getElementById('School').value = Edu[x].school;
      document.getElementById('Marks').value = Edu[x].marks;
      document.getElementById('Complete').value = Edu[x].complete;
      document.getElementById('degree').value = Edu[x].Degree;
      updateEdu.style.display = 'flex';


      // Update Education
      let updateEducation = document.getElementById('updateEducation');


      updateEducation.addEventListener('click', (e) => {
        e.preventDefault();
        let school = document.getElementById('School').value;
        let complete = document.getElementById('Complete').value;
        let marks = document.getElementById('Marks').value;
        let Degree = document.getElementById('degree').value;
        let edu = {
          school,
          Degree,
          marks,
          complete
        };
        console.log(edu)
        if (school === "" || marks === "" || Degree === "") {
          alert("Fill All Records");
        } else { // Fetch APi For Updating Experience
          fetch(`http://localhost:8000/edu/${x}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(edu)
          }).then((resp) => {
            resp.json().then((res) => {
              console.log(res)
            })
          })

        }
      })
    })
    //


    let eduUpdateClose = document.getElementById('eduUpdateClose');
    eduUpdateClose.addEventListener('click', () => {
      EduUpdate.style.display = 'none'
    })

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }

    // Delete Button for Education
    let eduDel = document.createElement("i");
    eduDel.className = "fa fa-trash";
    eduDel.id = "eduDel";

    eduDel.addEventListener("click", () => {

      fetch(`http://localhost:8000/edu/${x}`, {
        method: "DELETE",
        headers: headers
      }).then((resp) => {
        resp.json().then((r) => {
          console.log(r)
        });
      });
    });


    buttons.appendChild(eduDel);

    school.appendChild(buttons);
    schoolParent.appendChild(school);

  }
  // Handling Add Education Form
  let eduClose = document.getElementById('eduClose');

  let AddEdu = document.getElementById('eduForm');

  AddEdu.addEventListener('click', (e) => {
    e.preventDefault()
  });


  let Add = document.getElementById('addedu');

  eduClose.addEventListener('click', () => {
    AddEdu.style.display = 'none'
  });

  Add.addEventListener('click', () => {
    AddEdu.style.display = 'flex';
  });

  let mail = document.getElementById('mail');
  mail.setAttribute('href' , `mailto:${UserId.email}`);

  let whatsapp = document.getElementById('whatsapp');
  whatsapp.setAttribute('href' , `https://wa.me/${UserId.number}`);


});
