const apiUrl = 'http://localhost:3000/api/user';

async function signUp(event) {
    event.preventDefault();

    const username = document.getElementById('userName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;


    const user = { username, email, phone, password };

    try {
        const response =  await axios.post(`${apiUrl}/signup`, user);
        console.log("User created successfully");
        alert(response.data.message);

        window.location.href = "/login";
    } catch (error) {
        console.error("Unable to SignUp:", error);
    }

    event.target.reset();
}