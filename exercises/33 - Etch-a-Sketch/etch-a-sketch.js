// Select the elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 10; //all caps because this value will never change.

// Setup our canvas for drawing
// make variable called height and width from the same properties on our canvas.
const { width, height } = canvas; //this is Destructuring

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
// create random x and y starting points on the canvas

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
ctx.beginPath(); //start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// write a draw function. We pass "options" because the object has too many options.
function draw(options) {
    hue += 5;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    console.log(options);
    //start the path
    ctx.beginPath();
    ctx.moveTo(x, y);
    //move our x and y values depending on what the user did
    //x -= MOVE_AMOUNT; // x = x - 10
    //y -= MOVE_AMOUNT;
    switch (options.key) {
        case 'ArrowUp': y -= MOVE_AMOUNT;
        break;
        case 'ArrowRight': x += MOVE_AMOUNT;
        break;
        case 'ArrowDown': y += MOVE_AMOUNT;
        break;
        case 'ArrowLeft': x -= MOVE_AMOUNT;
        break;
    };
    ctx.lineTo(x, y);
    ctx.stroke();
}


// write a handler for the keys
function handleKey(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault(); //because arrow keys move page by default
        draw({ key: e.key });
        console.log(e.key);
        console.log('HANDLING KEY');
    }
}

// clear/shake function
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0,0, width, height);
    canvas.addEventListener('animationend', function() {
        canvas.classList.remove('shake');
    })
}


// listen for arrow keys
window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);


