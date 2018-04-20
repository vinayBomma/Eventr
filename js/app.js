const init = new INIT();
init.startInit();

const datePick = document.getElementById('date_pick');
// const timePick = document.getElementById('time_pick');
const eventName = document.getElementById('event_name');
const eventCard = document.querySelector('.event_card');
const submitBtn = document.querySelector('.submit_btn');

const cardDateCounter = document.querySelector('.card_date_counter');
const cardEvent = document.querySelector('.card_event_name');


let card, card_div, card_sub_div, card_child_div, event_title, event_date_counter, event_action1, event_action2;

//----------------------- Create Div Structure --------------------------------

function createDivStructure() {
    card = document.createElement('div');
    card_div = document.createElement('div');
    card_sub_div = document.createElement('div');
    card_child_div = document.createElement('div');

    card.className = 'col s12 l4 xl3 card_detials';
    card_div.className = 'card blue-grey darken-1 hoverable card_height';
    card_sub_div.className = 'card-content white-text';
    card_child_div.className = 'card_action valign-wrapper';

    card_div.appendChild(card_sub_div);
    card.appendChild(card_div);

}
// -------------------------------  Adding Event -----------------------------------

function addEvent() {

    card_sub_div.innerHTML = `
    <p class="center-align card_date_counter">${new Date().getDate() - new Date(datePick.value).getDate()}</p>
    <p class="center-align card_event_name">${eventName.value}</p>
    `

    card_child_div.innerHTML = `
    <a href="#"><i class="material-icons icon">edit</i></a>
    <a href="#"><i class="material-icons icon">color_lens</i></a>
    <a href="#"><i class="material-icons icon">delete</i></a>
    `

    eventCard.appendChild(card);
    card.addEventListener('mouseenter', () => {
        card_div.appendChild(card_child_div);
    })
    card.addEventListener('mouseleave', () => {
        card_div.removeChild(card_child_div);
    })
}

// --------------------------- Clear Values ---------------------------------

function clear_values() {
    datePick.value = '';
    eventName.value = '';
    cardDateCounter.textContent = '';
    cardEvent.textContent = '';
}

// --------------------------- Validate Form ------------------------------

function form_validator() {

    if (eventName.value === '') {
        M.toast({html: 'Please Name Your Event!', displayLength: '2000', classes: 'rounded'});
        submitBtn.classList.remove('modal-close')

    }else if (eventName.value.length > 50){
        M.toast({html: 'Character Length Exceeded', displayLength: '2000', classes: 'rounded'});
        submitBtn.classList.remove('modal-close');

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
        clear_values();
        M.toast({html: 'New Event Created!', displayLength: '2000', classes: 'rounded'});
    }
}

submitBtn.addEventListener('click', form_validator);

