let Tokenn = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {

  let headers = {
    'Content-Type': 'application/json',
    'Authorization': Tokenn
  }

  let addEducation = document.getElementById('addEducation');
  addEducation.addEventListener('click', () => {

    let school = document.getElementById('school').value;
    let marks = document.getElementById('marks').value;
    let complete = document.getElementById('Complete').value;
    let Degree = document.getElementById('Degree').value;
    let edu = {
      school,
      marks,
      complete,
      Degree
    };
  
   // Fetch APi For Adding Education
      
      fetch('http://localhost:8000/edu', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(edu)
      }).then((resp) => {
        resp.json().then((res) => {
          console.log(res)
        })
      })

    
  })
})


