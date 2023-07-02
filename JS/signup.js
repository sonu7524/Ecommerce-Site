let form = document.querySelector(".form");
let firstName = document.querySelector("#first-name");
let lastName = document.querySelector("#last-name");
let email = document.querySelector("#email");
let pass = document.querySelector("#password");
let confPass = document.querySelector("#conf-password");
var message = document.getElementById('message');
let userArray = [];
let emailArray = [];

let navLogin = document.querySelector("#login > a");
if (localStorage.length != 0) {
  navLogin.setAttribute("href", "../HTML/login.html");
} else {
  navLogin.setAttribute("href", "../HTML/signup.html");
}

// Event listener for the form on submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (pass.value === confPass.value) {
    let user = {};
    user.firstName = firstName.value;
    user.lastName = lastName.value;
    user.email = email.value;
    user.pass = pass.value;

    if (localStorage.length == 0) {
      userArray.push(user);
      localStorage.setItem("usersData", JSON.stringify(userArray));

      emailArray.push(email.value);
      localStorage.setItem("userEmails", JSON.stringify(emailArray));

      message.textContent = "Your account has been added!!";
      message.style.color = "green";

      setInterval(()=>{
        location.href = "../HTML/login.html";
      },2000);
      
    } else {
      if (!userExists(email.value)) {
        let tempArr = JSON.parse(localStorage.getItem("usersData"));
        tempArr.push(user);
        localStorage.setItem("usersData", JSON.stringify(tempArr));

        let emArray = JSON.parse(localStorage.getItem("userEmails"));
        emArray.push(email.value);
        localStorage.setItem("userEmails", JSON.stringify(emArray));
        message.textContent = "Your account has been added!!";
      message.style.color = "green";

      setInterval(()=>{
        location.href = "../HTML/login.html";;
      },2000);
        
      } else {
        message.textContent = `User with Email-id : ${email.value} already exists!`;
        message.style.color = "red";
        form.reset();
      }
    }
  } else {
    message.textContent = "Password and Confirm password does not match!!!";
        message.style.color = "red";
    form.reset();
  }
});

// function to check if the email id enterd by the user already exists in the local storage
function userExists(email) {
  let tempEmail = JSON.parse(localStorage.getItem("userEmails"));
  let mail = tempEmail.find(m => m === email )
  if(mail) return true;
  return false;
}

// event listener to hide the navabr if the user click the form and navbar is opened
form.addEventListener("click", () => {
  if (window.innerWidth < 920 && links.classList.contains("responsive")) {
    links.className = "";
  }
});
