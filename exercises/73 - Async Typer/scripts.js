function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomBetween(min = 20, max = 150) {
    return Math.floor(Math.random() * (max - min) + min);
}

//async for of loop
// async function draw(element) {
//     console.log(element);
//     const text = element.textContent;
//     let soFar = '';
//     for (const letter of text) {
//         soFar = soFar + letter;
//         element.textContent = soFar;
//         const { typeMin, typeMax } = element.dataset;
//         const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
//         await wait(amountOfTimeToWait);
//     }
    
// }

//recursion


const els = document.querySelectorAll('[data-type]');

els.forEach(el => draw(el));

