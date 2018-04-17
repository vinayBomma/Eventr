class Const {
    constructor() {
        const eventName = document.getElementById('event_name');
        const datePick = document.getElementById('date_pick');
        const timePick = document.getElementById('time_pick');
        const cardEvent = document.querySelector('.card_event_name');
        const cardDate = document.querySelector('.test');

        return {
            eventName,
            datePick,
            timePick,
            cardEvent,
            cardDate
        }
    }


}