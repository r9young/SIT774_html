const btn = document.getElementById('btn');
const output = document.querySelector('.output');

const attime = document.getElementById('attime');
const ondate = document.getElementById('ondate');
const iso = document.getElementById('iso');



btn.addEventListener('click', outputMessage);


let count = 1;

function outputMessage(e) {
    e.preventDefault();
    let data = new Date();
    output.style.display = 'block';
    attime.textContent = `At time: ${data.toTimeString()}`;
    ondate.textContent = `On date: ${data.toDateString()}`;
    iso.textContent = `The date in ISO format: ${data.toISOString()}`;

    output.onmouseover = function() {
        output.classList.add('output-visible');
    };

    output.onmouseout = function() {
        output.classList.remove('output-visible'); 
    };



  
    if (count < 4 ) {
        btn.textContent = `Try again... Press ${count} times`;
    } else if (count < 5) {
        btn.textContent = `Try again... Press ${count} times`;
        output.style.display = 'none';
    } else {
        console.log (`${count} times`)
        count = 0;
        btn.textContent = "Click to Restart"
        output.style.display = 'none';
    }

    count ++;

}
