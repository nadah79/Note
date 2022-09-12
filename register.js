
function onFormSubmit(){
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    if(password != confirmPassword){
        alert("Password doesn't match confirm password");
        return;
    }
    let id = 'id' + (new Date()).getTime();
    let user = { id: id, name: name, email: email, password: password };
    let existedEmail = checkEmailAlreadyExisted(user.email);
    if(existedEmail){
        alert("This Email already founded before, please enter another one");
        return;
    }
    saveNewUser(user);
    alert('Your Registeration successfully');
    location.href = "file:///D:/iti/JS/proj_note/profile.html";
}

function checkEmailAlreadyExisted(email){
    let existed = false;
    let usersKey = localStorage.getItem("Users");
    if(usersKey == null){
        return existed;
    }

    let users = JSON.parse(usersKey);
    for (let index = 0; index < users.length; index++) {
        const user = users[index];
        if(user.email == email){
            existed = true;
            break;
        }
    }

    return existed;
}

function saveNewUser(user){
    let users = [];
    let usersKey = localStorage.getItem("Users");
    if(usersKey == null){
        users.push(user);
    }else{
        users = JSON.parse(usersKey);
        users.push(user);
    }

    localStorage.setItem("Users", JSON.stringify(users));
}