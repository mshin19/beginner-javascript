export function generateOptions(options) {
  return Object.entries(options)
  .map(([currencyCode, currencyName]) => {
    return `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`;
  })
  .join('');
}