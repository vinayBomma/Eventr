const init = new INIT();
init.startInit();

const datePick = document.getElementById('date_pick');
const timePick = document.getElementById('time_pick');
const eventName = document.getElementById('event_name');
const eventCard = document.querySelector('.event_card');

const submitBtn = document.querySelector('.submit_btn');
const cancelBtn = document.querySelector('.cancel_btn');
const deleteBtn = document.querySelector('.delete_btn');

const cardDateCounter = document.querySelector('.card_date_counter');
const cardEvent = document.querySelector('.card_event_name');

let card, card_div, card_sub_div, card_sub_div2, card_child_div, time_value, event_value, date_val;

//----------------------- Create Div Structure --------------------------------

function createDivStructure() {
    card = document.createElement('div');
    card_div = document.createElement('div');
    card_sub_div = document.createElement('div');
    card_sub_div2 = document.createElement('div');
    card_child_div = document.createElement('div');

    card.className = 'col s12 m6 l4 xl3 card_details';
    card_div.className = 'card blue-grey darken-1 hoverable card_height';
    card_sub_div.className = 'card-content white-text';
    card_sub_div2.className = 'card-content white-text titleCard';
    card_child_div.className = 'card_action valign-wrapper';

    card_div.appendChild(card_sub_div);
    card_div.appendChild(card_sub_div2);
    card.appendChild(card_div);

}

// -------------------------------  Adding Event -----------------------------------

function addEvent() {
    counterIncrement(datePick.value, timePick.value, card_sub_div);

    event_value = eventName.value;
    date_val = datePick.value;
    time_value = timePick.value;

    card_sub_div2.innerHTML = `
    <hr class="style14">
    <p class="center-align card_event_name">${eventName.value}</p>
    `;

    card_child_div.innerHTML = `
    <a href="#"><i class="material-icons icon" id="icon1">edit</i></a>
    <a href="#"><i class="material-icons icon" id="icon3">delete</i></a>
    `;
    eventCard.appendChild(card);

    eventListeners();
}

//--------------------------- Counter Logic -----------------------------


function counterIncrement(date, time, element) {
    let dateValue = new Date(date + ' ' + time + ':00').getTime();

    setInterval(() => {
        var now = new Date().getTime();

        var distance;

        if (dateValue > Date.now()){
            distance = dateValue - now;
        } else{
            distance = now - dateValue;
        }

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var secs = Math.floor((distance % (1000 * 60)) / 1000);

        element.innerHTML =`<p class="center-align card_date_counter">${days}d ${hours}h ${mins}m ${secs}s</p>`
    }, 1000);
}

//---------------------------- Event Listeners -------------------------------

function eventListeners() {

    card.addEventListener('mouseenter', (e) => {
        e.target.firstChild.appendChild(card_child_div);

        // ---------------------------- Edit Button Listener ----------------------------

        document.getElementById('icon1').addEventListener('click', (e) => {

            document.getElementById('icon1').classList.add('modal-trigger');
            document.getElementById('icon1').setAttribute('href', '#modal1');

            eventName.value = event_value;
            datePick.value = date_value;
            timePick.value = time_value;

            cardEvent.textContent = event_value;
            cardDateCounter.textContent = days + 'd ' + hours + 'h ' + mins + 'm ' + secs + 's';

            submitBtn.addEventListener('click', () => {
                eventCard.removeChild(e.path[4]);
            });

            cancelBtn.addEventListener('click', () => {
                clear_values();
            });

        });

        // --------------------------- Delete Button Listener -----------------------------

        document.getElementById('icon3').addEventListener('click', (e) => {

            document.getElementById('icon3').classList.add('modal-trigger');
            document.getElementById('icon3').setAttribute('href', '#modal2');

            deleteBtn.addEventListener('click', () => {
                try {
                    eventCard.removeChild(e.path[4]);
                } catch (e) {
                    console.log('Error: ', e);
                }
            });
        })
    });

    card.addEventListener('mouseleave', (e) => {
        e.target.firstChild.removeChild(card_child_div);
    })
}


// --------------------------- Clear Values ---------------------------------

function clear_values() {
    datePick.value = '';
    eventName.value = '';
    timePick.value = '';
    cardDateCounter.textContent = '';
    cardEvent.textContent = '';
}

// --------------------------- Validate Form ------------------------------

function form_validator() {

    if (eventName.value === '') {
        M.toast({html: 'Please Name Your Event!', displayLength: '2000', classes: 'rounded'});
        submitBtn.classList.remove('modal-close')

    } else if (eventName.value.length > 50) {
        M.toast({html: 'Character Length Exceeded', displayLength: '2000', classes: 'rounded'});
        submitBtn.classList.remove('modal-close');

    } else if (datePick.value === '') {
        M.toast({html: 'Please Add Date!', displayLength: '2000', classes: 'rounded'});
        submitBtn.classList.remove('modal-close')

    } else if (isNaN(new Date(datePick.value))) {
        M.toast({html: 'Please Select A Valid Date! ', displayLength: '2000', classes: 'rounded'});
        submitBtn.classList.remove('modal-close')

    } else if (timePick.value === '') {
        M.toast({html: 'Please Add Time!', displayLength: '2000', classes: 'rounded'});
        submitBtn.classList.remove('modal-close')

    } else if (timePick.value.match(/[a-z]/i)) {
        M.toast({html: 'Please Select A Valid Time!', displayLength: '2000', classes: 'rounded'});
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
