import {main} from "../index.js";
export function Logout() {
    console.log("logout")
    const button = document.createElement("div");
    button.id = "logout_btn";
    button.className = "logout_btn";
    button.innerHTML = "LOGOUT";
    document.getElementById("user_info").appendChild(button);
    button.addEventListener("click", () => {
        localStorage.removeItem("jwt");
        window.location.href = "/";
        }
    );
}