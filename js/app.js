const init = new INIT();
init.startInit();

const datePick = document.getElementById('date_pick');
const timePick = document.getElementById('time_pick');
const eventName = document.getElementById('event_name');
const eventCard = document.querySelector('.event_card');
const submitBtn = document.querySelector('.submit_btn');

let card, card_div, card_sub_div, event_title, event_date_counter;

//----------------------- Create Div Structure --------------------------------

function createDivStructure() {
    card = document.createElement('div');
    card_div = document.createElement('div');
    card_sub_div = document.createElement('div');

    card.className = 'col s6';
    card_div.className = 'card blue-grey darken-1 hoverable card_height';
    card_sub_div.className = 'card-content white-text';
    card_div.appendChild(card_sub_div);
    card.appendChild(card_div);
}

// -------------------------------  Adding Event -----------------------------------

function addEvent() {
    event_date_counter = document.createElement('p');
    event_date_counter.className = 'center-align card_date_counter';
    event_date_counter.setAttribute('margin', '-1% -10% 0 -10%');
    event_date_counter.appendChild(document.createTextNode(datePick.value));

    event_title = document.createElement('p');
    event_title.className = 'center-align card_event_name';
    event_title.appendChild(document.createTextNode(eventName.value));

    card_sub_div.appendChild(event_date_counter);
    card_sub_div.appendChild(event_title);
    eventCard.appendChild(card);
}

// --------------------------- Validate Form ------------------------------

function form_validator() {

    if (eventName.value === '') {
        M.toast({html: 'Please Name Your Event!', displayLength: '2000', classes: 'rounded'});
        submitBtn.classList.remove('modal-close')

    } else if (datePick.value === '') {
        M.toast({html: 'Please Add Date!', displayLength: '2000', classes: 'rounded'});
        submitBtn.classList.remove('modal-close')

    } else if ((new Date(datePick.value)) > new Date()) {
        M.toast({html: 'Date Cannot Be In Future!', displayLength: '2000', classes: 'rounded'});
        submitBtn.classList.remove('modal-close')

    } else {
        submitBtn.classList.add('modal-close');
        createDivStructure();
        addEvent();
        M.toast({html: 'New Event Created!', displayLength: '2000', classes: 'rounded'});
    }
}

submitBtn.addEventListener('click', form_validator);

