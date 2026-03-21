//Steps 
// (1) listen for when somebody types something in the input and hits submit, 
// (2) keep track of all of the shopping list items and whether or not they are complete, and
// (3) render out the list of items

const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// We need an array to hold our state.
let items = [];

function handleSubmit(e) {
    e.preventDefault();
    const name = e.currentTarget.item.value; //the .item is because we grabbed the form and we need the input
    //if it is emplty, then don't run the following
    if (!name) return;
    const item = {
        name: name,
        id: Date.now(),
        complete: false,
    };
    //push the items into our state
    items.push(item);
    console.log(`There are now ${items.length} items in your state`);
    //clear the form
    //e.currentTarget.item.value = '';
    e.target.reset();
    //displayItems(); removed because it gets messy when 2 functions are too tied together
    //fire off a custom event that will tell anyone else who cares that the items have been updated
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
    console.log(items);
    const html = items.map(item => `<li class="shopping-item">
        <input 
        value="${item.id}" 
        type="checkbox"
        ${item.complete} ? 'checked' : ''>
        <span class="itemName">${item.name}</span>
        <button
        value="${item.id}">&times;</button>
        </li>`).join('');
    list.innerHTML = html;
}

function mirrorToLocalStorage() {
    console.log('Saving items to LS');
    localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
    console.log('Restoring from LS');
    //pull the items from LS
    const lsItems = JSON.parse(localStorage.getItem('items'));
    if (lsItems && lsItems.length) {
        items.push(...lsItems);
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
}

function deleteItem(id) {
    console.log(`DELETING ITEM`, id);
    //update our items array without this one
    items = items.filter(item => item.id !== id); 
    list.dispatchEvent(new CustomEvent('itemsUpdated'));

}

function markAsComplete(id) {

}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
//Event Delegation: We listen for the click on the list <ul> but then delegate the click over to the button if that is what was clicked
list.addEventListener('click', function(e) {
    if (e.target.matches('button')) {
        deleteItem(parseInt(e.target.value));
    }
    if (e.target.matches('input[type="checkbox"]')) {
        markAsComplete(parseInt(e.target.value));
    }
})

restoreFromLocalStorage();
