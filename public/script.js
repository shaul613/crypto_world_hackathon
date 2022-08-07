const navbar = document.getElementById("sticky");
const ul = document.getElementById("navbar-menu");
window.onscroll = function () {
  if (window.pageYOffset >= menubar.pageYOffTop) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};
// callapinavbar();
const livenavbar = document.getElementById("livebar");

async function func() {
  const res = await fetch(`home/userinfo`);
  const data = await res.json();
  // console.log(data[0]);
  return data[0];
}

function insertBalance(currency) {
  let coinName;
  switch (currency) {
    case "btc":
      coinName = "Bitcoin";
      break;
    case "eth":
      coinName = "Etherium";
      break;
    case "usd":
      coinName = "US Dollars";
      break;
  }
  func().then((data) => {
    const parent = document.getElementById(`${currency}b`);
    let balance = data[`${currency}_balance`];
    let text = `${coinName} Balance \n ${balance} ${currency.toUpperCase()}`;
    const textNode = document.createTextNode(text);
    parent.appendChild(textNode);
  });
}

for (let symbol of ["btc", "eth", "usd"]) {
  insertBalance(symbol);
}
async function callapinavbar() {
  try {
    const api = await fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC,ETH`
    );
    if (api.status !== 200) {
      console.log(error);
    } else {
      const navbarapi = await api.json();
      console.log(navbarapi);
      livenavbar.textContent = `From USD to BTC: ${navbarapi.BTC} and ETH: ${navbarapi.ETH}`;
      return navbarapi;
    }
  } catch (error) {
    console.log(error);
  }
}
async function callapi(list1, list2) {
  try {
    const api = await fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${list1}&tsyms=${list2}`
    );
    if (api.status !== 200) {
      console.log(error);
    } else {
      const codes = await api.json();
      console.log();
      return codes;
    }
  } catch (error) {
    console.log(error);
  }
}

console.log();
document.querySelector("#transaction").addEventListener("submit", buy);
function buy(e) {
  e.preventdefault();
  const number = document.getElementById("input_num").value;
  const list1 = document.getElementById("cryptocode1").value;
  const list2 = document.getElementById("cryptocode2").value;
  const apiResponce = document.getElementById("dontdisplay").value;
  const code = callapi(list1, list2)
    .then((res) => console.log(res[list2] * number))
    .then((res) => apiResponce.setAttribute("value", res));
}

async function func() {
  const res = await fetch(`home/userinfo`);
  const data = await res.json();
  // console.log(data[0]);
  return data[0];
}

function insertBalance(currency) {
  let coinName;
  switch (currency) {
    case "btc":
      coinName = "Bitcoin";
      break;
    case "eth":
      coinName = "Etherium";
      break;
    case "usd":
      coinName = "US Dollars";
      break;
  }
  func().then((data) => {
    const parent = document.getElementById(`${currency}b`);
    let balance = data[`${currency}_balance`];
    let text = `${coinName} Balance \n ${balance} ${currency.toUpperCase()}`;
    const textNode = document.createTextNode(text);
    parent.appendChild(textNode);
  });
}

for (let symbol of ["btc", "eth", "usd"]) {
  insertBalance(symbol);
}

function convert(a, b) {
  let valOfA = rateObj[a];
  let valOfB = rateObj[b];
  return valOfA / valOfB;
}
const sendLogin = (e) => {
  e.preventdefault();
  const username = req.body.username; //username provided
  const password = req.body.password; //password provided

  fetch("/login_fail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const root = document.getElementById("root");
      root.innerText = data.msg;
    })
    .catch((e) => {
      console.log(e);
    });
};

const sendPostData = (e) => {
  e.preventdefault();
  saveUser(
    req.body.fname,
    req.body.lname,
    req.body.email,
    req.body.username,
    req.body.password
  );

  fetch("/signup_err", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ saveUser }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const root = document.getElementById("root");
      root.innerText = data.msg;
    })
    .catch((e) => {
      console.log(e);
    });
};
const signupform = document
  .getElementById("signup")
  .addEventListener("submit", sendPostData);
const loginform = document
  .getElementById("login")
  .addEventListener("submit", sendLogin);
function setTwoNumberDecimal(event) {
  this.value = parseFloat(this.value).toFixed(4);
}
