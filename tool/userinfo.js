import {main} from "../index.js";
// email, img, firstname, surname, dateOfBirth, auditRatio
export function userInfo(data){
  const userInfo = document.createElement("div");
    userInfo.id = "user_info";
    userInfo.className = "user_info";
    userInfo.innerHTML = `
    <div class="user_info_img">
    <img src="${data[0]["img"]}" alt="user_img">
    </div>
    <div class="user_info_text">
    <p class="user_info_text_name">${data[0]["firstname"]} ${data[0]["surname"]}</p>
    <p class="user_info_text_email">${data[0]["email"]}</p>
    <p class="user_info_text_dob">Date of Birth: ${data[0]["dateOfBirth"]}</p>
    <p class="user_info_text_audit">Audit Ratio: ${data[0]["auditRatio"]}</p>
    </div>
    `
    main.appendChild(userInfo);

}