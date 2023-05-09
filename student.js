import {studentInfoData} from "./payload.js";
export default class Student {
    constructor(){
        this.token = localStorage.getItem("jwt")
        document.title = "Student"
       
    }

   async render(){
        this.student = await this.getData(studentInfoData)
        this.id = JSON.stringify(this.student.id)
        this.name = JSON.stringify(this.student.login)
        document.getElementById("main_page").innerHTML = this.makeBox()
    }
     makeBox(){
        return`
        <p>${this.id},${this.name}</p>`
    }
    getData = async (payload) => {
        try {
            const graphqlResponse = await axios.post(
                'https://01.gritlab.ax/api/graphql-engine/v1/graphql',
                {
                    query: payload
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("graphqlResponse",graphqlResponse.data.data)
            const responseData = await graphqlResponse.data.data.user
                console.log(JSON.stringify(responseData[0]))
            return responseData[0]
            // Now that you have the JWT, you can use it in subsequent GraphQL requests
            // You can include the JWT in the Authorization header with Bearer authentication
        }catch (error) {
            console.error('Error:', error.response.data.message);
            // Display appropriate error message if credentials are invalid
            // You can handle the error here and display it on your login page
        }
    }
}