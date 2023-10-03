document.addEventListener("submit", async (e) => {
  e.preventDefault();
  let email;
  let password;
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  let data = {
    email,
    password
  }
 if(!data.email || !data.password){
alert("Please Fill All Fields")
 }
 else 
 {
  const res = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const result = await res.json();

  let user = JSON.stringify(result.foundUser);
  localStorage.setItem('user', user);
  localStorage.setItem('token', result.token);

  if (res.status == 200 && result.message == 'Admin') {
    window.location.assign('/clientSide/Components/Admin/AdminPages/Dashboard.html');

  }
  else if(res.status == 200){
    window.location.assign('/clientSide/Pages/index.html');

  }
  else 
  {
    alert("Enter Right Info")
  }
 }

});
