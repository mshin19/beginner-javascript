import { convert } from './lib.js';
import { fromInput, fromSelect, toAmount, toSelect } from './elements.js';

export async function handleInput(e) {
  const rawAmount = await convert(fromInput.value, fromSelect.value, toSelect.value);
  const formattedAmount = 
  toAmount.textContent = rawAmount;
}
