const fromSelect = document.querySelector('[name="from_currency"]');
const toSelect = document.querySelector('[name="to_currency"]');
const fromInput = document.querySelector('[name="from_amount"]');
const toAmount = document.querySelector('.to_amount');
const form = document.querySelector('.app form');
const endpoint = 'https://api.apilayer.com/exchangerates_data/latest';
const ratesByBase = {};

const myHeaders = new Headers();
myHeaders.append("apikey", "91Pb7D4nulg8KFNDv5u9EDpw5tN8qysP");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

// fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols={symbols}&base={base}`, requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));


const currencies = {
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
  EUR: 'Euro',
};

function generateOptions(options) {
  return Object.entries(options)
  .map(([currencyCode, currencyName]) => {
    return `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`;
  })
  .join('');
}

async function fetchRates(base = 'USD') {
  const response = await fetch(`${endpoint}?base=${base}`, requestOptions);
  const rates = await response.json();
  return rates;
}

async function convert(amount, from, to) {
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

async function handleInput(e) {
  const rawAmount = await convert(fromInput.value, fromSelect.value, toSelect.value);
  const formattedAmount = 
  toAmount.textContent = rawAmount;
}

const optionsHTML = generateOptions(currencies);
//populate the options element
fromSelect.innerHTML = optionsHTML;
toSelect.innerHTML = optionsHTML;

form.addEventListener('input', handleInput);

