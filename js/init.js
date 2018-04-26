class INIT {
    startInit() {

        const cardDateCounter = document.querySelector('.card_date_counter');
        const eventName = document.getElementById('event_name');
        const cardEvent = document.querySelector('.card_event_name');

        function sideNav() {
            let elem = document.querySelector('.sidenav');
            let instance = M.Sidenav.init(elem);
        }

        function fabBtn() {
            let elem = document.querySelector('.fixed-action-btn');
            let instance = M.FloatingActionButton.init(elem);
        }

        function modal() {
            let elem = document.querySelectorAll('.modal');
            let instance = M.Modal.init(elem);
        }


        function datePicker() {

            let elem = document.querySelector('.datepicker');
            let instance = M.Datepicker.init(elem, {
                onClose: () => {
                    let dateInput = document.getElementById('date_pick');
                    let dateValue = new Date(dateInput.value).getDate();
                    let counter = (new Date().getDate() - dateValue);
                    cardDateCounter.innerText = counter + 'd ' + '0h ' + '0m ' + '0s';
                }
            });
        }

        function timePicker() {
            let elem = document.querySelector('.timepicker');
            let instance = M.Timepicker.init(elem, {
                twelveHour: false,
                onCloseEnd: () => {
                    alert('timePicker to rescue')
                }
            });
        }

        function previewText() {
            eventName.addEventListener('keyup', function () {
                cardEvent.textContent = eventName.value;
            });
        }


        sideNav();
        fabBtn();
        modal();
        datePicker();
        previewText();
        timePicker();
    }
}
