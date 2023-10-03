const http = require("http");
const cors = require("cors");
let users = require("./db.json");
let projects = require('./projects.json');


const signUp = require("./NodeApi/signUp");
const logInReq = require("./NodeApi/logInReq");


const addUser = require('./NodeApi/addUser');
const delUser = require("./NodeApi/delUser");
const getUser = require("./NodeApi/getUser");
const updateUser = require("./NodeApi/updateUser");
const adminGetUser = require('./NodeApi/adminGetUser');


const getProjects = require('./NodeApi/getProjects');
const addProject = require("./NodeApi/addProject");
const delProject = require("./NodeApi/delProject");
const updateProject = require('./NodeApi/updatePRoject');
const adminGetProjects = require('./NodeApi/adminGetProjects');

const addExperiece = require('./NodeApi/addExperience');
const delExp = require("./NodeApi/deleteExp");
const updateExp = require("./NodeApi/updateExp");
const getExperience = require("./NodeApi/getExperience");


const addEducation = require("./NodeApi/addEducation");
const delEdu = require("./NodeApi/delEdu");
const updateEdu = require("./NodeApi/updateEdu");
const getEducation = require("./NodeApi/getEducation");
const LogOut = require("./NodeApi/LogOut");

http.createServer((req, resp, con) => {

  cors()(req, resp, () => {
    let id = req.url.split("/")[2];
    let peram = req.url.split("/")[3];
    req.users = users;
    req.projects = projects;

    if (req.url === '/login') {  //USERS
      if (req.method === "POST") {
        logInReq(req, resp, con);
      }
    }
    else if (req.url === '/signup') {
      if (req.method === 'POST') {
        signUp(req, resp, con);
      }
    }
    else if (req.url === '/users') {
      if (req.method === 'GET') {
        getUser(req, resp, con);
      }
      else if (req.method === "POST") {
        addUser(req, resp, con);
      }
      else {

      }

    }
    else if (req.url === `/users/${id}`) {

      if (req.method === "PUT") {
        updateUser(req, resp);
      }
      else if (req.method === "DELETE") {
        delUser(req, resp)
      }
    }
    else if (req.url === '/projects') {  //PROJECTS

      if (req.method === "POST") {
        addProject(req, resp);
      }
    }
    else if (req.url === `/projects/${id}`) {
      if (req.method === 'DELETE') {
        delProject(req, resp);
      }
      else if (req.method === 'PUT') {
        updateProject(req, resp);
      }
      else if (req.method === "GET") {
        getProjects(req, resp);
      }
      else { }
    }
    else if (req.url === '/edu') {   //EDUCATION

      if (req.method === "POST") {
        addEducation(req, resp);
      }
      else if (req.method === 'GET') {
        getEducation(req, resp);
      }
      else {
        console.log("not Found")
      }
    }
    else if (req.url === `/edu/${id}`) {
      if (req.method === "DELETE") {
        delEdu(req, resp);
      }
      else if (req.method === 'PUT') {
        updateEdu(req, resp);
      }
      else {

      }
    }
    else if (req.url === '/exp') {   //EXPERIENCE

      if (req.method === "POST") {
        addExperiece(req, resp);
      }
      else if (req.method === 'GET') {
        getExperience(req, resp);

      }
      else {
        console.log("Not Found")
      }
    }
    else if (req.url === `/exp/${id}`) {
      if (req.method === "DELETE") {

        delExp(req, resp);
      }
      else if (req.method === 'PUT') {
        updateExp(req, resp);

      }
      else { }
    }
    else if (req.url === '/logout') {
      if (req.method === 'POST') {
        LogOut(req, resp);
      }
    }
    else if (req.url === `/admin/users/${peram}`) {
      if (req.method === "GET") {
        adminGetUser(req, resp);
      }
    }
    else if (req.url === `/admin/projects/${peram}`) {
      if (req.method === "GET") {
        adminGetProjects(req, resp);
      }
    }
    else {
      resp.writeHead(404, { "Content-Type": "application/json" });
      resp.write(JSON.stringify({ message: "404 Page" }));
      resp.end();
    }
  })

}).listen(8000);
