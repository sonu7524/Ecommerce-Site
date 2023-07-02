if (localStorage.getItem("currentUser") !== null) {
    let logout = document.querySelector("#logoutButton");
    logout.style.cursor = "pointer";
    logout.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      location.href = "../index.html";
    });
  
    let form = document.querySelector(".form");
    let firstName = document.querySelector("#first-name");
    let lastName = document.querySelector("#last-name");
    let email = document.querySelector("#email");
    let oldPass = document.querySelector("#old-password");
    let newPass = document.querySelector("#password");
    let confPass = document.querySelector("#conf-password");
  
    let userIndex = displayValuesInForm();
  
    function displayValuesInForm() {
      let currentUserEmail = localStorage.getItem("currentUser");
  
      let tempEmailArray = JSON.parse(localStorage.getItem("userEmails"));
      let userIndex = tempEmailArray.indexOf(currentUserEmail);
  
      let tempUserData = JSON.parse(localStorage.getItem("usersData"));
  
      let currentUserObj = {};
      currentUserObj.fName = tempUserData[userIndex].firstName;
      currentUserObj.lName = tempUserData[userIndex].lastName;
      currentUserObj.pass = tempUserData[userIndex].pass;
      currentUserObj.email = tempUserData[userIndex].email;
  
      firstName.value = currentUserObj.fName;
      lastName.value = currentUserObj.lName;
      email.value = currentUserObj.email;
      oldPass.value = currentUserObj.pass;
  
      return userIndex;
    }
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let tempEmailArray = JSON.parse(localStorage.getItem("userEmails"));
  
      console.log(tempEmailArray);
      console.log(tempEmailArray[userIndex] === email.value);
  
      if (tempEmailArray[userIndex] === email.value) {
        if (newPass.value === confPass.value) {
          let tempUserData = JSON.parse(localStorage.getItem("usersData"));
          tempUserData[userIndex].firstName = firstName.value;
          tempUserData[userIndex].lastName = lastName.value;
          tempUserData[userIndex].pass =
            newPass.value == "" ? tempUserData[userIndex].pass : newPass.value;
          tempUserData[userIndex].email = email.value;
          localStorage.setItem("usersData", JSON.stringify(tempUserData));
  
          tempEmailArray[userIndex] = tempUserData[userIndex].email;
          localStorage.setItem("userEmails", JSON.stringify(tempEmailArray));
  
          localStorage.setItem("currentUser", tempUserData[userIndex].email);
  
          location.reload();
  
          alert("Your details have been updated!!!");
        } else {
          alert("Two Password does not match!!!");
  
          location.reload();
        }
      } else {
        if (tempEmailArray.indexOf(email.value) < 0) {
          if (newPass.value === confPass.value) {
            let tempUserData = JSON.parse(localStorage.getItem("usersData"));
            tempUserData[userIndex].firstName = firstName.value;
            tempUserData[userIndex].lastName = lastName.value;
            tempUserData[userIndex].pass =
              newPass.value == "" ? tempUserData[userIndex].pass : newPass.value;
            tempUserData[userIndex].email = email.value;
            localStorage.setItem("usersData", JSON.stringify(tempUserData));
  
            tempEmailArray[userIndex] = tempUserData[userIndex].email;
            localStorage.setItem("userEmails", JSON.stringify(tempEmailArray));
  
            localStorage.setItem("currentUser", tempUserData[userIndex].email);
  
            location.reload();
  
            alert("Your details have been updated!!!");
          } else {
            alert("Two Password does not match!!!");
  
            location.reload();
          }
        } else {
          alert("User email already exists!!!");
          location.reload();
        }
      }
    });
  
    form.addEventListener("click", () => {
      if (window.innerWidth < 920 && links.classList.contains("responsive")) {
        links.className = "";
      }
    });
  } else {
    location.href = "../index.html";
  }
  