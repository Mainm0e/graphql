export async function getData(payload,token) {
    try {
        const graphqlResponse = await axios.post(
            'https://01.gritlab.ax/api/graphql-engine/v1/graphql',
            {
                query: payload
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        const responseData = await graphqlResponse.data.data
        // Now that you have the JWT, you can use it in subsequent GraphQL requests
        // You can include the JWT in the Authorization header with Bearer authentication
        return responseData
    }catch (error) {
        localStorage.removeItem("jwt")
        console.error('Error:', error.response.data.message);
        // Display appropriate error message if credentials are invalid
        // You can handle the error here and display it on your login page
    }
}