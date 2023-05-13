
export default class Login  {
    constructor(){
        document.title = "Login"
    }

    render(){
        return `
        <div id="login_page" class="login_page">
            <h1>Login</h1>
            <form id="login_form"">
                <div class="form_input">
                <input type="text" name="username" id="username" placeholder="username">
                </div>
                <div class="form_input">
                <input type="password" name="password" id="password" placeholder="password">
                </div>
                <br>
                <div class="form_submit">
                <input type="submit" value="Login">
                </div>
            </form>
        </div>
                `
    }

    handleLogin = (e) => {
        e.preventDefault()

        let username = e.target.username.value
        let password = e.target.password.value
        let user = {username, password}
        console.log("user",user.username)
        this.login(user)
    }
    login = async (user) => {
        const username = user.username;
        const password = user.password;
        try {
            // Send a request to authenticate the user and obtain the JWT
            const response = await axios.post(
                'https://01.gritlab.ax/api/auth/signin',
                {},
                {
                    auth: {
                        username: username,
                        password: password
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("response",response)
            const jwt = response.data;
            localStorage.setItem('jwt', jwt);
            location.reload()
           
        } catch (error) {
            alert("Wrong username or password")
            console.error('Error:', error.response.data.message);
            // Display appropriate error message if credentials are invalid
            // You can handle the error here and display it on your login page
        }
       /*  navigateTo("/student") */
    }
    
}