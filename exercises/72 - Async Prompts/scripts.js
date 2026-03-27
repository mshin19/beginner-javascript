function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
    popup.classList.remove('open');
    await wait(1000);
    popup.remove();
    popup = null;
}

function ask(options) {
    return new Promise(async function(resolve, reject) {
        //First we need to create a popup with all the fields in it
        const popup = document.createElement('form');
        popup.classList.add('popup');
        popup.insertAdjacentHTML('afterbegin', `
            <fieldset>
                <label>${options.title}</label>
                <input type="text" name="input"/>
                <button type="submit">Submit</button>
            </fieldset>
            `);
        //Check if they want a cancel button
        if(options.cancel) {
            const skipButton = document.createElement('button');
            skipButton.type = 'button';
            skipButton.textContent = 'Cancel';
            popup.firstElementChild.appendChild(skipButton);
            //TODO: listen for a click on that cancel button
            skipButton.addEventListener('click', function(){
                resolve(null);
                destroyPopup(popup);
            }, { once: true });
        }
        //listen for the submit event on the inputs
        popup.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Submitted!');
            console.log(e.target.input);
            resolve(e.target.input.value);
            //remove it from the DOM entirely
            destroyPopup(popup);
        }, { once: true });

        //when someone does submit it, resolve the data that was in the input box

        //insert that popup into the DOM
        document.body.appendChild(popup);
        //put a very small timeout before we add the open class
        await wait(50);
        popup.classList.add('open');
            
    });
}

async function askQuestion(e) {
    const button = e.currentTarget;
    const shouldCancel = 'cancel' in button.dataset;
    const answer = await ask({ title: button.dataset.question, cancel: shouldCancel });
    console.log(answer);
}

//select all buttons that have a question
const buttons = document.querySelectorAll('[data-question]');
buttons.forEach(button => button.addEventListener('click', askQuestion));

const questions = [
    { title: 'What is your name?' },
    { title: 'Whate is your age?', cancel: true },
    { title: 'What is your dogs name?' },
];

async function asyncMap(array, callback) {
    //make an array to store our results
    const results = [];
    //loop over our array
    for (const item of array) {
        const result = await callback(item);
        results,push(result);
    }
    //when we are done the loop, return it!
    return results;
}

// const answers = Promise.all([
//     ask(questions[0]),
//     ask(questions[1]),
//     ask(questions[2]),
// ]).then(answers => {
//     console.log(answers);
// })
// With this solution all popups appear at the same time

// Promise.all(questions.map(ask)).then(data => {
//     console.log(data);
// });

async function askMany() {
    for (const question of questions) {
        const answer = await ask(question);
        console.log(answer);
    }
}

askMany();