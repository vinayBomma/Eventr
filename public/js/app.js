const init = new INIT();
init.startInit();

const datePick = document.getElementById('date_pick');
const timePick = document.getElementById('time_pick');
const eventName = document.getElementById('event_name');
const submitBtn = document.querySelector('.submit_btn');
const deleteBtn = document.querySelector('.delete_btn');
const dateCardArray = Array.prototype.slice.call(document.querySelectorAll('.dateCard'));
const dateCard = document.querySelectorAll('.dateCard')[0];

// -------------------------------- Counter Logic ----------------------------

function counterIncrement(date, element) {
    setInterval(() => {
        let now = new Date().getTime();

        let distance;

        if (date > Date.now()) {
            distance = date - now;
        } else {
            distance = now - date;
        }

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let secs = Math.floor((distance % (1000 * 60)) / 1000);

        element.innerHTML = `<p class="center-align card_date_counter">${days}d ${hours}h ${mins}m ${secs}s</p>`
    }, 1000);
}

//------------------------------- forEach for Counter ------------------------

function domLoop(item) {
    counterIncrement(item.innerText, item);
}

dateCardArray.forEach(domLoop);

//---------------------------- Event Listeners -------------------------------

// function eventListeners() {
//
//     card.addEventListener('mouseenter', (e) => {
//         e.target.firstChild.appendChild(card_child_div);
//
//         // ---------------------------- Edit Button Listener ----------------------------
//
//         document.getElementById('icon1').addEventListener('click', (e) => {
//
//             document.getElementById('icon1').classList.add('modal-trigger');
//             document.getElementById('icon1').setAttribute('href', '#modal1');
//
//             eventName.value = event_value;
//             datePick.value = date_value;
//             timePick.value = time_value;
//
//             cardEvent.textContent = event_value;
//             cardDateCounter.textContent = days + 'd ' + hours + 'h ' + mins + 'm ' + secs + 's';
//
//             submitBtn.addEventListener('click', () => {
//                 eventCard.removeChild(e.path[4]);
//             });
//
//             cancelBtn.addEventListener('click', () => {
//                 clear_values();
//             });
//
//         });
//
//         // --------------------------- Delete Button Listener -----------------------------
//
//         document.getElementById('icon3').addEventListener('click', (e) => {
//
//             document.getElementById('icon3').classList.add('modal-trigger');
//             document.getElementById('icon3').setAttribute('href', '#modal2');
//
//             deleteBtn.addEventListener('click', () => {
//                 try {
//                     eventCard.removeChild(e.path[4]);
//                 } catch (e) {
//                     console.log('Error: ', e);
//                 }
//             });
//         })
//     });
//
//     card.addEventListener('mouseleave', (e) => {
//         e.target.firstChild.removeChild(card_child_div);
//     })
// }

function deleteCard() {
    deleteBtn.addEventListener('click', (e) => {

    })
}

deleteCard();
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
        M.toast({html: 'New Event Created!', displayLength: '2000', classes: 'rounded'});
    }
}

submitBtn.addEventListener('click', form_validator);
