const btn = document.getElementById('btn');
const output = document.querySelector('.output');

const attime = document.getElementById('attime');
const ondate = document.getElementById('ondate');
const iso = document.getElementById('iso');



btn.addEventListener('click', outputMessage);

function outputMessage() {
    let data = new Date();
    output.style.display = 'block';
    attime.textContent = `At time: ${data}`;
    ondate.textContent = `On date: ${data.toLocaleString()}`;
    iso.textContent = `The date in ISO formate: ${data.toISOString()}`;
}