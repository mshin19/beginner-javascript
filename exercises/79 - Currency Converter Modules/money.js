import currencies from './currencies.js';
import { generateOptions } from './util.js';
import { handleInput } from './handler.js';
import { fromSelect, toSelect } from './elements.js';


const form = document.querySelector('.app form');

const optionsHTML = generateOptions(currencies);
//populate the options element
fromSelect.innerHTML = optionsHTML;
toSelect.innerHTML = optionsHTML;

form.addEventListener('input', handleInput);

