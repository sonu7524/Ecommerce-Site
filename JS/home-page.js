// If the user is already logged in the then the user will
// automatically diverted to the shopping portal

if (localStorage.getItem("currentUser") === null) {
    // Event listner for the login button there is no data in local storage
    // this button will divert the user to signup only
    // this implement the first time usr functionality
    let loginButton = document.querySelector("#login-button");
    loginButton.style.cursor = "pointer";
    loginButton.addEventListener("click", () => {
      if (localStorage.length != 0) {
        location.href = "../HTML/login.html";
      } else {
        location.href = "../HTML/signup.html";
      }
    });
  
    // Same for the nav bar login button
    let navLogin = document.querySelector("#login > a");
    if (localStorage.length != 0) {
      navLogin.setAttribute("href", "../HTML/login.html");
    } else {
      navLogin.setAttribute("href", "../HTML/signup.html");
    }
  
    // Event listener for signup button
    let signupButton = document.querySelector("#signup-button");
    signupButton.style.cursor = "pointer";
    signupButton.addEventListener("click", () => {
      location.href = "../HTML/signup.html";
    });
  
    // Fetching data for the demo product of the landing page
    // let url = "https://fakestoreapi.com/products";
    // let prom = fetch(url);
  
    prom
      .then((res) => res.json())
      .then((data) => {
        let min = Math.ceil(1);
        let max = Math.floor(20);
        let num = Math.floor(Math.random() * (max - min + 1) + min);
  
        let randomProd = data[num];
  
        let image = document.querySelector(".prodImage");
        image.style.backgroundImage = `url("${randomProd.image}")`;
  
        let title = document.querySelector(".prodTitle");
        title.innerText = randomProd.title;
  
        let pricetag = document.querySelector(".priceTag");
        pricetag.innerText = `Price: $${randomProd.price}`;
  
        let rat = document.querySelector(".prodRating");
        rat.innerText = `Rating: ${randomProd.rating.rate}/5`;
      })
      .catch(() => {
        location.reload();
      });
  } else {
    location.href = "../HTML/shop.html";
  }
  