let inrPayment;
if (localStorage.getItem("currentUser") !== null) {
  if (localStorage.getItem("cart") !== null) {
    let userName = document.querySelector("#userName");
    let emailArr = JSON.parse(localStorage.getItem("userEmails"));
    let userIndex = emailArr.indexOf(localStorage.getItem("currentUser"));
    let userData = JSON.parse(localStorage.getItem("usersData"));
    userName.innerText = `${userData[userIndex].firstName} ${userData[userIndex].lastName}`;

    let profile = document.querySelector(".userTag");
    profile.style.cursor = "pointer";
    profile.addEventListener("click", () => {
      location.href = "../HTML/profile.html";
    });

    let links = document.querySelector("#links");
    let ps = document.querySelector(".shopUI");
    ps.addEventListener("click", () => {
      if (window.innerWidth < 1000 || window.innerHeight < 790) {
        if (links.classList.contains("responsive")) {
          links.className = "";
        }
      }
    });

    // Event listener for the logout button
    let logout = document.querySelector("#logout");
    logout.style.cursor = "pointer";
    logout.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      location.href = "../index.html";
    });

    itemPreviewPrinter();
    summaryListPrinter();
    inrPayment = Number.parseInt(totalPrinter());

    let payBtn = document.querySelector("#payBtn");
    payBtn.addEventListener("click", (e) => {
      e.preventDefault();
      var options = {
        key: "rzp_test_xV39ZNbgU1Du4V", // Enter the Key ID generated from the Dashboard
        amount: inrPayment * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Collection Store Payment",
        description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        theme: {
          color: "#122620",
        },
        image: "https://cdn-icons-png.flaticon.com/128/891/891419.png",
        handler: function () {
          location.href = "../HTML/shop.html";
        },
        options: {
          checkout: {
            method: {
              netbanking: 0,
              card: 0,
              upi: 1,
              wallet: 0,
            },
          },
        },
      };

      var rzpy1 = new Razorpay(options);
      rzpy1.open();
      localStorage.removeItem("cart");
    });
  } else {
    location.href = "../HTML/shop.html";
  }
} else {
  location.href = "../index.html";
}

function itemPreviewPrinter() {
  let itemDiv = document.querySelector(".items");
  let child = itemDiv.lastElementChild;
  while (child) {
    itemDiv.removeChild(child);
    child = itemDiv.lastElementChild;
  }

  let cartArr = JSON.parse(localStorage.getItem("cart"));
  for (i in cartArr) {
    let prodDiv = productPosterDiv(cartArr[i].details);
    itemDiv.appendChild(prodDiv);
  }
}

function summaryListPrinter() {
  let itemSummary = document.querySelector(".itemSummary");
  let child = itemSummary.lastElementChild;
  while (child) {
    itemSummary.removeChild(child);
    child = itemSummary.lastElementChild;
  }

  let cartArr = JSON.parse(localStorage.getItem("cart"));
  for (i in cartArr) {
    let itemDiv1 = summaryListDiv(cartArr[i].details, cartArr[i].quantity);
    itemSummary.appendChild(itemDiv1);
  }
}

function totalPrinter() {
  let dollar = document.querySelector(".dollar");
  let inr = document.querySelector(".inr");
  let totalInDollar = 0;
  let cartArr = JSON.parse(localStorage.getItem("cart"));
  for (i in cartArr) {
    let itemPrice = cartArr[i].details.price;
    let itemQty = cartArr[i].quantity;
    totalInDollar = totalInDollar + itemQty * itemPrice;
  }
  dollar.innerText = "Total";
  let totalInRupees = 82.10 * totalInDollar;
  inr.innerText = `Rs.${totalInRupees.toFixed(2)}`;
  return totalInRupees;
}

// function summaryListDiv(prod, qty) {
//   let div11 = document.createElement("div");
//   div11.className = "summaryList";

//   // for item description
//   let div12 = document.createElement("div");
//   div12.className = "desc";
//   div12.innerText = `${prod.title}`;
//   div11.appendChild(div12);

//   let div14 = document.createElement("div");
//   div14.className = "itemRate";
//   div14.innerText = `$${prod.price}`;
//   div11.appendChild(div14);

//   return div11;
// }
function summaryListDiv(prod, qty) {
  let div11 = document.createElement("div");
  div11.className = "summaryList";

  // for item description and item rate
  let div12 = document.createElement("div");
  div12.className = "desc";
  div12.style.display = "flex";
  div12.style.justifyContent = "space-between";

  let titleSpan = document.createElement("span");
  titleSpan.innerText = `${prod.title}`;

  let priceSpan = document.createElement("span");
  priceSpan.innerText = `$${prod.price}`;

  div12.appendChild(titleSpan);
  div12.appendChild(priceSpan);

  div11.appendChild(div12);

  return div11;
}


function productPosterDiv(prod) {
  // Creating product poster
  let div1 = document.createElement("div");
  div1.className = "productPoster";

  // creating product poster childs
  // Image div
  let div2 = document.createElement("div");
  div2.className = "prodImage";
  div2.style.backgroundImage = `url("${prod.image}")`;
  div1.appendChild(div2);

  // Product title div
  let div3 = document.createElement("div");
  div3.className = "prodTitle";
  let text1 = document.createTextNode(prod.title.slice(0, 50));
  div3.appendChild(text1);
  div1.appendChild(div3);

  // Product price div
  let div4 = document.createElement("div");
  div4.className = "prodPrice";
  // Price tag div
  let div5 = document.createElement("div");
  div5.className = "priceTag";
  let text2 = document.createTextNode(`$${prod.price}`);
  div5.appendChild(text2);
  div4.appendChild(div5);
  // size tag div
  let div6 = document.createElement("div");
  div6.className = "sizeTag";
  let text3 = document.createTextNode(prod.size.toUpperCase());
  div6.appendChild(text3);
  div4.appendChild(div6);
  // appending both divs
  div1.appendChild(div4);

  // color div
  let div7 = document.createElement("div");
  div7.className = "prodColor";
  let text4 = document.createTextNode(`${prod.color.toUpperCase()}`);
  div7.appendChild(text4);
  div7.style.color = `${prod.color.toLowerCase()}`;
  div1.appendChild(div7);

  // rating div
  let div8 = document.createElement("div");
  div8.className = "prodRating";
  let text5 = document.createTextNode(`Rating: ${prod.rating.rate}/5`);
  div8.appendChild(text5);
  div1.appendChild(div8);

  // add to cart div
  let div9 = document.createElement("div");
  div9.className = "removeFromCart";
  div9.innerText = "Remove from Cart";
  div9.style.cursor = "pointer";
  div9.addEventListener("click", () => {
    removeFromCart(prod);
  });

  div1.appendChild(div9);

  return div1;
}

// function to remove the item form cart
function removeFromCart(prod) {
  console.log(prod);
  let cartArr = JSON.parse(localStorage.getItem("cart"));
  for (i in cartArr) {
    if (cartArr[i].details.id === prod.id) {
      delete cartArr[i];
      break;
    }
  }

  let tempArr = [];
  for (i in cartArr) {
    if (cartArr[i] == null || cartArr[i] == undefined) {
      continue;
    } else {
      tempArr.push(cartArr[i]);
    }
  }

  localStorage.setItem("cart", JSON.stringify(tempArr));
  itemPreviewPrinter();
  summaryListPrinter();
  inrPayment = Number.parseInt(totalPrinter());

  if (JSON.parse(localStorage.getItem("cart")).length == 0) {
    location.href = "../HTML/shop.html";
  }
}
