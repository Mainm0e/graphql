import Login from "./login.js"
import Student from "./student.js"
export const main = document.getElementById("main_page")

// check path 
// if path is not / make it /
const currentURL = window.location.href;
const path = currentURL.split("/").pop();
if (path !== "") {
    window.location.href = "/";
}
document.addEventListener("DOMContentLoaded",  () =>  {   
    // Check for token
    if (localStorage.getItem("jwt")) {
        // If token exists, render student page
        let student = new Student()
    } else {
        // If token does not exist, render login page
        let login = new Login()
        main.innerHTML = login.render()
        document.getElementById("login_form").addEventListener("submit", login.handleLogin)
    }
})
