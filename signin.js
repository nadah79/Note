function displayPassword(){
    let eye = document.getElementById("eye-slash");
    let eyeSlash = document.getElementById("eye");
    eye.classList.remove("hide-eye");
    eyeSlash.classList.remove("hide-eye");

    let txtPassword = document.getElementById("password");
    if(txtPassword == undefined) return;
    if(txtPassword.type === "password"){
        txtPassword.type = "text";
        document.getElementById("eye").classList.add("hide-eye");
    }else{
        txtPassword.type = "password";
        document.getElementById("eye-slash").classList.add("hide-eye");
    }
}

function login(){
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users = getUsers();
    if(users == null) return;

    let existedUser = getUserCredential(email, password, users);
    if(existedUser == null){
        alert("Invalid Email or Password, please try again");
        return;
    }
    localStorage.setItem("User", JSON.stringify(existedUser));
    location.href = "file:///D:/iti/JS/proj_note/profile.html";

}

function getUsers(){
    let users = [];
    let usersKeyValue = localStorage.getItem("Users");
    if(usersKeyValue == null){
        alert("Your data doesn't exist please signup to login");
        return null;
    }
    users = JSON.parse(usersKeyValue);
    return users;
}

function getUserCredential(email, password, users){
    let existedUser = null;
    for (let index = 0; index < users.length; index++) {
        const user = users[index];
        if(user.email == email && user.password == password){
            existedUser = user;
            break;
        }
    }
    return existedUser;
}