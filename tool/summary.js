export function Summary(data) {
    const summary = document.createElement("div");
    summary.id = "summary";
    summary.className = "summary";

    const skillList = document.createElement("ul");
    skillList.className = "skill_list";

    data["skill"].forEach((skill) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <p class="summary_text_title">${skill["name"]}: ${skill["value"]}%</p>
        `;
        skillList.appendChild(listItem);
    });

    summary.innerHTML = `
        <div class="summary_text">
            <p class="summary_title">School Curriculum</p>
            <br>
            <p class="summary_text_title">EXP: ${data["xp"]}</p>
        </div>
    `;
    const skillLists = document.createElement("div");
    skillLists.className = "skill_lists";
    skillLists.appendChild(skillList);
    summary.appendChild(skillLists);

    document.getElementById("main_page").appendChild(summary);
}
