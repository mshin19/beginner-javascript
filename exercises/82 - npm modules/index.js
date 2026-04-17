import wait from 'waait';
import { format } from 'date-fns';
import axios from 'axios';


async function go() {
    console.log('Going!');
    await wait(200);
    console.log('Waiting');
}

const date = new Date();

const formatted = format(date, `LLLL 'the' do y`);
console.log(formatted);

async function getJoke() {
    const res = await axios.get('https://icanhazdadjoke.com/',
    {
        headers: {
            Accept: 'application/json'
        }
    });
    console.log(res);
}

getJoke();