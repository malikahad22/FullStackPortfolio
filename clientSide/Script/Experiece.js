let Token = localStorage.getItem('token');


// Add Experience
function addExperience(){
  let company = document.getElementById('company').value;
  let start = document.getElementById('start').value;
  let end = document.getElementById('end').value;
  let exp = {company,start,end};

  let headers = {
    'Content-Type':'application/json',
    'Authorization':Token
  }

  if(company === "" || start === "" || end === ""){
    alert("Fill All Records");
  }
  else
  {
     // Fetch APi For Adding Experience
  fetch('http://localhost:8000/exp',{
    method:'POST',
    headers:headers,
    body:JSON.stringify(exp)
  }).then((resp)=>{
    resp.json().then((res)=>{
      console.log(res)
    })
  })

  }
  
}

