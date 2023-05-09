export default class Student {
    constructor(){
        this.token = localStorage.getItem("jwt")
        document.title = "Student"
    }
    render(){
        return `
        <p>Student</p>
        <p>Token: ${this.token}</p>
        `
    }

    getData = async (payload) => {
        console.log("payload",payload)
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
            const responseData = await graphqlResponse.data.data.user[0]

            console.log(this.readData(responseData))
            // Now that you have the JWT, you can use it in subsequent GraphQL requests
            // You can include the JWT in the Authorization header with Bearer authentication
        }catch (error) {
            console.error('Error:', error.response.data.message);
            // Display appropriate error message if credentials are invalid
            // You can handle the error here and display it on your login page
        }
    }
    readData(data) {
        console.log("data", JSON.stringify(data));
        return `
        <p>Student</p>
        <p>data: ${JSON.stringify(data)}</p>`;
    }
}