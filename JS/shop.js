if (localStorage.getItem("currentUser") !== null) {
  if (localStorage.getItem("cart") !== null) {
    localStorage.removeItem("cart");
  }

  // Event listener for the logout button
  let logout = document.querySelector("#logout");
  logout.style.cursor = "pointer";
  logout.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    location.href = "../index.html";
  });

  // event listener for the profile button which will redirect the user to profile page
  let profile = document.querySelector(".userTag");
  profile.style.cursor = "pointer";
  profile.addEventListener("click", () => {
    location.href = "../HTML/profile.html";
  });

  // Code to display the current user name on navbar
  let userName = document.querySelector("#userName");
  let emailArr = JSON.parse(localStorage.getItem("userEmails"));
  let userIndex = emailArr.indexOf(localStorage.getItem("currentUser"));
  let userData = JSON.parse(localStorage.getItem("usersData"));
  userName.innerText = `${userData[userIndex].firstName} ${userData[userIndex].lastName}`;

  // code to toggle the side bar in ipad and similar form factor devices
  let sidebar = document.querySelector(".sideBar");
  let filterIcon = document.querySelector("#filterBtn");
  filterIcon.style.cursor = "pointer";
  filterIcon.addEventListener("click", () => {
    if (getComputedStyle(sidebar).display == "none") {
      sidebar.classList.add("sideBarEmerge");
    } else {
      sidebar.classList.remove("sideBarEmerge");
    }
  });

  // code to toggle the side bar in mobiles
  let secondFilter = document.querySelector(".filter-For-Mobiles");
  secondFilter.style.cursor = "pointer";
  secondFilter.addEventListener("click", () => {
    if (getComputedStyle(sidebar).display == "none") {
      sidebar.classList.add("sideBarEmerge");
    } else {
      sidebar.classList.remove("sideBarEmerge");
    }
  });

  // code to automatically toggle the navbar if the user click or scroll the window.
  let links = document.querySelector("#links");
  let ps = document.querySelector(".productSide");
  ps.addEventListener("click", () => {
    if (window.innerWidth < 1000 || window.innerHeight < 790) {
      if (sidebar.classList.contains("sideBarEmerge")) {
        sidebar.classList.remove("sideBarEmerge");
      }
      if (links.classList.contains("responsive")) {
        links.className = "";
      }
    }
  });
  ps.addEventListener("scroll", () => {
    if (window.innerWidth < 1000 || window.innerHeight < 790) {
      if (sidebar.classList.contains("sideBarEmerge")) {
        sidebar.classList.remove("sideBarEmerge");
      }
      if (links.classList.contains("responsive")) {
        links.className = "";
      }
    }
  });

  // Code to display the ratingvlue in sidebar. Its value will change as the user slides the slider
  let rating = document.querySelector("#rating-range");
  let ratingData = document.querySelector("#ratingValue");
  ratingData.innerText = rating.value;
  rating.addEventListener("input", () => {
    ratingData.innerText = rating.value;
  });

  // function that will render the products that are fetched from the server
  printProducts();

  // this code will be usefull to reset the sidebar form
  let form = document.createElement("form");
  form.setAttribute("id", "dummy");
  document.body.appendChild(form);

  // code to display the results when the user clicks on filter tags
  let all = document.querySelector(".all");
  let men = document.querySelector(".men");
  let women = document.querySelector(".women");
  let jewel = document.querySelector(".jewellery");
  let elec = document.querySelector(".electronics");

  let msec = document.querySelector(".menSection");
  let wsec = document.querySelector(".womenSection");
  let esec = document.querySelector(".electronicSection");
  let jsec = document.querySelector(".jewellerySection");
  let result = document.querySelector(".results");

  // code for all filter tag
  all.style.cursor = "pointer";
  all.addEventListener("click", () => {
    if (men.classList.contains("selectedFilter")) {
      men.classList.remove("selectedFilter");
    }
    if (women.classList.contains("selectedFilter")) {
      women.classList.remove("selectedFilter");
    }
    if (jewel.classList.contains("selectedFilter")) {
      jewel.classList.remove("selectedFilter");
    }
    if (elec.classList.contains("selectedFilter")) {
      elec.classList.remove("selectedFilter");
    }

    all.classList.add("selectedFilter");
    msec.style.display = "block";
    wsec.style.display = "block";
    esec.style.display = "block";
    jsec.style.display = "block";
    result.style.display = "none";

    form.reset();
    ratingData.innerText = rating.value;
  });

  // code for men filter tag
  men.style.cursor = "pointer";
  men.addEventListener("click", () => {
    if (all.classList.contains("selectedFilter")) {
      all.classList.remove("selectedFilter");
    }
    if (women.classList.contains("selectedFilter")) {
      women.classList.remove("selectedFilter");
    }
    if (jewel.classList.contains("selectedFilter")) {
      jewel.classList.remove("selectedFilter");
    }
    if (elec.classList.contains("selectedFilter")) {
      elec.classList.remove("selectedFilter");
    }

    men.classList.add("selectedFilter");
    msec.style.display = "block";
    wsec.style.display = "none";
    esec.style.display = "none";
    jsec.style.display = "none";
    result.style.display = "none";

    form.reset();
    ratingData.innerText = rating.value;
  });

  // code for women filter tag
  women.style.cursor = "pointer";
  women.addEventListener("click", () => {
    if (all.classList.contains("selectedFilter")) {
      all.classList.remove("selectedFilter");
    }
    if (men.classList.contains("selectedFilter")) {
      men.classList.remove("selectedFilter");
    }
    if (jewel.classList.contains("selectedFilter")) {
      jewel.classList.remove("selectedFilter");
    }
    if (elec.classList.contains("selectedFilter")) {
      elec.classList.remove("selectedFilter");
    }

    women.classList.add("selectedFilter");
    msec.style.display = "none";
    wsec.style.display = "block";
    esec.style.display = "none";
    jsec.style.display = "none";
    result.style.display = "none";

    form.reset();
    ratingData.innerText = rating.value;
  });

  // code for jewel filter tag
  jewel.style.cursor = "pointer";
  jewel.addEventListener("click", () => {
    if (all.classList.contains("selectedFilter")) {
      all.classList.remove("selectedFilter");
    }
    if (men.classList.contains("selectedFilter")) {
      men.classList.remove("selectedFilter");
    }
    if (women.classList.contains("selectedFilter")) {
      women.classList.remove("selectedFilter");
    }
    if (elec.classList.contains("selectedFilter")) {
      elec.classList.remove("selectedFilter");
    }

    jewel.classList.add("selectedFilter");
    msec.style.display = "none";
    wsec.style.display = "none";
    esec.style.display = "none";
    jsec.style.display = "block";
    result.style.display = "none";

    form.reset();
    ratingData.innerText = rating.value;
  });

  // code for electronics filter tag
  elec.style.cursor = "pointer";
  elec.addEventListener("click", () => {
    if (all.classList.contains("selectedFilter")) {
      all.classList.remove("selectedFilter");
    }
    if (men.classList.contains("selectedFilter")) {
      men.classList.remove("selectedFilter");
    }
    if (women.classList.contains("selectedFilter")) {
      women.classList.remove("selectedFilter");
    }
    if (jewel.classList.contains("selectedFilter")) {
      jewel.classList.remove("selectedFilter");
    }

    elec.classList.add("selectedFilter");
    msec.style.display = "none";
    wsec.style.display = "none";
    esec.style.display = "block";
    jsec.style.display = "none";
    result.style.display = "none";

    form.reset();
    ratingData.innerText = rating.value;
  });

  // code for product search search bar
  let search = document.querySelector("#prodSearch");
  search.addEventListener("input", () => {
    let str = search.value.toLowerCase();

    let child = result.lastElementChild;
    while (child) {
      result.removeChild(child);
      child = result.lastElementChild;
    }

    if (str === "") {
      msec.style.display = "block";
      wsec.style.display = "block";
      esec.style.display = "block";
      jsec.style.display = "block";
      result.style.display = "none";
    } else {
      msec.style.display = "none";
      wsec.style.display = "none";
      esec.style.display = "none";
      jsec.style.display = "none";
      result.style.display = "flex";
      let prodArray = JSON.parse(localStorage.getItem("prodData"));
      for (obj of prodArray) {
        let s = obj.title.toLowerCase();
        if (s.includes(str)) {
          let div = productPosterDiv(obj);
          result.appendChild(div);
        }
      }
    }
  });

  // code that will eliminate highlighting of the filter tags
  search.addEventListener("click", () => {
    if (all.classList.contains("selectedFilter")) {
      all.classList.remove("selectedFilter");
    }
    if (men.classList.contains("selectedFilter")) {
      men.classList.remove("selectedFilter");
    }
    if (women.classList.contains("selectedFilter")) {
      women.classList.remove("selectedFilter");
    }
    if (jewel.classList.contains("selectedFilter")) {
      jewel.classList.remove("selectedFilter");
    }
    if (elec.classList.contains("selectedFilter")) {
      elec.classList.remove("selectedFilter");
    }

    form.reset();
    ratingData.innerText = rating.value;
  });

  // Filtering based on sidebar inputs
  // The filtering algorithm is concurrent type
  let red = document.querySelector("#color-red");
  let blue = document.querySelector("#color-blue");
  let green = document.querySelector("#color-green");
  let black = document.querySelector("#color-black");
  let orange = document.querySelector("#color-orange");
  let s = document.querySelector("#size-small");
  let m = document.querySelector("#size-medium");
  let l = document.querySelector("#size-large");
  let xl = document.querySelector("#size-extra-large");
  let price025 = document.querySelector("#price0to25");
  let price2650 = document.querySelector("#price26to50");
  let price51100 = document.querySelector("#price51to100");
  let price101 = document.querySelector("#price101Above");

  red.addEventListener("input", productFilter);
  blue.addEventListener("input", productFilter);
  green.addEventListener("input", productFilter);
  black.addEventListener("input", productFilter);
  orange.addEventListener("input", productFilter);
  s.addEventListener("input", productFilter);
  m.addEventListener("input", productFilter);
  l.addEventListener("input", productFilter);
  xl.addEventListener("input", productFilter);
  price025.addEventListener("input", productFilter);
  price2650.addEventListener("input", productFilter);
  price51100.addEventListener("input", productFilter);
  price101.addEventListener("input", productFilter);
  rating.addEventListener("change", productFilter);

  function productFilter() {
    var child = result.lastElementChild;
    while (child) {
      result.removeChild(child);
      child = result.lastElementChild;
    }
    if (all.classList.contains("selectedFilter")) {
      all.classList.remove("selectedFilter");
    }
    if (men.classList.contains("selectedFilter")) {
      men.classList.remove("selectedFilter");
    }
    if (women.classList.contains("selectedFilter")) {
      women.classList.remove("selectedFilter");
    }
    if (jewel.classList.contains("selectedFilter")) {
      jewel.classList.remove("selectedFilter");
    }
    if (elec.classList.contains("selectedFilter")) {
      elec.classList.remove("selectedFilter");
    }
    msec.style.display = "none";
    wsec.style.display = "none";
    esec.style.display = "none";
    jsec.style.display = "none";
    result.style.display = "flex";
    let paramArr = [];
    let index = [];
    let ratings = rating.value;
    let tempProds = JSON.parse(localStorage.getItem("prodData"));

    if (red.checked) {
      paramArr.push("red");
    }
    if (blue.checked) {
      paramArr.push("blue");
    }
    if (green.checked) {
      paramArr.push("green");
    }
    if (black.checked) {
      paramArr.push("black");
    }
    if (orange.checked) {
      paramArr.push("orange");
    }
    if (s.checked) {
      paramArr.push("s");
    }
    if (m.checked) {
      paramArr.push("m");
    }
    if (l.checked) {
      paramArr.push("l");
    }
    if (xl.checked) {
      paramArr.push("xl");
    }
    if (price025.checked) {
      index[0] = 25;
    }
    if (price2650.checked) {
      index[1] = 2650;
    }
    if (price51100.checked) {
      index[2] = 51100;
    }
    if (price101.checked) {
      index[3] = 101;
    }

    for (obj of tempProds) {
      if (paramArr.length != 0) {
        // Color and rating are present
        if (
          obj.rating.rate <= ratings &&
          index[0] == undefined &&
          index[1] == undefined &&
          index[2] == undefined &&
          index[3] == undefined &&
          s.checked === false &&
          l.checked === false &&
          m.checked === false &&
          xl.checked === false &&
          (red.checked === true ||
            blue.checked === true ||
            green.checked === true ||
            black.checked === true ||
            orange.checked === true) &&
          paramArr.indexOf(obj.color) != -1
        ) {
          let d = productPosterDiv(obj);
          result.appendChild(d);
        }
        // size and rating are present
        else if (
          obj.rating.rate <= ratings &&
          index[0] == undefined &&
          index[1] == undefined &&
          index[2] == undefined &&
          index[3] == undefined &&
          red.checked === false &&
          blue.checked === false &&
          green.checked === false &&
          black.checked === false &&
          orange.checked === false &&
          (s.checked === true ||
            l.checked === true ||
            m.checked === true ||
            xl.checked === true) &&
          paramArr.indexOf(obj.size) != -1
        ) {
          let d = productPosterDiv(obj);
          result.appendChild(d);
        }

        // color size and rating present
        else if (
          obj.rating.rate <= ratings &&
          index[0] == undefined &&
          index[1] == undefined &&
          index[2] == undefined &&
          index[3] == undefined &&
          (red.checked === true ||
            blue.checked === true ||
            green.checked === true ||
            black.checked === true ||
            orange.checked === true) &&
          (s.checked === true ||
            l.checked === true ||
            m.checked === true ||
            xl.checked === true) &&
          paramArr.indexOf(obj.size) != -1 &&
          paramArr.indexOf(obj.color) != -1
        ) {
          let d = productPosterDiv(obj);
          result.appendChild(d);
        }

        // color price and rating present
        else if (
          obj.rating.rate <= ratings &&
          s.checked === false &&
          l.checked === false &&
          m.checked === false &&
          xl.checked === false &&
          (index[0] != undefined ||
            index[1] != undefined ||
            index[2] != undefined ||
            index[3] != undefined) &&
          (red.checked === true ||
            blue.checked === true ||
            green.checked === true ||
            black.checked === true ||
            orange.checked === true) &&
          paramArr.indexOf(obj.color) != -1
        ) {
          if (obj.price > 0 && obj.price <= 25 && index[0] != undefined) {
            let d = productPosterDiv(obj);
            result.appendChild(d);
          } else if (
            obj.price >= 26 &&
            obj.price <= 50 &&
            index[1] != undefined
          ) {
            let d = productPosterDiv(obj);
            result.appendChild(d);
          } else if (
            obj.price >= 51 &&
            obj.price <= 100 &&
            index[2] != undefined
          ) {
            let d = productPosterDiv(obj);
            result.appendChild(d);
          } else if (obj.price >= 100 && index[3] != undefined) {
            let d = productPosterDiv(obj);
            result.appendChild(d);
          }
        }

        // color price size and rating
        else if (
          obj.rating.rate <= ratings &&
          (s.checked === true ||
            l.checked === true ||
            m.checked === true ||
            xl.checked === true) &&
          (index[0] != undefined ||
            index[1] != undefined ||
            index[2] != undefined ||
            index[3] != undefined) &&
          (red.checked === true ||
            blue.checked === true ||
            green.checked === true ||
            black.checked === true ||
            orange.checked === true) &&
          paramArr.indexOf(obj.color) != -1 &&
          paramArr.indexOf(obj.size) != -1
        ) {
          if (obj.price > 0 && obj.price <= 25 && index[0] != undefined) {
            let d = productPosterDiv(obj);
            result.appendChild(d);
          } else if (
            obj.price >= 26 &&
            obj.price <= 50 &&
            index[1] != undefined
          ) {
            let d = productPosterDiv(obj);
            result.appendChild(d);
          } else if (
            obj.price >= 51 &&
            obj.price <= 100 &&
            index[2] != undefined
          ) {
            let d = productPosterDiv(obj);
            result.appendChild(d);
          } else if (obj.price >= 100 && index[3] != undefined) {
            let d = productPosterDiv(obj);
            result.appendChild(d);
          }
        }

        //
      } else if (
        obj.rating.rate <= ratings &&
        index[0] == undefined &&
        index[1] == undefined &&
        index[2] == undefined &&
        index[3] == undefined
      ) {
        // do filtering based on rating only
        if (obj.rating.rate <= ratings) {
          let d = productPosterDiv(obj);
          result.appendChild(d);
        }
      } else if (
        obj.rating.rate <= ratings &&
        (index[0] != undefined ||
          index[1] != undefined ||
          index[2] != undefined ||
          index[3] != undefined)
      ) {
        if (obj.price > 0 && obj.price <= 25 && index[0] != undefined) {
          let d = productPosterDiv(obj);
          result.appendChild(d);
        } else if (
          obj.price >= 26 &&
          obj.price <= 50 &&
          index[1] != undefined
        ) {
          let d = productPosterDiv(obj);
          result.appendChild(d);
        } else if (
          obj.price >= 51 &&
          obj.price <= 100 &&
          index[2] != undefined
        ) {
          let d = productPosterDiv(obj);
          result.appendChild(d);
        } else if (obj.price >= 100 && index[3] != undefined) {
          let d = productPosterDiv(obj);
          result.appendChild(d);
        }
      }
    }
  }
} else {
  location.href = "../index.html";
}

// function to fetch the products from fake store api
function printProducts() {
  if (localStorage.getItem("prodData") !== null) {
    printToPage(JSON.parse(localStorage.getItem("prodData")));
  } else {
    let url = "https://fakestoreapi.com/products";
    let prom = fetch(url);

    prom
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("prodData", JSON.stringify(data));
        printToPage(data);
      });
  }
}

// function to toggle the obtained product from fake store api
function printToPage(obj) {
  for (prod of obj) {
    switch (prod.category) {
      case "men's clothing":
        mensPrinter(prod, obj);
        break;
      case "women's clothing":
        womensPrinter(prod, obj);
        break;
      case "jewelery":
        jewelleryPrinter(prod, obj);
        break;
      case "electronics":
        electronicPrinter(prod, obj);
        break;
    }
  }
}

// function to render the mens section products
function mensPrinter(prod, obj) {
  prod.color = generateColor();
  prod.size = generateSize();

  localStorage.setItem("prodData", JSON.stringify(obj));

  let prodMen = document.querySelector(".menProduct");
  let div = productPosterDiv(prod);
  prodMen.appendChild(div);
}

// function to render the womens section products
function womensPrinter(prod, obj) {
  prod.color = generateColor();
  prod.size = generateSize();

  localStorage.setItem("prodData", JSON.stringify(obj));
  let prodWomen = document.querySelector(".womenProduct");
  let div = productPosterDiv(prod);
  prodWomen.appendChild(div);
}

// function to render the jewellery section products
function jewelleryPrinter(prod, obj) {
  prod.color = generateColor();
  prod.size = generateSize();

  localStorage.setItem("prodData", JSON.stringify(obj));
  let prodJew = document.querySelector(".jewelleryProduct");
  let div = productPosterDiv(prod);
  prodJew.appendChild(div);
}

// function to render the electronic section products
function electronicPrinter(prod, obj) {
  prod.color = generateColor();
  prod.size = generateSize();

  localStorage.setItem("prodData", JSON.stringify(obj));
  let prodElec = document.querySelector(".electronicProduct");
  let div = productPosterDiv(prod);
  prodElec.appendChild(div);
}

// function to generate the random color to assign it to the fetched products from fake store api
function generateColor() {
  //Following is the mapping
  // 0 - Red
  // 1 - Blue
  // 2 - Green
  // 3 - black
  // 4 - orange
  min = Math.ceil(0);
  max = Math.floor(4);
  let num = Math.floor(Math.random() * (max - min + 1) + min);

  if (num == 0) {
    return "red";
  } else if (num == 1) {
    return "blue";
  } else if (num == 2) {
    return "green";
  } else if (num == 3) {
    return "black";
  } else if (num == 4) {
    return "orange";
  }
}

// function to generate the random size to assign it to the fetched products from fake store api
function generateSize() {
  //Following is the mapping
  // 0 - S
  // 1 - M
  // 2 - L
  // 3 - XL
  min = Math.ceil(0);
  max = Math.floor(3);
  let num = Math.floor(Math.random() * (max - min + 1) + min);

  if (num == 0) {
    return "s";
  } else if (num == 1) {
    return "m";
  } else if (num == 2) {
    return "l";
  } else if (num == 3) {
    return "xl";
  }
}

// function to actually design the DOM and return the div object to the caller
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
  div9.className = "addToCart";
  let div10 = document.createElement("div");
  div10.className = "add";
  div10.style.cursor = "pointer";
  div10.innerText = "Add To Cart";
  div10.addEventListener("click", (event) => {
    addToCart(prod, event);
  });
  div9.appendChild(div10);

  div1.appendChild(div9);

  return div1;
}

// functionality for the ad to cart button
function addToCart(prod, event) {
  let tempArr = [];
  let product = {};

  if (localStorage.getItem("cart") === null) {
    product.details = prod;
    product.quantity = 1;
    tempArr.push(product);
    localStorage.setItem("cart", JSON.stringify(tempArr));
    designAddToCartBtn(prod, event);
  } else {
    if (productExist(prod) === "true") {
      let temp1 = JSON.parse(localStorage.getItem("cart"));
      for (i in temp1) {
        if (temp1[i].details.id == prod.id) {
          temp1[i].quantity = temp1[i].quantity + 1;
          localStorage.setItem("cart", JSON.stringify(temp1));
          break;
        }
      }
    } else {
      product.details = prod;
      product.quantity = 1;
      let temp = JSON.parse(localStorage.getItem("cart"));
      temp.push(product);
      localStorage.setItem("cart", JSON.stringify(temp));
    }
    designAddToCartBtn(prod, event);
  }

  let cart = document.querySelector("#my-cart");
  cart.className = "cartDisplay";
}

function productExist(prod) {
  let temp2 = JSON.parse(localStorage.getItem("cart"));
  // console.log(temp2.length);
  for (i in temp2) {
    if (temp2[i].details.id == prod.id) {
      return "true";
    }
  }

  return "false";
}

// function to design the add to cart button when the user clicks on it
function designAddToCartBtn(prod, event1) {
  let parent = event1.target.parentElement;
  parent.childNodes[0].innerText = "Add More...";

  if (parent.childNodes.length > 1) {
    parent.removeChild(parent.lastElementChild);
    parent.removeChild(parent.childNodes[1]);
  }
  let qtyFetch = JSON.parse(localStorage.getItem("cart"));

  let quant;
  for (i in qtyFetch) {
    if (qtyFetch[i].details.id == prod.id) {
      quant = qtyFetch[i].quantity;
      break;
    }
  }
  let qtyDiv = document.createElement("div");
  let qtyText = document.createTextNode(`Qty: ${quant}`);
  parent.style.backgroundColor = "#B68D40";

  parent.style.justifyContent = "space-between";
  qtyDiv.appendChild(qtyText);
  parent.appendChild(qtyDiv);

  let remCart = document.createElement("div");
  let qtyText1 = document.createTextNode(`Remove`);
  remCart.style.cursor = "pointer";
  remCart.addEventListener("click", (event) => {
    let temp4 = JSON.parse(localStorage.getItem("cart"));
    for (x in temp4) {
      if (temp4[x].details.id === prod.id) {
        delete temp4[x];
        break;
      }
    }
    let temp5 = [];

    for (x in temp4) {
      if (temp4[x] == null || temp4[x] == undefined) {
        continue;
      } else {
        temp5.push(temp4[x]);
      }
    }

    localStorage.setItem("cart", JSON.stringify(temp5));
    let parent = event.target.parentElement;
    parent.childNodes[0].innerText = "Add To Cart";
    parent.style.backgroundColor = "#122620";
    parent.removeChild(parent.lastElementChild);
    parent.removeChild(parent.childNodes[1]);
    parent.style.justifyContent = "center";

    if (JSON.parse(localStorage.getItem("cart")).length == 0) {
      let cart = document.querySelector("#my-cart");
      cart.className = "";
    }
  });

  remCart.appendChild(qtyText1);
  parent.insertBefore(remCart, parent.childNodes[1]);
}
