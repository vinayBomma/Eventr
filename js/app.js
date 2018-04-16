const init = new INIT();
init.startInit();


const eventName = document.getElementById('event_name');
const datePick = document.getElementById('date_pick');
const timePick = document.getElementById('time_pick');
const cardEvent = document.querySelector('.card_event_name');


eventName.addEventListener('keyup', function () {
    cardEvent.textContent = eventName.value;
});

// something.appendChild(document.createTextNode(datePick.value));


