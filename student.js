import {studentInfoData
,studentXpChart,
studentBasicSkill,

} from "./payload.js";
import {chartData} from "./tool/chart_data.js"
import {convertCreatedAtToNewFormat,convertDataToSkillData} from "./tool/convert.js"
import {getData} from "./tool/getApi.js"
import {skillChart} from "./tool/skills_chart.js"
import {expChart} from "./tool/exp_chart.js"
import {Logout} from "./tool/logout.js"
export default class Student {
    constructor(){
        this.token = localStorage.getItem("jwt")
        document.title = "Student"
        this.id = null
        this.name = null
        this.transactionData = null
        this.fetchData()
        .then(() => {
            this.main()
        }
        )
    }
    main(){
    expChart(chartData(this.transactionData),120)
    skillChart( convertDataToSkillData(this.basicskill))
    Logout()
    }
     makeBox(){
        return`
        <p>${this.id},${this.name}</p>`
    }

    
    testData(){
        console.log(this.transactionData)
    }
    async fetchData(){
        const student = await getData(studentInfoData, this.token)
        this.id = student["user"][0]["id"]
        this.name = student["user"][0]["login"]
        let data = await getData(studentXpChart(this.id),this.token)
        data["transaction"].sort(function(a, b) {
            var dateA = new Date(a.createdAt);
            var dateB = new Date(b.createdAt);
            return dateA - dateB;
          });
           data["transaction"] = convertCreatedAtToNewFormat(data["transaction"]) 
        this.transactionData = data
        this.basicskill = await getData(studentBasicSkill(this.id),this.token)
    }
}