
async function func(){
  const res = await fetch(`home/userinfo`);
  const data = await res.json();
  // console.log(data[0]);
  return data[0];
}

function insertBalance(currency){
  let coinName;
  switch(currency){
    case 'btc': coinName = 'Bitcoin'; break;
    case 'eth': coinName = 'Etherium'; break;
    case 'usd': coinName = 'US Dollars'; break;
  }
  func().then(data => {
    const parent = document.getElementById(`${currency}b`);
    let balance = data[`${currency}_balance`];
    let text = `${coinName} Balance \n ${balance} ${currency.toUpperCase()}`;
    const textNode = document.createTextNode(text);
    parent.appendChild(textNode);
  });
}

for(let symbol of ['btc', 'eth', 'usd']){
  insertBalance(symbol);
}



function convert(a, b){
  let valOfA = rateObj[a];
  let valOfB = rateObj[b];
  return valOfA / valOfB;
}
