const myHeaders = new Headers();
myHeaders.append("apikey", "91Pb7D4nulg8KFNDv5u9EDpw5tN8qysP");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const endpoint = 'https://api.apilayer.com/exchangerates_data/latest';
const ratesByBase = {};

export async function fetchRates(base = 'USD') {
  const response = await fetch(`${endpoint}?base=${base}`, requestOptions);
  const rates = await response.json();
  return rates;
}

export async function convert(amount, from, to) {
  //first check if we even have the rates to convert from that currency
  if(!ratesByBase[from]) {
    console.log(`Oh no, we dont have ${from} to convert to ${to}. Lets get it!`);
    const rates = await fetchRates(from);
    console.log(rates);
    //store them for next time
    ratesByBase[from] = rates;
  }
  //convert that amount that they passed in
  const convertedAmount = amount * ratesByBase[from].rates[to];
  return convertedAmount;

}
